// src/components/sparkle-button.tsx
import { forwardRef, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var SparkleButton = forwardRef(
  ({
    text = "Get Started",
    hoverText = "Ready?",
    activeText = "Loading...",
    hue = 210,
    size = "md",
    loadingDuration = 2200,
    enableHoverText = false,
    enableLoadingState = false,
    className,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...props
  }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [needsHoverReset, setNeedsHoverReset] = useState(false);
    const loadingTimeoutRef = useRef(null);
    useEffect(() => {
      return () => {
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
        }
      };
    }, []);
    const handleClick = (event) => {
      if (!enableLoadingState) {
        onClick?.(event);
        return;
      }
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      setNeedsHoverReset(true);
      onClick?.(event);
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, loadingDuration);
    };
    const visualState = isLoading ? "loading" : !enableHoverText ? "idle" : needsHoverReset ? "idle" : isHovered || isFocused ? "hover" : "idle";
    const sizeClasses = {
      sm: "sparkle-btn--sm",
      md: "",
      lg: "sparkle-btn--lg"
    };
    const classes = ["sparkle-btn", sizeClasses[size], className].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsx("div", { className: "sparkle-btn-wrapper", children: /* @__PURE__ */ jsxs(
      "button",
      {
        ref,
        className: classes,
        "data-state": visualState,
        style: { "--highlight-color-hue": `${hue}deg` },
        onClick: handleClick,
        onMouseEnter: (event) => {
          setIsHovered(true);
          onMouseEnter?.(event);
        },
        onMouseLeave: (event) => {
          setIsHovered(false);
          if (!isLoading) {
            setNeedsHoverReset(false);
          }
          onMouseLeave?.(event);
        },
        onFocus: (event) => {
          setIsFocused(true);
          onFocus?.(event);
        },
        onBlur: (event) => {
          setIsFocused(false);
          if (!isLoading) {
            setNeedsHoverReset(false);
          }
          onBlur?.(event);
        },
        ...props,
        children: [
          /* @__PURE__ */ jsx("svg", { className: "sparkle-btn__icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "sparkle-btn__text-wrapper", children: [
            /* @__PURE__ */ jsx("span", { className: "sparkle-btn__text sparkle-btn__text--default", "aria-hidden": "true", children: text.split("").map((char, i) => /* @__PURE__ */ jsx("span", { className: "sparkle-btn__letter", style: { animationDelay: `${i * 0.08}s` }, children: char }, `${char}-${i}`)) }),
            /* @__PURE__ */ jsx("span", { className: "sparkle-btn__text sparkle-btn__text--active", "aria-hidden": "true", children: activeText.split("").map((char, i) => /* @__PURE__ */ jsx("span", { className: "sparkle-btn__letter", style: { animationDelay: `${i * 0.08}s` }, children: char }, `${char}-${i}`)) }),
            /* @__PURE__ */ jsx("span", { className: "sparkle-btn__text sparkle-btn__text--hover", "aria-hidden": "true", children: hoverText.split("").map((char, i) => /* @__PURE__ */ jsx("span", { className: "sparkle-btn__letter", style: { animationDelay: `${i * 0.08}s` }, children: char }, `${char}-${i}`)) }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: text })
          ] })
        ]
      }
    ) });
  }
);
SparkleButton.displayName = "SparkleButton";

// src/components/social-media-button.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var SOCIAL_SWEEP_EASING_PRESETS = {
  smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
  snappy: "cubic-bezier(0.4, 0, 0.2, 1)",
  dramatic: "cubic-bezier(0.15, 0.85, 0.25, 1.1)",
  linear: "linear"
};
var DEFAULT_SOCIAL_MEDIA_PRESETS = {
  github: {
    label: "Star on GitHub",
    href: "https://github.com/itschaidev-ui/ui",
    accentColor: "#000000",
    showCount: true,
    showGitHubStar: true,
    sweepEasingPreset: "dramatic",
    sweepDurationMs: 980
  },
  twitter: {
    label: "Follow on X",
    href: "https://x.com",
    accentColor: "#111111",
    sweepEasingPreset: "snappy",
    sweepDurationMs: 800
  },
  instagram: {
    label: "Follow on Instagram",
    href: "https://instagram.com",
    accentColor: "#C13584",
    sweepEasingPreset: "smooth",
    sweepDurationMs: 1100
  },
  linkedin: {
    label: "Connect on LinkedIn",
    href: "https://linkedin.com",
    accentColor: "#0A66C2",
    sweepEasingPreset: "smooth",
    sweepDurationMs: 900
  },
  youtube: {
    label: "Subscribe on YouTube",
    href: "https://youtube.com",
    accentColor: "#FF0000",
    sweepEasingPreset: "snappy",
    sweepDurationMs: 860
  },
  twitch: {
    label: "Follow on Twitch",
    href: "https://twitch.tv",
    accentColor: "#9146FF",
    sweepEasingPreset: "smooth",
    sweepDurationMs: 1040
  }
};
function SocialMediaButton({
  preset = "custom",
  presets,
  label,
  count = 0,
  showCount,
  showSweep = true,
  showGitHubStar,
  sweepEasingPreset,
  sweepEasing,
  sweepDurationMs,
  accentColor,
  icon,
  href,
  className,
  ...props
}) {
  const resolvedPreset = preset !== "custom" ? {
    ...DEFAULT_SOCIAL_MEDIA_PRESETS[preset],
    ...presets?.[preset] ?? {}
  } : null;
  const resolvedLabel = label ?? resolvedPreset?.label ?? "Follow";
  const resolvedHref = href ?? resolvedPreset?.href ?? "#";
  const resolvedAccent = accentColor ?? resolvedPreset?.accentColor ?? "#000000";
  const resolvedShowCount = showCount ?? resolvedPreset?.showCount ?? false;
  const resolvedShowGitHubStar = showGitHubStar ?? resolvedPreset?.showGitHubStar ?? false;
  const resolvedSweepEasingPreset = sweepEasingPreset ?? resolvedPreset?.sweepEasingPreset ?? "smooth";
  const resolvedSweepEasing = sweepEasing ?? SOCIAL_SWEEP_EASING_PRESETS[resolvedSweepEasingPreset];
  const resolvedSweepDurationMs = sweepDurationMs ?? resolvedPreset?.sweepDurationMs ?? 1e3;
  const style = {
    "--social-accent": resolvedAccent,
    "--social-sweep-easing": resolvedSweepEasing,
    "--social-sweep-duration": `${resolvedSweepDurationMs}ms`
  };
  return /* @__PURE__ */ jsxs2(
    "a",
    {
      href: resolvedHref,
      style,
      className: `ui-social-media-button ${className ?? ""}`,
      target: resolvedHref.startsWith("http") ? "_blank" : props.target,
      rel: resolvedHref.startsWith("http") ? "noreferrer" : props.rel,
      ...props,
      children: [
        showSweep ? /* @__PURE__ */ jsx2("span", { className: "ui-social-media-button__sweep" }) : null,
        /* @__PURE__ */ jsxs2("span", { className: "ui-social-media-button__left", children: [
          /* @__PURE__ */ jsx2("span", { className: "ui-social-media-button__icon", children: icon ?? /* @__PURE__ */ jsx2("span", { className: "ui-social-media-button__icon-fallback", children: "S" }) }),
          /* @__PURE__ */ jsx2("span", { className: "ui-social-media-button__label", children: resolvedLabel })
        ] }),
        resolvedShowCount ? /* @__PURE__ */ jsxs2("span", { className: "ui-social-media-button__count-wrap", children: [
          resolvedShowGitHubStar ? /* @__PURE__ */ jsx2("svg", { className: "ui-social-media-button__star-icon", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx2(
            "path",
            {
              clipRule: "evenodd",
              d: "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z",
              fillRule: "evenodd"
            }
          ) }) : null,
          /* @__PURE__ */ jsx2("span", { className: "ui-social-media-button__count", children: count })
        ] }) : null
      ]
    }
  );
}

