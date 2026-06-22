import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-gold-200 bg-gold-50 px-3 py-1 text-xs font-medium text-gold-800',
        className,
      )}
    >
      {children}
    </span>
  )
}
