"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useSession } from "next-auth/react"
import { useTheme } from "next-themes"

import { MessageSendButton } from "@/components/ui/message-send-button"
import { useDashboard } from "@/components/dashboard/dashboard-context"
import { ASSISTANT_MODES, type AssistantMode } from "@/lib/dashboard-references"
import { getDisplayCode } from "@/lib/code-parse"

function PaperclipIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  )
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  )
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16V4a2 2 0 0 1 2-2h12" />
    </svg>
  )
}

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" className="opacity-25" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="opacity-90"
      />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 7L10 17L4 11"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type ChatRole = "assistant" | "user"

interface ChatMessage {
  id: number
  role: ChatRole
  text: string
  kind?: "text" | "progress" | "status" | "file_preview"
  /** When kind is file_preview, this is the file path. */
  filePath?: string
}

type AgentProgressStage = "planning" | "analyzing" | "generating" | "finalizing"

interface AgentProgressState {
  stage: AgentProgressStage
  planText: string
  workspaceNotes: string[]
  fileName: string
}

const getInitialMessages = (): ChatMessage[] => []

/** Streams target one character at a time; one React update per frame max to avoid flicker/z-fighting. */
function streamText(
  target: string,
  onChunk: (current: string) => void,
  onDone: () => void
) {
  if (!target.length) {
    onDone()
    return () => {}
  }
  let nextIndex = 0
  let pendingIndex = -1
  let rafId = 0
  const tickMs = 30

  const flush = () => {
    rafId = 0
    if (pendingIndex >= 0) {
      const upTo = pendingIndex
      pendingIndex = -1
      onChunk(target.slice(0, upTo))
    }
  }

  const id = setInterval(() => {
    nextIndex += 1
    if (nextIndex >= target.length) {
      clearInterval(id)
      if (rafId) cancelAnimationFrame(rafId)
      onChunk(target)
      onDone()
      return
    }
    pendingIndex = nextIndex
    if (rafId === 0) rafId = requestAnimationFrame(flush)
  }, tickMs)

  return () => {
    clearInterval(id)
    if (rafId) cancelAnimationFrame(rafId)
  }
}

function AgentGeneratingContent({
  isLight,
  isGenerating,
  generatingFile,
  streamedCode,
  streamingTargetCode,
  progress,
}: {
  isLight: boolean
  isGenerating: boolean
  generatingFile: string | null
  streamedCode: string
  streamingTargetCode: string | null
  progress?: AgentProgressState
}) {
  const stage = progress?.stage ?? "planning"
  const rawCode = (streamedCode || streamingTargetCode || "").trim()
  const codeSnippetSource = getDisplayCode(rawCode)
  const codeSnippet = codeSnippetSource
    ? codeSnippetSource.split("\n").slice(0, 14).join("\n")
    : ""

  return (
    <div className="flex min-w-0 flex-col gap-2.5">
      <div className={`flex items-center gap-1.5 text-xs ${isLight ? "text-black/45" : "text-white/55"}`}>
        {stage === "planning" ? (
          <SpinnerIcon className={`h-3.5 w-3.5 animate-spin ${isLight ? "text-black/55" : "text-white/65"}`} />
        ) : (
          <CheckIcon className={`h-3.5 w-3.5 ${isLight ? "text-emerald-600" : "text-emerald-400"}`} />
        )}
        <span>{stage === "planning" ? "Planning what to create..." : "Thought for 8 seconds"}</span>
      </div>

      {progress?.planText ? (
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{progress.planText}</p>
      ) : (
        <p className={`text-sm ${isLight ? "text-black/55" : "text-white/60"}`}>Thinking through a plan...</p>
      )}

      {(stage === "analyzing" || stage === "generating" || stage === "finalizing") && (
        <>
          <div className={`flex items-center gap-1.5 text-xs ${isLight ? "text-black/45" : "text-white/55"}`}>
            {stage === "analyzing" ? (
              <SpinnerIcon className={`h-3.5 w-3.5 animate-spin ${isLight ? "text-black/55" : "text-white/65"}`} />
            ) : (
              <CheckIcon className={`h-3.5 w-3.5 ${isLight ? "text-emerald-600" : "text-emerald-400"}`} />
            )}
            <span>Analyzing workspace...</span>
          </div>
          {progress?.workspaceNotes?.map((note, index) => (
            <div key={`${note}-${index}`} className={`flex items-center gap-1.5 text-xs ${isLight ? "text-black/45" : "text-white/55"}`}>
              <span>{index % 2 === 0 ? "⌘" : "✎"}</span>
              <span>{note}</span>
            </div>
          ))}
        </>
      )}

      {(stage === "generating" || stage === "finalizing") && (
        <p className="text-sm leading-relaxed">Creating files with the generated implementation:</p>
      )}

      {(stage === "generating" || stage === "finalizing") && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`mt-1 w-full max-w-full overflow-hidden rounded-xl border ${
            isLight ? "border-black/10 bg-black/90 text-white" : "border-white/15 bg-black/70 text-white"
          }`}
        >
          <div className="flex items-center gap-2 px-3 py-2 text-xs">
            {isGenerating ? (
              <SpinnerIcon className={`h-3.5 w-3.5 animate-spin ${isLight ? "text-white/85" : "text-white/80"}`} />
            ) : (
              <CheckIcon className={`h-3.5 w-3.5 ${isLight ? "text-emerald-300" : "text-emerald-400"}`} />
            )}
            <span>{generatingFile ? `Writing ${generatingFile}...` : "Preparing code..."}</span>
          </div>
          <pre className="max-w-full overflow-x-auto px-3 pb-3 text-[0.68rem] leading-relaxed text-indigo-100/95">
            <code>{codeSnippet || (isGenerating ? "..." : "")}</code>
          </pre>
        </motion.div>
      )}
    </div>
  )
}

