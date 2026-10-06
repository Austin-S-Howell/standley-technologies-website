import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { cn } from '@/lib/cn'
import { apolloFilm, filmChapters, formatTime } from '@/lib/apollo'
import { prefersSaveData } from '@/lib/saveData'

export interface ApolloFilmHandle {
  /** Brings the film into view and plays it from `seconds`. */
  playFrom: (seconds: number) => void
}

function chapterAt(t: number): number {
  let index = 0
  filmChapters.forEach((c, i) => {
    if (t >= c.start) index = i
  })
  return index
}

/**
 * The Apollo launch film, with a chapter timeline underneath.
 *
 * It autoplays (muted — the film has no audio track) once at least half of it
 * is on screen, so a visitor sees it open on "What is Apollo?" instead of
 * missing the start while reading the hero. It pauses when scrolled mostly out
 * of view and picks up again on the way back — unless the visitor paused it or
 * watched it to the end, in which case it waits for them. Same rule as the
 * chapter loops: everyone autoplays, reduced-motion included (owner's call),
 * except Save-Data, which gets the poster and a play button.
 *
 * Nothing downloads before it's on screen. The source is set when it first
 * scrolls into view — the 720p cut (~8 MB) on phones, 1080p (~20 MB)
 * otherwise — and streams as it plays. Native controls take over once playing.
 */
