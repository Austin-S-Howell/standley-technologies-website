import { Helmet } from 'react-helmet-async'
import { siteConfig } from '@/lib/siteConfig'
import { Seo } from '@/components/Seo'
import { Container } from '@/components/ui/Container'

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Service"
        description={`Terms of service for ${siteConfig.legalName}.`}
        path="/terms"
      />
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="pb-20 pt-28 lg:pt-36">
        <Container className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-neutral-500">Last updated: [FILL IN: date]</p>

          <div className="prose prose-neutral mt-8 max-w-none text-neutral-600">
            <p>
              <strong>[FILL IN — placeholder terms of service.]</strong> These terms govern your use
              of the {siteConfig.legalName} website. Replace this text with your real terms before
              launch.
            </p>
            <h2>Use of this site</h2>
            <p>
              This website is provided for informational purposes about our services. Content may
              change without notice.
            </p>
            <h2>Contact</h2>
            <p>
              Questions about these terms? Email{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
