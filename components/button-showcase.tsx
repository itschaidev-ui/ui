"use client"

import { useState } from "react"
import { SparkleButton } from "@/components/ui/sparkle-button"

const variants = [
  { label: "Blue", hue: 210, description: "Default" },
  { label: "Cyan", hue: 185, description: "Cool" },
  { label: "Emerald", hue: 155, description: "Natural" },
  { label: "Amber", hue: 40, description: "Warm" },
  { label: "Rose", hue: 340, description: "Bold" },
  { label: "Violet", hue: 270, description: "Vivid" },
]

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group rounded-xl border border-[#1e1e1e] bg-[#0a0a0a] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1e1e1e]">
        <span className="text-xs font-mono text-[#555]">tsx</span>
        <button
          onClick={handleCopy}
          className="text-xs font-mono text-[#555] hover:text-[#999] transition-colors"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-[#a0a0a0]">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function ButtonShowcase() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5]">
      {/* Header */}
      <header className="border-b border-[#141414]">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#e5e5e5] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#050505]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
            </div>
            <span className="font-semibold tracking-tight text-[#e5e5e5]">sparkle/ui</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#components" className="text-sm text-[#777] hover:text-[#e5e5e5] transition-colors">
              Components
            </a>
            <a href="#usage" className="text-sm text-[#777] hover:text-[#e5e5e5] transition-colors">
              Usage
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#777] hover:text-[#e5e5e5] transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1e1e1e] bg-[#0a0a0a] text-xs text-[#777] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Open Source
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance text-[#f0f0f0] leading-[1.1]">
            Beautiful buttons, crafted with intention.
          </h1>
          <p className="mt-5 text-lg text-[#666] leading-relaxed max-w-lg">
            A collection of premium animated UI components for React. Copy, paste, and make them yours.
          </p>
          <div className="mt-10">
            <SparkleButton text="Get Started" activeText="Loading" hue={210} />
          </div>
        </div>
      </section>

      {/* Variants section */}
      <section id="components" className="max-w-5xl mx-auto px-6 pb-24">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight text-[#f0f0f0]">Sparkle Button</h2>
          <p className="mt-2 text-[#666]">
            An animated button with customizable glow hue, three sizes, and rich interaction states.
          </p>
        </div>

        {/* Color variants grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
          {variants.map((v) => (
            <div
              key={v.label}
              className="flex flex-col items-center gap-4 rounded-2xl border border-[#141414] bg-[#0a0a0a] p-8 transition-colors hover:border-[#1e1e1e]"
            >
              <SparkleButton hue={v.hue} />
              <div className="text-center">
                <p className="text-sm font-medium text-[#ccc]">{v.label}</p>
                <p className="text-xs text-[#555] mt-0.5">
                  {"hue={"}
                  {v.hue}
                  {"}"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Sizes */}
        <div className="mb-16">
          <h3 className="text-lg font-semibold text-[#f0f0f0] mb-6">Sizes</h3>
          <div className="flex flex-wrap items-center gap-6 p-8 rounded-2xl border border-[#141414] bg-[#0a0a0a]">
            <div className="flex flex-col items-center gap-3">
              <SparkleButton size="sm" hue={210} />
              <span className="text-xs text-[#555]">Small</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <SparkleButton size="md" hue={210} />
              <span className="text-xs text-[#555]">Medium</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <SparkleButton size="lg" hue={210} />
              <span className="text-xs text-[#555]">Large</span>
            </div>
          </div>
        </div>

        {/* Custom text */}
        <div className="mb-16">
          <h3 className="text-lg font-semibold text-[#f0f0f0] mb-6">Custom Text</h3>
          <div className="flex flex-wrap items-center gap-6 p-8 rounded-2xl border border-[#141414] bg-[#0a0a0a]">
            <SparkleButton text="Submit" activeText="Submitting" hue={155} />
            <SparkleButton text="Deploy" activeText="Deploying" hue={40} />
            <SparkleButton text="Create" activeText="Creating" hue={340} />
          </div>
        </div>

        {/* Usage */}
        <div id="usage">
          <h3 className="text-lg font-semibold text-[#f0f0f0] mb-6">Usage</h3>
          <div className="space-y-4">
            <CodeBlock
              code={`import { SparkleButton } from "@/components/ui/sparkle-button"

export function MyComponent() {
  return (
    <SparkleButton
      text="Generate"
      activeText="Generating"
      hue={210}
      size="md"
      onClick={() => console.log("clicked")}
    />
  )
}`}
            />

            <CodeBlock
              code={`// Props
interface SparkleButtonProps {
  text?: string       // Button label (default: "Generate")
  activeText?: string // Focus state label (default: "Generating")
  hue?: number        // Glow hue 0-360 (default: 210)
  size?: "sm" | "md" | "lg"
  // ...and all native button attributes
}`}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#141414]">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
          <span className="text-xs text-[#444]">
            Built with care. Inspired by Uiverse.io.
          </span>
          <span className="text-xs text-[#444]">MIT License</span>
        </div>
      </footer>
    </div>
  )
}
