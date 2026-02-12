"use client"

import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"
import { getUiPackById, UI_PACKS } from "@/lib/ui-packs"

type ThemePreviewContextValue = {
  previewThemeId: string | null
  setPreviewThemeId: (id: string | null) => void
}

const ThemePreviewContext = createContext<ThemePreviewContextValue | null>(null)

export function useThemePreview() {
  const ctx = useContext(ThemePreviewContext)
  if (!ctx) {
    throw new Error("useThemePreview must be used within ThemePreviewProvider")
  }
  return ctx
}

export function ThemePreviewProvider({ children }: { children: ReactNode }) {
  const [previewThemeId, setPreviewThemeIdState] = useState<string | null>(null)

  const setPreviewThemeId = useCallback((id: string | null) => {
    setPreviewThemeIdState(id)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (!previewThemeId) {
      root.removeAttribute("data-theme-preview")
      UI_PACKS.forEach((p) => root.classList.remove(p.themeClass))
      UI_PACKS.forEach((p) => {
        if (p.cssVariables) {
          Object.keys(p.cssVariables).forEach((key) => root.style.removeProperty(key))
        }
      })
      return
    }

    const pack = getUiPackById(previewThemeId)
    if (!pack) return

    root.setAttribute("data-theme-preview", pack.id)
    root.classList.add(pack.themeClass)
    if (pack.cssVariables) {
      Object.entries(pack.cssVariables).forEach(([key, value]) => {
        root.style.setProperty(key, value)
      })
    }

    return () => {
      root.removeAttribute("data-theme-preview")
      root.classList.remove(pack.themeClass)
      if (pack.cssVariables) {
        Object.keys(pack.cssVariables).forEach((key) => root.style.removeProperty(key))
      }
    }
  }, [previewThemeId])

  return (
    <ThemePreviewContext.Provider value={{ previewThemeId, setPreviewThemeId }}>
      {children}
    </ThemePreviewContext.Provider>
  )
}
