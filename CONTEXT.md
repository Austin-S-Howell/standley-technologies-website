# Project Context — Standley Technologies LLC Website

> A living "what's actually here right now" doc. Pairs with [`README.md`](./README.md)
> (getting started). Update this as the site evolves.

_Last updated: 2026-06-28._

---

## 1. What this is

The marketing website for **Standley Technologies LLC**, a technology services company.
It's a single-page app (SPA) that introduces the business, demonstrates capability through
**live interactive demos**, and converts via a **contact form** that delivers straight to the
inbox via **Web3Forms** (no backend of our own; just a client-side POST to a form-to-email relay).

**Tagline:** _Engineering that reaches the summit._

**Four service pillars:**
1. **Custom Software & App Development**
2. **Cloud Infrastructure & Security** (focus: security + scalability)
3. **IT Consulting & Managed Services**
4. **Private Local LLM Setup & Integrations** (self-hosted AI; data never leaves your network)

**Service area:** nationwide — in person and remotely.

---

## 2. Status

Build-complete and ready to launch once content + domain are finalized.

- ✅ Full site built: pages, brand/design system, demos, contact form, SEO, scroll interactions
- ✅ `npm run build` (tsc + vite) and `npm run lint` are clean; all routes serve
- ⛔ Not yet committed/pushed or deployed
- ⛔ A couple of optional placeholders left — social links, certifications (see §9)

---

## 3. Tech stack

| Concern | Choice |
|---|---|
| Build / framework | **Vite 5 + React 18 + TypeScript** (strict), SPA, `base: '/'` |
| Styling | **Tailwind CSS** with custom brand tokens (`tailwind.config.js`) |
| Routing | **react-router-dom v6** (lazy routes in `src/routes.tsx`) |
| SEO / meta | **react-helmet-async** per page + static defaults in `index.html` |
| Motion | **Framer Motion** via `LazyMotion` + `domAnimation` (small bundle; use `m.*`, not `motion.*`) |
| Fonts | self-hosted **Inter Variable** (body) + **Space Grotesk Variable** (display), `wght` axis only |
| Forms / validation | react-hook-form + zod (contact form); **Web3Forms** form-to-email for delivery |
| Hosting | **GitHub Pages** via Actions; **Cloudflare** DNS |
| Lint/format | ESLint (flat config, `eslint.config.js`) + Prettier |

No chart libraries, no UI kit — demos/charts are hand-built SVG + CSS.

---

## 4. Brand & design system

- **Colors** (Tailwind families in `tailwind.config.js`):
  - `sage` — muted grey-green, the calm primary UI ground
  - `summit` — deep forest green (500–950), accent text/icons + dark panels (`summit-900/950`)
  - `gold` — premium accent (`gold-500` CTAs; use sparingly; `gold-700`+ for readable gold text)
  - `neutral` — slate-tinted greys (`neutral-0` = white … `neutral-900` headings)
  - semantic: `success`, `error`, `warning`, `info`
  - Functional CSS vars + reduced-motion guard live in `src/styles/index.css`
- **Type:** Space Grotesk (display/headings, `font-display`) + Inter (body).
- **Motif:** the **mountain / summit** mark. Used tastefully — `MountainBackdrop` (blurry sage
  hero scene with drifting gold glows), `RidgeDivider`, `PeakTransition`, `SummitLine`.
- **Logo:** circle mark `src/assets/logo/circle-mark-512.png` / `circle-mark-1024.png` (used in the
  header/footer via `Logo`); favicons (`.ico` + PNGs) in `public/` are generated from it. The **home
  hero** uses the full stacked lockup (mark + wordmark) at `public/standley-logo-stacked.png`
  (background made transparent so it sits on the `MountainBackdrop`).
- **Voice:** professional, honest, plain-English. No fabricated stats/claims.

---

## 5. Project structure

