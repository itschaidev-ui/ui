"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, useScroll, useTransform } from "motion/react"
import { Boxes, Github, Sparkles, Zap } from "lucide-react"

import { SparkleButton } from "@/components/ui/sparkle-button"
import { SocialMediaButton } from "@/components/ui/social-media-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassCtaButton } from "@/components/ui/glass-cta-button"
import { HeroCss3DIcon } from "@/components/hero-css-3d-icon"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const features = [
  {
    icon: Sparkles,
    title: "Beautiful by default",
    description:
      "Polished components with elegant spacing, typography, and motion out of the box.",
  },
  {
    icon: Zap,
    title: "Fast to build with",
    description:
      "Composable API and clean patterns that help you ship screens in hours, not days.",
  },
  {
    icon: Boxes,
    title: "Made for scale",
    description:
      "Reusable primitives designed for design systems, products, and open-source workflows.",
  },
]

const stats = [
  { label: "Components", value: "50+" },
  { label: "Themes", value: "Dark + Light" },
  { label: "Open Source", value: "MIT" },
]

const navLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/components", label: "Components" },
  { href: "/store", label: "Store" },
  { href: "/packs", label: "Packs" },
]

// Distinctive easing curves (smooth, not generic)
const ease = {
  smoothOut: [0.16, 1, 0.3, 1],
  smoothInOut: [0.65, 0, 0.35, 1],
  snap: [0.4, 0, 0.2, 1],
  gentle: [0.33, 1, 0.68, 1],
  softBack: [0.34, 1.56, 0.64, 1],
} as const

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 * i },
  }),
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.smoothOut },
  },
}

// Stats: rise with slight scale, center-first feel
const statsContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
}

const statsItem = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: ease.gentle },
  },
}

// Features: slide in from sides (left, center, right) + opacity
const featuresContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const featuresItem = (i: number) => ({
  hidden: {
    opacity: 0,
    x: i === 0 ? -36 : i === 1 ? 0 : 36,
    y: 12,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, ease: ease.smoothOut },
  },
})

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.smoothOut },
  },
}

// CTA: scale up softly with fade
const ctaVariants = {
  hidden: { opacity: 0, scale: 0.97, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.65, ease: ease.softBack },
  },
}

