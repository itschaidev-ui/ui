"use client"

import Link from "next/link"
import { useMemo, useState, type ReactNode } from "react"
import { useTheme } from "next-themes"
import { ButtonShowcase } from "@/components/button-showcase"
import { BadgeShowcase } from "@/components/badge-showcase"
import { CounterShowcase } from "@/components/counter-showcase"
import { ElasticSliderShowcase } from "@/components/elastic-slider-showcase"
import { SegmentedControlShowcase } from "@/components/segmented-control-showcase"
import { AvatarShowcase } from "@/components/avatar-showcase"
import { AccordionShowcase } from "@/components/accordion-showcase"
import { SidebarTabsShowcase } from "@/components/sidebar-tabs-showcase"
import { SocialMediaButtonShowcase } from "@/components/social-media-button-showcase"
import { PillButtonShowcase } from "@/components/pill-button-showcase"
import { MessageSendButtonShowcase } from "@/components/message-send-button-showcase"
import { StarRatingRadioShowcase } from "@/components/star-rating-radio-showcase"
import { LockSwitchShowcase } from "@/components/lock-switch-showcase"
import { OAuthFormShowcase } from "@/components/oauth-form-showcase"
import { HoverTooltipCardShowcase } from "@/components/hover-tooltip-card-showcase"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type ComponentItem = {
  id: string
  name: string
  category: string
  description: string
  ready: boolean
}

type ComponentDoc = {
  summary: string
  install: string
  importCode: string
  usage: string
  useCases: string[]
}

const componentItems: ComponentItem[] = [
  {
    id: "sparkle-button",
    name: "Sparkle Button",
    category: "Buttons",
    description: "Animated CTA button with hover/loading text states and glow hue.",
    ready: true,
  },
  {
    id: "social-media-button",
    name: "Social Media Button",
    category: "Buttons",
    description: "Social CTA button with customizable icon and accent color.",
    ready: true,
  },
  {
    id: "pill-button",
    name: "Pill Button",
    category: "Buttons",
    description: "Retro 3D-style pill button built with styled-components.",
    ready: true,
  },
  {
    id: "message-send-button",
    name: "Message Send Button",
    category: "Buttons",
    description: "Glass-style send button with optional text and icon.",
    ready: true,
  },
  {
    id: "oauth-form",
    name: "OAuth Form",
    category: "Forms",
    description: "Styled sign-in form with OAuth actions and email submit.",
    ready: true,
  },
  {
    id: "hover-tooltip-card",
    name: "Hover Tooltip Card",
    category: "Data Display",
    description: "Interactive tooltip card with flip/reveal hover animation.",
    ready: true,
  },
  {
    id: "star-rating-radio",
    name: "Star Rating Radio",
    category: "Inputs",
    description: "Animated star rating radio with selectable score.",
    ready: true,
  },
  {
    id: "lock-switch",
    name: "Lock Switch",
    category: "Inputs",
    description: "Playful lock/unlock switch with icon states.",
    ready: true,
  },
  {
    id: "elastic-slider",
    name: "Elastic Slider",
    category: "Inputs",
    description: "Elastic slider with spring overflow and icon endpoints.",
    ready: true,
  },
  {
    id: "segmented-control",
    name: "Segmented Control",
    category: "Inputs",
    description: "Stylish segmented picker with keyboard arrow support.",
    ready: true,
  },
  {
    id: "counter",
    name: "Counter",
    category: "Data Display",
    description: "Animated rolling number counter.",
    ready: true,
  },
  {
    id: "badge",
    name: "Badge",
    category: "Data Display",
    description: "Compact status/label element for metadata.",
    ready: true,
  },
  {
    id: "avatar",
    name: "Avatar",
    category: "Data Display",
    description: "Profile avatar with optional status and ring accents.",
    ready: true,
  },
  {
    id: "sidebar-tabs",
    name: "Sidebar Tabs",
    category: "Navigation",
    description: "Sidebar-style tabs with variants, panel animation, and expandable nav.",
    ready: true,
  },
  {
    id: "accordion",
    name: "Accordion",
    category: "Layout",
    description: "Expandable content sections with simple defaults.",
    ready: true,
  },
]

