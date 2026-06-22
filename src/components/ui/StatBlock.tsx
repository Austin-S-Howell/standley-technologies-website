import { cn } from '@/lib/cn'

export function StatBlock({
  value,
  label,
  className,
}: {
  value: string
  label: string
  className?: string
}) {
  return (
    <div className={className}>
      <div className="font-display text-3xl font-semibold text-summit-700 sm:text-4xl">{value}</div>
      <div className={cn('mt-1 text-sm text-neutral-500')}>{label}</div>
    </div>
  )
}
