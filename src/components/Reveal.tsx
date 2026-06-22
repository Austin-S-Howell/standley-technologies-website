import type { ReactNode } from 'react'
import { m, useReducedMotion, type Variants } from 'framer-motion'

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none'

const variants: Record<RevealDirection, Variants> = {
  up: { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -28 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -36 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 36 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1 } },
  none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
}

/** Fades + slides children into view on scroll. Renders static when reduced-motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: {
  children: ReactNode
  className?: string
  delay?: number
  direction?: RevealDirection
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>

  return (
    <m.div
      className={className}
      variants={variants[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </m.div>
  )
}
