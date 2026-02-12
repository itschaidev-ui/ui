import fs from "node:fs/promises"
import path from "node:path"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const WORKSPACES_ROOT =
  process.env.GENERATED_WORKSPACES_ROOT ||
  path.join(process.cwd(), "data", "generated-workspaces")

const ALLOWED_EXT = new Set([".tsx", ".ts", ".jsx", ".js", ".css", ".json", ".md", ".mjs", ".cjs", ".yaml", ".yml"])
const DEFAULT_ENTRY_FILE = "src/App/page.tsx"
const SANDBOXES_TABLE = process.env.SUPABASE_SANDBOXES_TABLE || "sandboxes"
const SANDBOX_FILES_TABLE = process.env.SUPABASE_SANDBOX_FILES_TABLE || "sandbox_files"

type PackageJsonLike = {
  name?: string
  private?: boolean
  version?: string
  scripts?: Record<string, string>
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

type SandboxRow = { id: string; user_id: string }
type SandboxFileRow = { path: string; content: string }

let supabaseSingleton: SupabaseClient | null = null

function sanitizeUserId(userId: string) {
  return userId.replace(/[^a-zA-Z0-9_-]/g, "_")
}

function getSupabaseUrl() {
  if (process.env.SUPABASE_URL) return process.env.SUPABASE_URL
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) return process.env.NEXT_PUBLIC_SUPABASE_URL
  if (process.env.SUPABASE_PROJECT_ID) return `https://${process.env.SUPABASE_PROJECT_ID}.supabase.co`
  return ""
}

function getSupabaseSecret() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || ""
}

