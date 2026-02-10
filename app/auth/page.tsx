"use client"

import { signIn } from "next-auth/react"
import { OAuthForm } from "@chaidev/ui"

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#e5e5e5]">
      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-10 md:px-8">
        <div className="space-y-6 rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-8 md:p-10">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#777]">Sign in</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              Sign in to sparkle/ui
            </h1>
            <p className="mt-2 max-w-md text-sm text-[#8f8f8f]">
              Use your Google account or continue with email. This uses NextAuth
              under the hood, with your custom OAuth form UI.
            </p>
          </div>

          <OAuthForm
            onGoogleClick={() => {
              void signIn("google")
            }}
            showGithub={false}
          />
        </div>
      </div>
    </main>
  )
}

