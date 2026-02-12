"use client"

import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"
import type { AssistantMode } from "@/lib/dashboard-references"
import type { ChatSummary, ChatPayload, ChatMessagePayload } from "@/lib/chats"
import { extractCodeBlock, normalizeUiImports } from "@/lib/code-parse"

export type SandboxExecutionState =
  | "idle"
  | "generating"
  | "pending_install_confirmation"
  | "installing"
  | "building"
  | "ready"
  | "error"

type DashboardContextValue = {
  mode: AssistantMode
  setMode: (mode: AssistantMode) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  isGenerating: boolean
  setGenerating: (v: boolean) => void
  generatingFile: string | null
  setGeneratingFile: (path: string | null) => void
  streamedCode: string
  generatedCode: string | null
  /** Path of the file that was just generated/written (e.g. app/page.tsx). */
  lastGeneratedFilePath: string | null
  streamingTargetCode: string | null
  streamingDiffCode: string | null
  projectFiles: Record<string, string>
  activeFilePath: string
  setActiveFilePath: (path: string) => void
  lastPrompt: string
  triggerGeneration: (prompt: string) => Promise<void>
  /** Saved chats for the current user (when signed in) */
  chats: ChatSummary[]
  /** Currently selected chat id, or null for "new" chat */
  currentChatId: string | null
  setCurrentChatId: (id: string | null) => void
  loadChats: () => Promise<void>
  createChat: (title: string, messages: ChatMessagePayload[]) => Promise<ChatPayload | null>
  updateChat: (id: string, payload: { title?: string; messages?: ChatMessagePayload[] }) => Promise<void>
  deleteChat: (id: string) => Promise<void>
  /** Agent brain: session-scoped task, state, log */
  agentTask: string
  agentState: string
  agentLog: Array<{ timestamp: number; action: string; result?: string }>
  setAgentTask: (task: string) => void
  setAgentState: (state: string) => void
  appendAgentLog: (action: string, result?: string) => void
  resetAgentSession: () => void
  /** Terminal (server exec) output; append-only. */
  terminalOutput: string
  terminalRunning: boolean
  runCommand: (command: string, args?: string[], opts?: { cwd?: string }) => Promise<number>
  clearTerminal: () => void
  executionState: SandboxExecutionState
  pendingInstallPackages: string[]
  executionError: string | null
  workspaceRoot: string | null
  runtimePreviewUrl: string | null
  resolveDependencyInstall: (approved: boolean) => Promise<void>
  /** Fix build errors in the given file; returns true if fixed and written. */
  fixBuildError: (path: string, content: string, errorMessage?: string) => Promise<boolean>
  fixingBuild: boolean
}

const DashboardContext = createContext<DashboardContextValue | null>(null)

/** Minimal fallback when AI returns no code; real project uses app/ router. */
const FALLBACK_GENERATED_CODE = `export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <p>Generated content will appear here.</p>
    </div>
  )
}
`

const DEFAULT_GENERATED_FILE = "src/App/page.tsx"

function inferTargetFile(prompt: string, knownPaths: string[]) {
  const text = prompt.toLowerCase()
  if (knownPaths.some((p) => p.includes("dashboard")) && /\b(dashboard|agent)\b/.test(text)) {
    const d = knownPaths.find((p) => p.includes("dashboard"))
    return d ?? DEFAULT_GENERATED_FILE
  }
  if (knownPaths.some((p) => /button|Button/.test(p)) && /\b(button|cta|component)\b/.test(text)) {
    const btn = knownPaths.find((p) => /button|Button/.test(p))
    return btn ?? DEFAULT_GENERATED_FILE
  }
  if (knownPaths.some((p) => p.endsWith(".css")) && /\b(style|css|theme)\b/.test(text)) {
    const css = knownPaths.find((p) => p.endsWith(".css"))
    return css ?? DEFAULT_GENERATED_FILE
  }
  return knownPaths.includes(DEFAULT_GENERATED_FILE) ? DEFAULT_GENERATED_FILE : knownPaths[0] ?? DEFAULT_GENERATED_FILE
}

function isEditPrompt(prompt: string) {
  return /\b(edit|update|change|fix|remove|refactor|replace|make it|maek|modify|stylish|style|improve|refine)\b/i.test(prompt)
}

