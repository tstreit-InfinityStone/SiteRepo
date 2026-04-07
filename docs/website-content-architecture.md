# Website Content Architecture

How the Infinity Stone Solutions website is structured, from data sources to rendered pages.

## Content Layer

```
src/content/                    Astro content collections (markdown + Zod schemas)
├── capabilities/               6 capability entries — generate /capabilities/[slug] pages
│   ├── ai-data-and-geospatial-intelligence.md
│   ├── cloud-and-infrastructure.md
│   ├── cybersecurity-and-compliance.md
│   ├── digital-experience-and-custom-solutions.md
│   ├── enterprise-it-modernization.md
│   └── program-and-requirements-support.md
└── insights/                   7 insight articles — generate /insights/[slug] pages
    ├── buyers-guide-small-it-firms.md
    ├── evaluate-small-it-partner-federal-work.md
    ├── find-qualified-small-it-subcontractors.md
    ├── set-aside-guide-for-it-buyers.md
    ├── what-cos-look-for-small-it-vendor.md
    ├── when-prime-should-team-wosb-sdvosb.md
    └── wosb-sdvosb-certifications-for-primes.md
```

Content collections are defined in `src/content.config.ts` with Zod schemas.

## Data Layer

```
src/data/                       TypeScript data modules (short structured data)
├── brand.ts                    Brand identity: name, logo refs, CTA labels, trust badges
├── capability-statement.ts     Procurement artifact: registration, NAICS/PSC, competencies, differentiators
├── case-studies.ts             Case study summaries
├── contact.ts                  Contact form config: title, intro, reassurance, success message
├── credentials.ts              Team credential details
├── navigation.ts               Navigation arrays: main (with dropdown children), footer, contact, legal
├── proof.ts                    Proof signals: SAM, delivery history, credentials, AI, past performance
├── redirects.ts                URL redirect mappings (old routes → new routes)
├── sectors.ts                  Who We Serve: sector definitions with agencies, concerns, capabilities
├── site.ts                     Site identity: legal name, phone, email, hero copy, differentiators
└── team.ts                     Leadership team: name, title, bio, credentials, photo path
```

## Component Architecture

```
src/components/
├── layout/                     Site-level structure
│   ├── SiteHeader.astro        Sticky header with dropdown nav + mobile hamburger
│   └── SiteFooter.astro        Footer with nav columns, contact info, legal links
│
├── sections/                   Reusable page sections (composed into pages)
│   ├── CapabilityHighlights    Grid of capability cards (used on homepage, /capabilities, /capabilities/[slug])
│   ├── CapabilityStats         Animated stat counters for capability metrics
│   ├── CapabilityStatementCta  CTA for capability statement download
│   ├── CredibilitySection      Trust badges and credibility signals
│   ├── DualCertSection         WOSB/SDVOSB dual certification callout
│   ├── FeaturedInsights        3 most recent insights (homepage)
│   ├── FinalCtaSection         Bottom-of-page call-to-action
│   ├── HeroSection             Homepage hero
│   ├── InsightCta              CTA panel after insight articles
│   ├── PlatformsStrip          Technology platform logos/names
│   ├── ProofStrip              4-up proof signal cards with animated counters
│   ├── WhoWeServePreview       Sector preview for homepage
│   └── WhyIssSection           Differentiator highlights
│
├── ui/                         Small reusable primitives
│   ├── Button.astro            Link/button with variants, analytics tracking
│   ├── CapabilityCard.astro    Accordion card for capability entries
│   ├── Container.astro         Max-width centered content wrapper
│   ├── PageHero.astro          Standard page hero with title + description
│   └── SectionHeading.astro    Section title + optional description
│
├── islands/                    Interactive components (is:inline scripts)
│   ├── AnimatedCounter.astro   Count-up animation triggered by IntersectionObserver
│   ├── CapabilityShowcase.astro Capability feature showcase
│   ├── MobileNav.astro         Slide-out mobile menu with collapsible groups
│   ├── ScrollAnimations.astro  Fade-up scroll reveal animations
│   └── TabGroup.astro          Accessible tab interface (Who We Serve sectors)
│
└── form/                       Shared form components
    ├── FieldError.astro        Per-field validation error display
    ├── FormScripts.astro       Submit-disable + analytics event scripts
    ├── FormStatusBanners.astro Success/error result banners
    ├── HoneypotField.astro     Hidden spam-trap input
    └── TurnstileWidget.astro   Cloudflare Turnstile CAPTCHA integration
```

## Page Composition Pattern

Each page in `src/pages/` is primarily composition — importing sections and data:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import SectionA from '@/components/sections/SectionA.astro';
import SectionB from '@/components/sections/SectionB.astro';
import { someData } from '@/data/something';
---

<BaseLayout title="Page" description="..." canonicalPath="/page">
  <SectionA data={someData} />
  <SectionB />
</BaseLayout>
```

Pages should be thin — business logic lives in `src/lib/`, data in `src/data/`, content in `src/content/`, and presentation in `src/components/`.

## Form Handling Flow

```
User submits form
  → Browser POSTs to /api/forms/{type}
  → Server handler:
      1. Zod schema validation
      2. Honeypot check
      3. Rate limit check (sliding-window, in-memory)
      4. Turnstile token verification (5s timeout)
      5. File magic number validation (careers only)
      6. Send email via Resend
      7. Return JSON result
  → Client-side JS displays success/error banner
```

## Styles

Global styles in `src/styles/global.css`:
- CSS custom properties for brand colors, typography
- Tailwind `@theme` integration
- Utility classes: `.section-space`, `.section-space-tight`, `.section-grid`, `.panel`, `.panel-muted`, `.eyebrow`
- Nav link underline animation (`.nav-link::after`)
- Accordion animation (`.accordion-body`, `.accordion-chevron`)
- Scroll reveal (`.fade-up`, `.stagger-children`)

## SEO

- Per-page `<title>`, `<meta description>`, canonical URL via `BaseLayout` props
- Structured data (JSON-LD) for Organization and BreadcrumbList via `src/lib/seo.ts`
- Sitemap generated by `@astrojs/sitemap` (filters out `/print` and `/404` routes)
- `robots.txt` generated dynamically by `src/pages/robots.txt.ts`

## Adding New Content

### New Capability
1. Create `src/content/capabilities/new-capability.md` with required frontmatter fields
2. It automatically appears on `/capabilities`, gets its own `/capabilities/new-capability` page, and shows in related capabilities

### New Insight Article
1. Create `src/content/insights/article-slug.md` with title, description, publishDate
2. It automatically appears on `/insights`, gets its own `/insights/article-slug` page, and appears in Featured Insights on the homepage if it's one of the 3 most recent

### New Team Member
1. Add photo to `public/team/`
2. Add entry to `src/data/team.ts`
3. Appears on `/about` leadership section

### New Sector (Who We Serve)
1. Add entry to `src/data/sectors.ts`
2. Automatically appears as a new tab on `/who-we-serve`
