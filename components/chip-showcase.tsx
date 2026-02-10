"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Chip, type ChipAppearance, type ChipSize, type ChipTone } from "@/components/ui/chip"

const defaults = {
  label: "Design System",
  tone: "primary" as ChipTone,
  appearance: "soft" as ChipAppearance,
  size: "md" as ChipSize,
  selected: false,
  removable: false,
  animated: false,
  showIcon: false,
}

export function ChipShowcase() {
  const [label, setLabel] = useState(defaults.label)
  const [tone, setTone] = useState<ChipTone>(defaults.tone)
  const [appearance, setAppearance] = useState<ChipAppearance>(defaults.appearance)
  const [size, setSize] = useState<ChipSize>(defaults.size)
  const [selected, setSelected] = useState(defaults.selected)
  const [removable, setRemovable] = useState(defaults.removable)
  const [animated, setAnimated] = useState(defaults.animated)
  const [showIcon, setShowIcon] = useState(defaults.showIcon)
  const [removedCount, setRemovedCount] = useState(0)

  const resetPreview = () => {
    setLabel(defaults.label)
    setTone(defaults.tone)
    setAppearance(defaults.appearance)
    setSize(defaults.size)
    setSelected(defaults.selected)
    setRemovable(defaults.removable)
    setAnimated(defaults.animated)
    setShowIcon(defaults.showIcon)
    setRemovedCount(0)
  }

  return (
    <div className="text-[#e5e5e5]">
      <h1 className="text-3xl font-semibold tracking-tight">Chip</h1>
      <p className="mt-2 text-sm text-[#777]">Compact labels for tags, filters, and selected states.</p>

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
        <div className="flex min-h-40 flex-col items-center justify-center gap-4 rounded-xl border border-[#242424] bg-[#050505] p-8">
          <Chip
            label={label}
            tone={tone}
            appearance={appearance}
            size={size}
            selected={selected}
            removable={removable}
            animated={animated}
            icon={showIcon ? <Sparkles className="h-3.5 w-3.5" /> : undefined}
            onClick={() => setSelected((v) => !v)}
            onRemove={() => setRemovedCount((value) => value + 1)}
          />
          <p className="text-xs text-[#8f8f8f]">Remove pressed: {removedCount}</p>
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
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Tone</span>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as ChipTone)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            <option value="neutral">Neutral</option>
            <option value="primary">Primary</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="danger">Danger</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Appearance</span>
          <select
            value={appearance}
            onChange={(e) => setAppearance(e.target.value as ChipAppearance)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            <option value="soft">Soft</option>
            <option value="solid">Solid</option>
            <option value="outline">Outline</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Size</span>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as ChipSize)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={selected} onChange={(e) => setSelected(e.target.checked)} />
          Selected
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={removable} onChange={(e) => setRemovable(e.target.checked)} />
          Removable (default off)
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={showIcon} onChange={(e) => setShowIcon(e.target.checked)} />
          Show Icon (default off)
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={animated} onChange={(e) => setAnimated(e.target.checked)} />
          Animated (default off)
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
import { Chip } from "@chaidev/ui"`}</code>
        </pre>
      </section>
    </div>
  )
}
