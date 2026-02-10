"use client"

import { useState } from "react"
import { OAuthForm } from "@/components/ui/oauth-form"

const defaults = {
  title: "Welcome,",
  subtitle: "sign in to continue",
  emailPlaceholder: "Email",
  showGoogle: true,
  showGithub: true,
}

export function OAuthFormShowcase() {
  const [title, setTitle] = useState(defaults.title)
  const [subtitle, setSubtitle] = useState(defaults.subtitle)
  const [emailPlaceholder, setEmailPlaceholder] = useState(defaults.emailPlaceholder)
  const [showGoogle, setShowGoogle] = useState(defaults.showGoogle)
  const [showGithub, setShowGithub] = useState(defaults.showGithub)
  const [lastAction, setLastAction] = useState("None")

  const resetPreview = () => {
    setTitle(defaults.title)
    setSubtitle(defaults.subtitle)
    setEmailPlaceholder(defaults.emailPlaceholder)
    setShowGoogle(defaults.showGoogle)
    setShowGithub(defaults.showGithub)
    setLastAction("None")
  }

  return (
    <div className="text-[#e5e5e5]">
      <h1 className="text-3xl font-semibold tracking-tight">OAuth Form</h1>
      <p className="mt-2 text-sm text-[#777]">Styled sign-in form with OAuth actions and email continue flow.</p>

      <section className="mt-8 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide text-[#666]">Live Preview</p>
          <button
            type="button"
            onClick={resetPreview}
            className="rounded-md border border-[#343434] bg-[#101010] px-2.5 py-1 text-xs text-[#c8c8c8] transition hover:border-[#505050] hover:text-white"
          >
            Reset
          </button>
        </div>
        <div className="flex min-h-40 items-center justify-center rounded-xl border border-[#242424] bg-[#050505] p-8">
          <OAuthForm
            title={title}
            subtitle={subtitle}
            emailPlaceholder={emailPlaceholder}
            showGoogle={showGoogle}
            showGithub={showGithub}
            onGoogleClick={() => setLastAction("Google click")}
            onGithubClick={() => setLastAction("GitHub click")}
            onContinue={(email) => setLastAction(`Continue (${email || "empty"})`)}
          />
        </div>
        <p className="mt-3 text-xs text-[#8f8f8f]">Last action: {lastAction}</p>
      </section>

      <section className="mt-6 grid gap-5 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-6 md:grid-cols-2">
        <label className="rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <p className="mb-2 text-xs uppercase tracking-wide text-[#777]">Title</p>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-md border border-[#272727] bg-[#111] px-2.5 py-2 text-sm outline-none"
          />
        </label>
        <label className="rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <p className="mb-2 text-xs uppercase tracking-wide text-[#777]">Subtitle</p>
          <input
            value={subtitle}
            onChange={(event) => setSubtitle(event.target.value)}
            className="w-full rounded-md border border-[#272727] bg-[#111] px-2.5 py-2 text-sm outline-none"
          />
        </label>
        <label className="rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm md:col-span-2">
          <p className="mb-2 text-xs uppercase tracking-wide text-[#777]">Email Placeholder</p>
          <input
            value={emailPlaceholder}
            onChange={(event) => setEmailPlaceholder(event.target.value)}
            className="w-full rounded-md border border-[#272727] bg-[#111] px-2.5 py-2 text-sm outline-none"
          />
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={showGoogle} onChange={(event) => setShowGoogle(event.target.checked)} />
          Show Google Button
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[#1d1d1d] bg-[#0d0d0d] p-4 text-sm">
          <input type="checkbox" checked={showGithub} onChange={(event) => setShowGithub(event.target.checked)} />
          Show GitHub Button
        </label>
      </section>
    </div>
  )
}
