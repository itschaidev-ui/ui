"use client"

import { useMemo, useState } from "react"
import {
  Gauge,
  MinusCircle,
  PlusCircle,
  Sparkles,
  Volume2,
  VolumeX,
  Waves,
  Zap,
} from "lucide-react"
import { ElasticSlider } from "@/components/ui/elastic-slider"

const defaults = {
  defaultValue: 0,
  stepsValue: 0,
  value: 1000,
  startingValue: 0,
  maxValue: 2000,
  stepped: false,
  stepSize: 50,
  leftIconKey: "minus",
  rightIconKey: "plus",
  valuePosition: "top-center" as const,
}

export function ElasticSliderShowcase() {
  const [defaultValue, setDefaultValue] = useState(defaults.defaultValue)
  const [stepsValue, setStepsValue] = useState(defaults.stepsValue)
  const [value, setValue] = useState(defaults.value)

  const [startingValue, setStartingValue] = useState(defaults.startingValue)
  const [maxValue, setMaxValue] = useState(defaults.maxValue)
  const [stepped, setStepped] = useState(defaults.stepped)
  const [stepSize, setStepSize] = useState(defaults.stepSize)
  const [leftIconKey, setLeftIconKey] = useState(defaults.leftIconKey)
  const [rightIconKey, setRightIconKey] = useState(defaults.rightIconKey)
  const [valuePosition, setValuePosition] = useState<
    "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
  >(defaults.valuePosition)

  const iconOptions = useMemo(
    () => [
      { key: "minus", label: "Minus", icon: <MinusCircle className="h-4 w-4" /> },
      { key: "plus", label: "Plus", icon: <PlusCircle className="h-4 w-4" /> },
      { key: "volume-down", label: "Vol Down", icon: <VolumeX className="h-4 w-4" /> },
      { key: "volume-up", label: "Vol Up", icon: <Volume2 className="h-4 w-4" /> },
      { key: "gauge", label: "Gauge", icon: <Gauge className="h-4 w-4" /> },
      { key: "sparkles", label: "Sparkles", icon: <Sparkles className="h-4 w-4" /> },
      { key: "waves", label: "Waves", icon: <Waves className="h-4 w-4" /> },
      { key: "zap", label: "Zap", icon: <Zap className="h-4 w-4" /> },
    ],
    [],
  )

  const leftIconOption = iconOptions.find((option) => option.key === leftIconKey) ?? iconOptions[0]
  const rightIconOption = iconOptions.find((option) => option.key === rightIconKey) ?? iconOptions[1]

  const safeMaxValue = Math.max(startingValue + 1, maxValue)
  const safeValue = Math.min(Math.max(value, startingValue), safeMaxValue)

  const resetPreview = () => {
    setDefaultValue(defaults.defaultValue)
    setStepsValue(defaults.stepsValue)
    setValue(defaults.value)
    setStartingValue(defaults.startingValue)
    setMaxValue(defaults.maxValue)
    setStepped(defaults.stepped)
    setStepSize(defaults.stepSize)
    setLeftIconKey(defaults.leftIconKey)
    setRightIconKey(defaults.rightIconKey)
    setValuePosition(defaults.valuePosition)
  }

  return (
    <div className="text-[#e5e5e5]">
      <h1 className="text-3xl font-semibold tracking-tight">Elastic Slider</h1>
      <p className="mt-2 text-sm text-[#777]">Springy range slider with elastic drag overflow.</p>

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
        <div className="grid gap-4 rounded-xl border border-[#242424] bg-[#050505] p-6">
          <div className="rounded-lg border border-[#1f1f1f] bg-[#090909] p-4">
            <p className="mb-3 text-xs uppercase tracking-wide text-[#7b7b7b]">Default</p>
            <ElasticSlider
              leftIcon={<VolumeX className="h-4 w-4" />}
              rightIcon={<Volume2 className="h-4 w-4" />}
              startingValue={0}
              value={defaultValue}
              maxValue={100}
              isStepped={false}
              stepSize={1}
              enhancedEffects
              valuePosition="top-center"
              onChange={(next) => setDefaultValue(Math.round(next))}
            />
          </div>

          <div className="rounded-lg border border-[#1f1f1f] bg-[#090909] p-4">
            <p className="mb-3 text-xs uppercase tracking-wide text-[#7b7b7b]">Steps</p>
            <ElasticSlider
              leftIcon={<VolumeX className="h-4 w-4" />}
              rightIcon={<Volume2 className="h-4 w-4" />}
              startingValue={0}
              value={stepsValue}
              maxValue={100}
              isStepped
              stepSize={10}
              enhancedEffects
              valuePosition="top-center"
              onChange={(next) => setStepsValue(Math.round(next))}
            />
          </div>

          <div className="rounded-lg border border-[#1f1f1f] bg-[#090909] p-4">
            <p className="mb-3 text-xs uppercase tracking-wide text-[#7b7b7b]">Custom Values & Icons</p>
            <ElasticSlider
              leftIcon={leftIconOption.icon}
              rightIcon={rightIconOption.icon}
              startingValue={startingValue}
              value={safeValue}
              maxValue={safeMaxValue}
              isStepped={stepped}
              stepSize={stepSize}
              enhancedEffects
              valuePosition={valuePosition}
              onChange={(next) => setValue(Math.round(next))}
            />
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-5">
        <p className="text-xs uppercase tracking-wide text-[#666]">Dependencies</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#2a2a2a] bg-[#090909] px-3 py-1 text-xs text-[#ddd]">
            react
          </span>
          <span className="rounded-full border border-[#2a2a2a] bg-[#090909] px-3 py-1 text-xs text-[#ddd]">
            motion
          </span>
        </div>
      </section>

      <section className="mt-6 grid gap-5 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-6 md:grid-cols-2">
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Value</span>
          <input
            type="number"
            min={startingValue}
            max={safeMaxValue}
            value={Math.round(safeValue)}
            onChange={(event) => setValue(Math.max(startingValue, Math.min(safeMaxValue, Number(event.target.value) || startingValue)))}
            className="w-full appearance-none rounded-lg border border-[#2b2b2b] bg-[#090909] px-3 py-2 text-[#f1f1f1] outline-none transition [appearance:textfield]"
          />
        </label>

        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Starting Value</span>
          <input
            type="number"
            value={startingValue}
            onChange={(event) => setStartingValue(Number(event.target.value) || 0)}
            className="w-full appearance-none rounded-lg border border-[#2b2b2b] bg-[#090909] px-3 py-2 text-[#f1f1f1] outline-none transition [appearance:textfield]"
          />
        </label>

        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Max Value</span>
          <input
            type="number"
            value={maxValue}
            onChange={(event) => setMaxValue(Number(event.target.value) || 1)}
            className="w-full appearance-none rounded-lg border border-[#2b2b2b] bg-[#090909] px-3 py-2 text-[#f1f1f1] outline-none transition [appearance:textfield]"
          />
        </label>

        <div className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Stepped</span>
          <div className="flex items-center gap-2 rounded-xl border border-[#262626] bg-[#060606] p-1">
            {[false, true].map((option) => (
              <button
                key={String(option)}
                type="button"
                onClick={() => setStepped(option)}
                className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium uppercase tracking-wide transition ${
                  stepped === option
                    ? "bg-gradient-to-b from-[#2a2a2a] to-[#161616] text-white"
                    : "text-[#777] hover:bg-[#111] hover:text-[#ddd]"
                }`}
              >
                {option ? "On" : "Off"}
              </button>
            ))}
          </div>
        </div>

        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Step Size</span>
          <input
            type="number"
            min={1}
            max={500}
            value={stepSize}
            onChange={(event) => setStepSize(Math.max(1, Number(event.target.value) || 1))}
            className="w-full appearance-none rounded-lg border border-[#2b2b2b] bg-[#090909] px-3 py-2 text-[#f1f1f1] outline-none transition [appearance:textfield]"
          />
        </label>

        <div className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Value Position</span>
          <select
            value={valuePosition}
            onChange={(event) => setValuePosition(event.target.value as typeof valuePosition)}
            className="w-full rounded-lg border border-[#2b2b2b] bg-[#090909] px-3 py-2 text-[#f1f1f1] outline-none"
          >
            <option value="top-left">Top Left</option>
            <option value="top-center">Top Center</option>
            <option value="top-right">Top Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-center">Bottom Center</option>
            <option value="bottom-right">Bottom Right</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Left Icon</span>
          <div className="flex flex-wrap gap-2">
            {iconOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setLeftIconKey(option.key)}
                className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs transition ${
                  leftIconKey === option.key
                    ? "border-[#4a4a4a] bg-[#1a1a1a] text-white"
                    : "border-[#2a2a2a] bg-[#090909] text-[#8b8b8b] hover:text-[#ddd]"
                }`}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm md:col-span-2">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Right Icon</span>
          <div className="flex flex-wrap gap-2">
            {iconOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setRightIconKey(option.key)}
                className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs transition ${
                  rightIconKey === option.key
                    ? "border-[#4a4a4a] bg-[#1a1a1a] text-white"
                    : "border-[#2a2a2a] bg-[#090909] text-[#8b8b8b] hover:text-[#ddd]"
                }`}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6">
        <div className="rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-5">
          <p className="text-xs uppercase tracking-wide text-[#666]">Package Usage</p>
          <pre className="mt-3 overflow-x-auto rounded-lg border border-[#222] bg-[#070707] p-3 text-xs text-[#bfbfbf]">
            <code>{`sparkle-ui add elastic-slider

import "@chaidev/ui/styles.css"
import { ElasticSlider } from "@chaidev/ui"`}</code>
          </pre>
        </div>
      </section>
    </div>
  )
}
