"use client"

import { signIn } from "next-auth/react"
import { OAuthForm } from "@/components/ui/oauth-form"

export default function AuthPage() {
  return (
    <main
      className="relative min-h-screen text-[#e8e8e8]"
      style={{
        background:
          "linear-gradient(160deg, #080810 0%, #0a0a12 35%, #0c0e14 70%, #080810 100%), radial-gradient(ellipse 120% 90% at 15% 15%, rgba(129, 140, 248, 0.14) 0%, transparent 45%), radial-gradient(ellipse 90% 110% at 85% 25%, rgba(34, 211, 238, 0.11) 0%, transparent 45%), radial-gradient(ellipse 85% 80% at 65% 85%, rgba(251, 191, 136, 0.1) 0%, transparent 45%)",
      }}
    >
      {/* Subtle grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-12 md:px-8">
        <div
          className="w-full max-w-md space-y-7 rounded-2xl border border-white/[0.06] bg-[#0c0c0f]/88 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl md:p-10"
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-300/70">
              Sign in
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Sign in to sparkle/ui
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Use your Google account or continue with email. NextAuth with your
              custom OAuth form.
            </p>
          </div>

          <OAuthForm
            onGoogleClick={() => {
              void signIn("google", { callbackUrl: "/dashboard" })
            }}
            showGithub={false}
          />
        </div>
      </div>
    </main>
  )
}

