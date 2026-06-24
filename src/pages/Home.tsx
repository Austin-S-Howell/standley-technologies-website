import { Link } from 'react-router-dom'
import { ArrowRight, Code2, Cloud, Headset, Cpu } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'
import { pageMeta } from '@/lib/seo'
import { useCountUp } from '@/hooks/useCountUp'
import { Seo } from '@/components/Seo'
import { Logo } from '@/components/Logo'
import { Reveal } from '@/components/Reveal'
import { Parallax } from '@/components/Parallax'
import { StaggerGroup, StaggerItem } from '@/components/Stagger'
import { MountainBackdrop } from '@/components/MountainBackdrop'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { buttonClasses } from '@/components/ui/Button'
import { AnalyticsDashboardDemo } from '@/components/demos/AnalyticsDashboardDemo'
import { CloudInfraDemo } from '@/components/demos/CloudInfraDemo'
import { LocalLlmDemo } from '@/components/demos/LocalLlmDemo'
import { CtaBand } from '@/sections/CtaBand'

const serviceIcons = {
  software: Code2,
  'cloud-devops': Cloud,
  consulting: Headset,
  'local-llm': Cpu,
} as const

function CountStat({ to, suffix = '', label }: { to: number; suffix?: string; label: string }) {
  const { ref, value } = useCountUp(to)
  return (
    <div>
      <div className="font-display text-3xl font-semibold text-summit-700 sm:text-4xl">
        <span ref={ref}>{Math.round(value)}</span>
        {suffix}
      </div>
      <div className="mt-1 text-sm text-neutral-500">{label}</div>
    </div>
  )
}

function TextStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-semibold text-summit-700 sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-neutral-500">{label}</div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Seo
        {...pageMeta.home}
        titleOverride={`${siteConfig.legalName} — Custom Software, Cloud & IT Consulting`}
      />

      {/* Hero — centered, on a blurry sage mountain backdrop */}
      <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden pb-32 pt-24 lg:pt-28">
        <MountainBackdrop />

        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Logo className="mx-auto h-24 w-24 drop-shadow-lg sm:h-32 sm:w-32 lg:h-40 lg:w-40" />
            <div className="mt-6 flex justify-center">
              <Eyebrow>Software · Cloud · Managed IT</Eyebrow>
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              Engineering that reaches the <span className="text-gold-700">summit</span>.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-700">
              Custom software, cloud infrastructure, and managed IT — built to last.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className={buttonClasses('primary', 'lg')}>
                Start a Project <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link to="/demos" className={buttonClasses('secondary', 'lg')}>
                See Live Demos
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Featured dashboard demo — lifts up out of the hero */}
      <section className="relative z-10 -mt-20 lg:-mt-28">
        <Container className="max-w-3xl">
          <Reveal direction="scale">
            <Parallax speed={22}>
              <AnalyticsDashboardDemo />
            </Parallax>
          </Reveal>
          <p className="mt-4 text-center text-sm text-neutral-500">
            A live demo of the kind of dashboard we build.
          </p>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-14">
        <Container>
          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
            <CountStat to={4} label="Core service lines" />
            <CountStat to={100} suffix="%" label="Senior engineering" />
            <TextStat value="24/7" label="Managed monitoring" />
            <TextStat value="3" label="Cloud platforms" />
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="bg-neutral-0 py-20">
        <Container>
          <SectionHeading align="center" eyebrow="What we do" title="Four ways we move you forward" />
          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.services.map((service) => {
              const Icon = serviceIcons[service.id]
              return (
                <StaggerItem key={service.id}>
                  <Card hover className="h-full transition-transform duration-300 ease-summit hover:-translate-y-1">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sage-100 text-summit-700">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-neutral-900">{service.name}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{service.short}</p>
                    <Link
                      to="/services"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-summit-700 hover:gap-2.5 hover:underline"
                    >
                      Learn more <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </Card>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </Container>
      </section>

      {/* Live demos */}
      <section className="bg-neutral-50 py-20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Live demos"
            title="See the work, not just the words"
            description="Interactive examples — running right here in your browser."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal direction="left">
              <LocalLlmDemo />
            </Reveal>
            <Reveal direction="right">
              <CloudInfraDemo />
            </Reveal>
          </div>
          <div className="mt-10 text-center">
            <Link to="/demos" className={buttonClasses('primary', 'lg')}>
              Explore all demos <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
