"use client"

import { motion, useSpring, useTransform } from "motion/react"
import { useEffect } from "react"

import "./counter.css"

type Place = number | "."

type CounterProps = {
  value: number
  fontSize?: number
  padding?: number
  places?: Place[]
  gap?: number
  borderRadius?: number
  horizontalPadding?: number
  textColor?: string
  fontWeight?: number | string
  digitPlaceHolders?: boolean
  containerStyle?: React.CSSProperties
  counterStyle?: React.CSSProperties
  digitStyle?: React.CSSProperties
  gradientHeight?: number
  gradientFrom?: string
  gradientTo?: string
  topGradientStyle?: React.CSSProperties
  bottomGradientStyle?: React.CSSProperties
}

function NumberDigit({
  mv,
  number,
  height,
}: {
  mv: ReturnType<typeof useSpring>
  number: number
  height: number
}) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10
    const offset = (10 + number - placeValue) % 10
    let memo = offset * height
    if (offset > 5) {
      memo -= 10 * height
    }
    return memo
  })

  return (
    <motion.span className="counter-number" style={{ y }}>
      {number}
    </motion.span>
  )
}

function Digit({
  place,
  value,
  height,
  digitStyle,
}: {
  place: Place
  value: number
  height: number
  digitStyle?: React.CSSProperties
}) {
  const isDecimal = place === "."
  const valueRoundedToPlace = isDecimal ? 0 : Math.floor(value / place)
  const animatedValue = useSpring(valueRoundedToPlace)

  useEffect(() => {
    if (!isDecimal) {
      animatedValue.set(valueRoundedToPlace)
    }
  }, [animatedValue, isDecimal, valueRoundedToPlace])

  if (isDecimal) {
    return (
      <span className="counter-digit" style={{ height, ...digitStyle, width: "fit-content" }}>
        .
      </span>
    )
  }

  return (
    <span className="counter-digit" style={{ height, ...digitStyle }}>
      {Array.from({ length: 10 }, (_, i) => (
        <NumberDigit key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </span>
  )
}

export default function Counter({
  value,
  fontSize = 100,
  padding = 0,
  places,
  gap = 8,
  borderRadius = 4,
  horizontalPadding = 8,
  textColor = "inherit",
  fontWeight = "inherit",
  digitPlaceHolders = false,
  containerStyle,
  counterStyle,
  digitStyle,
  gradientHeight = 0,
  gradientFrom = "black",
  gradientTo = "transparent",
  topGradientStyle,
  bottomGradientStyle,
}: CounterProps) {
  const derivedPlaces = places ?? getPlaces(value, digitPlaceHolders)
  const height = fontSize + padding

  return (
    <span className="counter-container" style={containerStyle}>
      <span
        className="counter-counter"
        style={{
          fontSize,
          gap,
          borderRadius,
          paddingLeft: horizontalPadding,
          paddingRight: horizontalPadding,
          color: textColor,
          fontWeight,
          ...counterStyle,
        }}
      >
        {derivedPlaces.map((place, idx) => (
          <Digit key={`${place}-${idx}`} place={place} value={value} height={height} digitStyle={digitStyle} />
        ))}
      </span>
      <span className="gradient-container">
        <span
          className="top-gradient"
          style={
            topGradientStyle ?? {
              height: gradientHeight,
              background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
            }
          }
        />
        <span
          className="bottom-gradient"
          style={
            bottomGradientStyle ?? {
              height: gradientHeight,
              background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
            }
          }
        />
      </span>
    </span>
  )
}

function getPlaces(value: number, digitPlaceHolders: boolean): Place[] {
  if (digitPlaceHolders) {
    return [100, 10, 1]
  }
  const str = String(value)
  return [...str].map((ch, i, arr) => {
    if (ch === ".") {
      return "."
    }
    const dot = arr.indexOf(".")
    if (dot === -1) {
      return 10 ** (arr.length - i - 1)
    }
    return i < dot ? 10 ** (dot - i - 1) : 10 ** -(i - dot)
  })
}
