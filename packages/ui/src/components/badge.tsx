"use client"

import type { ReactNode } from "react"
import { X } from "lucide-react"
import "./badge.css"

export type BadgeTone = "neutral" | "primary" | "success" | "warning" | "danger" | "info"
export type BadgeAppearance = "solid" | "soft" | "outline"
export type BadgeSize = "sm" | "md" | "lg"
export type BadgeAnimation = "pulse" | "glow" | "float" | "shimmer" | "wiggle"

export interface BadgeProps {
  label: string
  tone?: BadgeTone
  appearance?: BadgeAppearance
  size?: BadgeSize
  dot?: boolean
  icon?: ReactNode
  removable?: boolean
  onRemove?: () => void
  animation?: BadgeAnimation | BadgeAnimation[]
  className?: string
}

export function Badge({
  label,
  tone = "neutral",
  appearance = "soft",
  size = "md",
  dot = false,
  icon,
  removable = false,
  onRemove,
  animation,
  className,
}: BadgeProps) {
  const animations = Array.isArray(animation) ? animation : animation ? [animation] : []
  const animationClasses = animations.map((name) => `ui-badge--anim-${name}`).join(" ")
  return (
    <span
      className={`ui-badge ui-badge--${tone} ui-badge--${appearance} ui-badge--${size} ${animationClasses} ${
        className ?? ""
      }`}
    >
      {dot ? <span className="ui-badge__dot" /> : null}
      {icon ? <span className="ui-badge__icon">{icon}</span> : null}
      <span>{label}</span>
      {removable ? (
        <button type="button" className="ui-badge__remove" aria-label={`Remove ${label}`} onClick={onRemove}>
          <X className="h-3 w-3" />
        </button>
      ) : null}
    </span>
  )
}
