"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"
import { AnimatePresence, motion } from "motion/react"

import { useDashboard } from "@/components/dashboard/dashboard-context"
import { ChatAssistant } from "@/components/dashboard/chat-assistant"
import { ProjectsPanel } from "@/components/dashboard/projects-panel"
import { PreviewPanel } from "@/components/dashboard/preview-panel"
import { DashboardProvider } from "@/components/dashboard/dashboard-context"

function DashboardContent() {
  const { mode, sidebarCollapsed, setSidebarCollapsed, isGenerating, generatedCode } = useDashboard()
  const { resolvedTheme } = useTheme()
  const isLight = resolvedTheme === "light"
  const isAgent = mode === "agent"
  const showAgentSplit = isAgent && (isGenerating || Boolean(generatedCode))
  const showProjectsSidebar = !isAgent || showAgentSplit

  useEffect(() => {
    if (showAgentSplit) {
      setSidebarCollapsed(true)
    }
  }, [showAgentSplit, setSidebarCollapsed])

  useEffect(() => {
    if (mode === "conversation") {
      setSidebarCollapsed(false)
    }
  }, [mode, setSidebarCollapsed])

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
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        aria-hidden
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 220px, rgba(255,255,255,0.03) 220px 221px, transparent 221px 440px)",
        }}
      />

      <div className="relative flex h-full min-h-0 w-full flex-1 p-2 md:p-3 lg:p-4">
        <motion.div
          layout
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`relative flex h-full min-h-0 w-full flex-1 flex-col gap-4 overflow-hidden rounded-[24px] border p-3 backdrop-blur-xl md:flex-row md:items-stretch md:gap-4 md:p-4 ${
            isLight
              ? "border-black/10 bg-white/24"
              : "border-white/10 bg-black/24"
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

          <AnimatePresence initial={false}>
            {showProjectsSidebar && (
              <motion.aside
                layout
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex-shrink-0 transition-all duration-300 ease-out ${
                sidebarCollapsed
                  ? "mb-4 w-12 md:mb-0"
                  : `mb-4 w-full md:mb-0 ${
                      isAgent ? "md:w-[15rem] lg:w-[15.5rem]" : "md:w-[15.5rem] lg:w-[16.5rem]"
                    }`
              }`}
              >
              <ProjectsPanel />
              </motion.aside>
            )}
          </AnimatePresence>

          <motion.div
            layout
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex min-h-0 flex-1 flex-col ${
              showAgentSplit ? "w-full md:w-[23rem] lg:w-[24rem]" : "flex-1"
            }`}
          >
            <ChatAssistant />
          </motion.div>

          <AnimatePresence initial={false}>
            {showAgentSplit && (
              <motion.aside
                layout
                initial={{ opacity: 0, x: 24, scale: 0.985 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 24, scale: 0.985 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative mt-4 h-full min-h-0 w-full flex-1 shrink-0 md:mt-0"
              >
                <PreviewPanel />
              </motion.aside>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  )
}

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  )
}
