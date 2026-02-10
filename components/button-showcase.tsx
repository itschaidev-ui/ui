"use client"

import { useState } from "react"
import { Timer, TimerReset, Palette, Sparkles } from "lucide-react"
import { SparkleButton } from "@/components/ui/sparkle-button"
import { ElasticSlider } from "@/components/ui/elastic-slider"

const defaults = {
  text: "Get Started",
  hoverText: "Ready?",
  activeText: "Loading...",
  hue: 210,
  size: "md" as const,
  loadingDuration: 2200,
}

export function ButtonShowcase() {
  const [text, setText] = useState(defaults.text)
  const [hoverText, setHoverText] = useState(defaults.hoverText)
  const [activeText, setActiveText] = useState(defaults.activeText)
  const [hue, setHue] = useState(defaults.hue)
  const [size, setSize] = useState<"sm" | "md" | "lg">(defaults.size)
  const [loadingDuration, setLoadingDuration] = useState(defaults.loadingDuration)

  const resetPreview = () => {
    setText(defaults.text)
    setHoverText(defaults.hoverText)
    setActiveText(defaults.activeText)
    setHue(defaults.hue)
    setSize(defaults.size)
    setLoadingDuration(defaults.loadingDuration)
  }

  return (
    <div className="text-[#e5e5e5]">
      <h1 className="text-3xl font-semibold tracking-tight">Sparkle Button</h1>
      <p className="mt-2 text-sm text-[#777]">Edit values, preview live, copy the modified code.</p>

      <section className="mt-8 rounded-2xl border border-[#1b1b1b] bg-[radial-gradient(circle_at_top,rgba(70,90,255,0.12),transparent_50%),#0a0a0a] p-8">
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
        <div className="flex min-h-40 items-center justify-center rounded-xl border border-[#242424] bg-[#050505] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <SparkleButton
            text={text}
            hoverText={hoverText}
            activeText={activeText}
            hue={hue}
            size={size}
            loadingDuration={loadingDuration}
            enableHoverText
            enableLoadingState
          />
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

      <section className="mt-6 grid gap-5 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-6 md:grid-cols-2">
          <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
            <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Text</span>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none transition focus:border-[#4b4b4b] focus:shadow-[0_0_0_3px_rgba(110,120,255,0.15)]"
            />
          </label>

          <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
            <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Hover text</span>
            <input
              value={hoverText}
              onChange={(e) => setHoverText(e.target.value)}
              className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none transition focus:border-[#4b4b4b] focus:shadow-[0_0_0_3px_rgba(110,120,255,0.15)]"
            />
          </label>

          <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
            <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Loading text</span>
            <input
              value={activeText}
              onChange={(e) => setActiveText(e.target.value)}
              className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none transition focus:border-[#4b4b4b] focus:shadow-[0_0_0_3px_rgba(110,120,255,0.15)]"
            />
          </label>

          <div className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
            <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Size</span>
            <div className="flex items-center gap-2 rounded-xl border border-[#262626] bg-[#060606] p-1">
              {(["sm", "md", "lg"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSize(option)}
                  className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium uppercase tracking-wide transition ${
                    size === option
                      ? "bg-gradient-to-b from-[#2a2a2a] to-[#161616] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                      : "text-[#777] hover:bg-[#111] hover:text-[#ddd]"
                  }`}
                >
                  {option === "sm" ? "Small" : option === "md" ? "Medium" : "Large"}
                </button>
              ))}
            </div>
          </div>

          <label className="flex flex-col gap-3 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
            <span className="flex items-center justify-between text-xs uppercase tracking-wide text-[#7e7e7e]">
              Hue
              <span
                className="rounded-full border border-[#2a2a2a] bg-[#080808] px-2 py-0.5 text-[11px]"
                style={{ color: `hsl(${hue} 90% 70%)` }}
              >
                {hue}
              </span>
            </span>
            <ElasticSlider
              leftIcon={<Palette className="h-4 w-4" />}
              rightIcon={<Sparkles className="h-4 w-4" />}
              startingValue={0}
              value={hue}
              maxValue={360}
              isStepped
              stepSize={1}
              enhancedEffects
              onChange={(next) => setHue(Math.round(next))}
            />
          </label>

          <label className="flex flex-col gap-3 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
            <span className="flex items-center justify-between text-xs uppercase tracking-wide text-[#7e7e7e]">
              Loading duration
              <span className="rounded-full border border-[#2a2a2a] bg-[#080808] px-2 py-0.5 text-[11px] text-[#d2d2d2]">
                {loadingDuration}ms
              </span>
            </span>
            <div className="space-y-3 rounded-xl border border-[#262626] bg-[#060606] p-3">
              <ElasticSlider
                leftIcon={<TimerReset className="h-4 w-4" />}
                rightIcon={<Timer className="h-4 w-4" />}
                startingValue={400}
                value={loadingDuration}
                maxValue={5000}
                isStepped
                stepSize={100}
                enhancedEffects
                onChange={(next) => setLoadingDuration(Math.round(next / 100) * 100)}
              />
              <input
                type="number"
                min={200}
                step={100}
                value={loadingDuration}
                onChange={(e) => setLoadingDuration(Number(e.target.value) || 2200)}
                className="w-full appearance-none rounded-lg border border-[#2b2b2b] bg-[#090909] px-3 py-2 text-[#f1f1f1] outline-none transition [appearance:textfield] focus:border-[#4b4b4b] focus:shadow-[0_0_0_3px_rgba(61,130,255,0.16)] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
          </label>
      </section>

      <section className="mt-6 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-5">
        <p className="text-xs uppercase tracking-wide text-[#666]">Package Usage</p>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-[#222] bg-[#070707] p-3 text-xs text-[#bfbfbf]">
          <code>{`npm i @chaidev/ui

import "@chaidev/ui/styles.css"
import { SparkleButton } from "@chaidev/ui"`}</code>
        </pre>
      </section>
    </div>
  )
}