const componentDocs: Record<string, ComponentDoc> = {
  "sparkle-button": {
    summary: "Call-to-action button with sparkle effects, optional hover text, and loading-state transitions.",
    install: "sparkle-ui add sparkle-button",
    importCode: "import { SparkleButton } from '@chaidev/ui'",
    usage: "<SparkleButton>Get Started</SparkleButton>",
    useCases: ["Primary hero CTA", "Upgrade / subscribe actions", "Async submit with rich feedback"],
  },
  "social-media-button": {
    summary: "Preset-driven social CTA button with sweep effects, star/count support, and easing controls.",
    install: "sparkle-ui add social-media-button",
    importCode: "import { SocialMediaButton } from '@chaidev/ui'",
    usage: "<SocialMediaButton preset='github' href='https://github.com/your/repo' />",
    useCases: ["GitHub star prompts", "Share/follow actions", "Footer social links with visual emphasis"],
  },
  "pill-button": {
    summary: "Retro-styled, tactile button built with styled-components.",
    install: "sparkle-ui add pill-button",
    importCode: "import { PillButton } from '@chaidev/ui'",
    usage: "<PillButton label='Continue' />",
    useCases: ["Playful CTAs", "Gamified onboarding", "Marketing micro-interactions"],
  },
  "message-send-button": {
    summary: "Animated send button with a sent confirmation state and character-level motion.",
    install: "sparkle-ui add message-send-button",
    importCode: "import { MessageSendButton } from '@chaidev/ui'",
    usage: "<MessageSendButton defaultText='Send' sentText='Sent!' />",
    useCases: ["Chat inputs", "Feedback forms", "Message composer actions"],
  },
  "star-rating-radio": {
    summary: "Animated star rating input with radio semantics and keyboard accessibility.",
    install: "sparkle-ui add star-rating-radio",
    importCode: "import { StarRatingRadio } from '@chaidev/ui'",
    usage: "<StarRatingRadio max={5} value={rating} onChange={setRating} />",
    useCases: ["Review forms", "Post-purchase feedback", "Service quality scoring"],
  },
  "oauth-form": {
    summary: "Auth-style form component with OAuth buttons and email continue action.",
    install: "sparkle-ui add oauth-form",
    importCode: "import { OAuthForm } from '@chaidev/ui'",
    usage: "<OAuthForm onContinue={(email) => console.log(email)} />",
    useCases: ["Login landing cards", "Sign-in modals", "Fast auth prototypes"],
  },
  "hover-tooltip-card": {
    summary: "Animated tooltip card with floating hint and side reveal text on hover.",
    install: "sparkle-ui add hover-tooltip-card",
    importCode: "import { HoverTooltipCard } from '@chaidev/ui'",
    usage: "<HoverTooltipCard tooltipText='Docs' frontText='Hover me' revealText='Hello!' />",
    useCases: ["Feature callouts", "Interactive labels", "Playful onboarding hints"],
  },
  "lock-switch": {
    summary: "Lock/unlock toggle with icon states, size/tone presets, and custom color controls.",
    install: "sparkle-ui add lock-switch",
    importCode: "import { LockSwitch } from '@chaidev/ui'",
    usage: "<LockSwitch defaultChecked showStateLabel />",
    useCases: ["Privacy toggles", "Security setting switches", "Feature lock indicators"],
  },
  "elastic-slider": {
    summary: "Slider with elastic overflow behavior and optional enhanced motion effects.",
    install: "sparkle-ui add elastic-slider",
    importCode: "import { ElasticSlider } from '@chaidev/ui'",
    usage: "<ElasticSlider value={value} onChange={setValue} />",
    useCases: ["Audio/video controls", "Price/filter ranges", "Interactive tool settings"],
  },
  "segmented-control": {
    summary: "Custom segmented selector with keyboard support and optional draggable interaction.",
    install: "sparkle-ui add segmented-control",
    importCode: "import { SegmentedControl } from '@chaidev/ui'",
    usage: "<SegmentedControl options={options} value={value} onChange={setValue} />",
    useCases: ["View mode toggles", "Pricing period switch", "Filtering tabs"],
  },
  counter: {
    summary: "Animated number display that rolls smoothly between values.",
    install: "sparkle-ui add counter",
    importCode: "import { Counter } from '@chaidev/ui'",
    usage: "<Counter value={12450} />",
    useCases: ["KPI dashboards", "Follower/download metrics", "Live stat highlights"],
  },
  badge: {
    summary: "Flexible status badge with tones, appearances, sizes, and optional animations.",
    install: "sparkle-ui add badge",
    importCode: "import { Badge } from '@chaidev/ui'",
    usage: "<Badge tone='success'>Active</Badge>",
    useCases: ["Status indicators", "Feature labels", "Metadata chips"],
  },
  avatar: {
    summary: "Avatar with status/ring support and optional expandable hover-card content.",
    install: "sparkle-ui add avatar",
    importCode: "import { Avatar } from '@chaidev/ui'",
    usage: "<Avatar src='/user.png' alt='User' expandable />",
    useCases: ["Profile blocks", "Team/member lists", "User presence displays"],
  },
  "sidebar-tabs": {
    summary: "Sidebar navigation tabs with style variants, animation modes, and collapsible behavior.",
    install: "sparkle-ui add sidebar-tabs",
    importCode: "import { SidebarTabs } from '@chaidev/ui'",
    usage: "<SidebarTabs items={items} activeId={active} onChange={setActive} />",
    useCases: ["Settings dashboards", "Admin panels", "Docs/application side navigation"],
  },
  accordion: {
    summary: "Expandable content sections with animation presets and collapsible item behavior.",
    install: "sparkle-ui add accordion",
    importCode: "import { Accordion } from '@chaidev/ui'",
    usage: "<Accordion items={items} animation='smooth' collapsible />",
    useCases: ["FAQs", "Settings groups", "Dense content disclosure"],
  },
}

