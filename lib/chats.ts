/**
 * Chat types for account-persisted conversations.
 */

export type ChatMessageRole = "assistant" | "user"

export interface ChatMessagePayload {
  id: number
  role: ChatMessageRole
  text: string
  kind?: "text" | "progress" | "status" | "file_preview"
  /** When kind is file_preview, this is the file path (e.g. src/App/page.tsx). */
  filePath?: string
}

export interface ChatPayload {
  id: string
  userId: string
  title: string
  createdAt: string // ISO
  updatedAt: string // ISO
  messages: ChatMessagePayload[]
}

/** Summary for list views */
export interface ChatSummary {
  id: string
  title: string
  updatedAt: string
}
