"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import "./glass-cta-button.css"

/** Default icon: download / arrow into tray (Phosphor-style) */
function DefaultIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M74.34 85.66a8 8 0 0 1 11.32-11.32L120 108.69V24a8 8 0 0 1 16 0v84.69l34.34-34.35a8 8 0 0 1 11.32 11.32l-48 48a8 8 0 0 1-11.32 0ZM240 136v64a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h52.4a4 4 0 0 1 2.83 1.17L111 145a24 24 0 0 0 34 0l23.8-23.8a4 4 0 0 1 2.8-1.2H224a16 16 0 0 1 16 16m-40 32a12 12 0 1 0-12 12a12 12 0 0 0 12-12"
        fill="currentColor"
      />
    </svg>
  )
}

export interface GlassCtaButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  /** Content (e.g. "Get started") */
  children: React.ReactNode
  /** Optional icon; default is download/tray icon */
  icon?: React.ReactNode
  /** Render as child (e.g. wrap Next Link) */
  asChild?: boolean
}

export const GlassCtaButton = React.forwardRef<HTMLAnchorElement, GlassCtaButtonProps>(
  ({ children, icon, asChild, className, ...props }, ref) => {
    const label =
      asChild &&
      React.Children.count(children) === 1 &&
      React.isValidElement(children)
        ? (React.Children.only(children) as React.ReactElement<{ children?: React.ReactNode }>).props.children
        : children

    const content = (
      <>
        {icon !== undefined ? icon : <DefaultIcon className="glass-cta-button__icon" />}
        <span>{label}</span>
      </>
    )

    if (asChild && React.Children.count(children) === 1 && React.isValidElement(children)) {
      const child = React.Children.only(children) as React.ReactElement
      return (
        <Slot ref={ref} className={cn("glass-cta-button", className)} {...props}>
          {React.cloneElement(child, {}, content)}
        </Slot>
      )
    }

    return (
      <a
        ref={ref}
        className={cn("glass-cta-button", className)}
        {...props}
      >
        {content}
      </a>
    )
  }
)
GlassCtaButton.displayName = "GlassCtaButton"
