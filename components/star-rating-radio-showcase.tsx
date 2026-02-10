"use client"

import { useState } from "react"
import { StarRatingRadio } from "@/components/ui/star-rating-radio"

const defaults = {
  max: 5,
  value: 0,
}

export function StarRatingRadioShowcase() {
  const [max, setMax] = useState(defaults.max)
  const [value, setValue] = useState(defaults.value)

  const resetPreview = () => {
    setMax(defaults.max)
    setValue(defaults.value)
  }

  return (
    <div className="text-[#e5e5e5]">
      <h1 className="text-3xl font-semibold tracking-tight">Star Rating Radio</h1>
      <p className="mt-2 text-sm text-[#777]">Animated star rating input with radio behavior.</p>

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
          <StarRatingRadio max={max} value={value} onChange={setValue} />
          <p className="text-xs text-[#8f8f8f]">Selected: {value || "none"}</p>
        </div>
      </section>

      <section className="mt-6 grid gap-5 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-6 md:grid-cols-2">
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Max Stars</span>
          <input
            type="number"
            min={1}
            max={10}
            value={max}
            onChange={(e) => setMax(Math.max(1, Math.min(10, Number(e.target.value) || 5)))}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          />
        </label>
      </section>

      <section className="mt-6 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-5">
        <p className="text-xs uppercase tracking-wide text-[#666]">Dependencies</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#2a2a2a] bg-[#090909] px-3 py-1 text-xs text-[#ddd]">react</span>
          <span className="rounded-full border border-[#2a2a2a] bg-[#090909] px-3 py-1 text-xs text-[#ddd]">
            styled-components
          </span>
        </div>
      </section>
    </div>
  )
}
