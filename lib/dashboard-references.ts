/**
 * Mode-specific copy for the dashboard assistant.
 * References: public/references (screenshots guide UI patterns)
 */

export type AssistantMode = "conversation" | "agent"

export const ASSISTANT_MODES = {
  conversation: {
    label: "Conversation",
    description:
      "Describe a screen or ask about components. I'll suggest layouts and sparkle/ui building blocks.",
    placeholder: "Describe what you're building or ask about a component…",
    quickPrompts: [
      "Auth screen with social login",
      "Dashboard hero with stats and CTA",
      "Pricing section using cards",
      "Landing page for AI tool",
    ],
    welcomeMessage:
      "Hey, I'm your sparkle/ui assistant. Tell me what you're building and I'll suggest components and layouts.",
  },
  agent: {
    label: "Agent",
    description:
      "Describe the UI you want. I'll generate code using sparkle/ui components and optimize for models.",
    placeholder: "Generate an ecommerce website.",
    quickPrompts: [
      "E-commerce website",
      "Portfolio site",
      "Auth flow with OAuth + lock switch",
      "AI landing page for startup",
    ],
    welcomeMessage:
      "I'm your coding agent. Describe the UI you need and I'll generate sparkle/ui code, layouts, and previews for you.",
  },
} as const