```
src/
├─ main.tsx                 # entry: HelmetProvider + Router + LazyMotion + fonts
├─ App.tsx                  # useRoutes(routes)
├─ routes.tsx               # lazy route config under RootLayout
├─ assets/logo/             # logo PNGs
├─ components/
│  ├─ ui/                   # Button, Card, Badge, Container, Eyebrow, SectionHeading, StatBlock, Input, Textarea
│  ├─ Logo.tsx              # Logo + LogoWordmark (shows siteConfig.name)
│  ├─ Seo.tsx               # per-page meta (supports titleOverride)
│  ├─ Reveal.tsx            # scroll reveal (direction: up/down/left/right/scale/none)
│  ├─ Stagger.tsx           # StaggerGroup + StaggerItem (cascade children in)
│  ├─ Parallax.tsx          # scroll y-drift wrapper
│  ├─ ScrollProgress.tsx    # top progress bar
│  ├─ MountainBackdrop.tsx  # hero background (parallax + drifting glows)
│  ├─ SummitLine/RidgeDivider/PeakTransition.tsx   # motif SVGs
│  └─ demos/                # the interactive demos (see §7)
├─ hooks/                   # useScrollHeader, useFocusTrap, useReducedMotionPref, useCountUp, useLiveSeries
├─ layouts/                 # RootLayout, Header (centered pill nav), Footer, MobileMenu
├─ lib/
│  ├─ siteConfig.ts         # ★ single source of editable content (see §8)
│  ├─ seo.ts                # pageMeta + canonical/title helpers + Organization JSON-LD
│  ├─ contactSchema.ts      # zod schema + service options for the contact form
│  ├─ motion.ts             # shared Framer variants
│  └─ cn.ts                 # classname joiner
├─ pages/                   # Home, Services, Work (=/demos), About, Contact, Privacy, Terms, NotFound
├─ sections/                # PageHero, CtaBand, ProcessSteps, Faq, TechBadges, contact/ContactForm
└─ styles/index.css         # Tailwind + tokens + reduced-motion guard

public/   # CNAME, robots.txt, sitemap.xml, site.webmanifest, favicon.ico + icon PNGs, og-image.png
.github/workflows/deploy.yml   # GitHub Pages deploy
vite.config.ts                 # base:'/', react, tsconfig-paths, spa-404-fallback, image-optimizer
```

---

## 6. Pages & routes

| Route | File | Notes |
|---|---|---|
| `/` | `pages/Home.tsx` | Centered hero on `MountainBackdrop`, big logo, floating dashboard demo, stats, services, demos showcase |
| `/services` | `pages/Services.tsx` | Sticky pillar nav + 4 detailed pillars + process + CTA; Service JSON-LD |
| `/demos` | `pages/Work.tsx` | The 5 interactive demos |
| `/about` | `pages/About.tsx` | Compact card grid: intro, founder card + values/why-us, service area |
| `/contact` | `pages/Contact.tsx` | Split card (dark info panel + form) + FAQ (FAQPage JSON-LD) |
| `/privacy`, `/terms` | placeholder legal pages (noindex) |
| `*` | `pages/NotFound.tsx` | 404 |

**Nav** (centered pill in the header): Home · Services · Demos · About · Contact.
CTAs across the site (the CTA band on every page, the footer) point to **Contact** — the single intake.
**Achievements page was removed** (was at `/achievements`); the **book-a-call calendar was removed** in favor of the contact form.

---

## 7. Key features & how they work

### Contact form (`sections/contact/ContactForm.tsx`)
- react-hook-form + zod validation, honeypot, `?service=` prefill from per-pillar CTAs.
- **On submit it POSTs to Web3Forms** (`https://api.web3forms.com/submit`) using the access key in
  `siteConfig.web3formsAccessKey`; the message is delivered straight to `siteConfig.email` (with
  `replyto` set to the sender). Shows submitting / success / error states, with a `mailto:` fallback on error.
- **No backend of our own** — Web3Forms is the form-to-email relay; the access key is public/send-only.

