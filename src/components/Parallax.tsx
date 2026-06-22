import { useRef, type ReactNode } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * Drifts its children vertically as it scrolls through the viewport.
 * `speed` is the px of travel each way (positive = lifts up on scroll down).
 * No-op under reduced-motion.
 */
export function Parallax({
  children,
  className,
  speed = 40,
}: {
  children: ReactNode
  className?: string
  speed?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])

  return (
    <m.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </m.div>
  )
}
