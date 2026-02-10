"use client"

import { useState } from "react"
import {
  AvatarPro,
  type AvatarAnimation,
  type AvatarExpandContentMode,
  type AvatarShape,
  type AvatarSize,
  type AvatarStatus,
} from "@/components/ui/avatar-pro"

const defaults = {
  src: "https://i.pravatar.cc/120?img=15",
  alt: "Chai Dev",
  fallback: "CD",
  size: "md" as AvatarSize,
  shape: "circle" as AvatarShape,
  showRing: false,
  showStatus: false,
  status: "online" as AvatarStatus,
  animation: "none" as AvatarAnimation,
  expandable: false,
  contentMode: "text" as AvatarExpandContentMode,
  expandedTitle: "Chai Dev",
  expandedDescription: "Open source UI engineer",
  expandedImageSrc: "https://i.pravatar.cc/360?img=49",
  expandedButtonLabel: "Follow",
}

export function AvatarShowcase() {
  const [src, setSrc] = useState(defaults.src)
  const [alt, setAlt] = useState(defaults.alt)
  const [fallback, setFallback] = useState(defaults.fallback)
  const [size, setSize] = useState<AvatarSize>(defaults.size)
  const [shape, setShape] = useState<AvatarShape>(defaults.shape)
  const [showRing, setShowRing] = useState(defaults.showRing)
  const [showStatus, setShowStatus] = useState(defaults.showStatus)
  const [status, setStatus] = useState<AvatarStatus>(defaults.status)
  const [animation, setAnimation] = useState<AvatarAnimation>(defaults.animation)
  const [expandable, setExpandable] = useState(defaults.expandable)
  const [contentMode, setContentMode] = useState<AvatarExpandContentMode>(defaults.contentMode)
  const [expandedTitle, setExpandedTitle] = useState(defaults.expandedTitle)
  const [expandedDescription, setExpandedDescription] = useState(defaults.expandedDescription)
  const [expandedImageSrc, setExpandedImageSrc] = useState(defaults.expandedImageSrc)
  const [expandedButtonLabel, setExpandedButtonLabel] = useState(defaults.expandedButtonLabel)

  const resetPreview = () => {
    setSrc(defaults.src)
    setAlt(defaults.alt)
    setFallback(defaults.fallback)
    setSize(defaults.size)
    setShape(defaults.shape)
    setShowRing(defaults.showRing)
    setShowStatus(defaults.showStatus)
    setStatus(defaults.status)
    setAnimation(defaults.animation)
    setExpandable(defaults.expandable)
    setContentMode(defaults.contentMode)
    setExpandedTitle(defaults.expandedTitle)
    setExpandedDescription(defaults.expandedDescription)
    setExpandedImageSrc(defaults.expandedImageSrc)
    setExpandedButtonLabel(defaults.expandedButtonLabel)
  }

  return (
    <div className="text-[#e5e5e5]">
      <h1 className="text-3xl font-semibold tracking-tight">Avatar</h1>
      <p className="mt-2 text-sm text-[#777]">Simple profile avatar with optional ring and status.</p>

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
        <div className="flex min-h-40 items-center justify-center rounded-xl border border-[#242424] bg-[#050505] p-8">
          <AvatarPro
            src={src}
            alt={alt}
            fallback={fallback}
            size={size}
            shape={shape}
            showRing={showRing}
            showStatus={showStatus}
            status={status}
            animation={animation}
            expandable={expandable}
            contentMode={contentMode}
            expandedTitle={expandedTitle}
            expandedDescription={expandedDescription}
            expandedImageSrc={expandedImageSrc}
            expandedButtonLabel={expandedButtonLabel}
          />
        </div>
      </section>

      <section className="mt-6 grid gap-5 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-6 md:grid-cols-2">
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Image URL</span>
          <input
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Fallback</span>
          <input
            value={fallback}
            onChange={(e) => setFallback(e.target.value)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Alt Text</span>
          <input
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Size</span>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as AvatarSize)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Shape</span>
          <select
            value={shape}
            onChange={(e) => setShape(e.target.value as AvatarShape)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            <option value="circle">Circle</option>
            <option value="rounded">Rounded</option>
            <option value="square">Square</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as AvatarStatus)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            <option value="online">Online</option>
            <option value="away">Away</option>
            <option value="busy">Busy</option>
            <option value="offline">Offline</option>
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={showRing} onChange={(e) => setShowRing(e.target.checked)} />
          Show Ring (default off)
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={showStatus} onChange={(e) => setShowStatus(e.target.checked)} />
          Show Status (default off)
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={expandable} onChange={(e) => setExpandable(e.target.checked)} />
          Expand On Hover (default off)
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm md:col-span-2">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Animation</span>
          <select
            value={animation}
            onChange={(e) => setAnimation(e.target.value as AvatarAnimation)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            <option value="none">None (default)</option>
            <option value="pulse">Pulse</option>
            <option value="float">Float</option>
            <option value="glow">Glow</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Expanded Content Mode</span>
          <select
            value={contentMode}
            onChange={(e) => setContentMode(e.target.value as AvatarExpandContentMode)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="button">Button</option>
            <option value="custom">Custom</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Expanded Title</span>
          <input
            value={expandedTitle}
            onChange={(e) => setExpandedTitle(e.target.value)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm md:col-span-2">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Expanded Description</span>
          <input
            value={expandedDescription}
            onChange={(e) => setExpandedDescription(e.target.value)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm md:col-span-2">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Expanded Image URL</span>
          <input
            value={expandedImageSrc}
            onChange={(e) => setExpandedImageSrc(e.target.value)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Expanded Button Label</span>
          <input
            value={expandedButtonLabel}
            onChange={(e) => setExpandedButtonLabel(e.target.value)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
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

      <section className="mt-6 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-5">
        <p className="text-xs uppercase tracking-wide text-[#666]">Package Usage</p>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-[#222] bg-[#070707] p-3 text-xs text-[#bfbfbf]">
          <code>{`npm i @chaidev/ui

import "@chaidev/ui/styles.css"
import { Avatar } from "@chaidev/ui"`}</code>
        </pre>
      </section>
    </div>
  )
}
