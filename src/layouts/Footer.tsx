import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { siteConfig } from '@/lib/siteConfig'
import { LogoWordmark } from '@/components/Logo'
import { Container } from '@/components/ui/Container'
import { RidgeDivider } from '@/components/RidgeDivider'

const footerLinkClass =
  'text-sm text-sage-300 transition-colors hover:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-summit-900 text-neutral-50">
      <RidgeDivider className="text-summit-900" />
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <LogoWordmark tone="light" />
            <p className="mt-4 max-w-xs text-sm text-sage-300">{siteConfig.tagline}</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-50">Services</h2>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.services.map((s) => (
                <li key={s.id}>
                  <Link to="/services" className={footerLinkClass}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-50">Company</h2>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.nav
                .filter((n) => n.to !== '/')
                .map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className={footerLinkClass}>
                      {n.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-50">Get in touch</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-sage-300">
              <li>
                <a href={`mailto:${siteConfig.email}`} className={cn(footerLinkClass, 'block')}>
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <Link to="/book" className={footerLinkClass}>
                  Book a call
                </Link>
              </li>
              <li>{siteConfig.serviceArea}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-summit-800 pt-6 text-sm text-sage-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link to="/privacy" className={footerLinkClass}>
              Privacy
            </Link>
            <Link to="/terms" className={footerLinkClass}>
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
