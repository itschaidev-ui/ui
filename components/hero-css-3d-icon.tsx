"use client"

/**
 * 2D sparkle icon with hover animation — pure CSS + SVG.
 */

export function HeroCss3DIcon() {
  return (
    <span
      className="inline-flex cursor-default transition-transform duration-300 ease-out hover:scale-125 hover:rotate-12"
      aria-hidden
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[var(--primary)] drop-shadow-sm"
      >
        <path
          d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    </span>
  )
}
