/**
 * Logos for the /downloads page.
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
 *   into light. Self-colored (not currentColor).
 */

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

export function ApolloLogo({ size = 24, className }: { size?: number; className?: string }) {
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
        stroke="#0F172A"
        strokeWidth="1.4"
        strokeLinejoin="miter"
      />
      {/* Middle frame: closer to the light, higher and thinner */}
      <path
        d="M12 6.8 L17.6 12.4 L12 18 L6.4 12.4 Z"
        stroke="#1D3A6E"
        strokeWidth="1.15"
        strokeLinejoin="miter"
      />
      {/* Far frame: brightest, highest, lightest of line */}
      <path
        d="M12 9 L14.6 11.6 L12 14.2 L9.4 11.6 Z"
        stroke="#60A5FA"
        strokeWidth="0.95"
        strokeLinejoin="miter"
      />
      {/* The light at the end of the nave */}
      <path d="M12 10.5 L12.9 11.4 L12 12.3 L11.1 11.4 Z" fill="#93C5FD" />
    </svg>
  )
}
