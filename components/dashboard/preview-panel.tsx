"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { useTheme } from "next-themes"

import { useDashboard } from "@/components/dashboard/dashboard-context"
import { SparkleButton } from "@/components/ui/sparkle-button"

function parseCommand(line: string): { command: string; args: string[] } {
  const trimmed = line.trim()
  if (!trimmed) return { command: "", args: [] }
  const parts = trimmed.split(/\s+/)
  return { command: parts[0], args: parts.slice(1) }
}

const PLACEHOLDER_CODE = `import { SparkleButton, OAuthForm, Callout } from "@chaidev/ui"

export function AuthScreen() {
  return (
    <div className="space-y-6">
      <Callout tone="success" title="Welcome back">
        You can sign in with Google or continue with email.
      </Callout>
      <OAuthForm onContinue={(email) => console.log(email)} />
      <SparkleButton text="Open docs" hoverText="sparkle/ui" />
    </div>
  )
}`

function toTitle(prompt: string) {
  const clean = prompt.replace(/\.$/, "").trim()
  if (!clean) return "Generated interface"
  return clean.charAt(0).toUpperCase() + clean.slice(1)
}

function LivePreviewSurface({
  prompt,
  generatedCode,
  streamedCode,
  isGenerating,
  isLight,
}: {
  prompt: string
  generatedCode: string | null
  streamedCode: string
  isGenerating: boolean
  isLight: boolean
}) {
  const source = (generatedCode ?? streamedCode ?? prompt).toLowerCase()
  const normalized = source
  const showForm = /\b(login|auth|signup|sign up|form)\b/.test(normalized)
  const showCards = /\b(card|pricing|plans|dashboard|stats)\b/.test(normalized)
  const showButton = /\bbutton|cta|hero\b/.test(normalized)
  const showCallout = /\bcallout|alert|notice|welcome back\b/.test(normalized)
  const showRoutes = /\broutes|route path|react-router-dom\b/.test(normalized)
  const title = toTitle(prompt)
  const isButtonCode =
    /\bstyled\.button\b|<button\b|\bbuttonprops\b|\bsparklebutton\b|tiltbutton\b/.test(normalized)
  const hasSparkleTag = /<sparklebutton/i.test(generatedCode ?? streamedCode ?? "")
  const sparkleBody = generatedCode?.match(/<sparklebutton[^>]*>([\s\S]{0,220})/i)?.[1] ?? ""
  const sparkleText = sparkleBody
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]+\}/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  const sparkleLabel = sparkleText.match(/([A-Za-z][A-Za-z0-9 !?._-]{1,32})/)?.[1]
  const nativeLabel = generatedCode?.match(/<button[^>]*>\s*([^<\n]{2,40})\s*<\/button>/i)?.[1]
  const hasChildrenButton = generatedCode?.match(/>\s*\{children\}\s*<\/button>/i)
  const buttonLabel = (
    generatedCode?.match(/text="([^"]+)"/)?.[1] ??
    sparkleLabel ??
    nativeLabel ??
    (hasChildrenButton || hasSparkleTag ? "Click me" : "Primary action")
  ).trim()
  const firstHexColor =
    generatedCode?.match(/#([0-9a-fA-F]{3,8})/)?.[0] ??
    (isLight ? "#111827" : "#f8fafc")
  const rawTailwindBg =
    generatedCode?.match(/\bbg-(blue|indigo|violet|purple|pink|red|amber|emerald|teal|cyan|sky)-(\d+)\b/i)?.[0] ??
    generatedCode?.match(/\bbg-(slate|gray|zinc|neutral|stone)-(\d+)\b/i)?.[0]
  const tailwindBg = rawTailwindBg?.toLowerCase()
  const tailwindToHex: Record<string, string> = {
    "bg-blue-500": "#3b82f6",
    "bg-blue-600": "#2563eb",
    "bg-indigo-500": "#6366f1",
    "bg-violet-500": "#8b5cf6",
    "bg-purple-500": "#a855f7",
    "bg-pink-500": "#ec4899",
    "bg-red-500": "#ef4444",
    "bg-amber-500": "#f59e0b",
    "bg-emerald-500": "#10b981",
    "bg-teal-500": "#14b8a6",
    "bg-cyan-500": "#06b6d4",
    "bg-sky-500": "#0ea5e9",
  }
  const resolvedBg =
    tailwindBg && tailwindToHex[tailwindBg]
      ? tailwindToHex[tailwindBg]
      : firstHexColor
  const hasTilt = /\brotate-[-]?\d+\b|transform|rotate\(/.test(normalized)
  const isColoredButton = Boolean(tailwindBg && tailwindToHex[tailwindBg])
  const buttonBg = resolvedBg
  const buttonFg = isColoredButton ? "#ffffff" : isLight ? "#ffffff" : "#0b1220"

  return (
    <motion.div
      key={isGenerating ? "live-preview-generating" : "live-preview-ready"}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex h-full w-full items-center justify-center overflow-hidden p-6 ${
        isLight ? "bg-white" : "bg-[#08070c]"
      }`}
    >
      {isGenerating && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(250, 180, 70, 0.34), transparent 28%), radial-gradient(circle at 70% 70%, rgba(136, 121, 255, 0.22), transparent 32%)",
            }}
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {isGenerating ? (
          <div className="text-center">
            <div className={`text-base ${isLight ? "text-black/80" : "text-white/90"}`}>Generating preview</div>
            <p className={`mt-1 text-xs ${isLight ? "text-black/55" : "text-white/60"}`}>Thinking...</p>
          </div>
        ) : (
          <div className="w-full">
            {isButtonCode || showButton ? (
              <div className="flex h-full min-h-[280px] items-center justify-center">
                {hasSparkleTag ? (
                  <SparkleButton
                    text={buttonLabel}
                    hoverText={buttonLabel}
                    enableHoverText={false}
                    enableLoadingState={false}
                  />
                ) : (
                  <motion.button
                    whileHover={{ y: -1, rotate: hasTilt ? 3 : 0 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="rounded-lg px-6 py-3 text-lg font-medium shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                    style={{ backgroundColor: buttonBg, color: buttonFg }}
                  >
                    {buttonLabel}
                  </motion.button>
                )}
              </div>
            ) : (
              <div className="mx-auto w-full max-w-3xl space-y-3">
                <h3
                  className={`text-balance text-2xl md:text-3xl ${isLight ? "text-black/85" : "text-white"}`}
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {title}
                </h3>
                <p className={`text-sm ${isLight ? "text-black/55" : "text-white/65"}`}>
                  Interactive preview generated from your latest prompt.
                </p>

                {showCallout && (
                  <div
                    className={`rounded-xl border px-3 py-2 text-sm ${
                      isLight ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
                    }`}
                  >
                    Welcome back. You can continue with your flow.
                  </div>
                )}

                {showForm && (
                  <div
                    className={`space-y-2 rounded-xl border p-3 ${
                      isLight ? "border-black/10 bg-black/[0.02]" : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <div className={`h-8 rounded-md ${isLight ? "bg-black/5" : "bg-white/8"}`} />
                    <div className={`h-8 rounded-md ${isLight ? "bg-black/5" : "bg-white/8"}`} />
                  </div>
                )}

                {showCards && (
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className={`rounded-xl border p-3 ${
                          isLight ? "border-black/10 bg-black/[0.02]" : "border-white/10 bg-white/[0.03]"
                        }`}
                      >
                        <div className={`mb-2 h-3 w-16 rounded ${isLight ? "bg-black/10" : "bg-white/15"}`} />
                        <div className={`h-2.5 w-full rounded ${isLight ? "bg-black/8" : "bg-white/10"}`} />
                      </div>
                    ))}
                  </div>
                )}

                {showRoutes && (
                  <div
                    className={`rounded-xl border p-3 text-xs ${
                      isLight ? "border-black/10 bg-black/[0.02] text-black/65" : "border-white/10 bg-white/[0.03] text-white/70"
                    }`}
                  >
                    App routing detected: `/`, `/auth`
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function StreamingCodeDisplay({
  streamedCode,
  targetCode,
}: {
  streamedCode: string
  targetCode: string
}) {
  const remaining = targetCode.slice(streamedCode.length)
  const remainingLines = remaining.split("\n")

  if (remainingLines.length === 0 || (remainingLines.length === 1 && remainingLines[0] === "")) {
    return (
      <pre className="font-mono h-full min-h-0 p-4 text-[0.7rem] leading-relaxed text-emerald-100">
        <code>{streamedCode}</code>
      </pre>
    )
  }

  return (
    <pre className="font-mono h-full min-h-0 p-4 text-[0.7rem] leading-relaxed text-emerald-100">
      <code>
        {streamedCode}
        {remainingLines.map((line, i) => (
          <span key={i} className="inline">
            {i > 0 ? "\n" : null}
            {line.length > 0 && (
              <span
                className="inline-block h-[1em] min-w-[2ch] shrink-0 align-baseline animate-pulse rounded-[3px] bg-white/15"
                style={{ width: `${Math.max(line.length, 1)}ch` }}
                aria-hidden
              />
            )}
          </span>
        ))}
      </code>
    </pre>
  )
}

function DiffCodeDisplay({ diffCode }: { diffCode: string }) {
  const lines = diffCode.split("\n")

  return (
    <pre className="font-mono h-full min-h-0 p-4 text-[0.7rem] leading-relaxed">
      <code>
        {lines.map((line, i) => {
          const type = line.slice(0, 1)
          const content = line.slice(1)
          const className =
            type === "+"
              ? "text-emerald-300"
              : type === "-"
                ? "text-rose-300"
                : "text-white/70"

          return (
            <span key={i} className={`block ${className}`}>
              {type === "+" || type === "-" ? type : " "} {content}
            </span>
          )
        })}
      </code>
    </pre>
  )
}

export function PreviewPanel() {
  const { resolvedTheme } = useTheme()
  const {
    isGenerating,
    generatingFile,
    streamedCode,
    generatedCode,
    streamingTargetCode,
    streamingDiffCode,
    projectFiles,
    activeFilePath,
    setActiveFilePath,
    lastPrompt,
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
  } = useDashboard()
  const isLight = resolvedTheme === "light"
  const [tab, setTab] = useState<"preview" | "code" | "terminal">("code")
  const [terminalInput, setTerminalInput] = useState("")

  useEffect(() => {
    if (isGenerating) {
      setTab("code")
      return
    }
    if (generatedCode) {
      setTab("preview")
    }
  }, [isGenerating, generatedCode])

  const codeToShow = generatedCode ?? PLACEHOLDER_CODE
  const targetCode = streamingTargetCode ?? generatedCode ?? PLACEHOLDER_CODE
  const showStreaming = isGenerating && streamedCode.length > 0
  const fileEntries = Object.keys(projectFiles)
  const activeCode = projectFiles[activeFilePath] ?? generatedCode ?? PLACEHOLDER_CODE
  const previewTitle = lastPrompt?.trim() || "Your generated UI"

  return (
    <div
      className={`flex h-full min-h-0 flex-col overflow-hidden rounded-2xl p-4 backdrop-blur-2xl md:p-5 ${
        isLight
          ? "border border-black/8 bg-white/50"
          : "border border-white/[0.06] bg-[#120f15]/70"
      }`}
    >
      <header className="mb-3 flex items-center justify-between gap-3">
        <div
          className={`flex gap-0.5 rounded-lg p-1 text-[0.68rem] ${
            isLight ? "border border-black/10 bg-white/90" : "border border-white/12 bg-black/40"
          }`}
        >
          <button
            type="button"
            onClick={() => setTab("code")}
            className={`rounded-md px-3 py-1.5 font-medium transition ${
              tab === "code"
                ? isLight
                  ? "bg-black/10 text-black/85 shadow-sm"
                  : "bg-white/15 text-white shadow-sm"
                : isLight
                  ? "text-black/55 hover:text-black/80"
                  : "text-white/60 hover:text-white/80"
            }`}
          >
            Code
          </button>
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={`rounded-md px-3 py-1.5 font-medium transition ${
              tab === "preview"
                ? isLight
                  ? "bg-black text-white shadow-sm"
                  : "bg-white text-black shadow-sm"
                : isLight
                  ? "text-black/55 hover:text-black/80"
                  : "text-white/60 hover:text-white/80"
            }`}
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => setTab("terminal")}
            className={`rounded-md px-3 py-1.5 font-medium transition ${
              tab === "terminal"
                ? isLight
                  ? "bg-black text-white shadow-sm"
                  : "bg-white text-black shadow-sm"
                : isLight
                  ? "text-black/55 hover:text-black/80"
                  : "text-white/60 hover:text-white/80"
            }`}
          >
            Terminal
          </button>
        </div>

        <div className={`flex items-center gap-2 text-[0.68rem] ${isLight ? "text-black/55" : "text-white/60"}`}>
          <span
            className={`rounded-full px-2.5 py-1 font-medium ${
              executionState === "ready"
                ? isLight
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-emerald-500/20 text-emerald-200"
                : executionState === "error"
                  ? isLight
                    ? "bg-rose-100 text-rose-700"
                    : "bg-rose-500/20 text-rose-200"
                  : isLight
                    ? "bg-black/8 text-black/65"
                    : "bg-white/12 text-white/70"
            }`}
          >
            {executionState.replaceAll("_", " ")}
          </span>
          <button
            type="button"
            className={`rounded-full px-3 py-1 ${
              isLight
                ? "border border-black/12 bg-black/[0.03] hover:bg-black/[0.06]"
                : "border border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10"
            }`}
            onClick={() => (generatedCode || streamedCode) && navigator.clipboard.writeText(generatedCode ?? streamedCode)}
          >
            Copy
          </button>
          <button
            type="button"
            disabled={fixingBuild || !(activeCode || codeToShow)}
            title="Fix build errors in the current file"
            className={`rounded-full px-3 py-1 ${
              isLight
                ? "border border-black/12 bg-black/[0.03] hover:bg-black/[0.06] disabled:opacity-50"
                : "border border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10 disabled:opacity-50"
            }`}
            onClick={() => {
              const path = activeFilePath
              const content = activeCode || codeToShow
              if (path && content) void fixBuildError(path, content, executionError ?? undefined)
            }}
          >
            {fixingBuild ? "Fixing…" : "Fix"}
          </button>
          <button
            type="button"
            className={`rounded-full px-3 py-1 ${
              isLight
                ? "border border-black/12 bg-black/[0.03] hover:bg-black/[0.06]"
                : "border border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10"
            }`}
          >
            Share
          </button>
          <button
            type="button"
            className={`rounded-full px-3 py-1 ${
              isLight
                ? "border border-black/12 bg-black/[0.03] hover:bg-black/[0.06]"
                : "border border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10"
            }`}
          >
            Publish
          </button>
        </div>
      </header>

      <div
        className={`relative flex min-h-0 flex-1 overflow-hidden rounded-xl ${
          isLight ? "border border-black/10 bg-white/85" : "border border-white/[0.08] bg-[#0b0910]/80"
        }`}
      >
        {tab === "preview" ? (
          runtimePreviewUrl ? (
            <iframe title="Sandbox preview" src={runtimePreviewUrl} className="h-full w-full border-0" />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-6">
              <div
                className={`max-w-xl rounded-xl border p-4 text-sm ${
                  isLight ? "border-black/12 bg-white/80 text-black/75" : "border-white/12 bg-black/30 text-white/75"
                }`}
              >
                <p className="font-medium">
                  {executionState === "ready"
                    ? "Build completed. Runtime preview URL is not available yet."
                    : executionState === "pending_install_confirmation"
                      ? "Waiting for dependency install confirmation."
                      : executionState === "installing"
                        ? "Installing dependencies in sandbox..."
                        : executionState === "building"
                          ? "Building sandbox project..."
                          : executionState === "error"
                            ? "Sandbox pipeline failed."
                            : "Generate code to start the sandbox pipeline."}
                </p>
                {pendingInstallPackages.length > 0 && (
                  <p className="mt-2 font-mono text-[0.72rem] break-words">
                    Missing: {pendingInstallPackages.join(", ")}
                  </p>
                )}
                {executionError && <p className="mt-2 text-[0.75rem] text-rose-400">{executionError}</p>}
                {workspaceRoot && <p className="mt-2 text-[0.7rem] opacity-80">Workspace: {workspaceRoot}</p>}
                {executionState === "pending_install_confirmation" && pendingInstallPackages.length > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void resolveDependencyInstall(true)}
                      className={`rounded px-2.5 py-1 text-[0.72rem] font-medium ${
                        isLight ? "bg-black text-white hover:bg-black/85" : "bg-white text-black hover:bg-white/85"
                      }`}
                    >
                      Install
                    </button>
                    <button
                      type="button"
                      onClick={() => void resolveDependencyInstall(false)}
                      className={`rounded px-2.5 py-1 text-[0.72rem] ${
                        isLight ? "border border-black/15 hover:bg-black/5" : "border border-white/20 hover:bg-white/10"
                      }`}
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        ) : tab === "terminal" ? (
          <div className="flex h-full min-h-0 flex-col overflow-hidden p-3">
            <div className="mb-2 flex items-center gap-2">
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    const { command, args } = parseCommand(terminalInput)
                    if (command) {
                      runCommand(command, args)
                      setTerminalInput("")
                    }
                  }
                }}
                placeholder="npm --version"
                className={`flex-1 rounded border px-3 py-1.5 font-mono text-[0.75rem] ${
                  isLight
                    ? "border-black/20 bg-white text-black placeholder:text-black/40"
                    : "border-white/20 bg-black/50 text-white placeholder:text-white/40"
                }`}
              />
              <button
                type="button"
                disabled={terminalRunning}
                onClick={() => {
                  const { command, args } = parseCommand(terminalInput)
                  if (command) {
                    runCommand(command, args)
                    setTerminalInput("")
                  }
                }}
                className={`rounded px-3 py-1.5 text-[0.7rem] font-medium ${
                  isLight ? "bg-black text-white" : "bg-white text-black"
                } ${terminalRunning ? "opacity-60" : ""}`}
              >
                Run
              </button>
              <button
                type="button"
                onClick={clearTerminal}
                className={`rounded px-2 py-1.5 text-[0.68rem] ${isLight ? "text-black/55 hover:bg-black/10" : "text-white/60 hover:bg-white/10"}`}
              >
                Clear
              </button>
            </div>
            <pre className={`font-mono flex-1 min-h-0 overflow-auto rounded border p-3 text-[0.7rem] leading-relaxed ${
              isLight ? "border-black/10 bg-black/95 text-emerald-100" : "border-white/10 bg-black/90 text-emerald-100"
            }`}>
              {terminalOutput || "Run a command (e.g. npm --version, node -v)"}
            </pre>
          </div>
        ) : (
          <motion.div
            key="code"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full min-h-0 w-full overflow-hidden"
          >
            <aside
              className={`hidden w-56 border-r md:block ${
                isLight ? "border-black/10 bg-black/[0.02]" : "border-white/[0.08] bg-black/30"
              }`}
            >
              <div className={`px-3 py-2 text-[0.68rem] ${isLight ? "text-black/55" : "text-white/55"}`}>
                Project
              </div>
              <div className="space-y-1 px-2 pb-2">
                {fileEntries.map((path) => (
                  <button
                    key={path}
                    type="button"
                    onClick={() => setActiveFilePath(path)}
                    className={`w-full rounded px-2 py-1 text-left text-xs transition ${
                      path === activeFilePath
                        ? isLight
                          ? "bg-black/10 text-black/80"
                          : "bg-white/10 text-white"
                        : isLight
                          ? "text-black/55 hover:bg-black/6"
                          : "text-white/60 hover:bg-white/6"
                    }`}
                  >
                    {path}
                  </button>
                ))}
              </div>
            </aside>

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              {isGenerating && generatingFile && (
                <div
                  className={`flex items-center gap-2 border-b px-4 py-2.5 text-[0.7rem] ${
                    isLight ? "border-black/10 bg-black/[0.03] text-black/60" : "border-white/[0.08] bg-black/65 text-white/70"
                  }`}
                >
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  <span>Writing {generatingFile}...</span>
                </div>
              )}
              <div className="flex-1 min-h-0 overflow-auto">
                {isGenerating && streamingDiffCode ? (
                  <DiffCodeDisplay diffCode={streamingDiffCode} />
                ) : showStreaming ? (
                  <StreamingCodeDisplay streamedCode={streamedCode} targetCode={targetCode} />
                ) : isGenerating ? (
                  <StreamingCodeDisplay streamedCode="" targetCode={targetCode} />
                ) : (
                  <pre className="font-mono h-full min-h-0 p-4 text-[0.7rem] leading-relaxed text-emerald-100">
                    <code>{activeCode || codeToShow}</code>
                  </pre>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
