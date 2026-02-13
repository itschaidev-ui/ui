/**
 * Extract the first fenced code block from markdown or mixed text.
 * Handles ```tsx, ```jsx, ```ts, ```javascript, ```js, or plain ```.
 * Returns the inner code only; if no block found, returns trimmed input
 * when it looks like code (starts with import/export/</function/const),
 * otherwise empty string to avoid showing prose or garbled output.
 */
export function extractCodeBlock(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed) return ""

  const fenceRegex = /^```(?:tsx|jsx|ts|javascript|js)?\s*\n?([\s\S]*?)```/im
  const match = trimmed.match(fenceRegex)
  if (match?.[1] != null) {
    return sanitizeCodeText(match[1])
  }

  // No fence: if content looks like code, use as-is (model returned raw code).
  const looksLikeCode =
    /^\s*(import\s|export\s|<\/?[A-Za-z][\w.-]*|function\s|const\s|let\s|class\s|interface\s|type\s)/m.test(
      trimmed
    )
  if (looksLikeCode) return sanitizeCodeText(trimmed)

  // Try to find a block that starts with common code patterns (in case of mixed output).
  const codeStart = trimmed.search(
    /^(?:import\s|export\s|<\/?[A-Za-z]|function\s|const\s|let\s|class\s|interface\s|type\s)/m
  )
  if (codeStart >= 0) {
    const fromCode = trimmed.slice(codeStart)
    const nextFence = fromCode.search(/\n```\s*$/m)
    return sanitizeCodeText(nextFence >= 0 ? fromCode.slice(0, nextFence) : fromCode)
  }

  return ""
}

/**
 * Get displayable code from a string that may be markdown-wrapped or raw.
 * Prefer extracted code block; fallback to full string if it looks like code.
 */
export function getDisplayCode(raw: string): string {
  const extracted = extractCodeBlock(raw)
  if (extracted) return extracted
  const trimmed = raw.trim()
  const looksLikeCode =
    /^\s*(import\s|export\s|<\/?[A-Za-z][\w.-]*|function\s|const\s|let\s|class\s|interface\s|type\s)/m.test(
      trimmed
    )
  return looksLikeCode ? sanitizeCodeText(trimmed) : ""
}

/**
 * Normalize known wrong/legacy sparkle package imports to @chaidev/ui.
 */
export function normalizeUiImports(code: string): string {
  if (!code) return code
  let out = sanitizeCodeText(code)
    .replace(/from\s+["']@sparkle-ui\/button["']/g, `from "@chaidev/ui"`)
    .replace(/from\s+["']@sparkle-ui\/react["']/g, `from "@chaidev/ui"`)
    .replace(/from\s+["']@sparkle-ui\/ui["']/g, `from "@chaidev/ui"`)
    .replace(/from\s+["']sparkle-ui["']/g, `from "@chaidev/ui"`)

  // Prevent invented component names from @chaidev/ui imports.
  const allowed = new Set([
    "SparkleButton",
    "OAuthForm",
    "Callout",
    "SocialMediaButton",
    "PillButton",
    "MessageSendButton",
    "Badge",
    "Counter",
    "ElasticSlider",
    "SegmentedControl",
    "Avatar",
    "SidebarTabs",
    "Accordion",
  ])

  const renamedToSparkle: string[] = []
  out = out.replace(
    /import\s*\{\s*([^}]+)\s*\}\s*from\s*["']@chaidev\/ui["'];?/g,
    (_m, specList: string) => {
      const raw = specList
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
      const kept: string[] = []
      for (const spec of raw) {
        const imported = spec.split(/\s+as\s+/i)[0]?.trim() ?? spec
        if (allowed.has(imported)) {
          kept.push(imported)
        } else if (/button/i.test(imported)) {
          renamedToSparkle.push(imported)
        }
      }
      if (!kept.includes("SparkleButton")) kept.push("SparkleButton")
      return `import { ${Array.from(new Set(kept)).join(", ")} } from "@chaidev/ui";`
    }
  )

  for (const bad of renamedToSparkle) {
    const esc = bad.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    out = out
      .replace(new RegExp(`<${esc}(\\s|>)`, "g"), `<SparkleButton$1`)
      .replace(new RegExp(`</${esc}>`, "g"), `</SparkleButton>`)
  }

  return out
}

export function sanitizeCodeText(code: string): string {
  if (!code) return ""
  let out = code.replace(/\r\n?/g, "\n").trim()
  out = out.replace(/^```(?:tsx|jsx|ts|javascript|js|typescript)?\s*\n?/i, "")
  out = out.replace(/\n?```\s*$/i, "")

  // Some model outputs leak a language token line (e.g. "typescript").
  out = out.replace(/^\s*['"`]*\s*(typescript|tsx|jsx|javascript|js|ts)\s*['"`]*\s*\n/i, "")
  return out.trim()
}
