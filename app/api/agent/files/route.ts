import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import {
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
    if (pathParam) {
      const content = await readGeneratedFile(userId, pathParam)
      return NextResponse.json({ path: pathParam, content })
    }
    const { files, contents } = await readAllGeneratedFiles(userId)
    return NextResponse.json({ files, contents })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to read"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as { id?: string })?.id ?? "anonymous"

  let body: { path?: string; content?: string }
  try {
    body = (await req.json()) as { path?: string; content?: string }
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
  const relativePath = typeof body.path === "string" ? body.path.trim() : ""
  const content = typeof body.content === "string" ? body.content : ""

  if (!relativePath) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 })
  }

  try {
    await writeGeneratedFile(userId, relativePath, content)
    const readBack = await readGeneratedFile(userId, relativePath)
    return NextResponse.json({ path: relativePath, content: readBack })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to write"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
