import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { siteConfig } from '@/lib/siteConfig'
import { buttonClasses } from '@/components/ui/Button'

/**
 * Bottom-fixed call + contact bar, mobile only. Slides up once the visitor has
 * scrolled a bit, so it never competes with the hero. Hidden on the contact
 * page, where it would be redundant.
 */
export function MobileContactBar() {
  const { pathname } = useLocation()
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
        'fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-neutral-0/95 px-4 pt-2.5 shadow-[0_-4px_16px_rgba(22,26,29,0.08)] backdrop-blur transition-transform duration-300 ease-summit lg:hidden',
        'pb-[max(0.625rem,env(safe-area-inset-bottom))]',
        shown ? 'translate-y-0' : 'pointer-events-none translate-y-full',
      )}
    >
      <div className="flex items-center gap-2.5">
        <a
          href={siteConfig.phoneHref}
          tabIndex={shown ? undefined : -1}
          aria-label={`Call ${siteConfig.phone}`}
          className={cn(buttonClasses('secondary', 'md'), 'flex-1')}
        >
          <Phone className="h-4 w-4" aria-hidden /> Call
        </a>
        <Link
          to="/contact"
          tabIndex={shown ? undefined : -1}
          className={cn(buttonClasses('primary', 'md'), 'flex-1')}
        >
          Get in touch <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  )
}
