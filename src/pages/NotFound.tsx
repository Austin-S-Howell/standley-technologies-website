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
        The page you’re looking for may have moved. Let’s get you back on the path.
      </p>
      <Link to="/" className={`mt-8 ${buttonClasses('primary', 'lg')}`}>
        Back to home
      </Link>
    </Container>
  )
}
