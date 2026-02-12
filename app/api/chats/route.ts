import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import type { ChatPayload, ChatSummary } from "@/lib/chats"

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

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ chats: [] })
  }
  const userId = session.user.id as string
  const chats = await readUserChats(userId)
  const list: ChatSummary[] = chats.map((c) => ({
    id: c.id,
    title: c.title,
    updatedAt: c.updatedAt,
  }))
  list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  return NextResponse.json({ chats: list })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const userId = session.user.id as string
  const body = await req.json().catch(() => ({}))
  const title = typeof body.title === "string" && body.title.trim() ? body.title.trim() : "New chat"
  const messages = Array.isArray(body.messages) ? body.messages : []

  const chats = await readUserChats(userId)
  const id = `chat_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
  const now = new Date().toISOString()
  const newChat: ChatPayload = {
    id,
    userId,
    title,
    createdAt: now,
    updatedAt: now,
    messages,
  }
  chats.unshift(newChat)
  await writeUserChats(userId, chats)
  return NextResponse.json(newChat)
}
