import { siteConfig } from '@/lib/siteConfig'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/Reveal'

/** "How we work" — the 4-step process. Reused on Home and Services. */
export function ProcessSteps({ className }: { className?: string }) {
  return (
    <section className={className ?? 'bg-neutral-0 py-20'}>
      <Container>
        <SectionHeading
          align="center"
          eyebrow="How we work"
          title="A clear path from idea to summit"
          description="No mystery, no runaround — a process designed so you always know where things stand."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-neutral-200 bg-neutral-0 p-6">
                <span className="font-display text-sm font-semibold tracking-wider text-gold-800">
                  {p.step}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-neutral-900">{p.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
