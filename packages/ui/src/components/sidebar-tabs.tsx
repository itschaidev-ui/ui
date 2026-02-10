"use client"

import { type CSSProperties, type ReactNode, useMemo, useState } from "react"
import "./sidebar-tabs.css"

export type SidebarTabsVariant = "soft" | "outline" | "solid"
export type SidebarTabsAnimation = "none" | "fade" | "slide" | "pop" | "zoom" | "blur" | "flip"
export type SidebarTabsTextAnimation = "slide" | "pulse" | "wave"
export type SidebarTabsDensity = "compact" | "default" | "comfortable"
export type SidebarTabsTabStyle = "rounded" | "pill" | "underline"
export type SidebarTabsIndicatorAnimation = "none" | "glow" | "pulse"
export type SidebarTabsNavPosition = "left" | "right"

export interface SidebarTabItem {
  value: string
  label: string
  content: ReactNode
  icon?: ReactNode
  badge?: string | number
  shortLabel?: string
}

export interface SidebarTabsProps {
  items: SidebarTabItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  variant?: SidebarTabsVariant
  animation?: SidebarTabsAnimation
  textAnimation?: boolean
  textAnimationStyle?: SidebarTabsTextAnimation
  expandable?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  density?: SidebarTabsDensity
  tabStyle?: SidebarTabsTabStyle
  navPosition?: SidebarTabsNavPosition
  hoverLift?: boolean
  showActiveIndicator?: boolean
  indicatorAnimation?: SidebarTabsIndicatorAnimation
  expandedWidth?: number
  collapsedWidth?: number
  className?: string
}

export function SidebarTabs({
  items,
  value,
  defaultValue,
  onValueChange,
  variant = "soft",
  animation = "none",
  textAnimation = false,
  textAnimationStyle = "slide",
  expandable = false,
  expanded,
  onExpandedChange,
  density = "default",
  tabStyle = "rounded",
  navPosition = "left",
  hoverLift = false,
  showActiveIndicator = false,
  indicatorAnimation = "none",
  expandedWidth = 220,
  collapsedWidth = 64,
  className,
}: SidebarTabsProps) {
  const firstValue = items[0]?.value ?? ""
  const [internalValue, setInternalValue] = useState(defaultValue ?? firstValue)
  const [internalExpanded, setInternalExpanded] = useState(true)

  const activeValue = value ?? internalValue
  const isExpanded = expanded ?? internalExpanded

  const activeItem = useMemo(
    () => items.find((item) => item.value === activeValue) ?? items[0],
    [items, activeValue],
  )

  const selectTab = (nextValue: string) => {
    if (value === undefined) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  const toggleExpanded = () => {
    const next = !isExpanded
    if (expanded === undefined) setInternalExpanded(next)
    onExpandedChange?.(next)
  }

  const navStyle = {
    "--tabs-nav-width": `${expandedWidth}px`,
    "--tabs-nav-collapsed-width": `${collapsedWidth}px`,
  } as CSSProperties

  return (
    <div
      className={`ui-sidebar-tabs ${isExpanded ? "is-expanded" : "is-collapsed"} ui-sidebar-tabs--${variant} ui-sidebar-tabs--nav-${navPosition} ${
        hoverLift ? "ui-sidebar-tabs--hover-lift" : ""
      } ${className ?? ""}`}
    >
      <div className={`ui-sidebar-tabs__nav ${isExpanded ? "is-expanded" : "is-collapsed"}`} style={navStyle}>
        {expandable ? (
          <button type="button" className="ui-sidebar-tabs__expand" onClick={toggleExpanded}>
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        ) : null}
        {items.map((item) => {
          const isActive = item.value === activeItem?.value
          return (
            <button
              key={item.value}
              type="button"
              className={`ui-sidebar-tabs__tab ui-sidebar-tabs__tab--${density} ui-sidebar-tabs__tab--${tabStyle} ${
                isActive ? "is-active" : ""
              } ${textAnimation ? `is-text-animated is-text-animated--${textAnimationStyle}` : ""} ${
                showActiveIndicator ? "has-indicator" : ""
              } ${isActive && showActiveIndicator ? `indicator--${indicatorAnimation}` : ""} ${
                item.icon ? "has-icon" : ""
              }`}
              onClick={() => selectTab(item.value)}
              title={item.label}
            >
              {showActiveIndicator ? <span className="ui-sidebar-tabs__indicator" /> : null}
              {item.icon ? <span className="ui-sidebar-tabs__tab-icon">{item.icon}</span> : null}
              <span className="ui-sidebar-tabs__label">{isExpanded ? item.label : item.shortLabel ?? item.label.slice(0, 1)}</span>
              {isExpanded && item.badge !== undefined ? <span className="ui-sidebar-tabs__badge">{item.badge}</span> : null}
            </button>
          )
        })}
      </div>

      <div className={`ui-sidebar-tabs__panel ui-sidebar-tabs__panel--${animation}`} key={activeItem?.value}>
        {activeItem?.content}
      </div>
    </div>
  )
}
