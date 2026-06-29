import { Link } from 'react-router-dom'
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
          <p className="mt-4 text-sm text-neutral-500">Last updated: June 23, 2026</p>

          <div className="prose prose-neutral mt-8 max-w-none text-neutral-600">
            <p>
              These Terms of Service (“Terms”) govern your access to and use of the{' '}
              {siteConfig.legalName} (“we,” “us,” or “our”) website. By accessing or using this site,
              you agree to these Terms. If you do not agree, please do not use the site.
            </p>

            <h2>Use of this site</h2>
            <p>
              This website is provided for general informational purposes about our services. You
              agree to use it only for lawful purposes — and not to misuse it, disrupt its operation,
              attempt to gain unauthorized access, or use it in any way that could harm us or others.
            </p>

            <h2>Services</h2>
            <p>
              Any project, engagement, or services we provide are governed by a separate written
              agreement between you and {siteConfig.legalName}. Nothing on this site is an offer,
              contract, or guarantee of any specific result, and the content here does not by itself
              create a client relationship.
            </p>

            <h2>Intellectual property</h2>
            <p>
              Unless otherwise noted, the content on this site — including text, graphics, logos, the{' '}
              {siteConfig.name} name and mark, and overall design — is owned by or licensed to us and
              is protected by applicable intellectual-property laws. You may view and share the
              content for personal, non-commercial purposes, but you may not copy, reproduce, or use
              it commercially without our prior written permission.
            </p>

            <h2>Your submissions</h2>
            <p>
              When you contact us through the site, you are responsible for the accuracy of the
              information you provide and agree not to submit anything unlawful, infringing, or
              confidential that you do not want shared. We handle the information you send in
              accordance with our <Link to="/privacy">Privacy Policy</Link>.
            </p>

            <h2>Third-party links</h2>
            <p>
              This site may contain links to third-party websites or services that we do not control.
              We provide them for convenience only and are not responsible for their content,
              products, or practices.
            </p>

            <h2>Disclaimer</h2>
            <p>
              This site and its content are provided “as is” and “as available,” without warranties
              of any kind, whether express or implied, including fitness for a particular purpose,
              accuracy, or availability. We do not warrant that the site will be uninterrupted,
              secure, or error-free, and content may change without notice.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, {siteConfig.legalName} will not be liable for
              any indirect, incidental, special, consequential, or punitive damages, or any loss
              arising from your use of (or inability to use) this site.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless {siteConfig.legalName} from any claims,
              damages, or expenses arising out of your misuse of this site or your violation of these
              Terms.
            </p>

            <h2>Governing law</h2>
            <p>
              These Terms are governed by the laws of the State of Arkansas, without regard to its
              conflict-of-laws principles.
            </p>

            <h2>Changes to these terms</h2>
            <p>
              We may update these Terms from time to time. When we do, we’ll revise the “Last
              updated” date above, and your continued use of the site means you accept the updated
              Terms.
            </p>

            <h2>Contact us</h2>
            <p>
              Questions about these Terms? Contact {siteConfig.legalName} at{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{' '}
              <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
