import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { siteConfig } from '@/lib/siteConfig'
import { useDarkRoute } from '@/hooks/useDarkRoute'
import { buttonClasses } from '@/components/ui/Button'

// The secondary button, hand-rolled for dark pages (cn() can't override
// buttonClasses' colors).
const darkSecondary =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/20 px-5 text-sm font-medium text-apollo-text transition-colors duration-200 ease-summit hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500'

/**
 * Bottom-fixed call + contact bar, mobile only. Slides up once the visitor has
 * scrolled a bit, so it never competes with the hero. Hidden on the contact
 * page, where it would be redundant. Goes dark on dark pages (the Apollo page).
 */
export function MobileContactBar() {
  const { pathname } = useLocation()
  const dark = useDarkRoute()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname === '/contact') return null

  return (
    <div
      aria-hidden={!shown}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t px-4 pt-2.5 backdrop-blur transition-transform duration-300 ease-summit lg:hidden',
        dark
          ? 'border-white/10 bg-apollo-night/90 shadow-[0_-4px_16px_rgba(0,0,0,0.45)]'
          : 'border-neutral-200 bg-neutral-0/95 shadow-[0_-4px_16px_rgba(22,26,29,0.08)]',
        'pb-[max(0.625rem,env(safe-area-inset-bottom))]',
        shown ? 'translate-y-0' : 'pointer-events-none translate-y-full',
      )}
    >
      <div className="flex items-center gap-2.5">
        <a
          href={siteConfig.phoneHref}
          tabIndex={shown ? undefined : -1}
          aria-label={`Call ${siteConfig.phone}`}
          className={cn(
            dark ? darkSecondary : buttonClasses('secondary', 'md'),
            'flex-1 whitespace-nowrap',
          )}
        >
          <Phone className="h-4 w-4" aria-hidden /> Call
        </a>
        <Link
          to="/contact"
          tabIndex={shown ? undefined : -1}
          className={cn(buttonClasses('primary', 'md'), 'flex-1 whitespace-nowrap')}
        >
          Get in touch
          {/* Dropped on the narrowest phones so the label stays on one line. */}
          <ArrowRight className="hidden h-4 w-4 min-[360px]:block" aria-hidden />
        </Link>
      </div>
    </div>
  )
}
