"use client"

import Link from "next/link"
import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { motion } from "motion/react"
import { Search, Home, BookOpen, LayoutDashboard, Package, Palette, Sparkles } from "lucide-react"

import { useThemePreview } from "@/components/theme-preview-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PACKS, getComponentName, type Pack, type PackTier } from "@/lib/packs"
import { UI_PACKS, type UiPack, type UiPackTier } from "@/lib/ui-packs"

const packTierConfig: Record<PackTier, { label: string; className: string }> = {
  free: {
    label: "Free",
    className: "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
  },
  pro: {
    label: "Pro",
    className: "border-violet-500/50 bg-violet-500/10 text-violet-400",
  },
  ads: {
    label: "With ads",
    className: "border-amber-500/50 bg-amber-500/10 text-amber-400",
  },
}

const uiPackTierConfig: Record<UiPackTier, { label: string; className: string }> = {
  free: {
    label: "Free",
    className: "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
  },
  paid: {
    label: "Paid",
    className: "border-violet-500/50 bg-violet-500/10 text-violet-400",
  },
}

type StoreSection = "home" | "components" | "ui-packs" | "components-page" | "dashboard"

function StoreSidebar({
  isLight,
  activeSection,
  setActiveSection,
}: {
  isLight: boolean
  activeSection: StoreSection
  setActiveSection: (section: StoreSection) => void
}) {
  const navItemClass = (active: boolean) =>
    `relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
      active
        ? isLight
          ? "text-black/90"
          : "text-white/95"
        : isLight
          ? "text-black/70 hover:bg-black/5 hover:translate-x-0.5"
          : "text-white/70 hover:bg-white/5 hover:translate-x-0.5"
    }`

  return (
    <aside
      className={`flex w-[13rem] shrink-0 flex-col border-r py-6 md:w-[14rem] ${
        isLight
          ? "border-black/10"
          : "border-white/10"
      }`}
    >
      <Link
        href="/"
        className={`mb-6 flex items-center gap-2 px-5 text-lg font-semibold tracking-tight transition hover:opacity-90 ${
          isLight ? "text-black/90" : "text-white/90"
        }`}
      >
        <Sparkles className="h-5 w-5 shrink-0 text-amber-400/90" />
        sparkle/ui
      </Link>
      <nav className="flex flex-1 flex-col gap-0.5 px-3">
        <Link href="/" className={navItemClass(activeSection === "home")} onClick={() => setActiveSection("home")}>
          {activeSection === "home" && (
            <motion.span
              layoutId="store-sidebar-active"
              className={`absolute inset-0 -z-10 rounded-lg ${
                isLight ? "bg-black/10" : "bg-white/10"
              }`}
              transition={{ type: "spring", stiffness: 360, damping: 30 }}
            />
          )}
          <Home className="h-4 w-4 shrink-0 opacity-80" />
          Home
        </Link>
        <div className="mt-3">
          <p
            className={`mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] ${
              isLight ? "text-black/45" : "text-white/45"
            }`}
          >
            Store
          </p>
          <Link href="/store#components" className={navItemClass(activeSection === "components")} onClick={() => setActiveSection("components")}>
            {activeSection === "components" && (
              <motion.span
                layoutId="store-sidebar-active"
                className={`absolute inset-0 -z-10 rounded-lg ${
                  isLight ? "bg-black/10" : "bg-white/10"
                }`}
                transition={{ type: "spring", stiffness: 360, damping: 30 }}
              />
            )}
            <Package className="h-4 w-4 shrink-0 opacity-80" />
            Component packs
          </Link>
          <Link href="/store#ui-packs" className={navItemClass(activeSection === "ui-packs")} onClick={() => setActiveSection("ui-packs")}>
            {activeSection === "ui-packs" && (
              <motion.span
                layoutId="store-sidebar-active"
                className={`absolute inset-0 -z-10 rounded-lg ${
                  isLight ? "bg-black/10" : "bg-white/10"
                }`}
                transition={{ type: "spring", stiffness: 360, damping: 30 }}
              />
            )}
            <Palette className="h-4 w-4 shrink-0 opacity-80" />
            UI packs
          </Link>
        </div>
        <div
          className="mt-5 border-t pt-4"
          style={{ borderColor: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)" }}
        >
          <Link href="/components" className={navItemClass(activeSection === "components-page")} onClick={() => setActiveSection("components-page")}>
            {activeSection === "components-page" && (
              <motion.span
                layoutId="store-sidebar-active"
                className={`absolute inset-0 -z-10 rounded-lg ${
                  isLight ? "bg-black/10" : "bg-white/10"
                }`}
                transition={{ type: "spring", stiffness: 360, damping: 30 }}
              />
            )}
            <BookOpen className="h-4 w-4 shrink-0 opacity-80" />
            Components
          </Link>
          <Link href="/dashboard" className={navItemClass(activeSection === "dashboard")} onClick={() => setActiveSection("dashboard")}>
            {activeSection === "dashboard" && (
              <motion.span
                layoutId="store-sidebar-active"
                className={`absolute inset-0 -z-10 rounded-lg ${
                  isLight ? "bg-black/10" : "bg-white/10"
                }`}
                transition={{ type: "spring", stiffness: 360, damping: 30 }}
              />
            )}
            <LayoutDashboard className="h-4 w-4 shrink-0 opacity-80" />
            Dashboard
          </Link>
        </div>
      </nav>
      <div className="mt-auto px-4 pt-6">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium ${
            isLight ? "bg-black/10 text-black/70" : "bg-white/10 text-white/70"
          }`}
        >
          N
        </div>
      </div>
    </aside>
  )
}

const cardHoverTransition = { type: "spring" as const, stiffness: 360, damping: 25 }
const cardTapTransition = { type: "spring" as const, stiffness: 500, damping: 30 }

function ComponentPackCard({
  pack,
  isLight,
  onEssentialPackOpen,
}: {
  pack: Pack
  isLight: boolean
  onEssentialPackOpen?: (event: ReactMouseEvent<HTMLButtonElement>) => void
}) {
  const config = packTierConfig[pack.tier]
  return (
    <div className="w-[260px] shrink-0" style={{ perspective: "1200px" }}>
      <motion.div
        className="h-full"
        whileHover={{
          y: -8,
          rotateX: 6,
          rotateY: -6,
          scale: 1.02,
          transition: cardHoverTransition,
        }}
        whileTap={{ scale: 0.98, transition: cardTapTransition }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Card
          className={`h-full overflow-hidden rounded-2xl border shadow-sm ${
            isLight
              ? "border-black/10 bg-white/45 hover:border-black/15 hover:shadow-xl"
              : "border-white/10 bg-black/55 hover:border-white/15 hover:shadow-xl"
          }`}
        >
          <div
            className="h-28 w-full shrink-0"
            style={{
              background: isLight
                ? "linear-gradient(135deg, rgba(255,160,85,0.2), rgba(139,92,246,0.15))"
                : "linear-gradient(135deg, rgba(255,152,35,0.25), rgba(139,92,246,0.2))",
            }}
          />
          <CardHeader className="p-4 pb-1">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base font-medium leading-tight">{pack.name}</CardTitle>
              <Badge variant="outline" className={`shrink-0 text-xs ${config.className}`}>
                {config.label}
              </Badge>
            </div>
            <CardDescription className="mt-1.5 line-clamp-2 text-xs leading-relaxed opacity-85">
              {pack.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            {pack.id === "essential-pack" ? (
              <Button
                size="sm"
                variant="secondary"
                className="w-full rounded-xl transition-colors duration-200"
                onClick={onEssentialPackOpen}
              >
                Open pack
              </Button>
            ) : (
              <Button
                asChild
                size="sm"
                variant="secondary"
                className="w-full rounded-xl transition-colors duration-200"
              >
                <Link href="https://www.npmjs.com/package/@chaidev/ui" target="_blank" rel="noopener noreferrer">
                  Download — npm
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function UiPackCardCompact({
  pack,
  isLight,
  onPreview,
}: {
  pack: UiPack
  isLight: boolean
  onPreview: (id: string) => void
}) {
  const config = uiPackTierConfig[pack.tier]
  return (
    <div className="w-[260px] shrink-0" style={{ perspective: "1200px" }}>
      <motion.div
        className="h-full"
        whileHover={{
          y: -8,
          rotateX: 6,
          rotateY: -6,
          scale: 1.02,
          transition: cardHoverTransition,
        }}
        whileTap={{ scale: 0.98, transition: cardTapTransition }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Card
          className={`h-full overflow-hidden rounded-2xl border shadow-sm ${
            isLight
              ? "border-black/10 bg-white/45 hover:border-black/15 hover:shadow-xl"
              : "border-white/10 bg-black/55 hover:border-white/15 hover:shadow-xl"
          }`}
        >
          <div
            className="h-28 w-full shrink-0"
            style={{
              background: isLight
                ? "radial-gradient(circle at 30% 30%, rgba(255,160,85,0.35), transparent 50%), linear-gradient(180deg, rgba(251,191,136,0.2), transparent)"
                : "radial-gradient(circle at 30% 30%, rgba(255,152,35,0.4), transparent 50%), linear-gradient(180deg, rgba(250,220,125,0.15), transparent)",
            }}
          />
          <CardHeader className="p-4 pb-1">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base font-medium leading-tight">{pack.name}</CardTitle>
              <Badge variant="outline" className={`shrink-0 text-xs ${config.className}`}>
                {config.label}
              </Badge>
            </div>
            <CardDescription className="mt-1.5 line-clamp-2 text-xs leading-relaxed opacity-85">
              {pack.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2 p-4 pt-2">
            <motion.div whileTap={{ scale: 0.97 }} transition={cardTapTransition}>
              <Button
                size="sm"
                className="flex-1 rounded-xl transition-colors duration-200"
                onClick={() => onPreview(pack.id)}
              >
                Preview
              </Button>
            </motion.div>
            <Button asChild size="sm" variant="outline" className="rounded-xl transition-colors duration-200">
              <Link
                href={pack.tier === "free" ? "/downloads/sunset-coding.css" : "#"}
                download={pack.tier === "free" ? "sunset-coding.css" : undefined}
              >
                Download
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

const FEATURED_UI_PACK = UI_PACKS[0]

export default function StorePage() {
  const { resolvedTheme } = useTheme()
  const { setPreviewThemeId } = useThemePreview()
  const router = useRouter()
  const isLight = resolvedTheme === "light"
  const [activeSection, setActiveSection] = useState<StoreSection>("components")

  useEffect(() => {
    const setFromHash = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash === "ui-packs") setActiveSection("ui-packs")
      else if (hash === "components") setActiveSection("components")
      else setActiveSection("components")
    }
    setFromHash()
    window.addEventListener("hashchange", setFromHash)
    return () => window.removeEventListener("hashchange", setFromHash)
  }, [])

  const handlePreview = (packId: string) => {
    setPreviewThemeId(packId)
  }

  const handleEssentialPackOpen = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    router.push("/store/essentialspack")
  }

  return (
    <main
      className={`relative flex h-screen w-full flex-col overflow-hidden text-[var(--foreground)] ${
        isLight
          ? "bg-[radial-gradient(circle_at_50%_72%,rgba(255,160,85,0.18),transparent_30%),linear-gradient(180deg,#f5f2eb_0%,#ece8e3_100%)]"
          : "bg-[radial-gradient(circle_at_50%_72%,rgba(255,152,35,0.28),transparent_30%),radial-gradient(circle_at_50%_40%,rgba(250,220,125,0.14),transparent_40%),radial-gradient(circle_at_top,#191922_0,#050509_58%,#020206_100%)]"
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
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        aria-hidden
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 120px)",
        }}
      />

      <div className="relative flex h-full min-h-0 w-full flex-1 p-2 md:p-3 lg:p-4">
        <motion.div
          layout
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`relative flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden rounded-[24px] p-3 backdrop-blur-xl md:flex-row md:items-stretch md:gap-4 md:p-4 ${
            isLight ? "bg-white/22" : "bg-black/24"
          }`}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[30px] opacity-60"
            aria-hidden
            style={{
              background: isLight
                ? "radial-gradient(circle at 20% 0%, rgba(255, 255, 255, 0.35), transparent 55%), radial-gradient(circle at 80% 10%, rgba(210, 220, 245, 0.2), transparent 55%), radial-gradient(circle at 50% 100%, rgba(251, 191, 136, 0.15), transparent 60%)"
                : "radial-gradient(circle at 20% 0%, rgba(244, 236, 220, 0.18), transparent 55%), radial-gradient(circle at 80% 10%, rgba(56, 189, 248, 0.16), transparent 55%), radial-gradient(circle at 50% 100%, rgba(251, 191, 136, 0.18), transparent 60%)",
            }}
          />

          <StoreSidebar isLight={isLight} activeSection={activeSection} setActiveSection={setActiveSection} />

          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
            <div
              className={`flex shrink-0 items-center gap-4 border-b px-6 py-4 ${
                isLight
                  ? "border-black/10 bg-transparent"
                  : "border-white/10 bg-transparent"
              }`}
            >
            <div
              className={`flex flex-1 items-center gap-3 rounded-full border px-5 py-3 transition-all duration-200 focus-within:ring-2 ${
                isLight
                  ? "border-black/12 bg-black/5 focus-within:ring-2 focus-within:ring-amber-400/25"
                  : "border-white/12 bg-white/5 focus-within:ring-2 focus-within:ring-amber-400/35"
              }`}
            >
              <Search
                className={`h-4 w-4 shrink-0 ${isLight ? "text-black/45" : "text-white/45"}`}
                aria-hidden
              />
              <input
                type="search"
                placeholder="Search for components and UI packs..."
                className={`w-full min-w-0 bg-transparent text-sm outline-none placeholder:opacity-55 ${
                  isLight ? "text-black" : "text-white"
                }`}
                aria-label="Search store"
              />
            </div>
          </div>

          <div className={`min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 lg:p-10 scroll-smooth ${
            isLight ? "bg-black/[0.02]" : "bg-black/[0.12]"
          }`}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12"
            >
              {/* Featured banner — hero for featured UI pack */}
              {FEATURED_UI_PACK && (
                <motion.section
                  className="overflow-hidden rounded-3xl"
                  style={{ perspective: "1400px" }}
                  whileHover={{
                    scale: 1.005,
                    transition: cardHoverTransition,
                  }}
                  whileTap={{ scale: 0.998, transition: cardTapTransition }}
                >
                  <motion.div
                    className={`grid min-h-[300px] grid-cols-1 border shadow-lg md:grid-cols-2 ${
                      isLight
                        ? "border-black/10 bg-white/35"
                        : "border-white/10 bg-black/50 backdrop-blur-sm"
                    }`}
                    whileHover={{
                      rotateX: 2,
                      rotateY: -2,
                      transition: cardHoverTransition,
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div
                      className="flex items-center justify-center p-8 md:p-12"
                      style={{
                        background: isLight
                          ? "radial-gradient(circle at 50% 50%, rgba(255,160,85,0.25), transparent 60%), linear-gradient(135deg, rgba(251,191,136,0.15), transparent)"
                          : "radial-gradient(circle at 50% 50%, rgba(255,152,35,0.35), transparent 60%), linear-gradient(135deg, rgba(250,220,125,0.12), transparent)",
                      }}
                    >
                      <div className="max-w-md">
                        <Badge
                          variant="secondary"
                          className={`mb-4 ${
                            isLight
                              ? "border-black/10 bg-black/10 text-black/80"
                              : "border-0 bg-amber-400/20 text-amber-200/95"
                          }`}
                        >
                          Featured
                        </Badge>
                        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                          {FEATURED_UI_PACK.name}
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed opacity-85">
                          {FEATURED_UI_PACK.description}
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                          <motion.div whileTap={{ scale: 0.97 }} transition={cardTapTransition}>
                            <Button
                              size="default"
                              className="rounded-xl transition-all duration-200 hover:opacity-95"
                              onClick={() => handlePreview(FEATURED_UI_PACK.id)}
                            >
                              Preview theme
                            </Button>
                          </motion.div>
                          <motion.div whileTap={{ scale: 0.97 }} transition={cardTapTransition}>
                            <Button
                              asChild
                              size="default"
                              variant="outline"
                              className="rounded-xl transition-all duration-200 hover:opacity-90"
                            >
                              <Link
                                href={FEATURED_UI_PACK.tier === "free" ? "/downloads/sunset-coding.css" : "#"}
                                download={FEATURED_UI_PACK.tier === "free" ? "sunset-coding.css" : undefined}
                              >
                                Download
                              </Link>
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="hidden min-h-[300px] md:block"
                      style={{
                        background: isLight
                          ? "linear-gradient(135deg, rgba(255,160,85,0.12) 0%, rgba(139,92,246,0.08) 100%)"
                          : "linear-gradient(135deg, rgba(255,152,35,0.2) 0%, rgba(139,92,246,0.15) 100%)",
                      }}
                    />
                  </motion.div>
                </motion.section>
              )}

              {/* Component packs horizontal scroll */}
              <section id="components" className="scroll-mt-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold tracking-tight">
                    Component packs
                  </h3>
                  <Link
                    href="/components"
                    className={`text-sm transition-colors ${
                      isLight ? "text-black/60 hover:text-black/85" : "text-white/60 hover:text-white/85"
                    }`}
                  >
                    View all →
                  </Link>
                </div>
                <div className="flex gap-5 overflow-x-auto pb-3 pr-1">
                  {PACKS.map((pack) => (
                    <ComponentPackCard
                      key={pack.id}
                      pack={pack}
                      isLight={isLight}
                      onEssentialPackOpen={pack.id === "essential-pack" ? handleEssentialPackOpen : undefined}
                    />
                  ))}
                </div>
              </section>

              {/* UI packs horizontal scroll */}
              <section id="ui-packs" className="scroll-mt-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold tracking-tight">UI packs</h3>
                  <span className="text-sm opacity-55">Full-site themes</span>
                </div>
                <div className="flex gap-5 overflow-x-auto pb-3 pr-1">
                  {UI_PACKS.map((pack) => (
                    <UiPackCardCompact
                      key={pack.id}
                      pack={pack}
                      isLight={isLight}
                      onPreview={handlePreview}
                    />
                  ))}
                </div>
              </section>
            </motion.div>
          </div>
        </div>
        </motion.div>
      </div>
    </main>
  )
}
