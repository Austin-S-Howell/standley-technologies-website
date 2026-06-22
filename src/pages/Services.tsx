import { Link } from 'react-router-dom'
import { Code2, Cloud, Headset, Check, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { siteConfig } from '@/lib/siteConfig'
import { pageMeta } from '@/lib/seo'
import { Seo } from '@/components/Seo'
import { Reveal } from '@/components/Reveal'
import { StaggerGroup, StaggerItem } from '@/components/Stagger'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { buttonClasses } from '@/components/ui/Button'
import { PageHero } from '@/sections/PageHero'
import { ProcessSteps } from '@/sections/ProcessSteps'
import { TechBadges } from '@/sections/TechBadges'
import { CtaBand } from '@/sections/CtaBand'

const serviceIcons = { software: Code2, 'cloud-devops': Cloud, consulting: Headset } as const

const servicesJsonLd = siteConfig.services.map((s) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: s.name,
  description: s.promise,
  provider: { '@type': 'Organization', name: siteConfig.legalName, url: siteConfig.url },
}))

export default function Services() {
  return (
    <>
      <Seo {...pageMeta.services} jsonLd={servicesJsonLd} />

      <PageHero
        eyebrow="Services"
        title="Full-stack technology, one accountable partner"
        subtitle="From custom software to the cloud it runs on to the team that keeps it healthy — Standley Technologies LLC covers the climb end to end."
      />

      {/* Sticky pillar nav */}
      <div className="sticky top-16 z-30 border-y border-neutral-200 bg-neutral-50/90 backdrop-blur lg:top-20">
        <Container className="flex gap-2 overflow-x-auto py-3">
          {siteConfig.services.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="whitespace-nowrap rounded-full border border-neutral-200 bg-neutral-0 px-4 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:border-sage-400 hover:text-summit-700"
            >
              {s.name}
            </a>
          ))}
        </Container>
      </div>

      {/* Service pillars */}
      {siteConfig.services.map((service, idx) => {
        const Icon = serviceIcons[service.id]
        return (
          <section
            key={service.id}
            id={service.id}
            className={cn('scroll-mt-24 py-16 lg:py-20', idx % 2 === 1 ? 'bg-sage-50' : 'bg-neutral-0')}
          >
            <Container>
              <div className="grid gap-10 lg:grid-cols-2">
                {/* Left: pitch */}
                <Reveal direction="left">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sage-100 text-summit-700">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h2 className="mt-5 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                    {service.name}
                  </h2>
                  <p className="mt-3 text-lg text-neutral-600">{service.promise}</p>

                  <dl className="mt-6 space-y-4">
                    <div>
                      <dt className="text-sm font-semibold text-neutral-900">Who it’s for</dt>
                      <dd className="mt-1 text-sm text-neutral-600">{service.whoFor}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-neutral-900">The outcome</dt>
                      <dd className="mt-1 text-sm text-neutral-600">{service.outcome}</dd>
                    </div>
                  </dl>

                  <div className="mt-6">
                    <p className="mb-2 text-sm font-semibold text-neutral-900">Built with</p>
                    <TechBadges items={service.tech} />
                  </div>

                  <Link
                    to={`/contact?service=${service.id}`}
                    className={cn(buttonClasses('primary', 'md'), 'mt-8')}
                  >
                    Discuss this service <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Reveal>

                {/* Right: details */}
                <Reveal direction="right" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <Card className="transition-transform duration-300 ease-summit hover:-translate-y-1">
                    <h3 className="text-sm font-semibold text-neutral-900">What’s included</h3>
                    <StaggerGroup className="mt-4 space-y-2.5">
                      {service.includes.map((item) => (
                        <StaggerItem key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-summit-600" aria-hidden />
                          {item}
                        </StaggerItem>
                      ))}
                    </StaggerGroup>
                  </Card>
                  <Card className="transition-transform duration-300 ease-summit hover:-translate-y-1">
                    <h3 className="text-sm font-semibold text-neutral-900">What you get</h3>
                    <StaggerGroup className="mt-4 space-y-2.5">
                      {service.deliverables.map((item) => (
                        <StaggerItem key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden />
                          {item}
                        </StaggerItem>
                      ))}
                    </StaggerGroup>
                  </Card>
                </Reveal>
              </div>
            </Container>
          </section>
        )
      })}

      <ProcessSteps className="bg-neutral-50 py-20" />
      <CtaBand />
    </>
  )
}
