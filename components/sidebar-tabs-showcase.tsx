"use client"

import { useMemo, useState } from "react"
import { BookOpen, Code2, Layers3 } from "lucide-react"
import {
  SidebarTabs,
  type SidebarTabsAnimation,
  type SidebarTabsDensity,
  type SidebarTabsIndicatorAnimation,
  type SidebarTabsNavPosition,
  type SidebarTabsTabStyle,
  type SidebarTabsTextAnimation,
  type SidebarTabsVariant,
} from "@/components/ui/sidebar-tabs"

const defaults = {
  variant: "soft" as SidebarTabsVariant,
  animation: "fade" as SidebarTabsAnimation,
  textAnimation: false,
  expandable: false,
  textAnimationStyle: "slide" as SidebarTabsTextAnimation,
  density: "default" as SidebarTabsDensity,
  tabStyle: "rounded" as SidebarTabsTabStyle,
  navPosition: "left" as SidebarTabsNavPosition,
  hoverLift: false,
  showActiveIndicator: false,
  indicatorAnimation: "none" as SidebarTabsIndicatorAnimation,
  expandedWidth: 220,
  collapsedWidth: 64,
}

export function SidebarTabsShowcase() {
  const [variant, setVariant] = useState<SidebarTabsVariant>(defaults.variant)
  const [animation, setAnimation] = useState<SidebarTabsAnimation>(defaults.animation)
  const [textAnimation, setTextAnimation] = useState(defaults.textAnimation)
  const [expandable, setExpandable] = useState(defaults.expandable)
  const [textAnimationStyle, setTextAnimationStyle] = useState<SidebarTabsTextAnimation>(defaults.textAnimationStyle)
  const [density, setDensity] = useState<SidebarTabsDensity>(defaults.density)
  const [tabStyle, setTabStyle] = useState<SidebarTabsTabStyle>(defaults.tabStyle)
  const [navPosition, setNavPosition] = useState<SidebarTabsNavPosition>(defaults.navPosition)
  const [hoverLift, setHoverLift] = useState(defaults.hoverLift)
  const [showActiveIndicator, setShowActiveIndicator] = useState(defaults.showActiveIndicator)
  const [indicatorAnimation, setIndicatorAnimation] = useState<SidebarTabsIndicatorAnimation>(defaults.indicatorAnimation)
  const [expandedWidth, setExpandedWidth] = useState(defaults.expandedWidth)
  const [collapsedWidth, setCollapsedWidth] = useState(defaults.collapsedWidth)

  const items = useMemo(
    () => [
      {
        value: "overview",
        label: "Overview",
        shortLabel: "O",
        icon: <BookOpen className="h-4 w-4" />,
        badge: "new",
        content: (
          <div>
            <p className="text-lg font-semibold text-[#f2f2f2]">Overview</p>
            <p className="mt-2 text-sm text-[#a0a0a0]">
              Sidebar-style tabs with variant, panel animation, text animation, and optional expand/collapse nav.
            </p>
          </div>
        ),
      },
      {
        value: "api",
        label: "API",
        shortLabel: "A",
        icon: <Code2 className="h-4 w-4" />,
        badge: 4,
        content: (
          <div>
            <p className="text-lg font-semibold text-[#f2f2f2]">API</p>
            <p className="mt-2 text-sm text-[#a0a0a0]">
              Use `items`, `variant`, `animation`, `textAnimation`, and `expandable` for behavior and style.
            </p>
          </div>
        ),
      },
      {
        value: "examples",
        label: "Examples",
        shortLabel: "E",
        icon: <Layers3 className="h-4 w-4" />,
        content: (
          <div>
            <p className="text-lg font-semibold text-[#f2f2f2]">Examples</p>
            <p className="mt-2 text-sm text-[#a0a0a0]">
              Great for docs, dashboards, settings panes, and multi-section forms.
            </p>
          </div>
        ),
      },
    ],
    [],
  )

  const resetPreview = () => {
    setVariant(defaults.variant)
    setAnimation(defaults.animation)
    setTextAnimation(defaults.textAnimation)
    setExpandable(defaults.expandable)
    setTextAnimationStyle(defaults.textAnimationStyle)
    setDensity(defaults.density)
    setTabStyle(defaults.tabStyle)
    setNavPosition(defaults.navPosition)
    setHoverLift(defaults.hoverLift)
    setShowActiveIndicator(defaults.showActiveIndicator)
    setIndicatorAnimation(defaults.indicatorAnimation)
    setExpandedWidth(defaults.expandedWidth)
    setCollapsedWidth(defaults.collapsedWidth)
  }

  return (
    <div className="text-[#e5e5e5]">
      <h1 className="text-3xl font-semibold tracking-tight">Sidebar Tabs</h1>
      <p className="mt-2 text-sm text-[#777]">Tabs with sidebar navigation, multiple styles, and toggleable animations.</p>

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
          <SidebarTabs
            items={items}
            variant={variant}
            animation={animation}
            textAnimation={textAnimation}
            expandable={expandable}
            textAnimationStyle={textAnimationStyle}
            density={density}
            tabStyle={tabStyle}
            navPosition={navPosition}
            hoverLift={hoverLift}
            showActiveIndicator={showActiveIndicator}
            indicatorAnimation={indicatorAnimation}
            expandedWidth={expandedWidth}
            collapsedWidth={collapsedWidth}
          />
        </div>
      </section>

      <section className="mt-6 grid gap-5 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-6 md:grid-cols-2">
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Variant Type</span>
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as SidebarTabsVariant)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            <option value="soft">Soft</option>
            <option value="outline">Outline</option>
            <option value="solid">Solid</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Panel Animation Style</span>
          <select
            value={animation}
            onChange={(e) => setAnimation(e.target.value as SidebarTabsAnimation)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            <option value="none">None</option>
            <option value="fade">Fade</option>
            <option value="slide">Slide</option>
            <option value="pop">Pop</option>
            <option value="zoom">Zoom</option>
            <option value="blur">Blur</option>
            <option value="flip">Flip</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Text Animation Style</span>
          <select
            value={textAnimationStyle}
            onChange={(e) => setTextAnimationStyle(e.target.value as SidebarTabsTextAnimation)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            <option value="slide">Slide</option>
            <option value="pulse">Pulse</option>
            <option value="wave">Wave</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Density</span>
          <select
            value={density}
            onChange={(e) => setDensity(e.target.value as SidebarTabsDensity)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            <option value="compact">Compact</option>
            <option value="default">Default</option>
            <option value="comfortable">Comfortable</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Tab Style</span>
          <select
            value={tabStyle}
            onChange={(e) => setTabStyle(e.target.value as SidebarTabsTabStyle)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            <option value="rounded">Rounded</option>
            <option value="pill">Pill</option>
            <option value="underline">Underline</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Nav Position</span>
          <select
            value={navPosition}
            onChange={(e) => setNavPosition(e.target.value as SidebarTabsNavPosition)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Indicator Animation</span>
          <select
            value={indicatorAnimation}
            onChange={(e) => setIndicatorAnimation(e.target.value as SidebarTabsIndicatorAnimation)}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          >
            <option value="none">None</option>
            <option value="glow">Glow</option>
            <option value="pulse">Pulse</option>
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={textAnimation} onChange={(e) => setTextAnimation(e.target.checked)} />
          Text Animation (toggleable)
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={expandable} onChange={(e) => setExpandable(e.target.checked)} />
          Expandable Sidebar (toggleable)
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={hoverLift} onChange={(e) => setHoverLift(e.target.checked)} />
          Hover Lift
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input
            type="checkbox"
            checked={showActiveIndicator}
            onChange={(e) => setShowActiveIndicator(e.target.checked)}
          />
          Active Indicator
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Expanded Width ({expandedWidth}px)</span>
          <input
            type="number"
            min={180}
            max={360}
            value={expandedWidth}
            onChange={(e) => setExpandedWidth(Math.max(180, Math.min(360, Number(e.target.value) || 220)))}
            className="rounded-xl border border-[#2a2a2a] bg-[#050505] px-3 py-2.5 text-[#f1f1f1] outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <span className="text-xs uppercase tracking-wide text-[#7e7e7e]">Collapsed Width ({collapsedWidth}px)</span>
          <input
            type="number"
            min={52}
            max={120}
            value={collapsedWidth}
            onChange={(e) => setCollapsedWidth(Math.max(52, Math.min(120, Number(e.target.value) || 64)))}
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
import { SidebarTabs } from "@chaidev/ui"`}</code>
        </pre>
      </section>
    </div>
  )
}
