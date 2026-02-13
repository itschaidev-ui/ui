import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { readGeneratedFile } from "@/lib/generated-files"

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as { id?: string })?.id ?? "anonymous"

  const { searchParams } = new URL(req.url)
  const targetPath = searchParams.get("path")?.trim() || "src/App/page.tsx"
  const version = searchParams.get("v")?.trim() || String(Date.now())

  let code = ""
  try {
    code = await readGeneratedFile(userId, targetPath)
  } catch {
    code = ""
  }

  const escapedPath = escapeHtml(targetPath)
  const moduleUrl = `/api/agent/runtime/preview/module?path=${encodeURIComponent(targetPath)}&v=${encodeURIComponent(version)}`
  const moduleUrlJsLiteral = JSON.stringify(moduleUrl)

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Sandbox Preview</title>
    <link rel="stylesheet" href="https://esm.sh/@chaidev/ui/styles.css" />
    <style>
      :root { color-scheme: dark; }
      body { margin: 0; font-family: Inter, system-ui, sans-serif; background: #070711; color: #e9ebff; }
      .wrap { min-height: 100vh; display: grid; place-items: center; padding: 24px; box-sizing: border-box; }
      .card { width: min(860px, 100%); border: 1px solid rgba(255,255,255,.12); border-radius: 14px; background: rgba(8,8,16,.72); overflow: hidden; }
      .head { display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,.1); font-size: 12px; color: rgba(233,235,255,.78); }
      .runtime { min-height: 420px; padding: 24px; box-sizing: border-box; }
      #root { min-height: 360px; display: grid; place-items: center; }
      .error { margin: 0; padding: 14px; color: #fecaca; background: #1f1115; border-radius: 10px; border: 1px solid rgba(248,113,113,.35); white-space: pre-wrap; font-size: 12px; line-height: 1.45; width: min(720px, 100%); box-sizing: border-box; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="card">
        <div class="head">
          <span>Runtime Preview</span>
          <span>${escapedPath}</span>
        </div>
        <div class="runtime">
          <div id="root"></div>
        </div>
      </div>
    </div>
    <script type="module">
      import React from "https://esm.sh/react@19";
      import { createRoot } from "https://esm.sh/react-dom@19/client";

      const rootEl = document.getElementById("root");
      const root = createRoot(rootEl);

      const renderError = (message) => {
        root.render(React.createElement("pre", { className: "error" }, message));
      };

      root.render(
        React.createElement("div", { style: { opacity: 0.75, fontSize: "12px" } }, "Loading runtime preview...")
      );

      (async () => {
        try {
          const mod = await import(${moduleUrlJsLiteral});
          const Comp = mod?.default || mod?.Page || mod?.Home || null;
          if (!Comp) throw new Error("No renderable export found (expected default/Page/Home).");
          root.render(React.createElement(Comp));
        } catch (err) {
          renderError("Runtime preview failed: " + (err?.message || String(err)));
        }
      })();
    </script>
  </body>
</html>`

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  })
}

