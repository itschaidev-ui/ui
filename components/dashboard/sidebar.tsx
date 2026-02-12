"use client"

import Link from "next/link"

const recipes = [
  {
    label: "Auth screen",
    prompt: "Design an auth screen with OAuthForm, SparkleButton, and a subtle gradient background.",
  },
  {
    label: "Marketing hero",
    prompt: "Create a landing hero with SparkleButton, SocialMediaButton, and stats cards.",
  },
  {
    label: "Dashboard overview",
    prompt: "Layout a dashboard with a hero, stats row, and three feature cards using sparkle/ui.",
  },
]

export function DashboardSidebar() {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/8 bg-black/40 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.75)] backdrop-blur-xl md:p-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200/80">Shortcuts</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/components"
            className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:border-white/40 hover:bg-white/10"
          >
            Explore components
          </Link>
          <Link
            href="/store"
            className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:border-white/40 hover:bg-white/10"
          >
            Store
          </Link>
          <Link
            href="/packs"
            className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:border-white/40 hover:bg-white/10"
          >
            Packs
          </Link>
          <Link
            href="/docs"
            className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:border-white/40 hover:bg-white/10"
          >
            Install docs
          </Link>
        </div>
      </div>

      <div className="mt-1 flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200/80">Recipes</p>
        <div className="mt-3 space-y-2 text-xs text-white/80">
          {recipes.map((recipe) => (
            <button
              key={recipe.label}
              type="button"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left transition hover:border-white/35 hover:bg-white/10"
              // For v1 these could prefill the chat input via a callback prop; wiring comes later.
            >
              <div className="font-medium text-white">{recipe.label}</div>
              <div className="mt-0.5 text-[0.7rem] text-white/70 line-clamp-2">{recipe.prompt}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

