import { Helmet } from 'react-helmet-async'
import { canonical, fullTitle } from '@/lib/seo'
import { siteConfig } from '@/lib/siteConfig'

interface SeoProps {
  title: string
  description: string
  path: string
  /** Use this exact <title> instead of the "Title — Brand" pattern. */
  titleOverride?: string
  /** Site-relative 1200×630 social card for this page (default: og-image.png). */
  image?: string
  imageAlt?: string
  /** Optional JSON-LD object(s) to inject for this page. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/** Per-page meta + canonical + OG/Twitter overrides (static defaults live in index.html). */
export function Seo({
  title,
  description,
  path,
  titleOverride,
  image,
  imageAlt,
  jsonLd,
}: SeoProps) {
  const titleText = titleOverride ?? fullTitle(title)
  const url = canonical(path)
  const imageUrl = image ? `${siteConfig.url}${image}` : undefined
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Helmet>
      <title>{titleText}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={titleText} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />

      <meta name="twitter:title" content={titleText} />
      <meta name="twitter:description" content={description} />

      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageUrl && imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      {imageUrl && imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  )
}
