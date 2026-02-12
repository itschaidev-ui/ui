import path from "node:path"
import fs from "node:fs/promises"

const PROJECT_ROOT = process.cwd()
const ALLOWED_EXT = new Set([".tsx", ".ts", ".jsx", ".js", ".css", ".json", ".md"])
const LIST_DIRS = ["app", "components", "lib", "styles", "hooks"]

/**
 * Resolve a relative path against project root; disallow escaping.
 */
export function resolveProjectPath(relativePath: string): string {
  const normalized = path.normalize(relativePath).replace(/^(\.\/)+/, "")
  const resolved = path.resolve(PROJECT_ROOT, normalized)
  const rel = path.relative(PROJECT_ROOT, resolved)
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    throw new Error("Path outside project")
  }
  return resolved
}

/**
 * List editable project files (app/, components/, lib/, etc.).
 */
export async function listProjectFiles(): Promise<string[]> {
  const out: string[] = []
  for (const dir of LIST_DIRS) {
    const fullDir = path.join(PROJECT_ROOT, dir)
    try {
      await collectFiles(fullDir, dir, out)
    } catch {
      // skip missing dirs
    }
  }
  return out.sort()
}

function toProjectPath(p: string): string {
  return p.split(path.sep).join("/")
}

async function collectFiles(fullDir: string, prefix: string, out: string[]) {
  const entries = await fs.readdir(fullDir, { withFileTypes: true })
  for (const e of entries) {
    const rel = toProjectPath(path.join(prefix, e.name))
    const full = path.join(fullDir, e.name)
    if (e.isDirectory()) {
      await collectFiles(full, rel, out)
    } else if (ALLOWED_EXT.has(path.extname(e.name).toLowerCase())) {
      out.push(rel)
    }
  }
}

/**
 * Read file content; path is relative to project root.
 */
export async function readProjectFile(relativePath: string): Promise<string> {
  const abs = resolveProjectPath(relativePath)
  return fs.readFile(abs, "utf-8")
}

/**
 * Write file; path is relative to project root. Creates parent dirs if needed.
 */
export async function writeProjectFile(relativePath: string, content: string): Promise<void> {
  const abs = resolveProjectPath(relativePath)
  await fs.mkdir(path.dirname(abs), { recursive: true })
  await fs.writeFile(abs, content, "utf-8")
}
