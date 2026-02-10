import React$1, { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode, CSSProperties, HTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface SparkleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    hoverText?: string;
    activeText?: string;
    hue?: number;
    size?: "sm" | "md" | "lg";
    loadingDuration?: number;
    enableHoverText?: boolean;
    enableLoadingState?: boolean;
}
declare const SparkleButton: React$1.ForwardRefExoticComponent<SparkleButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

type SocialMediaPresetName = "custom" | "github" | "twitter" | "instagram" | "linkedin" | "youtube" | "twitch";
type SocialSweepEasingPreset = "smooth" | "snappy" | "dramatic" | "linear";
declare const SOCIAL_SWEEP_EASING_PRESETS: Record<SocialSweepEasingPreset, string>;
interface SocialMediaPresetConfig {
    label: string;
    href: string;
    accentColor: string;
    showCount?: boolean;
    showGitHubStar?: boolean;
    sweepEasingPreset?: SocialSweepEasingPreset;
    sweepDurationMs?: number;
}
declare const DEFAULT_SOCIAL_MEDIA_PRESETS: Record<Exclude<SocialMediaPresetName, "custom">, SocialMediaPresetConfig>;
interface SocialMediaButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    preset?: SocialMediaPresetName;
    presets?: Partial<Record<Exclude<SocialMediaPresetName, "custom">, Partial<SocialMediaPresetConfig>>>;
    label?: string;
    count?: number | string;
    showCount?: boolean;
    showSweep?: boolean;
    showGitHubStar?: boolean;
    sweepEasingPreset?: SocialSweepEasingPreset;
    sweepEasing?: string;
    sweepDurationMs?: number;
    accentColor?: string;
    icon?: ReactNode;
}
declare function SocialMediaButton({ preset, presets, label, count, showCount, showSweep, showGitHubStar, sweepEasingPreset, sweepEasing, sweepDurationMs, accentColor, icon, href, className, ...props }: SocialMediaButtonProps): react_jsx_runtime.JSX.Element;

interface PillButtonProps {
    label?: string;
    onClick?: () => void;
}
declare function PillButton({ label, onClick }: PillButtonProps): react_jsx_runtime.JSX.Element;

interface MessageSendButtonProps {
    defaultText?: string;
    sentText?: string;
    onClick?: () => void;
}
declare function MessageSendButton({ defaultText, sentText, onClick, }: MessageSendButtonProps): react_jsx_runtime.JSX.Element;

interface OAuthFormProps {
    title?: string;
    subtitle?: string;
    emailPlaceholder?: string;
    googleLabel?: string;
    githubLabel?: string;
    continueLabel?: string;
    showGoogle?: boolean;
    showGithub?: boolean;
    defaultEmail?: string;
    onGoogleClick?: () => void;
    onGithubClick?: () => void;
    onContinue?: (email: string) => void;
}
declare function OAuthForm({ title, subtitle, emailPlaceholder, googleLabel, githubLabel, continueLabel, showGoogle, showGithub, defaultEmail, onGoogleClick, onGithubClick, onContinue, }: OAuthFormProps): react_jsx_runtime.JSX.Element;

interface HoverTooltipCardProps {
    tooltipText?: string;
    frontText?: string;
    revealText?: string;
}
declare function HoverTooltipCard({ tooltipText, frontText, revealText, }: HoverTooltipCardProps): react_jsx_runtime.JSX.Element;

interface StarRatingRadioProps {
    max?: number;
    name?: string;
    value?: number;
    onChange?: (value: number) => void;
}
declare function StarRatingRadio({ max, name, value, onChange, }: StarRatingRadioProps): react_jsx_runtime.JSX.Element;

type LockSwitchSize = "sm" | "md" | "lg";
type LockSwitchTone = "default" | "vivid" | "glass";
type LockSwitchMotion = "smooth" | "spring" | "snappy";
interface LockSwitchProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    size?: LockSwitchSize;
    tone?: LockSwitchTone;
    motion?: LockSwitchMotion;
    showStateLabel?: boolean;
    lockedLabel?: string;
    unlockedLabel?: string;
    lockedColor?: string;
    unlockedColor?: string;
    knobColor?: string;
    ariaLabel?: string;
    id?: string;
    className?: string;
}
declare function LockSwitch({ checked, defaultChecked, onCheckedChange, disabled, size, tone, motion, showStateLabel, lockedLabel, unlockedLabel, lockedColor, unlockedColor, knobColor, ariaLabel, id, className, }: LockSwitchProps): react_jsx_runtime.JSX.Element;

type ElasticSliderValuePosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
interface ElasticSliderProps {
    className?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    startingValue?: number;
    value: number;
    maxValue: number;
    isStepped?: boolean;
    stepSize?: number;
    showValueIndicator?: boolean;
    valuePosition?: ElasticSliderValuePosition;
    enhancedEffects?: boolean;
    onChange: (value: number) => void;
}
declare function ElasticSlider({ className, leftIcon, rightIcon, startingValue, value, maxValue, isStepped, stepSize, showValueIndicator, valuePosition, enhancedEffects, onChange, }: ElasticSliderProps): react_jsx_runtime.JSX.Element;

type SegmentedControlOption = {
    label: string;
    value: string;
    visual?: ReactNode;
};
interface SegmentedControlProps {
    options: SegmentedControlOption[];
    value: string;
    onChange: (value: string) => void;
    ariaLabel?: string;
    className?: string;
    accentColor?: string;
    secondaryColor?: string;
    radius?: number;
    pillInset?: number;
    pillRadius?: number;
    height?: number;
    fontSize?: number;
    draggable?: boolean;
    contentMode?: "text" | "visual";
    style?: CSSProperties;
}
declare function SegmentedControl({ options, value, onChange, ariaLabel, className, accentColor, secondaryColor, radius, pillInset, pillRadius, height, fontSize, draggable, contentMode, style, }: SegmentedControlProps): react_jsx_runtime.JSX.Element;

type Place = number | ".";
type CounterProps = {
    value: number;
    fontSize?: number;
    padding?: number;
    places?: Place[];
    gap?: number;
    borderRadius?: number;
    horizontalPadding?: number;
    textColor?: string;
    fontWeight?: number | string;
    digitPlaceHolders?: boolean;
    containerStyle?: React.CSSProperties;
    counterStyle?: React.CSSProperties;
    digitStyle?: React.CSSProperties;
    gradientHeight?: number;
    gradientFrom?: string;
    gradientTo?: string;
    topGradientStyle?: React.CSSProperties;
    bottomGradientStyle?: React.CSSProperties;
};
declare function Counter({ value, fontSize, padding, places, gap, borderRadius, horizontalPadding, textColor, fontWeight, digitPlaceHolders, containerStyle, counterStyle, digitStyle, gradientHeight, gradientFrom, gradientTo, topGradientStyle, bottomGradientStyle, }: CounterProps): react_jsx_runtime.JSX.Element;

type BadgeTone = "neutral" | "primary" | "success" | "warning" | "danger" | "info";
type BadgeAppearance = "solid" | "soft" | "outline";
type BadgeSize = "sm" | "md" | "lg";
type BadgeAnimation = "pulse" | "glow" | "float" | "shimmer" | "wiggle";
interface BadgeProps {
    label: string;
    tone?: BadgeTone;
    appearance?: BadgeAppearance;
    size?: BadgeSize;
    dot?: boolean;
    icon?: ReactNode;
    removable?: boolean;
    onRemove?: () => void;
    animation?: BadgeAnimation | BadgeAnimation[];
    className?: string;
}
declare function Badge({ label, tone, appearance, size, dot, icon, removable, onRemove, animation, className, }: BadgeProps): react_jsx_runtime.JSX.Element;

type AvatarSize = "sm" | "md" | "lg";
type AvatarShape = "circle" | "rounded" | "square";
type AvatarStatus = "online" | "away" | "busy" | "offline";
type AvatarAnimation = "none" | "pulse" | "float" | "glow";
type AvatarExpandContentMode = "text" | "image" | "button" | "custom";
interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: AvatarSize;
    shape?: AvatarShape;
    showRing?: boolean;
    showStatus?: boolean;
    status?: AvatarStatus;
    animation?: AvatarAnimation;
    expandable?: boolean;
    contentMode?: AvatarExpandContentMode;
    expandedContent?: ReactNode;
    expandedTitle?: string;
    expandedDescription?: string;
    expandedImageSrc?: string;
    expandedButtonLabel?: string;
    onExpandedButtonClick?: () => void;
}
declare function Avatar({ src, alt, fallback, size, shape, showRing, showStatus, status, animation, expandable, contentMode, expandedContent, expandedTitle, expandedDescription, expandedImageSrc, expandedButtonLabel, onExpandedButtonClick, className, ...props }: AvatarProps): react_jsx_runtime.JSX.Element;

