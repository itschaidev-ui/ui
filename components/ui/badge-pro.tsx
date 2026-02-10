"use client"

import type { ReactNode } from "react"
import { X } from "lucide-react"
import "./badge-pro.css"

export type BadgeTone = "neutral" | "primary" | "success" | "warning" | "danger" | "info"
export type BadgeAppearance = "solid" | "soft" | "outline"
export type BadgeSize = "sm" | "md" | "lg"
export type BadgeAnimation = "pulse" | "glow" | "float" | "shimmer" | "wiggle"

export interface BadgeProProps {
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

export function BadgePro({
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
}: BadgeProProps) {
  const animations = Array.isArray(animation) ? animation : animation ? [animation] : []
  const animationClasses = animations.map((name) => `badge-pro--anim-${name}`).join(" ")
  return (
    <span
      className={`badge-pro badge-pro--${tone} badge-pro--${appearance} badge-pro--${size} ${animationClasses} ${
        className ?? ""
      }`}
    >
      {dot ? <span className="badge-pro__dot" /> : null}
      {icon ? <span className="badge-pro__icon">{icon}</span> : null}
      <span>{label}</span>
      {removable ? (
        <button
          type="button"
          className="badge-pro__remove"
          aria-label={`Remove ${label}`}
          onClick={onRemove}
        >
          <X className="h-3 w-3" />
        </button>
      ) : null}
    </span>
  )
}
