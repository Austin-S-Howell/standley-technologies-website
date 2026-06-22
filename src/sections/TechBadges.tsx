import { cn } from '@/lib/cn'

/** A flat row of technology pills. */
export function TechBadges({
  items,
  className,
}: {
  items: readonly string[]
  className?: string
}) {
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {items.map((t) => (
        <li
          key={t}
          className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm text-neutral-700"
        >
          {t}
        </li>
      ))}
    </ul>
  )
}
