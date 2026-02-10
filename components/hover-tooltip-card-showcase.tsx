"use client"

import { useState } from "react"
import { HoverTooltipCard } from "@/components/ui/hover-tooltip-card"

const defaults = {
  tooltipText: "sparkle/ui",
  frontText: "Tooltip 👆",
  revealText: "Hello! 👋",
}

export function HoverTooltipCardShowcase() {
  const [tooltipText, setTooltipText] = useState(defaults.tooltipText)
  const [frontText, setFrontText] = useState(defaults.frontText)
  const [revealText, setRevealText] = useState(defaults.revealText)

  const resetPreview = () => {
    setTooltipText(defaults.tooltipText)
    setFrontText(defaults.frontText)
    setRevealText(defaults.revealText)
  }

  return (
    <div className="text-[#e5e5e5]">
      <h1 className="text-3xl font-semibold tracking-tight">Hover Tooltip Card</h1>
      <p className="mt-2 text-sm text-[#777]">Animated hover card with tooltip label and side reveal transition.</p>

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
        <div className="flex min-h-40 items-center justify-center rounded-xl border border-[#242424] bg-[#050505] p-8">
          <HoverTooltipCard tooltipText={tooltipText} frontText={frontText} revealText={revealText} />
        </div>
      </section>

      <section className="mt-6 grid gap-5 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-6 md:grid-cols-2">
        <label className="rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <p className="mb-2 text-xs uppercase tracking-wide text-[#777]">Tooltip Text</p>
          <input
            value={tooltipText}
            onChange={(event) => setTooltipText(event.target.value)}
            className="w-full rounded-md border border-[#272727] bg-[#111] px-2.5 py-2 text-sm outline-none"
          />
        </label>

        <label className="rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <p className="mb-2 text-xs uppercase tracking-wide text-[#777]">Front Text</p>
          <input
            value={frontText}
            onChange={(event) => setFrontText(event.target.value)}
            className="w-full rounded-md border border-[#272727] bg-[#111] px-2.5 py-2 text-sm outline-none"
          />
        </label>

        <label className="rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm md:col-span-2">
          <p className="mb-2 text-xs uppercase tracking-wide text-[#777]">Reveal Text</p>
          <input
            value={revealText}
            onChange={(event) => setRevealText(event.target.value)}
            className="w-full rounded-md border border-[#272727] bg-[#111] px-2.5 py-2 text-sm outline-none"
          />
        </label>
      </section>
    </div>
  )
}
