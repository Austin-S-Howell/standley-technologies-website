import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { SummitLine } from '@/components/SummitLine'

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-summit-600',
        className,
      )}
    >
      <SummitLine className="h-2.5 w-8 text-gold-500" />
      {children}
    </p>
  )
}
