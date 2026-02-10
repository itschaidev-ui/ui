# @chaidev/ui — Animated React UI Components

Beautiful, animated UI components for React, built with motion and styled‑components.

This README is published **with the npm package**, so you always have a quick reference in `node_modules/@chaidev/ui/README.md` even without the docs site.

---

## Installation

```bash
npm install @chaidev/ui motion styled-components
```

Peer dependencies:

- `react` / `react-dom` (18 or 19)
- `motion` (Framer Motion v12)
- `styled-components` v6

Import the base styles once in your app (if you want the default CSS):

```ts
import '@chaidev/ui/styles.css'
```

---

## Components Overview

These are the main components exported from `@chaidev/ui`:

- **Buttons**
  - `SparkleButton`
  - `SocialMediaButton`
  - `PillButton`
  - `MessageSendButton`
- **Forms**
  - `OAuthForm`
- **Inputs**
  - `StarRatingRadio`
  - `LockSwitch`
  - `ElasticSlider`
  - `SegmentedControl`
- **Data display**
  - `Counter`
  - `Badge`
  - `Avatar`
  - `HoverTooltipCard`
- **Navigation / layout**
  - `SidebarTabs`
  - `Accordion`

> For an interactive playground for each component, your docs app exposes `/components`.  
> For a full web docs experience with props tables, you can mirror what lives in `app/docs/page.tsx` of this repo.

---

## Usage Examples

### SparkleButton

```ts
import { SparkleButton } from '@chaidev/ui'

export function HeroCTA() {
  return (
    <SparkleButton enableHoverText enableLoadingState>
      Get Started
    </SparkleButton>
  )
}
```

**Props (key ones):**

| Prop               | Type       | Default | Description                                                     |
| ------------------ | ---------- | ------- | --------------------------------------------------------------- |
| `children`         | ReactNode  | –       | Button label content.                                           |
| `enableHoverText`  | boolean    | `false` | Enables alternate hover label.                                 |
| `enableLoadingState` | boolean  | `false` | Enables loading text / animation during async operations.      |

**Good for:** hero CTAs, upgrade flows, async submits.

---

### SocialMediaButton

```ts
import { SocialMediaButton } from '@chaidev/ui'

export function StarOnGitHub() {
  return (
    <SocialMediaButton
      preset="github"
      href="https://github.com/your/repo"
      showGitHubStar
      sweepEasingPreset="soft"
      sweepDurationMs={900}
    />
  )
}
```

**Props (high level):**

- `preset: SocialMediaPresetName` — choose a platform style (e.g. `"github"`).
- `presets?: Record<SocialMediaPresetName, SocialMediaPresetConfig>` — override/add presets.
- `label?: string` — text inside the button.
- `href?: string` — target URL.
- `showCount?: boolean` — show star/follower count.
- `showSweep?: boolean` — show the sweep animation overlay.
- `showGitHubStar?: boolean` — render GitHub star icon next to the count.
- `sweepEasingPreset?: SocialSweepEasingPreset` — named easing for the sweep.
- `sweepDurationMs?: number` — sweep animation duration.

**Good for:** GitHub stars, social follows, share CTAs.

---

### PillButton

```ts
import { PillButton } from '@chaidev/ui'

export function RetroCTA() {
  return <PillButton label="Continue" onClick={() => console.log('Clicked')} />
}
```

Simple retro 3D button built with `styled-components`.

---

### MessageSendButton

```ts
import { MessageSendButton } from '@chaidev/ui'

export function SendButton() {
  return (
    <MessageSendButton
      defaultText="Send"
      sentText="Sent!"
      onClick={async () => {
        // trigger your send logic
      }}
    />
  )
}
```

Animated send button that morphs into a “sent” state, with character‑level motion.

---

### OAuthForm

```ts
import { OAuthForm } from '@chaidev/ui'

export function SignInCard() {
  return (
    <OAuthForm
      onGoogleClick={() => {/* open Google OAuth */}}
      onGithubClick={() => {/* open GitHub OAuth */}}
      onContinue={(email) => console.log('Continue with email', email)}
    />
  )
}
```

**Key props:**

- `title?: string` — heading (default `"Welcome,"`).
- `subtitle?: string` — secondary text (default `"sign in to continue"`).
- `showGoogle?: boolean` / `showGithub?: boolean` — toggle OAuth buttons.
- `onGoogleClick?`, `onGithubClick?` — click handlers.
- `onContinue?(email: string)` — email submit handler.

