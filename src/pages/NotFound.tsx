import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { fullTitle } from '@/lib/seo'
import { Container } from '@/components/ui/Container'
import { buttonClasses } from '@/components/ui/Button'
import { SummitLine } from '@/components/SummitLine'

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <Helmet>
        <title>{fullTitle('Page not found')}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <SummitLine className="h-6 w-24 text-gold-500" />
      <p className="mt-6 font-display text-6xl font-semibold text-summit-700">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-neutral-900">This trail doesn’t exist</h1>
      <p className="mt-3 max-w-md text-neutral-600">
        The page you’re looking for may have moved. Here are some good places to pick up the trail:
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/" className={buttonClasses('primary', 'lg')}>
          Back to home
        </Link>
        <Link to="/services" className={buttonClasses('secondary', 'lg')}>
          Services
        </Link>
        <Link to="/demos" className={buttonClasses('secondary', 'lg')}>
          Demos
        </Link>
      </div>
      <p className="mt-6 text-sm text-neutral-500">
        Looking for something specific?{' '}
        <Link to="/contact" className="font-medium text-summit-700 underline underline-offset-2">
          Get in touch
        </Link>
        .
      </p>
    </Container>
  )
}
