import { cn } from '@/lib/cn'

/** Sized placeholder shown while a demo is gated/loading — keeps layout stable. */
export function DemoSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'min-h-[420px] w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-0 shadow-card',
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-neutral-100 bg-neutral-50 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
      </div>
      <div className="space-y-3 p-5 motion-safe:animate-pulse">
        <div className="h-8 w-1/3 rounded bg-neutral-100" />
        <div className="grid grid-cols-3 gap-2">
          <div className="h-14 rounded-lg bg-neutral-100" />
          <div className="h-14 rounded-lg bg-neutral-100" />
          <div className="h-14 rounded-lg bg-neutral-100" />
        </div>
        <div className="h-24 rounded-xl bg-neutral-100" />
        <div className="h-16 rounded-xl bg-neutral-100" />
      </div>
    </div>
  )
}
