"use client"

import type {
  CSSProperties,
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react"
import { useRef, useState } from "react"
import "./segmented-control.css"

export type SegmentedControlOption = {
  label: string
  value: string
  visual?: ReactNode
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[]
  value: string
  onChange: (value: string) => void
  ariaLabel?: string
  className?: string
  accentColor?: string
  secondaryColor?: string
  radius?: number
  pillInset?: number
  pillRadius?: number
  height?: number
  fontSize?: number
  draggable?: boolean
  contentMode?: "text" | "visual"
  style?: CSSProperties
}

export function SegmentedControl({
  options,
  value,
  onChange,
  ariaLabel = "Segmented control",
  className,
  accentColor = "#7a67c7",
  secondaryColor,
  radius = 16,
  pillInset = 4,
  pillRadius = 12,
  height = 48,
  fontSize = 18,
  draggable = false,
  contentMode = "text",
  style,
}: SegmentedControlProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const currentIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  )

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!options.length) {
      return
    }

    if (event.key === "ArrowRight") {
      event.preventDefault()
      const nextIndex = (currentIndex + 1) % options.length
      onChange(options[nextIndex].value)
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault()
      const prevIndex = (currentIndex - 1 + options.length) % options.length
      onChange(options[prevIndex].value)
    }
  }

  const selectByClientX = (clientX: number) => {
    if (!containerRef.current || options.length === 0) {
      return
    }
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width)
    const nextIndex = Math.min(
      options.length - 1,
      Math.max(0, Math.floor((x / rect.width) * options.length)),
    )
    onChange(options[nextIndex].value)
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggable) {
      return
    }
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
    selectByClientX(event.clientX)
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return
    }
    selectByClientX(event.clientX)
  }

  const onPointerUp = () => {
    setIsDragging(false)
  }

  const colors = createSegmentedColors(accentColor, secondaryColor)

  return (
    <div
      ref={containerRef}
      className={`segmented-control ${className ?? ""}`.trim()}
      data-dragging={isDragging ? "true" : "false"}
      data-draggable={draggable ? "true" : "false"}
      role="radiogroup"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={
        {
          "--seg-radius": `${radius}px`,
          "--seg-pill-inset": `${pillInset}px`,
          "--seg-pill-radius": `${pillRadius}px`,
          "--seg-height": `${height}px`,
          "--seg-font-size": `${fontSize}px`,
          "--seg-bg": colors.backgroundColor,
          "--seg-border": colors.borderColor,
          "--seg-text": colors.textColor,
          "--seg-accent-secondary": colors.secondaryColor,
          ...style,
        } as CSSProperties
      }
    >
      <div
        className="segmented-control__active-pill"
        style={{
          width: `calc((100% - (var(--seg-pill-inset) * 2)) / ${Math.max(options.length, 1)})`,
          transform: `translateX(${currentIndex * 100}%)`,
        }}
      />
      {options.map((option) => {
        const isActive = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={`segmented-control__button ${isActive ? "is-active" : ""}`}
            onClick={() => onChange(option.value)}
            aria-label={option.label}
          >
            {contentMode === "visual" && option.visual ? (
              <span className="segmented-control__visual">{option.visual}</span>
            ) : (
              option.label
            )}
          </button>
        )
      })}
    </div>
  )
}

function createSegmentedColors(primaryHex: string, secondaryHex?: string) {
  const primary = parseHex(primaryHex) ?? { r: 122, g: 103, b: 199 }
  const luminance = getLuminance(primary)
  const autoSecondary =
    luminance < 0.24
      ? mixRgb(primary, { r: 255, g: 255, b: 255 }, 0.24)
      : mixRgb(primary, { r: 0, g: 0, b: 0 }, 0.22)
  const secondary = parseHex(secondaryHex ?? "") ?? autoSecondary
  const background = mixRgb(primary, { r: 244, g: 244, b: 244 }, 0.17)
  const border = mixRgb(secondary, { r: 175, g: 175, b: 175 }, 0.16)
  const text = mixRgb(secondary, { r: 75, g: 75, b: 75 }, 0.14)

  return {
    backgroundColor: rgbToHex(background),
    borderColor: rgbToHex(border),
    textColor: rgbToHex(text),
    secondaryColor: rgbToHex(secondary),
  }
}

function parseHex(value: string) {
  const normalized = value.trim().replace("#", "")
  const hex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
    return null
  }
  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16),
  }
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  const toHex = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function mixRgb(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number },
  amount: number,
) {
  const t = Math.max(0, Math.min(1, amount))
  return {
    r: a.r * t + b.r * (1 - t),
    g: a.g * t + b.g * (1 - t),
    b: a.b * t + b.b * (1 - t),
  }
}

function getLuminance({ r, g, b }: { r: number; g: number; b: number }) {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
}
