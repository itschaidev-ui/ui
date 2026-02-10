"use client"

import { useMemo, useState } from "react"
import { Github, Instagram, Linkedin, Twitch, Twitter, Youtube } from "lucide-react"
import {
  DEFAULT_SOCIAL_MEDIA_PRESETS,
  SOCIAL_SWEEP_EASING_PRESETS,
  SocialMediaButton,
  type SocialMediaPresetName,
  type SocialSweepEasingPreset,
} from "@/components/ui/social-media-button"

type PlatformKey = Exclude<SocialMediaPresetName, "custom">

const defaults = {
  platform: "github" as PlatformKey,
  count: 6,
  showCount: true,
  showSweep: true,
  showGitHubStar: true,
  sweepEasingPreset: "dramatic" as SocialSweepEasingPreset,
  sweepDurationMs: 980,
}

export function SocialMediaButtonShowcase() {
  const [platform, setPlatform] = useState<PlatformKey>(defaults.platform)
  const [label, setLabel] = useState(DEFAULT_SOCIAL_MEDIA_PRESETS[defaults.platform].label)
  const [href, setHref] = useState(DEFAULT_SOCIAL_MEDIA_PRESETS[defaults.platform].href)
  const [color, setColor] = useState(DEFAULT_SOCIAL_MEDIA_PRESETS[defaults.platform].accentColor)
  const [count, setCount] = useState(defaults.count)
  const [showCount, setShowCount] = useState(defaults.showCount)
  const [showSweep, setShowSweep] = useState(defaults.showSweep)
  const [showGitHubStar, setShowGitHubStar] = useState(defaults.showGitHubStar)
  const [sweepEasingPreset, setSweepEasingPreset] = useState<SocialSweepEasingPreset>(defaults.sweepEasingPreset)
  const [sweepDurationMs, setSweepDurationMs] = useState(defaults.sweepDurationMs)

  const iconMap = useMemo(
    () => ({
      github: <Github className="h-4 w-4" />,
      twitter: <Twitter className="h-4 w-4" />,
      instagram: <Instagram className="h-4 w-4" />,
      linkedin: <Linkedin className="h-4 w-4" />,
      youtube: <Youtube className="h-4 w-4" />,
      twitch: <Twitch className="h-4 w-4" />,
    }),
    [],
  )

  const applyPlatformPreset = (nextPlatform: PlatformKey) => {
    setPlatform(nextPlatform)
    setLabel(DEFAULT_SOCIAL_MEDIA_PRESETS[nextPlatform].label)
    setHref(DEFAULT_SOCIAL_MEDIA_PRESETS[nextPlatform].href)
    setColor(DEFAULT_SOCIAL_MEDIA_PRESETS[nextPlatform].accentColor)
    setShowCount(DEFAULT_SOCIAL_MEDIA_PRESETS[nextPlatform].showCount ?? false)
    setShowGitHubStar(DEFAULT_SOCIAL_MEDIA_PRESETS[nextPlatform].showGitHubStar ?? false)
    setSweepEasingPreset(DEFAULT_SOCIAL_MEDIA_PRESETS[nextPlatform].sweepEasingPreset ?? "smooth")
    setSweepDurationMs(DEFAULT_SOCIAL_MEDIA_PRESETS[nextPlatform].sweepDurationMs ?? 1000)
  }

  const resetPreview = () => {
    applyPlatformPreset(defaults.platform)
    setCount(defaults.count)
    setShowCount(defaults.showCount)
    setShowSweep(defaults.showSweep)
    setShowGitHubStar(defaults.showGitHubStar)
    setSweepEasingPreset(defaults.sweepEasingPreset)
    setSweepDurationMs(defaults.sweepDurationMs)
  }

  return (
    <div className="text-[#e5e5e5]">
      <h1 className="text-3xl font-semibold tracking-tight">Social Media Button</h1>
      <p className="mt-2 text-sm text-[#777]">Custom social CTA with editable icon, color, count, and sweep effect.</p>

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
          <SocialMediaButton
            preset={platform}
            presets={{
              [platform]: {
                label,
                href,
                accentColor: color,
                showCount,
                showGitHubStar,
                sweepEasingPreset,
                sweepDurationMs,
              },
            }}
            icon={iconMap[platform]}
            showSweep={showSweep}
            count={count}
          />
        </div>
      </section>

      <section className="mt-6 grid gap-5 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-6 md:grid-cols-2">
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Platform Icon</span>
          <select
            value={platform}
            onChange={(e) => applyPlatformPreset(e.target.value as PlatformKey)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            <option value="github">GitHub</option>
            <option value="twitter">X / Twitter</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="youtube">YouTube</option>
            <option value="twitch">Twitch</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Color</span>
          <div className="flex items-center gap-2">
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-14 rounded border border-[#2a2a2a] bg-transparent p-1" />
            <input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex-1 rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
            />
          </div>
        </label>

        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Label</span>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          />
        </label>

        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Count</span>
          <input
            type="number"
            min={0}
            value={count}
            onChange={(e) => setCount(Math.max(0, Number(e.target.value) || 0))}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          />
        </label>

        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm md:col-span-2">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Href</span>
          <input
            value={href}
            onChange={(e) => setHref(e.target.value)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          />
        </label>

        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={showCount} onChange={(e) => setShowCount(e.target.checked)} />
          Show Count
        </label>

        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={showSweep} onChange={(e) => setShowSweep(e.target.checked)} />
          Sweep Effect
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Sweep Easing Preset</span>
          <select
            value={sweepEasingPreset}
            onChange={(e) => setSweepEasingPreset(e.target.value as SocialSweepEasingPreset)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            {Object.keys(SOCIAL_SWEEP_EASING_PRESETS).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Sweep Duration ({sweepDurationMs}ms)</span>
          <input
            type="number"
            min={300}
            max={2200}
            step={20}
            value={sweepDurationMs}
            onChange={(e) => setSweepDurationMs(Math.max(300, Math.min(2200, Number(e.target.value) || 1000)))}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          />
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm md:col-span-2">
          <input
            type="checkbox"
            checked={showGitHubStar}
            onChange={(e) => setShowGitHubStar(e.target.checked)}
          />
          GitHub Star Icon (preset override)
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
import { SocialMediaButton } from "@chaidev/ui"`}</code>
        </pre>
      </section>
    </div>
  )
}