### Interactive demos (`components/demos/`)
All self-contained, animated, reduced-motion-aware (SVG + CSS, no chart libs). Built on shared
primitives `BrowserFrame` (window chrome) + `Sparkline`, and hooks `useCountUp` (IntersectionObserver)
and `useLiveSeries` (interval random-walk, frozen under reduced-motion).
1. **AnalyticsDashboardDemo** — SaaS dashboard: sidebar, KPI cards, live revenue chart, donut, orders table.
2. **PowerBiPortalDemo** — client portal: KPI cards + a mocked **embedded Power BI report** (slicers, column chart, donut, live trend, Power BI badge + page bar).
3. **CloudInfraDemo** — cloud infra: architecture topology with live auto-scaling + a security panel (threats blocked, encryption, compliance) → security & scalability.
4. **UptimeMonitorDemo** — monitoring: uptime, service status list (one "Degraded"), live latency chart, CPU/Mem/Disk gauges, events feed.
5. **LocalLlmDemo** — private/on-prem LLM console: a streaming chat answer grounded in RAG sources, tokens/sec + GPU/VRAM gauges, and "0 external calls / data stays on your network" framing.

### Scroll interactions (the "cool" layer)
Reusable, reduced-motion-safe primitives, applied across every page:
- `ScrollProgress` — top gradient bar (in `RootLayout`).
- `Reveal direction="up|down|left|right|scale|none"` — fade/slide in on scroll.
- `StaggerGroup` + `StaggerItem` — cascade grid/list children in.
- `Parallax speed={n}` — vertical drift on scroll (depth).
- `MountainBackdrop` glows + ridges parallax and fade as you scroll past the hero.

### Header (`layouts/Header.tsx`)
Centered "pill" nav (CSS `grid-cols-[1fr_auto_1fr]`) with a **sliding sage highlight** that follows
hover and rests on the active route (measured via link refs + CSS transition). Transparent over the
hero, solid on scroll. Focus-trapped `MobileMenu` on small screens.

---

## 8. Editing content — `src/lib/siteConfig.ts`

**Almost all copy lives here** and flows through every page: `name`/`legalName` (both
"Standley Technologies LLC"), `email`, `serviceArea`, `responseTime`, `nav`, the 3 `services`
(with `includes`/`deliverables`/`tech`/`whoFor`/`outcome`), `process`, `values`, `differentiators`,
`techStack`, `faqs`, `founder`. Page `<title>`/meta live in `src/lib/seo.ts`.

> Some now-unused fields (`stats`, `certifications`, `caseStudies`, `testimonials`) remain in
> siteConfig from the removed Achievements page — harmless, kept for possible reuse.

---

## 9. Before launch — placeholders & TODO

- **Domain:** **`standleytechnologies.com`** (the real domain) is wired in `public/CNAME`, `public/robots.txt`,
  `public/sitemap.xml`, `index.html` (canonical/OG/JSON-LD), `.env.example`, and `siteConfig.ts`.
