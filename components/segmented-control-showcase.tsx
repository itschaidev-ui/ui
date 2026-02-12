"use client"

import { useEffect, useMemo, useState } from "react"
import {
  CircleDashed,
  Minimize2,
  Type,
  PanelsTopLeft,
  Radius,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Figma,
  Dribbble,
  Triangle,
  Circle,
} from "lucide-react"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { ElasticSlider } from "@/components/ui/elastic-slider"

const optionLabels = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth"]
const optionVisuals = [
  <AlignLeft key="align-left" className="h-5 w-5" />,
  <AlignCenter key="align-center" className="h-5 w-5" />,
  <AlignRight key="align-right" className="h-5 w-5" />,
  <AlignJustify key="align-justify" className="h-5 w-5" />,
  <Figma key="figma" className="h-5 w-5" />,
  <Dribbble key="dribbble" className="h-5 w-5" />,
  <Triangle key="triangle" className="h-5 w-5" />,
  <Circle key="circle" className="h-5 w-5" />,
]

const defaults = {
  value: "opt-1",
  optionCount: 3,
  accentColor: "#7d53b4",
  secondaryColor: "#5b4294",
  useAutoSecondary: true,
  contentMode: "text" as const,
  radius: 16,
  pillInset: 4,
  pillRadius: 12,
  height: 48,
  fontSize: 18,
} as const