// src/components/pill-button.tsx
import styled from "styled-components";
import { jsx as jsx3 } from "react/jsx-runtime";
function PillButton({ label = "Pill button", onClick }) {
  return /* @__PURE__ */ jsx3(StyledWrapper, { children: /* @__PURE__ */ jsx3("button", { type: "button", className: "button", onClick, children: /* @__PURE__ */ jsx3("div", { children: /* @__PURE__ */ jsx3("div", { children: /* @__PURE__ */ jsx3("div", { children: label }) }) }) }) });
}
var StyledWrapper = styled.div`
  .button {
    --stone-50: #fafaf9;
    --stone-800: #292524;
    --yellow-400: #facc15;

    font-family: "Rubik", sans-serif;
    cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    line-height: 1;
    font-size: 1rem;
    border-radius: 1rem;
    outline: 2px solid transparent;
    outline-offset: 6px;
    color: var(--stone-50);
    border: 0;
    background: transparent;
  }

  .button:active {
    outline-color: var(--yellow-400);
  }

  .button:focus-visible {
    outline-color: var(--yellow-400);
    outline-style: dashed;
  }

  .button::before {
    content: "";
    position: absolute;
    z-index: 0;
    height: 200%;
    max-height: 100px;
    aspect-ratio: 1;
    margin: auto;
    background: white;
    clip-path: polygon(
      100% 50%,
      91.48% 56.57%,
      97.55% 65.45%,
      87.42% 69.07%,
      90.45% 79.39%,
      79.7% 79.7%,
      79.39% 90.45%,
      69.07% 87.42%,
      65.45% 97.55%,
      56.57% 91.48%,
      50% 100%,
      43.43% 91.48%,
      34.55% 97.55%,
      30.93% 87.42%,
      20.61% 90.45%,
      20.3% 79.7%,
      9.55% 79.39%,
      12.58% 69.07%,
      2.45% 65.45%,
      8.52% 56.57%,
      0% 50%,
      8.52% 43.43%,
      2.45% 34.55%,
      12.58% 30.93%,
      9.55% 20.61%,
      20.3% 20.3%,
      20.61% 9.55%,
      30.93% 12.58%,
      34.55% 2.45%,
      43.43% 8.52%,
      50% 0%,
      56.57% 8.52%,
      65.45% 2.45%,
      69.07% 12.58%,
      79.39% 9.55%,
      79.7% 20.3%,
      90.45% 20.61%,
      87.42% 30.93%,
      97.55% 34.55%,
      91.48% 43.43%
    );
    animation: star-rotate 4s linear infinite;
    opacity: 0.1;
  }

  .button:hover::before {
    opacity: 1;
  }

  .button > div {
    padding: 2px;
    border-radius: 1rem;
    background-color: var(--yellow-400);
    transform: translate(-4px, -4px);
    transition: all 150ms ease;
    box-shadow:
      0.5px 0.5px 0 0 var(--yellow-400),
      1px 1px 0 0 var(--yellow-400),
      1.5px 1.5px 0 0 var(--yellow-400),
      2px 2px 0 0 var(--yellow-400),
      2.5px 2.5px 0 0 var(--yellow-400),
      3px 3px 0 0 var(--yellow-400),
      0 0 0 2px var(--stone-800),
      0.5px 0.5px 0 2px var(--stone-800),
      1px 1px 0 2px var(--stone-800),
      1.5px 1.5px 0 2px var(--stone-800),
      2px 2px 0 2px var(--stone-800),
      2.5px 2.5px 0 2px var(--stone-800),
      3px 3px 0 2px var(--stone-800),
      3.5px 3.5px 0 2px var(--stone-800),
      4px 4px 0 2px var(--stone-800),
      0 0 0 4px var(--stone-50),
      0.5px 0.5px 0 4px var(--stone-50),
      1px 1px 0 4px var(--stone-50),
      1.5px 1.5px 0 4px var(--stone-50),
      2px 2px 0 4px var(--stone-50),
      2.5px 2.5px 0 4px var(--stone-50),
      3px 3px 0 4px var(--stone-50),
      3.5px 3.5px 0 4px var(--stone-50),
      4px 4px 0 4px var(--stone-50);
  }

  .button:hover > div {
    transform: translate(0, 0);
    box-shadow:
      0 0 0 0 var(--yellow-400),
      0 0 0 0 var(--yellow-400),
      0 0 0 0 var(--yellow-400),
      0 0 0 0 var(--yellow-400),
      0 0 0 0 var(--yellow-400),
      0 0 0 0 var(--yellow-400),
      0 0 0 2px var(--stone-800),
      0 0 0 2px var(--stone-800),
      0 0 0 2px var(--stone-800),
      0 0 0 2px var(--stone-800),
      0 0 0 2px var(--stone-800),
      0 0 0 2px var(--stone-800),
      0 0 0 2px var(--stone-800),
      0 0 0 2px var(--stone-800),
      0 0 0 2px var(--stone-800),
      0 0 0 4px var(--stone-50),
      0 0 0 4px var(--stone-50),
      0 0 0 4px var(--stone-50),
      0 0 0 4px var(--stone-50),
      0 0 0 4px var(--stone-50),
      0 0 0 4px var(--stone-50),
      0 0 0 4px var(--stone-50),
      0 0 0 4px var(--stone-50),
      0 0 0 4px var(--stone-50);
  }

  .button > div > div {
    position: relative;
    pointer-events: none;
    border-radius: calc(1rem - 2px);
    background-color: var(--stone-800);
  }

  .button > div > div::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 1rem;
    opacity: 0.1;
    background-image:
      radial-gradient(rgb(255 255 255 / 80%) 20%, transparent 20%),
      radial-gradient(rgb(255 255 255 / 100%) 20%, transparent 20%);
    background-position:
      0 0,
      4px 4px;
    background-size: 8px 8px;
    mix-blend-mode: hard-light;
    box-shadow: inset 0 0 0 1px var(--stone-800);
    animation: dots 0.4s infinite linear;
    transition: opacity 150ms ease;
  }

  .button > div > div > div {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.75rem 1.25rem;
    gap: 0.25rem;
    filter: drop-shadow(0 -1px 0 var(--stone-800));
  }

  .button:hover > div > div > div {
    filter: drop-shadow(0 -1px 0 rgba(255, 255, 255, 0.1));
  }

  .button:active > div > div > div {
    transform: translateY(2px);
  }

  @keyframes star-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes dots {
    0% {
      background-position:
        0 0,
        4px 4px;
    }
    100% {
      background-position:
        8px 0,
        12px 4px;
    }
  }

  @media (prefers-color-scheme: dark) {
    .button:active,
    .button:focus-visible {
      outline-color: var(--yellow-400);
    }
  }
`;

