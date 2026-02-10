"use client"

import { useState } from "react"
import { LockSwitch } from "@/components/ui/lock-switch"

const defaults = {
  checked: false,
  disabled: false,
  size: "md" as const,
  tone: "default" as const,
  motion: "smooth" as const,
  showStateLabel: true,
  lockedColor: "#10b981",
  unlockedColor: "#fb7185",
  knobColor: "#f9fafb",
}

export function LockSwitchShowcase() {
  const [checked, setChecked] = useState(defaults.checked)
  const [disabled, setDisabled] = useState(defaults.disabled)
  const [size, setSize] = useState<(typeof defaults)["size"]>(defaults.size)
  const [tone, setTone] = useState<(typeof defaults)["tone"]>(defaults.tone)
  const [motion, setMotion] = useState<(typeof defaults)["motion"]>(defaults.motion)
  const [showStateLabel, setShowStateLabel] = useState(defaults.showStateLabel)
  const [lockedColor, setLockedColor] = useState(defaults.lockedColor)
  const [unlockedColor, setUnlockedColor] = useState(defaults.unlockedColor)
  const [knobColor, setKnobColor] = useState(defaults.knobColor)

  const resetPreview = () => {
    setChecked(defaults.checked)
    setDisabled(defaults.disabled)
    setSize(defaults.size)
    setTone(defaults.tone)
    setMotion(defaults.motion)
    setShowStateLabel(defaults.showStateLabel)
    setLockedColor(defaults.lockedColor)
    setUnlockedColor(defaults.unlockedColor)
    setKnobColor(defaults.knobColor)
  }

  return (
    <div className="text-[#e5e5e5]">
      <h1 className="text-3xl font-semibold tracking-tight">Lock Switch</h1>
      <p className="mt-2 text-sm text-[#777]">Animated lock toggle switch in unlocked/locked states.</p>

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
        <div className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-xl border border-[#242424] bg-[#050505] p-8">
          <LockSwitch
            checked={checked}
            disabled={disabled}
            onCheckedChange={setChecked}
            size={size}
            tone={tone}
            motion={motion}
            showStateLabel={showStateLabel}
            lockedColor={lockedColor}
            unlockedColor={unlockedColor}
            knobColor={knobColor}
          />
          <p className="text-xs text-[#8f8f8f]">{checked ? "Checked" : "Unchecked"}</p>
        </div>
      </section>

      <section className="mt-6 grid gap-5 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-6 md:grid-cols-2">
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          Checked
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
          Disabled
        </label>
        <label className="rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <p className="mb-2 text-xs uppercase tracking-wide text-[#777]">Size</p>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as typeof defaults.size)}
            className="w-full rounded-md border border-[#272727] bg-[#111] px-2.5 py-2 text-sm outline-none"
          >
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
          </select>
        </label>
        <label className="rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <p className="mb-2 text-xs uppercase tracking-wide text-[#777]">Tone</p>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as typeof defaults.tone)}
            className="w-full rounded-md border border-[#272727] bg-[#111] px-2.5 py-2 text-sm outline-none"
          >
            <option value="default">default</option>
            <option value="vivid">vivid</option>
            <option value="glass">glass</option>
          </select>
        </label>
        <label className="rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <p className="mb-2 text-xs uppercase tracking-wide text-[#777]">Motion</p>
          <select
            value={motion}
            onChange={(e) => setMotion(e.target.value as typeof defaults.motion)}
            className="w-full rounded-md border border-[#272727] bg-[#111] px-2.5 py-2 text-sm outline-none"
          >
            <option value="smooth">smooth</option>
            <option value="spring">spring</option>
            <option value="snappy">snappy</option>
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={showStateLabel} onChange={(e) => setShowStateLabel(e.target.checked)} />
          Show state label
        </label>
        <label className="rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <p className="mb-2 text-xs uppercase tracking-wide text-[#777]">Locked color</p>
          <input
            type="color"
            value={lockedColor}
            onChange={(e) => setLockedColor(e.target.value)}
            className="h-10 w-full cursor-pointer rounded-md border border-[#272727] bg-[#111]"
          />
        </label>
        <label className="rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <p className="mb-2 text-xs uppercase tracking-wide text-[#777]">Unlocked color</p>
          <input
            type="color"
            value={unlockedColor}
            onChange={(e) => setUnlockedColor(e.target.value)}
            className="h-10 w-full cursor-pointer rounded-md border border-[#272727] bg-[#111]"
          />
        </label>
        <label className="rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm md:col-span-2">
          <p className="mb-2 text-xs uppercase tracking-wide text-[#777]">Knob color</p>
          <input
            type="color"
            value={knobColor}
            onChange={(e) => setKnobColor(e.target.value)}
            className="h-10 w-full cursor-pointer rounded-md border border-[#272727] bg-[#111]"
          />
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
    </div>
  )
}
