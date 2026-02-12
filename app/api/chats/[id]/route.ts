import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import type { ChatPayload } from "@/lib/chats"

const DATA_DIR = path.join(process.cwd(), "data", "chats")

async function getFilePath(userId: string): Promise<string> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  return path.join(DATA_DIR, `${userId}.json`)
}

async function readUserChats(userId: string): Promise<ChatPayload[]> {
  const filePath = await getFilePath(userId)
  try {
    const raw = await fs.readFile(filePath, "utf-8")
    const data = JSON.parse(raw) as { chats: ChatPayload[] }
    return Array.isArray(data.chats) ? data.chats : []
  } catch {
    return []
  }
}

async function writeUserChats(userId: string, chats: ChatPayload[]): Promise<void> {
  const filePath = await getFilePath(userId)
  await fs.writeFile(filePath, JSON.stringify({ chats }, null, 2), "utf-8")
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const userId = session.user.id as string
  const { id } = await params
  const chats = await readUserChats(userId)
  const chat = chats.find((c) => c.id === id)
  if (!chat || chat.userId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return NextResponse.json(chat)
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const userId = session.user.id as string
  const { id } = await params
  const body = await req.json().catch(() => ({}))
  const chats = await readUserChats(userId)
  const index = chats.findIndex((c) => c.id === id && c.userId === userId)
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  const now = new Date().toISOString()
  if (typeof body.title === "string" && body.title.trim()) {
    chats[index].title = body.title.trim()
  }
  if (Array.isArray(body.messages)) {
    chats[index].messages = body.messages
  }
  chats[index].updatedAt = now
  await writeUserChats(userId, chats)
  return NextResponse.json(chats[index])
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const userId = session.user.id as string
  const { id } = await params
  const chats = await readUserChats(userId)
  const filtered = chats.filter((c) => c.id !== id || c.userId !== userId)
  if (filtered.length === chats.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  await writeUserChats(userId, filtered)
  return NextResponse.json({ ok: true })
}
