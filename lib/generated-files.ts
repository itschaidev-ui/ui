import path from "node:path"
import fs from "node:fs/promises"

const DATA_DIR = path.join(process.cwd(), "data", "generated")
const ALLOWED_EXT = new Set([".tsx", ".ts", ".jsx", ".js", ".css", ".json", ".md"])

function getFilePath(userId: string): string {
  return path.join(DATA_DIR, `${userId}.json`)
}

function isAllowedPath(relativePath: string): boolean {
  const normalized = path.normalize(relativePath).replace(/^(\.\/)+/, "")
  if (normalized.startsWith("..") || path.isAbsolute(normalized)) return false
  return ALLOWED_EXT.has(path.extname(normalized).toLowerCase())
}

export type GeneratedFilesStore = Record<string, string>

async function readStore(userId: string): Promise<GeneratedFilesStore> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  const filePath = getFilePath(userId)
  try {
    const raw = await fs.readFile(filePath, "utf-8")
    const data = JSON.parse(raw) as { files?: GeneratedFilesStore }
    return typeof data.files === "object" && data.files !== null ? data.files : {}
  } catch {
    return {}
  }
}

async function writeStore(userId: string, files: GeneratedFilesStore): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  const filePath = getFilePath(userId)
  await fs.writeFile(filePath, JSON.stringify({ files }, null, 2), "utf-8")
}

/**
 * List paths in the user's generated folder.
 */
export async function listGeneratedFiles(userId: string): Promise<string[]> {
  const files = await readStore(userId)
  return Object.keys(files).sort()
}

/**
 * Get all contents (for GET with no path).
 */
export async function readAllGeneratedFiles(userId: string): Promise<{ files: string[]; contents: Record<string, string> }> {
  const contents = await readStore(userId)
  const files = Object.keys(contents).sort()
  return { files, contents }
}

/**
 * Read one file from the user's generated folder.
 */
export async function readGeneratedFile(userId: string, relativePath: string): Promise<string> {
  if (!isAllowedPath(relativePath)) throw new Error("Path not allowed")
  const files = await readStore(userId)
  const normalized = path.normalize(relativePath).replace(/^(\.\/)+/, "").split(path.sep).join("/")
  return files[normalized] ?? ""
}

/**
 * Write one file; path is relative to the user's generated folder (e.g. src/App/page.tsx).
 */
export async function writeGeneratedFile(userId: string, relativePath: string, content: string): Promise<string> {
  if (!isAllowedPath(relativePath)) throw new Error("Path not allowed")
  const normalized = path.normalize(relativePath).replace(/^(\.\/)+/, "").split(path.sep).join("/")
  const files = await readStore(userId)
  files[normalized] = content
  await writeStore(userId, files)
  return content
}
