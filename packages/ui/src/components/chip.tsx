"use client"

import type { ReactNode } from "react"
import "./chip.css"

export type ChipTone = "neutral" | "primary" | "success" | "warning" | "danger"
export type ChipAppearance = "soft" | "solid" | "outline"
export type ChipSize = "sm" | "md" | "lg"

export interface ChipProps {
  label: string
  tone?: ChipTone
  appearance?: ChipAppearance
  size?: ChipSize
  selected?: boolean
  icon?: ReactNode
  removable?: boolean
  onRemove?: () => void
  onClick?: () => void
  disabled?: boolean
  animated?: boolean
  className?: string
}

export function Chip({
  label,
  tone = "neutral",
  appearance = "soft",
  size = "md",
  selected = false,
  icon,
  removable = false,
  onRemove,
  onClick,
  disabled = false,
  animated = false,
  className,
}: ChipProps) {
  const interactive = typeof onClick === "function"

  return (
    <span
      className={`ui-chip ui-chip--${tone} ui-chip--${appearance} ui-chip--${size} ${
        selected ? "ui-chip--selected" : ""
      } ${disabled ? "ui-chip--disabled" : ""} ${animated ? "ui-chip--animated" : ""} ${className ?? ""}`}
    >
      {interactive ? (
        <button type="button" className="ui-chip__button" onClick={onClick} disabled={disabled}>
          {icon ? <span className="ui-chip__icon">{icon}</span> : null}
          <span>{label}</span>
        </button>
      ) : (
        <span className="ui-chip__button ui-chip__button--static">
          {icon ? <span className="ui-chip__icon">{icon}</span> : null}
          <span>{label}</span>
        </span>
      )}
      {removable ? (
        <button
          type="button"
          className="ui-chip__remove"
          onClick={onRemove}
          disabled={disabled}
          aria-label={`Remove ${label}`}
        >
          x
        </button>
      ) : null}
    </span>
  )
}
