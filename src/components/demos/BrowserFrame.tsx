import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** A faux browser/app window chrome used to frame the interactive demos. */
export function BrowserFrame({
  children,
  title,
  className,
}: {
  children: ReactNode
  title?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-0 shadow-card',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-error-500/70" />
        <span className="h-3 w-3 rounded-full bg-warning-500/70" />
        <span className="h-3 w-3 rounded-full bg-success-500/70" />
        {title && (
          <span className="ml-3 truncate font-mono text-xs text-neutral-500">{title}</span>
        )}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  )
}
