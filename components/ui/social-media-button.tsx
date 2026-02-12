"use client"

import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react"
import { Github } from "lucide-react"
import "./social-media-button.css"

export type SocialMediaPresetName =
  | "custom"
  | "github"
  | "twitter"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "twitch"

export type SocialSweepEasingPreset = "smooth" | "snappy" | "dramatic" | "linear"

export const SOCIAL_SWEEP_EASING_PRESETS: Record<SocialSweepEasingPreset, string> = {
  smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
  snappy: "cubic-bezier(0.4, 0, 0.2, 1)",
  dramatic: "cubic-bezier(0.15, 0.85, 0.25, 1.1)",
  linear: "linear",
}

export interface SocialMediaPresetConfig {
  label: string
  href: string
  accentColor: string
  showCount?: boolean
  showGitHubStar?: boolean
  sweepEasingPreset?: SocialSweepEasingPreset
  sweepDurationMs?: number
}

export const DEFAULT_SOCIAL_MEDIA_PRESETS: Record<Exclude<SocialMediaPresetName, "custom">, SocialMediaPresetConfig> = {
  github: {
    label: "Star on GitHub",
    href: "https://github.com/itschaidev-ui/ui",
    accentColor: "#000000",
    showCount: true,
    showGitHubStar: true,
    sweepEasingPreset: "dramatic",
    sweepDurationMs: 980,
  },
  twitter: {
    label: "Follow on X",
    href: "https://x.com",
    accentColor: "#111111",
    sweepEasingPreset: "snappy",
    sweepDurationMs: 800,
  },
  instagram: {
    label: "Follow on Instagram",
    href: "https://instagram.com",
    accentColor: "#C13584",
    sweepEasingPreset: "smooth",
    sweepDurationMs: 1100,
  },
  linkedin: {
    label: "Connect on LinkedIn",
    href: "https://linkedin.com",
    accentColor: "#0A66C2",
    sweepEasingPreset: "smooth",
    sweepDurationMs: 900,
  },
  youtube: {
    label: "Subscribe on YouTube",
    href: "https://youtube.com",
    accentColor: "#FF0000",
    sweepEasingPreset: "snappy",
    sweepDurationMs: 860,
  },
  twitch: {
    label: "Follow on Twitch",
    href: "https://twitch.tv",
    accentColor: "#9146FF",
    sweepEasingPreset: "smooth",
    sweepDurationMs: 1040,
  },
}

export interface SocialMediaButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  preset?: SocialMediaPresetName
  presets?: Partial<Record<Exclude<SocialMediaPresetName, "custom">, Partial<SocialMediaPresetConfig>>>
  label?: string
  count?: number | string
  showCount?: boolean
  showSweep?: boolean
  showGitHubStar?: boolean
  sweepEasingPreset?: SocialSweepEasingPreset
  sweepEasing?: string
  sweepDurationMs?: number
  accentColor?: string
  icon?: ReactNode
}

export function SocialMediaButton({
  preset = "custom",
  presets,
  label,
  count = 0,
  showCount,
  showSweep = true,
  showGitHubStar,
  sweepEasingPreset,
  sweepEasing,
  sweepDurationMs,
  accentColor,
  icon,
  href,
  className,
  ...props
}: SocialMediaButtonProps) {
  const resolvedPreset =
    preset !== "custom"
      ? {
          ...DEFAULT_SOCIAL_MEDIA_PRESETS[preset],
          ...(presets?.[preset] ?? {}),
        }
      : null

  const resolvedLabel = label ?? resolvedPreset?.label ?? "Follow"
  const resolvedHref = href ?? resolvedPreset?.href ?? "#"
  const resolvedAccent = accentColor ?? resolvedPreset?.accentColor ?? "#000000"
  const resolvedShowCount = showCount ?? resolvedPreset?.showCount ?? false
  const resolvedShowGitHubStar = showGitHubStar ?? resolvedPreset?.showGitHubStar ?? false
  const resolvedSweepEasingPreset = sweepEasingPreset ?? resolvedPreset?.sweepEasingPreset ?? "smooth"
  const resolvedSweepEasing = sweepEasing ?? SOCIAL_SWEEP_EASING_PRESETS[resolvedSweepEasingPreset]
  const resolvedSweepDurationMs = sweepDurationMs ?? resolvedPreset?.sweepDurationMs ?? 1000

  const style = {
    "--social-accent": resolvedAccent,
    "--social-sweep-easing": resolvedSweepEasing,
    "--social-sweep-duration": `${resolvedSweepDurationMs}ms`,
  } as CSSProperties

  return (
    <a
      href={resolvedHref}
      style={style}
      className={`ui-social-media-button ${className ?? ""}`}
      target={resolvedHref.startsWith("http") ? "_blank" : props.target}
      rel={resolvedHref.startsWith("http") ? "noreferrer" : props.rel}
      {...props}
    >
      {showSweep ? <span className="ui-social-media-button__sweep" /> : null}

      <span className="ui-social-media-button__left">
        <span className="ui-social-media-button__icon">
          {icon ?? (preset === "github" ? <Github size={18} strokeWidth={2} /> : <span className="ui-social-media-button__icon-fallback">S</span>)}
        </span>
        <span className="ui-social-media-button__label">{resolvedLabel}</span>
      </span>

      {resolvedShowCount ? (
        <span className="ui-social-media-button__count-wrap">
          {resolvedShowGitHubStar ? (
            <svg className="ui-social-media-button__star-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                clipRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                fillRule="evenodd"
              />
            </svg>
          ) : null}
          <span className="ui-social-media-button__count">{count}</span>
        </span>
      ) : null}
    </a>
  )
}
