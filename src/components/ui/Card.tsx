import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Card({
  children,
  className,
  hover = false,
}: {
  children: ReactNode
  className?: string
  hover?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-neutral-200 bg-neutral-0 p-6 shadow-card',
        hover && 'transition-shadow duration-300 ease-summit hover:shadow-card-hover',
        className,
      )}
    >
      {children}
    </div>
  )
}