function ChatBubble({
  message,
  mode,
  isLight,
  isGenerating,
  generatingFile,
  streamedCode,
  streamingTargetCode,
  streamingMessageId,
  streamingTarget,
  streamingCurrent,
  thinkingMessageId,
  progress,
  onEdit,
}: {
  message: ChatMessage
  mode: AssistantMode
  isLight: boolean
  isGenerating: boolean
  generatingFile: string | null
  streamedCode: string
  streamingTargetCode: string | null
  streamingMessageId: number | null
  streamingTarget: string | null
  streamingCurrent: string
  thinkingMessageId: number | null
  progress?: AgentProgressState
  onEdit: (text: string) => void
}) {
  const isStreaming = message.id === streamingMessageId && streamingTarget
  const isThinking = message.id === thinkingMessageId
  const displayText = isStreaming ? streamingCurrent : message.text

  const isProgress = message.kind === "progress"
  const isStatus = message.kind === "status"
  const isFilePreview = message.kind === "file_preview"

  const showThinking = (isProgress && !isStreaming) || (isStreaming && isThinking && !displayText)

  return (
    <motion.div
      layout={!isStreaming}
      transition={{ layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      className={
        "group flex min-w-0 max-w-[86%] items-start gap-2 text-sm leading-relaxed " +
        (message.role === "assistant"
          ? isLight
            ? "px-0 py-1 text-black/82"
            : "px-0 py-1 text-white/92"
          : isLight
            ? "rounded-2xl border border-black/10 bg-black/[0.04] px-3.5 py-3 text-black/80"
            : "rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-white/90")
      }
    >
      {isFilePreview ? (
        <div
          className={`w-full max-w-full overflow-hidden rounded-xl border ${
            isLight ? "border-black/10 bg-black/95 text-white" : "border-white/15 bg-black/80 text-white"
          }`}
        >
          <div className={`flex items-center justify-between gap-2 px-3 py-2 text-xs ${isLight ? "text-emerald-300" : "text-emerald-400"}`}>
            <span className="truncate font-mono">{message.filePath ?? "file"}</span>
            <button
              type="button"
              aria-label="Copy code"
              className="shrink-0 rounded p-1 hover:bg-white/10"
              onClick={() => {
                const toCopy = getDisplayCode(message.text) || message.text
                toCopy && navigator.clipboard.writeText(toCopy)
              }}
            >
              <CopyIcon className="h-3.5 w-3.5" />
            </button>
          </div>
          <pre className="max-h-[280px] overflow-auto px-3 pb-3 pt-0 text-[0.68rem] leading-relaxed text-indigo-100/95">
            <code>{getDisplayCode(message.text) || message.text}</code>
          </pre>
        </div>
      ) : isStatus ? (
        <span className={`text-xs ${isLight ? "text-black/45" : "text-white/45"}`}>{message.text}</span>
      ) : isProgress && mode === "agent" && !isStreaming ? (
        <AgentGeneratingContent
          isLight={isLight}
          isGenerating={isGenerating}
          generatingFile={generatingFile}
          streamedCode={streamedCode}
          streamingTargetCode={streamingTargetCode}
          progress={progress}
        />
      ) : showThinking && message.role === "assistant" ? (
        <span className={`flex items-center gap-1.5 text-xs ${isLight ? "text-black/45" : "text-white/50"}`}>
          <SpinnerIcon className={`h-3.5 w-3.5 animate-spin ${isLight ? "text-black/55" : "text-white/65"}`} />
          Thinking...
        </span>
      ) : message.role === "assistant" && isStreaming ? (
        <span className="whitespace-pre-wrap break-words">{displayText}</span>
      ) : (
        <span className="whitespace-pre-wrap">{displayText}</span>
      )}
      {message.role === "user" && mode === "agent" && !isProgress && !isStatus && (
        <div className="flex shrink-0 items-center gap-1 opacity-50 transition group-hover:opacity-100">
          <button
            type="button"
            aria-label="Edit"
            className={`rounded p-1.5 ${isLight ? "text-black/55 hover:bg-black/10 hover:text-black/80" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
            onClick={() => onEdit(message.text)}
          >
            <PencilIcon />
          </button>
          <button
            type="button"
            aria-label="Copy"
            className={`rounded p-1.5 ${isLight ? "text-black/55 hover:bg-black/10 hover:text-black/80" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
            onClick={() => navigator.clipboard.writeText(message.text)}
          >
            <CopyIcon />
          </button>
        </div>
      )}
    </motion.div>
  )
}

const CONVERSATION_FALLBACK_RESPONSE =
  "Nice. I'd reach for a mix of sparkle/ui components here. Soon I'll draft full layouts — for now, try: OAuthForm, SparkleButton, Callout, and Cards from the packs."
const AGENT_FALLBACK_RESPONSE =
  "Here's the code for your request. You can copy it from the Code panel or open in docs."

function shouldGenerateCode(prompt: string) {
  const text = prompt.toLowerCase().trim()
  if (!text) return false

  const codeIntentPatterns = [
    /\b(build|create|generate|make|maek|implement|code|add|write)\b/,
    /\b(component|ui|page|screen|layout|landing page|dashboard|button|form|style|styled)\b/,
    /\b(tsx|jsx|react|next\.?js|tailwind|css)\b/,
  ]
  const buttonLike = /\b(button|buton|butotn|btn|buttons)\b/.test(text)
  const uiRequest = /\b(stylish|hover|click|effect|animation|gradient)\b/.test(text)
  const hasAction = codeIntentPatterns[0].test(text)
  const hasUiDomain = codeIntentPatterns[1].test(text) || buttonLike
  const hasTech = codeIntentPatterns[2].test(text)

  if (hasAction && (hasUiDomain || hasTech)) return true
  if (hasAction && uiRequest) return true
  if ((hasUiDomain && hasTech) || text.length > 140) return true

  // Follow-up edit requests: "make it stylish", "edit it", "update the button", "change it to..."
  const editIntent =
    /\b(edit|update|change|improve|refine|fix)\b/.test(text) ||
    /\bmake\s+it\s+\w+/.test(text) ||
    /\b(make|style)\s+(it|the)\b/.test(text)
  if (editIntent && (uiRequest || hasUiDomain || /\b(it|the)\b/.test(text))) return true

  return false
}

/** Normalize API message to local ChatMessage */
function toChatMessage(m: {
  id: number
  role: string
  text: string
  kind?: string
  filePath?: string
}): ChatMessage {
  return {
    id: m.id,
    role: m.role === "user" ? "user" : "assistant",
    text: m.text,
    kind: m.kind as ChatMessage["kind"],
    filePath: m.filePath,
  }
}

export function ChatAssistant() {
  const {
    mode,
    setMode,
    isGenerating,
    setGenerating,
    setGeneratingFile,
    generatedCode,
    lastGeneratedFilePath,
    generatingFile,
    streamedCode,
    streamingTargetCode,
    triggerGeneration,
    currentChatId,
    setCurrentChatId,
    createChat,
    updateChat,
    agentTask,
    agentState,
    agentLog,
    setAgentTask,
    setAgentState,
    appendAgentLog,
    resetAgentSession,
    executionState,
    pendingInstallPackages,
    executionError,
    resolveDependencyInstall,
  } = useDashboard()
  const { data: session } = useSession()
  const { resolvedTheme } = useTheme()
  const [messages, setMessages] = useState<ChatMessage[]>(() => getInitialMessages())
  const loadedChatIdRef = useRef<string | null>(null)
  const currentChatIdRef = useRef<string | null>(currentChatId)
  currentChatIdRef.current = currentChatId
  const [input, setInput] = useState("")
  const [generatingMsgId, setGeneratingMsgId] = useState<number | null>(null)
  const [streamingMessageId, setStreamingMessageId] = useState<number | null>(null)
  const [streamingTarget, setStreamingTarget] = useState<string | null>(null)
  const [streamingCurrent, setStreamingCurrent] = useState("")
  const [thinkingMessageId, setThinkingMessageId] = useState<number | null>(null)
  const streamCleanupRef = useRef<(() => void) | null>(null)
  const agentReplyByIdRef = useRef<Record<number, string>>({})
  const pendingFileRef = useRef("src/App/page.tsx")
  const [agentProgressById, setAgentProgressById] = useState<Record<number, AgentProgressState>>({})
  const progressTimersRef = useRef<Record<number, ReturnType<typeof setTimeout>[]>>({})
  const [agentStatePanelOpen, setAgentStatePanelOpen] = useState(false)
  const statusKeyRef = useRef("")

  const refs = ASSISTANT_MODES[mode]
  const isLight = resolvedTheme === "light"
  const heroTitle = mode === "agent" ? "AI-first components" : "Thoughtful, modern design"
  const heroSubtitle =
    mode === "agent"
      ? "Components designed for AI interaction"
      : "Start from the most up to date UI patterns in AI products"

  const requestAiReply = async (prompt: string, replyMode: AssistantMode) => {
    const fallback = replyMode === "agent" ? AGENT_FALLBACK_RESPONSE : CONVERSATION_FALLBACK_RESPONSE
    const logTail = agentLog.slice(-20).map((e) => `[${new Date(e.timestamp).toISOString()}] ${e.action}${e.result ? `: ${e.result}` : ""}`).join("\n")
    const taskContext = { task: agentTask, state: agentState, logTail }
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 25_000)
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: "chat", mode: replyMode, prompt, taskContext }),
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(typeof err?.error === "string" ? err.error : "AI chat request failed")
      }
      const data = await response.json()
      if (typeof data?.text === "string" && data.text.trim().length > 0) {
        return data.text.trim()
      }
      throw new Error("Empty AI response")
    } catch (err) {
      clearTimeout(timeoutId)
      return fallback
    }
  }

  const clearProgressTimers = (id: number) => {
    const timers = progressTimersRef.current[id] ?? []
    timers.forEach((timer) => clearTimeout(timer))
    delete progressTimersRef.current[id]
  }

  useEffect(() => {
    return () => {
      streamCleanupRef.current?.()
      Object.keys(progressTimersRef.current).forEach((key) => clearProgressTimers(Number(key)))
    }
  }, [])

  // Load chat when currentChatId changes (saved to account)
  useEffect(() => {
    if (currentChatId === null) {
      loadedChatIdRef.current = null
      setMessages([])
      return
    }
    if (currentChatId === loadedChatIdRef.current) return
    loadedChatIdRef.current = currentChatId
    let cancelled = false
    fetch(`/api/chats/${currentChatId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((chat) => {
        if (cancelled || !chat?.messages) return
        // #region agent log
        fetch("http://127.0.0.1:7243/ingest/1559cb0d-dcd7-480b-95b9-729473f06d3d",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({runId:"run1",hypothesisId:"H3",location:"chat-assistant.tsx:loadChat:applyFetched",message:"applying fetched chat messages",data:{currentChatId,fetchedCount:Array.isArray(chat.messages)?chat.messages.length:0},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        setMessages(chat.messages.map(toChatMessage))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [currentChatId])

  const persistMessages = useCallback(
    (nextMessages: ChatMessage[]) => {
      const chatId = currentChatIdRef.current
      if (!session?.user || !chatId) return
      updateChat(chatId, {
        messages: nextMessages.map((m) => ({
          id: m.id,
          role: m.role,
          text: m.text,
          kind: m.kind,
          ...(m.filePath != null ? { filePath: m.filePath } : {}),
        })),
      })
    },
    [session?.user, updateChat]
  )

  useEffect(() => {
    if (!isGenerating && generatedCode && generatingMsgId !== null) {
      const writtenPath = lastGeneratedFilePath ?? pendingFileRef.current
      const finalReply = `Wrote ${writtenPath} to your sandbox. Running dependency/build checks next.`
      setAgentState("finalizing")
      appendAgentLog("File created", writtenPath)
      setAgentProgressById((prev) => {
        const current = prev[generatingMsgId]
        if (!current) return prev
        return {
          ...prev,
          [generatingMsgId]: {
            ...current,
            stage: "finalizing",
          },
        }
      })
      setStreamingMessageId(generatingMsgId)
      setStreamingTarget(finalReply)
      setStreamingCurrent("")

      streamCleanupRef.current?.()
      streamCleanupRef.current = streamText(
        finalReply,
        (current) => setStreamingCurrent(current),
        () => {
          setMessages((prev) => {
            const updated = prev.map((m) =>
              m.id === generatingMsgId ? { ...m, text: finalReply, kind: "text" as const } : m
            )
            const statusId = Date.now() + 2
            const filePath = lastGeneratedFilePath ?? pendingFileRef.current
            const withStatus: ChatMessage[] = [
              ...updated,
              {
                id: statusId,
                role: "assistant" as const,
                text: `✓ ${filePath} created`,
                kind: "status" as const,
              },
            ]
            if (generatedCode && filePath) {
              withStatus.push({
                id: statusId + 1,
                role: "assistant",
                text: generatedCode,
                kind: "file_preview",
                filePath,
              })
            }
            persistMessages(withStatus)
            return withStatus
          })
          setStreamingMessageId(null)
          setStreamingTarget(null)
          setStreamingCurrent("")
          setGeneratingMsgId(null)
          setAgentState("idle")
          delete agentReplyByIdRef.current[generatingMsgId]
          clearProgressTimers(generatingMsgId)
          setAgentProgressById((prev) => {
            const next = { ...prev }
            delete next[generatingMsgId]
            return next
          })
        }
      )
    }
  }, [isGenerating, generatedCode, lastGeneratedFilePath, generatingMsgId, persistMessages, setAgentState, appendAgentLog])

  useEffect(() => {
    if (mode !== "agent") return
    const statusMap: Record<string, string> = {
      pending_install_confirmation: `Dependency confirmation required: ${pendingInstallPackages.join(", ")}`,
      installing: "Installing dependencies in sandbox...",
      building: "Running sandbox build...",
      ready: "Sandbox build succeeded.",
      error: executionError || "Sandbox pipeline failed.",
    }
    const text = statusMap[executionState]
    if (!text) return
    const nextKey = `${executionState}:${text}`
    if (statusKeyRef.current === nextKey) return
    statusKeyRef.current = nextKey
    setMessages((prev) => {
      const next = [...prev, { id: Date.now(), role: "assistant", text, kind: "status" as const }]
      persistMessages(next)
      return next
    })
  }, [executionState, pendingInstallPackages, executionError, mode, persistMessages])

  const handleSend = async (value?: string) => {
    const trimmed = (value ?? input).trim()
    if (!trimmed) return
    // #region agent log
    fetch("http://127.0.0.1:7243/ingest/1559cb0d-dcd7-480b-95b9-729473f06d3d",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({runId:"run1",hypothesisId:"H2",location:"chat-assistant.tsx:handleSend:start",message:"handleSend invoked",data:{mode,trimmed,currentChatId:currentChatId ?? null,hasSession:Boolean(session?.user)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    if (mode === "agent") {
      setAgentTask(trimmed)
      appendAgentLog("User request", trimmed)
    }

    const userMsg: ChatMessage = { id: Date.now(), role: "user", text: trimmed }
    const nextMessages: ChatMessage[] = [...messages, userMsg]
    setMessages(nextMessages)
    setInput("")

    // Create a new chat when signed in and no current chat; otherwise persist current messages
    if (session?.user && currentChatId === null) {
      const title = trimmed.length > 50 ? `${trimmed.slice(0, 47)}...` : trimmed
      const chat = await createChat(title, [userMsg].map((m) => ({ id: m.id, role: m.role, text: m.text, kind: m.kind })))
      if (chat) {
        // Prevent the currentChatId effect from immediately re-fetching and
        // overwriting in-progress assistant/progress messages.
        loadedChatIdRef.current = chat.id
        setCurrentChatId(chat.id)
        currentChatIdRef.current = chat.id
      }
    } else if (session?.user && currentChatId) {
      persistMessages(nextMessages)
    }

    if (mode === "agent") {
      const shouldRunGeneration = shouldGenerateCode(trimmed)
      // #region agent log
      fetch("http://127.0.0.1:7243/ingest/1559cb0d-dcd7-480b-95b9-729473f06d3d",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({runId:"run1",hypothesisId:"H1",location:"chat-assistant.tsx:handleSend:decision",message:"generation decision",data:{trimmed,shouldRunGeneration},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      if (!shouldRunGeneration) {
        // #region agent log
        fetch("http://127.0.0.1:7243/ingest/1559cb0d-dcd7-480b-95b9-729473f06d3d",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({runId:"run1",hypothesisId:"H1",location:"chat-assistant.tsx:handleSend:chatPath",message:"routed to chat path",data:{trimmed},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        const assistantId = Date.now() + 1
        const replyPromise = requestAiReply(trimmed, "agent")
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: "assistant", text: "" },
        ])
        setStreamingMessageId(assistantId)
        setStreamingTarget(AGENT_FALLBACK_RESPONSE)
        setStreamingCurrent("")
        setThinkingMessageId(assistantId)

        const thinkingDelay = 260
        const thinkingTimer = setTimeout(async () => {
          let finalReply: string
          try {
            finalReply = await Promise.race([
              replyPromise,
              new Promise<string>((_, reject) =>
                setTimeout(() => reject(new Error("timeout")), 30_000)
              ),
            ])
          } catch {
            finalReply = AGENT_FALLBACK_RESPONSE
          }
          setThinkingMessageId(null)
          streamCleanupRef.current?.()
          streamCleanupRef.current = streamText(
            finalReply,
            (current) => setStreamingCurrent(current),
            () => {
              setMessages((prev) => {
                const updated = prev.map((m) =>
                  m.id === assistantId ? { ...m, text: finalReply, kind: "text" as const } : m
                )
                persistMessages(updated)
                return updated
              })
              setStreamingMessageId(null)
              setStreamingTarget(null)
              setStreamingCurrent("")
            }
          )
        }, thinkingDelay)

        streamCleanupRef.current = () => clearTimeout(thinkingTimer)
        return
      }

      const placeholderId = Date.now() + 1
      const codeGenFile = "src/App/page.tsx"
      // #region agent log
      fetch("http://127.0.0.1:7243/ingest/1559cb0d-dcd7-480b-95b9-729473f06d3d",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({runId:"run1",hypothesisId:"H1",location:"chat-assistant.tsx:handleSend:generationPath",message:"routed to generation path",data:{trimmed,placeholderId,codeGenFile},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      pendingFileRef.current = codeGenFile
      setGenerating(true)
      setGeneratingFile(codeGenFile)
      setGeneratingMsgId(placeholderId)
      setMessages((prev) => [
        ...prev,
        { id: placeholderId, role: "assistant", text: "", kind: "progress" },
      ])
      setAgentState("planning")
      appendAgentLog("Planning")
      setAgentProgressById((prev) => ({
        ...prev,
        [placeholderId]: {
          stage: "planning",
          planText: "",
          workspaceNotes: [],
          fileName: pendingFileRef.current,
        },
      }))

      const planPrompt = `In 1-2 short sentences, explain what you will build for this request: "${trimmed}". Keep it concrete and UI-focused.`
      const analyzeTimer = setTimeout(() => {
        setAgentState("analyzing")
        appendAgentLog("Analyzing workspace")
        setAgentProgressById((prev) => {
          const current = prev[placeholderId]
          if (!current) return prev
          return {
            ...prev,
            [placeholderId]: {
              ...current,
              stage: "analyzing",
              workspaceNotes: ["Read app/dashboard/page.tsx", "Inspected dashboard components"],
            },
          }
        })
      }, 650)

      const generateTimer = setTimeout(() => {
        setAgentState("generating")
        appendAgentLog("Generating", pendingFileRef.current)
        setAgentProgressById((prev) => {
          const current = prev[placeholderId]
          if (!current) return prev
          return {
            ...prev,
            [placeholderId]: {
              ...current,
              stage: "generating",
            },
          }
        })
        void triggerGeneration(trimmed)
      }, 1450)

      progressTimersRef.current[placeholderId] = [analyzeTimer, generateTimer]

      void requestAiReply(planPrompt, "agent").then((reply) => {
        setAgentProgressById((prev) => {
          const current = prev[placeholderId]
          if (!current) return prev
          return {
            ...prev,
            [placeholderId]: {
              ...current,
              planText: reply,
            },
          }
        })
      })

      // #region agent log
      fetch("http://127.0.0.1:7243/ingest/1559cb0d-dcd7-480b-95b9-729473f06d3d",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({runId:"post-fix",hypothesisId:"H9",location:"chat-assistant.tsx:handleSend:skipAgentCodeReply",message:"skip secondary agent code reply to avoid conflicting chat code",data:{placeholderId},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
    } else {
      const assistantId = Date.now() + 1
      const replyPromise = requestAiReply(trimmed, "conversation")
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", text: "" },
      ])
      setStreamingMessageId(assistantId)
      setStreamingTarget(CONVERSATION_FALLBACK_RESPONSE)
      setStreamingCurrent("")
      setThinkingMessageId(assistantId)

      const thinkingDelay = 350
      const thinkingTimer = setTimeout(async () => {
        let finalReply: string
        try {
          finalReply = await Promise.race([
            replyPromise,
            new Promise<string>((_, reject) =>
              setTimeout(() => reject(new Error("timeout")), 30_000)
            ),
          ])
        } catch {
          finalReply = CONVERSATION_FALLBACK_RESPONSE
        }
        setThinkingMessageId(null)
        streamCleanupRef.current?.()
        streamCleanupRef.current = streamText(
          finalReply,
          (current) => setStreamingCurrent(current),
          () => {
            setMessages((prev) => {
              const updated = prev.map((m) =>
                m.id === assistantId ? { ...m, text: finalReply } : m
              )
              persistMessages(updated)
              return updated
            })
            setStreamingMessageId(null)
            setStreamingTarget(null)
            setStreamingCurrent("")
          }
        )
      }, thinkingDelay)

      streamCleanupRef.current = () => clearTimeout(thinkingTimer)
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt)
    handleSend(prompt)
  }

  const handleModeChange = (newMode: AssistantMode) => {
    if (newMode === mode) return
    streamCleanupRef.current?.()
    Object.keys(progressTimersRef.current).forEach((key) => clearProgressTimers(Number(key)))
    setMessages(getInitialMessages())
    setStreamingMessageId(null)
    setStreamingTarget(null)
    setStreamingCurrent("")
    setThinkingMessageId(null)
    setGeneratingMsgId(null)
    setAgentProgressById({})
    setMode(newMode)
  }

  const hasMessages = messages.length > 0

  const composer = (className?: string) => (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault()
        handleSend()
      }}
    >
      <div
        className={`rounded-[1.45rem] p-4 transition ${
          isLight
            ? "border border-black/10 bg-white/72 focus-within:border-black/20"
            : "border border-white/[0.08] bg-white/[0.04] focus-within:border-white/20"
        }`}
      >
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={refs.placeholder}
          className={`min-h-[64px] w-full resize-none border-0 bg-transparent text-base focus:outline-none ${
            isLight ? "text-black/75 placeholder:text-black/35" : "text-white placeholder:text-white/40"
          }`}
        />
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Attach"
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
                isLight
                  ? "border border-black/12 bg-black/[0.03] text-black/60 hover:bg-black/[0.06]"
                  : "border border-white/12 bg-black/25 text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              <PaperclipIcon />
              <span className="text-xs">Attach</span>
            </button>
            <button
              type="button"
              aria-label="Online"
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
                isLight
                  ? "border border-black/12 bg-black/[0.03] text-black/60 hover:bg-black/[0.06]"
                  : "border border-white/12 bg-black/25 text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              <GlobeIcon />
              <span className="text-xs">Online</span>
            </button>
            {mode === "conversation" && (
              <>
                <button
                  type="button"
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition ${
                    isLight
                      ? "border border-black/12 bg-black/[0.03] text-black/60 hover:bg-black/[0.06]"
                      : "border border-white/12 bg-black/25 text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Research
                </button>
                <button
                  type="button"
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition ${
                    isLight
                      ? "border border-black/12 bg-black/[0.03] text-black/60 hover:bg-black/[0.06]"
                      : "border border-white/12 bg-black/25 text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Tools
                </button>
              </>
            )}
          </div>
          <MessageSendButton compact onClick={() => handleSend()} />
        </div>
      </div>
    </form>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex h-full min-h-0 overflow-hidden flex-col rounded-2xl p-4 backdrop-blur-xl md:p-6 ${
        isLight ? "bg-white/15" : "bg-transparent"
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p
            className={`truncate text-[0.86rem] ${isLight ? "text-black/78" : "text-white/86"}`}
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            AI Landing Page
          </p>
          <p className={`truncate text-[0.62rem] ${isLight ? "text-black/48" : "text-white/50"}`}>Untitled project</p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`flex gap-1 rounded-full p-0.5 text-[0.65rem] ${
              isLight ? "border border-black/10 bg-white/75" : "border border-white/12 bg-black/40"
            }`}
          >
            <button
              type="button"
              onClick={() => handleModeChange("conversation")}
              className={`rounded-full px-2.5 py-1 transition ${
                mode === "conversation"
                  ? isLight
                    ? "bg-black/10 text-black/85"
                    : "bg-white/20 text-white"
                  : isLight
                    ? "text-black/55 hover:text-black/80"
                    : "text-white/60 hover:text-white/80"
              }`}
            >
              Conversation
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("agent")}
              className={`rounded-full px-2.5 py-1 transition ${
                mode === "agent"
                  ? isLight
                    ? "bg-black/10 text-black/85"
                    : "bg-white/20 text-white"
                  : isLight
                    ? "text-black/55 hover:text-black/80"
                    : "text-white/60 hover:text-white/80"
              }`}
            >
              Agent
            </button>
          </div>
          {mode === "agent" && (
            <button
              type="button"
              onClick={() => resetAgentSession()}
              className={`rounded-md px-2 py-1 text-[0.62rem] transition ${
                isLight
                  ? "border border-black/10 bg-white/70 text-black/62 hover:bg-white"
                  : "border border-white/15 bg-white/[0.07] text-white/75 hover:bg-white/[0.12]"
              }`}
            >
              New session
            </button>
          )}
          <button
            type="button"
            className={`rounded-md px-2 py-1 text-[0.62rem] transition ${
              isLight
                ? "border border-black/10 bg-white/70 text-black/62 hover:bg-white"
                : "border border-white/15 bg-white/[0.07] text-white/75 hover:bg-white/[0.12]"
            }`}
          >
            Share
          </button>
          <button
            type="button"
            className={`rounded-md px-2 py-1 text-[0.62rem] transition ${
              isLight ? "bg-black text-white hover:bg-black/85" : "bg-white text-black hover:bg-white/85"
            }`}
          >
            Publish
          </button>
        </div>
      </div>

      {mode === "agent" && (
        <div className={`mb-3 rounded-xl border ${isLight ? "border-black/10 bg-white/40" : "border-white/10 bg-white/[0.03]"}`}>
          <button
            type="button"
            onClick={() => setAgentStatePanelOpen((o) => !o)}
            className={`flex w-full items-center justify-between px-3 py-2 text-left text-[0.7rem] ${isLight ? "text-black/70" : "text-white/70"}`}
          >
            <span className="font-medium">Agent state</span>
            <span className={`transition-transform ${agentStatePanelOpen ? "rotate-180" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </span>
          </button>
          {agentStatePanelOpen && (
            <div className={`border-t px-3 py-2 text-[0.65rem] ${isLight ? "border-black/10 text-black/65" : "border-white/10 text-white/60"}`}>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <p className={`font-semibold uppercase tracking-wider ${isLight ? "text-black/50" : "text-white/50"}`}>TASK</p>
                  <p className="mt-0.5 break-words">{agentTask || "—"}</p>
                </div>
                <div>
                  <p className={`font-semibold uppercase tracking-wider ${isLight ? "text-black/50" : "text-white/50"}`}>STATE</p>
                  <p className="mt-0.5">{agentState}</p>
                </div>
              </div>
              <div className="mt-3">
                <p className={`font-semibold uppercase tracking-wider ${isLight ? "text-black/50" : "text-white/50"}`}>LOG (last 15)</p>
                <ul className="mt-1 max-h-24 space-y-0.5 overflow-y-auto font-mono">
                  {agentLog.slice(-15).map((e, i) => (
                    <li key={`${e.timestamp}-${i}`} className="truncate">
                      [{new Date(e.timestamp).toLocaleTimeString()}] {e.action}
                      {e.result ? `: ${e.result}` : ""}
                    </li>
                  ))}
                  {agentLog.length === 0 && <li className="text-black/40 dark:text-white/40">—</li>}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {mode === "agent" && executionState === "pending_install_confirmation" && pendingInstallPackages.length > 0 && (
        <div
          className={`mb-3 rounded-xl border p-3 text-[0.72rem] ${
            isLight ? "border-black/12 bg-amber-50 text-black/75" : "border-amber-400/30 bg-amber-400/10 text-amber-100"
          }`}
        >
          <p className="font-medium">Install missing dependencies?</p>
          <p className="mt-1 break-words font-mono">{pendingInstallPackages.join(", ")}</p>
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => void resolveDependencyInstall(true)}
              className={`rounded-md px-2.5 py-1 text-[0.68rem] font-medium ${
                isLight ? "bg-black text-white hover:bg-black/85" : "bg-white text-black hover:bg-white/85"
              }`}
            >
              Install and continue
            </button>
            <button
              type="button"
              onClick={() => void resolveDependencyInstall(false)}
              className={`rounded-md px-2.5 py-1 text-[0.68rem] ${
                isLight ? "border border-black/15 hover:bg-black/5" : "border border-white/20 hover:bg-white/10"
              }`}
            >
              Skip install
            </button>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        {!hasMessages ? (
          <motion.section
            key={`empty-state-${mode}`}
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.985 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-1 items-center justify-center overflow-hidden rounded-2xl"
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.16]"
              aria-hidden
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 120px)",
              }}
            />
            <div className="relative z-10 w-full max-w-3xl px-4">
              <div className="relative min-h-[11rem] text-center md:min-h-[13rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`hero-copy-${mode}`}
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <p
                      className={`text-balance text-5xl md:text-7xl ${isLight ? "text-black/85" : "text-white/95"}`}
                      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                      {heroTitle}
                    </p>
                    <p className={`mt-3 text-sm md:text-3xl ${isLight ? "text-black/58" : "text-white/70"}`}>
                      {heroSubtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-6">{composer()}</div>

              {mode === "conversation" ? (
                <div
                  className={`mx-auto mt-4 max-w-xl rounded-xl p-3 ${
                    isLight ? "border border-black/10 bg-white/65" : "border border-white/10 bg-white/[0.04]"
                  }`}
                >
                  <div className={`mb-2 text-xs ${isLight ? "text-black/50" : "text-white/55"}`}>Learn</div>
                  <div className="space-y-1.5">
                    {refs.quickPrompts.slice(0, 4).map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => handleQuickPrompt(prompt)}
                        className={`w-full rounded-md px-3 py-2 text-left text-xs transition ${
                          isLight
                            ? "border border-black/8 bg-black/[0.02] text-black/65 hover:bg-black/[0.05]"
                            : "border border-white/8 bg-white/[0.03] text-white/70 hover:bg-white/[0.06]"
                        }`}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="relative mt-5">
                  <div className="mx-auto mb-4 flex max-w-2xl flex-wrap items-center justify-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleQuickPrompt("Fix primary color build error")}
                      className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs transition ${
                        isLight
                          ? "border border-black/12 bg-white/80 text-black/70 hover:bg-white"
                          : "border border-white/[0.14] bg-white/[0.05] text-white/80 hover:bg-white/12"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-300" />
                      <span>Change Primary Color</span>
                      <span className={`rounded-md px-2 py-0.5 text-[0.68rem] ${isLight ? "bg-black/8" : "bg-white/10"}`}>Fix</span>
                    </button>
                    {["E-commerce website", "Portfolio site", "Landing page"].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handleQuickPrompt(chip)}
                        className={`rounded-full px-3.5 py-2 text-xs shadow-sm backdrop-blur-sm transition ${
                          isLight
                            ? "border border-black/12 bg-white/80 text-black/70 hover:border-black/20 hover:bg-white"
                            : "border border-white/[0.12] bg-white/[0.05] text-white/80 hover:border-white/30 hover:bg-white/12"
                        }`}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {refs.quickPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => handleQuickPrompt(prompt)}
                        className={`rounded-full px-3.5 py-2 text-xs shadow-sm backdrop-blur-sm transition ${
                          isLight
                            ? "border border-black/12 bg-white/80 text-black/70 hover:border-black/20 hover:bg-white"
                            : "border border-white/[0.12] bg-white/[0.05] text-white/80 hover:border-white/30 hover:bg-white/12"
                        }`}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        ) : (
          <motion.section
            key={`active-state-${mode}`}
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.985 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div
              className={`relative flex-1 overflow-hidden rounded-2xl ${
                isLight ? "border border-black/8 bg-white/60" : "border border-white/[0.05] bg-black/28"
              }`}
            >
              <div className="absolute inset-0 pointer-events-none opacity-[0.08]" aria-hidden />
              <div className="relative flex h-full min-h-0 flex-col gap-3 overflow-y-auto p-4 pr-3">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <ChatBubble
                      message={message}
                      mode={mode}
                      isLight={isLight}
                      isGenerating={isGenerating}
                      generatingFile={generatingFile}
                      streamedCode={streamedCode}
                      streamingTargetCode={streamingTargetCode}
                      streamingMessageId={streamingMessageId}
                      streamingTarget={streamingTarget}
                      streamingCurrent={streamingCurrent}
                      thinkingMessageId={thinkingMessageId}
                      progress={agentProgressById[message.id]}
                      onEdit={setInput}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {composer("mt-5")}
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
