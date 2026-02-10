"use client"

import { useState, type ReactElement } from "react"
import { Bell, CheckCircle2, Info, Tag, TriangleAlert } from "lucide-react"
import {
  BadgePro,
  type BadgeAnimation,
  type BadgeAppearance,
  type BadgeSize,
  type BadgeTone,
} from "@/components/ui/badge-pro"

const defaults = {
  label: "New",
  tone: "primary" as BadgeTone,
  appearance: "soft" as BadgeAppearance,
  size: "md" as BadgeSize,
  dot: true,
  icon: true,
  removable: false,
  animations: ["pulse"] as BadgeAnimation[],
}

const iconByTone: Record<BadgeTone, ReactElement> = {
  neutral: <Tag className="h-3.5 w-3.5" />,
  primary: <Bell className="h-3.5 w-3.5" />,
  success: <CheckCircle2 className="h-3.5 w-3.5" />,
  warning: <TriangleAlert className="h-3.5 w-3.5" />,
  danger: <TriangleAlert className="h-3.5 w-3.5" />,
  info: <Info className="h-3.5 w-3.5" />,
}

export function BadgeShowcase() {
  const [label, setLabel] = useState(defaults.label)
  const [tone, setTone] = useState<BadgeTone>(defaults.tone)
  const [appearance, setAppearance] = useState<BadgeAppearance>(defaults.appearance)
  const [size, setSize] = useState<BadgeSize>(defaults.size)
  const [dot, setDot] = useState(defaults.dot)
  const [icon, setIcon] = useState(defaults.icon)
  const [removable, setRemovable] = useState(defaults.removable)
  const [animations, setAnimations] = useState<BadgeAnimation[]>(defaults.animations)

  const resetPreview = () => {
    setLabel(defaults.label)
    setTone(defaults.tone)
    setAppearance(defaults.appearance)
    setSize(defaults.size)
    setDot(defaults.dot)
    setIcon(defaults.icon)
    setRemovable(defaults.removable)
    setAnimations(defaults.animations)
  }

  const toggleAnimation = (name: BadgeAnimation) => {
    setAnimations((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]))
  }

  return (
    <div className="text-[#e5e5e5]">
      <h1 className="text-3xl font-semibold tracking-tight">Badge</h1>
      <p className="mt-2 text-sm text-[#777]">Status and metadata badge with dot/icon/remove variants.</p>

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

        <div className="rounded-xl border border-[#242424] bg-[#050505] p-6">
          <div className="mb-4 flex flex-wrap gap-3">
            <BadgePro
              label={label}
              tone={tone}
              appearance={appearance}
              size={size}
              dot={dot}
              icon={icon ? iconByTone[tone] : undefined}
              removable={removable}
              animation={animations}
              onRemove={() => {}}
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-xs text-[#9c9c9c]">
              Label
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="mt-1 w-full rounded-md border border-[#353535] bg-[#101010] px-2.5 py-1.5 text-sm text-white"
              />
            </label>

            <div className="text-xs text-[#9c9c9c]">
              Tone
              <div className="mt-1 flex flex-wrap gap-2">
                {(["neutral", "primary", "success", "warning", "danger", "info"] as BadgeTone[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setTone(option)}
                    className={`rounded-md border px-2 py-1 text-xs uppercase ${
                      tone === option
                        ? "border-[#5b5b5b] bg-[#1a1a1a] text-white"
                        : "border-[#343434] bg-[#101010] text-[#a7a7a7]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-[#9c9c9c]">
              Appearance
              <div className="mt-1 flex flex-wrap gap-2">
                {(["solid", "soft", "outline"] as BadgeAppearance[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAppearance(option)}
                    className={`rounded-md border px-2 py-1 text-xs uppercase ${
                      appearance === option
                        ? "border-[#5b5b5b] bg-[#1a1a1a] text-white"
                        : "border-[#343434] bg-[#101010] text-[#a7a7a7]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-[#9c9c9c]">
              Size
              <div className="mt-1 flex flex-wrap gap-2">
                {(["sm", "md", "lg"] as BadgeSize[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSize(option)}
                    className={`rounded-md border px-2 py-1 text-xs uppercase ${
                      size === option
                        ? "border-[#5b5b5b] bg-[#1a1a1a] text-white"
                        : "border-[#343434] bg-[#101010] text-[#a7a7a7]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-[#9c9c9c] md:col-span-2">
              Options
              <div className="mt-1 flex flex-wrap gap-2">
                {[["Dot", dot, setDot], ["Icon", icon, setIcon], ["Removable", removable, setRemovable]].map(
                  ([name, isOn, setter]) => (
                    <button
                      key={String(name)}
                      type="button"
                      onClick={() => (setter as (next: boolean) => void)(!(isOn as boolean))}
                      className={`rounded-md border px-2.5 py-1 text-xs ${
                        isOn
                          ? "border-[#5b5b5b] bg-[#1a1a1a] text-white"
                          : "border-[#343434] bg-[#101010] text-[#a7a7a7]"
                      }`}
                    >
                      {name}: {isOn ? "On" : "Off"}
                    </button>
                  ),
                )}
              </div>
            </div>
            <div className="text-xs text-[#9c9c9c] md:col-span-2">
              Animations (multi-select)
              <div className="mt-1 flex flex-wrap gap-2">
                {(["pulse", "glow", "float", "shimmer", "wiggle"] as BadgeAnimation[]).map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => toggleAnimation(name)}
                    className={`rounded-md border px-2.5 py-1 text-xs uppercase ${
                      animations.includes(name)
                        ? "border-[#5b5b5b] bg-[#1a1a1a] text-white"
                        : "border-[#343434] bg-[#101010] text-[#a7a7a7]"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-5">
        <p className="text-xs uppercase tracking-wide text-[#666]">Dependencies</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#2a2a2a] bg-[#090909] px-3 py-1 text-xs text-[#ddd]">
            react
          </span>
        </div>
      </section>
    </div>
  )
}
