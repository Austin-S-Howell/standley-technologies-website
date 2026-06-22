<p align="center">
  <img src="src/assets/logo/circle-mark-512.png" alt="Standley Technologies LLC" width="128" />
</p>

<h1 align="center">Standley Technologies LLC</h1>

<p align="center"><em>Engineering that reaches the summit.</em></p>

<p align="center">
  Custom software · Cloud infrastructure &amp; security · IT consulting &amp; managed services
</p>

---

## About this site

This is the marketing website for **Standley Technologies LLC**, a technology services
company. It's a fast, modern single-page app that introduces the business, shows what we
build through **live interactive demos**, and makes it easy to get in touch or book a call.

The design language is built around the **summit / mountain** brand mark — a calm
**sage-green, gold, and white** palette with subtle motion, and a blurred mountain hero
backdrop with drifting "shiny" glows.

### What's on it

| Page | What it does |
|---|---|
| **Home** | Centered hero on a mountain backdrop, a live dashboard demo, animated stats, services, and a demos showcase. |
| **Services** | The three pillars in detail — Custom Software &amp; App Development, Cloud Infrastructure &amp; Security, and IT Consulting &amp; Managed Services. |
| **Demos** | Four interactive, animated demos of real-world work (see below). |
| **About** | Story, values, what sets the company apart, founder, and service area. |
| **Contact** | A split-card contact form that opens the visitor's email app, plus FAQ. |
| **Book** | A built-in calendar + time picker that emails a call request. |

### Interactive demos

All demos are self-contained, animated, and respect reduced-motion — no chart libraries,
just SVG + React:

- **Analytics dashboard** — an app shell with live KPIs, charts, a donut, and an orders table.
- **Client portal with embedded Power BI** — KPI cards and a mocked Power BI report (slicers, charts, page bar).
- **Cloud infrastructure** — an architecture topology with live auto-scaling and a security panel (threats blocked, encryption, compliance).
- **Live monitoring** — uptime, a service status list, a live latency chart, and resource gauges.

### Get in touch, no backend

Both the **contact form** and the **booking calendar** open the visitor's email app via
`mailto:` with the details pre-filled — so they work on Windows, macOS, iOS, and Android
with **no server, API keys, or third-party services**. Just set the recipient in
`src/lib/siteConfig.ts`.

---

## Tech stack

- **Vite + React 18 + TypeScript** — single-page app (`base: '/'` for the custom domain)
- **Tailwind CSS** — brand token system (sage / summit / gold / neutral) in `tailwind.config.js`
- **Fonts** — self-hosted Inter Variable (body) + Space Grotesk Variable (display)
- **Routing** — react-router-dom · **SEO** — react-helmet-async + static defaults in `index.html`
- **Motion** — Framer Motion via `LazyMotion` (small bundle)
- **Deep links** — the `spa-404-fallback` plugin in `vite.config.ts` copies `index.html` → `404.html`

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build to dist/ (also writes dist/404.html)
npm run preview  # preview the production build
npm run lint     # eslint
npm run format   # prettier --write
```

## Editing content

Nearly all copy lives in one place — **`src/lib/siteConfig.ts`** (services, process, values,
differentiators, tech stack, FAQs, founder, contact email, and service area). Update it there
and it flows through every page.

## Deployment

Push to `main` → `.github/workflows/deploy.yml` builds and deploys to **GitHub Pages**.
In the repo, set **Settings → Pages → Source = GitHub Actions**. No secrets required.

**Custom domain:** `public/CNAME` holds the domain; point **Cloudflare** DNS at GitHub Pages
(apex `A`/`AAAA` records + `www` `CNAME`), set Cloudflare **SSL/TLS = Full**, and enable
**Enforce HTTPS** in Pages settings. See §5.8 of [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md).

## ⚠️ Before launch — replace placeholders

- **Domain:** currently the placeholder **`standleytech.com`**. If your real domain differs,
  update it in `public/CNAME`, `public/robots.txt`, `public/sitemap.xml`, `index.html`
  (canonical + OG tags + JSON-LD), and `src/lib/siteConfig.ts`.
- **Content:** anything marked `[FILL IN]` in `src/lib/siteConfig.ts` (real email, founder
  details, founding year, certifications) and a real 1200×630 social card at `public/og-image.png`.

> The full build plan and design system live in [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md).
