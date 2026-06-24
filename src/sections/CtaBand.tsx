import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { Container } from '@/components/ui/Container'
import { buttonClasses } from '@/components/ui/Button'
import { Reveal } from '@/components/Reveal'

/** Closing call-to-action band — every page ends in one (no dead ends). */
export function CtaBand({
  title = "Let's build something that lasts.",
  subtitle = 'Tell us what you’re working on and we’ll map the path to the summit.',
}: {
  title?: string
  subtitle?: string
}) {
  return (
    <section className="bg-summit-900">
      <Container className="py-16 lg:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-50 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-sage-300">{subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className={cn(buttonClasses('primary', 'lg'))}>
              Start a Project
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
