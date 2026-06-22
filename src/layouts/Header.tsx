import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/cn'
import { siteConfig } from '@/lib/siteConfig'
import { useScrollHeader } from '@/hooks/useScrollHeader'
import { LogoWordmark } from '@/components/Logo'
import { buttonClasses } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { MobileMenu } from './MobileMenu'

type Pill = { left: number; top: number; width: number; height: number; opacity: number }
const HIDDEN: Pill = { left: 0, top: 0, width: 0, height: 0, opacity: 0 }

export function Header() {
  const scrolled = useScrollHeader()
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [pill, setPill] = useState<Pill>(HIDDEN)

  const items = siteConfig.nav
  const activeIndex = items.findIndex((it) =>
    it.to === '/' ? pathname === '/' : pathname.startsWith(it.to),
  )

  const moveTo = (index: number) => {
    const el = linkRefs.current[index]
    if (!el) {
      setPill((p) => ({ ...p, opacity: 0 }))
      return
    }
    setPill({
      left: el.offsetLeft,
      top: el.offsetTop,
      width: el.offsetWidth,
      height: el.offsetHeight,
      opacity: 1,
    })
  }

  const rest = () => (activeIndex >= 0 ? moveTo(activeIndex) : setPill((p) => ({ ...p, opacity: 0 })))

  // Position the highlight on the active link (and keep it there on resize / route change)
  useLayoutEffect(() => {
    rest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    const onResize = () => rest()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-summit',
        scrolled
          ? 'border-b border-neutral-200 bg-neutral-0/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container className="grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:h-20">
        {/* Left — logo */}
        <Link
          to="/"
          className="justify-self-start rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          <LogoWordmark />
        </Link>

        {/* Center — interactive pill nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <div
            onMouseLeave={rest}
            className="relative flex items-center gap-0.5 rounded-full border border-neutral-200/60 bg-neutral-0/50 p-1 backdrop-blur-sm"
          >
            {/* Sliding highlight */}
            <span
              aria-hidden
              className="pointer-events-none absolute rounded-full bg-sage-100 transition-all duration-300 ease-summit"
              style={{
                left: pill.left,
                top: pill.top,
                width: pill.width,
                height: pill.height,
                opacity: pill.opacity,
              }}
            />
            {items.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                ref={(el) => {
                  linkRefs.current[i] = el
                }}
                onMouseEnter={() => moveTo(i)}
                className={({ isActive }) =>
                  cn(
                    'relative z-10 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500',
                    isActive ? 'text-summit-700' : 'text-neutral-600 hover:text-neutral-900',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Right — actions */}
        <div className="flex items-center justify-self-end gap-2">
          <Link
            to="/contact"
            className={cn(
              buttonClasses('primary', 'sm'),
              'hidden transition-transform duration-200 ease-summit hover:-translate-y-0.5 sm:inline-flex',
            )}
          >
            Get in Touch
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-700 hover:bg-sage-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
