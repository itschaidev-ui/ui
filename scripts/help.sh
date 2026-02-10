#!/usr/bin/env bash

cat <<'EOF'
sparkle/ui – project help
=========================

Docs
----
- App docs (all components, props, usage, use-cases):
  - Route:   /docs
  - In dev:  http://localhost:3000/docs
- Interactive playgrounds:
  - Route:   /components
  - In dev:  http://localhost:3000/components

Common npm commands
-------------------
- npm run dev
    Start the Next.js dev server.

- npm run build
    Build the Next.js app.

- npm run build:ui
    Build the @chaidev/ui package (dist outputs).

- npm publish --workspace=packages/ui --access public
    Publish the @chaidev/ui package to npm (expects you to be logged in).

Key package entry
-----------------
- Package name: @chaidev/ui
- Main exports (from 'packages/ui/src/index.ts'):
  - SparkleButton
  - SocialMediaButton
  - PillButton
  - MessageSendButton
  - OAuthForm
  - HoverTooltipCard
  - StarRatingRadio
  - LockSwitch
  - ElasticSlider
  - SegmentedControl
  - Counter
  - Badge
  - Avatar
  - SidebarTabs
  - Accordion

Basic imports (for other projects)
----------------------------------
- Install:
    npm install @chaidev/ui motion styled-components

- Example React usage:
    import { SparkleButton } from '@chaidev/ui'

    export function Example() {
      return <SparkleButton>Get Started</SparkleButton>
    }

Notes for AI agents
-------------------
- For full component docs with props and use-cases, prefer scraping:
  - /docs (HTML) or the underlying file:
    - app/docs/page.tsx
- For live examples and controls, inspect:
  - components/*-showcase.tsx

EOF

