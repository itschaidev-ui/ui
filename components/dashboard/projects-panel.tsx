"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useSession } from "next-auth/react"

import { Input } from "@/components/ui/input"
import { useDashboard } from "@/components/dashboard/dashboard-context"

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function NavIcon({ path }: { path: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-80"
      aria-hidden
    >
      <path d={path} />
    </svg>
  )
}

export function ProjectsPanel() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const { data: session, status } = useSession()
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    chats,
    currentChatId,
    setCurrentChatId,
    loadChats,
  } = useDashboard()
  const [searchQuery, setSearchQuery] = useState("")
  const isLight = resolvedTheme === "light"

  useEffect(() => {
    if (status === "authenticated") loadChats()
  }, [status, loadChats])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  if (sidebarCollapsed) {
    return (
      <div
        className={`flex h-full w-12 flex-col items-center rounded-2xl py-4 backdrop-blur-2xl ${
          isLight
            ? "border border-black/8 bg-black/[0.02]"
            : "border border-white/6 bg-white/[0.03]"
        }`}
      >
        <button
          type="button"
          onClick={() => setSidebarCollapsed(false)}
          className={`flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-[0.62rem] transition ${
            isLight
              ? "text-black/60 hover:bg-black/[0.06] hover:text-black/80"
              : "text-white/70 hover:bg-white/10 hover:text-white"
          }`}
          aria-label="Expand sidebar"
          title="Expand projects"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="[writing-mode:vertical-rl] rotate-180 tracking-[0.12em]">Projects</span>
        </button>
      </div>
    )
  }

  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl p-4 backdrop-blur-2xl md:p-5 ${
        isLight
          ? "border border-black/8 bg-white/50"
          : "border border-white/8 bg-white/[0.03]"
      }`}
    >
      <button
        type="button"
        onClick={() => setSidebarCollapsed(true)}
        className="absolute -right-3 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/80 shadow-lg backdrop-blur-sm transition hover:border-white/40 hover:bg-white/10 hover:text-white"
        aria-label="Collapse sidebar"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>

      <header className="mb-4 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p
            className={`truncate text-[1.02rem] ${isLight ? "text-black/78" : "text-white/85"}`}
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Discourse
          </p>
          <p className={`mt-0.5 text-[0.64rem] ${isLight ? "text-black/52" : "text-white/62"}`}>discourse-fast-2.5</p>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className={`rounded-md px-2 py-1 text-[0.62rem] font-medium transition ${
            isLight
              ? "border border-black/10 bg-black/[0.03] text-black/62 hover:bg-black/[0.06]"
              : "border border-white/15 bg-white/10 text-white/78 hover:border-white/35 hover:bg-white/15"
          }`}
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </header>

      <div className="mb-3 space-y-1.5">
        {[
          { label: "Search", icon: "m21 21-4.34-4.34 M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" },
          { label: "Projects", icon: "M4 6h7v7H4z M13 6h7v7h-7z M4 15h7v3H4z M13 15h7v3h-7z" },
          { label: "Settings", icon: "M12 3v3 M12 18v3 M3 12h3 M18 12h3 M5.64 5.64l2.12 2.12 M16.24 16.24l2.12 2.12 M18.36 5.64l-2.12 2.12 M7.76 16.24l-2.12 2.12" },
        ].map((item, index) => (
          <button
            key={item.label}
            type="button"
            className={`flex h-8 w-full items-center gap-2 rounded-md px-2 text-[0.68rem] transition ${
              index === 2
                ? isLight
                  ? "bg-black/10 text-black/80"
                  : "bg-white/12 text-white"
                : isLight
                  ? "text-black/62 hover:bg-black/[0.06]"
                  : "text-white/65 hover:bg-white/[0.06]"
            }`}
          >
            <NavIcon path={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mb-2">
        <Input
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`h-8 rounded-md px-2 text-[0.68rem] focus-visible:ring-indigo-400 ${
            isLight
              ? "border-black/10 bg-black/[0.03] text-black/75 placeholder:text-black/35"
              : "border-white/15 bg-black/20 text-white placeholder:text-white/35"
          }`}
        />
      </div>

      <div className={`mb-2 text-[0.62rem] uppercase tracking-[0.11em] ${isLight ? "text-black/42" : "text-white/45"}`}>Chats</div>

      <div className={`flex-1 space-y-1 overflow-y-auto pr-1 text-xs ${isLight ? "text-black/75" : "text-white/80"}`}>
        {status === "authenticated" && (
          <button
            type="button"
            onClick={() => setCurrentChatId(null)}
            className={`w-full rounded-md border px-2.5 py-2 text-left transition ${
              currentChatId === null
                ? isLight
                  ? "border-black/14 bg-black/[0.06] text-black/85"
                  : "border-white/20 bg-white/[0.08] text-white"
                : isLight
                  ? "border-black/8 bg-transparent text-black/62 hover:bg-black/[0.04]"
                  : "border-white/8 bg-transparent text-white/67 hover:bg-white/[0.04]"
            }`}
          >
            <span className="line-clamp-1 text-[0.68rem]">New chat</span>
          </button>
        )}
        {status === "authenticated" &&
          chats
            .filter((c) => !searchQuery.trim() || c.title.toLowerCase().includes(searchQuery.trim().toLowerCase()))
            .map((chat) => (
              <button
                key={chat.id}
                type="button"
                onClick={() => setCurrentChatId(chat.id)}
                className={`w-full rounded-md border px-2.5 py-2 text-left transition ${
                  currentChatId === chat.id
                    ? isLight
                      ? "border-black/14 bg-black/[0.06] text-black/85"
                      : "border-white/20 bg-white/[0.08] text-white"
                    : isLight
                      ? "border-black/8 bg-transparent text-black/62 hover:bg-black/[0.04]"
                      : "border-white/8 bg-transparent text-white/67 hover:bg-white/[0.04]"
                }`}
              >
                <span className="line-clamp-1 text-[0.68rem]">{chat.title}</span>
              </button>
            ))}
        {status === "unauthenticated" && (
          <p className={`rounded-md border border-dashed px-2.5 py-3 text-[0.68rem] ${isLight ? "border-black/15 text-black/55" : "border-white/15 text-white/55"}`}>
            <Link href="/auth" className="underline hover:opacity-90">
              Sign in
            </Link>{" "}
            to save your chats to your account.
          </p>
        )}
      </div>

      <footer
        className={`mt-4 border-t pt-3 text-[0.68rem] ${isLight ? "border-black/10 text-black/50" : "border-white/10 text-white/60"}`}
      >
        <div className="flex items-center justify-between">
          <Link href="/components" className="hover:text-white">
            Explore components
          </Link>
          <Link href="/settings" className="opacity-60 hover:opacity-100">
            Settings
          </Link>
        </div>
      </footer>
    </div>
  )
}
