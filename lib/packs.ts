/**
 * Component packs: curated sets by niche. Supports free, pro (paid), and ads tiers.
 */

export type PackTier = "free" | "pro" | "ads"

export type Pack = {
  id: string
  name: string
  description: string
  tier: PackTier
  componentIds: string[]
}

export const PACKS: Pack[] = [
  {
    id: "essential-pack",
    name: "Essential Pack",
    description: "Core sparkle/ui kit: signature buttons, badges, rating, tabs, and accordion.",
    tier: "free",
    componentIds: [
      "sparkle-button",
      "social-media-button",
      "message-send-button",
      "badge",
      "sidebar-tabs",
      "accordion",
      "star-rating-radio",
    ],
  },
  {
    id: "free-core",
    name: "Free Core",
    description: "Essential buttons, inputs, and data display components. Use in any project, no strings attached.",
    tier: "free",
    componentIds: [
      "sparkle-button",
      "pill-button",
      "message-send-button",
      "badge",
      "counter",
      "lock-switch",
      "star-rating-radio",
      "segmented-control",
      "elastic-slider",
      "accordion",
      "hover-tooltip-card",
    ],
  },
  {
    id: "auth-forms",
    name: "Auth & Forms",
    description: "Sign-in and form building blocks: OAuth cards, form layouts, and validation-ready inputs.",
    tier: "free",
    componentIds: ["oauth-form"],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Premium components: social CTAs with sweep effects, sidebar navigation, and expandable avatars.",
    tier: "pro",
    componentIds: ["social-media-button", "sidebar-tabs", "avatar"],
  },
  {
    id: "ai",
    name: "AI Pack",
    description: "Components for AI products: chat bubbles, prompt inputs, thinking indicators, and model selectors. Coming soon.",
    tier: "ads",
    componentIds: [],
  },
]

const componentIdToName: Record<string, string> = {
  "sparkle-button": "Sparkle Button",
  "social-media-button": "Social Media Button",
  "pill-button": "Pill Button",
  "message-send-button": "Message Send Button",
  "oauth-form": "OAuth Form",
  "hover-tooltip-card": "Hover Tooltip Card",
  "star-rating-radio": "Star Rating Radio",
  "lock-switch": "Lock Switch",
  "elastic-slider": "Elastic Slider",
  "segmented-control": "Segmented Control",
  "counter": "Counter",
  "badge": "Badge",
  "avatar": "Avatar",
  "sidebar-tabs": "Sidebar Tabs",
  "accordion": "Accordion",
}

export function getComponentName(id: string): string {
  return componentIdToName[id] ?? id
}

export function getPackByComponentId(componentId: string): Pack | undefined {
  return PACKS.find((p) => p.componentIds.includes(componentId))
}

export function getPacksForComponent(componentId: string): Pack[] {
  return PACKS.filter((p) => p.componentIds.includes(componentId))
}
