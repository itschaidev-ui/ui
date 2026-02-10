"use client"

import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from "motion/react"
import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"

import "./elastic-slider.css"

const MAX_OVERFLOW = 50
export type ElasticSliderValuePosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

export interface ElasticSliderProps {
  className?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  startingValue?: number
  value: number
  maxValue: number
  isStepped?: boolean
  stepSize?: number
  showValueIndicator?: boolean
  valuePosition?: ElasticSliderValuePosition
  enhancedEffects?: boolean
  onChange: (value: number) => void
}

export function ElasticSlider({
  className = "",
  leftIcon,
  rightIcon,
  startingValue = 0,
  value,
  maxValue,
  isStepped = false,
  stepSize = 1,
  showValueIndicator = true,
  valuePosition = "top-center",
  enhancedEffects = false,
  onChange,
}: ElasticSliderProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const [region, setRegion] = useState<"left" | "right" | "middle">("middle")
  const clientX = useMotionValue(0)
  const overflow = useMotionValue(0)
  const scale = useMotionValue(1)

  useEffect(() => {
    if (value < startingValue) {
      onChange(startingValue)
    }
    if (value > maxValue) {
      onChange(maxValue)
    }
  }, [maxValue, onChange, startingValue, value])

  useMotionValueEvent(clientX, "change", (latest) => {
    if (!sliderRef.current) {
      return
    }

    const { left, right } = sliderRef.current.getBoundingClientRect()
    let newValue = 0

    if (latest < left) {
      setRegion("left")
      newValue = left - latest
    } else if (latest > right) {
      setRegion("right")
      newValue = latest - right
    } else {
      setRegion("middle")
    }

    overflow.jump(decay(newValue, MAX_OVERFLOW))
  })

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.buttons <= 0 || !sliderRef.current) {
      return
    }

    const { left, width } = sliderRef.current.getBoundingClientRect()
    let newValue = startingValue + ((event.clientX - left) / width) * (maxValue - startingValue)

    if (isStepped) {
      newValue = Math.round(newValue / stepSize) * stepSize
    }

    newValue = Math.min(Math.max(newValue, startingValue), maxValue)
    onChange(newValue)
    clientX.jump(event.clientX)
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    handlePointerMove(event)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerUp = () => {
    animate(overflow, 0, { type: "spring", bounce: 0.5 })
  }

  const rangePercentage = (() => {
    const totalRange = maxValue - startingValue
    if (totalRange <= 0) {
      return 0
    }
    return ((value - startingValue) / totalRange) * 100
  })()

  return (
    <div className={`elastic-slider-container ${className}`}>
      <motion.div
        onHoverStart={() => animate(scale, enhancedEffects ? 1.04 : 1)}
        onHoverEnd={() => animate(scale, 1)}
        onTouchStart={() => animate(scale, enhancedEffects ? 1.04 : 1)}
        onTouchEnd={() => animate(scale, 1)}
        style={{
          scale,
          opacity: useTransform(scale, [1, 1.04], [0.9, 1]),
        }}
        className="elastic-slider-wrapper"
      >
        <motion.div
          animate={{
            scale: enhancedEffects && region === "left" ? [1, 1.35, 1] : 1,
            transition: { duration: 0.25 },
          }}
          style={{
            x: useTransform(() => (region === "left" ? -overflow.get() / scale.get() : 0)),
          }}
          className="elastic-slider-icon"
        >
          {leftIcon}
        </motion.div>

        <div
          ref={sliderRef}
          className="elastic-slider-root"
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <motion.div
            style={{
              scaleX: useTransform(() => {
                if (!sliderRef.current) {
                  return 1
                }
                const { width } = sliderRef.current.getBoundingClientRect()
                return 1 + overflow.get() / width
              }),
              scaleY: useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.78]),
              transformOrigin: useTransform(() => {
                if (!sliderRef.current) {
                  return "left"
                }
                const { left, width } = sliderRef.current.getBoundingClientRect()
                return clientX.get() < left + width / 2 ? "right" : "left"
              }),
            }}
            className="elastic-slider-track-wrapper"
          >
            <div className="elastic-slider-track">
              <div className="elastic-slider-range" style={{ width: `${rangePercentage}%` }} />
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{
            scale: enhancedEffects && region === "right" ? [1, 1.35, 1] : 1,
            transition: { duration: 0.25 },
          }}
          style={{
            x: useTransform(() => (region === "right" ? overflow.get() / scale.get() : 0)),
          }}
          className="elastic-slider-icon"
        >
          {rightIcon}
        </motion.div>
      </motion.div>

      {showValueIndicator ? (
        <p className={`elastic-slider-value elastic-slider-value--${valuePosition}`}>
          {Math.round(value)}
        </p>
      ) : null}
    </div>
  )
}

function decay(value: number, max: number) {
  if (max === 0) {
    return 0
  }

  const entry = value / max
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5)
  return sigmoid * max
}
