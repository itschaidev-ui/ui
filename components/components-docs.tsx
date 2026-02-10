"use client"

import { useMemo, useState, type ReactNode } from "react"
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
    description: "Animated send button with paper-plane transition states.",
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
    install: "npm i @chaidev/ui motion styled-components",
    importCode: "import { SparkleButton } from '@chaidev/ui'",
    usage: "<SparkleButton>Get Started</SparkleButton>",
    useCases: ["Primary hero CTA", "Upgrade / subscribe actions", "Async submit with rich feedback"],
  },
  "social-media-button": {
    summary: "Preset-driven social CTA button with sweep effects, star/count support, and easing controls.",
    install: "npm i @chaidev/ui motion styled-components",
    importCode: "import { SocialMediaButton } from '@chaidev/ui'",
    usage: "<SocialMediaButton preset='github' href='https://github.com/your/repo' />",
    useCases: ["GitHub star prompts", "Share/follow actions", "Footer social links with visual emphasis"],
  },
  "pill-button": {
    summary: "Retro-styled, tactile button built with styled-components.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { PillButton } from '@chaidev/ui'",
    usage: "<PillButton label='Continue' />",
    useCases: ["Playful CTAs", "Gamified onboarding", "Marketing micro-interactions"],
  },
  "message-send-button": {
    summary: "Animated send button with a sent confirmation state and character-level motion.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { MessageSendButton } from '@chaidev/ui'",
    usage: "<MessageSendButton defaultText='Send' sentText='Sent!' />",
    useCases: ["Chat inputs", "Feedback forms", "Message composer actions"],
  },
  "star-rating-radio": {
    summary: "Animated star rating input with radio semantics and keyboard accessibility.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { StarRatingRadio } from '@chaidev/ui'",
    usage: "<StarRatingRadio max={5} value={rating} onChange={setRating} />",
    useCases: ["Review forms", "Post-purchase feedback", "Service quality scoring"],
  },
  "oauth-form": {
    summary: "Auth-style form component with OAuth buttons and email continue action.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { OAuthForm } from '@chaidev/ui'",
    usage: "<OAuthForm onContinue={(email) => console.log(email)} />",
    useCases: ["Login landing cards", "Sign-in modals", "Fast auth prototypes"],
  },
  "hover-tooltip-card": {
    summary: "Animated tooltip card with floating hint and side reveal text on hover.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { HoverTooltipCard } from '@chaidev/ui'",
    usage: "<HoverTooltipCard tooltipText='Docs' frontText='Hover me' revealText='Hello!' />",
    useCases: ["Feature callouts", "Interactive labels", "Playful onboarding hints"],
  },
  "lock-switch": {
    summary: "Lock/unlock toggle with icon states, size/tone presets, and custom color controls.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { LockSwitch } from '@chaidev/ui'",
    usage: "<LockSwitch defaultChecked showStateLabel />",
    useCases: ["Privacy toggles", "Security setting switches", "Feature lock indicators"],
  },
  "elastic-slider": {
    summary: "Slider with elastic overflow behavior and optional enhanced motion effects.",
    install: "npm i @chaidev/ui motion styled-components",
    importCode: "import { ElasticSlider } from '@chaidev/ui'",
    usage: "<ElasticSlider value={value} onChange={setValue} />",
    useCases: ["Audio/video controls", "Price/filter ranges", "Interactive tool settings"],
  },
  "segmented-control": {
    summary: "Custom segmented selector with keyboard support and optional draggable interaction.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { SegmentedControl } from '@chaidev/ui'",
    usage: "<SegmentedControl options={options} value={value} onChange={setValue} />",
    useCases: ["View mode toggles", "Pricing period switch", "Filtering tabs"],
  },
  counter: {
    summary: "Animated number display that rolls smoothly between values.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { Counter } from '@chaidev/ui'",
    usage: "<Counter value={12450} />",
    useCases: ["KPI dashboards", "Follower/download metrics", "Live stat highlights"],
  },
  badge: {
    summary: "Flexible status badge with tones, appearances, sizes, and optional animations.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { Badge } from '@chaidev/ui'",
    usage: "<Badge tone='success'>Active</Badge>",
    useCases: ["Status indicators", "Feature labels", "Metadata chips"],
  },
  avatar: {
    summary: "Avatar with status/ring support and optional expandable hover-card content.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { Avatar } from '@chaidev/ui'",
    usage: "<Avatar src='/user.png' alt='User' expandable />",
    useCases: ["Profile blocks", "Team/member lists", "User presence displays"],
  },
  "sidebar-tabs": {
    summary: "Sidebar navigation tabs with style variants, animation modes, and collapsible behavior.",
    install: "npm i @chaidev/ui motion styled-components",
    importCode: "import { SidebarTabs } from '@chaidev/ui'",
    usage: "<SidebarTabs items={items} activeId={active} onChange={setActive} />",
    useCases: ["Settings dashboards", "Admin panels", "Docs/application side navigation"],
  },
  accordion: {
    summary: "Expandable content sections with animation presets and collapsible item behavior.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { Accordion } from '@chaidev/ui'",
    usage: "<Accordion items={items} animation='smooth' collapsible />",
    useCases: ["FAQs", "Settings groups", "Dense content disclosure"],
  },
}

