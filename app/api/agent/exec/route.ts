import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { agentExec } from "@/lib/agent-exec"
import { getWorkspaceRoot } from "@/lib/generated-files"

type ExecRequest = {
  /** e.g. "npm" */
  command: string
  /** e.g. ["--version"] */
  args?: string[]
  /** Relative cwd inside user's generated workspace. */
  cwd?: string
  /** Optional timeout; defaults to 60s. */
  timeoutMs?: number
}

function isAllowedCommand(cmd: string) {
  // Conservative allowlist; expand as needed.
  return ["node", "npm", "pnpm", "npx", "git", "bash"].includes(cmd)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as { id?: string })?.id ?? "anonymous"

  let body: ExecRequest
  try {
    body = (await req.json()) as ExecRequest
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const command = String(body.command || "").trim()
  const args = Array.isArray(body.args) ? body.args.map((a) => String(a)) : []
  const cwd = typeof body.cwd === "string" ? body.cwd : undefined
  const timeoutMs = typeof body.timeoutMs === "number" ? body.timeoutMs : undefined

  if (!command) return NextResponse.json({ error: "Missing command" }, { status: 400 })
  if (!isAllowedCommand(command)) {
    return NextResponse.json({ error: `Command not allowed: ${command}` }, { status: 403 })
  }

  const encoder = new TextEncoder()
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const write = (obj: unknown) => {
        controller.enqueue(encoder.encode(`${JSON.stringify(obj)}\n`))
      }

      void getWorkspaceRoot(userId).then(
        (workspaceRoot) => {
          write({ type: "start", command, args, cwd: cwd ?? ".", workspaceRoot })
          return agentExec(
            command,
            args,
            (chunk) => {
              write(chunk)
            },
            { cwd, timeoutMs, sandboxRoot: workspaceRoot }
          )
        }
      ).then(
        () => controller.close(),
        (err) => {
          write({ type: "error", message: err instanceof Error ? err.message : String(err) })
          controller.close()
        }
      )
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  })
}

