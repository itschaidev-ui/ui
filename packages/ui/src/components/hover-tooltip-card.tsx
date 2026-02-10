"use client"

import styled from "styled-components"

export interface HoverTooltipCardProps {
  tooltipText?: string
  frontText?: string
  revealText?: string
}

export function HoverTooltipCard({
  tooltipText = "sparkle/ui",
  frontText = "Tooltip 👆",
  revealText = "Hello! 👋",
}: HoverTooltipCardProps) {
  return (
    <StyledWrapper>
      <div className="tooltip-container">
        <span className="tooltip">{tooltipText}</span>
        <span className="text">{frontText}</span>
        <span className="reveal">{revealText}</span>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  overflow: visible;

  .tooltip-container {
    --background: #333333;
    --color: #e8e8e8;
    position: relative;
    overflow: visible;
    cursor: pointer;
    transition: color 0.4s cubic-bezier(0.23, 1, 0.32, 1),
      border-color 0.4s cubic-bezier(0.23, 1, 0.32, 1),
      box-shadow 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    font-size: 18px;
    font-weight: 600;
    color: var(--color);
    padding: 0.7em 1.8em;
    border-radius: 8px;
    text-transform: uppercase;
    height: 60px;
    width: 180px;
    display: grid;
    place-items: center;
    border: 2px solid var(--color);
    user-select: none;
    isolation: isolate;
  }

  /* Front label (visible by default) */
  .text {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: grid;
    place-items: center;
    transition: opacity 0.35s cubic-bezier(0.23, 1, 0.32, 1),
      transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    transform-origin: center center;
    pointer-events: none;
  }

  /* Reveal panel (slides in from right on hover) */
  .tooltip-container .reveal {
    position: absolute;
    inset: 0;
    left: 100%;
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-color: var(--background);
    border: 2px solid var(--background);
    display: grid;
    place-items: center;
    transform-origin: right center;
    transform: scaleX(0);
    transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1),
      transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }

  /* Floating tooltip bubble (above card on hover) */
  .tooltip {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 10;
    padding: 0.4em 0.75em;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    transform: translate(-50%, 0) scale(0.85);
    transform-origin: 50% 100%;
    transition: visibility 0s linear 0.2s, opacity 0.25s ease-out, transform 0.35s cubic-bezier(0.23, 1, 0.32, 1);
    background: var(--background);
    border-radius: 8px;
    text-transform: capitalize;
    font-weight: 400;
    font-size: 15px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    white-space: nowrap;
    color: #fff;
  }

  .tooltip::before {
    position: absolute;
    content: "";
    height: 0.5em;
    width: 0.5em;
    bottom: -0.15em;
    left: 50%;
    transform: translate(-50%) rotate(45deg);
    background: var(--background);
    z-index: -1;
  }

  .tooltip-container:hover .tooltip {
    visibility: visible;
    opacity: 1;
    transform: translate(-50%, calc(-100% - 10px)) scale(1);
    transition-delay: 0s;
    animation: hover-tooltip-shake 0.5s ease-in-out 0.15s both;
  }

  .tooltip-container:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    color: #fff;
    border-color: transparent;
  }

  .tooltip-container:hover .reveal {
    left: 0;
    transform: scaleX(1);
  }

  .tooltip-container:hover .text {
    opacity: 0;
    transform: scale(0.95);
  }

  @keyframes hover-tooltip-shake {
    0% { transform: translate(-50%, calc(-100% - 10px)) scale(1) rotate(0deg); }
    25% { transform: translate(-50%, calc(-100% - 10px)) scale(1) rotate(6deg); }
    50% { transform: translate(-50%, calc(-100% - 10px)) scale(1) rotate(-6deg); }
    75% { transform: translate(-50%, calc(-100% - 10px)) scale(1) rotate(2deg); }
    100% { transform: translate(-50%, calc(-100% - 10px)) scale(1) rotate(0deg); }
  }
`
