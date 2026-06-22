import { Helmet } from 'react-helmet-async'
import { siteConfig } from '@/lib/siteConfig'
import { Seo } from '@/components/Seo'
import { Container } from '@/components/ui/Container'

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description={`Privacy policy for ${siteConfig.legalName}.`}
        path="/privacy"
      />
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="pb-20 pt-28 lg:pt-36">
        <Container className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900">Privacy Policy</h1>
          <p className="mt-4 text-sm text-neutral-500">Last updated: [FILL IN: date]</p>

          <div className="prose prose-neutral mt-8 max-w-none text-neutral-600">
            <p>
              <strong>[FILL IN — placeholder privacy policy.]</strong> This page describes how{' '}
              {siteConfig.legalName} collects and uses information submitted through this website.
              Replace this text with your real policy before launch (a lawyer or a reputable policy
              generator can help).
            </p>
            <h2>Information we collect</h2>
            <p>
              When you submit the contact form, we receive the name, email, company, and message you
              provide so we can respond to your inquiry.
            </p>
            <h2>How we use it</h2>
            <p>
              We use your details solely to respond to and follow up on your inquiry. We do not sell
              your information.
            </p>
            <h2>Contact</h2>
            <p>
              Questions about this policy? Email{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
