"use client"

import type { ReactNode } from "react"
import "./callout.css"

export type CalloutTone = "neutral" | "info" | "success" | "warning" | "danger"
export type CalloutAppearance = "soft" | "solid" | "outline"

export interface CalloutProps {
  title: string
  description?: string
  tone?: CalloutTone
  appearance?: CalloutAppearance
  showIcon?: boolean
  dismissible?: boolean
  onDismiss?: () => void
  action?: ReactNode
  className?: string
}

function getToneIcon(tone: CalloutTone) {
  if (tone === "success") return "OK"
  if (tone === "warning") return "!"
  if (tone === "danger") return "X"
  if (tone === "info") return "i"
  return "i"
}

export function Callout({
  title,
  description,
  tone = "neutral",
  appearance = "soft",
  showIcon = false,
  dismissible = false,
  onDismiss,
  action,
  className,
}: CalloutProps) {
  return (
    <div className={`ui-callout ui-callout--${tone} ui-callout--${appearance} ${className ?? ""}`}>
      <div className="ui-callout__content">
        {showIcon ? <span className="ui-callout__icon">{getToneIcon(tone)}</span> : null}
        <div className="ui-callout__text">
          <p className="ui-callout__title">{title}</p>
          {description ? <p className="ui-callout__description">{description}</p> : null}
        </div>
      </div>
      <div className="ui-callout__actions">
        {action}
        {dismissible ? (
          <button type="button" className="ui-callout__dismiss" onClick={onDismiss} aria-label="Dismiss callout">
            x
          </button>
        ) : null}
      </div>
    </div>
  )
}
