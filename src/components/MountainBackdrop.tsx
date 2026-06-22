import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/cn'

/**
 * A soft, blurred, "shiny" sage-green mountain scene with gold accents — used
 * as the hero background. Glows and mountains drift on scroll for depth. Decorative.
 */
export function MountainBackdrop({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const glowFade = useTransform(scrollYProgress, [0, 0.85], [1, 0.25])
  const mountainY = useTransform(scrollYProgress, [0, 1], [0, 44])

  const glowStyle = reduce ? undefined : { y: glowY, opacity: glowFade }
  const mountainStyle = reduce ? undefined : { y: mountainY }

  return (
    <div ref={ref} aria-hidden className={cn('absolute inset-0 -z-10 overflow-hidden', className)}>
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sage-200 via-sage-100 to-neutral-50" />

      {/* Glows (parallax group; each still drifts via CSS) */}
      <m.div style={glowStyle} className="absolute inset-0">
        <div className="absolute left-1/2 top-[6%] h-40 w-72 -translate-x-1/2 animate-drift-a rounded-full bg-neutral-0/40 blur-3xl" />
        <div className="absolute left-1/2 top-[12%] h-80 w-80 -translate-x-1/2 animate-drift-a rounded-full bg-gold-200/45 blur-3xl [animation-delay:-3s]" />
        <div className="absolute left-1/2 top-[9%] h-44 w-44 -translate-x-1/2 animate-drift-a rounded-full bg-gold-100/70 blur-2xl [animation-delay:-6s]" />
        <div className="absolute -left-24 top-1/3 h-72 w-72 animate-drift-b rounded-full bg-sage-300/40 blur-3xl" />
        <div className="absolute -right-16 top-1/2 h-64 w-64 animate-drift-c rounded-full bg-sage-400/25 blur-3xl" />
      </m.div>

      {/* Mountain ranges (parallax) */}
      <m.div style={mountainStyle} className="absolute inset-0">
        <svg
          className="absolute inset-x-0 bottom-0 h-[72%] w-full blur-[3px]"
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMax slice"
          fill="none"
        >
          <path
            d="M0,360 L180,250 L320,330 L480,230 L640,330 L820,240 L1020,320 L1200,250 L1440,330 L1440,600 L0,600 Z"
            className="fill-sage-300/50"
          />
          <path
            d="M0,430 L220,330 L420,420 L620,320 L820,420 L1040,340 L1260,430 L1440,360 L1440,600 L0,600 Z"
            className="fill-sage-500/55"
          />
          <path
            d="M0,505 L260,410 L520,495 L760,400 L1000,485 L1240,410 L1440,470 L1440,600 L0,600 Z"
            className="fill-summit-700/85"
          />
          <path
            d="M0,505 L260,410 L520,495 L760,400 L1000,485 L1240,410 L1440,470"
            className="stroke-gold-400/70"
            strokeWidth={3}
            strokeLinejoin="round"
          />
        </svg>
      </m.div>

      {/* Gold sheen + fade into the page (static) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-gold-100/20" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-neutral-50" />
    </div>
  )
}
