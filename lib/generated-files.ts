import fs from "node:fs/promises"
import path from "node:path"

const WORKSPACES_ROOT =
  process.env.GENERATED_WORKSPACES_ROOT ||
  path.join(process.cwd(), "data", "generated-workspaces")

const ALLOWED_EXT = new Set([".tsx", ".ts", ".jsx", ".js", ".css", ".json", ".md", ".mjs", ".cjs", ".yaml", ".yml"])
const DEFAULT_ENTRY_FILE = "src/App/page.tsx"

type PackageJsonLike = {
  name?: string
  private?: boolean
  version?: string
  scripts?: Record<string, string>
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

function sanitizeUserId(userId: string) {
  return userId.replace(/[^a-zA-Z0-9_-]/g, "_")
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
  return workspaceDir(userId)
}

export async function listGeneratedFiles(userId: string): Promise<string[]> {
  const root = await getWorkspaceRoot(userId)
  const files: string[] = []
  await collectFiles(root, root, files)
  return files.sort()
}

export async function readAllGeneratedFiles(
  userId: string
): Promise<{ files: string[]; contents: Record<string, string> }> {
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
  await ensureWorkspaceScaffold(userId)
  const { full } = resolveInsideWorkspace(userId, relativePath)
  return fs.readFile(full, "utf-8")
}

export async function writeGeneratedFile(userId: string, relativePath: string, content: string): Promise<string> {
  await ensureWorkspaceScaffold(userId)
  const { full } = resolveInsideWorkspace(userId, relativePath)
  await fs.mkdir(path.dirname(full), { recursive: true })
  await fs.writeFile(full, content, "utf-8")
  return content
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
