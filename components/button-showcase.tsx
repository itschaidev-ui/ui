"use client"

import { useState } from "react"
import { SparkleButton } from "@/components/ui/sparkle-button"

const defaults = {
  label: "Get Started",
  hoverText: "sparkle/ui",
}

export function ButtonShowcase() {
  const [label, setLabel] = useState(defaults.label)
  const [hoverText, setHoverText] = useState(defaults.hoverText)

  const resetPreview = () => {
    setLabel(defaults.label)
    setHoverText(defaults.hoverText)
  }

  return (
    <div className="text-[#e5e5e5]">
      <h1 className="text-3xl font-semibold tracking-tight">Sparkle Button</h1>
      <p className="mt-2 text-sm text-[#777]">Call-to-action button with sparkle effects and optional hover text.</p>

      <section className="mt-8 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide text-[#666]">Live Preview</p>
          <button
            type="button"
            onClick={resetPreview}
            className="rounded-md border border-[#343434] bg-[#101010] px-2.5 py-1 text-xs text-[#c8c8c8] transition hover:border-[#505050] hover:text-white"
          >
            Reset
          </button>
        </div>
        <div className="rounded-xl border border-[#242424] bg-[#050505] p-5">
          <SparkleButton text={label} hoverText={hoverText} />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-[#888]">Label</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full rounded border border-[#343434] bg-[#101010] px-3 py-2 text-sm text-[#e5e5e5]"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[#888]">Hover text</label>
            <input
              type="text"
              value={hoverText}
              onChange={(e) => setHoverText(e.target.value)}
              className="w-full rounded border border-[#343434] bg-[#101010] px-3 py-2 text-sm text-[#e5e5e5]"
            />
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-2 text-xs text-[#666]">Usage</p>
          <pre className="overflow-x-auto rounded bg-[#0a0a0a] p-3 text-[0.7rem] text-[#999]">
            {`sparkle-ui add sparkle-button
import "@chaidev/ui/styles.css"
import { SparkleButton } from "@chaidev/ui"`}
          </pre>
        </div>
      </section>
    </div>
  )
}
