import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/Reveal'

/** Compact hero used at the top of interior pages (clears the fixed header). */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sage-50 to-neutral-50 pb-16 pt-28 lg:pb-20 lg:pt-36">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            {title}
          </h1>
          {subtitle && <p className="mt-5 max-w-2xl text-lg text-neutral-600">{subtitle}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
      </Container>
    </section>
  )
}
