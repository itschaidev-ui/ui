"use client"

import { useMemo, useState } from "react"
import { AccordionPro, type AccordionAnimation } from "@/components/ui/accordion-pro"

const defaults = {
  allowMultiple: false,
  collapsible: true,
  animation: "none" as AccordionAnimation,
  bordered: false,
}

export function AccordionShowcase() {
  const [allowMultiple, setAllowMultiple] = useState(defaults.allowMultiple)
  const [collapsible, setCollapsible] = useState(defaults.collapsible)
  const [animation, setAnimation] = useState<AccordionAnimation>(defaults.animation)
  const [bordered, setBordered] = useState(defaults.bordered)
  const [resetSeed, setResetSeed] = useState(0)

  const items = useMemo(
    () => [
      {
        value: "a1",
        title: "What is included in the package?",
        content:
          "The package includes animated UI primitives like SparkleButton, ElasticSlider, SegmentedControl, Counter, Badge, and more.",
      },
      {
        value: "a2",
        title: "Does this work with Next.js and React?",
        content:
          "Yes. It works in React apps and Next.js apps. Import the component and include the package styles once in your app.",
      },
      {
        value: "a3",
        title: "Can I customize each component?",
        content:
          "Yes. Components expose props for style, behavior, and states. Advanced options are available and default to simple off states.",
      },
    ],
    [],
  )

  const resetPreview = () => {
    setAllowMultiple(defaults.allowMultiple)
    setCollapsible(defaults.collapsible)
    setAnimation(defaults.animation)
    setBordered(defaults.bordered)
    setResetSeed((value) => value + 1)
  }

  return (
    <div className="text-[#e5e5e5]">
      <h1 className="text-3xl font-semibold tracking-tight">Accordion</h1>
      <p className="mt-2 text-sm text-[#777]">Stacked content sections with optional animation and multi-open mode.</p>

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
        <div className="rounded-xl border border-[#242424] bg-[#050505] p-5">
          <AccordionPro
            key={`${allowMultiple}-${collapsible}-${animation}-${bordered}-${resetSeed}`}
            items={items}
            allowMultiple={allowMultiple}
            collapsible={collapsible}
            animation={animation}
            bordered={bordered}
            defaultValue={allowMultiple ? ["a1"] : "a1"}
          />
        </div>
      </section>

      <section className="mt-6 grid gap-5 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-6 md:grid-cols-2">
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={allowMultiple} onChange={(e) => setAllowMultiple(e.target.checked)} />
          Allow Multiple Open (default off)
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={collapsible} onChange={(e) => setCollapsible(e.target.checked)} />
          Collapsible (default on)
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Animation</span>
          <select
            value={animation}
            onChange={(e) => setAnimation(e.target.value as AccordionAnimation)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            <option value="none">None (default)</option>
            <option value="smooth">Smooth</option>
            <option value="fade">Fade</option>
            <option value="pop">Pop</option>
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={bordered} onChange={(e) => setBordered(e.target.checked)} />
          Bordered (default off)
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
          <code>{`sparkle-ui add accordion

import "@chaidev/ui/styles.css"
import { Accordion } from "@chaidev/ui"`}</code>
        </pre>
      </section>
    </div>
  )
}
