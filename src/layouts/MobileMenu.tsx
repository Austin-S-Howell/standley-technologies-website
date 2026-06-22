import { useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { siteConfig } from '@/lib/siteConfig'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { LogoWordmark } from '@/components/Logo'
import { buttonClasses } from '@/components/ui/Button'

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useFocusTrap(panelRef, open)

  // Close on navigation
  useEffect(() => {
    if (open) onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // Esc to close + scroll lock while open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 lg:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-neutral-900/40 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          'absolute right-0 top-0 flex h-full w-80 max-w-[85%] flex-col bg-neutral-0 shadow-xl transition-transform duration-300 ease-summit',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-5">
          <LogoWordmark />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-700 hover:bg-sage-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex flex-col gap-1 p-4">
          {siteConfig.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500',
                  isActive ? 'bg-sage-50 text-summit-700' : 'text-neutral-700 hover:bg-sage-100',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto p-4">
          <Link to="/contact" className={cn(buttonClasses('primary', 'lg'), 'w-full')}>
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  )
}
