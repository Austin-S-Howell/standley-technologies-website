import { cn } from '@/lib/cn'

/**
 * A subtle mountain-ridge divider for separating sections. Set the fill via
 * text color (e.g. `text-neutral-50`) to match the section it transitions into.
 */
export function RidgeDivider({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      className={cn('block h-8 w-full', flip && 'rotate-180', className)}
    >
      <path
        d="M0,60 L160,28 L320,46 L480,16 L660,42 L820,22 L1000,40 L1200,18 L1200,60 Z"
        fill="currentColor"
      />
    </svg>
  )
}
