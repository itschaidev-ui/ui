"use client"

import React from "react"

import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"
import "./sparkle-button.css"

export interface SparkleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The text to display on the button */
  text?: string
  /** The text to display when the button is in a loading/active state */
  activeText?: string
  /** The highlight hue in degrees (0-360). Default is 210 (blue) */
  hue?: number
  /** Size variant */
  size?: "sm" | "md" | "lg"
}

const SparkleButton = forwardRef<HTMLButtonElement, SparkleButtonProps>(
  ({ text = "Generate", activeText = "Generating", hue = 210, size = "md", className, ...props }, ref) => {
    const sizeClasses = {
      sm: "sparkle-btn--sm",
      md: "",
      lg: "sparkle-btn--lg",
    }

    return (
      <div className="sparkle-btn-wrapper">
        <button
          ref={ref}
          className={cn("sparkle-btn", sizeClasses[size], className)}
          style={{ "--highlight-color-hue": `${hue}deg` } as React.CSSProperties}
          {...props}
        >
          <svg
            className="sparkle-btn__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>

          <div className="sparkle-btn__text-wrapper">
            <span className="sparkle-btn__text sparkle-btn__text--default" aria-hidden="true">
              {text.split("").map((char, i) => (
                <span
                  key={`${char}-${i}`}
                  className="sparkle-btn__letter"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="sparkle-btn__text sparkle-btn__text--active" aria-hidden="true">
              {activeText.split("").map((char, i) => (
                <span
                  key={`${char}-${i}`}
                  className="sparkle-btn__letter"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="sr-only">{text}</span>
          </div>
        </button>
      </div>
    )
  }
)

SparkleButton.displayName = "SparkleButton"

export { SparkleButton }
