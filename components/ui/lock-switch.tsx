"use client"

import type { CSSProperties } from "react"
import { useId, useState } from "react"
import "./lock-switch.css"

export type LockSwitchSize = "sm" | "md" | "lg"
export type LockSwitchTone = "default" | "vivid" | "glass"
export type LockSwitchMotion = "smooth" | "spring" | "snappy"

export interface LockSwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  size?: LockSwitchSize
  tone?: LockSwitchTone
  motion?: LockSwitchMotion
  showStateLabel?: boolean
  lockedLabel?: string
  unlockedLabel?: string
  lockedColor?: string
  unlockedColor?: string
  knobColor?: string
  ariaLabel?: string
  id?: string
  className?: string
}

export function LockSwitch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = "md",
  tone = "default",
  motion = "smooth",
  showStateLabel = false,
  lockedLabel = "Locked",
  unlockedLabel = "Unlocked",
  lockedColor,
  unlockedColor,
  knobColor,
  ariaLabel = "Toggle lock switch",
  id,
  className,
}: LockSwitchProps) {
  const generatedId = useId()
  const inputId = id ?? `lock-switch-${generatedId}`
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const isControlled = checked !== undefined
  const isChecked = isControlled ? checked : internalChecked

  const handleChange = (next: boolean) => {
    if (!isControlled) {
      setInternalChecked(next)
    }
    onCheckedChange?.(next)
  }

  const style = {
    "--lock-switch-locked": lockedColor,
    "--lock-switch-unlocked": unlockedColor,
    "--lock-switch-knob": knobColor,
  } as CSSProperties

  return (
    <div className={`ui-lock-switch-shell ${className ?? ""}`}>
      <label
        htmlFor={inputId}
        className={`ui-lock-switch ui-lock-switch--${size} ui-lock-switch--${tone} ui-lock-switch--${motion} ${disabled ? "is-disabled" : ""}`}
        aria-disabled={disabled}
        style={style}
      >
        <input
          id={inputId}
          type="checkbox"
          aria-label={ariaLabel}
          className="ui-lock-switch__input"
          checked={isChecked}
          disabled={disabled}
          onChange={(event) => handleChange(event.target.checked)}
        />
        <span className="ui-lock-switch__track">
          <svg className="ui-lock-switch__icon ui-lock-switch__icon--locked" viewBox="0 0 100 100" aria-hidden="true">
            <path d="M50,18A19.9,19.9,0,0,0,30,38v8a8,8,0,0,0-8,8V74a8,8,0,0,0,8,8H70a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H38V38a12,12,0,0,1,23.6-3,4,4,0,1,0,7.8-2A20.1,20.1,0,0,0,50,18Z" />
          </svg>
          <svg className="ui-lock-switch__icon ui-lock-switch__icon--unlocked" viewBox="0 0 100 100" aria-hidden="true">
            <path
              d="M30,46V38a20,20,0,0,1,40,0v8a8,8,0,0,1,8,8V74a8,8,0,0,1-8,8H30a8,8,0,0,1-8-8V54A8,8,0,0,1,30,46Zm32-8v8H38V38a12,12,0,0,1,24,0Z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </label>

      {showStateLabel ? (
        <span className={`ui-lock-switch__state ${isChecked ? "is-checked" : ""}`}>{isChecked ? lockedLabel : unlockedLabel}</span>
      ) : null}
    </div>
  )
}
