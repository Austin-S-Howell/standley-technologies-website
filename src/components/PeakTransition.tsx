import { cn } from '@/lib/cn'

/**
 * A layered two-tone summit silhouette used as a hero→section transition band.
 * Renders a back ridge (sage) and a front ridge (current text color).
 */
export function PeakTransition({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className={cn('block h-16 w-full text-neutral-50', className)}
    >
      <path
        d="M0,120 L240,52 L420,84 L640,36 L860,76 L1060,44 L1200,72 L1200,120 Z"
        className="fill-sage-100"
      />
      <path
        d="M0,120 L180,80 L380,104 L560,64 L780,100 L980,72 L1200,96 L1200,120 Z"
        fill="currentColor"
      />
    </svg>
  )
}
