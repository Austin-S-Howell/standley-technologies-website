/**
 * Logos for the /downloads and /apollo pages.
 *
 * - Apple mark: the CC0 path from simple-icons (`currentColor`).
 * - Microsoft mark: its four-square logo drawn directly (`currentColor`).
 * - Apollo logo: "the view down the nave" — an original mark from the
 *   experience of Fay Jones' Thorncrown Chapel: repeated truss frames
 *   receding toward light. Three nested diamond frames, each smaller,
 *   HIGHER, and brighter than the last (ink → navy → accent), members
 *   thinning with distance the way real structure does, and a single spark
 *   of light at the heart. Wright's discipline shows in the restraint: pure
 *   rectilinear geometry, square caps, one accent. Deliberately NOT a
 *   letterform or a pictogram — the mark is about moving through structure
 *   into light. Self-colored (not currentColor); `tone="dark"` swaps in the
 *   palette the Apollo launch film uses on its night-navy app icon.
 */
import { cn } from '@/lib/cn'

const apolloTones = {
  // On light grounds (/downloads): ink → navy → accent, with a pale spark.
  light: { near: '#0F172A', middle: '#1D3A6E', far: '#60A5FA', spark: '#93C5FD' },
  // On dark grounds (/apollo): sampled from the launch film's app icon.
  dark: { near: '#64748B', middle: '#60A5FA', far: '#9DC0EE', spark: '#EEF4FC' },
} as const

export function AppleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  )
}

export function MicrosoftLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M0 0h11.4v11.4H0zM12.6 0H24v11.4H12.6zM0 12.6h11.4V24H0zM12.6 12.6H24V24H12.6z" />
    </svg>
  )
}

export function ApolloLogo({
  size = 24,
  className,
  tone = 'light',
}: {
  size?: number
  className?: string
  tone?: keyof typeof apolloTones
}) {
  const c = apolloTones[tone]
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Nearest frame: darkest, heaviest, lowest. Spacing note: the frames
          rise, so adjacent TOP edges are the pinch point — at 45° the
          perpendicular gap is the vertical gap ÷ √2, and it must stay wider
          than the two half-strokes or the colors bleed together. These
          numbers keep ≥0.35 units of clear air at every pinch. */}
      <path
        d="M12 4.5 L20.8 13.3 L12 22.1 L3.2 13.3 Z"
        stroke={c.near}
        strokeWidth="1.4"
        strokeLinejoin="miter"
      />
      {/* Middle frame: closer to the light, higher and thinner */}
      <path
        d="M12 6.8 L17.6 12.4 L12 18 L6.4 12.4 Z"
        stroke={c.middle}
        strokeWidth="1.15"
        strokeLinejoin="miter"
      />
      {/* Far frame: brightest, highest, lightest of line */}
      <path
        d="M12 9 L14.6 11.6 L12 14.2 L9.4 11.6 Z"
        stroke={c.far}
        strokeWidth="0.95"
        strokeLinejoin="miter"
      />
      {/* The light at the end of the nave */}
      <path d="M12 10.5 L12.9 11.4 L12 12.3 L11.1 11.4 Z" fill={c.spark} />
    </svg>
  )
}

/**
 * Apollo's app icon as the launch film shows it: the dark-tone mark on a
 * rounded night-navy tile with a hairline rim and a soft blue bloom. The mark
 * is nudged up so its outer frame (which sits low in the 24-unit box, since
 * the frames rise) is optically centred on the tile.
 */
export function ApolloAppIcon({ size = 64, className }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-[24%] bg-gradient-to-b from-[#0F1C33] to-[#060E1C] shadow-[inset_0_1px_0_rgba(148,163,184,0.22),0_0_0_1px_rgba(30,56,102,0.7),0_20px_48px_-16px_rgba(59,130,246,0.55)]',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <ApolloLogo tone="dark" size={Math.round(size * 0.78)} className="-translate-y-[5.4%]" />
    </span>
  )
}
