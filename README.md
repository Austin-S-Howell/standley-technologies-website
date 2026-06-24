<p align="center">
  <img src="src/assets/logo/circle-mark-512.png" alt="Standley Technologies LLC" width="128" />
</p>

<h1 align="center">Standley Technologies LLC</h1>

<p align="center"><em>Engineering that reaches the summit.</em></p>

<p align="center">
  Custom software · Cloud infrastructure &amp; security · IT consulting · Private local LLM
</p>

---

## About this site

This is the marketing website for **Standley Technologies LLC**, a technology services
company. It's a fast, modern single-page app that introduces the business, shows what we
build through **live interactive demos**, and makes it easy to get in touch.

The design language is built around the **summit / mountain** brand mark — a calm
**sage-green, gold, and white** palette with subtle motion, and a blurred mountain hero
backdrop with drifting "shiny" glows.

### What's on it

| Page | What it does |
|---|---|
| **Home** | Centered hero on a mountain backdrop, a live dashboard demo, animated stats, services, and a demos showcase. |
| **Services** | The four pillars in detail — Custom Software &amp; App Development, Cloud Infrastructure &amp; Security, IT Consulting &amp; Managed Services, and Private Local LLM Setup &amp; Integrations. |
| **Demos** | Five interactive, animated demos of real-world work (see below). |
| **About** | Story, values, what sets the company apart, founder, and service area. |
| **Contact** | A split-card contact form that sends straight to our inbox via Web3Forms, plus FAQ. |

### Interactive demos

All demos are self-contained, animated, and respect reduced-motion — no chart libraries,
just SVG + React:

- **Analytics dashboard** — an app shell with live KPIs, charts, a donut, and an orders table.
- **Client portal with embedded Power BI** — KPI cards and a mocked Power BI report (slicers, charts, page bar).
- **Cloud infrastructure** — an architecture topology with live auto-scaling and a security panel (threats blocked, encryption, compliance).
- **Live monitoring** — uptime, a service status list, a live latency chart, and resource gauges.
- **Private local LLM** — an on-prem LLM console: a streaming chat answer grounded in RAG sources, tokens/sec and GPU/VRAM gauges, and "0 external calls / data stays on your network" framing.

### Get in touch, no backend of our own

The **contact form** POSTs to **Web3Forms**
(`https://api.web3forms.com/submit`) and delivers straight to the inbox — no server to run, with
submitting / success / error states and a `mailto:` fallback on error. The recipient is
`siteConfig.email`; the Web3Forms access key lives in `siteConfig.web3formsAccessKey` (a public,
send-only key — rotate it free at [web3forms.com](https://web3forms.com)).

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

Deployment is **manual**: in the repo's **Actions** tab, run the **Deploy to GitHub Pages**
workflow (Run workflow). It builds and deploys to **GitHub Pages** — it does **not** deploy on push.
Set **Settings → Pages → Source = GitHub Actions**. No secrets required.

**Custom domain:** `public/CNAME` holds the domain; point **Cloudflare** DNS at GitHub Pages
(apex `A`/`AAAA` records + `www` `CNAME`), set Cloudflare **SSL/TLS = Full**, and enable
**Enforce HTTPS** in Pages settings.

## ⚠️ Before launch — replace placeholders

- **Domain:** **`standleytechnologies.com`** is wired in `public/CNAME`, `public/robots.txt`,
  `public/sitemap.xml`, `index.html` (canonical + OG tags + JSON-LD), and `src/lib/siteConfig.ts`.
- **Content (optional):** add `social` links and review the `certifications` list in
  `src/lib/siteConfig.ts`. The Privacy & Terms pages are generic templates — confirm the Terms
  governing-law state. The `public/og-image.png` social card is done.
