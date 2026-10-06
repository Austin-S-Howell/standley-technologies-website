import { defineConfig, type Plugin, type ResolvedConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import fs from 'node:fs'
import path from 'node:path'
import { pageMeta, fullTitle, canonical } from './src/lib/seo'
import { siteConfig } from './src/lib/siteConfig'

// Copy the built index.html → 404.html so GitHub Pages serves the SPA shell
// (with the original URL preserved) for deep links that don't have a prerendered
// file. Same approach used in the dynamic-robotics-website repo.
function spaFallback(): Plugin {
  let outDir = 'dist'
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    configResolved(config: ResolvedConfig) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const index = path.resolve(outDir, 'index.html')
      if (fs.existsSync(index)) {
        fs.copyFileSync(index, path.resolve(outDir, '404.html'))
      }
    },
  }
}

// ---------------------------------------------------------------------------
// Per-route head prerender
//
// This is a client-rendered SPA, so out of the box every URL ships index.html's
// generic <title>/description/canonical/OG tags — bad for search snippets and
// (since crawlers like Slack/Twitter/iMessage don't run JS) for link unfurls.
//
// At build time we emit one static .html per route — services.html, about.html,
// … — each a copy of the built index.html with that page's real <head> baked in
// (matching what <Seo>/react-helmet-async sets at runtime). GitHub Pages serves
// /services from services.html with no redirect, so the crawler-visible head is
// correct before any JS runs. The body still hydrates client-side as usual.
// ---------------------------------------------------------------------------
interface PrerenderRoute {
  file: string
  title: string
  description: string
  path: string
  noindex?: boolean
  /** Site-relative 1200×630 social card replacing the default og-image. */
  image?: string
  imageAlt?: string
}

const HOME_TITLE = `${siteConfig.legalName} — Custom Software, Cloud & IT Consulting`

const prerenderRoutes: PrerenderRoute[] = [
  { file: 'index.html', title: HOME_TITLE, description: pageMeta.home.description, path: '/' },
  {
    file: 'services.html',
    title: fullTitle(pageMeta.services.title),
    description: pageMeta.services.description,
    path: '/services',
  },
  {
    file: 'demos.html',
    title: fullTitle(pageMeta.demos.title),
    description: pageMeta.demos.description,
    path: '/demos',
  },
  {
    file: 'about.html',
    title: fullTitle(pageMeta.about.title),
    description: pageMeta.about.description,
    path: '/about',
  },
  {
    file: 'contact.html',
    title: fullTitle(pageMeta.contact.title),
    description: pageMeta.contact.description,
    path: '/contact',
  },
  {
    file: 'apollo.html',
    title: fullTitle(pageMeta.apollo.title),
    description: pageMeta.apollo.description,
    path: '/apollo',
    image: pageMeta.apollo.image,
    imageAlt: pageMeta.apollo.imageAlt,
  },
  {
    file: 'downloads.html',
    title: fullTitle(pageMeta.downloads.title),
    description: pageMeta.downloads.description,
    path: '/downloads',
  },
  {
    file: 'privacy.html',
    title: fullTitle('Privacy Policy'),
    description: `Privacy policy for ${siteConfig.legalName}.`,
    path: '/privacy',
    noindex: true,
  },
  {
    file: 'terms.html',
    title: fullTitle('Terms of Service'),
    description: `Terms of service for ${siteConfig.legalName}.`,
    path: '/terms',
    noindex: true,
  },
]

const escAttr = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const escText = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function applyHead(template: string, r: PrerenderRoute): string {
  const url = canonical(r.path)
  // Drop the generic per-page tags from the template; keep the shared ones
  // (og:image, og:type, twitter:card, JSON-LD, …) — unless the route brings
  // its own social card, in which case the image + alt tags go too (the
  // og:image:width/height stay: every card is 1200×630).
  let stripped = template
    .replace(/\s*<title>[\s\S]*?<\/title>/i, '')
    .replace(/\s*<meta[^>]*\sname=["']description["'][^>]*>/i, '')
    .replace(/\s*<link[^>]*\srel=["']canonical["'][^>]*>/i, '')
    .replace(/\s*<meta[^>]*\sproperty=["']og:(?:title|description|url)["'][^>]*>/gi, '')
    .replace(/\s*<meta[^>]*\sname=["']twitter:(?:title|description)["'][^>]*>/gi, '')
  if (r.image) {
    stripped = stripped
      .replace(/\s*<meta[^>]*\sproperty=["']og:image(?::alt)?["'][^>]*>/gi, '')
      .replace(/\s*<meta[^>]*\sname=["']twitter:image(?::alt)?["'][^>]*>/gi, '')
  }

  const t = escAttr(r.title)
  const d = escAttr(r.description)
  const u = escAttr(url)
  const img = r.image ? escAttr(`${siteConfig.url}${r.image}`) : ''
  const imgAlt = escAttr(r.imageAlt ?? r.title)
  const tags = [
    `<title>${escText(r.title)}</title>`,
    `<meta name="description" content="${d}" />`,
    `<link rel="canonical" href="${u}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${u}" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    ...(r.image
      ? [
          `<meta property="og:image" content="${img}" />`,
          `<meta property="og:image:alt" content="${imgAlt}" />`,
          `<meta name="twitter:image" content="${img}" />`,
          `<meta name="twitter:image:alt" content="${imgAlt}" />`,
        ]
      : []),
    ...(r.noindex ? ['<meta name="robots" content="noindex" />'] : []),
  ].join('\n    ')

  return stripped.replace('</head>', `    ${tags}\n  </head>`)
}

function prerenderHead(): Plugin {
  let outDir = 'dist'
  return {
    name: 'prerender-route-head',
    apply: 'build',
    configResolved(config: ResolvedConfig) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const indexPath = path.resolve(outDir, 'index.html')
      if (!fs.existsSync(indexPath)) return
      const template = fs.readFileSync(indexPath, 'utf8')
      for (const r of prerenderRoutes) {
        fs.writeFileSync(path.resolve(outDir, r.file), applyHead(template, r))
      }
    },
  }
}

export default defineConfig({
  // Custom apex domain (standleytechnologies.com) → served from root.
  base: '/',
  // Order matters: spaFallback snapshots the SPA shell into 404.html, then
  // prerenderHead bakes per-route heads (including the home page's index.html).
  plugins: [react(), tsconfigPaths(), spaFallback(), prerenderHead()],
})
