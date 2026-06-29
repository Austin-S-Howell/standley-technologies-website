import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'
import { pageMeta } from '@/lib/seo'
import { Seo } from '@/components/Seo'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PageHero } from '@/sections/PageHero'
import { Faq } from '@/sections/Faq'
import { ContactForm } from '@/sections/contact/ContactForm'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: siteConfig.faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const details: { icon: LucideIcon; label: string; value: string; href?: string }[] = [
  { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  {
    icon: Phone,
    label: 'Phone',
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
  },
  { icon: MapPin, label: 'Service area', value: siteConfig.serviceArea },
  { icon: Clock, label: 'Response time', value: siteConfig.responseTime },
]

const nextSteps = [
  { step: '1', text: 'You send a few details about your project.' },
  { step: '2', text: 'We reply and schedule a short call.' },
  { step: '3', text: 'We scope the work and propose a clear next step.' },
]

export default function Contact() {
  return (
    <>
      <Seo {...pageMeta.contact} jsonLd={faqJsonLd} />

      <PageHero
        eyebrow="Contact"
        title="Let’s talk about what you’re building"
        subtitle="Tell us about your project and we’ll get back to you to scope the next step. No obligation, free initial consultation."
      />

      {/* Split card — lifts up into the hero */}
      <section className="relative z-10 -mt-6 pb-20 lg:-mt-12">
        <Container>
          <div className="grid overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-0 shadow-card lg:grid-cols-5">
            {/* Dark info panel */}
            <Reveal
              direction="left"
              className="relative overflow-hidden bg-gradient-to-br from-summit-900 to-summit-950 p-8 text-neutral-50 lg:col-span-2 lg:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-500/20 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-sage-500/25 blur-3xl"
              />

              <div className="relative">
                <h2 className="font-display text-2xl font-semibold text-neutral-50">
                  Let’s reach the summit together
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-sage-300">
                  A new build, a cloud migration, or ongoing support — whatever you’re working on,
                  we’d love to hear about it.
                </p>

                <ul className="mt-8 space-y-4">
                  {details.map((d) => (
                    <li key={d.label} className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-summit-800 text-gold-400">
                        <d.icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div>
                        <div className="text-[11px] font-medium uppercase tracking-wide text-sage-300">
                          {d.label}
                        </div>
                        {d.href ? (
                          <a
                            href={d.href}
                            className="text-sm font-medium text-neutral-50 underline-offset-4 hover:underline"
                          >
                            {d.value}
                          </a>
                        ) : (
                          <div className="text-sm font-medium text-neutral-50">{d.value}</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-summit-800 pt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-sage-300">
                    What happens next
                  </p>
                  <ol className="mt-4 space-y-3">
                    {nextSteps.map((s) => (
                      <li key={s.step} className="flex items-start gap-3 text-sm text-sage-300">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500 text-xs font-semibold text-summit-950">
                          {s.step}
                        </span>
                        {s.text}
                      </li>
                    ))}
                  </ol>
                </div>

                <p className="mt-8 text-xs text-sage-300">Free initial consultation · no obligation.</p>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal direction="right" className="p-8 lg:col-span-3 lg:p-10">
              <h2 className="text-lg font-semibold text-neutral-900">Send a message</h2>
              <p className="mt-1 text-sm text-neutral-600">
                Fill out the form and we’ll be in touch shortly.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-neutral-0 py-20">
        <Container className="max-w-3xl">
          <SectionHeading align="center" eyebrow="Questions" title="Frequently asked" />
          <Reveal className="mt-10">
            <Faq items={siteConfig.faqs} />
          </Reveal>
        </Container>
      </section>
    </>
  )
}
