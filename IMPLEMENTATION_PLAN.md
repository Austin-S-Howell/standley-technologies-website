# Standley Technologies LLC — Website Implementation Plan

> **Version 1.0** · React + Vite SPA · "Summit" Design Language
> A single, authoritative build plan synthesized from the Information Architecture, Technical Architecture, Design System, and Content & SEO deliverables. A developer can execute this start to finish.

---

## Table of Contents

1. [Project Overview & Goals](#1-project-overview--goals)
2. [Brand & Design System](#2-brand--design-system)
3. [Information Architecture & Sitemap](#3-information-architecture--sitemap)
4. [Page-by-Page Specs](#4-page-by-page-specs)
5. [Technical Architecture](#5-technical-architecture)
6. [Content & SEO](#6-content--seo)
7. [Phased Implementation Roadmap](#7-phased-implementation-roadmap)
8. [Dependencies / Packages to Install](#8-dependencies--packages-to-install)
9. [Definition of Done & Launch Checklist](#9-definition-of-done--launch-checklist)
10. [Future Enhancements](#10-future-enhancements)

---

## 1. Project Overview & Goals

### 1.1 What we're building
A fast, modern, accessible **single-page application (SPA)** marketing website for **Standley Technologies LLC**, a technology services company with three core service pillars:

1. **Custom Software & App Development** — websites, web apps, mobile apps, bespoke software.
2. **Cloud & DevOps Engineering** — cloud migration (AWS/Azure/GCP), CI/CD, IaC, automation, reliability.
3. **IT Consulting & Managed Services** — advisory, managed IT, support, system administration, fractional CTO.

**Pages in scope:** Home, Services, About, Achievements, Contact (+ a 404 and placeholder Privacy/Terms routes).

**Brand:** A "summit/ascent" feeling — reaching the peak through reliable engineering — executed in a **modern + clean** style (generous whitespace, crisp type, subtle motion). The palette is **sage green, gold, white, grey**: sage is the calm ground, gold is the premium summit accent, deep "summit" green adds depth, grey carries body text.

**Logo:** A circular "summit mark" — gold double-ring, forest/emerald upper field, gold mountain peaks, white base. Source files (confirmed present, 512×512 and 1024×1024 RGBA PNG):
- `/Users/austinhowell/Documents/standley-technologies-website/circle-mark-512.png`
- `/Users/austinhowell/Documents/standley-technologies-website/circle-mark-1024.png`

### 1.2 Goals
- Communicate **what** (3 pillars), **for whom**, and **why trust us** within 5 seconds on the Home hero.
- Drive a clear conversion path to the **working, email-wired contact form**.
- Present **credible, fillable proof** for a brand-new business — no fabricated metrics, testimonials, or logos.
- Ship a site that looks **complete even in empty/partial content states**.

### 1.3 Success criteria
| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | 100 (WCAG 2.1 AA throughout) |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | ≥ 100 |
| Contact form | Delivers email reliably with anti-spam + success/error UX states |
| Crawlability | `sitemap.xml` + static OG/meta + Organization JSON-LD in `index.html`; per-page meta via helmet |
| Content honesty | Zero fabricated claims; all placeholders clearly marked & editable in one config file |
| Responsiveness | Fluid 320px → 1440px+, readable at 200% zoom, no horizontal scroll |

---

## 2. Brand & Design System

> **Design essence:** *the ascent.* Sage is the mountain, gold is the summit, white is the sky — and most of the screen stays calm neutral so the gold truly feels like reaching the peak. **80% neutral/sage surfaces, ~10% green, ~10% gold.**

### 2.1 Color tokens (final, canonical)

> **Conflict resolution:** The two expert palettes were merged into ONE canonical token set below (the Design System scale is authoritative; the Tech Architecture's shorthand `forest`/`ink`/`cloud` names are mapped onto it). Use these names everywhere.

#### Sage — primary UI green (muted grey-green, NOT raw emerald)
| Token | HEX | Usage |
|---|---|---|
| `sage-50` | `#F2F5F3` | Tinted/alternating section background |
| `sage-100` | `#E2EAE5` | Subtle surface, ghost-button hover fill |
| `sage-200` | `#C7D6CC` | Borders on sage surfaces, dividers |
| `sage-300` | `#A8BEAF` | Muted text on dark, muted icons |
| `sage-400` | `#90AA98` | Secondary green elements |
| `sage-500` | `#7C9885` | **Primary brand green** — secondary-button outline (large text/UI only) |
| `sage-600` | `#5F7E6B` | Hover for sage elements (large text/UI only) |
| `sage-700` | `#4A6555` | Strong green text on light |
| `sage-800` | `#374D41` | Heading green on light |
| `sage-900` | `#26352D` | Deepest sage text |

#### Summit — deep green / depth (logo-adjacent forest; used sparingly)
| Token | HEX | Usage |
|---|---|---|
| `summit-500` | `#3C7E5D` | Brighter emerald accent (rare, logo-true) |
| `summit-600` | `#327052` | Icon green, gradient stop |
| `summit-700` | `#2F6B4F` | Deep accent; green headings/links on white (AA, ~5.4:1) |
| `summit-800` | `#1F4D38` | Dark section surfaces |
| `summit-900` | `#163A2B` | Dark hero / footer background |
| `summit-950` | `#0E261C` | Deepest background, near-black green |

#### Gold — premium accent
| Token | HEX | Usage |
|---|---|---|
| `gold-50` | `#FAF6EA` | Faint gold wash, badge bg |
| `gold-100` | `#F3EACF` | Highlight band, accent fill |
| `gold-200` | `#E7D6A3` | Light gold border, focus-ring tint |
| `gold-300` | `#DBC079` | Decorative gold lines, quote glyphs |
| `gold-400` | `#D0B25E` | Hover on gold surfaces |
| `gold-500` | `#C9A84C` | **Primary accent** — CTA fill, ring, summit-line |
| `gold-600` | `#BFA14A` | CTA hover/pressed |
| `gold-700` | `#9E8439` | Large gold text/UI only (~3.6:1) |
| `gold-800` | `#7C672C` | **Gold body text on white (AA, ~5.1:1)** |
| `gold-900` | `#5A4A20` | Deepest gold |

#### Neutral / Grey (slate-tinted, cool, modern)
| Token | HEX | Usage |
|---|---|---|
| `neutral-0` | `#FFFFFF` | Pure white — cards, solid navbar |
| `neutral-50` | `#F7F8F8` | **Off-white** primary page background |
| `neutral-100` | `#EEF0F1` | Alt section bg, input fill |
| `neutral-200` | `#E0E3E5` | Borders, dividers, card outlines |
| `neutral-300` | `#C8CDD0` | Input borders, disabled borders |
| `neutral-400` | `#9AA1A6` | Placeholder text, disabled text |
| `neutral-500` | `#6E767C` | Muted/secondary body text (≥14px) |
| `neutral-600` | `#545C62` | Secondary text, captions |
| `neutral-700` | `#3D444A` | **Body text default** (~9.7:1 on white) |
| `neutral-800` | `#272D32` | Strong body, subheads |
| `neutral-900` | `#161A1D` | **Headings**, near-black (~16:1 on off-white) |

#### Semantic
| Token | HEX | Usage |
|---|---|---|
| `success-500` / `success-50` | `#3E9E6E` / `#E8F4EE` | Form success (harmonizes with summit) |
| `error-500` / `error-50` | `#C2453E` / `#F8E9E8` | Form validation errors |
| `warning-500` | `#D99A2B` | Warning (distinct from brand gold) |
| `info-500` | `#3B7BA8` | Info notices |

#### Functional aliases (use these in components)
| Alias | Token |
|---|---|
| `--bg-page` | `neutral-50` |
| `--bg-surface` | `neutral-0` |
| `--bg-subtle` | `sage-50` |
| `--bg-inverse` | `summit-900` |
| `--text-primary` | `neutral-900` |
| `--text-body` | `neutral-700` |
| `--text-muted` | `neutral-500` |
| `--text-on-dark` | `neutral-50` |
| `--text-on-dark-muted` | `sage-300` |
| `--border-default` | `neutral-200` |
| `--border-strong` | `neutral-300` |
| `--accent` | `gold-500` |
| `--accent-hover` | `gold-600` |
| `--brand` | `sage-600` |
| `--brand-deep` | `summit-700` |
| `--focus-ring` | `gold-500 @ 45%` |

#### Contrast rules (WCAG 2.1 AA — non-negotiable)
| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| `neutral-900` | `neutral-50` | ~16.3:1 | AAA |
| `neutral-700` | `#FFFFFF` | ~9.7:1 | AAA (body) |
| `neutral-500` | `#FFFFFF` | ~4.7:1 | AA (≥14px only) |
| `summit-700` | `#FFFFFF` | ~5.4:1 | AA (green headings/links) |
| `sage-600` | `#FFFFFF` | ~3.9:1 | **Large text/UI only — never body** |
| `gold-800` | `#FFFFFF` | ~5.1:1 | **AA — use for gold body text** |
| `neutral-900` | `gold-500` | ~8.7:1 | AAA — **dark text on gold CTA** |
| `neutral-50` | `summit-900` | ~12.9:1 | AAA — text on dark sections |
| `sage-300` | `summit-900` | ~6.8:1 | AA — muted text on dark |
| `gold-500` | `summit-900` | ~6.5:1 | AA — gold accents on dark |

**Hard rules:**
- **Primary gold CTA uses `neutral-900` text, never white** (gold + white fails contrast).
- **Never** use `sage-500/600` or `gold-500` for body-size text on white. For gold *text*, use `gold-800`; for green text/links use `summit-700`.
- Don't rely on color alone (active nav = underline + color; errors = icon + text).

### 2.2 Tailwind theme config

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: { 50:'#F2F5F3',100:'#E2EAE5',200:'#C7D6CC',300:'#A8BEAF',400:'#90AA98',500:'#7C9885',600:'#5F7E6B',700:'#4A6555',800:'#374D41',900:'#26352D' },
        summit: { 500:'#3C7E5D',600:'#327052',700:'#2F6B4F',800:'#1F4D38',900:'#163A2B',950:'#0E261C' },
        gold: { 50:'#FAF6EA',100:'#F3EACF',200:'#E7D6A3',300:'#DBC079',400:'#D0B25E',500:'#C9A84C',600:'#BFA14A',700:'#9E8439',800:'#7C672C',900:'#5A4A20' },
        neutral: { 0:'#FFFFFF',50:'#F7F8F8',100:'#EEF0F1',200:'#E0E3E5',300:'#C8CDD0',400:'#9AA1A6',500:'#6E767C',600:'#545C62',700:'#3D444A',800:'#272D32',900:'#161A1D' },
        success: { 50:'#E8F4EE', 500:'#3E9E6E' },
        error:   { 50:'#F8E9E8', 500:'#C2453E' },
        warning: { 500:'#D99A2B' },
        info:    { 500:'#3B7BA8' },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans:    ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs:  ['0.75rem',  { lineHeight: '1.125rem' }],
        sm:  ['0.875rem', { lineHeight: '1.375rem' }],
        base:['1rem',     { lineHeight: '1.625rem' }],
        lg:  ['1.125rem', { lineHeight: '1.75rem'  }],
        xl:  ['1.25rem',  { lineHeight: '1.875rem' }],
        '2xl':['1.5rem',   { lineHeight: '2rem',     letterSpacing: '-0.01em' }],
        '3xl':['1.875rem', { lineHeight: '2.375rem', letterSpacing: '-0.015em' }],
        '4xl':['2.375rem', { lineHeight: '2.75rem',  letterSpacing: '-0.02em'  }],
        '5xl':['3rem',     { lineHeight: '3.25rem',  letterSpacing: '-0.022em' }],
        '6xl':['3.75rem',  { lineHeight: '3.9rem',   letterSpacing: '-0.025em' }],
        '7xl':['4.75rem',  { lineHeight: '4.9rem',   letterSpacing: '-0.03em'  }],
      },
      borderRadius: { sm:'6px', DEFAULT:'10px', md:'12px', lg:'16px', xl:'20px', '2xl':'28px', pill:'999px' },
      boxShadow: {
        xs:'0 1px 2px rgba(22,26,29,0.05)',
        sm:'0 2px 4px rgba(22,26,29,0.06)',
        md:'0 6px 16px rgba(22,26,29,0.08)',
        lg:'0 14px 32px rgba(22,26,29,0.10)',
        xl:'0 24px 56px rgba(22,26,29,0.12)',
        gold:'0 8px 24px rgba(201,168,76,0.28)',
        focus:'0 0 0 3px rgba(201,168,76,0.45)',
      },
      maxWidth: { content:'1200px', 'prose-tight':'68ch', wide:'1360px' },
      spacing: { '4.5':'1.125rem','13':'3.25rem','15':'3.75rem','18':'4.5rem','22':'5.5rem','26':'6.5rem','30':'7.5rem' },
      transitionTimingFunction: { summit:'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
```

### 2.3 CSS custom properties

```css
/* src/styles/index.css — after @tailwind base/components/utilities */
:root {
  /* Sage */
  --sage-50:#F2F5F3; --sage-100:#E2EAE5; --sage-200:#C7D6CC; --sage-300:#A8BEAF; --sage-400:#90AA98;
  --sage-500:#7C9885; --sage-600:#5F7E6B; --sage-700:#4A6555; --sage-800:#374D41; --sage-900:#26352D;
  /* Summit */
  --summit-500:#3C7E5D; --summit-600:#327052; --summit-700:#2F6B4F; --summit-800:#1F4D38; --summit-900:#163A2B; --summit-950:#0E261C;
  /* Gold */
  --gold-50:#FAF6EA; --gold-100:#F3EACF; --gold-200:#E7D6A3; --gold-300:#DBC079; --gold-400:#D0B25E;
  --gold-500:#C9A84C; --gold-600:#BFA14A; --gold-700:#9E8439; --gold-800:#7C672C; --gold-900:#5A4A20;
  /* Neutral */
  --neutral-0:#FFFFFF; --neutral-50:#F7F8F8; --neutral-100:#EEF0F1; --neutral-200:#E0E3E5; --neutral-300:#C8CDD0;
  --neutral-400:#9AA1A6; --neutral-500:#6E767C; --neutral-600:#545C62; --neutral-700:#3D444A; --neutral-800:#272D32; --neutral-900:#161A1D;
  /* Semantic */
  --success-500:#3E9E6E; --success-50:#E8F4EE; --error-500:#C2453E; --error-50:#F8E9E8; --warning-500:#D99A2B; --info-500:#3B7BA8;
  /* Functional aliases */
  --bg-page:var(--neutral-50); --bg-surface:var(--neutral-0); --bg-subtle:var(--sage-50); --bg-inverse:var(--summit-900);
  --text-primary:var(--neutral-900); --text-body:var(--neutral-700); --text-muted:var(--neutral-500);
  --text-on-dark:var(--neutral-50); --text-on-dark-muted:var(--sage-300);
  --border-default:var(--neutral-200); --border-strong:var(--neutral-300);
  --accent:var(--gold-500); --accent-hover:var(--gold-600); --brand:var(--sage-600); --brand-deep:var(--summit-700);
  /* Elevation */
  --shadow-xs:0 1px 2px rgba(22,26,29,0.05); --shadow-sm:0 2px 4px rgba(22,26,29,0.06);
  --shadow-md:0 6px 16px rgba(22,26,29,0.08); --shadow-lg:0 14px 32px rgba(22,26,29,0.10);
  --shadow-xl:0 24px 56px rgba(22,26,29,0.12); --shadow-gold:0 8px 24px rgba(201,168,76,0.28);
  /* Radii */
  --radius-sm:6px; --radius:10px; --radius-md:12px; --radius-lg:16px; --radius-xl:20px; --radius-2xl:28px; --radius-pill:999px;
  /* Motion */
  --ease-summit:cubic-bezier(0.22,1,0.36,1); --dur-fast:140ms; --dur-base:240ms; --dur-slow:420ms;
  /* Signature gradients */
  --grad-elevation:linear-gradient(180deg,#163A2B 0%,#1F4D38 55%,#2F6B4F 100%);
  --grad-summit-sky:linear-gradient(165deg,#2F6B4F 0%,#3C7E5D 40%,#7C9885 100%);
  --grad-gold-ridge:linear-gradient(90deg,#BFA14A 0%,#C9A84C 50%,#DBC079 100%);
  --grad-dawn:linear-gradient(180deg,#F7F8F8 0%,#F2F5F3 100%);
}

/* Global reduced-motion guard (required) */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 2.4 Typography

> **Conflict resolution:** Two experts proposed display fonts (Fraunces serif vs. Space Grotesk). **Decision: Space Grotesk (display) + Inter (body)** — a clean geometric grotesk reads "summit-precise / engineering" and stays modern, not rustic. Self-host both for performance (Inter variable via `@fontsource-variable/inter`; Space Grotesk via `@fontsource/space-grotesk`) — no third-party CDN request, no FOUT.

**Pairing:** **Space Grotesk** 500/600/700 (display/headings) + **Inter** 400/500/600/700 (body/UI).

| Role | Family / Weight | Size (desktop → mobile) | Line-height | Tracking | Use |
|---|---|---|---|---|---|
| Display / Hero H1 | Space Grotesk 700 | 60–76px → ~40px | 1.04 | -0.03em | Hero headline only |
| H2 Section | Space Grotesk 700 | 40px → ~30px | 1.15 | -0.02em | Section titles |
| H3 | Space Grotesk 600 | 30px | 1.25 | -0.015em | Sub-sections, large card titles |
| H4 | Space Grotesk 600 | 24px | 1.3 | -0.01em | Card titles, service names |
| H5 | Space Grotesk 600 | 20px | 1.4 | 0 | Small headings |
| Eyebrow / Kicker | Inter 600 | 13px | 1.4 | +0.12em UPPERCASE | Labels above H2, in `gold-800`/`summit-700` |
| Lead / Intro | Inter 400 | 20px | 1.6 | 0 | Hero subhead, section intros |
| Body | Inter 400 | 16–18px | 1.65 | 0 | Paragraphs (`neutral-700`) |
| Body small | Inter 400 | 14px | 1.55 | 0 | Captions, meta (`neutral-500`) |
| Button label | Inter 600 | 15–16px | 1 | +0.01em | CTAs |
| Stat number | Space Grotesk 700 | 44–56px | 1 | -0.02em | Metric blocks (`summit-700`/`gold-800`) |
| Overline / Tag | Inter 600 | 12px | 1.2 | +0.06em | Badges |

**Rules:** Headings `neutral-900`; body `neutral-700`; muted meta `neutral-500`. Eyebrows are the main place gold appears as *text* — use `gold-800` (not `gold-500`) to stay AA. Body measure capped ~68ch (`max-w-prose-tight`).

### 2.5 Mountain/summit motif system

Expressed through **geometry and light**, never literal illustration. Four sanctioned devices:

**6.1 Ridgeline divider** (between light sections) — single thin gold stroke:
```html
<svg viewBox="0 0 1440 60" preserveAspectRatio="none" width="100%" height="60" role="presentation" aria-hidden="true">
  <path d="M0,46 L300,30 L520,40 L760,12 L980,34 L1220,22 L1440,38" fill="none" stroke="#DBC079" stroke-width="1.5" stroke-linejoin="round"/>
</svg>
```

**6.2 Peak transition into dark** (off-white → dark footer/CTA band) — calm, low-amplitude ridge with a gold rim light:
```html
<svg viewBox="0 0 1440 120" preserveAspectRatio="none" width="100%" height="120" aria-hidden="true">
  <path d="M0,120 L0,72 L360,40 L620,64 L880,28 L1140,56 L1440,34 L1440,120 Z" fill="#163A2B"/>
  <path d="M0,72 L360,40 L620,64 L880,28 L1140,56 L1440,34" fill="none" stroke="#C9A84C" stroke-width="1.5" opacity="0.5"/>
</svg>
```

**6.3 Summit-line accent** (the "ascent" underline/chevron under eyebrows, beside stats, hover indicator):
```html
<svg width="40" height="14" viewBox="0 0 40 14" aria-hidden="true">
  <path d="M2,12 L14,3 L26,9 L38,2" fill="none" stroke="#C9A84C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

**6.4 Elevation gradients** — use `--grad-elevation` / `--grad-summit-sky` for hero/dark CTA backdrops; optional 1px contour lines at 4–6% opacity only on dark sections.

**Microcopy motif (use sparingly so it stays modern):** "Engineering your ascent," "From base camp to summit," "Built to scale the climb," "Reach your peak."

### 2.6 Logo / circle-mark usage rules
- **Clear space:** ≥ 25% of diameter on all sides. **Min size:** 32px (favicon), 40px preferred in navbar.
- On dark sections the mark's white base reads well on `summit-900`. Provide **mono gold** (`gold-500`) and **mono white** variants for the footer/tight spaces.
- The **double gold ring is sacred** — keep both rings intact ≥40px; a simplified single-ring favicon is OK below that.
- **Never** stretch, rotate, recolor rings, add glows/shadows, crop rings, or place full-color on busy gold.
- Wordmark "STANDLEY TECHNOLOGIES": Space Grotesk 600, +0.04em tracking, `neutral-900` (light) / `neutral-50` (dark).
- **Alt text:** `"Standley Technologies summit mark logo"`.

### 2.7 Component specs (summary)

| Component | Spec |
|---|---|
| **Primary CTA (gold)** | Fill `gold-500`, text `neutral-900` 700, pad `14px 28px`, radius `10px`. Hover `gold-600` + `translateY(-1px)` + `--shadow-gold`. Active `gold-700`. Focus `--shadow-focus`. Disabled `gold-200`/`neutral-400`. |
| **Secondary CTA (sage outline)** | Transparent, 1.5px `sage-500` border, text `summit-700` 600. Hover bg `sage-50`. On dark: border `sage-300`, text `neutral-50`, hover `rgba(255,255,255,0.08)`. |
| **Ghost/Tertiary** | No border, text `neutral-700` 600, optional summit-line chevron animating on hover. |
| **Navbar** | Over hero: transparent, white links, height 76px. On scroll >40px: `rgba(255,255,255,0.85)` + `backdrop-blur(12px)`, 1px `neutral-200` bottom border, `--shadow-sm`, shrink to 64px, links → `neutral-700`. Transition `240ms summit`. Active link: `summit-700` + 2px gold underline. CTA always gold. |
| **Card (base)** | Bg `neutral-0`, radius 16px, 1px `neutral-200`, pad 28px, `--shadow-sm`. Interactive hover: `--shadow-md`, border `sage-200`, `translateY(-2px)`. |
| **Service card** | Base + 56px icon medallion (bg `sage-50`, icon `summit-600`; hover → icon `gold-600`, medallion `gold-50`). H4 title, 2–3 line desc (`neutral-600`), "Learn more →" ghost link w/ gold chevron. Optional **featured** = `gold-200` border + `gold-50` wash. |
| **Stat block** | Number Space Grotesk 700 44–56px `summit-700` (one highlight in `gold-800`); label Inter 500 14px uppercase `neutral-500`; thin `neutral-200` dividers desktop, stacked mobile. **New-business framing: capability metrics, not inflated outcomes.** |
| **Testimonial card** | Bg `neutral-0`/`sage-50`, radius 16px, pad 32px. Gold-300 quote glyph (`aria-hidden`). Quote Inter 400 18px `neutral-800`. Name `neutral-900` 600 + role/company `neutral-500`. **Placeholder mode clearly labeled, never a fake quote.** |
| **Footer** | Bg `summit-900`, text `sage-300`, headings `neutral-50`. Optional peak-transition top edge. 4 columns. Links `sage-300` → hover `gold-300`. Bottom bar 1px `rgba(255,255,255,0.10)` top border, copyright `sage-400`. |
| **Form input** | Bg `neutral-0`, 1px `neutral-300`, radius 10px, pad `12px 14px`, text `neutral-900`, Inter 400 **16px (prevents iOS zoom)**. Label Inter 600 14px `neutral-700`. Focus: border `sage-500` + `--shadow-focus`. Error: border `error-500`, helper `error-500` 13px, `aria-invalid`+`aria-describedby`. Textarea min-height 140px, vertical resize only. |
| **Badge/chip** | Default bg `sage-100` text `summit-800` pill. Accent bg `gold-50` text `gold-800` + 1px `gold-200`. Tech badges bg `neutral-100` text `neutral-700` w/ grayscale brand logo. |

### 2.8 Layout, spacing, grid
- **Spacing scale (4px base):** `4,8,12,16,20,24,32,40,48,56,64,80,96,120,160px`.
- **Section vertical padding:** 96–120px desktop (`py-24`/`py-30`), 56–64px mobile.
- **Container:** `max-w-content` (1200px); wide hero inner 1360px. Gutters 24px mobile / 32px tablet / 40px+ desktop. 12-col grid, 24–32px gap.
- **Radii:** buttons/inputs 10px, cards 16px, feature panels/images 20–28px; mark stays circular; chips pill.
- **Elevation:** prefer **border + subtle shadow** over heavy shadows. Gold shadow reserved for primary-CTA hover only.

### 2.9 Iconography & motion
- **Icons:** `lucide-react`, 1.5–2px stroke, 24px grid, `summit-600` default → `gold-600` hover, `neutral-500` inert. Pillar icons: P1 `code`/`app-window`; P2 `cloud`/`server-cog`/`git-branch`; P3 `life-buoy`/`shield-check`/`users`. Never mix families or use emoji/clip-art.
- **Motion (easing `var(--ease-summit)`, durations 140/240/420ms):** button hover lift 140ms; card hover lift 240ms; section reveal fade + 12–16px rise 420ms, stagger 60–80ms, trigger once at ~15% in view; stat count-up ~1.2s on first view; summit-line draw-in 240ms; route change 120–180ms cross-fade. **Honor `prefers-reduced-motion`:** no parallax, no auto counters (show final values), reveals instant, hover states remain functional.

---

## 3. Information Architecture & Sitemap

### 3.1 Sitemap
```
/                 Home
/services         Services        (#custom, #cloud, #consulting anchors)
/about            About
/achievements     Achievements
/contact          Contact         (accepts ?service= prefill)
*                 404 / not-found

Utility (footer/legal, low priority, placeholder pages):
/privacy          Privacy Policy
/terms            Terms of Service
```
Client-side routing via React Router 6. Each route updates `<title>`, meta description, canonical, OG/Twitter, JSON-LD via helmet. In-page anchors on `/services` scroll-to with sticky-header offset. Static OG/meta defaults live in `index.html` for link unfurls; deep links handled by the `spa-404-fallback` plugin (see §5.4).

### 3.2 Header navigation (sticky)
- **Left:** logo mark (`circle-mark-512.png`, retina) + wordmark "Standley Technologies" (wordmark hidden on very small screens; mark always visible). Links to `/`.
- **Right links:** `Services` · `About` · `Achievements` · `Contact`.
- **Primary CTA (gold):** `Get in Touch` → `/contact` (always visible).
- **Behavior:** transparent over Home hero → solidifies white on scroll (>40–80px) with `--shadow-sm` + gold-underline active indicator. Height ~76px → 64px on scroll.

### 3.3 Footer navigation (4 columns over `summit-900`, topped by peak-transition SVG)
1. **Brand:** mono mark + wordmark, one-line positioning, "Standley Technologies LLC" legal line.
2. **Services:** Custom Software & App Development · Cloud & DevOps Engineering · IT Consulting & Managed Services (deep-link `/services#...`).
3. **Company:** About · Achievements · Contact.
4. **Get in touch:** email (mailto), service-area line, response-time line, optional LinkedIn/GitHub.
- **Sub-footer:** `© {year} Standley Technologies LLC. All rights reserved.` · Privacy · Terms · "Built in [FILL IN region]".

### 3.4 Mobile navigation
- Hamburger (right), mark stays left. Tap → full-height white slide-in panel, ≥48px tap targets, stacked links with gold active indicator, full-width gold `Get in Touch` at bottom.
- Body scroll-lock while open; close on link tap / backdrop / Esc; focus-trap inside; `aria-expanded` toggled; first focus into menu, returns to trigger on close.

### 3.5 Global CTA strategy
- **Primary (gold):** "Get in Touch" / "Start the Climb" / "Get a Free Consultation" → `/contact`.
- **Secondary (sage outline):** "Explore Services" / "See What We Do" → `/services`.
- Persistent header CTA + ≥1 CTA band per page + footer contact block = **no dead ends.** Per-pillar CTAs deep-link to `/contact?service=...` for lower-friction qualified leads.

---

## 4. Page-by-Page Specs

> Real example copy is woven in below (from the Content & SEO strategy). **[FILL IN]** marks owner-supplied content. Voice: *Steady. Sharp. Summit-bound.* — confident not boastful, clear over clever, partner-minded.

### 4.1 Home (`/`)

**Intent:** communicate what/for-whom/why-trust in 5s; route to Services or Contact; conversion-optimized and proof-forward despite being new.

**1. Hero (summit motif)**
- Background: dark `--grad-elevation` backdrop with a subtle layered ridge SVG and optional very-subtle parallax / ≤3% ambient gradient drift.
- Eyebrow: `STANDLEY TECHNOLOGIES` (gold-letter-spaced).
- **H1:** *"Engineering your ascent."*
- **Subhead:** *"Custom software, cloud infrastructure, and managed IT for businesses ready to reach higher ground. We build it, run it, and own the outcome."*
- **Dual CTA:** primary gold `Start the Climb` (→`/contact`) + secondary ghost `Explore Services` (→`/services`).
- **Trust micro-strip:** *"Cloud-certified · Modern stack · Responsive support"* (placeholder, editable).
- *SEO note:* ensure the H1 is real selectable text. Render the keyword line "Custom Software, Cloud & IT Services" as a prominent H2 directly beneath the tagline H1 for crawler relevance.

**2. Services overview triad** — Eyebrow `WHAT WE DO`. H2: *"Three disciplines. One reliable climb."* Intro: *"Standley Technologies brings software, cloud, and IT under one accountable partner — so the systems you depend on are built well, run well, and grow with you."*
Three cards (icon medallion + title + 1-line promise + 3 keyword bullets + "Learn more →"):
- **Custom Software & App Development** — *"We design and build the websites, web apps, and mobile applications that turn your ideas into working products customers love."* → `/services#custom`
- **Cloud & DevOps Engineering** — *"We migrate, automate, and harden your infrastructure so your systems are fast, secure, and ready to scale — without the 2 a.m. surprises."* → `/services#cloud`
- **IT Consulting & Managed Services** — *"Strategic advice and hands-on support that keep your technology aligned with your goals and running every day."* → `/services#consulting`

**3. Proof / stats strip (capability-framed, fillable)** — Gold/summit numerals on sage band, 3–4 slots. **Honest, capacity-based framing for day one:** `3 Core Service Pillars` · `AWS · Azure · GCP` · `24/7 Monitoring Readiness` · `≤ {{response_target}} Response Target`. Counters render only when real data exists; **no fabricated numbers.**

**4. Why Standley / differentiators** — H2: *"Built to scale the climb."* 3–4 value props w/ icons: senior hands-on engineering · modern stack (React/Vite, IaC, CI/CD) · reliability & security focus · transparent, accountable partnership.

**5. Process steps (ascending)** — Eyebrow `HOW WE WORK`. H2: *"From base camp to summit."* Four rising steps:
1. **Base camp** — understand your business, goals, and what's slowing you down.
2. **Map the route** — a clear plan: scope, timeline, cost, no surprises.
3. **Make the climb** — build, migrate, or manage with steady communication.
4. **Hold the summit** — support, monitor, and improve so you stay there.

**6. Featured work (case-study teaser)** — H2: *"Where we've made an impact."* 2–3 teaser cards (image placeholder, sector, one-line outcome, "View details" → Achievements). Build with a clear `[SAMPLE — replace with real project]` placeholder pattern. **Empty state:** collapse to a single CTA card — *"Your project could be our next success story."*

**7. Testimonial** — Single featured quote (large gold quote mark) + name/role/company. **Placeholder, clearly flagged.** Empty state: replace with a capability/promise statement or a tech-badge row — never a fabricated quote.

**8. Tech & partner badge row (trust)** — Labeled *"Technologies we work with"* (accurate even day one): AWS, Azure, GCP, React, Terraform, Docker, etc. Reserve a "Partners" sub-row for formal partnerships when they exist.

**9. Final CTA band** — `--grad-elevation` band with peak-transition silhouette. H2: *"Ready to reach your peak?"* Subline + prominent gold `Start the Conversation` (→`/contact`) + secondary text link to Services.

**10. Footer** (global §3.3).

---

### 4.2 Services (`/services`)

**Intent:** explain the 3 pillars at overview + depth; let visitors self-identify and convert. Sticky anchored nav between pillars.

**1. Services hero (compact)** — Eyebrow `SERVICES`. **H1:** *"Software, Cloud & Managed IT Services"* (keyword-bearing). Subhead: *"From custom apps to cloud migrations to day-to-day IT support — one accountable engineering partner across the full stack of your needs."* Mini sticky in-page nav chips: `Custom Software` · `Cloud & DevOps` · `IT Consulting` (scroll-to anchors).

**2. Pillars overview triad** — mirrors Home cards with "Jump to details ↓".

**3. Pillar detail blocks** — same structured template per pillar, alternating image side and `neutral-0`/`sage-50` bands for rhythm, ridgeline dividers between. Each block: **anchor + eyebrow + H2 (pillar name)** → lead paragraph → What's included → Who it's for → Deliverables → Tech & tools (badge row) → Outcomes → **per-pillar CTA** `Discuss your {pillar} project →` (→`/contact?service=...`).

**3a. Custom Software & App Development** (`#custom`)
- **Lead:** *"Custom-built websites, web apps, mobile apps, and bespoke software tailored to how you actually work — turning your ideas into working products customers love."*
- **Includes:** custom marketing sites built for speed/conversion/accessibility · responsive web apps & customer portals (dashboards, SaaS, internal tools) · native & cross-platform mobile (iOS/Android) · bespoke business software & workflow automation · API design, integrations, UI/UX, maintenance.
- **Who it's for:** founders launching an MVP; SMBs replacing spreadsheets/manual processes; companies needing a customer-facing portal or app.
- **Deliverables:** design mockups, production app, source/repo, documentation, deployment, handover/training.
- **Tech & tools:** React, Vite, TypeScript, Node, React Native/Flutter, REST/GraphQL, Postgres, Figma.
- **Outcomes:** *"A polished, reliable product — shipped on a clear timeline and engineered to grow with your business, not hold it back."*

**3b. Cloud & DevOps Engineering** (`#cloud`)
- **Lead:** *"Migrate, automate, and harden your infrastructure for reliability at any scale — without the 2 a.m. surprises."*
- **Includes:** cloud migration & architecture (AWS/Azure/GCP) · IaC (Terraform/CloudFormation) · CI/CD pipelines · containerization/orchestration (Docker/Kubernetes) · monitoring/observability & alerting · automation & scripting · cost optimization · security & reliability/SRE.
- **Who it's for:** teams on aging/on-prem infra; scaling apps with growing pains; businesses wanting automated, repeatable deployments.
- **Deliverables:** migration plan & execution, IaC repo, automated CI/CD pipeline, monitoring dashboards, runbooks.
- **Tech & tools:** AWS, Azure, GCP, Terraform, Docker, Kubernetes, GitHub Actions/GitLab CI, Prometheus/Grafana.
- **Outcomes:** *"Infrastructure you can trust — lower costs, faster releases, and a platform that stays up and scales the moment you need it to."*

**3c. IT Consulting & Managed Services** (`#consulting`)
- **Lead:** *"Strategic guidance plus the day-to-day support to keep everything running and aligned with your goals."*
- **Includes:** technology strategy & advisory (roadmaps, audits, vendor guidance) · managed IT & system administration · responsive help desk/support · security reviews, backups & business-continuity/DR · fractional CTO / technical leadership · ongoing maintenance.
- **Who it's for:** businesses without an in-house IT team; leaders needing a tech roadmap; teams wanting reliable outsourced support.
- **Deliverables:** assessment & recommendations report, managed-service plan/SLA, documented systems, ongoing support cadence.
- **Tech & tools:** RMM/monitoring tools, M365/Google Workspace, ticketing, security tooling.
- **Outcomes:** *"Technology that just works, guided by experts who know your business — fewer fires, clearer decisions, and a steady hand on the climb."*

**4. "Not sure where to start?" helper** — short 3-column "Choose your path" mapping a need → pillar. CTA: `Book a free consultation`.

**5. Process recap** — condensed Base camp → Map the route → Make the climb → Hold the summit (reused from Home).

**6. Final CTA band** — *"Let's map your route to the summit."* → `/contact`.

**7. Footer.**

---

### 4.3 About (`/about`)

**Intent:** build trust in a new company through clarity of mission, values, expertise, and approach — not size or tenure. Frame newness as agility/attention, never inexperience.

**1. About hero** — Eyebrow `ABOUT US`. **H1:** *"Built for the climb ahead."* Subhead/intro: *"Standley Technologies is a technology services company founded on a simple belief: great software and infrastructure should move your business forward, not hold it back."* (Keyword-rich H2 below: *"Your technology partner for software, cloud, and IT."*)

**2. Our story / mission** (`max-w-prose-tight`):
> *"Standley Technologies was founded by **[FILL IN: FOUNDER NAME]** in **[FILL IN: YEAR]** after **[FILL IN: X years]** building software and infrastructure for **[FILL IN: industries — e.g. startups, healthcare, fintech]**. Time and again, **[FILL IN: founder first name]** saw the same gap: businesses with real ambition were slowed down by technology that was over-complicated, poorly built, or no one fully owned.*
> *Standley Technologies exists to close that gap. We bring software, cloud, and IT under one accountable roof — pairing senior engineering with a partner's sense of ownership. We're a new company with a long-game mindset: every client relationship is a climb we take seriously, and every system we build is one we'd be proud to stand behind.*
> *[FILL IN: optional personal note — name origin / local roots / why mountains.]"*

**Mission:** *"To engineer the technology that moves businesses to higher ground — building software and infrastructure that's reliable, modern, and made to last."*

**3. Mission & values** — 3–5 value cards (icon + title + line), tied lightly to the summit metaphor:
- **Solid footing (Reliability)** — strong foundations beat clever shortcuts.
- **Clear route (Clarity)** — no jargon, no black boxes; you always know what we're building, why, and what it costs.
- **Climb together (Partnership)** — your goals set the route; we're accountable for the outcome, not just the deliverable.
- **Reach higher (Craft)** — modern, clean, well-engineered work, held to the standard of the summit.
- **Travel light (Efficiency)** — we cut the complexity others leave behind.

**4. What sets us apart** — full-stack capability under one roof · modern tooling · senior hands-on involvement · security/reliability mindset · responsive communication.

**5. Team / founder (fillable)** — founder card: photo placeholder, **[FILL IN: name]**, **[FILL IN: role]**, **[FILL IN: 1–2 line bio]**, optional LinkedIn. Design supports 1 founder now, scalable to a grid later. If declining a person, replace with an "expertise areas" panel.

**6. Our approach** — reuse Base camp → Map the route → Make the climb → Hold the summit, phrased as the client journey.

**7. Service area / how we work** — remote-first / **[FILL IN: region served]**; engagement models (project-based, retainer, managed).

**8. CTA band** — *"Let's build something worth the climb."* → `/contact`.

**9. Footer.**

*Placeholders to fill: founder name & bio, year founded, location/service area, headshot, certifications, prior industries.*

---

### 4.4 Achievements (`/achievements`)

**Intent:** present **credible, fillable proof** for a new business — clearly structured slots with placeholders + build guidance, never fabricated. Each category gracefully hides or shows a "coming soon"/capability variant until populated.

> **Build guidance (internal, not shown to users):** every item is a content slot driven by `siteConfig.achievements` with `placeholder: true` flags. Replace as real proof accrues. If a category has zero real entries, either (a) hide the section, or (b) show the capability/promise variant. **Never display fabricated metrics or fake logos.**

**1. Achievements hero** — Eyebrow `PROOF` / `OUR TRACK RECORD`. **H1:** *"Proof in the work."* Subhead (day-one honest): *"We're a new company building a track record the right way — one well-engineered project at a time. Here's what we stand on, and what's already in motion."*

**2. "What we stand on" — true-from-day-one credibility**
- **Technologies we work in:** React, Node, TypeScript, AWS, Azure, GCP, Terraform, Docker, CI/CD **[FILL IN: confirm real stack]**.
- **Certifications & training:** **[FILL IN — only earned ones; "in progress" acceptable if labeled]**.
- **Cloud partnerships/programs:** **[FILL IN — e.g. AWS Activate, Microsoft for Startups, if enrolled]**.
- **Our standards:** version-controlled infrastructure, automated testing, security-first practices, documented handoffs.

**3. Metrics / stats strip (fillable, honest framing)**
| Stat | Placeholder | Honest fallback if no data |
|---|---|---|
| Projects delivered | **[##]** projects delivered | "Now taking on founding clients" |
| Uptime maintained | **[99.9%]** uptime maintained | "Reliability-first engineering" |
| Experience | **[##]+** years combined experience | use founder's real experience |
| Response time | **[< X hrs]** support response | "Direct line to your engineer" |
> A new LLC can legitimately cite the founder's real **years of experience**, **technologies mastered**, and **certifications** today; fill project/uptime stats only once real.

**4. Certifications & credentials** — badge grid. Placeholders labeled "In progress / planned" where not yet earned. Empty state: "Certifications in progress."

**5. Case studies / completed-project outcomes (slots)** — card grid, each: title/sector, **Challenge**, **What we built**, **Stack**, **Result (outcome metric once real)**, optional "Read more." Ship 2–3 placeholder cards with clearly-labeled `[SAMPLE — replace with real project]`. Empty state: single CTA card — *"Your success story goes here — let's create the first one."*

**6. Client testimonials (slots)** — 2–3 quote cards flagged as samples behind a feature flag, or hidden until the first real quote. Empty state: *"Be one of our first"* prompt.

**7. Partnerships & technology stack (badges)** — *"Technologies & platforms we build on"* (accurate day one). Reserve a "Partners" sub-row for formal partnerships.

**8. Experience / expertise summary** — frame as **combined experience / domains**, not company age: *"{{years}}+ years combined engineering experience," "Backgrounds across [FILL IN: industries]."* Avoid implying tenure the company doesn't have.

**9. "Founding client" section** (turns sparseness into an offer) — H2: *"Be one of our first."* Body: *"As a new firm, we're partnering closely with a small group of founding clients — senior attention, founder-level accountability, and a relationship we're invested in for the long climb."* CTA: `Claim a founding spot`.

**10. CTA band** — *"Ready to be our next success story?"* → `/contact`.

**11. Footer.**

---

### 4.5 Contact (`/contact`)

**Intent:** frictionless, trustworthy outreach; the email-wired form is the conversion endpoint.

**1. Contact hero (compact)** — Eyebrow `CONTACT`. **H1:** *"Let's plan your route."* (Keyword H2: *"Get a free consultation."*) Subhead: *"Tell us where you want to go and what's standing in the way. We'll get back to you within **[FILL IN: one business day]** with clear next steps — no pressure, no jargon."*

**2. Two-column layout: form (left) + info/trust panel (right, on `sage-50`).**

**Contact form fields & microcopy:**
| Field | Label | Helper / placeholder | Required |
|---|---|---|---|
| Name | **Name** | "Your full name" | ✓ |
| Email | **Email** | "Where should we reply?" (validated) | ✓ |
| Company | **Company** *(optional)* | "Company or project name" | — |
| Phone | **Phone** *(optional)* | tel | — |
| Service | **What do you need?** | Select: Custom Software / Cloud & DevOps / IT Consulting & Managed Services / Not sure yet — **prefilled from `?service=`** | ✓ |
| Budget | **Budget range** *(optional)* | select (hideable) | — |
| Message | **Tell us about your project** | "A few sentences on your goals or the problem you're facing." | ✓ |
| Consent | privacy/contact permission checkbox | recommended | — |
| Honeypot | hidden `botcheck` | visually hidden, `tabIndex={-1}`, `aria-hidden`, must stay empty | — |

- **Submit (gold):** `Start the Climb` (or `Send Message`).
- **Privacy line:** *"We'll only use your details to respond to your inquiry. No spam, ever. See our [Privacy Policy]."*
- **States:**
  - Sending: *"Sending…"* — disabled submit + spinner.
  - **Success** (`role="status"`, `aria-live="polite"`): *"Message sent. We'll reach out within one business day."*
  - **Error** (`role="alert"`): *"Something went wrong on our end. Please try again, or email us directly at **[FILL IN: hello@standleytech.com]**."*
  - Validation — email: *"Please enter a valid email address so we can reply."*; required: *"This field is required."*

**Info / trust panel (right):**
- **Email:** clickable mailto **[FILL IN: hello@standleytech.com]**.
- **Response time:** *"We typically respond within [FILL IN: one business day]."*
- **Service area:** *"Serving [FILL IN: City/Region] and remote clients nationwide."*
- Optional **phone** + **business hours**.
- **"What happens next" 3-step:** 1 You send → 2 We reply & schedule a call → 3 We scope your project.
- Small certifications/tech badge row + reassurance: *"No obligation, free initial consultation."*
- Optional LinkedIn/GitHub.

**3. FAQ (conversion-supporting accordions, 3–5)** — also feeds FAQ JSON-LD:
- "What services does Standley Technologies offer?"
- "Do you work with startups / small businesses?"
- "Which cloud platforms do you support?" → "AWS, Azure, and Google Cloud."
- "Do you offer ongoing IT support?"
- "How do projects get started?"

**4. Footer** (the form is the CTA; footer global).

---

### 4.6 Cross-cutting UX, conversion, trust & accessibility
- **Conversion path:** Hero CTA → Services detail → per-pillar CTA (`?service=`) → Contact form → success. Header `Get in Touch` short-circuits from anywhere; every page ends in a CTA band.
- **Trust signal placement:** hero micro-trust (Home), capability stats (Home + Achievements), cert/tech badges (Home, Achievements, Contact), "What happens next" (Contact), response-time + service-area (Contact + footer), founder (About).
- **Social proof:** featured testimonial on Home, grid on Achievements; case-study teasers Home → full slots on Achievements — all clearly-labeled, fillable, graceful in empty states.
- **A11y (content):** one `<h1>` per page, logical heading order, landmarks, skip-to-content link; on route change move focus to the new page `<h1>`/`<main>` and update title; visible labels (placeholders ≠ labels); meaningful `alt`, decorative SVGs `aria-hidden`; honor reduced motion; ≥44–48px targets; readable at 200% zoom.

---

## 5. Technical Architecture

### 5.1 Stack overview
| Concern | Choice | Why |
|---|---|---|
| Build tool | **Vite 5** | Instant HMR, native ESM dev, Rollup prod bundle, first-class TS/React. |
| UI lib | **React 18** | Concurrent features, `Suspense` for lazy routes. |
| Language | **TypeScript 5** | Type-safe props/forms/schema. |
| Routing | **react-router-dom 6** | Clean URLs, nested layout, lazy route objects, scroll restoration. |
| Styling | **Tailwind CSS 3** | Tokenized spacing/type/color = consistent clean whitespace, fast authoring. |
| Animation | **Framer Motion** | Declarative `whileInView` reveals + built-in `useReducedMotion()`. |
| Icons | **lucide-react** | Tree-shakeable, geometric stroke icons. |
| SEO/meta | **react-helmet-async** (+ static OG/meta defaults in `index.html`) | Per-page meta client-side; static defaults so link previews unfurl. Optional `vite-react-ssg` later if full pre-render is wanted. |
| Forms | **react-hook-form + zod + @hookform/resolvers** | Uncontrolled perf + one schema for client (and future server) validation. |
| Email | **Web3Forms** (recommended) | No backend, honeypot + hCaptcha built in, 250/mo free. |
| Fonts | `@fontsource-variable/inter` + `@fontsource/space-grotesk` | Self-hosted, no CDN request, `font-display: swap`. |

**Rejected alternatives (for the record):** TanStack Router (overkill for 5 pages); CSS Modules / styled-components / vanilla-extract (slower to author than Tailwind for a marketing SPA); `vite-react-ssg` / Vike / react-snap (full pre-render — more build complexity than this small site needs at launch; left as an optional §10 upgrade); react-icons (larger, mixed styles).

### 5.2 Folder structure
```
standley-technologies-website/
├─ public/
│  ├─ favicon.ico
│  ├─ favicon.svg
│  ├─ apple-touch-icon.png        # 180×180 from logo
│  ├─ og-image.png                # 1200×630 social card
│  ├─ site.webmanifest            # theme color #163A2B (summit-900), maskable icon
│  ├─ robots.txt
│  ├─ sitemap.xml                 # static, committed (~5 routes)
│  └─ CNAME                       # custom domain for GitHub Pages (standleytech.com)
│                                 # NOTE: 404.html is generated into dist/ by the spa-404-fallback plugin
├─ src/
│  ├─ main.tsx                    # entry: HelmetProvider + router
│  ├─ App.tsx                     # <Outlet/> shell
│  ├─ routes.tsx                  # lazy route objects for React Router
│  ├─ assets/
│  │  ├─ logo/                    # circle-mark-512.png, circle-mark-1024.png, logo.svg, mono variants
│  │  └─ images/                  # optimized hero/section imagery
│  ├─ components/
│  │  ├─ ui/                      # Button, Card, Badge, Container, SectionHeading, Input, Eyebrow, StatBlock
│  │  ├─ Logo.tsx
│  │  ├─ Reveal.tsx               # Framer in-view wrapper, reduced-motion aware
│  │  ├─ RidgeDivider.tsx · PeakTransition.tsx · SummitLine.tsx
│  │  └─ Seo.tsx                  # react-helmet-async wrapper + JSON-LD
│  ├─ layouts/
│  │  ├─ RootLayout.tsx           # Header + Footer + <Outlet/> + ScrollRestoration + skip link + focus-on-route
│  │  ├─ Header.tsx · Footer.tsx · MobileMenu.tsx
│  ├─ pages/
│  │  ├─ Home/index.tsx · Services/index.tsx · About/index.tsx · Achievements/index.tsx · Contact/index.tsx · NotFound.tsx
│  ├─ sections/
│  │  ├─ home/      Hero · ServicesPreview · StatsStrip · ValueProps · ProcessSteps · FeaturedWork · Testimonial · TechBadges · CtaBand
│  │  ├─ services/  ServicesHero · PillarNav · ServicePillar · PathHelper · ProcessSteps · CtaBand
│  │  ├─ about/     Story · Values · Differentiators · Founder · Approach · ServiceArea · CtaBand
│  │  ├─ achievements/ Hero · StandOn · ProofGrid · Certifications · CaseStudies · Testimonials · TechStack · FoundingClient · Placeholder
│  │  └─ contact/   ContactForm · ContactDetails · WhatHappensNext · Faq
│  ├─ hooks/
│  │  ├─ useReducedMotionPref.ts · useScrollHeader.ts · useFocusTrap.ts
│  ├─ lib/
│  │  ├─ contactSchema.ts         # zod
│  │  ├─ siteConfig.ts            # nav, services data, contact info, achievements slots, social — EDITED BY NON-DEVS
│  │  ├─ motion.ts                # shared Framer variants
│  │  └─ seo.ts                   # default meta + per-page builders + JSON-LD
│  ├─ styles/index.css            # @tailwind + tokens + reduced-motion guard
│  └─ types/index.ts
├─ index.html
├─ tailwind.config.js · postcss.config.js
├─ tsconfig.json · tsconfig.node.json
├─ vite.config.ts
├─ .eslintrc.cjs · .prettierrc · .editorconfig
├─ .env.example
├─ .github/workflows/deploy.yml   # build + deploy to GitHub Pages
└─ package.json
```
**Convention:** `components/` = small reusable bits; `sections/` = big composed page blocks; `pages/` = route entry composing sections + setting SEO. All editable copy lives in `lib/siteConfig.ts` so a non-dev can update it.

### 5.3 Contact form → email
**Recommendation: Web3Forms** for launch (no backend, built-in honeypot + hCaptcha, 250/mo free). **Upgrade path: Resend + serverless function** when the business wants branded transactional email (DKIM/SPF) and server-side validation.

| Option | Backend | Anti-spam | Free tier | Notes |
|---|---|---|---|---|
| **Web3Forms** ✅ | None | Honeypot + hCaptcha | 250/mo | Access key in form; simplest secure no-backend path. |
| Formspree | None | reCAPTCHA + honeypot | 50/mo | Polished, lower cap, branding on free. |
| EmailJS | None | Limited | 200/mo | Public key client-side, weakest spam story. |
| Resend + serverless | Yes | You implement | 3k/mo | Most control, own domain/DKIM, server-side zod. |

**Schema (shared):**
```ts
// src/lib/contactSchema.ts
import { z } from 'zod'
export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address so we can reply'),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.enum(['software', 'cloud-devops', 'consulting', 'other']),
  message: z.string().min(10, 'Tell us a bit more (10+ characters)'),
  consent: z.boolean().optional(),
  botcheck: z.string().max(0).optional(), // honeypot — must stay empty
})
export type ContactValues = z.infer<typeof contactSchema>
```
**Submit (Web3Forms):**
```tsx
const onSubmit = async (data: ContactValues) => {
  setStatus('submitting')
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: import.meta.env.VITE_WEB3FORMS_KEY, ...data }),
    })
    const json = await res.json()
    setStatus(json.success ? 'success' : 'error')
    if (json.success) reset()
  } catch { setStatus('error') }
}
```
**States:** `idle → submitting → success | error`; honeypot hidden + zod-validated empty; enable hCaptcha in the Web3Forms dashboard for volume; never silently fail — surface errors inline.

### 5.4 SEO & deep links on a static SPA (kept simple)
Mirrors the proven setup in the **dynamic-robotics-website** repo — no pre-render build step:
1. **`react-helmet-async`** sets per-page `<title>`, description, canonical, OG/Twitter, and JSON-LD at runtime (via the `<Seo>` component).
2. **Static defaults in `index.html`:** hardcode a sensible default `<title>` + OG/Twitter tags + Organization JSON-LD so social unfurls (LinkedIn/Slack/X) and first-paint crawls always have real metadata even before JS runs.
3. **Deep links:** a tiny `spa-404-fallback` Vite plugin copies the built `index.html` → `dist/404.html`. GitHub Pages serves `404.html` (URL preserved) for any unknown path, so `/services` etc. boot the SPA and React Router renders the right route on a hard refresh — no redirect rules, no server.
4. Commit a small static `public/sitemap.xml` (~5 routes) + `public/robots.txt`.

> **SEO tradeoff (honest):** content is client-rendered, so Google (which runs JS) indexes it fine, but the *initial* HTML body is empty. The static `index.html` OG tags cover link previews. If you later want guaranteed per-route pre-rendered HTML, add `vite-react-ssg` as a drop-in upgrade (§10) — not needed to launch.

### 5.5 Tooling
- **tsconfig:** `"strict": true`, `"noUncheckedIndexedAccess": true`, `"jsx": "react-jsx"`, `"moduleResolution": "Bundler"`, path aliases `@/* @components/* @sections/* @lib/* @hooks/* @assets/*`.
- **Vite:** `base: '/'`, `@vitejs/plugin-react`, the `spa-404-fallback` plugin (§5.8), `vite-tsconfig-paths` (mirror tsconfig aliases), `vite-plugin-image-optimizer` (sharp/svgo). `build.target: 'es2020'`.
- **ESLint + Prettier:** `@typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y` (enforces §5.8 a11y rules), `eslint-config-prettier`; Prettier with `prettier-plugin-tailwindcss` (auto-sort classes). `.editorconfig`.
- **Env (`.env.example`):**
  ```
  VITE_WEB3FORMS_KEY=
  VITE_SITE_URL=https://standleytech.com
  VITE_HCAPTCHA_SITEKEY=
  ```
  Only `VITE_`-prefixed vars reach the client; the Web3Forms access key is a public submission key, so it can be committed (in `.env` or `siteConfig`) — **no GitHub Actions secrets needed**, which keeps the deploy workflow identical to the robotics repo. A future Resend secret would live only in a Cloudflare Worker env, never in the client bundle.
- **Image/icon generation:** from `circle-mark-1024.png` produce `favicon.svg` (vectorized), `favicon.ico` (16/32), `apple-touch-icon.png` 180×180, `og-image.png` 1200×630 (mark centered on off-white/sage band + wordmark), `site.webmanifest` (theme `#163A2B`, maskable icon). Move `circle-mark-512/1024.png` into `src/assets/logo/`; serve raster imagery as WebP/AVIF with `srcset`, `loading="lazy"`, explicit `width`/`height` (prevent CLS).

### 5.6 Performance
- **Code-split lazy routes** in `routes.tsx`; wrap `<Outlet>` in `<Suspense>` with a light skeleton.
- **Images:** WebP/AVIF, responsive `srcset`, lazy below the fold, explicit dimensions, build-time compression; logo as SVG.
- **Fonts:** self-hosted variable Inter + Space Grotesk, `font-display: swap`, preload primary weight, Latin subset, system fallback.
- **Hosting:** GitHub Pages CDN serves gzip with long-cache hashed assets; enabling Cloudflare's proxy adds Brotli + edge caching. Preconnect only to the form endpoint.
- **Guardrails:** keep main-thread JS small (Framer Motion is the heaviest dep — import only what's used); run Lighthouse locally before launch.

### 5.7 Accessibility (WCAG 2.1 AA)
- One `<h1>`/page, ordered headings, landmarks (`header/nav/main/footer`), `<main id="main">` + skip link, `<nav aria-label>`.
- Visible focus rings (`focus-visible:ring-2 ring-gold-500 ring-offset-2`); never remove outlines; honeypot `tabIndex={-1}` + `aria-hidden`.
- Contrast per §2.1 (gold text only at `gold-800`; gold CTA uses `neutral-900` text; never color alone).
- Forms: `<label htmlFor>` on every field, `aria-required`/`aria-invalid`, errors linked via `aria-describedby` (icon + text), status via `role="status"`/`role="alert"` + `aria-live`.
- Reduced motion gated by `useReducedMotion()` + global CSS guard; `Reveal` renders static when reduced.
- `lang="en"`, meaningful `alt` (empty for decorative), 44px targets, 200% zoom reflow; on route change move focus to `<h1>`/`<main>` + update title. Lint enforced by `eslint-plugin-jsx-a11y`.

### 5.8 Hosting & deployment
**Reuse the exact GitHub Pages deploy setup that already works in your `dynamic-robotics-website` repo** + Cloudflare for DNS. Pages is static-only, which is why the no-backend **Web3Forms** form (§5.3) fits perfectly — and why no server, no secrets, and no extra build gates are needed.

- **Workflow** — `.github/workflows/deploy.yml`, copied from dynamic-robotics-website verbatim:

  ```yaml
  name: Deploy to GitHub Pages
  on:
    push: { branches: [main] }
    workflow_dispatch:
  permissions:
    contents: read
    pages: write
    id-token: write
  concurrency:
    group: pages
    cancel-in-progress: false
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with: { node-version: 20, cache: npm }
        - run: npm ci
        - run: npm run build            # emits dist/ + dist/404.html (spa-404-fallback plugin)
        - uses: actions/configure-pages@v6
        - uses: actions/upload-pages-artifact@v5
          with: { path: ./dist }
    deploy:
      needs: build
      runs-on: ubuntu-latest
      environment:
        name: github-pages
        url: ${{ steps.deployment.outputs.page_url }}
      steps:
        - id: deployment
          uses: actions/deploy-pages@v5
  ```
  Then **Settings → Pages → Source = GitHub Actions**. Pushing to `main` builds and deploys; nothing else to wire.

- **`vite.config.ts`** — same `spa-404-fallback` plugin as the robotics repo, but `base: '/'` because you're on a custom **apex** domain (the robotics repo uses a project sub-path only because it has no custom domain):

  ```ts
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  import fs from 'node:fs'
  import path from 'node:path'

  // Copy built index.html → 404.html so GitHub Pages serves the SPA shell
  // (URL preserved) for deep links like /services on a hard refresh.
  function spaFallback() {
    let outDir = 'dist'
    return {
      name: 'spa-404-fallback',
      apply: 'build',
      configResolved(c) { outDir = c.build.outDir },
      closeBundle() {
        const index = path.resolve(outDir, 'index.html')
        if (fs.existsSync(index)) fs.copyFileSync(index, path.resolve(outDir, '404.html'))
      },
    }
  }

  export default defineConfig({ base: '/', plugins: [react(), spaFallback()] })
  ```

- **No secrets needed:** the Web3Forms access key is a *public* submission key (spam is stopped by the honeypot/hCaptcha + domain allowlist), so it's safe to keep in the committed `.env`/`siteConfig` and gets baked at build — exactly why this workflow stays secret-free like the robotics one.
- **Custom domain:** commit `public/CNAME` = `standleytech.com`; set the same under **Settings → Pages → Custom domain**; tick **Enforce HTTPS**.
- **Cloudflare DNS** (point apex + `www` at GitHub Pages):

  | Type | Name | Value |
  |---|---|---|
  | A | `@` | `185.199.108.153` … `185.199.111.153` (all four) |
  | AAAA | `@` | `2606:50c0:8000::153` … `2606:50c0:8003::153` (all four) |
  | CNAME | `www` | `<your-github-username>.github.io` |

  **One gotcha:** set Cloudflare **SSL/TLS = Full** (never *Flexible* → redirect loop), and keep the records **DNS-only (grey cloud)** until GitHub issues the cert. Proxy (orange cloud) later if you want Cloudflare's CDN/analytics.
- **Analytics (optional):** Cloudflare Web Analytics — free, cookieless, one snippet.
- **Form upgrade path (later, optional):** a Cloudflare Worker `/api/contact` calling Resend with own-domain DKIM/SPF — see §10.

---

## 6. Content & SEO

### 6.1 Brand voice & taglines
- **Voice in three words:** *Steady. Sharp. Summit-bound.* — confident not boastful, clear over clever, calm/reliable, modern/crisp, partner-minded, aspirational but grounded.
- **Primary tagline:** *"Engineering your ascent."*
- **Supporting subhead:** *"Custom software, cloud infrastructure, and IT expertise that move your business to higher ground."*
- **CTA label bank:** Start the Climb · Begin the Ascent · Get a Free Consultation · Let's Talk · Plan Your Route · Book a Discovery Call · Explore Services.

### 6.2 Title tags & meta descriptions (titles ≤ ~60 chars; meta ≤ ~155; replace `[City]`)
| Page | Title | Meta description |
|---|---|---|
| **Home** | `Standley Technologies \| Custom Software, Cloud & IT Services` | Custom software, cloud infrastructure & managed IT for growing businesses. Standley Technologies engineers reliable technology built to scale. Let's talk. |
| **Services** | `Services \| Software Development, Cloud & DevOps, Managed IT` | Explore our three core services: custom software & app development, cloud & DevOps engineering, and IT consulting & managed services. Built to scale. |
| **About** | `About Standley Technologies \| Your Engineering Partner` | Meet Standley Technologies — a technology partner bringing software, cloud, and IT under one accountable roof. Reliable, modern engineering for the climb ahead. |
| **Achievements** | `Our Work & Credentials \| Standley Technologies` | See the technologies, certifications, and standards behind Standley Technologies — and how we partner with founding clients to deliver real results. |
| **Contact** | `Contact Standley Technologies \| Free Consultation` | Ready to start? Tell us about your project and get a free consultation. We reply within one business day with clear next steps. No jargon, no pressure. |

### 6.3 H1 strategy
One H1/page, keyword-bearing but human (H1 must be real text, not an image):
- **Home:** H1 = tagline *"Engineering your ascent."* + prominent H2 *"Custom Software, Cloud & IT Services."*
- **Services:** H1 = *"Software, Cloud & Managed IT Services"*; each pillar name an H2.
- **About:** H1 = *"Built for the climb ahead"* + H2 *"Your technology partner for software, cloud, and IT."*
- **Achievements:** H1 = *"Proof in the work."*
- **Contact:** H1 = *"Let's plan your route"* + H2 *"Get a free consultation."*
- **Hierarchy rule:** H1 → H2 per major section (pillar names as H2 on Services) → H3 for sub-items.

### 6.4 Target keywords
- **P1 — Custom Software:** primary `custom software development`, `web application development`, `mobile app development company`; long-tail `custom web app development for small business`, `react web development services`.
- **P2 — Cloud/DevOps:** primary `cloud migration services`, `devops consulting`, `AWS/Azure cloud consulting`; long-tail `cloud infrastructure setup for startups`, `CI/CD pipeline implementation`, `infrastructure as code Terraform services`.
- **P3 — IT/Managed:** primary `IT consulting services`, `managed IT services`, `managed service provider`; long-tail `small business IT support`, `fractional CTO services`.
- **Local (swap real area):** `software development company [City/State]`, `managed IT services [City/State]`, `IT consulting near me`, `cloud consultant [City/State]`.
- **Sequencing:** as a new domain, prioritize **long-tail + local** first (lower competition, higher intent); compete for head terms over time via blog + case studies.

### 6.5 Schema.org / JSON-LD (inject per route via `<Seo>`)
1. **Organization** (site-wide): name, logo (`circle-mark-1024.png` URL), URL, `sameAs` (LinkedIn/GitHub), `contactPoint`.
2. **LocalBusiness / ProfessionalService**: `name`, `areaServed` (use `address` only if a public one is desired), `email`, `telephone`, `priceRange`, `openingHours`.
3. **Service** (one per pillar on Services): `serviceType`, `provider` → Organization, `areaServed`.
4. **WebSite** + `potentialAction` (optional, low priority).
5. **BreadcrumbList** (once multi-level routes exist).
6. **FAQPage** (Contact/Services FAQ — eligible for rich results; seeds in §4.5).
- Plus: `sitemap.xml`, `robots.txt`, canonical tags, logo `alt="Standley Technologies summit mark logo"`.

---

## 7. Phased Implementation Roadmap

> Estimates assume one developer. Each phase ends in a working, committed state. **Dependencies are noted per phase.** Use a `TodoWrite`-tracked checklist as you go.

### Phase 0 — Project setup & tooling (~0.5–1 day) · *no dependencies*
- [ ] `npm create vite@latest . -- --template react-ts` (scaffold into existing repo, preserving the two PNGs).
- [ ] Install all dependencies (§8).
- [ ] Configure `tailwind.config.js` with the full token set (§2.2); `postcss.config.js`; `src/styles/index.css` with `@tailwind` + CSS vars + reduced-motion guard (§2.3).
- [ ] `tsconfig.json` strict + path aliases; `vite.config.ts` with `base: '/'`, `react`, the `spa-404-fallback` plugin (§5.8), `vite-tsconfig-paths`, `vite-plugin-image-optimizer`.
- [ ] ESLint (`jsx-a11y`, react-hooks) + Prettier (`prettier-plugin-tailwindcss`) + `.editorconfig`.
- [ ] Self-host fonts (`@fontsource-variable/inter`, `@fontsource/space-grotesk`); import in entry.
- [ ] Move `circle-mark-512/1024.png` → `src/assets/logo/`; vectorize → `logo.svg`; create mono gold/white variants.
- [ ] Generate `favicon.ico/svg`, `apple-touch-icon.png` (180), `og-image.png` (1200×630), `site.webmanifest`, `robots.txt` from the 1024 source.
- [ ] `.env.example` + local `.env` with `VITE_WEB3FORMS_KEY` (placeholder).
- [ ] Verify `npm run dev` + `tsc --noEmit` + lint pass. Commit.

### Phase 1 — Design system & layout shell (~2–3 days) · *depends on Phase 0*
- [ ] `lib/siteConfig.ts` — nav, services data, contact info, achievements slots, social (single source of editable copy).
- [ ] `lib/motion.ts` (Framer variants) + `Reveal.tsx` (reduced-motion aware) + `useReducedMotionPref` / `useScrollHeader` / `useFocusTrap` hooks.
- [ ] UI primitives: `Button` (gold/sage-outline/ghost, sizes), `Card`, `Badge`, `Container`, `SectionHeading`, `Eyebrow`, `Input`, `StatBlock`.
- [ ] Motif components: `RidgeDivider`, `PeakTransition`, `SummitLine` (SVGs §2.5).
- [ ] `Logo.tsx` (full + mono variants, correct alt).
- [ ] `RootLayout` (skip link, `<main id="main">`, ScrollRestoration, focus-on-route-change), `Header` (transparent→solid scroll, active underline), `Footer` (4-col on `summit-900`), `MobileMenu` (slide-in, scroll-lock, focus-trap, Esc, `aria-expanded`).
- [ ] `routes.tsx` (lazy route objects) + `App.tsx` `<Outlet>` in `<Suspense>` + `404`.
- [ ] `Seo.tsx` wrapper (helmet-async) + `lib/seo.ts` per-page builders + JSON-LD scaffolding.
- [ ] Verify nav, routing, mobile menu a11y. Commit.

### Phase 2 — Build the five pages (~4–6 days) · *depends on Phase 1*
- [ ] **Home** (§4.1): Hero, ServicesPreview triad, capability StatsStrip, ValueProps, ProcessSteps, FeaturedWork (placeholder pattern + empty state), Testimonial (placeholder), TechBadges, CtaBand. *(~1.5 days)*
- [ ] **Services** (§4.2): compact hero, sticky PillarNav chips (anchor scroll w/ header offset), 3 `ServicePillar` blocks (alternating bands, ridgeline dividers, per-pillar `?service=` CTA), PathHelper, ProcessSteps recap, CtaBand. *(~1.5 days)*
- [ ] **About** (§4.3): hero, Story/mission (`[FILL IN]`), Values cards, Differentiators, Founder card (placeholder, scalable), Approach, ServiceArea, CtaBand. *(~1 day)*
- [ ] **Achievements** (§4.4): hero, StandOn, capability ProofGrid (honest fallbacks), Certifications (in-progress labels), CaseStudies (`[SAMPLE]` cards + empty state), Testimonials (flagged/hidden), TechStack, FoundingClient, CtaBand — all wired to `siteConfig.achievements` with `placeholder` flags. *(~1.5 days)*
- [ ] **Contact** (§4.5): hero, two-column ContactForm + ContactDetails/WhatHappensNext panel, FAQ accordions. *(form logic in Phase 3)* *(~0.5 day)*
- [ ] Wire all copy from §4 into `siteConfig`; mark every `[FILL IN]`. Commit per page.

### Phase 3 — Contact form + integrations (~1–1.5 days) · *depends on Phase 2 (Contact page shell)*
- [ ] `lib/contactSchema.ts` (zod) + react-hook-form + `@hookform/resolvers/zod`.
- [ ] Web3Forms submit; honeypot `botcheck`; enable hCaptcha in dashboard + optional `VITE_HCAPTCHA_SITEKEY`.
- [ ] States: idle/submitting/success/error with spinner, `role=status`/`role=alert`, `aria-live`, reset on success, inline field errors (icon + text + `aria-describedby`).
- [ ] `?service=` prefill from per-pillar CTAs; consent checkbox; budget optional.
- [ ] Real end-to-end test: submit → email lands in inbox; verify error fallback shows the mailto.
- [ ] Privacy/Terms placeholder pages. Commit.

### Phase 4 — SEO, performance & a11y polish (~1.5–2 days) · *depends on Phases 1–3*
- [ ] Add static OG/meta defaults + Organization JSON-LD to `index.html`; commit `sitemap.xml` + `robots.txt`; verify the `spa-404-fallback` plugin emits `dist/404.html` and deep links survive a hard refresh.
- [ ] Per-page `<Seo>` content (§6.2) + Organization/LocalBusiness/Service/FAQPage JSON-LD (§6.5).
- [ ] Image optimization pass (WebP/AVIF, srcset, dimensions, lazy); confirm logo SVG.
- [ ] Full a11y audit: axe DevTools, keyboard-only walkthrough, focus order, reduced-motion, 200% zoom, contrast spot-checks vs §2.1.
- [ ] Lighthouse local run; fix until targets in §1.3 met. Commit.

### Phase 5 — Deploy & launch (~0.5 day) · *depends on Phase 4*
- [ ] Add `.github/workflows/deploy.yml` (copied from dynamic-robotics-website, §5.8); set **Settings → Pages → Source = GitHub Actions**. No secrets needed (the Web3Forms key is public).
- [ ] `public/CNAME` = `standleytech.com`; set custom domain in Pages settings; **Enforce HTTPS**.
- [ ] Cloudflare DNS: apex A/AAAA → GitHub Pages IPs, `www` CNAME → `<user>.github.io`; **SSL/TLS = Full**, **Always Use HTTPS = On**; keep records DNS-only until the cert issues.
- [ ] Push to `main` → Actions builds & deploys; confirm the run is green, `base: '/'` is correct, and deep links resolve via `404.html`.
- [ ] Cookieless analytics (Cloudflare Web Analytics) — optional.
- [ ] Submit `sitemap.xml` to Google Search Console; verify OG unfurls (LinkedIn/Slack/X); test contact form on production. Tag release.

**Total rough estimate:** ~10–15 working days for one developer. Critical path: Phase 0 → 1 → 2 → (3 ∥ 4) → 5.

---

## 8. Dependencies / Packages to Install

```bash
# Runtime
npm i react react-dom react-router-dom \
  react-helmet-async \
  react-hook-form zod @hookform/resolvers \
  framer-motion lucide-react \
  @fontsource-variable/inter @fontsource/space-grotesk

# Build
npm i -D vite @vitejs/plugin-react typescript \
  vite-tsconfig-paths \
  vite-plugin-image-optimizer sharp svgo
# (spa-404-fallback is a ~10-line inline plugin in vite.config.ts — no package needed)

# Styling
npm i -D tailwindcss postcss autoprefixer \
  @tailwindcss/forms @tailwindcss/typography \
  prettier prettier-plugin-tailwindcss

# Lint / format / types
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin \
  eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y \
  eslint-config-prettier \
  @types/react @types/react-dom
```

**Optional (captcha / Resend upgrade):**
```bash
npm i @hcaptcha/react-hcaptcha          # if enabling hCaptcha widget
# Cloudflare Worker side, only on upgrade:
npm i resend
```

---

## 9. Definition of Done & Launch Checklist

**Functionality**
- [ ] All 5 pages + 404 render correctly; nav (desktop + mobile) works; no dead ends (CTA band on every page).
- [ ] In-page anchors on `/services` scroll with sticky-header offset; per-pillar CTAs prefill `?service=`.
- [ ] Contact form sends real email; success/error/loading states verified on production; honeypot + hCaptcha active.

**Design & brand**
- [ ] Palette matches §2.1 tokens exactly; gold reserved as accent (~10%), sage-forward UI, white/off-white dominant.
- [ ] Space Grotesk + Inter self-hosted and rendering; type scale per §2.4.
- [ ] Logo correct (double ring intact, clear space, mono variants in footer); summit motifs used by suggestion, not literal.

**Accessibility (WCAG 2.1 AA)**
- [ ] One `<h1>`/page, ordered headings, landmarks, skip link, focus-on-route-change.
- [ ] All contrast pairs pass per §2.1 (no gold text below `gold-800`; gold CTA uses `neutral-900` text).
- [ ] Keyboard-only nav, visible focus rings, mobile-menu focus-trap + Esc; forms fully labeled with `aria-*`; reduced-motion honored; 200% zoom reflows; axe = 0 critical issues.

**SEO**
- [ ] `index.html` ships static OG/meta defaults + Organization JSON-LD; per-page `<Seo>` updates title/meta/canonical/OG/Twitter (§6.2) + JSON-LD (§6.5) client-side.
- [ ] `sitemap.xml` + `robots.txt` present and submitted; OG image unfurls (verified on LinkedIn/Slack/X); logo `alt` correct.

**Performance**
- [ ] Lighthouse ≥ Perf 95 / A11y 100 / Best Practices 95 / SEO 100 on production.
- [ ] Images WebP/AVIF + lazy + dimensioned; lazy routes; fonts `swap` + preloaded; no CLS.

**Content honesty**
- [ ] Zero fabricated stats/testimonials/logos; placeholders clearly marked; empty states graceful; all editable copy in `siteConfig.ts`.
- [ ] Owner-supplied `[FILL IN]` items inventoried (see below) and either filled or visibly placeholdered.

**Deploy**
- [ ] GitHub Pages live via the Actions deploy (no secrets); `public/CNAME` + custom domain + **Enforce HTTPS**; Cloudflare DNS (apex A/AAAA + `www` CNAME) resolving with **SSL = Full** (no redirect loop); deep links resolve via `404.html`; cookieless analytics (optional) live.

**Owner content inventory to collect (replaces `[FILL IN]`):** founding year, origin story, mission; founder name/bio/photo/LinkedIn; real contact email, phone (optional), service area/region, response-time SLA; real certifications (or "in progress") & formal partnerships; completed projects → case-study cards; client testimonials (+ permission); verified stats (true numbers only); final domain + email for form wiring.

---

## 10. Future Enhancements
- **Blog / content engine** — publish long-tail "cost/comparison" pieces first (high commercial intent), interlink to matching Service pillar with a CTA. Seed ideas: "Custom software vs. off-the-shelf," "How much does a custom web app cost? (2026)," "Cloud migration checklist," "What is Infrastructure as Code," "Managed IT vs. in-house," "Fractional CTO: when (and when not)," "5 signs your deployment is costing you money," "React vs. the rest," "Cloud security basics for SMBs," "How we scope a software project." Then **local landing pages** ("Managed IT services in [City]").
- **Booking / scheduling** — embed Cal.com / Calendly "Book a discovery call" alongside the form.
- **Headless CMS** — move `siteConfig` content (and blog/case studies) to Sanity/Contentful so non-devs edit without deploys.
- **Client portal** — authenticated area for project status, invoices, support tickets (graduates the brand from marketing site to product).
- **Contact-form upgrade** — Resend via a **Cloudflare Worker/Pages Function** (`/api/contact`) with own-domain DKIM/SPF and server-side zod + captcha verification.
- **Pre-rendering (SEO upgrade)** — if you want guaranteed per-route static HTML (faster first paint + bulletproof crawling/unfurling), drop in **`vite-react-ssg`** later. It reuses the existing React Router config and the build still deploys through the same `deploy.yml` — no infra change.
- **Richer proof** — real case studies with metrics, video testimonials, certification badges as earned, BreadcrumbList schema.
- **Analytics depth** — conversion-funnel events (CTA clicks, form starts/completions) in Plausible; periodic Lighthouse-CI trend tracking.
- **Internationalization / multi-region** — if service area expands.

---

*Build principle to keep front-of-mind: sage is the mountain, gold is the summit, white is the sky — most of the screen stays calm neutral so the gold truly feels like reaching the peak. Stay honest on proof, generous with whitespace, and subtle with motion.*