// src/components/message-send-button.tsx
import { useMemo } from "react";
import styled2 from "styled-components";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function MessageSendButton({
  defaultText = "SendMessage",
  sentText = "Sent",
  onClick
}) {
  const defaultChars = useMemo(() => defaultText.split(""), [defaultText]);
  const sentChars = useMemo(() => sentText.split(""), [sentText]);
  return /* @__PURE__ */ jsx4(StyledWrapper2, { children: /* @__PURE__ */ jsxs3("button", { type: "button", className: "button", onClick, children: [
    /* @__PURE__ */ jsx4("div", { className: "outline" }),
    /* @__PURE__ */ jsxs3("div", { className: "state state--default", children: [
      /* @__PURE__ */ jsx4("div", { className: "icon", children: /* @__PURE__ */ jsxs3("svg", { width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsxs3("g", { filter: "url(#shadow-default)", children: [
          /* @__PURE__ */ jsx4(
            "path",
            {
              d: "M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z",
              fill: "currentColor"
            }
          ),
          /* @__PURE__ */ jsx4(
            "path",
            {
              d: "M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z",
              fill: "currentColor"
            }
          )
        ] }),
        /* @__PURE__ */ jsx4("defs", { children: /* @__PURE__ */ jsx4("filter", { id: "shadow-default", children: /* @__PURE__ */ jsx4("feDropShadow", { dx: "0", dy: "1", stdDeviation: "0.6", floodOpacity: "0.5" }) }) })
      ] }) }),
      /* @__PURE__ */ jsx4("p", { children: defaultChars.map((char, index) => /* @__PURE__ */ jsx4("span", { style: { "--i": index }, children: char }, `default-${index}`)) })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "state state--sent", children: [
      /* @__PURE__ */ jsx4("div", { className: "icon", children: /* @__PURE__ */ jsxs3("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", height: "1em", width: "1em", strokeWidth: "0.5px", stroke: "black", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsxs3("g", { filter: "url(#shadow-sent)", children: [
          /* @__PURE__ */ jsx4(
            "path",
            {
              fill: "currentColor",
              d: "M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
            }
          ),
          /* @__PURE__ */ jsx4(
            "path",
            {
              fill: "currentColor",
              d: "M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"
            }
          )
        ] }),
        /* @__PURE__ */ jsx4("defs", { children: /* @__PURE__ */ jsx4("filter", { id: "shadow-sent", children: /* @__PURE__ */ jsx4("feDropShadow", { dx: "0", dy: "1", stdDeviation: "0.6", floodOpacity: "0.5" }) }) })
      ] }) }),
      /* @__PURE__ */ jsx4("p", { children: sentChars.map((char, index) => /* @__PURE__ */ jsx4("span", { style: { "--i": index + 5 }, children: char }, `sent-${index}`)) })
    ] })
  ] }) });
}
var StyledWrapper2 = styled2.div`
  .button {
    --primary: #ff5569;
    --neutral-1: #f7f8f7;
    --neutral-2: #e7e7e7;
    --radius: 14px;

    cursor: pointer;
    border-radius: var(--radius);
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    border: none;
    box-shadow:
      0 0.5px 0.5px 1px rgba(255, 255, 255, 0.2),
      0 10px 20px rgba(0, 0, 0, 0.2),
      0 4px 5px 0 rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.3s ease;
    min-width: 200px;
    padding: 20px;
    height: 68px;
    font-family: "Galano Grotesque", Poppins, Montserrat, sans-serif;
    font-style: normal;
    font-size: 18px;
    font-weight: 600;
    background: transparent;
  }
  .button:hover {
    transform: scale(1.02);
    box-shadow:
      0 0 1px 2px rgba(255, 255, 255, 0.3),
      0 15px 30px rgba(0, 0, 0, 0.3),
      0 10px 3px -3px rgba(0, 0, 0, 0.04);
  }
  .button:active {
    transform: scale(1);
    box-shadow:
      0 0 1px 2px rgba(255, 255, 255, 0.3),
      0 10px 3px -3px rgba(0, 0, 0, 0.2);
  }
  .button:after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: var(--radius);
    border: 2.5px solid transparent;
    background:
      linear-gradient(var(--neutral-1), var(--neutral-2)) padding-box,
      linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.45)) border-box;
    z-index: 0;
    transition: all 0.4s ease;
  }
  .button:hover::after {
    transform: scale(1.05, 1.1);
    box-shadow: inset 0 -1px 3px 0 rgba(255, 255, 255, 1);
  }
  .button::before {
    content: "";
    inset: 7px 6px 6px 6px;
    position: absolute;
    background: linear-gradient(to top, var(--neutral-1), var(--neutral-2));
    border-radius: 30px;
    filter: blur(0.5px);
    z-index: 2;
  }
  .state p {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .state .icon {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    transform: scale(1.25);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .state .icon svg {
    overflow: visible;
  }
  .outline {
    position: absolute;
    border-radius: inherit;
    overflow: hidden;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.4s ease;
    inset: -2px -3.5px;
  }
  .outline::before {
    content: "";
    position: absolute;
    inset: -100%;
    background: conic-gradient(from 180deg, transparent 60%, white 80%, transparent 100%);
    animation: spin 2s linear infinite;
    animation-play-state: paused;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .button:hover .outline {
    opacity: 1;
  }
  .button:hover .outline::before {
    animation-play-state: running;
  }
  .state p span {
    display: block;
    opacity: 0;
    animation: slideDown 0.8s ease forwards calc(var(--i) * 0.03s);
  }
  .button:hover p span {
    opacity: 1;
    animation: wave 0.5s ease forwards calc(var(--i) * 0.02s);
  }
  .button:focus p span {
    opacity: 1;
    animation: disappear 0.6s ease forwards calc(var(--i) * 0.03s);
  }
  @keyframes wave {
    30% {
      opacity: 1;
      transform: translateY(4px) translateX(0) rotate(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-3px) translateX(0) rotate(0);
      color: var(--primary);
    }
    100% {
      opacity: 1;
      transform: translateY(0) translateX(0) rotate(0);
    }
  }
  @keyframes slideDown {
    0% {
      opacity: 0;
      transform: translateY(-20px) translateX(5px) rotate(-90deg);
      color: var(--primary);
      filter: blur(5px);
    }
    30% {
      opacity: 1;
      transform: translateY(4px) translateX(0) rotate(0);
      filter: blur(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-3px) translateX(0) rotate(0);
    }
    100% {
      opacity: 1;
      transform: translateY(0) translateX(0) rotate(0);
    }
  }
  @keyframes disappear {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: translateX(5px) translateY(20px);
      color: var(--primary);
      filter: blur(5px);
    }
  }
  .state--default .icon svg {
    animation: land 0.6s ease forwards;
  }
  .button:hover .state--default .icon {
    transform: rotate(45deg) scale(1.25);
  }
  .button:focus .state--default svg {
    animation: takeOff 0.8s linear forwards;
  }
  .button:focus .state--default .icon {
    transform: rotate(0) scale(1.25);
  }
  @keyframes takeOff {
    0% {
      opacity: 1;
    }
    60% {
      opacity: 1;
      transform: translateX(70px) rotate(45deg) scale(2);
    }
    100% {
      opacity: 0;
      transform: translateX(160px) rotate(45deg) scale(0);
    }
  }
  @keyframes land {
    0% {
      transform: translateX(-60px) translateY(30px) rotate(-50deg) scale(2);
      opacity: 0;
      filter: blur(3px);
    }
    100% {
      transform: translateX(0) translateY(0) rotate(0);
      opacity: 1;
      filter: blur(0);
    }
  }
  .state--default .icon:before {
    content: "";
    position: absolute;
    top: 50%;
    height: 2px;
    width: 0;
    left: -5px;
    background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.5));
  }
  .button:focus .state--default .icon:before {
    animation: contrail 0.8s linear forwards;
  }
  @keyframes contrail {
    0% {
      width: 0;
      opacity: 1;
    }
    8% {
      width: 15px;
    }
    60% {
      opacity: 0.7;
      width: 80px;
    }
    100% {
      opacity: 0;
      width: 160px;
    }
  }
  .state {
    padding-left: 29px;
    z-index: 2;
    display: flex;
    position: relative;
  }
  .state--default span:nth-child(4) {
    margin-right: 5px;
  }
  .state--sent {
    display: none;
  }
  .state--sent svg {
    transform: scale(1.25);
    margin-right: 8px;
  }
  .button:focus .state--default {
    position: absolute;
  }
  .button:focus .state--sent {
    display: flex;
  }
  .button:focus .state--sent span {
    opacity: 0;
    animation: slideDown 0.8s ease forwards calc(var(--i) * 0.2s);
  }
  .button:focus .state--sent .icon svg {
    opacity: 0;
    animation: appear 1.2s ease forwards 0.8s;
  }
  @keyframes appear {
    0% {
      opacity: 0;
      transform: scale(4) rotate(-40deg);
      color: var(--primary);
      filter: blur(4px);
    }
    30% {
      opacity: 1;
      transform: scale(0.6);
      filter: blur(1px);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
      filter: blur(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

// src/components/oauth-form.tsx
import { useState as useState2 } from "react";
import styled3 from "styled-components";
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function OAuthForm({
  title = "Welcome,",
  subtitle = "sign in to continue",
  emailPlaceholder = "Email",
  googleLabel = "Continue with Google",
  githubLabel = "Continue with Github",
  continueLabel = "Continue",
  showGoogle = true,
  showGithub = true,
  defaultEmail = "",
  onGoogleClick,
  onGithubClick,
  onContinue
}) {
  const [email, setEmail] = useState2(defaultEmail);
  const handleSubmit = (event) => {
    event.preventDefault();
    onContinue?.(email);
  };
  return /* @__PURE__ */ jsx5(StyledWrapper3, { children: /* @__PURE__ */ jsxs4("form", { className: "ui-oauth-form", onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxs4("p", { children: [
      title,
      /* @__PURE__ */ jsx5("span", { children: subtitle })
    ] }),
    showGoogle ? /* @__PURE__ */ jsxs4("button", { type: "button", className: "oauthButton", onClick: onGoogleClick, children: [
      /* @__PURE__ */ jsxs4("svg", { className: "icon", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx5("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }),
        /* @__PURE__ */ jsx5("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }),
        /* @__PURE__ */ jsx5("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill: "#FBBC05" }),
        /* @__PURE__ */ jsx5("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" }),
        /* @__PURE__ */ jsx5("path", { d: "M1 1h22v22H1z", fill: "none" })
      ] }),
      googleLabel
    ] }) : null,
    showGithub ? /* @__PURE__ */ jsxs4("button", { type: "button", className: "oauthButton", onClick: onGithubClick, children: [
      /* @__PURE__ */ jsx5("svg", { className: "icon", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx5("path", { d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" }) }),
      githubLabel
    ] }) : null,
    showGoogle || showGithub ? /* @__PURE__ */ jsxs4("div", { className: "separator", children: [
      /* @__PURE__ */ jsx5("div", {}),
      /* @__PURE__ */ jsx5("span", { children: "OR" }),
      /* @__PURE__ */ jsx5("div", {})
    ] }) : null,
    /* @__PURE__ */ jsx5(
      "input",
      {
        type: "email",
        placeholder: emailPlaceholder,
        name: "email",
        value: email,
        onChange: (event) => setEmail(event.target.value)
      }
    ),
    /* @__PURE__ */ jsxs4("button", { type: "submit", className: "oauthButton", children: [
      continueLabel,
      /* @__PURE__ */ jsxs4(
        "svg",
        {
          className: "icon",
          xmlns: "http://www.w3.org/2000/svg",
          width: 24,
          height: 24,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsx5("path", { d: "m6 17 5-5-5-5" }),
            /* @__PURE__ */ jsx5("path", { d: "m13 17 5-5-5-5" })
          ]
        }
      )
    ] })
  ] }) });
}
var StyledWrapper3 = styled3.div`
  .ui-oauth-form {
    --background: #d3d3d3;
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --main-color: #323232;
    padding: 20px;
    background: var(--background);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
  }

  .ui-oauth-form > p {
    color: var(--font-color);
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }

  .ui-oauth-form > p > span {
    color: var(--font-color-sub);
    font-weight: 600;
    font-size: 17px;
  }

  .separator {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .separator > div {
    width: 100px;
    height: 3px;
    border-radius: 5px;
    background-color: var(--font-color-sub);
  }

  .separator > span {
    color: var(--font-color);
    font-weight: 600;
  }

  .oauthButton {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 0 15px;
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 16px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
    transition: all 250ms;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }

  .oauthButton::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background-color: #212121;
    z-index: -1;
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    transition: all 250ms;
  }

  .oauthButton:hover {
    color: #e8e8e8;
  }

  .oauthButton:hover::before {
    width: 100%;
  }

  .ui-oauth-form > input {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .ui-oauth-form > input:focus {
    border-color: var(--input-focus);
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
  }
`;

// src/components/hover-tooltip-card.tsx
import styled4 from "styled-components";
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
function HoverTooltipCard({
  tooltipText = "sparkle/ui",
  frontText = "Tooltip \u{1F446}",
  revealText = "Hello! \u{1F44B}"
}) {
  return /* @__PURE__ */ jsx6(StyledWrapper4, { children: /* @__PURE__ */ jsxs5("div", { className: "tooltip-container", children: [
    /* @__PURE__ */ jsx6("span", { className: "tooltip", children: tooltipText }),
    /* @__PURE__ */ jsx6("span", { className: "text", children: frontText }),
    /* @__PURE__ */ jsx6("span", { className: "reveal", children: revealText })
  ] }) });
}
var StyledWrapper4 = styled4.div`
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
`;

// src/components/star-rating-radio.tsx
import { useId } from "react";
import styled5 from "styled-components";
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
function StarRatingRadio({
  max = 5,
  name,
  value = 0,
  onChange
}) {
  const id = useId();
  const groupName = name ?? `star-rating-${id}`;
  const stars = Array.from({ length: Math.max(1, max) }, (_, i) => i + 1);
  return /* @__PURE__ */ jsx7(StyledWrapper5, { children: /* @__PURE__ */ jsx7("div", { className: "rating", children: stars.map((starValue) => {
    const starId = `${groupName}-${starValue}`;
    return /* @__PURE__ */ jsxs6("span", { children: [
      /* @__PURE__ */ jsx7(
        "input",
        {
          type: "radio",
          id: starId,
          name: groupName,
          checked: value === starValue,
          onChange: () => onChange?.(starValue),
          value: starValue
        }
      ),
      /* @__PURE__ */ jsx7("label", { htmlFor: starId, children: /* @__PURE__ */ jsx7("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx7("path", { pathLength: 360, d: "M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" }) }) })
    ] }, starId);
  }) }) });
}
var StyledWrapper5 = styled5.div`
  .rating {
    display: flex;
    flex-direction: row-reverse;
    gap: 0.3rem;
    --stroke: #666;
    --fill: #ffc73a;
  }

  .rating input {
    appearance: unset;
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .rating label {
    cursor: pointer;
  }

  .rating svg {
    width: 2rem;
    height: 2rem;
    overflow: visible;
    fill: transparent;
    stroke: var(--stroke);
    stroke-linejoin: bevel;
    stroke-dasharray: 12;
    animation: idle 4s linear infinite;
    transition: stroke 0.2s, fill 0.5s;
  }

  @keyframes idle {
    from {
      stroke-dashoffset: 24;
    }
  }

  .rating label:hover svg {
    stroke: var(--fill);
  }

  .rating input:checked ~ label svg {
    transition: 0s;
    animation: idle 4s linear infinite, yippee 0.75s backwards;
    fill: var(--fill);
    stroke: var(--fill);
    stroke-opacity: 0;
    stroke-dasharray: 0;
    stroke-linejoin: miter;
    stroke-width: 8px;
  }

  @keyframes yippee {
    0% {
      transform: scale(1);
      fill: var(--fill);
      fill-opacity: 0;
      stroke-opacity: 1;
      stroke: var(--stroke);
      stroke-dasharray: 10;
      stroke-width: 1px;
      stroke-linejoin: bevel;
    }

    30% {
      transform: scale(0);
      fill: var(--fill);
      fill-opacity: 0;
      stroke-opacity: 1;
      stroke: var(--stroke);
      stroke-dasharray: 10;
      stroke-width: 1px;
      stroke-linejoin: bevel;
    }

    30.1% {
      stroke: var(--fill);
      stroke-dasharray: 0;
      stroke-linejoin: miter;
      stroke-width: 8px;
    }

    60% {
      transform: scale(1.2);
      fill: var(--fill);
    }
  }
`;

// src/components/lock-switch.tsx
import { useId as useId2, useState as useState3 } from "react";
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
function LockSwitch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = "md",
  tone = "default",
  motion: motion3 = "smooth",
  showStateLabel = false,
  lockedLabel = "Locked",
  unlockedLabel = "Unlocked",
  lockedColor,
  unlockedColor,
  knobColor,
  ariaLabel = "Toggle lock switch",
  id,
  className
}) {
  const generatedId = useId2();
  const inputId = id ?? `lock-switch-${generatedId}`;
  const [internalChecked, setInternalChecked] = useState3(defaultChecked);
  const isControlled = checked !== void 0;
  const isChecked = isControlled ? checked : internalChecked;
  const handleChange = (next) => {
    if (!isControlled) {
      setInternalChecked(next);
    }
    onCheckedChange?.(next);
  };
  const style = {
    "--lock-switch-locked": lockedColor,
    "--lock-switch-unlocked": unlockedColor,
    "--lock-switch-knob": knobColor
  };
  return /* @__PURE__ */ jsxs7("div", { className: `ui-lock-switch-shell ${className ?? ""}`, children: [
    /* @__PURE__ */ jsxs7(
      "label",
      {
        htmlFor: inputId,
        className: `ui-lock-switch ui-lock-switch--${size} ui-lock-switch--${tone} ui-lock-switch--${motion3} ${disabled ? "is-disabled" : ""}`,
        "aria-disabled": disabled,
        style,
        children: [
          /* @__PURE__ */ jsx8(
            "input",
            {
              id: inputId,
              type: "checkbox",
              "aria-label": ariaLabel,
              className: "ui-lock-switch__input",
              checked: isChecked,
              disabled,
              onChange: (event) => handleChange(event.target.checked)
            }
          ),
          /* @__PURE__ */ jsxs7("span", { className: "ui-lock-switch__track", children: [
            /* @__PURE__ */ jsx8("svg", { className: "ui-lock-switch__icon ui-lock-switch__icon--locked", viewBox: "0 0 100 100", "aria-hidden": "true", children: /* @__PURE__ */ jsx8("path", { d: "M50,18A19.9,19.9,0,0,0,30,38v8a8,8,0,0,0-8,8V74a8,8,0,0,0,8,8H70a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H38V38a12,12,0,0,1,23.6-3,4,4,0,1,0,7.8-2A20.1,20.1,0,0,0,50,18Z" }) }),
            /* @__PURE__ */ jsx8("svg", { className: "ui-lock-switch__icon ui-lock-switch__icon--unlocked", viewBox: "0 0 100 100", "aria-hidden": "true", children: /* @__PURE__ */ jsx8(
              "path",
              {
                d: "M30,46V38a20,20,0,0,1,40,0v8a8,8,0,0,1,8,8V74a8,8,0,0,1-8,8H30a8,8,0,0,1-8-8V54A8,8,0,0,1,30,46Zm32-8v8H38V38a12,12,0,0,1,24,0Z",
                fillRule: "evenodd",
                clipRule: "evenodd"
              }
            ) })
          ] })
        ]
      }
    ),
    showStateLabel ? /* @__PURE__ */ jsx8("span", { className: `ui-lock-switch__state ${isChecked ? "is-checked" : ""}`, children: isChecked ? lockedLabel : unlockedLabel }) : null
  ] });
}

// src/components/elastic-slider.tsx
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from "motion/react";
import { useEffect as useEffect2, useRef as useRef2, useState as useState4 } from "react";
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
var MAX_OVERFLOW = 50;
function ElasticSlider({
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
  onChange
}) {
  const sliderRef = useRef2(null);
  const [region, setRegion] = useState4("middle");
  const clientX = useMotionValue(0);
  const overflow = useMotionValue(0);
  const scale = useMotionValue(1);
  useEffect2(() => {
    if (value < startingValue) onChange(startingValue);
    if (value > maxValue) onChange(maxValue);
  }, [maxValue, onChange, startingValue, value]);
  useMotionValueEvent(clientX, "change", (latest) => {
    if (!sliderRef.current) return;
    const { left, right } = sliderRef.current.getBoundingClientRect();
    let newValue = 0;
    if (latest < left) {
      setRegion("left");
      newValue = left - latest;
    } else if (latest > right) {
      setRegion("right");
      newValue = latest - right;
    } else {
      setRegion("middle");
    }
    overflow.jump(decay(newValue, MAX_OVERFLOW));
  });
  const handlePointerMove = (event) => {
    if (event.buttons <= 0 || !sliderRef.current) return;
    const { left, width } = sliderRef.current.getBoundingClientRect();
    let nextValue = startingValue + (event.clientX - left) / width * (maxValue - startingValue);
    if (isStepped) nextValue = Math.round(nextValue / stepSize) * stepSize;
    nextValue = Math.min(Math.max(nextValue, startingValue), maxValue);
    onChange(nextValue);
    clientX.jump(event.clientX);
  };
  const handlePointerDown = (event) => {
    handlePointerMove(event);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handlePointerUp = () => {
    animate(overflow, 0, { type: "spring", bounce: 0.5 });
  };
  const totalRange = maxValue - startingValue;
  const rangePercentage = totalRange <= 0 ? 0 : (value - startingValue) / totalRange * 100;
  return /* @__PURE__ */ jsxs8("div", { className: `elastic-slider-container ${className}`, children: [
    /* @__PURE__ */ jsxs8(
      motion.div,
      {
        onHoverStart: () => animate(scale, enhancedEffects ? 1.04 : 1),
        onHoverEnd: () => animate(scale, 1),
        onTouchStart: () => animate(scale, enhancedEffects ? 1.04 : 1),
        onTouchEnd: () => animate(scale, 1),
        style: { scale, opacity: useTransform(scale, [1, 1.04], [0.9, 1]) },
        className: "elastic-slider-wrapper",
        children: [
          /* @__PURE__ */ jsx9(
            motion.div,
            {
              animate: { scale: enhancedEffects && region === "left" ? [1, 1.35, 1] : 1, transition: { duration: 0.25 } },
              style: { x: useTransform(() => region === "left" ? -overflow.get() / scale.get() : 0) },
              className: "elastic-slider-icon",
              children: leftIcon
            }
          ),
          /* @__PURE__ */ jsx9(
            "div",
            {
              ref: sliderRef,
              className: "elastic-slider-root",
              onPointerMove: handlePointerMove,
              onPointerDown: handlePointerDown,
              onPointerUp: handlePointerUp,
              children: /* @__PURE__ */ jsx9(
                motion.div,
                {
                  style: {
                    scaleX: useTransform(() => {
                      if (!sliderRef.current) return 1;
                      const { width } = sliderRef.current.getBoundingClientRect();
                      return 1 + overflow.get() / width;
                    }),
                    scaleY: useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.78]),
                    transformOrigin: useTransform(() => {
                      if (!sliderRef.current) return "left";
                      const { left, width } = sliderRef.current.getBoundingClientRect();
                      return clientX.get() < left + width / 2 ? "right" : "left";
                    })
                  },
                  className: "elastic-slider-track-wrapper",
                  children: /* @__PURE__ */ jsx9("div", { className: "elastic-slider-track", children: /* @__PURE__ */ jsx9("div", { className: "elastic-slider-range", style: { width: `${rangePercentage}%` } }) })
                }
              )
            }
          ),
          /* @__PURE__ */ jsx9(
            motion.div,
            {
              animate: { scale: enhancedEffects && region === "right" ? [1, 1.35, 1] : 1, transition: { duration: 0.25 } },
              style: { x: useTransform(() => region === "right" ? overflow.get() / scale.get() : 0) },
              className: "elastic-slider-icon",
              children: rightIcon
            }
          )
        ]
      }
    ),
    showValueIndicator ? /* @__PURE__ */ jsx9("p", { className: `elastic-slider-value elastic-slider-value--${valuePosition}`, children: Math.round(value) }) : null
  ] });
}
function decay(value, max) {
  if (max === 0) return 0;
  const entry = value / max;
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);
  return sigmoid * max;
}

// src/components/segmented-control.tsx
import { useRef as useRef3, useState as useState5 } from "react";
import { jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
function SegmentedControl({
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
  style
}) {
  const containerRef = useRef3(null);
  const [isDragging, setIsDragging] = useState5(false);
  const currentIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value)
  );
  const onKeyDown = (event) => {
    if (!options.length) {
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % options.length;
      onChange(options[nextIndex].value);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + options.length) % options.length;
      onChange(options[prevIndex].value);
    }
  };
  const selectByClientX = (clientX) => {
    if (!containerRef.current || options.length === 0) {
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const nextIndex = Math.min(
      options.length - 1,
      Math.max(0, Math.floor(x / rect.width * options.length))
    );
    onChange(options[nextIndex].value);
  };
  const onPointerDown = (event) => {
    if (!draggable) return;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    selectByClientX(event.clientX);
  };
  const onPointerMove = (event) => {
    if (!isDragging) {
      return;
    }
    selectByClientX(event.clientX);
  };
  const onPointerUp = () => {
    setIsDragging(false);
  };
  const colors = createSegmentedColors(accentColor, secondaryColor);
  return /* @__PURE__ */ jsxs9(
    "div",
    {
      ref: containerRef,
      className: `segmented-control ${className ?? ""}`.trim(),
      "data-dragging": isDragging ? "true" : "false",
      "data-draggable": draggable ? "true" : "false",
      role: "radiogroup",
      "aria-label": ariaLabel,
      onKeyDown,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      style: {
        "--seg-radius": `${radius}px`,
        "--seg-pill-inset": `${pillInset}px`,
        "--seg-pill-radius": `${pillRadius}px`,
        "--seg-height": `${height}px`,
        "--seg-font-size": `${fontSize}px`,
        "--seg-bg": colors.backgroundColor,
        "--seg-border": colors.borderColor,
        "--seg-text": colors.textColor,
        "--seg-accent-secondary": colors.secondaryColor,
        ...style
      },
      children: [
        /* @__PURE__ */ jsx10(
          "div",
          {
            className: "segmented-control__active-pill",
            style: {
              width: `calc((100% - (var(--seg-pill-inset) * 2)) / ${Math.max(options.length, 1)})`,
              transform: `translateX(${currentIndex * 100}%)`
            }
          }
        ),
        options.map((option) => {
          const isActive = option.value === value;
          return /* @__PURE__ */ jsx10(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": isActive,
              className: `segmented-control__button ${isActive ? "is-active" : ""}`,
              onClick: () => onChange(option.value),
              "aria-label": option.label,
              children: contentMode === "visual" && option.visual ? /* @__PURE__ */ jsx10("span", { className: "segmented-control__visual", children: option.visual }) : option.label
            },
            option.value
          );
        })
      ]
    }
  );
}
function createSegmentedColors(primaryHex, secondaryHex) {
  const primary = parseHex(primaryHex) ?? { r: 122, g: 103, b: 199 };
  const luminance = getLuminance(primary);
  const autoSecondary = luminance < 0.24 ? mixRgb(primary, { r: 255, g: 255, b: 255 }, 0.24) : mixRgb(primary, { r: 0, g: 0, b: 0 }, 0.22);
  const secondary = parseHex(secondaryHex ?? "") ?? autoSecondary;
  const background = mixRgb(primary, { r: 244, g: 244, b: 244 }, 0.17);
  const border = mixRgb(secondary, { r: 175, g: 175, b: 175 }, 0.16);
  const text = mixRgb(secondary, { r: 75, g: 75, b: 75 }, 0.14);
  return {
    backgroundColor: rgbToHex(background),
    borderColor: rgbToHex(border),
    textColor: rgbToHex(text),
    secondaryColor: rgbToHex(secondary)
  };
}
function parseHex(value) {
  const normalized = value.trim().replace("#", "");
  const hex = normalized.length === 3 ? normalized.split("").map((char) => `${char}${char}`).join("") : normalized;
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
    return null;
  }
  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16)
  };
}
function rgbToHex({ r, g, b }) {
  const toHex = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
function mixRgb(a, b, amount) {
  const t = Math.max(0, Math.min(1, amount));
  return {
    r: a.r * t + b.r * (1 - t),
    g: a.g * t + b.g * (1 - t),
    b: a.b * t + b.b * (1 - t)
  };
}
function getLuminance({ r, g, b }) {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

// src/components/counter.tsx
import { motion as motion2, useSpring, useTransform as useTransform2 } from "motion/react";
import { useEffect as useEffect3 } from "react";
import { jsx as jsx11, jsxs as jsxs10 } from "react/jsx-runtime";
function NumberDigit({
  mv,
  number,
  height
}) {
  const y = useTransform2(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) memo -= 10 * height;
    return memo;
  });
  return /* @__PURE__ */ jsx11(motion2.span, { className: "counter-number", style: { y }, children: number });
}
function Digit({
  place,
  value,
  height,
  digitStyle
}) {
  const isDecimal = place === ".";
  const valueRoundedToPlace = isDecimal ? 0 : Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace);
  useEffect3(() => {
    if (!isDecimal) animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, isDecimal, valueRoundedToPlace]);
  if (isDecimal) {
    return /* @__PURE__ */ jsx11("span", { className: "counter-digit", style: { height, ...digitStyle, width: "fit-content" }, children: "." });
  }
  return /* @__PURE__ */ jsx11("span", { className: "counter-digit", style: { height, ...digitStyle }, children: Array.from({ length: 10 }, (_, i) => /* @__PURE__ */ jsx11(NumberDigit, { mv: animatedValue, number: i, height }, i)) });
}
function Counter({
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
  bottomGradientStyle
}) {
  const derivedPlaces = places ?? getPlaces(value, digitPlaceHolders);
  const height = fontSize + padding;
  return /* @__PURE__ */ jsxs10("span", { className: "counter-container", style: containerStyle, children: [
    /* @__PURE__ */ jsx11(
      "span",
      {
        className: "counter-counter",
        style: {
          fontSize,
          gap,
          borderRadius,
          paddingLeft: horizontalPadding,
          paddingRight: horizontalPadding,
          color: textColor,
          fontWeight,
          ...counterStyle
        },
        children: derivedPlaces.map((place, idx) => /* @__PURE__ */ jsx11(Digit, { place, value, height, digitStyle }, `${place}-${idx}`))
      }
    ),
    /* @__PURE__ */ jsxs10("span", { className: "gradient-container", children: [
      /* @__PURE__ */ jsx11(
        "span",
        {
          className: "top-gradient",
          style: topGradientStyle ?? {
            height: gradientHeight,
            background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`
          }
        }
      ),
      /* @__PURE__ */ jsx11(
        "span",
        {
          className: "bottom-gradient",
          style: bottomGradientStyle ?? {
            height: gradientHeight,
            background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`
          }
        }
      )
    ] })
  ] });
}
function getPlaces(value, digitPlaceHolders) {
  if (digitPlaceHolders) return [100, 10, 1];
  const str = String(value);
  return [...str].map((ch, i, arr) => {
    if (ch === ".") return ".";
    const dot = arr.indexOf(".");
    if (dot === -1) return 10 ** (arr.length - i - 1);
    return i < dot ? 10 ** (dot - i - 1) : 10 ** -(i - dot);
  });
}

// ../../node_modules/lucide-react/dist/esm/createLucideIcon.js
import { forwardRef as forwardRef3, createElement as createElement2 } from "react";

// ../../node_modules/lucide-react/dist/esm/shared/src/utils.js
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
var toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
var hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};

// ../../node_modules/lucide-react/dist/esm/Icon.js
import { forwardRef as forwardRef2, createElement } from "react";

// ../../node_modules/lucide-react/dist/esm/defaultAttributes.js
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

// ../../node_modules/lucide-react/dist/esm/Icon.js
var Icon = forwardRef2(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);

// ../../node_modules/lucide-react/dist/esm/createLucideIcon.js
var createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef3(
    ({ className, ...props }, ref) => createElement2(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};

// ../../node_modules/lucide-react/dist/esm/icons/x.js
var __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
var X = createLucideIcon("x", __iconNode);

// src/components/badge.tsx
import { jsx as jsx12, jsxs as jsxs11 } from "react/jsx-runtime";
function Badge({
  label,
  tone = "neutral",
  appearance = "soft",
  size = "md",
  dot = false,
  icon,
  removable = false,
  onRemove,
  animation,
  className
}) {
  const animations = Array.isArray(animation) ? animation : animation ? [animation] : [];
  const animationClasses = animations.map((name) => `ui-badge--anim-${name}`).join(" ");
  return /* @__PURE__ */ jsxs11(
    "span",
    {
      className: `ui-badge ui-badge--${tone} ui-badge--${appearance} ui-badge--${size} ${animationClasses} ${className ?? ""}`,
      children: [
        dot ? /* @__PURE__ */ jsx12("span", { className: "ui-badge__dot" }) : null,
        icon ? /* @__PURE__ */ jsx12("span", { className: "ui-badge__icon", children: icon }) : null,
        /* @__PURE__ */ jsx12("span", { children: label }),
        removable ? /* @__PURE__ */ jsx12("button", { type: "button", className: "ui-badge__remove", "aria-label": `Remove ${label}`, onClick: onRemove, children: /* @__PURE__ */ jsx12(X, { className: "h-3 w-3" }) }) : null
      ]
    }
  );
}

// src/components/avatar.tsx
import { useMemo as useMemo2, useState as useState6 } from "react";
import { Fragment, jsx as jsx13, jsxs as jsxs12 } from "react/jsx-runtime";
function getFallback(fallback, alt) {
  if (fallback && fallback.trim().length > 0) return fallback.trim().slice(0, 2).toUpperCase();
  if (alt && alt.trim().length > 0) {
    const words = alt.trim().split(/\s+/).slice(0, 2);
    return words.map((word) => word[0]?.toUpperCase() ?? "").join("");
  }
  return "UI";
}
function Avatar({
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
}) {
  const [imageFailed, setImageFailed] = useState6(false);
  const fallbackText = useMemo2(() => getFallback(fallback, alt), [fallback, alt]);
  const showImage = Boolean(src) && !imageFailed;
  const renderExpandedContent = () => {
    if (expandedContent) return expandedContent;
    if (contentMode === "image") {
      return expandedImageSrc ? /* @__PURE__ */ jsx13("img", { className: "ui-avatar__expanded-image", src: expandedImageSrc, alt: expandedTitle }) : /* @__PURE__ */ jsx13("p", { className: "ui-avatar__expanded-description", children: "Set `expandedImageSrc` to preview image mode." });
    }
    if (contentMode === "button") {
      return /* @__PURE__ */ jsx13("button", { type: "button", className: "ui-avatar__expanded-button", onClick: onExpandedButtonClick, children: expandedButtonLabel });
    }
    if (contentMode === "custom") {
      return /* @__PURE__ */ jsxs12("div", { className: "ui-avatar__expanded-custom", children: [
        /* @__PURE__ */ jsx13(
          "img",
          {
            className: "ui-avatar__expanded-custom-image",
            src: expandedImageSrc || src || "https://i.pravatar.cc/160?img=62",
            alt: expandedTitle
          }
        ),
        /* @__PURE__ */ jsxs12("div", { className: "ui-avatar__expanded-custom-text", children: [
          /* @__PURE__ */ jsx13("p", { className: "ui-avatar__expanded-title", children: expandedTitle }),
          /* @__PURE__ */ jsx13("button", { type: "button", className: "ui-avatar__expanded-button", onClick: onExpandedButtonClick, children: expandedButtonLabel })
        ] })
      ] });
    }
    return /* @__PURE__ */ jsxs12(Fragment, { children: [
      /* @__PURE__ */ jsx13("p", { className: "ui-avatar__expanded-title", children: expandedTitle }),
      /* @__PURE__ */ jsx13("p", { className: "ui-avatar__expanded-description", children: expandedDescription })
    ] });
  };
  return /* @__PURE__ */ jsxs12("span", { className: `ui-avatar-shell ${expandable ? "ui-avatar-shell--expandable" : ""}`, children: [
    /* @__PURE__ */ jsxs12(
      "span",
      {
        className: `ui-avatar ui-avatar--${size} ui-avatar--${shape} ui-avatar--anim-${animation} ${showRing ? "ui-avatar--ring" : ""} ${className ?? ""}`,
        ...props,
        children: [
          showImage ? /* @__PURE__ */ jsx13(
            "img",
            {
              className: "ui-avatar__image",
              src,
              alt,
              onError: () => setImageFailed(true),
              draggable: false
            }
          ) : /* @__PURE__ */ jsx13("span", { className: "ui-avatar__fallback", children: fallbackText }),
          showStatus ? /* @__PURE__ */ jsx13("span", { className: `ui-avatar__status ui-avatar__status--${status}` }) : null
        ]
      }
    ),
    expandable ? /* @__PURE__ */ jsx13("span", { className: "ui-avatar__expanded", "aria-hidden": true, children: renderExpandedContent() }) : null
  ] });
}

// src/components/sidebar-tabs.tsx
import { useMemo as useMemo3, useState as useState7 } from "react";
import { jsx as jsx14, jsxs as jsxs13 } from "react/jsx-runtime";
function SidebarTabs({
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
  className
}) {
  const firstValue = items[0]?.value ?? "";
  const [internalValue, setInternalValue] = useState7(defaultValue ?? firstValue);
  const [internalExpanded, setInternalExpanded] = useState7(true);
  const activeValue = value ?? internalValue;
  const isExpanded = expanded ?? internalExpanded;
  const activeItem = useMemo3(
    () => items.find((item) => item.value === activeValue) ?? items[0],
    [items, activeValue]
  );
  const selectTab = (nextValue) => {
    if (value === void 0) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };
  const toggleExpanded = () => {
    const next = !isExpanded;
    if (expanded === void 0) setInternalExpanded(next);
    onExpandedChange?.(next);
  };
  const navStyle = {
    "--tabs-nav-width": `${expandedWidth}px`,
    "--tabs-nav-collapsed-width": `${collapsedWidth}px`
  };
  return /* @__PURE__ */ jsxs13(
    "div",
    {
      className: `ui-sidebar-tabs ${isExpanded ? "is-expanded" : "is-collapsed"} ui-sidebar-tabs--${variant} ui-sidebar-tabs--nav-${navPosition} ${hoverLift ? "ui-sidebar-tabs--hover-lift" : ""} ${className ?? ""}`,
      children: [
        /* @__PURE__ */ jsxs13("div", { className: `ui-sidebar-tabs__nav ${isExpanded ? "is-expanded" : "is-collapsed"}`, style: navStyle, children: [
          expandable ? /* @__PURE__ */ jsx14("button", { type: "button", className: "ui-sidebar-tabs__expand", onClick: toggleExpanded, children: isExpanded ? "Collapse" : "Expand" }) : null,
          items.map((item) => {
            const isActive = item.value === activeItem?.value;
            return /* @__PURE__ */ jsxs13(
              "button",
              {
                type: "button",
                className: `ui-sidebar-tabs__tab ui-sidebar-tabs__tab--${density} ui-sidebar-tabs__tab--${tabStyle} ${isActive ? "is-active" : ""} ${textAnimation ? `is-text-animated is-text-animated--${textAnimationStyle}` : ""} ${showActiveIndicator ? "has-indicator" : ""} ${isActive && showActiveIndicator ? `indicator--${indicatorAnimation}` : ""} ${item.icon ? "has-icon" : ""}`,
                onClick: () => selectTab(item.value),
                title: item.label,
                children: [
                  showActiveIndicator ? /* @__PURE__ */ jsx14("span", { className: "ui-sidebar-tabs__indicator" }) : null,
                  item.icon ? /* @__PURE__ */ jsx14("span", { className: "ui-sidebar-tabs__tab-icon", children: item.icon }) : null,
                  /* @__PURE__ */ jsx14("span", { className: "ui-sidebar-tabs__label", children: isExpanded ? item.label : item.shortLabel ?? item.label.slice(0, 1) }),
                  isExpanded && item.badge !== void 0 ? /* @__PURE__ */ jsx14("span", { className: "ui-sidebar-tabs__badge", children: item.badge }) : null
                ]
              },
              item.value
            );
          })
        ] }),
        /* @__PURE__ */ jsx14("div", { className: `ui-sidebar-tabs__panel ui-sidebar-tabs__panel--${animation}`, children: activeItem?.content }, activeItem?.value)
      ]
    }
  );
}

// src/components/accordion.tsx
import { useMemo as useMemo4, useState as useState8 } from "react";
import { jsx as jsx15, jsxs as jsxs14 } from "react/jsx-runtime";
function normalizeValue(value, allowMultiple) {
  if (allowMultiple) {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }
  if (!value) return [];
  return [Array.isArray(value) ? value[0] : value];
}
function Accordion({
  items,
  allowMultiple = false,
  collapsible = true,
  animation = "none",
  animated = false,
  bordered = false,
  defaultValue,
  className
}) {
  const resolvedAnimation = animation === "none" && animated ? "smooth" : animation;
  const initialOpen = useMemo4(
    () => normalizeValue(defaultValue, allowMultiple).filter(Boolean),
    [allowMultiple, defaultValue]
  );
  const [openValues, setOpenValues] = useState8(initialOpen);
  const isOpen = (value) => openValues.includes(value);
  const toggle = (value, disabled) => {
    if (disabled) return;
    const currentlyOpen = openValues.includes(value);
    if (allowMultiple) {
      if (currentlyOpen) {
        if (!collapsible) return;
        setOpenValues((current) => current.filter((entry) => entry !== value));
      } else {
        setOpenValues((current) => [...current, value]);
      }
      return;
    }
    if (currentlyOpen) {
      if (!collapsible) return;
      setOpenValues([]);
    } else {
      setOpenValues([value]);
    }
  };
  return /* @__PURE__ */ jsx15("div", { className: `ui-accordion ${bordered ? "ui-accordion--bordered" : ""} ${className ?? ""}`, children: items.map((item) => {
    const open = isOpen(item.value);
    return /* @__PURE__ */ jsxs14(
      "div",
      {
        className: `ui-accordion__item ${open ? "is-open" : ""} ${item.disabled ? "is-disabled" : ""}`,
        children: [
          /* @__PURE__ */ jsxs14(
            "button",
            {
              type: "button",
              className: "ui-accordion__trigger",
              onClick: () => toggle(item.value, item.disabled),
              disabled: item.disabled,
              "aria-expanded": open,
              children: [
                /* @__PURE__ */ jsx15("span", { children: item.title }),
                /* @__PURE__ */ jsx15("span", { className: `ui-accordion__icon ${open ? "is-open" : ""}`, children: "+" })
              ]
            }
          ),
          /* @__PURE__ */ jsx15(
            "div",
            {
              className: `ui-accordion__panel ui-accordion__panel--${resolvedAnimation} ${open ? "is-open" : ""}`,
              children: /* @__PURE__ */ jsx15("div", { className: "ui-accordion__panel-inner", children: item.content })
            }
          )
        ]
      },
      item.value
    );
  }) });
}
export {
  Accordion,
  Avatar,
  Badge,
  Counter,
  DEFAULT_SOCIAL_MEDIA_PRESETS,
  ElasticSlider,
  HoverTooltipCard,
  LockSwitch,
  MessageSendButton,
  OAuthForm,
  PillButton,
  SOCIAL_SWEEP_EASING_PRESETS,
  SegmentedControl,
  SidebarTabs,
  SocialMediaButton,
  SparkleButton,
  StarRatingRadio
};
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/x.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=index.js.map