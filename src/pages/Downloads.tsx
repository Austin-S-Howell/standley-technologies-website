import { useEffect, useRef, useState } from 'react'
import type { ComponentType, FormEvent } from 'react'
import { Check, Download, Lock, LockOpen } from 'lucide-react'
import { cn } from '@/lib/cn'
import { pageMeta } from '@/lib/seo'
import {
  apolloDownload,
  DOWNLOAD_ACCESS_CODE,
  DOWNLOAD_UNLOCK_STORAGE_KEY,
  type PlatformKey,
} from '@/lib/downloads'
import { Seo } from '@/components/Seo'
import { AppleLogo, ApolloLogo, MicrosoftLogo } from '@/components/BrandIcons'

/**
 * This page is deliberately styled as APOLLO, not as the rest of the site:
 * Apollo's palette (ink #0F172A / navy #1D3A6E / accent #60A5FA), its glass
 * panel with the blue hairline, gradient buttons, and the star mark — a port
 * of the Apollo app's own download page rather than a Standley-branded one.
 * The arbitrary color values below are Apollo brand tokens (enoch-web
 * theme.css); don't swap them for the site's sage/summit/gold families.
 */

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: apolloDownload.name,
  description: apolloDownload.description,
  operatingSystem: 'Windows 10, Windows 11, macOS 11 or later',
  applicationCategory: 'BusinessApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const platformLogos: Record<PlatformKey, ComponentType<{ className?: string }>> = {
  windows: MicrosoftLogo,
  macos: AppleLogo,
}

/**
 * Live version numbers, read from the same public update manifests the
 * installed apps poll. Decorative on purpose: when the fetch can't run
 * (offline, CORS, CSP) the number is omitted and the download links — which
 * always serve the latest release under a stable name — are unaffected.
 */
function useLatestVersions(): Partial<Record<PlatformKey, string>> {
  const [versions, setVersions] = useState<Partial<Record<PlatformKey, string>>>({})

  useEffect(() => {
    const ctrl = new AbortController()
    for (const platform of apolloDownload.platforms) {
      fetch(platform.feedUrl, { signal: ctrl.signal, cache: 'no-store' })
        .then((res) => (res.ok ? res.text() : Promise.reject(new Error(`HTTP ${res.status}`))))
        .then((text) => {
          const version = text.match(/^version:\s*(\S+)/m)?.[1]
          if (version) setVersions((prev) => ({ ...prev, [platform.key]: version }))
        })
        .catch(() => {
          /* no version shown — the page reads fine without one */
        })
    }
    return () => ctrl.abort()
  }, [])

  return versions
}

/**
 * Apollo's brand gradient (theme.css --enoch-gradient) as button chrome.
 * The hover is built from four layered cues so it reads fluid and premium
 * rather than snappy: the 200%-size gradient GLIDES to the far corner over
 * 700ms (the app's own DownloadPage.css trick), the button lifts 3px over
 * 300ms on a plush decelerating curve, the drop shadow deepens and blooms
 * blue in step with the lift (an inset top hairline keeps a glassy edge in
 * both states), and pressing settles it back down. `transform-gpu` +
 * `will-change-transform` keep the lift on its own compositor layer so
 * hovering never re-renders the backdrop-blurred card behind it. The `group`
 * lets the trailing download arrow nudge downward in sympathy.
 */
const gradientButton =
  'group flex w-full transform-gpu items-center gap-3 rounded-xl bg-gradient-to-br from-[#0F172A] via-[#1D3A6E] to-[#60A5FA] bg-[length:200%_200%] bg-[position:0%_0%] px-4 py-3 text-left text-white shadow-[0_8px_22px_-10px_rgba(29,58,110,0.65),inset_0_1px_0_rgba(255,255,255,0.14)] will-change-transform [transition:background-position_700ms_cubic-bezier(0.22,1,0.36,1),transform_300ms_cubic-bezier(0.22,1,0.36,1),box-shadow_300ms_cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:bg-[position:100%_100%] hover:shadow-[0_16px_32px_-12px_rgba(29,58,110,0.8),0_4px_12px_-4px_rgba(96,165,250,0.45),inset_0_1px_0_rgba(255,255,255,0.18)] active:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FAFC]'

/**
 * The gate's submit control is an icon-only button that acts out the unlock:
 * a lock at rest; on the right code it swings open (LockOpen), turns into a
 * checkmark, and then the downloads swap in; on a wrong code it shakes and
 * goes red along with the input. Stage timings sum to ~1.1s so the little
 * performance is seen but never in the way. (Under prefers-reduced-motion the
 * global guard collapses the animations to instant.)
 */
type GateStage = 'locked' | 'open' | 'done'

const stageIcons: Record<GateStage, ComponentType<{ className?: string }>> = {
  locked: Lock,
  open: LockOpen,
  done: Check,
}

