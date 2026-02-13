import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import ts from "typescript"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { sanitizeCodeText } from "@/lib/code-parse"
import { readGeneratedFile } from "@/lib/generated-files"

function rewriteImports(js: string): string {
  return js
    .replace(/from\s+["']react["']/g, 'from "https://esm.sh/react@19"')
    .replace(/from\s+["']react-dom["']/g, 'from "https://esm.sh/react-dom@19"')
    .replace(/from\s+["']react-dom\/client["']/g, 'from "https://esm.sh/react-dom@19/client"')
    .replace(/from\s+["']react\/jsx-runtime["']/g, 'from "https://esm.sh/react@19/jsx-runtime"')
    .replace(/from\s+["']@chaidev\/ui["']/g, 'from "https://esm.sh/@chaidev/ui?bundle"')
    .replace(/from\s+["']@sparkle-ui\/button["']/g, 'from "https://esm.sh/@chaidev/ui?bundle"')
    .replace(/from\s+["']@sparkle-ui\/core["']/g, 'from "https://esm.sh/@chaidev/ui?bundle"')
}

function toErrorModule(message: string) {
  const escaped = JSON.stringify(message)
  return `import React from "https://esm.sh/react@19";
export default function PreviewError() {
  return React.createElement("pre", {
    style: {
      margin: 0,
      padding: "16px",
      color: "#fecaca",
      background: "#1f1115",
      borderRadius: "10px",
      border: "1px solid rgba(248,113,113,.35)",
      whiteSpace: "pre-wrap",
      fontSize: "12px",
      lineHeight: 1.45
    }
  }, ${escaped});
}`
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as { id?: string })?.id ?? "anonymous"
  const { searchParams } = new URL(req.url)
  const targetPath = searchParams.get("path")?.trim() || "src/App/page.tsx"
  const version = searchParams.get("v")?.trim() || ""

  try {
    const rawSource = await readGeneratedFile(userId, targetPath)
    const source = sanitizeCodeText(rawSource)
    if (!source.trim()) {
      return new NextResponse(toErrorModule(`No generated code found at ${targetPath}`), {
        headers: { "Content-Type": "application/javascript; charset=utf-8", "Cache-Control": "no-store" },
      })
    }

    // Single-file runtime preview can't resolve workspace-relative imports yet.
    if (/from\s+["'](\.\/|\.\.\/|@\/)/.test(source)) {
      return new NextResponse(
        toErrorModule(
          `Runtime preview cannot resolve local imports in ${targetPath} yet. Keep generated code self-contained or external-package imports only.`
        ),
        { headers: { "Content-Type": "application/javascript; charset=utf-8", "Cache-Control": "no-store" } }
      )
    }

    const transpiled = ts.transpileModule(source, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.ESNext,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
        isolatedModules: true,
      },
      fileName: targetPath.endsWith(".tsx") ? targetPath : `${targetPath}.tsx`,
      reportDiagnostics: false,
    }).outputText

    const rewritten = rewriteImports(transpiled)
    const versionTag = version ? `\n/* preview-version:${version} */\n` : "\n"
    return new NextResponse(`${rewritten}${versionTag}`, {
      headers: { "Content-Type": "application/javascript; charset=utf-8", "Cache-Control": "no-store" },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to compile preview module"
    return new NextResponse(toErrorModule(`Preview module error: ${message}`), {
      headers: { "Content-Type": "application/javascript; charset=utf-8", "Cache-Control": "no-store" },
    })
  }
}

