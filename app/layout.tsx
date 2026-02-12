import React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemePreviewProvider } from "@/components/theme-preview-provider"
import { ExitPreviewPill } from "@/components/exit-preview-pill"
import { SessionProvider } from "@/components/session-provider"

const _geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "sparkle/ui — Premium Animated Components",
  description: "A collection of beautiful, animated UI components for React. Open source.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${_geist.variable} ${_geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SessionProvider>
            <ThemePreviewProvider>
              <ExitPreviewPill />
              {children}
            </ThemePreviewProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
