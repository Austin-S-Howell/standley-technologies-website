import { m, useScroll, useSpring } from 'framer-motion'

/** A thin gradient bar pinned to the top that fills with scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <m.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-summit-600 via-sage-500 to-gold-500"
    />
  )
}
