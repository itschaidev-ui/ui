import { spawn } from "node:child_process"
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"

export type AgentExecChunk =
  | { type: "stdout"; text: string }
  | { type: "stderr"; text: string }
  | { type: "exit"; code: number | null; signal: NodeJS.Signals | null }
  | { type: "error"; message: string }

export type AgentExecOptions = {
  /** Working directory inside the sandbox root. */
  cwd?: string
  /** Override default sandbox root. */
  sandboxRoot?: string
  /** Kills the process after this many ms. */
  timeoutMs?: number
  /** Optional environment overrides. */
  env?: Record<string, string | undefined>
}

const DEFAULT_TIMEOUT_MS = 60_000

function getDefaultSandboxRoot() {
  return path.join(os.tmpdir(), "sparkle-ui-agent")
}

async function ensureDir(p: string) {
  await fs.mkdir(p, { recursive: true })
}

function resolveSafeCwd(root: string, cwd?: string) {
  const resolved = cwd ? path.resolve(root, cwd) : root
  const rel = path.relative(root, resolved)
  if (!(rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel)))) {
    throw new Error("cwd is outside sandbox root")
  }
  return resolved
}

/**
 * Execute a command on the server and stream chunks via callbacks.
 * This is intentionally conservative: it runs inside a tmp sandbox directory.
 */
export async function agentExec(
  command: string,
  args: string[],
  onChunk: (chunk: AgentExecChunk) => void,
  options: AgentExecOptions = {}
) {
  const root = options.sandboxRoot ? path.resolve(options.sandboxRoot) : getDefaultSandboxRoot()
  await ensureDir(root)
  const safeCwd = resolveSafeCwd(root, options.cwd)
  await ensureDir(safeCwd)

  const child = spawn(command, args, {
    cwd: safeCwd,
    env: { ...process.env, ...options.env },
    stdio: ["ignore", "pipe", "pipe"],
    shell: false,
  })

  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS
  const killTimer =
    timeoutMs > 0
      ? setTimeout(() => {
          try {
            child.kill("SIGKILL")
          } catch {
            // ignore
          }
        }, timeoutMs)
      : null

  child.stdout?.setEncoding("utf8")
  child.stderr?.setEncoding("utf8")

  child.stdout?.on("data", (data: string) => onChunk({ type: "stdout", text: data }))
  child.stderr?.on("data", (data: string) => onChunk({ type: "stderr", text: data }))

  child.on("error", (err) => onChunk({ type: "error", message: err instanceof Error ? err.message : String(err) }))

  await new Promise<void>((resolve) => {
    child.on("close", (code, signal) => {
      if (killTimer) clearTimeout(killTimer)
      onChunk({ type: "exit", code, signal })
      resolve()
    })
  })
}

