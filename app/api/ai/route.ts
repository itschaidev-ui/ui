import { readFile } from "fs/promises"
import path from "path"
import { NextRequest, NextResponse } from "next/server"

import { extractCodeBlock, normalizeUiImports } from "@/lib/code-parse"
import { collectImportedPackages } from "@/lib/generated-files"

type AiTask = "chat" | "code" | "fix"
type AssistantMode = "conversation" | "agent"

type AiRequestBody = {
  task: AiTask
  mode?: AssistantMode
  prompt?: string
  taskContext?: {
    task: string
    state: string
    logTail: string
  }
  /** For task "fix": file path, content, and optional build error message. */
  path?: string
  content?: string
  errorMessage?: string
  /** For task "code": when provided, the model should edit this code per the prompt (e.g. "make it stylish"). */
  currentCode?: string
}

const GEMINI_MODEL = "gemini-2.0-flash"
const GROQ_MODEL = "llama-3.3-70b-versatile"

const AGENT_DOCS_DIR = path.join(process.cwd(), "content", "agent")
const STABLE_DOC_NAMES = ["SOUL.md", "RULES.md", "STRATEGY.md", "CONTEXT.md"] as const
const OPTIONAL_DOC_NAMES = ["ROADMAP.md", "MEMORY.md"] as const

let cachedStablePrompt: string | null = null
let cachedOptionalPrompt: string | null = null

async function loadAgentDoc(name: string): Promise<string> {
  try {
    const raw = await readFile(path.join(AGENT_DOCS_DIR, name), "utf-8")
    return raw.trim()
  } catch {
    return ""
  }
}

async function loadStableDocs(): Promise<string> {
  if (cachedStablePrompt !== null) return cachedStablePrompt
  const parts: string[] = []
  for (const name of STABLE_DOC_NAMES) {
    const content = await loadAgentDoc(name)
    if (content) parts.push(content)
  }
  cachedStablePrompt = parts.length > 0 ? parts.join("\n\n") : ""
  return cachedStablePrompt
}

async function loadOptionalDocs(): Promise<string> {
  if (cachedOptionalPrompt !== null) return cachedOptionalPrompt
  const parts: string[] = []
  for (const name of OPTIONAL_DOC_NAMES) {
    const content = await loadAgentDoc(name)
    if (content) parts.push(content)
  }
  cachedOptionalPrompt = parts.length > 0 ? parts.join("\n\n") : ""
  return cachedOptionalPrompt
}

function buildFallbackSystemPrompt(task: AiTask, mode: AssistantMode): string {
  if (task === "code") {
    return [
      "You are a senior frontend React/TypeScript engineer.",
      "Return only production-ready code (no markdown fences).",
      "Generate a complete file body using modern React patterns.",
      "Use concise comments only when necessary.",
    ].join(" ")
  }
  if (mode === "agent") {
    return [
      "You are an AI coding agent helping build UI components.",
      "Answer in 1-3 concise sentences.",
      "Be specific and actionable.",
    ].join(" ")
  }
  return [
    "You are a UI assistant focused on practical component advice.",
    "Answer in 1-3 concise sentences.",
    "Suggest concrete UI pieces and implementation direction.",
  ].join(" ")
}

function buildCodePrompt(userPrompt: string, currentCode: string): string {
  const text = userPrompt.toLowerCase()
  const isButtonRequest = /\b(button|butotn|buton|btn|cta)\b/.test(text)
  const isLandingRequest = /\b(landing page|landing|hero)\b/.test(text)
  const asksSparkle = /\b(sparkle\/ui|@chaidev\/ui|sparklebutton)\b/.test(text)

  const requirements: string[] = [
    "Return only full file code (no markdown).",
    'Use "@chaidev/ui" for sparkle UI components; never use "@sparkle-ui/*".',
  ]

  if (isButtonRequest) {
    requirements.push(
      "Produce a polished button component with visible styling, hover + active states, and clear label text."
    )
  }
  if (isLandingRequest) {
    requirements.push(
      "Produce a complete landing page section with a hero headline, supporting text, and a primary CTA."
    )
  }
  if (asksSparkle) {
    requirements.push("Prefer SparkleButton from @chaidev/ui where appropriate.")
  }

  if (currentCode.trim()) {
    return [
      `Edit this code according to request: "${userPrompt}"`,
      "",
      "Current code:",
      currentCode,
      "",
      "Implementation requirements:",
      ...requirements.map((r) => `- ${r}`),
    ].join("\n")
  }

  return [
    `Build code for request: "${userPrompt}"`,
    "",
    "Implementation requirements:",
    ...requirements.map((r) => `- ${r}`),
  ].join("\n")
}