Good building block for auth modals or cards.

---

### HoverTooltipCard

```ts
import { HoverTooltipCard } from '@chaidev/ui'

export function TooltipDemo() {
  return (
    <HoverTooltipCard
      tooltipText="Docs"
      frontText="Hover me"
      revealText="Hello! 👋"
    />
  )
}
```

Animated tooltip with:

- floating label above the card,
- side‑reveal panel on hover,
- shake animation on the tooltip.

---

### StarRatingRadio

```ts
import { StarRatingRadio } from '@chaidev/ui'
import { useState } from 'react'

export function Rating() {
  const [value, setValue] = useState(4)
  return <StarRatingRadio max={5} value={value} onChange={setValue} />
}
```

Keyboard accessible custom star rating built on hidden radio inputs.

---

### LockSwitch

```ts
import { LockSwitch } from '@chaidev/ui'

export function PrivacyToggle() {
  return (
    <LockSwitch
      defaultChecked
      size="md"
      tone="vivid"
      motion="spring"
      showStateLabel
    />
  )
}
```

Props highlights:

- `checked` / `defaultChecked` / `onCheckedChange`
- `size: 'sm' | 'md' | 'lg'`
- `tone: 'default' | 'vivid' | 'glass'`
- `motion: 'smooth' | 'spring' | 'snappy'`
- `showStateLabel?: boolean`
- `lockedColor?`, `unlockedColor?`, `knobColor?`

---

### ElasticSlider

```ts
import { ElasticSlider } from '@chaidev/ui'

export function VolumeControl({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return <ElasticSlider value={value} onChange={onChange} enhancedEffects />
}
```

Springy slider with overflow “stretch” and optional extra motion via `enhancedEffects`.

---

### SegmentedControl

```ts
import { SegmentedControl, type SegmentedControlOption } from '@chaidev/ui'

const options: SegmentedControlOption[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
]

export function BillingToggle() {
  const [value, setValue] = useState('monthly')
  return <SegmentedControl options={options} value={value} onChange={setValue} draggable />
}
```

Supports keyboard navigation and optional drag of the active pill.

---

### Counter

```ts
import { Counter } from '@chaidev/ui'

export function DownloadsStat() {
  return <Counter value={12450} />
}
```

Rolling number counter for KPIs and hero stats.

---

### Badge

```ts
import { Badge } from '@chaidev/ui'

export function StatusBadge() {
  return <Badge tone="success">Active</Badge>
}
```

Configurable tones, sizes, appearances, dot indicator, removable icon, and animation presets.

---

### Avatar

```ts
import { Avatar } from '@chaidev/ui'

export function UserAvatar() {
  return (
    <Avatar
      src="/user.png"
      alt="User"
      size="lg"
      animation="float"
      expandable
    />
  )
}
```

Supports ring, status, motion, and an expandable hover‑card for extra profile content.

---

### SidebarTabs

```ts
import { SidebarTabs, type SidebarTabItem } from '@chaidev/ui'

const items: SidebarTabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'settings', label: 'Settings' },
]

export function SettingsSidebar() {
  const [active, setActive] = useState('overview')

  return (
    <SidebarTabs
      items={items}
      activeId={active}
      onChange={setActive}
      variant="default"
      animation="slide"
      textAnimation="slide"
      expandable
    />
  )
}
```

Rich sidebar navigation with:

- multiple panel animations (`fade`, `slide`, `pop`, `zoom`, `blur`, `flip`),
- text animations,
- configurable nav width and position,
- support for icons, badges, and short labels.

---

### Accordion

```ts
import { Accordion, type AccordionItem } from '@chaidev/ui'

const items: AccordionItem[] = [
  { id: 'one', title: 'First item', content: 'Hidden content' },
  { id: 'two', title: 'Second item', content: 'More content' },
]

export function FAQ() {
  return <Accordion items={items} animation="smooth" collapsible />
}
```

Animation presets:

- `"none"` — instant open/close  
- `"smooth"` — height animation  
- `"fade"` — opacity + height  
- `"pop"` — scale + fade

---

## Advanced Notes

- All motion‑heavy components are designed so that extra effects are **off by default** in the package for simplicity. The docs/playground app enables the fancy bits.
- If you want to mirror the docs experience in your own app, you can copy patterns from:
  - `app/docs/page.tsx` — prop tables, use‑case lists
  - `components/*-showcase.tsx` — interactive playgrounds with controls

For more, check the GitHub repo:

- `https://github.com/itschaidev-ui/ui`

