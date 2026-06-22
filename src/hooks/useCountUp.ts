import { useEffect, useRef, useState } from 'react'
import { useReducedMotionPref } from './useReducedMotionPref'

/**
 * Animates a number from 0 → target once the element scrolls into view.
 * Attach the returned `ref` to the element that contains the value.
 */
export function useCountUp(target: number, duration = 1400) {
  const reduced = useReducedMotionPref()
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (reduced) {
      setValue(target)
      return
    }
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting || started.current) return
        started.current = true
        const startTime = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - startTime) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setValue(target * eased)
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, reduced])

  return { ref, value }
}