function getSupabaseClient(): SupabaseClient | null {
  const url = getSupabaseUrl()
  const secret = getSupabaseSecret()
  if (!url || !secret) return null
  if (!supabaseSingleton) {
    supabaseSingleton = createClient(url, secret, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return supabaseSingleton
}

function normalizeRelativePath(relativePath: string): string {
  return path.normalize(relativePath).replace(/^(\.\/)+/, "").split(path.sep).join("/")
}

function assertAllowedPath(relativePath: string) {
  const normalized = normalizeRelativePath(relativePath)
  if (!normalized || normalized.startsWith("..") || path.isAbsolute(normalized)) {
    throw new Error("Path outside workspace")
  }
  const ext = path.extname(normalized).toLowerCase()
  if (!ALLOWED_EXT.has(ext)) {
    throw new Error(`File extension not allowed: ${ext || "(none)"}`)
  }
  return normalized
}

function workspaceDir(userId: string) {
  return path.join(WORKSPACES_ROOT, sanitizeUserId(userId))
}

function resolveInsideWorkspace(userId: string, relativePath: string) {
  const root = workspaceDir(userId)
  const normalized = assertAllowedPath(relativePath)
  const full = path.resolve(root, normalized)
  const rel = path.relative(root, full)
  if (rel.startsWith("..") || path.isAbsolute(rel)) throw new Error("Path outside workspace")
  return { root, full, relative: normalized }
}

const DEFAULT_PACKAGE_JSON: PackageJsonLike = {
  name: "sandbox-app",
  private: true,
  version: "0.0.1",
  scripts: {
    build: 'node -e "console.log(\'sandbox build completed\')"',
    dev: 'node -e "console.log(\'sandbox dev started\')"',
  },
  dependencies: {
    "@chaidev/ui": "^0.3.0",
    react: "^19.2.3",
    "react-dom": "^19.2.3",
  },
}

const DEFAULT_ENTRY_CODE = `import { SparkleButton } from "@chaidev/ui"

export default function App() {
  return (
    <div className="min-h-screen grid place-items-center bg-slate-950">
      <SparkleButton text="Click me" />
    </div>
  )
}
`

async function ensureWorkspaceScaffold(userId: string): Promise<void> {
  const root = workspaceDir(userId)
  await fs.mkdir(root, { recursive: true })
  const packagePath = path.join(root, "package.json")
  const entryPath = path.join(root, DEFAULT_ENTRY_FILE)

  try {
    await fs.access(packagePath)
  } catch {
    await fs.writeFile(packagePath, JSON.stringify(DEFAULT_PACKAGE_JSON, null, 2), "utf-8")
  }

  try {
    await fs.access(entryPath)
  } catch {
    await fs.mkdir(path.dirname(entryPath), { recursive: true })
    await fs.writeFile(entryPath, DEFAULT_ENTRY_CODE, "utf-8")
  }
}

async function ensureSandboxRow(userId: string): Promise<{ client: SupabaseClient; sandboxId: string } | null> {
  const client = getSupabaseClient()
  if (!client) return null
  const safeUser = sanitizeUserId(userId)

  const existing = await client
    .from(SANDBOXES_TABLE)
    .select("id,user_id")
    .eq("user_id", safeUser)
    .maybeSingle<SandboxRow>()
  if (existing.error) return null
  if (existing.data?.id) return { client, sandboxId: existing.data.id }

  const created = await client
    .from(SANDBOXES_TABLE)
    .insert({ user_id: safeUser })
    .select("id,user_id")
    .single<SandboxRow>()
  if (created.error || !created.data?.id) return null
  return { client, sandboxId: created.data.id }
}

async function readSupabaseFiles(userId: string): Promise<Record<string, string> | null> {
  const sandbox = await ensureSandboxRow(userId)
  if (!sandbox) return null
  const { client, sandboxId } = sandbox

  const files = await client
    .from(SANDBOX_FILES_TABLE)
    .select("path,content")
    .eq("sandbox_id", sandboxId)
    .returns<SandboxFileRow[]>()
  if (files.error) return null

  const out: Record<string, string> = {}
  for (const row of files.data ?? []) {
    const p = normalizeRelativePath(row.path)
    if (p && ALLOWED_EXT.has(path.extname(p).toLowerCase())) out[p] = row.content ?? ""
  }
  return out
}

async function ensureSupabaseDefaults(userId: string): Promise<void> {
  const sandbox = await ensureSandboxRow(userId)
  if (!sandbox) return
  const { client, sandboxId } = sandbox
  const { data } = await client
    .from(SANDBOX_FILES_TABLE)
    .select("path")
    .eq("sandbox_id", sandboxId)
    .in("path", ["package.json", DEFAULT_ENTRY_FILE])
  const paths = new Set((data ?? []).map((d) => normalizeRelativePath(String((d as { path?: string }).path ?? ""))))
  const inserts: Array<{ sandbox_id: string; path: string; content: string }> = []
  if (!paths.has("package.json")) {
    inserts.push({
      sandbox_id: sandboxId,
      path: "package.json",
      content: JSON.stringify(DEFAULT_PACKAGE_JSON, null, 2),
    })
  }
  if (!paths.has(DEFAULT_ENTRY_FILE)) {
    inserts.push({
      sandbox_id: sandboxId,
      path: DEFAULT_ENTRY_FILE,
      content: DEFAULT_ENTRY_CODE,
    })
  }
  if (inserts.length > 0) {
    await client.from(SANDBOX_FILES_TABLE).insert(inserts)
  }
}

async function writeSupabaseFile(userId: string, relativePath: string, content: string): Promise<boolean> {
  const sandbox = await ensureSandboxRow(userId)
  if (!sandbox) return false
  const { client, sandboxId } = sandbox
  const normalized = assertAllowedPath(relativePath)
  const write = await client
    .from(SANDBOX_FILES_TABLE)
    .upsert({ sandbox_id: sandboxId, path: normalized, content }, { onConflict: "sandbox_id,path" })
  return !write.error
}

async function mirrorContentsToWorkspace(userId: string, contents: Record<string, string>) {
  await ensureWorkspaceScaffold(userId)
  const root = workspaceDir(userId)
  await Promise.all(
    Object.entries(contents).map(async ([relative, content]) => {
      const full = path.resolve(root, relative)
      await fs.mkdir(path.dirname(full), { recursive: true })
      await fs.writeFile(full, content, "utf-8")
    })
  )
}

async function collectFiles(root: string, dir: string, out: string[]) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".git" || entry.name === ".next") continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await collectFiles(root, full, out)
      continue
    }
    const rel = normalizeRelativePath(path.relative(root, full))
    if (ALLOWED_EXT.has(path.extname(rel).toLowerCase())) {
      out.push(rel)
    }
  }
}

export async function getWorkspaceRoot(userId: string) {
  await ensureWorkspaceScaffold(userId)
  if (getSupabaseClient()) {
    await ensureSupabaseDefaults(userId)
    const contents = await readSupabaseFiles(userId)
    if (contents && Object.keys(contents).length > 0) {
      await mirrorContentsToWorkspace(userId, contents)
    }
  }
  return workspaceDir(userId)
}

