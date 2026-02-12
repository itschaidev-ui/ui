"use client"

import { useThemePreview } from "@/components/theme-preview-provider"
import { getUiPackById } from "@/lib/ui-packs"
import { motion, AnimatePresence } from "motion/react"

export function ExitPreviewPill() {
  const { previewThemeId, setPreviewThemeId } = useThemePreview()
  const pack = previewThemeId ? getUiPackById(previewThemeId) : null

  if (!previewThemeId || !pack) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-1/2 z-[100] -translate-x-1/2"
      >
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 shadow-lg backdrop-blur-md">
          <span className="text-xs font-medium text-white/90">
            Preview: {pack.name}
          </span>
          <button
            type="button"
            onClick={() => setPreviewThemeId(null)}
            className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white transition hover:bg-white/25"
          >
            Exit preview
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