function ComponentDocumentation({ item }: { item: ComponentItem }) {
  const doc = componentDocs[item.id]
  if (!doc) return null

  return (
    <section className="mb-6 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{item.name}</h1>
          <p className="mt-2 max-w-3xl text-sm text-[#8f8f8f]">{doc.summary}</p>
        </div>
        <span className="rounded-full border border-[#2a2a2a] bg-[#101010] px-3 py-1 text-xs text-[#bcbcbc]">
          {item.category}
        </span>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4">
          <p className="mb-2 text-xs uppercase tracking-wide text-[#666]">Install</p>
          <pre className="overflow-x-auto rounded-lg border border-[#222] bg-[#080808] p-3 text-xs text-[#d9d9d9]">
            <code>{doc.install}</code>
          </pre>
        </div>
        <div className="rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4">
          <p className="mb-2 text-xs uppercase tracking-wide text-[#666]">Import</p>
          <pre className="overflow-x-auto rounded-lg border border-[#222] bg-[#080808] p-3 text-xs text-[#d9d9d9]">
            <code>{doc.importCode}</code>
          </pre>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4">
        <p className="mb-2 text-xs uppercase tracking-wide text-[#666]">Usage</p>
        <pre className="overflow-x-auto rounded-lg border border-[#222] bg-[#080808] p-3 text-xs text-[#d9d9d9]">
          <code>{doc.usage}</code>
        </pre>
      </div>

      <div className="mt-4 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4">
        <p className="mb-2 text-xs uppercase tracking-wide text-[#666]">Use Cases</p>
        <ul className="space-y-2 text-sm text-[#c6c6c6]">
          {doc.useCases.map((useCase) => (
            <li key={useCase} className="rounded-lg border border-[#1f1f1f] bg-[#090909] px-3 py-2">
              {useCase}
            </li>
          ))}
        </ul>
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

  const selectedItem = useMemo(
    () => componentItems.find((item) => item.id === selected) ?? null,
    [selected],
  )
  const selectedShowcase = useMemo(
    () => (selectedItem ? renderShowcase(selectedItem.id) : null),
    [selectedItem],
  )

  return (
    <main className="min-h-screen bg-[#050505] text-[#e5e5e5]">
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-8 md:px-8">
        <aside className="sticky top-6 hidden h-fit w-64 rounded-xl border border-[#141414] bg-[#0a0a0a] p-4 md:block">
          <p className="mb-3 text-xs uppercase tracking-wide text-[#666]">Components</p>
          <button
            onClick={() => setSelected("index")}
            className={`mb-2 w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              selected === "index" ? "bg-[#141414] text-white" : "text-[#888] hover:bg-[#111] hover:text-white"
            }`}
          >
            Index
          </button>
          <div className="space-y-1">
            {componentItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item.id)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  selected === item.id ? "bg-[#141414] text-white" : "text-[#888] hover:bg-[#111] hover:text-white"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </aside>

        <section className="flex-1">
          {selected === "index" ? (
            <>
              <h1 className="text-4xl font-semibold tracking-tight">Index</h1>
              <p className="mt-2 text-sm text-[#777]">
                Select a component to open docs, preview, and copy usage code.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {componentItems.map((item) => (
                  <Card
                    key={item.id}
                    className="border-[#141414] bg-[#0a0a0a] text-[#e5e5e5] transition-colors hover:border-[#252525]"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      <CardDescription className="text-[#777]">{item.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm text-[#999]">{item.description}</p>
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
              <ComponentDocumentation item={selectedItem} />
              {selectedShowcase}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#141414] bg-[#0a0a0a] p-8">
              <h2 className="text-2xl font-semibold">{selectedItem?.name}</h2>
              <p className="mt-2 text-sm text-[#777]">{selectedItem?.description}</p>
              <p className="mt-6 text-sm text-[#999]">
                This component docs page is coming soon. The index and selection flow is ready.
              </p>
              <Button className="mt-6" onClick={() => setSelected("index")}>
                Back to Index
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
