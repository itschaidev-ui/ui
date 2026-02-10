"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, useScroll, useTransform } from "motion/react"
import { Boxes, Github, Palette, Sparkles, Zap } from "lucide-react"

import { SparkleButton } from "@/components/ui/sparkle-button"
import { SocialMediaButton } from "@/components/ui/social-media-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  { href: "/packs", label: "Packs" },
]

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
  }),
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
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

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
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
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
              >
                {link.label}
              </Link>
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

      {/* Hero */}
      <section className="relative mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-6xl flex-col justify-center px-4 pb-16 pt-12 md:px-8 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <Badge
            variant="secondary"
            className="mb-5 inline-flex items-center gap-2 border-[var(--border)] bg-[var(--secondary)]/80 px-3.5 py-1.5 text-[var(--secondary-foreground)]"
          >
            <span
              className="inline-flex shrink-0"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
                transform: "perspective(120px) rotateY(-8deg) rotateX(4deg)",
              }}
              aria-hidden
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--primary)]">
                <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
              </svg>
            </span>
            Open Source UI Library
          </Badge>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Build stunning interfaces with speed and consistency.
          </h1>
          <p className="mt-5 max-w-xl text-balance text-base text-[var(--muted-foreground)] sm:text-lg">
            A modern component library for React teams that care about design,
            accessibility, and developer experience.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <div className="flex shrink-0 [.sparkle-btn-wrapper]:!block">
              <SparkleButton
                text="Get started"
                hoverText="View docs"
                enableHoverText
                enableLoadingState
                onClick={() => router.push("/docs")}
              />
            </div>
            <div className="w-full min-w-0 shrink-0 sm:w-auto [.ui-social-media-button]:!max-w-[220px]">
              <SocialMediaButton
                preset="github"
                href="https://github.com/itschaidev-ui/ui"
                showCount
                showGitHubStar
              />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="ghost" size="sm" className="text-[var(--muted-foreground)]">
              <Link href="/components">Explore components</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="text-[var(--muted-foreground)]">
              <Link href="/packs">Browse packs</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Stats - scroll in */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
        className="relative mx-auto max-w-6xl px-4 md:px-8"
      >
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={item}>
              <Card className="border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-sm">
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

      {/* Features - scroll in with stagger */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
        className="relative mx-auto mt-20 max-w-6xl px-4 md:px-8"
      >
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 md:mt-12 md:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={item}>
              <Card className="h-full border-[var(--border)] bg-[var(--card)]/80 transition-colors hover:border-[var(--primary)]/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                    <feature.icon className="h-5 w-5" />
                  </div>
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

      {/* Bottom CTA - scroll in */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="relative mx-auto mt-24 max-w-6xl px-4 pb-24 md:px-8"
      >
        <Card className="overflow-hidden border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--secondary)]/30">
          <CardContent className="flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Ready to ship your next design system?
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Start building with sparkle/ui today.
              </h2>
            </div>
            <Button asChild size="lg">
              <Link href="/docs">
                Get started
                <Palette className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.section>
    </main>
  )
}