const ESSENTIAL_PACK_COMPONENT_IDS = new Set([
  "sparkle-button",
  "social-media-button",
  "message-send-button",
  "badge",
  "sidebar-tabs",
  "accordion",
  "star-rating-radio",
])

function ComponentDocumentation({ item, isLight }: { item: ComponentItem; isLight: boolean }) {
  const doc = componentDocs[item.id]
  if (!doc) return null
  const isInEssentialPack = ESSENTIAL_PACK_COMPONENT_IDS.has(item.id)

  return (
    <section
      className={`mb-6 rounded-2xl border p-5 md:p-6 ${
        isLight ? "border-black/10 bg-white/55" : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1
            className={`text-3xl tracking-tight ${isLight ? "text-black/85" : "text-white/95"}`}
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {item.name}
          </h1>
          <p className={`mt-2 max-w-3xl text-sm ${isLight ? "text-black/55" : "text-white/62"}`}>{doc.summary}</p>
          {isInEssentialPack && (
            <Badge
              variant="outline"
              className={
                isLight
                  ? "mt-3 border-emerald-500/25 bg-emerald-500/10 text-emerald-700"
                  : "mt-3 border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
              }
            >
              Included in Essential Pack
            </Badge>
          )}
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs ${
            isLight ? "border-black/15 bg-white/70 text-black/65" : "border-white/15 bg-white/[0.06] text-white/75"
          }`}
        >
          {item.category}
        </span>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className={`rounded-xl border p-4 ${isLight ? "border-black/10 bg-white/65" : "border-white/10 bg-white/[0.03]"}`}>
          <p className={`mb-2 text-xs uppercase tracking-wide ${isLight ? "text-black/45" : "text-white/45"}`}>Install</p>
          <pre
            className={`overflow-x-auto rounded-lg border p-3 text-xs ${
              isLight ? "border-black/10 bg-black/[0.03] text-black/80" : "border-white/10 bg-black/40 text-white/85"
            }`}
          >
            <code>{doc.install}</code>
          </pre>
        </div>
        <div className={`rounded-xl border p-4 ${isLight ? "border-black/10 bg-white/65" : "border-white/10 bg-white/[0.03]"}`}>
          <p className={`mb-2 text-xs uppercase tracking-wide ${isLight ? "text-black/45" : "text-white/45"}`}>Import</p>
          <pre
            className={`overflow-x-auto rounded-lg border p-3 text-xs ${
              isLight ? "border-black/10 bg-black/[0.03] text-black/80" : "border-white/10 bg-black/40 text-white/85"
            }`}
          >
            <code>{doc.importCode}</code>
          </pre>
        </div>
      </div>

      <div className={`mt-4 rounded-xl border p-4 ${isLight ? "border-black/10 bg-white/65" : "border-white/10 bg-white/[0.03]"}`}>
        <p className={`mb-2 text-xs uppercase tracking-wide ${isLight ? "text-black/45" : "text-white/45"}`}>Usage</p>
        <pre
          className={`overflow-x-auto rounded-lg border p-3 text-xs ${
            isLight ? "border-black/10 bg-black/[0.03] text-black/80" : "border-white/10 bg-black/40 text-white/85"
          }`}
        >
          <code>{doc.usage}</code>
        </pre>
      </div>

      <div className={`mt-4 rounded-xl border p-4 ${isLight ? "border-black/10 bg-white/65" : "border-white/10 bg-white/[0.03]"}`}>
        <p className={`mb-2 text-xs uppercase tracking-wide ${isLight ? "text-black/45" : "text-white/45"}`}>Use Cases</p>
        <ul className={`space-y-2 text-sm ${isLight ? "text-black/78" : "text-white/82"}`}>
          {doc.useCases.map((useCase) => (
            <li
              key={useCase}
              className={`rounded-lg border px-3 py-2 ${
                isLight ? "border-black/10 bg-black/[0.03]" : "border-white/10 bg-black/25"
              }`}
            >
              {useCase}
            </li>
          ))}
        </ul>
        {isInEssentialPack && (
          <Button
            asChild
            size="sm"
            variant="outline"
            className={isLight ? "mt-4 border-black/15 bg-white/80 hover:bg-white" : "mt-4 border-white/20 bg-black/40 hover:bg-white/10"}
          >
            <Link href="/store/essentialspack">Go to Essential Pack</Link>
          </Button>
        )}
      </div>
    </section>
  )
}

