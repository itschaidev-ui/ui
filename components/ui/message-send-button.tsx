"use client"

import React from "react"
import styled from "styled-components"

function DefaultSendIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  )
}

export interface MessageSendButtonProps {
  /** Button label. Omit for icon-only. */
  text?: string
  /** Show the send icon. Default true. */
  showIcon?: boolean
  /** Custom icon. If provided, replaces the default send icon. */
  icon?: React.ReactNode
  /** Compact size for inline use (e.g. inside input bar). */
  compact?: boolean
  onClick?: () => void
}

export function MessageSendButton({
  text,
  showIcon = true,
  icon,
  compact,
  onClick,
}: MessageSendButtonProps) {
  const hasIcon = showIcon && (icon !== undefined ? icon !== null : true)
  const hasText = Boolean(text?.trim())
  const ariaLabel = text?.trim() || "Send message"

  return (
    <StyledWrapper $compact={compact}>
      <button type="button" className="glass-send" onClick={onClick} aria-label={ariaLabel}>
        {hasIcon && (icon ?? <DefaultSendIcon size={compact ? 16 : 20} />)}
        {hasText && <span>{text}</span>}
      </button>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div<{ $compact?: boolean }>`
  .glass-send {
    color: rgba(255, 255, 255, 0.8);
    padding: ${({ $compact }) => ($compact ? "6px 10px" : "10px 15px")};
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.05);
    font-size: 0.9rem;
    font-weight: 600;
    gap: 8px;
    border-radius: 999px;
    margin: 0 5px;
    border: 1px solid transparent;
    transition: 0.2s ease;
    cursor: pointer;
  }

  .glass-send:hover {
    border-color: rgba(255, 255, 255, 0.65);
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.14),
      rgba(255, 255, 255, 0.26),
      rgba(255, 255, 255, 0.4)
    );
    box-shadow: 0 6px rgba(255, 255, 255, 0.6);
    transform: translateY(${({ $compact }) => ($compact ? "-2px" : "-4px")});
  }

  .glass-send:active {
    transform: translateY(2px);
    box-shadow: none;
  }
`
