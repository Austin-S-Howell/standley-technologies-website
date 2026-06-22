import { Check } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'
import { pageMeta } from '@/lib/seo'
import { Seo } from '@/components/Seo'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/sections/PageHero'
import { BookingRequest } from '@/sections/book/BookingRequest'
import { Reveal } from '@/components/Reveal'
import { StaggerGroup, StaggerItem } from '@/components/Stagger'
import { Parallax } from '@/components/Parallax'

const whatToExpect = [
  'A relaxed 30 minutes — no prep needed',
  'We learn about your goals and challenges',
  'Honest advice and clear next steps',
  'No pressure, no obligation',
]

export default function Book() {
  return (
    <>
      <Seo {...pageMeta.book} />

      <PageHero
        eyebrow="Book a call"
        title="Pick a time that works for you"
        subtitle="Choose a day and time below and send us the request — it opens your email with the details ready to go, and we’ll reply to confirm."
      />

      <section className="bg-neutral-50 py-16 lg:py-20">
        <Container className="grid gap-8 lg:grid-cols-3">
          {/* What to expect */}
          <Reveal direction="left" className="lg:col-span-1">
            <h2 className="text-lg font-semibold text-neutral-900">What to expect</h2>
            <StaggerGroup className="mt-4 space-y-2.5">
              {whatToExpect.map((e) => (
                <StaggerItem key={e}>
                  <div className="flex items-start gap-2 text-sm text-neutral-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-summit-600" aria-hidden />
                    {e}
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
            <p className="mt-6 text-sm text-neutral-500">
              Prefer email?{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-summit-700 underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
            </p>
          </Reveal>

          {/* Calendar request */}
          <Reveal direction="right" className="lg:col-span-2">
            <Parallax speed={18}>
              <BookingRequest />
            </Parallax>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