- **Email:** **`austin@standleytechnologies.com`** + **phone** `(479) 274-8177` are set (siteConfig + JSON-LD). Founder (Austin Howell) name/photo/bio are filled.
- **Privacy Policy & Terms of Service** are written (generic templates; worth an attorney glance). Terms uses **Arkansas** governing law — confirm the LLC's registered state.
- **`public/og-image.png`** is a real 1200×630 branded social-share card (logo + wordmark + tagline on the summit gradient).
- **Security headers:** apply the edge headers documented in [`docs/security-headers.md`](./docs/security-headers.md) in the Cloudflare dashboard (GitHub Pages can't set HTTP headers). The in-app `referrer` meta is already shipped; the rest (CSP, HSTS, …) must be added at Cloudflare.
- **Still to fill (optional / non-blocking):** `social.linkedin`/`social.github` (empty → omitted from JSON-LD `sameAs`); `certifications` (3 marked `in-progress`, currently **not rendered** anywhere).
- **Optional/nice-to-have** (discussed, not built): testimonials/case studies, blog, analytics
  (Cloudflare Web Analytics), a real Lighthouse/axe pass in a browser.
- **Known:** 1 dev-only esbuild/vite `npm audit` advisory — production-safe; do **not** force-fix
  (it pulls a breaking Vite 8).

---

## 10. Deployment

Deploys are **manual** (not on push): from the repo's **Actions** tab, open **Deploy to GitHub
Pages** → **Run workflow** (on `main`). `.github/workflows/deploy.yml` then builds and deploys to
**GitHub Pages** (set **Settings → Pages → Source = GitHub Actions**; no secrets needed). Deep links
work via the `spa-404-fallback` plugin (`vite.config.ts` copies `dist/index.html` → `dist/404.html`).

**Cloudflare DNS** (custom domain in `public/CNAME`): apex `A`/`AAAA` → GitHub Pages IPs, `www`
`CNAME` → `<user>.github.io`; **SSL/TLS = Full** (not Flexible → redirect loop); keep records
DNS-only until the cert issues; **Enforce HTTPS** in Pages.

---

## 11. Commands

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc --noEmit && vite build  (emits dist/ + dist/404.html)
npm run preview
npm run lint
npm run format
```

---

## 12. Conventions & gotchas

- **Motion:** use `m.*` (LazyMotion) — never `motion.*`. `useScroll`/`useTransform`/`useSpring`
  and MotionValue `style` binding work under `domAnimation`; layout/drag features do **not**.
- **Strict TS:** `noUncheckedIndexedAccess` (guard `arr[i]` with `?? fallback`), `noUnusedLocals`/
  `noUnusedParameters` (no unused imports/vars; prefix intentionally-unused params with `_`).
- **Reduced motion:** every animation must no-op under `prefers-reduced-motion` (the shared
  primitives + the global CSS guard handle this; demos gate intervals via `useReducedMotionPref`).
- **Brand colors only** — stick to the sage/summit/gold/neutral + semantic families.
- **Honesty** — no fabricated metrics/testimonials/logos; mark placeholders `[FILL IN]`.
- **Deploy stays simple** — reuse the existing `deploy.yml` + `spa-404-fallback`; don't add
  heavy tooling or a backend. Forms intentionally use **Web3Forms** (a client-side form-to-email
  relay) rather than a server; the access key lives in `siteConfig.web3formsAccessKey`.

---

## 13. Changelog

Newest first. Add a one-line entry whenever something notable changes (and bump _Last updated_ at the top).

### 2026-06-28
- **Mobile header + overflow fixes** — the header was a 3-column grid (`[1fr_auto_1fr]`); on mobile the hidden center nav broke grid auto-placement and pushed the hamburger into the **middle**. Switched the header to `flex justify-between` on mobile (logo left, menu right) and only `lg:grid` for the centered desktop nav. Also killed a **16px horizontal scroll** on `/`, `/services`, `/demos` caused by `Reveal`'s slide-in (`x: ±36`) animations sticking past the viewport — added `overflow-x-clip` to the layout shell (clips the overhang without creating a scroll container, so the sticky header/pillar nav keep working). Audited every route at 320/360/390px → **0px overflow everywhere**.
- **Per-route head prerender (SEO/social)** — a new `prerender-route-head` Vite plugin (in `vite.config.ts`) emits a static `.html` per route (`services.html`, `about.html`, …), each a copy of the built `index.html` with that page's real `<title>`/description/canonical/OG/Twitter baked in (privacy + terms also get `noindex`). GitHub Pages serves `/services` from `services.html` with no redirect, so crawlers and non-JS link unfurlers (Slack, iMessage, …) see correct per-page metadata before any JS runs. No new deps, no CI change. (Body is still client-rendered; full-body SSG remains a possible future step.)
- **Demos are lazy-loaded + viewport-gated** — each demo is now its own `React.lazy` chunk, mounted only once it scrolls near view via a new `InView` gate + `DeferredDemo`/`DemoSkeleton`. Cut the `/demos` page chunk from ~18 KB → ~5 KB and stopped off-screen demo timers from running. (#12)
- **Mobile sticky contact bar** — `MobileContactBar` (call + "Get in touch"), slides up after scrolling, hidden on `/contact`; footer gets bottom clearance on mobile so it's never covered. (#7)
- **Logos → WebP** — hero stacked logo (85 KB → 28 KB, served via `<picture>` with a PNG fallback + WebP preload) and the header/footer circle mark (49 KB → 26 KB). (#11)
- **Security headers** — added `<meta name="referrer">` in `index.html`; documented the full edge header set (HSTS, CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, …) for Cloudflare in [`docs/security-headers.md`](./docs/security-headers.md), since GitHub Pages can't emit headers. (#21)
- **Contact form dropped `zod`** — validation moved to react-hook-form's native rules; removed `zod` + `@hookform/resolvers`, cutting the Contact page chunk ~96 KB → ~40 KB. (#4)
- **FAQ on Home** — reused the `<Faq>` accordion (5 Qs) above the CTA band. (#9)
- **A11y contrast** — added `success-700`/`warning-700` tokens + used `gold-800`; darkened demo status text + the `ProcessSteps` step labels to pass WCAG AA. (#13)
- **Focus restore** — `useFocusTrap` now returns focus to the trigger (e.g. the menu button) when the mobile menu closes. (#20)
- **Dead-code + sitemap** — deleted unused `Badge`/`StatBlock`/`PeakTransition` components and the never-used `Button` function (kept `buttonClasses`); added `<lastmod>` to every `sitemap.xml` URL. (#17, #22)

### 2026-06-23
- **Domain finalized → `standleytechnologies.com`** (replaced the `standleytech.com` placeholder repo-wide: CNAME, robots, sitemap, `index.html` canonical/OG/JSON-LD, `.env.example`, siteConfig). Contact email set to **`austin@standleytechnologies.com`**.
- **Forms are now real** — the contact form and the book-a-call form **POST to Web3Forms** (delivered straight to the inbox) instead of opening a `mailto:`; both show submitting / success / error states (with a `mailto:` fallback), and booking now collects **name + email**. Key in `siteConfig.web3formsAccessKey`.
- Added a **4th service pillar — Private Local LLM Setup & Integrations** (self-hosted AI / RAG; data stays on your network), wired through `siteConfig`, `contactSchema`, Home + Services, and Service JSON-LD.
- Added a **5th interactive demo — `LocalLlmDemo`** (streaming private-LLM console with RAG sources + GPU/VRAM gauges); featured on Home and listed on `/demos`.
- **Founder is real:** Austin Howell wired onto the About page with `public/austin-headshot.jpg` (`siteConfig.founder` now has `name`/`photo`/`bio`).
- **Service area** → "Serving nationwide, in person and remotely." (was "the Midwest").
- **About page reworked** — tightened the copy (concise intro + plain-English hero) and switched to a **compact card-grid layout**: Austin's founder card beside a "How we work" + "Why work with us" grid, then the service-area strip.
- **Phone number** added — `(479) 274-8177` (`siteConfig.phone`), shown on the Contact info panel + footer with `tel:` links and in the Organization JSON-LD.
- **Response time** widened to **"1–3 business days"** (was "one business day"), across `siteConfig` + the form copy.
- **Book-a-call calendar removed** — consolidated to the single contact form. Deleted `/book`, `pages/Book.tsx`, `sections/book/BookingRequest.tsx`, and the "Book a call" CTAs (CTA band, footer, Contact panel); dropped from routes, sitemap, and `pageMeta`.
- **Privacy Policy & Terms of Service filled in** — replaced both placeholders with complete generic templates (Privacy: Web3Forms intake, GitHub Pages/Cloudflare hosting, no tracking cookies, data rights/retention; Terms: use-of-site, IP, disclaimer, liability, Arkansas governing law).
- **Branded og-image** — replaced the placeholder `public/og-image.png` with a real 1200×630 social-share card (summit logo + "Standley Technologies LLC" + tagline + URL on the brand gradient), generated with ImageMagick.
- **Contact form polish** — removed the consent checkbox; nicer success card (centered, check badge, email + phone links); the Web3Forms subject now includes the sender's name and omits empty fields.
- **Ship-readiness pass** — ran a final adversarial review (0 blockers) and applied the polish it found: optimized the founder headshot (985 KB PNG → **8 KB** 256² JPG, with `width`/`height` to prevent layout shift), re-exported the og-image as 8-bit (700 KB → **106 KB**), added the 4th pillar to the Services SEO description, switched the Terms→Privacy link to a react-router `<Link>`, and trimmed unused env-var docs (`.env.example` / `vite-env.d.ts`).
- **Pages deploy is now manual** — `deploy.yml` triggers only on `workflow_dispatch` (Actions tab → Run workflow), not automatically on push to `main`.
- **Home hero logo** — swapped the circle mark for the official **stacked lockup** (`public/standley-logo-stacked.png`, with the company name); made its background transparent + downscaled to 800px so it sits cleanly on the `MountainBackdrop`.
- **Mobile checked** — verified all pages at 390px: zero horizontal overflow, all 5 demos render, layouts stack cleanly (no fixes needed).
- **Audit quick-win batch:** added the 4th pillar (private on-prem AI) to the hero subtitle + `siteConfig.description` + static meta; **preload** the hero logo (LCP) in `index.html`; `role="alert"` on `Input`/`Textarea` errors; input-length **caps** in `contactSchema`; reframed Home stats honestly ("Code you own", "Automated monitoring"); **enriched the Organization JSON-LD** (telephone/founder/areaServed/address) + added a `WebSite` schema and removed the dead `seo.ts` `organizationJsonLd` export; **404 is now a wayfinding page**; deduped `serviceIcons` into `src/lib/serviceIcons.ts` and added `siteConfig.phoneHref` (replacing 5 copy-pasted `tel:` templates).

### 2026-06-21
- Added a **scroll-interaction system** (`ScrollProgress`, `Parallax`, directional `Reveal`, `StaggerGroup/Item`) and applied it across every page; `MountainBackdrop` glows + ridges now parallax/fade on scroll.
- Added **`CONTEXT.md`** (this doc) and rewrote **`README.md`** with the logo + a site explanation.
- **Book a call** = a built-in **calendar/time picker** (`BookingRequest`) that appends the chosen slot into a `mailto:` (no Calendly/Cal.com); added `/book` + surfaced in Contact panel, CTA band, footer.
- **Contact form** now opens the visitor's **email app via `mailto:`** (removed Web3Forms — no backend/keys).
- Added **`PowerBiPortalDemo`** (client portal with an embedded Power BI report + KPIs) as a 4th demo.
- Redesigned the **Contact page** (dark split-card); fixed the white heading; centered the Send button.
- **Centered, interactive pill nav** with a sliding highlight that follows hover / rests on the active route.
- Generated **`favicon.ico`** from the logo; home tab title is brand-first; company name shows **"Standley Technologies LLC"** everywhere.
- **Removed the Achievements page**; swapped the Cloud demo from a CI/CD pipeline to **`CloudInfraDemo`** (security + scalability) and reworded the cloud service.
- Detailed all original demos; **reworked Home** to be visual-first (centered hero on the sage `MountainBackdrop` with big logo + drifting gold glows; dashboard demo moved beneath the hero).
- Service area set to **"the Midwest"**.

### 2026-06-20
- **Phase 0** — scaffolded Vite + React + TS, Tailwind brand tokens, self-hosted fonts, `deploy.yml` + `spa-404-fallback` + `CNAME`.
- **Phase 1** — design system + layout shell (Header/Footer/MobileMenu), lazy router, 5 pages, `Seo`.
- **Phase 2** — real page content driven by `siteConfig.ts` (services, process, values, FAQs, …).
- **Phase 3** — contact form (originally Web3Forms) + Privacy/Terms placeholder pages.
- **Phase 4** — SEO/perf/a11y polish (LazyMotion bundle trim, fonts, contrast fixes, JSON-LD).
- Built the first three interactive demos; authored **`IMPLEMENTATION_PLAN.md`**.
