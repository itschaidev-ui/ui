"use client"

import { type HTMLAttributes, type ReactNode, useMemo, useState } from "react"
import "./avatar-pro.css"

export type AvatarSize = "sm" | "md" | "lg"
export type AvatarShape = "circle" | "rounded" | "square"
export type AvatarStatus = "online" | "away" | "busy" | "offline"
export type AvatarAnimation = "none" | "pulse" | "float" | "glow"
export type AvatarExpandContentMode = "text" | "image" | "button" | "custom"

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: AvatarSize
  shape?: AvatarShape
  showRing?: boolean
  showStatus?: boolean
  status?: AvatarStatus
  animation?: AvatarAnimation
  expandable?: boolean
  contentMode?: AvatarExpandContentMode
  expandedContent?: ReactNode
  expandedTitle?: string
  expandedDescription?: string
  expandedImageSrc?: string
  expandedButtonLabel?: string
  onExpandedButtonClick?: () => void
}

function getFallback(fallback?: string, alt?: string) {
  if (fallback && fallback.trim().length > 0) {
    return fallback.trim().slice(0, 2).toUpperCase()
  }
  if (alt && alt.trim().length > 0) {
    const words = alt.trim().split(/\s+/).slice(0, 2)
    return words.map((word) => word[0]?.toUpperCase() ?? "").join("")
  }
  return "UI"
}

export function AvatarPro({
  src,
  alt = "Avatar",
  fallback,
  size = "md",
  shape = "circle",
  showRing = false,
  showStatus = false,
  status = "online",
  animation = "none",
  expandable = false,
  contentMode = "text",
  expandedContent,
  expandedTitle = "Chai Dev",
  expandedDescription = "Design systems, UI components, and motion details.",
  expandedImageSrc,
  expandedButtonLabel = "View Profile",
  onExpandedButtonClick,
  className,
  ...props
}: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const fallbackText = useMemo(() => getFallback(fallback, alt), [fallback, alt])
  const showImage = Boolean(src) && !imageFailed

  const renderExpandedContent = () => {
    if (expandedContent) return expandedContent
    if (contentMode === "image") {
      return expandedImageSrc ? (
        <img className="ui-avatar__expanded-image" src={expandedImageSrc} alt={expandedTitle} />
      ) : (
        <p className="ui-avatar__expanded-description">Set `expandedImageSrc` to preview image mode.</p>
      )
    }
    if (contentMode === "button") {
      return (
        <button type="button" className="ui-avatar__expanded-button" onClick={onExpandedButtonClick}>
          {expandedButtonLabel}
        </button>
      )
    }
    if (contentMode === "custom") {
      return (
        <div className="ui-avatar__expanded-custom">
          <img
            className="ui-avatar__expanded-custom-image"
            src={expandedImageSrc || src || "https://i.pravatar.cc/160?img=62"}
            alt={expandedTitle}
          />
          <div className="ui-avatar__expanded-custom-text">
            <p className="ui-avatar__expanded-title">{expandedTitle}</p>
            <button type="button" className="ui-avatar__expanded-button" onClick={onExpandedButtonClick}>
              {expandedButtonLabel}
            </button>
          </div>
        </div>
      )
    }
    return (
      <>
        <p className="ui-avatar__expanded-title">{expandedTitle}</p>
        <p className="ui-avatar__expanded-description">{expandedDescription}</p>
      </>
    )
  }

  return (
    <span className={`ui-avatar-shell ${expandable ? "ui-avatar-shell--expandable" : ""}`}>
      <span
        className={`ui-avatar ui-avatar--${size} ui-avatar--${shape} ui-avatar--anim-${animation} ${
          showRing ? "ui-avatar--ring" : ""
        } ${className ?? ""}`}
        {...props}
      >
        {showImage ? (
          <img
            className="ui-avatar__image"
            src={src}
            alt={alt}
            onError={() => setImageFailed(true)}
            draggable={false}
          />
        ) : (
          <span className="ui-avatar__fallback">{fallbackText}</span>
        )}
        {showStatus ? <span className={`ui-avatar__status ui-avatar__status--${status}`} /> : null}
      </span>
      {expandable ? (
        <span className="ui-avatar__expanded" aria-hidden>
          {renderExpandedContent()}
        </span>
      ) : null}
    </span>
  )
}