async function buildSystemPrompt(
  task: AiTask,
  mode: AssistantMode,
  taskContext?: AiRequestBody["taskContext"]
): Promise<string> {
  const stable = await loadStableDocs()
  const optional = await loadOptionalDocs()
  const base = [stable, optional].filter(Boolean).join("\n\n")
  const fallback = buildFallbackSystemPrompt(task, mode)

  const contextBlock =
    taskContext &&
    (taskContext.task || taskContext.state || taskContext.logTail)
      ? [
          "---",
          "Current session context:",
          taskContext.task ? `TASK: ${taskContext.task}` : "",
          taskContext.state ? `STATE: ${taskContext.state}` : "",
          taskContext.logTail ? `Recent LOG:\n${taskContext.logTail}` : "",
        ]
          .filter(Boolean)
          .join("\n")
      : ""

  if (!base) return contextBlock ? `${fallback}\n\n${contextBlock}` : fallback
  const full = [base, contextBlock].filter(Boolean).join("\n\n")
  return full
}

async function callGemini(prompt: string, systemPrompt: string, apiKey: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  )

  if (!response.ok) {
    throw new Error(`Gemini request failed: ${response.status}`)
  }

  const data = await response.json()
  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part?.text ?? "")
      .join("")
      .trim() ?? ""

  if (!text) {
    throw new Error("Gemini returned empty response")
  }

  return text
}

async function callGroq(prompt: string, systemPrompt: string, apiKey: string) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0.4,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`Groq request failed: ${response.status}`)
  }

  const data = await response.json()
  const text = data?.choices?.[0]?.message?.content?.trim() ?? ""

  if (!text) {
    throw new Error("Groq returned empty response")
  }

  return text
}

async function generateText(prompt: string, systemPrompt: string) {
  const geminiKey = process.env.GEMINI_API_KEY
  const groqKey = process.env.GROQ_API_KEY

  const errors: string[] = []

  if (geminiKey) {
    try {
      const text = await callGemini(prompt, systemPrompt, geminiKey)
      return { text, provider: "gemini", model: GEMINI_MODEL }
    } catch (error) {
      errors.push(error instanceof Error ? error.message : "Gemini failed")
    }
  }

  if (groqKey) {
    try {
      const text = await callGroq(prompt, systemPrompt, groqKey)
      return { text, provider: "groq", model: GROQ_MODEL }
    } catch (error) {
      errors.push(error instanceof Error ? error.message : "Groq failed")
    }
  }

  throw new Error(
    errors.length > 0
      ? errors.join(" | ")
      : "No AI provider key configured. Set GEMINI_API_KEY or GROQ_API_KEY."
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AiRequestBody
    const task = body?.task
    const mode = body?.mode ?? "conversation"
    const taskContext = body?.taskContext

    if (!task || (task !== "chat" && task !== "code" && task !== "fix")) {
      return NextResponse.json({ error: "Invalid task" }, { status: 400 })
    }

    if (task === "fix") {
      const content = typeof body.content === "string" ? body.content : ""
      const errorMessage = typeof body.errorMessage === "string" ? body.errorMessage.trim() : ""
      const path = typeof body.path === "string" ? body.path : "file"
      if (!content) {
        return NextResponse.json({ error: "content required for fix" }, { status: 400 })
      }
      const fixPrompt = errorMessage
        ? `Fix the following code. The build reported this error:\n\n${errorMessage}\n\nCurrent code:\n${content}\n\nReturn only the fixed code (no markdown). Use @chaidev/ui for UI components, not @sparkle-ui or @sparkle-ui/button.`
        : `Fix any build or lint errors in the following code. Use @chaidev/ui for UI components. Return only the fixed code (no markdown).\n\n${content}`
      const systemPrompt = "You are a senior frontend engineer. Return only production-ready code, no markdown fences or explanation."
      const result = await generateText(fixPrompt, systemPrompt)
      const rawCode = extractCodeBlock(result.text) || result.text.trim()
      const code = normalizeUiImports(rawCode || result.text)
      const requiredPackages = collectImportedPackages(code)
      return NextResponse.json({ code, path, provider: result.provider, model: result.model, requiredPackages })
    }

    const prompt = body?.prompt?.trim() ?? ""
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const currentCode = typeof body.currentCode === "string" ? body.currentCode.trim() : ""
    const codePrompt = task === "code" ? buildCodePrompt(prompt, currentCode) : prompt

    const systemPrompt = await buildSystemPrompt(task, mode, taskContext)
    const result = await generateText(codePrompt, systemPrompt)

    if (task === "code") {
      const rawCode = extractCodeBlock(result.text) || result.text.trim()
      const code = normalizeUiImports(rawCode || result.text)
      const requiredPackages = collectImportedPackages(code)
      return NextResponse.json({
        code,
        requiredPackages,
        provider: result.provider,
        model: result.model,
      })
    }

    return NextResponse.json({
      text: result.text,
      provider: result.provider,
      model: result.model,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected AI error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

