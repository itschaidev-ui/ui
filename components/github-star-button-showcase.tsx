"use client"

import { useState } from "react"
import { GitHubStarButton } from "@/components/ui/github-star-button"

const defaults = {
  label: "Star on GitHub",
  count: 6,
  href: "https://github.com/itschaidev-ui/ui",
  showCount: true,
  showSweep: true,
}

export function GitHubStarButtonShowcase() {
  const [label, setLabel] = useState(defaults.label)
  const [count, setCount] = useState(defaults.count)
  const [href, setHref] = useState(defaults.href)
  const [showCount, setShowCount] = useState(defaults.showCount)
  const [showSweep, setShowSweep] = useState(defaults.showSweep)

  const resetPreview = () => {
    setLabel(defaults.label)
    setCount(defaults.count)
    setHref(defaults.href)
    setShowCount(defaults.showCount)
    setShowSweep(defaults.showSweep)
  }

  return (
    <div className="text-[#e5e5e5]">
      <h1 className="text-3xl font-semibold tracking-tight">GitHub Star Button</h1>
      <p className="mt-2 text-sm text-[#777]">CTA button with icon, animated sweep, and star count.</p>

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
          <GitHubStarButton label={label} count={count} href={href} showCount={showCount} showSweep={showSweep} />
        </div>
      </section>

      <section className="mt-6 grid gap-5 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-6 md:grid-cols-2">
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Label</span>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Count</span>
          <input
            type="number"
            value={count}
            min={0}
            onChange={(e) => setCount(Math.max(0, Number(e.target.value) || 0))}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm md:col-span-2">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Href</span>
          <input
            value={href}
            onChange={(e) => setHref(e.target.value)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          />
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={showCount} onChange={(e) => setShowCount(e.target.checked)} />
          Show Count
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={showSweep} onChange={(e) => setShowSweep(e.target.checked)} />
          Sweep Effect
        </label>
      </section>

      <section className="mt-6 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-5">
        <p className="text-xs uppercase tracking-wide text-[#666]">Dependencies</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#2a2a2a] bg-[#090909] px-3 py-1 text-xs text-[#ddd]">react</span>
          <span className="rounded-full border border-[#2a2a2a] bg-[#090909] px-3 py-1 text-xs text-[#ddd]">
            no extra npm package required
          </span>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-5">
        <p className="text-xs uppercase tracking-wide text-[#666]">Package Usage</p>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-[#222] bg-[#070707] p-3 text-xs text-[#bfbfbf]">
          <code>{`npm i @chaidev/ui

import "@chaidev/ui/styles.css"
import { GitHubStarButton } from "@chaidev/ui"`}</code>
        </pre>
      </section>
    </div>
  )
}
