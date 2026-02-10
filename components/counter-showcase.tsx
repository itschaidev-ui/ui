"use client"

import { useState } from "react"
import Counter from "@/components/ui/counter"
import { ElasticSlider } from "@/components/ui/elastic-slider"
import { Type, Columns3 } from "lucide-react"

const defaults = {
  value: 0,
  fontSize: 52,
  gap: 10,
  padding: 6,
}

export function CounterShowcase() {
  const [value, setValue] = useState(defaults.value)
  const [fontSize, setFontSize] = useState(defaults.fontSize)
  const [gap, setGap] = useState(defaults.gap)
  const [padding, setPadding] = useState(defaults.padding)

  const resetPreview = () => {
    setValue(defaults.value)
    setFontSize(defaults.fontSize)
    setGap(defaults.gap)
    setPadding(defaults.padding)
  }

  return (
    <div className="text-[#e5e5e5]">
      <h1 className="text-3xl font-semibold tracking-tight">Counter</h1>
      <p className="mt-2 text-sm text-[#777]">Animated rolling counter with customizable digits.</p>

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
        <div className="space-y-4 rounded-xl border border-[#242424] bg-[#050505] p-6">
          <div className="flex justify-center">
            <Counter
              value={value}
              places={[100, 10, 1]}
              fontSize={fontSize}
              padding={padding}
              gap={gap}
              textColor="white"
              fontWeight={900}
              digitPlaceHolders
              gradientFrom="transparent"
              gradientTo="transparent"
            />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-xs text-[#9c9c9c]">
              Value ({value})
              <ElasticSlider
                leftIcon={<Columns3 className="h-3.5 w-3.5" />}
                rightIcon={<Columns3 className="h-3.5 w-3.5" />}
                startingValue={0}
                value={value}
                maxValue={999}
                isStepped
                stepSize={1}
                enhancedEffects
                showValueIndicator={false}
                onChange={(next) => setValue(Math.round(next))}
              />
            </label>
            <label className="text-xs text-[#9c9c9c]">
              Font Size ({fontSize}px)
              <ElasticSlider
                leftIcon={<Type className="h-3.5 w-3.5" />}
                rightIcon={<Type className="h-3.5 w-3.5" />}
                startingValue={24}
                value={fontSize}
                maxValue={90}
                isStepped
                stepSize={1}
                enhancedEffects
                showValueIndicator={false}
                onChange={(next) => setFontSize(Math.round(next))}
              />
            </label>
            <label className="text-xs text-[#9c9c9c]">
              Gap ({gap}px)
              <ElasticSlider
                leftIcon={<Columns3 className="h-3.5 w-3.5" />}
                rightIcon={<Columns3 className="h-3.5 w-3.5" />}
                startingValue={0}
                value={gap}
                maxValue={24}
                isStepped
                stepSize={1}
                enhancedEffects
                showValueIndicator={false}
                onChange={(next) => setGap(Math.round(next))}
              />
            </label>
            <label className="text-xs text-[#9c9c9c]">
              Padding ({padding}px)
              <ElasticSlider
                leftIcon={<Columns3 className="h-3.5 w-3.5" />}
                rightIcon={<Columns3 className="h-3.5 w-3.5" />}
                startingValue={0}
                value={padding}
                maxValue={24}
                isStepped
                stepSize={1}
                enhancedEffects
                showValueIndicator={false}
                onChange={(next) => setPadding(Math.round(next))}
              />
            </label>
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
    </div>
  )
}
