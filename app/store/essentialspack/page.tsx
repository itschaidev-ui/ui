"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

import { PACKS, getComponentName } from "@/lib/packs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function EssentialsPackPage() {
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const pack = PACKS.find((item) => item.id === "essential-pack")
  const [isClosing, setIsClosing] = useState(false)
  const [closingTarget, setClosingTarget] = useState<string | null>(null)
  const isLight = resolvedTheme === "light"

  useEffect(() => {
    if (!isClosing || !closingTarget) return
    const id = window.setTimeout(() => {
      router.push(closingTarget)
    }, 360)
    return () => window.clearTimeout(id)
  }, [isClosing, closingTarget, router])

  const closeUpTo = (target: string) => {
    setClosingTarget(target)
    setIsClosing(true)
  }

  if (!pack) {
    return (
      <main
        className={`min-h-screen px-6 py-12 ${
          isLight
            ? "bg-[linear-gradient(180deg,#f5f2eb_0%,#ece8e3_100%)] text-black/85"
            : "bg-[radial-gradient(circle_at_top,#191922_0,#050509_58%,#020206_100%)] text-white/90"
        }`}
      >
        <p>Essential Pack is not available.</p>
        <Button className="mt-4" onClick={() => closeUpTo("/store")}>
          Back to store
        </Button>
      </main>
    )
  }

  return (
    <motion.main
      className={`relative min-h-screen overflow-hidden ${
        isLight
          ? "bg-[radial-gradient(circle_at_50%_72%,rgba(255,160,85,0.18),transparent_30%),linear-gradient(180deg,#f5f2eb_0%,#ece8e3_100%)] text-black/85"
          : "bg-[radial-gradient(circle_at_50%_72%,rgba(255,152,35,0.28),transparent_30%),radial-gradient(circle_at_50%_40%,rgba(250,220,125,0.14),transparent_40%),radial-gradient(circle_at_top,#191922_0,#050509_58%,#020206_100%)] text-white/92"
      }`}
      initial={{ y: "-100%", opacity: 0.9 }}
      animate={isClosing ? { y: "-100%", opacity: 0.9 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity" }}
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
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 220px, rgba(255,255,255,0.03) 220px 221px, transparent 221px 440px)",
        }}
      />

      <div className="relative px-2 py-3 md:px-3 lg:px-4">
        <motion.section
          initial={false}
          className={`mx-auto min-h-[calc(100vh-1.5rem)] w-full max-w-[1220px] overflow-hidden rounded-[24px] border shadow-xl backdrop-blur-xl transition-shadow ${
            isLight
              ? "border-black/10 bg-white/24 shadow-[0_24px_48px_rgba(0,0,0,0.06)]"
              : "border-white/10 bg-black/24 shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
          }`}
        >
          <div className="flex min-h-0 flex-1 flex-col p-5 md:p-7 lg:p-10">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <Badge
                  variant="outline"
                  className={
                    isLight
                      ? "border-emerald-600/30 bg-emerald-500/10 text-emerald-800 font-medium"
                      : "border-emerald-500/45 bg-emerald-500/12 text-emerald-300 font-medium shadow-[0_0_20px_rgba(52,211,153,0.08)]"
                  }
                >
                  Essential Pack
                </Badge>
                <h1
                  className={`text-4xl font-medium tracking-tight md:text-5xl ${isLight ? "text-black/88" : "text-white/96"}`}
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {pack.name}
                </h1>
                <p className={`max-w-2xl text-[0.9375rem] leading-relaxed ${isLight ? "text-black/58" : "text-white/65"}`}>
                  {pack.description}
                </p>
                <div
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-mono text-[0.75rem] transition ${
                    isLight
                      ? "border-black/12 bg-black/[0.04] text-black/72 hover:border-black/18 hover:bg-black/[0.06]"
                      : "border-white/12 bg-white/[0.05] text-white/78 hover:border-white/20 hover:bg-white/[0.08]"
                  }`}
                >
                  <span className="select-all">sparkle-ui add essentials-pack</span>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
                <Button
                  variant="outline"
                  className={`transition-all duration-200 ${
                    isLight
                      ? "border-black/12 bg-white/80 text-black/72 hover:border-black/20 hover:bg-white hover:shadow-md"
                      : "border-white/18 bg-white/[0.06] text-white/88 hover:border-white/30 hover:bg-white/[0.1] hover:shadow-lg hover:shadow-black/20"
                  }`}
                  onClick={() => closeUpTo("/store")}
                >
                  Back to store
                </Button>
                <Button
                  className={
                    isLight
                      ? "bg-black text-white shadow-md hover:bg-black/90 hover:shadow-lg"
                      : "bg-white text-black shadow-lg hover:bg-white/95 hover:shadow-xl hover:shadow-black/15"
                  }
                  onClick={() => closeUpTo("/components")}
                >
                  Open components
                </Button>
              </div>
            </div>

            <div
              className={`rounded-2xl border p-5 md:p-6 ${
                isLight
                  ? "border-black/8 bg-white/55 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                  : "border-white/[0.08] bg-black/25 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
              }`}
            >
              <div className="mb-4">
                <h2
                  className={`text-[1.0625rem] font-semibold tracking-tight ${isLight ? "text-black/88" : "text-white/96"}`}
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  Included components
                </h2>
                <p className={`mt-1 text-[0.8125rem] ${isLight ? "text-black/52" : "text-white/56"}`}>
                  These are available in this pack.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {pack.componentIds.map((componentId) => (
                  <motion.div
                    key={componentId}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.995 }}
                    className={`group flex cursor-default items-center justify-between rounded-xl border px-4 py-3 text-sm transition-all duration-200 ${
                      isLight
                        ? "border-black/10 bg-white/80 text-black/80 shadow-sm hover:border-black/16 hover:bg-white hover:shadow-md"
                        : "border-white/10 bg-white/[0.04] text-white/88 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-black/25"
                    }`}
                  >
                    <span className="font-medium">{getComponentName(componentId)}</span>
                    <span
                      className={`text-[0.6875rem] uppercase tracking-wider transition-opacity duration-200 group-hover:opacity-100 ${
                        isLight ? "text-black/40 opacity-60" : "text-white/45 opacity-70"
                      }`}
                    >
                      included
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 md:hidden">
              <Button
                className={isLight ? "bg-black text-white" : "bg-white text-black"}
                onClick={() => closeUpTo("/components")}
              >
                Open components
              </Button>
              <Button
                variant="outline"
                className={isLight ? "border-black/12 bg-white/80" : "border-white/18 bg-white/[0.06]"}
                onClick={() => closeUpTo("/store")}
              >
                Back to store
              </Button>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.main>
  )
}
