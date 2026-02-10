"use client"

import { type ReactNode, useMemo, useState } from "react"
import "./accordion.css"

export interface AccordionItem {
  value: string
  title: string
  content: ReactNode
  disabled?: boolean
}

export type AccordionAnimation = "none" | "smooth" | "fade" | "pop"

export interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  collapsible?: boolean
  animation?: AccordionAnimation
  animated?: boolean
  bordered?: boolean
  defaultValue?: string | string[]
  className?: string
}

function normalizeValue(value: string | string[] | undefined, allowMultiple: boolean) {
  if (allowMultiple) {
    if (!value) return []
    return Array.isArray(value) ? value : [value]
  }
  if (!value) return []
  return [Array.isArray(value) ? value[0] : value]
}

export function Accordion({
  items,
  allowMultiple = false,
  collapsible = true,
  animation = "none",
  animated = false,
  bordered = false,
  defaultValue,
  className,
}: AccordionProps) {
  const resolvedAnimation: AccordionAnimation = animation === "none" && animated ? "smooth" : animation
  const initialOpen = useMemo(
    () => normalizeValue(defaultValue, allowMultiple).filter(Boolean),
    [allowMultiple, defaultValue],
  )
  const [openValues, setOpenValues] = useState<string[]>(initialOpen)

  const isOpen = (value: string) => openValues.includes(value)

  const toggle = (value: string, disabled?: boolean) => {
    if (disabled) return
    const currentlyOpen = openValues.includes(value)

    if (allowMultiple) {
      if (currentlyOpen) {
        if (!collapsible) return
        setOpenValues((current) => current.filter((entry) => entry !== value))
      } else {
        setOpenValues((current) => [...current, value])
      }
      return
    }

    if (currentlyOpen) {
      if (!collapsible) return
      setOpenValues([])
    } else {
      setOpenValues([value])
    }
  }

  return (
    <div className={`ui-accordion ${bordered ? "ui-accordion--bordered" : ""} ${className ?? ""}`}>
      {items.map((item) => {
        const open = isOpen(item.value)
        return (
          <div
            key={item.value}
            className={`ui-accordion__item ${open ? "is-open" : ""} ${item.disabled ? "is-disabled" : ""}`}
          >
            <button
              type="button"
              className="ui-accordion__trigger"
              onClick={() => toggle(item.value, item.disabled)}
              disabled={item.disabled}
              aria-expanded={open}
            >
              <span>{item.title}</span>
              <span className={`ui-accordion__icon ${open ? "is-open" : ""}`}>+</span>
            </button>

            <div
              className={`ui-accordion__panel ui-accordion__panel--${resolvedAnimation} ${open ? "is-open" : ""}`}
            >
              <div className="ui-accordion__panel-inner">{item.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
