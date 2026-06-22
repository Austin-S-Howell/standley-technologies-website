import { Mountain, Compass, ShieldCheck, MapPin, Clock, User } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'
import { pageMeta } from '@/lib/seo'
import { Seo } from '@/components/Seo'
import { Reveal } from '@/components/Reveal'
import { StaggerGroup, StaggerItem } from '@/components/Stagger'
import { Parallax } from '@/components/Parallax'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { SectionHeading } from '@/components/ui/SectionHeading'
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
        subtitle="A technology partner built on engineering discipline and a simple belief: good software should make your business stronger every day it runs."
      />

      {/* Story */}
      <section className="bg-neutral-50 py-20">
        <Container>
          <Reveal direction="up" className="mx-auto max-w-3xl">
            {/* [FILL IN] Real founder story + mission go here */}
            <p className="text-lg leading-relaxed text-neutral-600">
              <strong className="text-neutral-900">[FILL IN — our story.]</strong> Founded in{' '}
              <span className="text-neutral-900">[FILL IN: year]</span>, {siteConfig.legalName}{' '}
              partners with businesses to design, build, and operate the technology that moves them
              forward. We started with a simple frustration: too much software is over-sold,
              under-built, and impossible to maintain. Replace this paragraph with the real mission
              and origin story.
            </p>
          </Reveal>

          {/* Values */}
          <div className="mt-16">
            <SectionHeading align="center" eyebrow="What we value" title="How we work" />
            <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-3">
              {siteConfig.values.map((v, i) => {
                const Icon = valueIcons[i] ?? Mountain
                return (
                  <StaggerItem key={v.title}>
                    <Card
                      hover
                      className="h-full transition-transform duration-300 ease-summit hover:-translate-y-1"
                    >
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sage-100 text-summit-700">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <h3 className="mt-5 text-lg font-semibold text-neutral-900">{v.title}</h3>
                      <p className="mt-2 text-sm text-neutral-600">{v.body}</p>
                    </Card>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
          </div>
        </Container>
      </section>

      {/* Differentiators */}
      <section className="bg-neutral-0 py-20">
        <Container>
          <SectionHeading
            eyebrow="Why work with us"
            title="What sets Standley apart"
            description="Four things you can count on from the first call to long after launch."
          />
          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2">
            {siteConfig.differentiators.map((d) => (
              <StaggerItem key={d.title}>
                <div className="flex gap-4">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-gold-500" />
                  <div>
                    <h3 className="text-base font-semibold text-neutral-900">{d.title}</h3>
                    <p className="mt-1.5 text-sm text-neutral-600">{d.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* Founder */}
      <section className="bg-neutral-50 py-20">
        <Container>
          <Reveal direction="scale">
            <Parallax speed={20}>
              <Card className="md:flex md:items-center md:gap-8">
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-summit-900 text-neutral-50">
                  {/* [FILL IN] Replace with a founder photo */}
                  <User className="h-9 w-9" aria-hidden />
                </span>
                <div className="mt-5 md:mt-0">
                  <h2 className="text-xl font-semibold text-neutral-900">
                    {siteConfig.founder.name}
                  </h2>
                  <p className="text-sm font-medium text-summit-700">{siteConfig.founder.role}</p>
                  <p className="mt-3 text-sm text-neutral-600">{siteConfig.founder.bio}</p>
                </div>
              </Card>
            </Parallax>
          </Reveal>
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
