import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, Calculator, Github, Lock, Mail, Play } from 'lucide-react'
import { cn } from '@/lib/cn'
import { pageMeta } from '@/lib/seo'
import { siteConfig } from '@/lib/siteConfig'
import {
  apolloChapters,
  apolloFilm,
  apolloPlatforms,
  formatTime,
  type ApolloChapter,
} from '@/lib/apollo'
import { Seo } from '@/components/Seo'
import { Reveal } from '@/components/Reveal'
import { StaggerGroup, StaggerItem } from '@/components/Stagger'
import { Container } from '@/components/ui/Container'
import { ApolloAppIcon, MicrosoftLogo } from '@/components/BrandIcons'
import { ApolloFilm, type ApolloFilmHandle } from '@/components/apollo/ApolloFilm'
import { LoopClip } from '@/components/apollo/LoopClip'

/**
 * /apollo — the Apollo product page, built around the launch film.
 *
 * Styled as APOLLO rather than as the rest of the site (same call as
 * /downloads): the film's night-navy ground, glass panels and blue → violet
 * accent, via the `apollo` colour family in tailwind.config.js. Headings use
 * Inter (`font-sans`) like Apollo's own wordmark, which also overrides the
 * site's global Space Grotesk heading rule.
 *
 * Apollo isn't out yet, so this page is informational with a "Coming soon"
 * message and deliberately no download links. Copy lives in lib/apollo.ts.
 */

const videoJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: apolloFilm.title,
  description: apolloFilm.description,
  thumbnailUrl: [`${siteConfig.url}${apolloFilm.shareImage}`],
  uploadDate: apolloFilm.uploadDate,
  duration: `PT${Math.floor(apolloFilm.duration / 60)}M${apolloFilm.duration % 60}S`,
  contentUrl: `${siteConfig.url}${apolloFilm.src}`,
}

const gradientText =
  'bg-gradient-to-r from-apollo-sky via-apollo-accent to-apollo-violet bg-clip-text text-transparent'

const buttonBase =
  'inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6 text-sm font-semibold transition-[transform,background-color] duration-200 ease-summit hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apollo-accent focus-visible:ring-offset-2 focus-visible:ring-offset-apollo-night'
const primaryButton = cn(
  buttonBase,
  'bg-neutral-0 text-apollo-night shadow-[0_10px_30px_-10px_rgba(147,197,253,0.6)] hover:bg-apollo-ice',
)
const secondaryButton = cn(
  buttonBase,
  'border border-white/15 bg-white/[0.04] text-apollo-text hover:bg-white/[0.09]',
)

function ComingSoonBadge() {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-apollo-accent/30 bg-apollo-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-apollo-sky">
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-apollo-accent opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-apollo-accent" />
      </span>
      Coming soon
    </span>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-apollo-sky">{children}</p>
  )
}

/** Faint hairline between sections. */
function Rule() {
  return (
    <div
      aria-hidden
      className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
    />
  )
}

/** The hero's backdrop: the film's vignette, a faint grid, a breathing blue bloom, the comet. */
function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_26%,#0B1428_0%,#03070D_72%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_40%_at_50%_22%,black,transparent)]" />
      <div className="absolute left-1/2 top-24 h-[26rem] w-[26rem] -translate-x-1/2 animate-apollo-breathe rounded-full bg-apollo-blue/25 blur-[110px]" />
      <div className="absolute right-[6%] top-[42%] h-72 w-72 rounded-full bg-apollo-violet/10 blur-[100px]" />
      <div className="absolute left-0 top-[14%] h-0.5 w-[22vw] animate-apollo-comet rounded-full bg-gradient-to-r from-transparent via-apollo-sky/70 to-neutral-0 opacity-0 shadow-[0_0_14px_2px_rgba(147,197,253,0.55)]" />
      <div className="apollo-grain absolute inset-0 opacity-[0.06] mix-blend-soft-light" />
    </div>
  )
}