type SidebarTabsVariant = "soft" | "outline" | "solid";
type SidebarTabsAnimation = "none" | "fade" | "slide" | "pop" | "zoom" | "blur" | "flip";
type SidebarTabsTextAnimation = "slide" | "pulse" | "wave";
type SidebarTabsDensity = "compact" | "default" | "comfortable";
type SidebarTabsTabStyle = "rounded" | "pill" | "underline";
type SidebarTabsIndicatorAnimation = "none" | "glow" | "pulse";
type SidebarTabsNavPosition = "left" | "right";
interface SidebarTabItem {
    value: string;
    label: string;
    content: ReactNode;
    icon?: ReactNode;
    badge?: string | number;
    shortLabel?: string;
}
interface SidebarTabsProps {
    items: SidebarTabItem[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    variant?: SidebarTabsVariant;
    animation?: SidebarTabsAnimation;
    textAnimation?: boolean;
    textAnimationStyle?: SidebarTabsTextAnimation;
    expandable?: boolean;
    expanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
    density?: SidebarTabsDensity;
    tabStyle?: SidebarTabsTabStyle;
    navPosition?: SidebarTabsNavPosition;
    hoverLift?: boolean;
    showActiveIndicator?: boolean;
    indicatorAnimation?: SidebarTabsIndicatorAnimation;
    expandedWidth?: number;
    collapsedWidth?: number;
    className?: string;
}
declare function SidebarTabs({ items, value, defaultValue, onValueChange, variant, animation, textAnimation, textAnimationStyle, expandable, expanded, onExpandedChange, density, tabStyle, navPosition, hoverLift, showActiveIndicator, indicatorAnimation, expandedWidth, collapsedWidth, className, }: SidebarTabsProps): react_jsx_runtime.JSX.Element;

interface AccordionItem {
    value: string;
    title: string;
    content: ReactNode;
    disabled?: boolean;
}
type AccordionAnimation = "none" | "smooth" | "fade" | "pop";
interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
    collapsible?: boolean;
    animation?: AccordionAnimation;
    animated?: boolean;
    bordered?: boolean;
    defaultValue?: string | string[];
    className?: string;
}
declare function Accordion({ items, allowMultiple, collapsible, animation, animated, bordered, defaultValue, className, }: AccordionProps): react_jsx_runtime.JSX.Element;

export { Accordion, type AccordionAnimation, type AccordionItem, type AccordionProps, Avatar, type AvatarAnimation, type AvatarExpandContentMode, type AvatarProps, type AvatarShape, type AvatarSize, type AvatarStatus, Badge, type BadgeAnimation, type BadgeAppearance, type BadgeProps, type BadgeSize, type BadgeTone, Counter, type CounterProps, DEFAULT_SOCIAL_MEDIA_PRESETS, ElasticSlider, type ElasticSliderProps, type ElasticSliderValuePosition, HoverTooltipCard, type HoverTooltipCardProps, LockSwitch, type LockSwitchMotion, type LockSwitchProps, type LockSwitchSize, type LockSwitchTone, MessageSendButton, type MessageSendButtonProps, OAuthForm, type OAuthFormProps, PillButton, type PillButtonProps, SOCIAL_SWEEP_EASING_PRESETS, SegmentedControl, type SegmentedControlOption, type SegmentedControlProps, type SidebarTabItem, SidebarTabs, type SidebarTabsAnimation, type SidebarTabsDensity, type SidebarTabsIndicatorAnimation, type SidebarTabsNavPosition, type SidebarTabsProps, type SidebarTabsTabStyle, type SidebarTabsTextAnimation, type SidebarTabsVariant, SocialMediaButton, type SocialMediaButtonProps, type SocialMediaPresetConfig, type SocialMediaPresetName, type SocialSweepEasingPreset, SparkleButton, type SparkleButtonProps, StarRatingRadio, type StarRatingRadioProps };