function renderShowcase(id: string): ReactNode {
  if (id === "sparkle-button") return <ButtonShowcase />
  if (id === "elastic-slider") return <ElasticSliderShowcase />
  if (id === "social-media-button") return <SocialMediaButtonShowcase />
  if (id === "pill-button") return <PillButtonShowcase />
  if (id === "message-send-button") return <MessageSendButtonShowcase />
  if (id === "oauth-form") return <OAuthFormShowcase />
  if (id === "hover-tooltip-card") return <HoverTooltipCardShowcase />
  if (id === "star-rating-radio") return <StarRatingRadioShowcase />
  if (id === "lock-switch") return <LockSwitchShowcase />
  if (id === "segmented-control") return <SegmentedControlShowcase />
  if (id === "counter") return <CounterShowcase />
  if (id === "badge") return <BadgeShowcase />
  if (id === "avatar") return <AvatarShowcase />
  if (id === "sidebar-tabs") return <SidebarTabsShowcase />
  if (id === "accordion") return <AccordionShowcase />
  return null
}

export function ComponentsDocs() {
  const [selected, setSelected] = useState<string>("index")
  const { resolvedTheme } = useTheme()
  const isLight = resolvedTheme === "light"

  const selectedItem = useMemo(
    () => componentItems.find((item) => item.id === selected) ?? null,
    [selected],
  )
  const selectedShowcase = useMemo(
    () => (selectedItem ? renderShowcase(selectedItem.id) : null),
    [selectedItem],
  )

  return (
    <main
      className={`relative min-h-screen overflow-hidden ${
        isLight
          ? "bg-[radial-gradient(circle_at_50%_72%,rgba(255,160,85,0.18),transparent_30%),linear-gradient(180deg,#f5f2eb_0%,#ece8e3_100%)] text-black/85"
          : "bg-[radial-gradient(circle_at_50%_72%,rgba(255,152,35,0.28),transparent_30%),radial-gradient(circle_at_50%_40%,rgba(250,220,125,0.14),transparent_40%),radial-gradient(circle_at_top,#191922_0,#050509_58%,#020206_100%)] text-white/92"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        aria-hidden
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        aria-hidden
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 120px)",
        }}
      />

      <div className="relative px-2 py-3 md:px-3 lg:px-4">
        <div
          className={`mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-[1320px] gap-4 overflow-hidden rounded-[24px] border p-3 backdrop-blur-xl md:gap-5 md:p-4 ${
            isLight ? "border-black/10 bg-white/24" : "border-white/10 bg-black/24"
          }`}
        >
          <aside
            className={`sticky top-4 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-hidden rounded-2xl border p-4 md:block ${
              isLight ? "border-black/10 bg-white/50" : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <p className={`mb-3 text-xs uppercase tracking-wide ${isLight ? "text-black/42" : "text-white/45"}`}>Components</p>
          <button
            onClick={() => setSelected("index")}
            className={`mb-2 w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              selected === "index"
                ? isLight
                  ? "bg-black/10 text-black/85"
                  : "bg-white/12 text-white"
                : isLight
                  ? "text-black/58 hover:bg-black/[0.06] hover:text-black/82"
                  : "text-white/65 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            Index
          </button>
            <div className="h-[calc(100%-3rem)] space-y-1 overflow-y-auto pr-1">
              {componentItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item.id)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    selected === item.id
                      ? isLight
                        ? "bg-black/10 text-black/85"
                        : "bg-white/12 text-white"
                      : isLight
                        ? "text-black/58 hover:bg-black/[0.06] hover:text-black/82"
                        : "text-white/65 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </aside>

          <section className="min-h-0 flex-1 overflow-y-auto pr-1">
            {selected === "index" ? (
              <>
                <h1
                  className={`text-4xl tracking-tight md:text-5xl ${isLight ? "text-black/88" : "text-white/95"}`}
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  Index
                </h1>
                <p className={`mt-2 text-sm ${isLight ? "text-black/55" : "text-white/60"}`}>
                  Select a component to open docs, preview, and copy usage code.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {componentItems.map((item) => (
                    <Card
                      key={item.id}
                      className={`rounded-2xl border transition-colors ${
                        isLight
                          ? "border-black/10 bg-white/55 text-black/85 hover:border-black/20"
                          : "border-white/10 bg-white/[0.03] text-white/92 hover:border-white/20"
                      }`}
                    >
                      <CardHeader>
                        <CardTitle className="text-xl">{item.name}</CardTitle>
                        <CardDescription className={`flex items-center gap-2 ${isLight ? "text-black/50" : "text-white/52"}`}>
                          <span>{item.category}</span>
                          {ESSENTIAL_PACK_COMPONENT_IDS.has(item.id) && (
                            <span
                              className={
                                isLight
                                  ? "rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-emerald-700"
                                  : "rounded-full border border-emerald-500/35 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-emerald-300"
                              }
                            >
                              Essential Pack
                            </span>
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className={`mb-4 text-sm ${isLight ? "text-black/62" : "text-white/64"}`}>{item.description}</p>
                        <Button onClick={() => setSelected(item.id)} variant="secondary" className="w-full">
                          {item.ready ? "Open Docs" : "View Stub"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : selectedItem && selectedShowcase ? (
              <div>
                <ComponentDocumentation item={selectedItem} isLight={isLight} />
                {selectedShowcase}
              </div>
            ) : (
              <div
                className={`rounded-2xl border p-8 ${
                  isLight ? "border-black/10 bg-white/55 text-black/85" : "border-white/10 bg-white/[0.03] text-white/90"
                }`}
              >
                <h2 className="text-2xl font-semibold">{selectedItem?.name}</h2>
                <p className={`mt-2 text-sm ${isLight ? "text-black/55" : "text-white/60"}`}>{selectedItem?.description}</p>
                <p className={`mt-6 text-sm ${isLight ? "text-black/62" : "text-white/65"}`}>
                  This component docs page is coming soon. The index and selection flow is ready.
                </p>
                <Button className="mt-6" onClick={() => setSelected("index")}>
                  Back to Index
                </Button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