function ChapterSection({
  chapter,
  index,
  onWatch,
}: {
  chapter: ApolloChapter
  index: number
  onWatch: (seconds: number) => void
}) {
  const flipped = index % 2 === 1
  const Icon = chapter.icon
  const titleId = `${chapter.id}-title`

  return (
    <section id={chapter.id} aria-labelledby={titleId} className="scroll-mt-16 lg:scroll-mt-20">
      <Container className="py-12 sm:py-16 lg:py-24">
        {/* Phones read head → clip → features; desktop puts the clip in its own
            column, sticky while the features scroll past. */}
        <div className="grid gap-y-8 sm:gap-y-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8">
          <Reveal
            direction={flipped ? 'right' : 'left'}
            className={cn(
              'lg:col-span-5 lg:row-start-1',
              flipped ? 'lg:col-start-8' : 'lg:col-start-1',
            )}
          >
            <p className="flex items-center gap-3 text-sm font-semibold text-apollo-sky">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-apollo-accent/25 bg-apollo-accent/10">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <span>
                <span className="tabular-nums text-apollo-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="mx-2 text-apollo-steel" aria-hidden>
                  /
                </span>
                {chapter.label}
              </span>
            </p>
            <h2
              id={titleId}
              className="mt-5 font-sans text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-apollo-text sm:text-5xl"
            >
              {chapter.headline}
              {chapter.accent && (
                <>
                  {' '}
                  <span className={gradientText}>{chapter.accent}</span>
                </>
              )}
            </h2>
            <p className="mt-5 text-lg leading-relaxed">{chapter.summary}</p>
          </Reveal>

          <div
            className={cn(
              'lg:col-span-7 lg:row-span-2 lg:row-start-1',
              flipped ? 'lg:col-start-1' : 'lg:col-start-6',
            )}
          >
            <div className="lg:sticky lg:top-28">
              <Reveal direction="scale">
                <LoopClip {...chapter.clip} />
              </Reveal>
            </div>
          </div>

          <div
            className={cn(
              'lg:col-span-5 lg:row-start-2',
              flipped ? 'lg:col-start-8' : 'lg:col-start-1',
            )}
          >
            <StaggerGroup className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-1">
              {chapter.features.map((feature) => {
                const FeatureIcon = feature.icon
                return (
                  <StaggerItem key={feature.title} className="flex gap-4">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-apollo-accent">
                      <FeatureIcon className="h-4 w-4" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-sans text-base font-semibold tracking-tight text-apollo-text">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed">{feature.body}</p>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>

            <button
              type="button"
              onClick={() => onWatch(chapter.filmStart)}
              className="group mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] py-1.5 pl-1.5 pr-4 text-sm font-medium text-apollo-text transition-colors hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apollo-accent sm:mt-9"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-0 text-apollo-night transition-transform duration-200 ease-summit group-hover:scale-105">
                <Play className="ml-0.5 h-3 w-3 fill-current" aria-hidden />
              </span>
              Watch this chapter
              <span className="tabular-nums text-apollo-muted">
                {formatTime(chapter.filmStart)}
              </span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-apollo-panel/60 to-apollo-night/40 p-6 sm:p-9',
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-apollo-sky/40 to-transparent"
      />
      {children}
    </div>
  )
}

const panelTitle = cn(
  gradientText,
  'font-sans text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl',
)

const integrations = [
  {
    label: 'GitHub',
    icon: <Github className="h-4 w-4" aria-hidden />,
    place: 'left-1/2 top-0 -translate-x-1/2',
  },
  {
    label: 'QuickBooks',
    icon: <Calculator className="h-4 w-4" aria-hidden />,
    place: 'right-0 top-1/2 -translate-y-1/2',
  },
  {
    label: 'Gmail',
    icon: <Mail className="h-4 w-4" aria-hidden />,
    place: 'bottom-0 left-1/2 -translate-x-1/2',
  },
  {
    label: 'Outlook · Power BI',
    icon: <MicrosoftLogo className="h-3.5 w-3.5" />,
    place: 'left-0 top-1/2 -translate-y-1/2',
  },
]

/** The film's integration hub: Apollo in the middle, the connected tools around it. */
function IntegrationHub() {
  const pill =
    'inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-apollo-night/90 px-3.5 py-2 text-xs font-medium text-apollo-text shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)] [&>svg]:text-apollo-sky'
  return (
    <>
      {/* Hub diagram (tablet and up) */}
      <div className="relative mx-auto mt-8 hidden h-64 max-w-lg sm:block">
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full text-apollo-accent/40"
        >
          {[
            [50, 12],
            [86, 50],
            [50, 88],
            [14, 50],
          ].map(([x, y]) => (
            <line
              key={`${x}-${y}`}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 8"
              vectorEffect="non-scaling-stroke"
              className="animate-apollo-flow"
            />
          ))}
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            className="absolute inset-0 -z-10 rounded-full bg-apollo-blue/30 blur-2xl"
            aria-hidden
          />
          <ApolloAppIcon size={64} />
        </div>
        <ul>
          {integrations.map((it) => (
            <li key={it.label} className={cn('absolute', it.place)}>
              <span className={pill}>
                {it.icon}
                {it.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Phones: a simple wrap of the same tools */}
      <ul className="mt-6 flex flex-wrap gap-2 sm:hidden">
        {integrations.map((it) => (
          <li key={it.label}>
            <span className={pill}>
              {it.icon}
              {it.label}
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}

/** "Your models. Your servers." — a little locked server stack, as in the film. */
function ServerStack() {
  return (
    <div className="relative mx-auto mt-10 w-full max-w-[15rem] rounded-2xl border border-dashed border-apollo-accent/30 px-4 pb-4 pt-8">
      <span className="absolute -top-5 left-1/2 -translate-x-1/2">
        <ApolloAppIcon size={40} />
      </span>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'mt-2 flex items-center gap-2 rounded-lg border px-3 py-2.5',
            i === 1
              ? 'border-apollo-accent/50 bg-apollo-accent/10'
              : 'border-white/10 bg-white/[0.03]',
          )}
        >
          <span className="h-1.5 w-14 rounded-full bg-white/15" />
          <span className="h-1.5 w-6 rounded-full bg-white/10" />
          {i === 1 ? (
            <Lock className="ml-auto h-3.5 w-3.5 text-apollo-sky" aria-hidden />
          ) : (
            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-apollo-accent/80" />
          )}
        </div>
      ))}
    </div>
  )
}

export default function Apollo() {
  const film = useRef<ApolloFilmHandle>(null)
  const watch = (seconds: number) => film.current?.playFrom(seconds)

  return (
    <div className="bg-apollo-night text-apollo-muted">
      <Seo {...pageMeta.apollo} jsonLd={videoJsonLd} />

      {/* Hero + the film */}
      <section className="relative isolate overflow-hidden pb-12 pt-28 sm:pb-16 sm:pt-36 lg:pb-20 lg:pt-40">
        <HeroBackdrop />
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <ComingSoonBadge />
            <div className="mt-9 flex justify-center">
              <ApolloAppIcon size={76} />
            </div>
            <h1 className="mt-6 font-sans text-6xl font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-7xl lg:text-8xl">
              <span className="inline-block animate-apollo-shimmer bg-[linear-gradient(110deg,#DCE7F7_0%,#8EC1F7_30%,#5FA6F7_50%,#8EC1F7_70%,#DCE7F7_100%)] bg-[length:300%_100%] bg-clip-text pb-[0.08em] text-transparent [filter:drop-shadow(0_4px_24px_rgba(96,165,250,0.25))]">
                Apollo
              </span>
            </h1>
            <p className="mt-4 text-balance font-sans text-xl font-semibold tracking-tight text-apollo-text sm:text-2xl">
              Your data. Your AI. Your assistant.
            </p>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed sm:text-lg">
              An intelligent workspace that researches, designs, writes and tests code, and handles
              the routine work in between — on the model you choose.
            </p>
            {/* Phones: two equal full-width buttons, stacked */}
            <div className="mx-auto mt-9 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
              <button type="button" onClick={() => watch(0)} className={primaryButton}>
                <Play className="h-4 w-4 fill-current" aria-hidden />
                Watch the film
                <span className="tabular-nums text-apollo-night/50">
                  {formatTime(apolloFilm.duration)}
                </span>
              </button>
              <a href={`#${apolloChapters[0]?.id ?? 'ask'}`} className={secondaryButton}>
                Explore the features
                <ArrowDown className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </Reveal>

          <Reveal direction="scale" className="mx-auto mt-12 max-w-5xl sm:mt-14 lg:mt-20">
            <ApolloFilm ref={film} />
          </Reveal>
        </Container>
      </section>

      {/* The film's opening, as a statement */}
      <section className="pb-20 pt-12 sm:pb-32 sm:pt-20">
        <Container className="max-w-4xl text-center">
          <StaggerGroup className="font-sans text-4xl font-extrabold leading-[1.1] tracking-[-0.035em] sm:text-6xl">
            {['another chatbot.', 'a page of links.', 'all talk.'].map((line, i, lines) => (
              <StaggerItem
                key={line}
                className={i === lines.length - 1 ? 'text-apollo-text' : 'text-apollo-text/40'}
              >
                <span className="text-apollo-steel">Not</span> {line}
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed sm:mt-10 sm:text-xl">
              Apollo is an AI workspace that{' '}
              <span className="font-semibold text-apollo-text">does the work</span> — for you and
              your whole team. Here’s all of it, chapter by chapter.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* The seven chapters */}
      {apolloChapters.map((chapter, i) => (
        <div key={chapter.id}>
          <Rule />
          <ChapterSection chapter={chapter} index={i} onWatch={watch} />
        </div>
      ))}

      <Rule />

      {/* Everywhere: integrations, models, platforms */}
      <section className="py-16 sm:py-24 lg:py-32">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>Everywhere</Eyebrow>
            <h2 className="mt-4 font-sans text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-apollo-text sm:text-5xl">
              Fits the way <span className={gradientText}>you work.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed">
              Apollo connects to the tools your team already uses, runs on the models you choose,
              and goes wherever you do.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-5">
            <Reveal className="lg:col-span-3">
              <Panel>
                <h3 className={panelTitle}>Integrations.</h3>
                <p className="mt-3 max-w-md leading-relaxed">
                  Connect GitHub, Outlook, Power BI, QuickBooks and Gmail — then switch each one on
                  for everyone in your company.
                </p>
                <IntegrationHub />
              </Panel>
            </Reveal>

            <Reveal className="lg:col-span-2" delay={0.1}>
              <Panel>
                <h3 className={panelTitle}>
                  Your models.
                  <br />
                  Your servers.
                </h3>
                <p className="mt-3 leading-relaxed">
                  Choose the models your company runs on — including models hosted on your own
                  servers.
                </p>
                <ServerStack />
              </Panel>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={0.15}>
              <Panel>
                <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.5fr]">
                  <div>
                    <h3 className={panelTitle}>Wherever you work.</h3>
                    <p className="mt-3 max-w-md leading-relaxed">
                      One Apollo in your browser, on Windows and Mac, on your phone, and inside
                      VS&nbsp;Code.
                    </p>
                  </div>
                  <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {apolloPlatforms.map((platform) => {
                      const PlatformIcon = platform.icon
                      return (
                        <li
                          key={platform.label}
                          className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-6 text-center"
                        >
                          <PlatformIcon
                            className="h-7 w-7 text-apollo-accent"
                            strokeWidth={1.5}
                            aria-hidden
                          />
                          <span className="text-sm font-medium text-apollo-text">
                            {platform.label}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </Panel>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Coming soon */}
      <section className="pb-16 sm:pb-24 lg:pb-32">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(47,111,221,0.32),transparent_60%),linear-gradient(180deg,#0C1C36,#050B16)] px-5 py-14 text-center sm:px-12 sm:py-16 lg:py-24">
              <div
                aria-hidden
                className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-apollo-sky/60 to-transparent"
              />
              <div className="flex justify-center">
                <ApolloAppIcon size={64} />
              </div>
              <div className="mt-8">
                <ComingSoonBadge />
              </div>
              <h2 className="mt-5 font-sans text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-apollo-text sm:text-6xl">
                Apollo is <span className={gradientText}>coming soon.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed">
                We’re putting the finishing touches on Apollo. It isn’t available to download yet —
                check back here for launch news.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link to="/contact" className={primaryButton}>
                  Get in touch
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <p className="mt-4 text-sm">Questions about Apollo? We’d love to hear from you.</p>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  )
}
