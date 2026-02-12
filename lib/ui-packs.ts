/**
 * UI packs: full-site themes (e.g. Sunset Coding). Some free, future ones paid.
 * Theme payload drives site-wide preview and optional download.
 */

export type UiPackTier = "free" | "paid"

export type UiPack = {
  id: string
  name: string
  description: string
  tier: UiPackTier
  /** Class applied to html when this theme is active (e.g. data-theme-preview or class) */
  themeClass: string
  /** Optional CSS variable overrides; applied by ThemePreviewProvider when preview is active */
  cssVariables?: Record<string, string>
}

export const UI_PACKS: UiPack[] = [
  {
    id: "sunset-coding",
    name: "Sunset Coding",
    description: "Futuristic sunset vibe for dashboards and coding UIs. Warm gradients, dark base, subtle noise and grid.",
    tier: "free",
    themeClass: "theme-preview-sunset-coding",
    cssVariables: {
      "--ui-pack-bg-dark":
        "radial-gradient(circle at 50% 72%, rgba(255,152,35,0.28), transparent 30%), radial-gradient(circle at 50% 40%, rgba(250,220,125,0.14), transparent 40%), radial-gradient(circle at top, #191922 0, #050509 58%, #020206 100%)",
      "--ui-pack-bg-light":
        "radial-gradient(circle at 50% 72%, rgba(255,160,85,0.18), transparent 30%), linear-gradient(180deg, #f5f2eb 0%, #ece8e3 100%)",
      "--ui-pack-panel-bg-dark": "rgba(0,0,0,0.2)",
      "--ui-pack-panel-bg-light": "rgba(255,255,255,0.22)",
      "--ui-pack-overlay-inner-dark":
        "radial-gradient(circle at 20% 0%, rgba(244, 236, 220, 0.18), transparent 55%), radial-gradient(circle at 80% 10%, rgba(56, 189, 248, 0.16), transparent 55%), radial-gradient(circle at 50% 100%, rgba(251, 191, 136, 0.18), transparent 60%)",
      "--ui-pack-overlay-inner-light":
        "radial-gradient(circle at 20% 0%, rgba(255, 255, 255, 0.35), transparent 55%), radial-gradient(circle at 80% 10%, rgba(210, 220, 245, 0.2), transparent 55%), radial-gradient(circle at 50% 100%, rgba(251, 191, 136, 0.15), transparent 60%)",
    },
  },
]

export function getUiPackById(id: string): UiPack | undefined {
  return UI_PACKS.find((p) => p.id === id)
}

export function getFreeUiPacks(): UiPack[] {
  return UI_PACKS.filter((p) => p.tier === "free")
}