export async function listGeneratedFiles(userId: string): Promise<string[]> {
  if (getSupabaseClient()) {
    await ensureSupabaseDefaults(userId)
    const supabaseContents = await readSupabaseFiles(userId)
    if (supabaseContents) return Object.keys(supabaseContents).sort()
  }
  const root = await getWorkspaceRoot(userId)
  const files: string[] = []
  await collectFiles(root, root, files)
  return files.sort()
}

export async function readAllGeneratedFiles(
  userId: string
): Promise<{ files: string[]; contents: Record<string, string> }> {
  if (getSupabaseClient()) {
    await ensureSupabaseDefaults(userId)
    const supabaseContents = await readSupabaseFiles(userId)
    if (supabaseContents) {
      const files = Object.keys(supabaseContents).sort()
      await mirrorContentsToWorkspace(userId, supabaseContents)
      return { files, contents: supabaseContents }
    }
  }
  const files = await listGeneratedFiles(userId)
  const contents: Record<string, string> = {}
  await Promise.all(
    files.map(async (file) => {
      const { full } = resolveInsideWorkspace(userId, file)
      contents[file] = await fs.readFile(full, "utf-8")
    })
  )
  return { files, contents }
}

export async function readGeneratedFile(userId: string, relativePath: string): Promise<string> {
  if (getSupabaseClient()) {
    await ensureSupabaseDefaults(userId)
    const supabaseContents = await readSupabaseFiles(userId)
    if (supabaseContents) {
      const normalized = assertAllowedPath(relativePath)
      const content = supabaseContents[normalized] ?? ""
      await writeGeneratedFileToFs(userId, normalized, content)
      return content
    }
  }
  await ensureWorkspaceScaffold(userId)
  const { full } = resolveInsideWorkspace(userId, relativePath)
  return fs.readFile(full, "utf-8")
}

export async function writeGeneratedFile(userId: string, relativePath: string, content: string): Promise<string> {
  const normalized = assertAllowedPath(relativePath)
  if (getSupabaseClient()) {
    await ensureSupabaseDefaults(userId)
    await writeSupabaseFile(userId, normalized, content)
  }
  await writeGeneratedFileToFs(userId, normalized, content)
  return content
}

async function writeGeneratedFileToFs(userId: string, relativePath: string, content: string): Promise<void> {
  await ensureWorkspaceScaffold(userId)
  const { full } = resolveInsideWorkspace(userId, relativePath)
  await fs.mkdir(path.dirname(full), { recursive: true })
  await fs.writeFile(full, content, "utf-8")
}

export function getPackageNameFromImport(specifier: string): string | null {
  if (!specifier || specifier.startsWith(".") || specifier.startsWith("/") || specifier.startsWith("@/")) return null
  if (specifier.startsWith("@")) {
    const parts = specifier.split("/")
    if (parts.length < 2) return null
    return `${parts[0]}/${parts[1]}`
  }
  return specifier.split("/")[0] || null
}

export function collectImportedPackages(code: string): string[] {
  const regex =
    /\bimport\s+(?:[^"'`]+\s+from\s+)?["'`]([^"'`]+)["'`]|\bimport\(\s*["'`]([^"'`]+)["'`]\s*\)|\brequire\(\s*["'`]([^"'`]+)["'`]\s*\)/g
  const set = new Set<string>()
  let match: RegExpExecArray | null
  while ((match = regex.exec(code))) {
    const spec = match[1] || match[2] || match[3]
    const pkg = getPackageNameFromImport(spec)
    if (pkg) set.add(pkg)
  }
  return [...set].sort()
}

export async function getWorkspacePackageJson(userId: string): Promise<PackageJsonLike> {
  const root = await getWorkspaceRoot(userId)
  const pkgPath = path.join(root, "package.json")
  try {
    const raw = await fs.readFile(pkgPath, "utf-8")
    return JSON.parse(raw) as PackageJsonLike
  } catch {
    return { ...DEFAULT_PACKAGE_JSON }
  }
}

export async function detectMissingPackagesForCode(
  userId: string,
  code: string
): Promise<{ requiredPackages: string[]; missingPackages: string[] }> {
  const requiredPackages = collectImportedPackages(code)
  const pkgJson = await getWorkspacePackageJson(userId)
  const installed = new Set<string>([
    ...Object.keys(pkgJson.dependencies ?? {}),
    ...Object.keys(pkgJson.devDependencies ?? {}),
  ])
  const missingPackages = requiredPackages.filter((pkg) => !installed.has(pkg))
  return { requiredPackages, missingPackages }
}
