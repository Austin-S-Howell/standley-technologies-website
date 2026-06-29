import { useEffect, useRef, useState, type ReactNode } from 'react'

interface InViewProps {
  children: ReactNode
  /** Shown until the wrapper scrolls near the viewport. */
  fallback?: ReactNode
  /** How early to trigger, relative to the viewport edge. */
  rootMargin?: string
  className?: string
}

/**
 * Renders `children` only once the wrapper scrolls near the viewport, keeping
 * `fallback` in its place until then. Used to defer mounting heavy, animated,
 * below-the-fold content (the demos) — so their JS, layout, and timers don't run
 * until they're about to be seen.
 */
export function InView({ children, fallback = null, rootMargin = '300px', className }: InViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (shown) return
    const el = ref.current
    if (!el) return
    // Older browsers without IntersectionObserver just render immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [shown, rootMargin])

  return (
    <div ref={ref} className={className}>
      {shown ? children : fallback}
    </div>
  )
}
