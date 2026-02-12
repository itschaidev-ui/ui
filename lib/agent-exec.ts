import { spawn } from "node:child_process"
import path from "node:path"
import os from "node:os"
import fs from "node:fs/promises"

export type AgentExecChunk =
  | { type: "stdout"; text: string }
  | { type: "stderr"; text: string }
  | { type: "exit"; code: number | null; signal: NodeJS.Signals | null }
  | { type: "error"; message: string }

export type AgentExecOptions = {
  /** Working directory inside the agent sandbox root. */
  cwd?: string
  /** Kills the process after this many ms. */
  timeoutMs?: number
  /** Optional environment overrides. */
  env?: Record<string, string | undefined>
}

const DEFAULT_TIMEOUT_MS = 60_000

function getSandboxRoot() {
  return path.join(os.tmpdir(), "sparkle-ui-agent")
}

async function ensureDir(p: string) {
  await fs.mkdir(p, { recursive: true })
}

function resolveSafeCwd(cwd?: string) {
  const root = getSandboxRoot()
  const resolved = cwd ? path.resolve(root, cwd) : root
  const rel = path.relative(root, resolved)
  const isInside = rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel))
  return isInside ? resolved : root
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
  const root = getSandboxRoot()
  await ensureDir(root)
  const safeCwd = resolveSafeCwd(options.cwd)
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

