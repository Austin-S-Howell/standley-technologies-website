import { Suspense, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ScrollProgress } from '@/components/ScrollProgress'
import { MobileContactBar } from '@/components/MobileContactBar'
import { Header } from './Header'
import { Footer } from './Footer'

/** App shell: skip link, header, focus-managed main, footer. */
export function RootLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  // On route change: scroll to top and move focus to <main> for screen-reader users.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    mainRef.current?.focus()
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-neutral-900 focus:px-4 focus:py-2 focus:text-sm focus:text-neutral-50"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Header />

      <main id="main" ref={mainRef} tabIndex={-1} className="flex-1 focus:outline-none">
        <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <MobileContactBar />
    </div>
  )
}