export const ApolloFilm = forwardRef<ApolloFilmHandle, { className?: string }>(function ApolloFilm(
  { className },
  ref,
) {
  const frameRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  // The visitor paused it, or it played to the end: don't auto-resume.
  const holdRef = useRef(false)
  // Set just before our own scroll-away pause(), so its 'pause' event isn't
  // mistaken for the visitor pausing.
  const autoPausingRef = useRef(false)

  /** Sets the source on first use (phones get the 720p cut). */
  const load = useCallback(() => {
    const video = videoRef.current
    if (video && !video.getAttribute('src')) {
      video.src = window.matchMedia('(max-width: 767px)').matches
        ? apolloFilm.srcSmall
        : apolloFilm.src
    }
    return video
  }, [])

  /** Plays — from `seconds` if given, otherwise from wherever it is. */
  const play = useCallback(
    (seconds?: number) => {
      const video = load()
      if (!video) return
      if (seconds !== undefined) {
        const seek = () => {
          video.currentTime = seconds
        }
        if (video.readyState >= HTMLMediaElement.HAVE_METADATA) seek()
        else video.addEventListener('loadedmetadata', seek, { once: true })
      }
      video.muted = true
      video.play().catch(() => {
        /* Blocked (e.g. iOS Low Power Mode) or interrupted — the play button stays up. */
      })
    },
    [load],
  )

  useImperativeHandle(
    ref,
    () => ({
      playFrom(seconds) {
        frameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        play(seconds)
      },
    }),
    [play],
  )

  // Autoplay on scroll: play at ≥50% visible, pause once it drops below 20% on
  // the way out (only when leaving — so a "Watch this chapter" jump that
  // scrolls the film in from far below isn't paused as it arrives).
  useEffect(() => {
    const frame = frameRef.current
    const video = videoRef.current
    if (!frame || !video || typeof IntersectionObserver === 'undefined') return
    const autoplay = !prefersSaveData()
    let lastRatio = 0
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1]
        if (!entry) return
        const ratio = entry.isIntersecting ? entry.intersectionRatio : 0
        if (autoplay && ratio > 0) load()
        if (ratio >= 0.5) {
          if (autoplay && video.paused && !holdRef.current) play()
        } else if (ratio < 0.2 && ratio < lastRatio && !video.paused) {
          autoPausingRef.current = true
          video.pause()
        }
        lastRatio = ratio
      },
      { threshold: [0, 0.2, 0.5] },
    )
    observer.observe(frame)
    return () => observer.disconnect()
  }, [load, play])

  // Track the visitor's intent, and follow playback for the timeline.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onPlay = () => {
      holdRef.current = false
      setStarted(true)
    }
    const onPause = () => {
      if (autoPausingRef.current) {
        autoPausingRef.current = false
        return
      }
      if (!video.ended) holdRef.current = true
    }
    const onEnded = () => {
      holdRef.current = true
    }
    const onTime = () => {
      const i = chapterAt(video.currentTime)
      const start = filmChapters[i]?.start ?? 0
      const end = filmChapters[i + 1]?.start ?? (video.duration || apolloFilm.duration)
      setActive(i)
      setProgress(Math.min(1, Math.max(0, (video.currentTime - start) / (end - start))))
    }
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('ended', onEnded)
    video.addEventListener('timeupdate', onTime)
    video.addEventListener('seeked', onTime)
    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('timeupdate', onTime)
      video.removeEventListener('seeked', onTime)
    }
  }, [])

  return (
    <div className={className}>
      <div
        ref={frameRef}
        className="relative aspect-video overflow-hidden rounded-2xl bg-apollo-night shadow-[0_0_0_1px_rgba(148,163,184,0.14),0_40px_120px_-36px_rgba(59,130,246,0.55)] sm:rounded-[1.75rem]"
      >
        <video
          ref={videoRef}
          poster={apolloFilm.poster}
          preload="metadata"
          playsInline
          muted
          controls={started}
          aria-label="Apollo launch film — 3 minutes 30 seconds, no sound. Each chapter is described in text further down the page."
          className="absolute inset-0 h-full w-full object-cover"
        />

        {!started && (
          <button
            type="button"
            onClick={() => play(0)}
            className="group absolute inset-0 focus-visible:outline-none"
          >
            <span className="sr-only">Play the Apollo launch film (3:30)</span>
            {/* Centred at 72% height: below the poster's "What is Apollo?"
                title (which sits on the midline) at every frame size. */}
            <span
              aria-hidden
              className="absolute left-1/2 top-[72%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            >
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-apollo-night shadow-[0_10px_40px_-6px_rgba(96,165,250,0.7)] transition-transform duration-300 ease-summit group-hover:scale-105 group-focus-visible:ring-4 group-focus-visible:ring-apollo-accent/60 sm:h-16 sm:w-16 lg:h-20 lg:w-20">
                <span className="absolute inset-0 animate-ping rounded-full bg-white/25 [animation-duration:2.4s]" />
                <Play className="relative ml-0.5 h-5 w-5 fill-current sm:ml-1 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
              </span>
              <span className="absolute top-full mt-3 hidden whitespace-nowrap text-sm font-medium text-apollo-muted transition-colors group-hover:text-apollo-text sm:block">
                Watch the launch film · {formatTime(apolloFilm.duration)}
              </span>
            </span>
          </button>
        )}

        {/* Hairline of light along the top edge, like the Apollo app's panels */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-apollo-sky/50 to-transparent"
        />
      </div>

      {/* Chapter timeline — jumps the film; fills as it plays */}
      <nav aria-label="Film chapters" className="mt-5">
        <ol className="flex snap-x gap-2 overflow-x-auto pb-1 [mask-image:linear-gradient(to_right,black_88%,transparent)] [scrollbar-width:none] md:grid md:grid-cols-9 md:overflow-visible md:[mask-image:none] [&::-webkit-scrollbar]:hidden">
          {filmChapters.map((chapter, i) => {
            const isActive = started && i === active
            const fill = !started ? 0 : i < active ? 1 : isActive ? progress : 0
            return (
              <li key={chapter.label} className="min-w-[6.25rem] snap-start md:min-w-0">
                <button
                  type="button"
                  onClick={() => play(chapter.start)}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`Play from ${chapter.label} (${formatTime(chapter.start)})`}
                  className="group w-full rounded-lg px-1 pb-1 pt-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apollo-accent/70"
                >
                  <span
                    aria-hidden
                    className="block h-[3px] overflow-hidden rounded-full bg-white/10"
                  >
                    <span
                      className={cn(
                        'block h-full origin-left rounded-full transition-transform duration-300 ease-linear',
                        i < active ? 'bg-apollo-accent/45' : 'bg-apollo-accent',
                      )}
                      style={{ transform: `scaleX(${fill})` }}
                    />
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      'mt-2.5 block text-sm font-semibold transition-colors',
                      isActive
                        ? 'text-apollo-text'
                        : 'text-apollo-muted group-hover:text-apollo-text',
                    )}
                  >
                    {chapter.label}
                  </span>
                  <span aria-hidden className="block text-xs tabular-nums text-apollo-muted/80">
                    {formatTime(chapter.start)}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
})
