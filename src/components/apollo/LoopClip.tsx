import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { cn } from '@/lib/cn'
import { prefersSaveData } from '@/lib/saveData'

/**
 * A short, muted, looping cut of the launch film — the "moving screenshot" for
 * each Apollo chapter.
 *
 * - The <video> isn't mounted until the clip is near the viewport, so clips
 *   further down cost nothing up front.
 * - It autoplays while at least 40% visible and pauses when scrolled away —
 *   for every visitor, reduced-motion settings included (owner's call: the
 *   clips are the product demo, not decoration).
 * - A pause/play toggle is always available (WCAG 2.2.2 — moving content that
 *   lasts more than five seconds must be pausable), and a visitor's pause sticks.
 * - The one exception is Save-Data (an explicit "use less data" request): the
 *   poster frame stays up until the visitor presses play.
 */
export function LoopClip({
  src,
  poster,
  alt,
  className,
}: {
  src: string
  poster: string
  /** What the clip shows, for screen readers (the video itself is decorative). */
  alt: string
  className?: string
}) {
  const boxRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)
  // null = follow the automatic behaviour; true/false = the visitor's choice.
  const [userPaused, setUserPaused] = useState<boolean | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true)
      setVisible(true)
      return
    }
    const nearObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true)
          nearObserver.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    const visibleObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1]
        if (entry) setVisible(entry.intersectionRatio >= 0.4)
      },
      { threshold: [0, 0.4, 1] },
    )
    nearObserver.observe(el)
    visibleObserver.observe(el)
    return () => {
      nearObserver.disconnect()
      visibleObserver.disconnect()
    }
  }, [])

  const autoplay = !prefersSaveData()
  const shouldPlay = near && visible && (userPaused === null ? autoplay : !userPaused)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (shouldPlay) {
      video.play().catch(() => {
        /* Blocked (e.g. Low Power Mode) — the poster stays and the toggle shows Play. */
      })
    } else {
      video.pause()
    }
  }, [shouldPlay])

  const toggle = () => {
    const video = videoRef.current
    if (playing) {
      setUserPaused(true)
      return
    }
    setUserPaused(false)
    // Call play() inside the click too, so it counts as user-initiated.
    video?.play().catch(() => {})
  }

  return (
    <figure
      ref={boxRef}
      className={cn(
        'relative aspect-video overflow-hidden rounded-2xl bg-apollo-panel/40 shadow-[0_0_0_1px_rgba(148,163,184,0.12),0_30px_80px_-30px_rgba(37,99,235,0.45)]',
        className,
      )}
    >
      {near && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload={autoplay ? 'auto' : 'none'}
          aria-hidden
          tabIndex={-1}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <figcaption className="sr-only">{alt}</figcaption>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-apollo-sky/40 to-transparent"
      />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause animation' : 'Play animation'}
        // 44px on phones and tablets (a comfortable thumb target), 36px on desktop.
        className="absolute bottom-2.5 right-2.5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-apollo-night/70 text-apollo-text backdrop-blur transition-colors hover:bg-apollo-night/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apollo-accent lg:bottom-3 lg:right-3 lg:h-9 lg:w-9"
      >
        {playing ? (
          <Pause className="h-4 w-4 fill-current lg:h-3.5 lg:w-3.5" aria-hidden />
        ) : (
          <Play className="ml-0.5 h-4 w-4 fill-current lg:h-3.5 lg:w-3.5" aria-hidden />
        )}
      </button>
    </figure>
  )
}
