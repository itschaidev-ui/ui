# CONTEXT

**Environment:** Next.js app with React, TypeScript, Tailwind. sparkle/ui component library and packs (see lib/packs.ts).

**Capabilities:** Chat (conversation and agent mode), code generation for single files, diff-style edits, live preview. User can attach UI or component packs to steer style and component choices.

**APIs:** AI via Gemini or Groq (env: GEMINI_API_KEY, GROQ_API_KEY). No other external APIs required for core agent behavior.

**When to update:** When new tools, packs, or API integrations are added; when deployment or env constraints change.