export function LandingPage() {
  const router = useRouter()
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.4])
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.98])
  const heroY = useTransform(scrollY, [0, 300], [0, 30])

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* Scroll-linked gradient: fades and shifts on scroll (Unseen-style) */}
      <motion.div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(56, 189, 248, 0.18), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(139, 92, 246, 0.12), transparent), radial-gradient(ellipse 50% 30% at 0% 80%, rgba(34, 197, 94, 0.07), transparent)",
        }}
      />

      {/* 3D GLB disabled: react-babylonjs was flooding the terminal. Re-enable in hero-glb-scene.tsx when fixed. */}

      {/* Subtle background shapes */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <motion.div
          className="absolute -right-[20%] top-[15%] h-[min(70vw,420px)] w-[min(70vw,420px)] rounded-[40%_60%_70%_30%_/40%_50%_60%_50%] opacity-[0.08] blur-3xl"
          style={{
            background: "linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(56, 189, 248, 0.3))",
            transform: "perspective(800px) rotateY(15deg) rotateX(-5deg)",
          }}
        />
        <motion.div
          className="absolute -left-[15%] bottom-[20%] h-[min(50vw,320px)] w-[min(50vw,320px)] rounded-[60%_40%_30%_70%_/60%_30%_70%_40%] opacity-[0.06] blur-3xl"
          style={{
            background: "linear-gradient(225deg, rgba(34, 197, 94, 0.4), rgba(56, 189, 248, 0.2))",
            transform: "perspective(800px) rotateY(-12deg) rotateX(8deg)",
          }}
        />
      </div>

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: ease.smoothOut }}
        className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md"
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-8">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-[var(--foreground)]"
          >
            sparkle/ui
          </Link>
          <div className="flex items-center gap-1 md:gap-2">
            {navLinks.map((link) => (
              <motion.div key={link.href} whileHover={{ y: -1 }} transition={{ duration: 0.2, ease: ease.snap }}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <a
              href="https://github.com/itschaidev-ui/ui"
              target="_blank"
              rel="noreferrer"
              className="rounded-md p-2 text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero — staggered entrance with distinct timing */}
      <section className="relative mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-6xl flex-col justify-center px-4 pb-16 pt-12 md:px-8 md:pt-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            className="mb-6 flex justify-center drop-shadow-md"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: ease.softBack, delay: 0.1 }}
          >
            <HeroCss3DIcon />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: ease.smoothOut, delay: 0.2 }}
          >
            <Badge
              variant="secondary"
              className="mb-5 inline-flex items-center gap-2 border-[var(--border)] bg-[var(--secondary)]/80 px-3.5 py-1.5 text-[var(--secondary-foreground)]"
            >
              <span className="inline-flex shrink-0" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--primary)]">
                  <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                </svg>
              </span>
              Open Source UI Library
            </Badge>
          </motion.div>
          <motion.h1
            className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: ease.smoothOut, delay: 0.32 }}
          >
            Build stunning interfaces with speed and consistency.
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl text-balance text-base text-[var(--muted-foreground)] sm:text-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: ease.smoothOut, delay: 0.45 }}
          >
            A modern component library for React teams that care about design,
            accessibility, and developer experience.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: ease.smoothOut, delay: 0.58 }}
          >
            <SparkleButton
              text="Get started"
              hoverText="View docs"
              enableHoverText
              enableLoadingState
              onClick={() => router.push("/auth")}
            />
          </motion.div>
          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: ease.smoothOut, delay: 0.72 }}
          >
            <Button asChild variant="ghost" size="sm" className="text-[var(--muted-foreground)]">
              <Link href="/components">Explore components</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="text-[var(--muted-foreground)]">
              <Link href="/packs">Browse packs</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats — rise + scale, staggered */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
        className="relative mx-auto max-w-6xl px-4 md:px-8"
      >
        <motion.div
          variants={statsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={statsItem}>
              <Card className="border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/5">
                <CardHeader className="pb-2">
                  <CardDescription>{stat.label}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Features — slide in from sides (L, C, R) + card hover lift */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
        className="relative mx-auto mt-20 max-w-6xl px-4 md:px-8"
      >
        <motion.div
          variants={featuresContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 md:mt-12 md:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={featuresItem(i)}
              whileHover={{ y: -4, transition: { duration: 0.25, ease: ease.snap } }}
              className="h-full"
            >
              <Card className="h-full border-[var(--border)] bg-[var(--card)]/80 transition-all duration-300 hover:border-[var(--primary)]/30 hover:shadow-xl hover:shadow-[var(--primary)]/5 backdrop-blur-sm">
                <CardHeader>
                  <motion.div
                    className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.2, ease: ease.snap }}
                  >
                    <feature.icon className="h-5 w-5" />
                  </motion.div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Bottom CTA — scale + soft overshoot */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={ctaVariants}
        className="relative mx-auto mt-24 max-w-6xl px-4 pb-16 md:px-8"
      >
        <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3, ease: ease.snap }}>
          <Card className="overflow-hidden border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--secondary)]/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-[var(--primary)]/5">
          <CardContent className="flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Ready to ship your next design system?
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Start building with sparkle/ui today.
              </h2>
            </div>
            <GlassCtaButton asChild icon={null}>
              <Link href="/auth">Try for Free</Link>
            </GlassCtaButton>
          </CardContent>
        </Card>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: ease.smoothOut }}
        className="relative border-t border-[var(--border)] bg-[var(--background)]"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 md:flex-row md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--muted-foreground)]">
            <Link href="/" className="font-medium text-[var(--foreground)]">
              sparkle/ui
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[var(--foreground)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="[.ui-social-media-button]:!max-w-[200px]">
            <SocialMediaButton
              preset="github"
              href="https://github.com/itschaidev-ui/ui"
              showCount
              showGitHubStar
            />
          </div>
        </div>
      </motion.footer>
    </main>
  )
}