function buildUnifiedDiff(previous: string, next: string) {
  const a = previous.split("\n")
  const b = next.split("\n")
  const out: string[] = []

  let i = 0
  let j = 0
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) {
      out.push(` ${a[i]}`)
      i += 1
      j += 1
      continue
    }

    if (i + 1 < a.length && j < b.length && a[i + 1] === b[j]) {
      out.push(`-${a[i]}`)
      i += 1
      continue
    }

    if (j + 1 < b.length && i < a.length && a[i] === b[j + 1]) {
      out.push(`+${b[j]}`)
      j += 1
      continue
    }

    if (i < a.length) {
      out.push(`-${a[i]}`)
      i += 1
    }
    if (j < b.length) {
      out.push(`+${b[j]}`)
      j += 1
    }
  }

  return out.join("\n")
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AssistantMode>("conversation")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatingFile, setGeneratingFile] = useState<string | null>(null)
  const [streamedCode, setStreamedCode] = useState("")
  const [generatedCode, setGeneratedCode] = useState<string | null>(null)
  const [lastGeneratedFilePath, setLastGeneratedFilePath] = useState<string | null>(null)

  const [streamingTargetCode, setStreamingTargetCode] = useState<string | null>(null)
  const [streamingDiffCode, setStreamingDiffCode] = useState<string | null>(null)
  const [projectFiles, setProjectFiles] = useState<Record<string, string>>({})
  const [activeFilePath, setActiveFilePath] = useState("src/App/page.tsx")
  const [lastPrompt, setLastPrompt] = useState("")
  const [chats, setChats] = useState<ChatSummary[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [agentTask, setAgentTask] = useState("")
  const [agentState, setAgentState] = useState("idle")
  const [agentLog, setAgentLog] = useState<Array<{ timestamp: number; action: string; result?: string }>>([])
  const [terminalOutput, setTerminalOutput] = useState("")
  const [terminalRunning, setTerminalRunning] = useState(false)
  const [fixingBuild, setFixingBuild] = useState(false)
  const [executionState, setExecutionState] = useState<SandboxExecutionState>("idle")
  const [pendingInstallPackages, setPendingInstallPackages] = useState<string[]>([])
  const [executionError, setExecutionError] = useState<string | null>(null)
  const [workspaceRoot, setWorkspaceRoot] = useState<string | null>(null)
  const [runtimePreviewUrl, setRuntimePreviewUrl] = useState<string | null>(null)

  const clearTerminal = useCallback(() => setTerminalOutput(""), [])

  const runCommand = useCallback(async (command: string, args: string[] = [], opts?: { cwd?: string }) => {
    const displayCmd = [command, ...args].join(" ")
    setTerminalOutput((prev) => (prev ? `${prev}\n$ ${displayCmd}\n` : `$ ${displayCmd}\n`))
    setTerminalRunning(true)
    let exitCode = 0
    try {
      const res = await fetch("/api/agent/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: command.trim(), args, ...(opts?.cwd ? { cwd: opts.cwd } : {}) }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        const message = typeof err?.error === "string" ? err.error : "Request failed"
        setTerminalOutput((prev) => prev + message + "\n")
        return 1
      }
      const reader = res.body?.getReader()
      if (!reader) {
        setTerminalOutput((prev) => prev + "(no response body)\n")
        return 1
      }

      const dec = new TextDecoder()
      let buf = ""
      const handleLine = (line: string) => {
        if (!line.trim()) return
        try {
          const obj = JSON.parse(line) as {
            type: string
            text?: string
            message?: string
            code?: number
            workspaceRoot?: string
          }
          if ((obj.type === "stdout" || obj.type === "stderr") && typeof obj.text === "string") {
            setTerminalOutput((prev) => prev + obj.text)
            return
          }
          if (obj.type === "start" && typeof obj.workspaceRoot === "string") {
            setWorkspaceRoot(obj.workspaceRoot)
            return
          }
          if (obj.type === "exit" && typeof obj.code === "number") {
            exitCode = obj.code
            if (obj.code !== 0) setTerminalOutput((prev) => prev + `\n(exit ${obj.code})\n`)
            return
          }
          if (obj.type === "error" && typeof obj.message === "string") {
            setTerminalOutput((prev) => prev + obj.message + "\n")
            if (exitCode === 0) exitCode = 1
          }
        } catch {
          // ignore malformed lines
        }
      }

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buf += dec.decode(value, { stream: true })
        const lines = buf.split("\n")
        buf = lines.pop() ?? ""
        lines.forEach(handleLine)
      }
      if (buf.trim()) handleLine(buf)
    } finally {
      setTerminalRunning(false)
    }
    return exitCode
  }, [])

  const runBuildPipeline = useCallback(async () => {
    setExecutionState("building")
    setExecutionError(null)
    const code = await runCommand("npm", ["run", "build"])
    if (code === 0) {
      setExecutionState("ready")
      setRuntimePreviewUrl(null)
      return true
    }
    setExecutionState("error")
    setExecutionError("Build failed. Review terminal output and run Fix to repair code.")
    return false
  }, [runCommand])

  const resolveDependencyInstall = useCallback(async (approved: boolean) => {
    if (!approved) {
      setExecutionState("error")
      setExecutionError("Dependency installation was declined.")
      return
    }
    if (pendingInstallPackages.length === 0) {
      await runBuildPipeline()
      return
    }
    setExecutionState("installing")
    setExecutionError(null)
    const code = await runCommand("npm", ["install", ...pendingInstallPackages])
    if (code !== 0) {
      setExecutionState("error")
      setExecutionError("Dependency install failed. See terminal output.")
      return
    }
    setPendingInstallPackages([])
    await runBuildPipeline()
  }, [pendingInstallPackages, runBuildPipeline, runCommand])

  const fixBuildError = useCallback(
    async (path: string, content: string, errorMessage?: string): Promise<boolean> => {
      setFixingBuild(true)
      try {
        const res = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task: "fix",
            path,
            content,
            errorMessage: errorMessage ?? "",
          }),
        })
        if (!res.ok) return false
        const data = (await res.json()) as { code?: string }
        const fixed = typeof data?.code === "string" ? extractCodeBlock(data.code) || data.code.trim() : ""
        if (!fixed) return false
        const writeRes = await fetch("/api/agent/files", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "write", path, content: fixed }),
        })
        if (!writeRes.ok) return false
        const written = (await writeRes.json()) as { path: string; content: string; missingPackages?: string[] }
        setProjectFiles((prev) => ({ ...prev, [written.path]: written.content }))
        setGeneratedCode((prev) => (prev && path === activeFilePath ? written.content : prev))
        if (Array.isArray(written.missingPackages) && written.missingPackages.length > 0) {
          setPendingInstallPackages(written.missingPackages)
          setExecutionState("pending_install_confirmation")
        } else {
          await runBuildPipeline()
        }
        return true
      } catch {
        return false
      } finally {
        setFixingBuild(false)
      }
    },
    [activeFilePath, runBuildPipeline]
  )

  const loadProjectFiles = useCallback(async () => {
    try {
      const res = await fetch("/api/agent/files")
      if (!res.ok) return
      const data = (await res.json()) as { files?: string[]; contents?: Record<string, string>; workspaceRoot?: string }
      const contents = data.contents ?? {}
      const files = data.files ?? Object.keys(contents)
      if (typeof data.workspaceRoot === "string") setWorkspaceRoot(data.workspaceRoot)
      if (Object.keys(contents).length > 0) {
        setProjectFiles(contents)
        setActiveFilePath((prev) => (files.includes(prev) ? prev : files[0] ?? "src/App/page.tsx"))
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    loadProjectFiles()
  }, [loadProjectFiles])

  const appendAgentLog = useCallback((action: string, result?: string) => {
    setAgentLog((prev) => [...prev, { timestamp: Date.now(), action, result }])
  }, [])

  const resetAgentSession = useCallback(() => {
    setAgentTask("")
    setAgentState("idle")
    setAgentLog([])
  }, [])

  const loadChats = useCallback(async () => {
    try {
      const res = await fetch("/api/chats")
      const data = await res.json()
      setChats(Array.isArray(data.chats) ? data.chats : [])
    } catch {
      setChats([])
    }
  }, [])

  const createChat = useCallback(async (title: string, messages: ChatMessagePayload[]) => {
    try {
      const res = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, messages }),
      })
      if (!res.ok) return null
      const chat = (await res.json()) as ChatPayload
      setChats((prev) => [{ id: chat.id, title: chat.title, updatedAt: chat.updatedAt }, ...prev])
      return chat
    } catch {
      return null
    }
  }, [])

  const updateChat = useCallback(async (id: string, payload: { title?: string; messages?: ChatMessagePayload[] }) => {
    try {
      const res = await fetch(`/api/chats/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) return
      const updated = (await res.json()) as ChatPayload
      setChats((prev) =>
        prev.map((c) => (c.id === id ? { id: updated.id, title: updated.title, updatedAt: updated.updatedAt } : c))
      )
    } catch {
      // ignore
    }
  }, [])

  const deleteChat = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/chats/${id}`, { method: "DELETE" })
      if (!res.ok) return
      setChats((prev) => prev.filter((c) => c.id !== id))
      if (currentChatId === id) setCurrentChatId(null)
    } catch {
      // ignore
    }
  }, [currentChatId])

  const triggerGeneration = useCallback(async (prompt: string) => {
    setLastPrompt(prompt)
    const knownPaths = Object.keys(projectFiles)
    const targetFile = inferTargetFile(prompt, knownPaths.length > 0 ? knownPaths : ["src/App/page.tsx"])
    const previousCode = projectFiles[targetFile] ?? FALLBACK_GENERATED_CODE
    const editing = isEditPrompt(prompt) && Boolean(projectFiles[targetFile])

    setIsGenerating(true)
    setExecutionState("generating")
    setExecutionError(null)
    setPendingInstallPackages([])
    setGeneratingFile(targetFile)
    setGeneratedCode(null)
    setLastGeneratedFilePath(null)
    setStreamedCode("")
    setStreamingTargetCode(FALLBACK_GENERATED_CODE)
    setStreamingDiffCode(null)
    setActiveFilePath(targetFile)

    let fullCode = FALLBACK_GENERATED_CODE
    let modelPackages: string[] = []
    try {
      const logTail = agentLog.slice(-20).map((e) => `[${new Date(e.timestamp).toISOString()}] ${e.action}${e.result ? `: ${e.result}` : ""}`).join("\n")
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: "code",
          mode,
          prompt,
          taskContext: { task: agentTask, state: agentState, logTail },
          ...(editing && previousCode ? { currentCode: previousCode } : {}),
        }),
      })

      if (response.ok) {
        const data = (await response.json()) as { code?: string; requiredPackages?: string[] }
        if (typeof data?.code === "string" && data.code.trim().length > 0) {
          const parsed = extractCodeBlock(data.code)
          fullCode = normalizeUiImports(parsed ? parsed : data.code.trim())
          modelPackages = Array.isArray(data.requiredPackages) ? data.requiredPackages : []
        }
      }
    } catch {
      // Keep fallback code when AI provider/network fails.
    }

    setStreamingTargetCode(fullCode)
    if (editing) {
      setStreamingDiffCode(buildUnifiedDiff(previousCode, fullCode))
    }
    let i = 0
    const charsPerTick = 2 + Math.floor(Math.random() * 3)
    const tickMs = 12 + Math.floor(Math.random() * 10)

    const id = setInterval(async () => {
      i += charsPerTick
      if (i >= fullCode.length) {
        clearInterval(id)
        setStreamedCode(fullCode)
        setIsGenerating(false)
        setGeneratingFile(null)
        setGeneratedCode(fullCode)
        setLastGeneratedFilePath(targetFile)
        setStreamingTargetCode(null)
        setProjectFiles((prev) => ({ ...prev, [targetFile]: fullCode }))
        try {
          const writeRes = await fetch("/api/agent/files", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "write", path: targetFile, content: fullCode }),
          })
          if (writeRes.ok) {
            const data = (await writeRes.json()) as {
              path: string
              content: string
              requiredPackages?: string[]
              missingPackages?: string[]
            }
            setProjectFiles((prev) => ({ ...prev, [data.path]: data.content }))
            const missing = Array.isArray(data.missingPackages) ? data.missingPackages : []
            const mergedMissing = Array.from(new Set([...missing, ...modelPackages]))
            if (mergedMissing.length > 0) {
              setPendingInstallPackages(mergedMissing)
              setExecutionState("pending_install_confirmation")
            } else {
              await runBuildPipeline()
            }
          } else {
            setExecutionState("error")
            setExecutionError("Failed to write generated file to workspace.")
          }
        } catch {
          setExecutionState("error")
          setExecutionError("Failed to persist generated file.")
        }
        return
      }
      setStreamedCode(fullCode.slice(0, i))
    }, tickMs)
  }, [mode, projectFiles, agentTask, agentState, agentLog, runBuildPipeline])

  return (
    <DashboardContext.Provider
      value={{
        mode,
        setMode,
        sidebarCollapsed,
        setSidebarCollapsed,
        isGenerating,
        setGenerating: setIsGenerating,
        generatingFile,
        setGeneratingFile,
        streamedCode,
        generatedCode,
        lastGeneratedFilePath,
        streamingTargetCode,
        streamingDiffCode,
        projectFiles,
        activeFilePath,
        setActiveFilePath,
        lastPrompt,
        triggerGeneration,
        chats,
        currentChatId,
        setCurrentChatId,
        loadChats,
        createChat,
        updateChat,
        deleteChat,
        agentTask,
        agentState,
        agentLog,
        setAgentTask,
        setAgentState,
        appendAgentLog,
        resetAgentSession,
        terminalOutput,
        terminalRunning,
        runCommand,
        clearTerminal,
        executionState,
        pendingInstallPackages,
        executionError,
        workspaceRoot,
        runtimePreviewUrl,
        resolveDependencyInstall,
        fixBuildError,
        fixingBuild,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const ctx = useContext(DashboardContext)
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider")
  return ctx
}