export function SegmentedControlShowcase() {
  const [value, setValue] = useState(defaults.value)
  const [optionCount, setOptionCount] = useState(defaults.optionCount)
  const [accentColor, setAccentColor] = useState(defaults.accentColor)
  const [secondaryColor, setSecondaryColor] = useState(defaults.secondaryColor)
  const [useAutoSecondary, setUseAutoSecondary] = useState(defaults.useAutoSecondary)
  const [contentMode, setContentMode] = useState<"text" | "visual">(defaults.contentMode)
  const [radius, setRadius] = useState(defaults.radius)
  const [pillInset, setPillInset] = useState(defaults.pillInset)
  const [pillRadius, setPillRadius] = useState(defaults.pillRadius)
  const [height, setHeight] = useState(defaults.height)
  const [fontSize, setFontSize] = useState(defaults.fontSize)

  const options = useMemo(
    () =>
      Array.from({ length: optionCount }, (_, i) => ({
        label: optionLabels[i] ?? `Item ${i + 1}`,
        value: `opt-${i + 1}`,
        visual: optionVisuals[i] ?? optionVisuals[0],
      })),
    [optionCount],
  )

  useEffect(() => {
    if (!options.some((option) => option.value === value)) {
      setValue("opt-1")
    }
  }, [options, value])

  const resetPreview = () => {
    setValue(defaults.value)
    setOptionCount(defaults.optionCount)
    setAccentColor(defaults.accentColor)
    setSecondaryColor(defaults.secondaryColor)
    setUseAutoSecondary(defaults.useAutoSecondary)
    setContentMode(defaults.contentMode)
    setRadius(defaults.radius)
    setPillInset(defaults.pillInset)
    setPillRadius(defaults.pillRadius)
    setHeight(defaults.height)
    setFontSize(defaults.fontSize)
  }

  return (
    <div className="text-[#e5e5e5]">
      <h1 className="text-3xl font-semibold tracking-tight">Segmented Control</h1>
      <p className="mt-2 text-sm text-[#777]">
        Contained, draggable segmented picker with style controls.
      </p>

      <section className="mt-8 rounded-2xl border border-[#1b1b1b] bg-[radial-gradient(circle_at_top,rgba(150,150,150,0.12),transparent_50%),#0a0a0a] p-8">
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
        <div className="space-y-4">
          <div className="rounded-xl border border-[#242424] bg-[#f1f1f1] p-6">
            <SegmentedControl
              options={options}
              value={value}
              onChange={setValue}
              draggable
              accentColor={accentColor}
              secondaryColor={useAutoSecondary ? undefined : secondaryColor}
              contentMode={contentMode}
              radius={radius}
              pillInset={pillInset}
              pillRadius={pillRadius}
              height={height}
              fontSize={fontSize}
            />
          </div>

          <div className="grid gap-3 rounded-xl border border-[#242424] bg-[#050505] p-4 md:grid-cols-2">
            <div className="text-xs text-[#9c9c9c]">
              <p>Content</p>
              <div className="mt-2 flex items-center gap-2">
                {(["text", "visual"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setContentMode(mode)}
                    className={`rounded-md border px-2.5 py-1 text-xs uppercase tracking-wide ${
                      contentMode === mode
                        ? "border-[#595959] bg-[#1a1a1a] text-white"
                        : "border-[#343434] bg-[#101010] text-[#a7a7a7]"
                    }`}
                  >
                    {mode === "visual" ? "Image/Icon" : "Text"}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-xs text-[#9c9c9c]">
              <p>Options ({optionCount})</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOptionCount((v) => Math.max(2, v - 1))}
                  className="rounded-md border border-[#343434] bg-[#111] px-2.5 py-1 text-sm text-[#ddd]"
                >
                  -
                </button>
                <input
                  type="number"
                  min={2}
                  max={8}
                  value={optionCount}
                  onChange={(e) =>
                    setOptionCount(Math.max(2, Math.min(8, Number(e.target.value) || 2)))
                  }
                  className="w-16 rounded-md border border-[#343434] bg-[#0f0f0f] px-2 py-1 text-center text-sm text-white"
                />
                <button
                  type="button"
                  onClick={() => setOptionCount((v) => Math.min(8, v + 1))}
                  className="rounded-md border border-[#343434] bg-[#111] px-2.5 py-1 text-sm text-[#ddd]"
                >
                  +
                </button>
              </div>
            </div>
            <label className="text-xs text-[#9c9c9c]">
              Radius ({radius}px)
              <ElasticSlider
                leftIcon={<Radius className="h-3.5 w-3.5" />}
                rightIcon={<Radius className="h-3.5 w-3.5" />}
                startingValue={8}
                value={radius}
                maxValue={28}
                isStepped
                stepSize={1}
                enhancedEffects
                showValueIndicator={false}
                valuePosition="top-right"
                onChange={(next) => setRadius(Math.round(next))}
              />
            </label>
            <label className="text-xs text-[#9c9c9c]">
              Pill Inset ({pillInset}px)
              <ElasticSlider
                leftIcon={<Minimize2 className="h-3.5 w-3.5" />}
                rightIcon={<PanelsTopLeft className="h-3.5 w-3.5" />}
                startingValue={2}
                value={pillInset}
                maxValue={10}
                isStepped
                stepSize={1}
                enhancedEffects
                showValueIndicator={false}
                valuePosition="top-right"
                onChange={(next) => setPillInset(Math.round(next))}
              />
            </label>
            <label className="text-xs text-[#9c9c9c]">
              Pill Radius ({pillRadius}px)
              <ElasticSlider
                leftIcon={<CircleDashed className="h-3.5 w-3.5" />}
                rightIcon={<CircleDashed className="h-3.5 w-3.5" />}
                startingValue={6}
                value={pillRadius}
                maxValue={22}
                isStepped
                stepSize={1}
                enhancedEffects
                showValueIndicator={false}
                valuePosition="top-right"
                onChange={(next) => setPillRadius(Math.round(next))}
              />
            </label>
            <label className="text-xs text-[#9c9c9c]">
              Height ({height}px)
              <ElasticSlider
                leftIcon={<PanelsTopLeft className="h-3.5 w-3.5" />}
                rightIcon={<PanelsTopLeft className="h-3.5 w-3.5" />}
                startingValue={36}
                value={height}
                maxValue={62}
                isStepped
                stepSize={1}
                enhancedEffects
                showValueIndicator={false}
                valuePosition="top-right"
                onChange={(next) => setHeight(Math.round(next))}
              />
            </label>
            <label className="text-xs text-[#9c9c9c] md:col-span-2">
              Font Size ({fontSize}px)
              <ElasticSlider
                leftIcon={<Type className="h-3.5 w-3.5" />}
                rightIcon={<Type className="h-3.5 w-3.5" />}
                startingValue={12}
                value={fontSize}
                maxValue={22}
                isStepped
                stepSize={1}
                enhancedEffects
                showValueIndicator={false}
                valuePosition="top-right"
                onChange={(next) => setFontSize(Math.round(next))}
              />
            </label>
            <div className="md:col-span-2">
              <p className="mb-1 text-xs text-[#9c9c9c]">Accent Color</p>
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="h-10 w-16 cursor-pointer rounded-md border border-[#343434] bg-[#0f0f0f] p-1"
              />
            </div>
            <div className="md:col-span-2">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs text-[#9c9c9c]">Secondary Color</p>
                <button
                  type="button"
                  onClick={() => setUseAutoSecondary((v) => !v)}
                  className="rounded-md border border-[#343434] bg-[#101010] px-2 py-1 text-[11px] uppercase tracking-wide text-[#c8c8c8]"
                >
                  {useAutoSecondary ? "Auto" : "Manual"}
                </button>
              </div>
              <input
                type="color"
                value={secondaryColor}
                disabled={useAutoSecondary}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="h-10 w-16 cursor-pointer rounded-md border border-[#343434] bg-[#0f0f0f] p-1 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-[#9a9a9a]">
            Selected value: <span className="text-[#f2f2f2]">{value}</span> ({optionCount} options)
          </p>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-5">
        <p className="text-xs uppercase tracking-wide text-[#666]">Dependencies</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#2a2a2a] bg-[#090909] px-3 py-1 text-xs text-[#ddd]">
            react
          </span>
          <span className="rounded-full border border-[#2a2a2a] bg-[#090909] px-3 py-1 text-xs text-[#ddd]">
            no extra npm package required
          </span>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-5">
        <p className="text-xs uppercase tracking-wide text-[#666]">Package Usage</p>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-[#222] bg-[#070707] p-3 text-xs text-[#bfbfbf]">
          <code>{`sparkle-ui add segmented-control

import "@chaidev/ui/styles.css"
import { SegmentedControl } from "@chaidev/ui"`}</code>
        </pre>
      </section>
    </div>
  )
}
