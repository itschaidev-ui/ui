import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type PropDoc = {
  name: string
  type: string
  default?: string
  description: string
}

type ComponentDocFull = {
  id: string
  name: string
  category: string
  summary: string
  install: string
  importCode: string
  usage: string
  useCases: string[]
  props: PropDoc[]
}

const docs: ComponentDocFull[] = [
  {
    id: "sparkle-button",
    name: "Sparkle Button",
    category: "Buttons",
    summary:
      "Call-to-action button with sparkle effects, optional hover text, and loading-state transitions.",
    install: "npm i @chaidev/ui motion styled-components",
    importCode: "import { SparkleButton } from '@chaidev/ui'",
    usage: "<SparkleButton>Get Started</SparkleButton>",
    useCases: [
      "Primary hero CTAs",
      "Upgrade / subscribe actions",
      "Async submits with rich feedback",
    ],
    props: [
      {
        name: "children",
        type: "ReactNode",
        description: "Button label content.",
      },
      {
        name: "enableHoverText",
        type: "boolean",
        default: "false",
        description: "Switch label on hover to an alternate text.",
      },
      {
        name: "enableLoadingState",
        type: "boolean",
        default: "false",
        description: "Show loading text/state while an async action runs.",
      },
    ],
  },
  {
    id: "social-media-button",
    name: "Social Media Button",
    category: "Buttons",
    summary:
      "Preset-driven social CTA with sweep effect, optional star/count, and easing presets.",
    install: "npm i @chaidev/ui motion styled-components",
    importCode: "import { SocialMediaButton } from '@chaidev/ui'",
    usage:
      "<SocialMediaButton preset='github' href='https://github.com/your/repo' />",
    useCases: [
      "GitHub star prompts",
      "Share / follow actions",
      "Footer social links with emphasis",
    ],
    props: [
      {
        name: "preset",
        type: "SocialMediaPresetName",
        default: '"github"',
        description: "Named preset that configures colors, icon, and defaults.",
      },
      {
        name: "presets",
        type: "Record<SocialMediaPresetName, SocialMediaPresetConfig>",
        description: "Override or extend the built-in presets.",
      },
      {
        name: "label",
        type: "string",
        description: "Text label displayed inside the button.",
      },
      {
        name: "href",
        type: "string",
        description: "Destination URL for the button.",
      },
      {
        name: "showCount",
        type: "boolean",
        default: "true",
        description: "Whether to show the social/star count.",
      },
      {
        name: "showSweep",
        type: "boolean",
        default: "true",
        description: "Toggle the animated sweep overlay.",
      },
      {
        name: "showGitHubStar",
        type: "boolean",
        default: "false",
        description: "Show GitHub star icon next to the count.",
      },
      {
        name: "sweepEasingPreset",
        type: "SocialSweepEasingPreset",
        description: "Pick one of the built-in sweep easing curves.",
      },
      {
        name: "sweepDurationMs",
        type: "number",
        default: "800",
        description: "Duration of the sweep animation in milliseconds.",
      },
    ],
  },
  {
    id: "pill-button",
    name: "Pill Button",
    category: "Buttons",
    summary: "Retro 3D-style button built with styled-components.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { PillButton } from '@chaidev/ui'",
    usage: "<PillButton label='Continue' />",
    useCases: ["Playful CTAs", "Gamified onboarding", "Marketing micro-interactions"],
    props: [
      {
        name: "label",
        type: "string",
        description: "Text label inside the button.",
      },
      {
        name: "onClick",
        type: "() => void",
        description: "Click handler for the button.",
      },
    ],
  },
  {
    id: "message-send-button",
    name: "Message Send Button",
    category: "Buttons",
    summary:
      "Animated send button with a sent confirmation state and character-level motion.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { MessageSendButton } from '@chaidev/ui'",
    usage: "<MessageSendButton defaultText='Send' sentText='Sent!' />",
    useCases: ["Chat inputs", "Feedback forms", "Message composer actions"],
    props: [
      {
        name: "defaultText",
        type: "string",
        default: '"Send"',
        description: "Text before the message is sent.",
      },
      {
        name: "sentText",
        type: "string",
        default: '"Sent!"',
        description: "Text after the send animation completes.",
      },
      {
        name: "onClick",
        type: "() => Promise<void> | void",
        description: "Optional handler to trigger on click / send.",
      },
    ],
  },
  {
    id: "oauth-form",
    name: "OAuth Form",
    category: "Forms",
    summary:
      "Auth-style form with OAuth buttons and email continue action, all in a retro card.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { OAuthForm } from '@chaidev/ui'",
    usage: "<OAuthForm onContinue={(email) => console.log(email)} />",
    useCases: ["Login cards", "Sign-in modals", "Fast auth prototypes"],
    props: [
      {
        name: "title",
        type: "string",
        default: '"Welcome,"',
        description: "Heading text above the form.",
      },
      {
        name: "subtitle",
        type: "string",
        default: '"sign in to continue"',
        description: "Secondary text below the title.",
      },
      {
        name: "emailPlaceholder",
        type: "string",
        default: '"Email"',
        description: "Placeholder text for the email field.",
      },
      {
        name: "showGoogle",
        type: "boolean",
        default: "true",
        description: "Toggle the Google OAuth button.",
      },
      {
        name: "showGithub",
        type: "boolean",
        default: "true",
        description: "Toggle the GitHub OAuth button.",
      },
      {
        name: "onGoogleClick",
        type: "() => void",
        description: "Callback when the Google button is clicked.",
      },
      {
        name: "onGithubClick",
        type: "() => void",
        description: "Callback when the GitHub button is clicked.",
      },
      {
        name: "onContinue",
        type: "(email: string) => void",
        description: "Called when the email continue button is submitted.",
      },
    ],
  },
  {
    id: "hover-tooltip-card",
    name: "Hover Tooltip Card",
    category: "Data Display",
    summary:
      "Interactive tooltip card with a floating tooltip label and side reveal transition.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { HoverTooltipCard } from '@chaidev/ui'",
    usage:
      "<HoverTooltipCard tooltipText='Docs' frontText='Hover me' revealText='Hello!' />",
    useCases: ["Feature callouts", "Interactive labels", "Onboarding hints"],
    props: [
      {
        name: "tooltipText",
        type: "string",
        default: '"sparkle/ui"',
        description: "Text shown inside the floating tooltip bubble.",
      },
      {
        name: "frontText",
        type: "string",
        default: '"Tooltip 👆"',
        description: "Primary text on the card before hover.",
      },
      {
        name: "revealText",
        type: "string",
        default: '"Hello! 👋"',
        description: "Text shown in the sliding reveal panel.",
      },
    ],
  },
  {
    id: "star-rating-radio",
    name: "Star Rating Radio",
    category: "Inputs",
    summary: "Animated star rating input with radio semantics and keyboard support.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { StarRatingRadio } from '@chaidev/ui'",
    usage: "<StarRatingRadio max={5} value={rating} onChange={setRating} />",
    useCases: ["Review forms", "Post-purchase feedback", "Service quality scoring"],
    props: [
      {
        name: "max",
        type: "number",
        default: "5",
        description: "Maximum number of stars.",
      },
      {
        name: "value",
        type: "number",
        description: "Currently selected value.",
      },
      {
        name: "onChange",
        type: "(value: number) => void",
        description: "Called with the selected value when it changes.",
      },
      {
        name: "name",
        type: "string",
        description: "Optional radio group name; autogenerated if omitted.",
      },
    ],
  },
  {
    id: "lock-switch",
    name: "Lock Switch",
    category: "Inputs",
    summary:
      "Lock/unlock toggle with icon states, size/tone presets, motion variants, and color overrides.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { LockSwitch } from '@chaidev/ui'",
    usage: "<LockSwitch defaultChecked showStateLabel />",
    useCases: ["Privacy toggles", "Security settings", "Feature lock indicators"],
    props: [
      { name: "checked", type: "boolean", description: "Controlled checked state." },
      {
        name: "defaultChecked",
        type: "boolean",
        default: "false",
        description: "Initial checked state when uncontrolled.",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        description: "Callback fired whenever the checked state changes.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Visual size of the switch.",
      },
      {
        name: "tone",
        type: '"default" | "vivid" | "glass"',
        default: '"default"',
        description: "Overall styling tone of the switch track and knob.",
      },
      {
        name: "motion",
        type: '"smooth" | "spring" | "snappy"',
        default: '"smooth"',
        description: "Animation style used for the knob and icons.",
      },
      {
        name: "showStateLabel",
        type: "boolean",
        default: "false",
        description: "Display a textual state label next to the switch.",
      },
      {
        name: "lockedColor",
        type: "string",
        description: "Custom CSS color for the locked track state.",
      },
      {
        name: "unlockedColor",
        type: "string",
        description: "Custom CSS color for the unlocked track state.",
      },
      {
        name: "knobColor",
        type: "string",
        description: "Custom CSS color for the knob.",
      },
    ],
  },
  {
    id: "elastic-slider",
    name: "Elastic Slider",
    category: "Inputs",
    summary:
      "Springy slider with elastic overflow behaviour and optional enhanced effects.",
    install: "npm i @chaidev/ui motion styled-components",
    importCode: "import { ElasticSlider } from '@chaidev/ui'",
    usage: "<ElasticSlider value={value} onChange={setValue} />",
    useCases: ["Media controls", "Price ranges", "Interactive tool settings"],
    props: [
      {
        name: "value",
        type: "number",
        description: "Current slider value.",
      },
      {
        name: "onChange",
        type: "(value: number) => void",
        description: "Callback when the value changes.",
      },
      {
        name: "min",
        type: "number",
        default: "0",
        description: "Minimum slider value.",
      },
      {
        name: "max",
        type: "number",
        default: "100",
        description: "Maximum slider value.",
      },
      {
        name: "enhancedEffects",
        type: "boolean",
        default: "false",
        description: "Enable stronger scale / icon motion on drag.",
      },
    ],
  },
  {
    id: "segmented-control",
    name: "Segmented Control",
    category: "Inputs",
    summary:
      "Custom segmented selector with keyboard support and optional draggable handle.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { SegmentedControl } from '@chaidev/ui'",
    usage: "<SegmentedControl options={options} value={value} onChange={setValue} />",
    useCases: ["View mode toggles", "Pricing period switch", "Filtering tabs"],
    props: [
      {
        name: "options",
        type: "SegmentedControlOption[]",
        description: "Array of segment definitions (label, value, optional icon).",
      },
      {
        name: "value",
        type: "string",
        description: "Currently selected option value.",
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        description: "Called when a different segment is selected.",
      },
      {
        name: "draggable",
        type: "boolean",
        default: "false",
        description:
          "Enable drag interaction for the active pill instead of click-only.",
      },
    ],
  },
  {
    id: "counter",
    name: "Counter",
    category: "Data Display",
    summary:
      "Animated number display that rolls smoothly between values with optional gradient.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { Counter } from '@chaidev/ui'",
    usage: "<Counter value={12450} />",
    useCases: ["KPI dashboards", "Live metrics", "Hero stat callouts"],
    props: [
      {
        name: "value",
        type: "number",
        description: "Target value for the counter.",
      },
      {
        name: "duration",
        type: "number",
        description: "Duration of the animation in milliseconds.",
      },
      {
        name: "gradientHeight",
        type: "number",
        default: "0",
        description: "Height of top/bottom gradient fade (0 to disable).",
      },
    ],
  },
  {
    id: "badge",
    name: "Badge",
    category: "Data Display",
    summary:
      "Flexible status badge with tones, appearances, sizes, and optional animation presets.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { Badge } from '@chaidev/ui'",
    usage: "<Badge tone='success'>Active</Badge>",
    useCases: ["Status indicators", "Metadata labels", "Tag chips"],
    props: [
      {
        name: "tone",
        type: "BadgeTone",
        description: "Color tone, such as 'neutral', 'success', 'danger'.",
      },
      {
        name: "appearance",
        type: "BadgeAppearance",
        description: "Visual style such as 'solid', 'soft', or 'outline'.",
      },
      {
        name: "size",
        type: "BadgeSize",
        description: "Badge size, e.g. 'sm', 'md', 'lg'.",
      },
      {
        name: "dot",
        type: "boolean",
        description: "Show a small dot indicator before the content.",
      },
      {
        name: "removable",
        type: "boolean",
        description: "Show a dismiss icon to remove the badge.",
      },
      {
        name: "animations",
        type: "BadgeAnimation[]",
        description: "Array of animation presets to apply.",
      },
    ],
  },
  {
    id: "avatar",
    name: "Avatar",
    category: "Data Display",
    summary:
      "Avatar with ring, status, motion options, and optional expandable hover-card content.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { Avatar } from '@chaidev/ui'",
    usage: "<Avatar src='/user.png' alt='User' expandable />",
    useCases: ["Profile blocks", "Team lists", "User presence indicators"],
    props: [
      { name: "src", type: "string", description: "Avatar image source URL." },
      { name: "alt", type: "string", description: "Accessible alt text." },
      {
        name: "size",
        type: "AvatarSize",
        description: "Size token such as 'sm', 'md', 'lg'.",
      },
      {
        name: "shape",
        type: "AvatarShape",
        description: "Shape of the avatar, e.g. 'circle' or 'square'.",
      },
      {
        name: "status",
        type: "AvatarStatus",
        description: "Optional presence indicator (online, offline, busy).",
      },
      {
        name: "animation",
        type: "AvatarAnimation",
        description: "Avatar animation style (pulse, float, glow, etc).",
      },
      {
        name: "expandable",
        type: "boolean",
        default: "false",
        description: "Enable hover-card expansion with extra content.",
      },
    ],
  },
  {
    id: "sidebar-tabs",
    name: "Sidebar Tabs",
    category: "Navigation",
    summary:
      "Sidebar navigation tabs with style variants, panel animations, and collapsible layout.",
    install: "npm i @chaidev/ui motion styled-components",
    importCode: "import { SidebarTabs } from '@chaidev/ui'",
    usage: "<SidebarTabs items={items} activeId={active} onChange={setActive} />",
    useCases: ["Settings dashboards", "Admin panels", "Docs navigation"],
    props: [
      {
        name: "items",
        type: "SidebarTabItem[]",
        description:
          "Array of tab definitions (id, label, icon, badge, shortLabel, content).",
      },
      {
        name: "activeId",
        type: "string",
        description: "Currently active tab id.",
      },
      {
        name: "onChange",
        type: "(id: string) => void",
        description: "Called when the active tab changes.",
      },
      {
        name: "variant",
        type: "SidebarTabsVariant",
        description: "Visual variant for the tabs and panel.",
      },
      {
        name: "animation",
        type: "SidebarTabsAnimation",
        description: "Panel animation type (fade, slide, pop, zoom, blur, flip).",
      },
      {
        name: "textAnimation",
        type: "SidebarTabsTextAnimation",
        description: "Text animation for active labels.",
      },
      {
        name: "navPosition",
        type: "SidebarTabsNavPosition",
        description: "Position of the navigation (left or right).",
      },
      {
        name: "density",
        type: "SidebarTabsDensity",
        description: "Spacing density for the nav items.",
      },
      {
        name: "tabStyle",
        type: "SidebarTabsTabStyle",
        description: "Tab style such as 'pill' or 'underline'.",
      },
      {
        name: "expandedWidth",
        type: "number | string",
        description: "Width of the expanded sidebar (px or CSS value).",
      },
      {
        name: "collapsedWidth",
        type: "number | string",
        description: "Width of the collapsed sidebar.",
      },
    ],
  },
  {
    id: "accordion",
    name: "Accordion",
    category: "Layout",
    summary:
      "Expandable content sections with animation presets and collapsible item behaviour.",
    install: "npm i @chaidev/ui styled-components",
    importCode: "import { Accordion } from '@chaidev/ui'",
    usage: "<Accordion items={items} animation='smooth' collapsible />",
    useCases: ["FAQs", "Settings groups", "Dense content disclosure"],
    props: [
      {
        name: "items",
        type: "AccordionItem[]",
        description: "Array of accordion item definitions (id, title, content).",
      },
      {
        name: "animation",
        type: "AccordionAnimation",
        default: '"smooth"',
        description: "Animation preset ('none', 'smooth', 'fade', 'pop').",
      },
      {
        name: "collapsible",
        type: "boolean",
        default: "true",
        description: "Allow all items to be collapsed so none are open.",
      },
    ],
  },
]

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#e5e5e5]">
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-10 md:px-8">
        <aside className="sticky top-6 hidden h-fit w-64 shrink-0 rounded-xl border border-[#141414] bg-[#0a0a0a] p-4 md:block">
          <p className="mb-3 text-xs uppercase tracking-wide text-[#666]">Docs</p>
          <a
            href="#overview"
            className="mb-2 block rounded-lg px-3 py-2 text-left text-sm text-[#e5e5e5] transition-colors hover:bg-[#111]"
          >
            Overview
          </a>
          <div className="mt-2 space-y-1">
            {docs.map((doc) => (
              <a
                key={doc.id}
                href={`#${doc.id}`}
                className="block rounded-lg px-3 py-2 text-left text-sm text-[#888] transition-colors hover:bg-[#111] hover:text-white"
              >
                {doc.name}
              </a>
            ))}
          </div>
        </aside>

        <section className="flex-1 space-y-10">
          <section id="overview">
            <Badge variant="secondary" className="mb-4 border-border/70 bg-secondary/60">
              Documentation
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight">Component docs</h1>
            <p className="mt-2 max-w-2xl text-sm text-[#8f8f8f]">
              Everything you can do with each sparkle/ui component – install instructions,
              props, and common use cases. Browse by niche in{" "}
              <Link href="/packs" className="text-[#a5b4fc] underline-offset-4 hover:underline">
                Packs
              </Link>
              {" "}or try components in the{" "}
              <Link href="/components" className="text-[#a5b4fc] underline-offset-4 hover:underline">
                playground
              </Link>
              .
            </p>
          </section>

          {docs.map((doc) => (
            <article
              key={doc.id}
              id={doc.id}
              className="scroll-mt-24 space-y-5 rounded-2xl border border-[#141414] bg-[#0a0a0a] p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">{doc.name}</h2>
                  <p className="mt-2 max-w-3xl text-sm text-[#9b9b9b]">{doc.summary}</p>
                </div>
                <span className="rounded-full border border-[#2a2a2a] bg-[#101010] px-3 py-1 text-xs text-[#bcbcbc]">
                  {doc.category}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-[#1d1d1d] bg-[#0d0d0d]">
                  <CardHeader>
                    <CardTitle className="text-xs font-medium uppercase tracking-wide text-[#777]">
                      Install
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="overflow-x-auto rounded-lg border border-[#222] bg-[#080808] p-3 text-xs text-[#d9d9d9]">
                      <code>{doc.install}</code>
                    </pre>
                  </CardContent>
                </Card>
                <Card className="border-[#1d1d1d] bg-[#0d0d0d]">
                  <CardHeader>
                    <CardTitle className="text-xs font-medium uppercase tracking-wide text-[#777]">
                      Import
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="overflow-x-auto rounded-lg border border-[#222] bg-[#080808] p-3 text-xs text-[#d9d9d9]">
                      <code>{doc.importCode}</code>
                    </pre>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-[#1d1d1d] bg-[#0d0d0d]">
                <CardHeader>
                  <CardTitle className="text-xs font-medium uppercase tracking-wide text-[#777]">
                    Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="overflow-x-auto rounded-lg border border-[#222] bg-[#080808] p-3 text-xs text-[#d9d9d9]">
                    <code>{doc.usage}</code>
                  </pre>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">
                <Card className="border-[#1d1d1d] bg-[#0d0d0d]">
                  <CardHeader>
                    <CardTitle className="text-xs font-medium uppercase tracking-wide text-[#777]">
                      Props
                    </CardTitle>
                    <CardDescription className="text-xs text-[#777]">
                      All public props you can use for this component.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-xs">
                        <thead className="bg-[#050505] text-left text-[11px] uppercase tracking-wide text-[#777]">
                          <tr>
                            <th className="border-b border-[#222] px-2 py-1.5 font-medium">
                              Prop
                            </th>
                            <th className="border-b border-[#222] px-2 py-1.5 font-medium">
                              Type
                            </th>
                            <th className="border-b border-[#222] px-2 py-1.5 font-medium">
                              Default
                            </th>
                            <th className="border-b border-[#222] px-2 py-1.5 font-medium">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {doc.props.map((prop) => (
                            <tr key={prop.name} className="align-top">
                              <td className="border-b border-[#222] px-2 py-1.5 font-mono text-[11px] text-[#e5e5e5]">
                                {prop.name}
                              </td>
                              <td className="border-b border-[#222] px-2 py-1.5 font-mono text-[11px] text-[#a3a3a3]">
                                {prop.type}
                              </td>
                              <td className="border-b border-[#222] px-2 py-1.5 font-mono text-[11px] text-[#737373]">
                                {prop.default ?? "—"}
                              </td>
                              <td className="border-b border-[#222] px-2 py-1.5 text-[11px] text-[#cfcfcf]">
                                {prop.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[#1d1d1d] bg-[#0d0d0d]">
                  <CardHeader>
                    <CardTitle className="text-xs font-medium uppercase tracking-wide text-[#777]">
                      Use cases
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-xs text-[#d4d4d4]">
                      {doc.useCases.map((useCase) => (
                        <li
                          key={useCase}
                          className="rounded-lg border border-[#1f1f1f] bg-[#090909] px-3 py-2"
                        >
                          {useCase}
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="mt-4 border-[#2d2d2d] bg-[#050505] text-xs text-[#d4d4d4] hover:bg-[#111]"
                    >
                      <Link href="/components">Open interactive playground</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}

