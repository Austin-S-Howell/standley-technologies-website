import { Mountain, Compass, ShieldCheck, MapPin, Clock } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'
import { pageMeta } from '@/lib/seo'
import { Seo } from '@/components/Seo'
import { Reveal } from '@/components/Reveal'
import { StaggerGroup, StaggerItem } from '@/components/Stagger'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { PageHero } from '@/sections/PageHero'
import { CtaBand } from '@/sections/CtaBand'

const valueIcons = [Mountain, Compass, ShieldCheck] as const

export default function About() {
  return (
    <>
      <Seo {...pageMeta.about} />

      <PageHero
        eyebrow="About"
        title={`The team behind ${siteConfig.name}`}
        subtitle="Senior engineering, honest advice, and technology built to last."
      />

      <section className="bg-neutral-50 py-16 lg:py-20">
        <Container>
          {/* Intro */}
          <Reveal direction="up" className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-neutral-600">
              {siteConfig.legalName} is a technology partner for businesses that want their software,
              cloud, and AI done right — and kept running. You work directly with senior engineers
              who give straight answers, not sales pitches.
            </p>
          </Reveal>

          {/* Founder card  +  values / why-us grid */}
          <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
            {/* Founder */}
            <Reveal direction="left" className="lg:col-span-1">
              <Card className="text-center sm:text-left">
                <img
                  src={siteConfig.founder.photo}
                  alt={`${siteConfig.founder.name}, ${siteConfig.founder.role}`}
                  loading="lazy"
                  width={112}
                  height={112}
                  className="mx-auto h-28 w-28 rounded-2xl object-cover shadow-card sm:mx-0"
                />
                <h2 className="mt-5 text-xl font-semibold text-neutral-900">
                  {siteConfig.founder.name}
                </h2>
                <p className="text-sm font-medium text-summit-700">{siteConfig.founder.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {siteConfig.founder.bio}
                </p>
              </Card>
            </Reveal>

            {/* Values + why-us */}
            <div className="space-y-8 lg:col-span-2">
              {/* How we work */}
              <div>
                <Eyebrow>How we work</Eyebrow>
                <StaggerGroup className="mt-4 grid gap-4 sm:grid-cols-3">
                  {siteConfig.values.map((v, i) => {
                    const Icon = valueIcons[i] ?? Mountain
                    return (
                      <StaggerItem key={v.title}>
                        <Card
                          hover
                          className="h-full transition-transform duration-300 ease-summit hover:-translate-y-1"
                        >
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-sage-100 text-summit-700">
                            <Icon className="h-4 w-4" aria-hidden />
                          </span>
                          <h3 className="mt-3 text-sm font-semibold text-neutral-900">{v.title}</h3>
                          <p className="mt-1.5 text-sm text-neutral-600">{v.body}</p>
                        </Card>
                      </StaggerItem>
                    )
                  })}
                </StaggerGroup>
              </div>

              {/* Why work with us */}
              <div>
                <Eyebrow>Why work with us</Eyebrow>
                <StaggerGroup className="mt-4 grid gap-4 sm:grid-cols-2">
                  {siteConfig.differentiators.map((d) => (
                    <StaggerItem key={d.title}>
                      <Card className="h-full">
                        <div className="flex gap-3">
                          <span
                            className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500"
                            aria-hidden
                          />
                          <div>
                            <h3 className="text-sm font-semibold text-neutral-900">{d.title}</h3>
                            <p className="mt-1 text-sm text-neutral-600">{d.body}</p>
                          </div>
                        </div>
                      </Card>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Service area */}
      <section className="bg-neutral-0 py-14">
        <Container>
          <Reveal direction="up">
            <div className="flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-sage-50 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-summit-700" aria-hidden />
                <p className="text-sm text-neutral-700">{siteConfig.serviceArea}</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-summit-700" aria-hidden />
                <p className="text-sm text-neutral-700">{siteConfig.responseTime}</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
