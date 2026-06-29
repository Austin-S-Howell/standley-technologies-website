import { lazy, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import { pageMeta } from '@/lib/seo'
import type { ServiceId } from '@/lib/siteConfig'
import { Seo } from '@/components/Seo'
import { Reveal } from '@/components/Reveal'
import { StaggerGroup, StaggerItem } from '@/components/Stagger'
import { Parallax } from '@/components/Parallax'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { buttonClasses } from '@/components/ui/Button'
import { DeferredDemo } from '@/components/demos/DeferredDemo'
import { PageHero } from '@/sections/PageHero'
import { CtaBand } from '@/sections/CtaBand'

// Each demo is code-split and only fetched once it scrolls near view.
const AnalyticsDashboardDemo = lazy(() =>
  import('@/components/demos/AnalyticsDashboardDemo').then((m) => ({ default: m.AnalyticsDashboardDemo })),
)
const PowerBiPortalDemo = lazy(() =>
  import('@/components/demos/PowerBiPortalDemo').then((m) => ({ default: m.PowerBiPortalDemo })),
)
const LocalLlmDemo = lazy(() =>
  import('@/components/demos/LocalLlmDemo').then((m) => ({ default: m.LocalLlmDemo })),
)
const CloudInfraDemo = lazy(() =>
  import('@/components/demos/CloudInfraDemo').then((m) => ({ default: m.CloudInfraDemo })),
)
const UptimeMonitorDemo = lazy(() =>
  import('@/components/demos/UptimeMonitorDemo').then((m) => ({ default: m.UptimeMonitorDemo })),
)

const demos: {
  id: ServiceId
  eyebrow: string
  title: string
  description: string
  points: string[]
  Demo: ComponentType<{ className?: string }>
}[] = [
  {
    id: 'software',
    eyebrow: 'Custom Software',
    title: 'Dashboards & web apps that feel effortless',
    description:
      'Real-time data, clean interactions, and an interface shaped around how your team actually works.',
    points: ['Live data & charts', 'Responsive, accessible UI', 'Built on a stack you own'],
    Demo: AnalyticsDashboardDemo,
  },
  {
    id: 'software',
    eyebrow: 'Client Portals',
    title: 'Secure client portals with embedded BI',
    description:
      'Give clients a branded, self-serve portal with live KPIs and embedded Power BI reports — no spreadsheets, no email threads.',
    points: ['Embedded Power BI reports', 'Live KPIs & role-based access', 'Your brand, your data'],
    Demo: PowerBiPortalDemo,
  },
  {
    id: 'local-llm',
    eyebrow: 'Private Local LLM',
    title: 'Private AI that never leaves your network',
    description:
      'A self-hosted LLM that answers from your own documents — chat assistants, copilots, and automation with zero data sent to third-party APIs.',
    points: ['Runs on your own hardware', 'Grounded in your documents (RAG)', 'No per-token API bills'],
    Demo: LocalLlmDemo,
  },
  {
    id: 'cloud-devops',
    eyebrow: 'Cloud Infrastructure',
    title: 'Secure infrastructure that scales itself',
    description:
      'Cloud architecture that grows with demand and stays locked down — auto-scaling, encrypted, and resilient by design.',
    points: ['Auto-scaling & high availability', 'Security hardening & encryption', 'Compliance-ready by design'],
    Demo: CloudInfraDemo,
  },
  {
    id: 'consulting',
    eyebrow: 'Managed Services',
    title: 'Always-on monitoring and support',
    description:
      'We keep an eye on uptime, performance, and health — so small issues never become outages.',
    points: ['24/7 monitoring', 'Proactive alerts', 'Clear status & reporting'],
    Demo: UptimeMonitorDemo,
  },
]

export default function Work() {
  return (
    <>
      <Seo {...pageMeta.demos} />

      <PageHero
        eyebrow="Demos"
        title="See the work, not just the words"
        subtitle="Interactive demos built to show the kind of software, infrastructure, and operations we deliver. Live and running right here in your browser."
      />

      <section className="bg-neutral-50 py-16 lg:py-24">
        <Container className="space-y-20 lg:space-y-28">
          {demos.map(({ id, eyebrow, title, description, points, Demo }, i) => {
            const flipped = i % 2 === 1
            return (
              <div
                key={title}
                className={cn(
                  'grid items-center gap-10 lg:grid-cols-2 lg:gap-16',
                  flipped && 'lg:[&>*:first-child]:order-2',
                )}
              >
                <Reveal direction={flipped ? 'right' : 'left'}>
                  <Eyebrow>{eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                    {title}
                  </h2>
                  <p className="mt-3 text-lg text-neutral-600">{description}</p>
                  <StaggerGroup className="mt-6 space-y-2.5">
                    {points.map((p) => (
                      <StaggerItem key={p}>
                        <span className="flex items-center gap-2 text-sm text-neutral-700">
                          <Check className="h-4 w-4 shrink-0 text-summit-600" aria-hidden />
                          {p}
                        </span>
                      </StaggerItem>
                    ))}
                  </StaggerGroup>
                  <Link
                    to={`/contact?service=${id}`}
                    className={cn(buttonClasses('secondary', 'md'), 'mt-8')}
                  >
                    Build something like this <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Reveal>
                <Reveal direction={flipped ? 'left' : 'right'}>
                  <Parallax speed={24}>
                    <DeferredDemo component={Demo} />
                  </Parallax>
                </Reveal>
              </div>
            )
          })}

          <p className="text-center text-sm text-neutral-500">
            These are interactive demonstrations of our capabilities — not client data.
          </p>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