function AccessGate({ onUnlock }: { onUnlock: () => void }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  // Remounts the button on each failed try so the shake replays (same class,
  // new element — CSS animations only restart on mount).
  const [attempt, setAttempt] = useState(0)
  const [stage, setStage] = useState<GateStage>('locked')
  const timeouts = useRef<number[]>([])

  useEffect(() => {
    const pending = timeouts.current
    return () => pending.forEach((t) => window.clearTimeout(t))
  }, [])

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (stage !== 'locked') return
    if (code.trim().toUpperCase() === DOWNLOAD_ACCESS_CODE) {
      setError(false)
      setStage('open')
      timeouts.current.push(window.setTimeout(() => setStage('done'), 500))
      timeouts.current.push(window.setTimeout(onUnlock, 1100))
    } else {
      setError(true)
      setAttempt((n) => n + 1)
    }
  }

  const Icon = stageIcons[stage]

  return (
    <form onSubmit={submit} noValidate className="mt-7">
      <label htmlFor="apollo-access-code" className="sr-only">
        Access code
      </label>
      <div className="flex gap-2">
        <input
          id="apollo-access-code"
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value)
            setError(false)
          }}
          placeholder="Access code"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          disabled={stage !== 'locked'}
          aria-invalid={error || undefined}
          aria-describedby={error ? 'apollo-access-code-error' : undefined}
          className={cn(
            'h-11 min-w-0 flex-1 rounded-xl border bg-white px-3.5 text-center text-sm font-medium uppercase tracking-[0.2em] text-[#0F172A] placeholder:font-normal placeholder:normal-case placeholder:tracking-normal placeholder:text-[#94A3B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]/60 disabled:opacity-60',
            error ? 'border-[#DC2626]' : 'border-[rgba(15,23,42,0.16)]',
          )}
        />
        <button
          key={attempt}
          type="submit"
          disabled={stage !== 'locked'}
          aria-label="Unlock downloads"
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-white transition-colors duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]/60',
            stage === 'done'
              ? 'border-[#16A34A] text-[#16A34A]'
              : stage === 'open'
                ? 'border-[#2F6FDD] text-[#2F6FDD]'
                : error
                  ? 'animate-apollo-shake border-[#DC2626] text-[#DC2626]'
                  : 'border-[rgba(15,23,42,0.16)] text-[#1D3A6E] hover:border-[#1D3A6E]',
          )}
        >
          <Icon key={stage} className="h-5 w-5 animate-apollo-pop" aria-hidden />
        </button>
      </div>
      {error && (
        <p
          id="apollo-access-code-error"
          role="alert"
          className="mt-2 text-center text-xs text-[#DC2626]"
        >
          That code didn’t work.
        </p>
      )}
      <p className="mt-4 text-center text-xs text-[#64748B]">Apollo is invite-only right now.</p>
    </form>
  )
}

export default function Downloads() {
  const versions = useLatestVersions()
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(DOWNLOAD_UNLOCK_STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  const unlock = () => {
    setUnlocked(true)
    try {
      sessionStorage.setItem(DOWNLOAD_UNLOCK_STORAGE_KEY, 'true')
    } catch {
      /* private mode — the gate simply asks again next visit */
    }
  }

  return (
    <>
      <Seo {...pageMeta.downloads} jsonLd={softwareJsonLd} />

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8FAFC] px-5 pb-20 pt-28">
        {/* Ambient glows in Apollo's accent + violet, like the app backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#60A5FA]/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-8 right-[12%] h-56 w-56 rounded-full bg-[#6D28D9]/15 blur-3xl"
        />

        {/* Glass card with the blue hairline along its top edge */}
        <div className="relative w-full max-w-[26rem] rounded-[20px] border border-[rgba(15,23,42,0.08)] bg-white/75 p-8 font-sans shadow-[0_10px_40px_-16px_rgba(15,23,42,0.18),0_2px_6px_rgba(15,23,42,0.04)] backdrop-blur-xl sm:p-9">
          <div
            aria-hidden
            className="absolute inset-x-5 -top-px h-px bg-gradient-to-r from-transparent via-[#60A5FA]/55 to-transparent"
          />

          <div className="flex items-center justify-center gap-2.5">
            {/* True .enoch-wordmark port: Inter (font-sans beats the global
                Space Grotesk h1 rule) at 800/-0.025em, the 5-stop shimmer
                gradient at 300% width, and the blue glow. */}
            <h1 className="animate-apollo-shimmer bg-[linear-gradient(120deg,#0F172A_0%,#1D3A6E_40%,#2F6FDD_65%,#1D3A6E_90%,#0F172A_100%)] bg-[length:300%_100%] bg-clip-text font-sans text-4xl font-extrabold tracking-[-0.025em] text-transparent [filter:drop-shadow(0_2px_16px_rgba(96,165,250,0.22))]">
              {apolloDownload.name}
            </h1>
            <ApolloLogo size={34} className="shrink-0" />
          </div>
          <p className="mt-2 text-center font-apollo-serif text-[15px] italic text-[#475569]">
            {apolloDownload.tagline}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {['Local AI', 'Security first', 'Your data, your control'].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[rgba(15,23,42,0.16)] px-3 py-1 text-xs text-[#475569]"
              >
                {chip}
              </span>
            ))}
          </div>

          {unlocked ? (
            <div className="mt-7 space-y-3">
                {apolloDownload.platforms.map((platform) => {
                  const Logo = platformLogos[platform.key]
                  const version = versions[platform.key]
                  return (
                    <a
                      key={platform.key}
                      href={platform.url}
                      aria-label={`Download ${apolloDownload.name} for ${platform.label}`}
                      className={gradientButton}
                    >
                      <Logo className="h-5 w-5 shrink-0" />
                      <span className="flex-1">
                        <span className="block text-sm font-bold">
                          Download for {platform.label}
                        </span>
                        <span className="block text-xs text-white/70">
                          {platform.summary}
                          {version ? ` · v${version}` : ''}
                        </span>
                      </span>
                      <Download
                        className="h-4 w-4 shrink-0 opacity-80 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0.5 group-hover:opacity-100"
                        aria-hidden
                      />
                    </a>
                  )
                })}
            </div>
          ) : (
            <AccessGate onUnlock={unlock} />
          )}
        </div>
      </section>
    </>
  )
}
