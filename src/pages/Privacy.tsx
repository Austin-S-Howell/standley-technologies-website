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
          <p className="mt-4 text-sm text-neutral-500">Last updated: June 23, 2026</p>

          <div className="prose prose-neutral mt-8 max-w-none text-neutral-600">
            <p>
              {siteConfig.legalName} (“we,” “us,” or “our”) respects your privacy. This Privacy
              Policy explains what information we collect through this website, how we use it, and
              the choices you have. By using this site or contacting us through it, you agree to the
              practices described here.
            </p>

            <h2>Information we collect</h2>
            <p>
              <strong>Information you provide.</strong> When you submit our contact form, we collect
              the name, email address, company (optional), the service you’re interested in, and any
              details you include in your message. If you email or call us directly, we receive
              whatever information you choose to share.
            </p>
            <p>
              <strong>Information collected automatically.</strong> Like most websites, our hosting
              and content-delivery providers may automatically log basic technical information — such
              as your IP address, browser type, and the pages you visit — for security, reliability,
              and abuse prevention. We do not use advertising or analytics tracking cookies.
            </p>

            <h2>How we use your information</h2>
            <p>We use the information you provide to:</p>
            <ul>
              <li>respond to your inquiry and provide the information or services you request;</li>
              <li>follow up about a potential or ongoing project;</li>
              <li>operate, maintain, and secure this website; and</li>
              <li>comply with our legal obligations.</li>
            </ul>
            <p>We do not sell or rent your personal information.</p>

            <h2>How we share information</h2>
            <p>
              We share information only with service providers that help us run this site and respond
              to you — for example, our form-delivery provider (Web3Forms) and our website hosting and
              DNS/CDN providers (GitHub Pages and Cloudflare). These providers process information on
              our behalf and are not permitted to use it for their own purposes. We may also disclose
              information when required by law or to protect our rights.
            </p>

            <h2>Cookies</h2>
            <p>
              We do not use tracking or advertising cookies on this site. Our infrastructure
              providers may set limited cookies that are necessary for security and to deliver the
              site reliably.
            </p>

            <h2>Data retention</h2>
            <p>
              We keep contact submissions only as long as needed to respond to your inquiry and
              maintain our business records, and then delete them when they are no longer needed. You
              can ask us to delete your information at any time.
            </p>

            <h2>Your choices and rights</h2>
            <p>
              You may request access to, correction of, or deletion of the personal information
              you’ve shared with us. To make a request, email us at{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. Depending on where you
              live, you may have additional rights under applicable privacy laws.
            </p>

            <h2>Data security</h2>
            <p>
              We take reasonable measures to protect the information you share with us. However, no
              method of transmission or storage is completely secure, and we cannot guarantee
              absolute security.
            </p>

            <h2>Children’s privacy</h2>
            <p>
              This site is intended for businesses and is not directed to children under 13, and we
              do not knowingly collect personal information from them.
            </p>

            <h2>Links to other sites</h2>
            <p>
              Our site may link to third-party websites. We are not responsible for the privacy
              practices of those sites and encourage you to review their policies.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we’ll revise the “Last
              updated” date above. Material changes will be reflected on this page.
            </p>

            <h2>Contact us</h2>
            <p>
              Questions about this policy or your information? Contact {siteConfig.legalName} at{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{' '}
              <a href={`tel:+1${siteConfig.phone.replace(/\D/g, '')}`}>{siteConfig.phone}</a>.
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
