import { Helmet } from 'react-helmet-async'
import { canonical, fullTitle } from '@/lib/seo'

interface SeoProps {
  title: string
  description: string
  path: string
  /** Use this exact <title> instead of the "Title — Brand" pattern. */
  titleOverride?: string
  /** Optional JSON-LD object(s) to inject for this page. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/** Per-page meta + canonical + OG/Twitter overrides (static defaults live in index.html). */
export function Seo({ title, description, path, titleOverride, jsonLd }: SeoProps) {
  const titleText = titleOverride ?? fullTitle(title)
  const url = canonical(path)
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

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  )
}
