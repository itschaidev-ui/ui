"use client"

import { useState } from "react"
import { Callout, type CalloutAppearance, type CalloutTone } from "@/components/ui/callout"

const defaults = {
  title: "Heads up",
  description: "This is a customizable callout component for important context.",
  tone: "info" as CalloutTone,
  appearance: "soft" as CalloutAppearance,
  showIcon: true,
  dismissible: false,
}

export function CalloutShowcase() {
  const [title, setTitle] = useState(defaults.title)
  const [description, setDescription] = useState(defaults.description)
  const [tone, setTone] = useState<CalloutTone>(defaults.tone)
  const [appearance, setAppearance] = useState<CalloutAppearance>(defaults.appearance)
  const [showIcon, setShowIcon] = useState(defaults.showIcon)
  const [dismissible, setDismissible] = useState(defaults.dismissible)
  const [dismissCount, setDismissCount] = useState(0)

  const resetPreview = () => {
    setTitle(defaults.title)
    setDescription(defaults.description)
    setTone(defaults.tone)
    setAppearance(defaults.appearance)
    setShowIcon(defaults.showIcon)
    setDismissible(defaults.dismissible)
    setDismissCount(0)
  }

  return (
    <div className="text-[#e5e5e5]">
      <h1 className="text-3xl font-semibold tracking-tight">Callout</h1>
      <p className="mt-2 text-sm text-[#777]">Attention block for tips, warnings, and important notices.</p>

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
        <div className="space-y-3 rounded-xl border border-[#242424] bg-[#050505] p-6">
          <Callout
            title={title}
            description={description}
            tone={tone}
            appearance={appearance}
            showIcon={showIcon}
            dismissible={dismissible}
            onDismiss={() => setDismissCount((value) => value + 1)}
          />
          <p className="text-xs text-[#8f8f8f]">Dismiss pressed: {dismissCount}</p>
        </div>
      </section>

      <section className="mt-6 grid gap-5 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-6 md:grid-cols-2">
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Description</span>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Tone</span>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as CalloutTone)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            <option value="neutral">Neutral</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="danger">Danger</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Appearance</span>
          <select
            value={appearance}
            onChange={(e) => setAppearance(e.target.value as CalloutAppearance)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            <option value="soft">Soft</option>
            <option value="solid">Solid</option>
            <option value="outline">Outline</option>
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={showIcon} onChange={(e) => setShowIcon(e.target.checked)} />
          Show Icon (default on)
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={dismissible} onChange={(e) => setDismissible(e.target.checked)} />
          Dismissible (default off)
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
          <code>{`sparkle-ui add callout

import "@chaidev/ui/styles.css"
import { Callout } from "@chaidev/ui"`}</code>
        </pre>
      </section>
    </div>
  )
}
