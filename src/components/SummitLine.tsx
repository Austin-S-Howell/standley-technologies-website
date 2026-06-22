import { cn } from '@/lib/cn'

/** A small summit/peak accent line — use to underline eyebrows or section breaks. */
export function SummitLine({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-3 w-16', className)}
    >
      <path d="M2 14 L22 4 L34 10 L46 2 L62 12" />
    </svg>
  )
}
