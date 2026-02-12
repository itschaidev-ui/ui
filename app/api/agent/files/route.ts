import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import {
  detectMissingPackagesForCode,
  getWorkspaceRoot,
  readAllGeneratedFiles,
  readGeneratedFile,
  writeGeneratedFile,
} from "@/lib/generated-files"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as { id?: string })?.id ?? "anonymous"

  const { searchParams } = new URL(req.url)
  const pathParam = searchParams.get("path")

  try {
    const workspaceRoot = await getWorkspaceRoot(userId)
    if (pathParam) {
      const content = await readGeneratedFile(userId, pathParam)
      const { requiredPackages, missingPackages } = await detectMissingPackagesForCode(userId, content)
      return NextResponse.json({ path: pathParam, content, requiredPackages, missingPackages, workspaceRoot })
    }
    const { files, contents } = await readAllGeneratedFiles(userId)
    return NextResponse.json({ files, contents, workspaceRoot })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to read"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as { id?: string })?.id ?? "anonymous"

  let body: { action?: string; path?: string; content?: string; code?: string }
  try {
    body = (await req.json()) as { action?: string; path?: string; content?: string; code?: string }
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
  const action = typeof body.action === "string" ? body.action.trim() : "write"

  if (action === "detect-missing") {
    const code = typeof body.code === "string" ? body.code : ""
    if (!code.trim()) {
      return NextResponse.json({ requiredPackages: [], missingPackages: [] })
    }
    try {
      const { requiredPackages, missingPackages } = await detectMissingPackagesForCode(userId, code)
      return NextResponse.json({ requiredPackages, missingPackages })
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to detect dependencies"
      return NextResponse.json({ error: message }, { status: 400 })
    }
  }

  const relativePath = typeof body.path === "string" ? body.path.trim() : ""
  const content = typeof body.content === "string" ? body.content : ""
  if (!relativePath) return NextResponse.json({ error: "Missing path" }, { status: 400 })

  try {
    await writeGeneratedFile(userId, relativePath, content)
    const readBack = await readGeneratedFile(userId, relativePath)
    const { requiredPackages, missingPackages } = await detectMissingPackagesForCode(userId, readBack)
    return NextResponse.json({ path: relativePath, content: readBack, requiredPackages, missingPackages })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to write"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
