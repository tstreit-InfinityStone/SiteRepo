# AGENT.md — Infinity Stone Solutions Website

## What This Project Is

Marketing website for **Infinity Stone Solutions Inc. (ISS)**, a dual-certified **WOSB + SDVOSB** federal IT services firm based in Denver, CO. The site targets government contracting officers, prime contractors, and federal IT buyers. It is a **lead-generation and credibility platform** — not an app, not a SaaS product, not a blog-first site.

ISS delivers across six core capability areas: Enterprise IT Modernization, Cloud Infrastructure, AI/Data/Geospatial Intelligence, Cybersecurity & Compliance, Program & Requirements Support, and Digital Experience & Custom Solutions. The firm has named past performance with U.S. Navy, SPAWAR, ICE/HSI, DOI/BLM, and SourceGas.

The dual WOSB + SDVOSB certification is the company's primary procurement differentiator — it lets federal buyers satisfy two mandatory SBA set-aside goals from one vendor. This should be treated as a headline-level fact, not a footnote.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 6.x (static output, Cloudflare adapter for API routes) |
| Language | TypeScript throughout |
| Styling | Tailwind CSS 4.x + CSS custom properties (`src/styles/global.css`, `src/styles/tokens.css`) |
| Deployment | Cloudflare Pages with Workers adapter (also GitHub Pages via CI) |
| Testing | Vitest (33 unit tests) |
| CI/CD | GitHub Actions: `astro check` → `vitest run` → `astro build` → deploy |
| Email | Resend |
| CAPTCHA | Cloudflare Turnstile |
| Error Monitoring | Sentry via `@sentry/cloudflare` (dynamic import, no-op without DSN) |
| Content | Astro content collections with Zod 4 schemas |
| Dependency Updates | Dependabot (weekly, npm + GitHub Actions) |
| Node | >= 22.12.0 |

## Project Documentation

Read these before making significant changes:

| Doc | Purpose | When to read |
|---|---|---|
| `codex-project-instructions.md` | Coding rules, architecture patterns, anti-patterns, brand system rules, workflow expectations | Before writing any code |
| `docs/context-tracker.md` | Rolling project state — routes, components, data files, roadmap, decisions, risks, next steps | Before and after every change |
| `docs/website-content-architecture.md` | Content layer, data layer, component tree, page composition pattern, form handling flow | When adding pages, components, or content |
| `docs/website-development-plan.md` | Completed sprints, pending items, deferred future considerations | When planning new work |
| `docs/marketing-intelligence.md` | Company profile, certifications, 6 capability areas, 5 past performance entries, NAICS/PSC codes, buyer personas, competitive positioning, tiered agency targets, content tone guidance | When writing any business copy or content |
| `docs/competitor-analysis.md` | 10 govcon competitor website analyses, buyer behavior data, ISS gaps and differentiators | When making messaging or positioning decisions |
| `docs/tyler-qualifications-injection.md` | Content bank for Tyler Streit's team profile (co-founder) | When updating team data |
| `docs/cathi-landauer-qualification-injection.md` | Content bank for Cathi Landauer's team profile (co-founder, 51% owner) | When updating team data |

## Architecture

### File Organization

```
src/
├── pages/                     Routes — thin composition files only
│   └── api/forms/             Server-side form handlers (contact, vendor, careers)
├── layouts/                   BaseLayout (SEO, meta, analytics), PrintLayout
├── components/
│   ├── layout/                SiteHeader (dropdown nav), SiteFooter (4-col grid)
│   ├── sections/              14 reusable page sections (composed into pages)
│   ├── ui/                    5 primitives: Button, CapabilityCard, Container, PageHero, SectionHeading
│   ├── islands/               5 interactive components (is:inline scripts, no React)
│   └── form/                  5 shared form components
├── content/
│   ├── capabilities/          6 entries → /capabilities/[slug]
│   └── insights/              7 articles → /insights/[slug]
├── data/                      11 TypeScript data modules (all business content lives here)
├── lib/                       Shared utilities (contact, SEO, rate-limit, sentry, forms/, paths, content)
├── styles/                    global.css + tokens.css (brand tokens, utility classes)
├── types/                     site.ts (11 exported types — all data types in one file)
└── assets/brand/              Logos and images (Astro-processed)

public/
├── team/                      Team member photos
├── logos/                     9 platform SVG logos (PlatformsStrip)
├── brand/                     Favicon, OG card, logo files
├── .well-known/               security.txt
└── _headers                   Security headers (CSP, HSTS, X-Frame-Options, etc.)
```

### Critical Patterns

**Path prefix:** Every internal `href` MUST use `withBase()` from `@/lib/paths`. Raw `/path` links break on GitHub Pages where the base path is `/<repo-name>`. The `stripBase()` function removes the prefix for route matching.

**Import alias:** Use `@/` for `src/` imports (e.g., `@/data/brand`, `@/types/site`, `@/lib/paths`).

**Data centralization:** All copy, brand values, and business content live in `src/data/`. Components import from data files — never inline business text in markup. This makes the site owner-editable without touching component code.

**Type safety:** Every data structure has a type in `src/types/site.ts`. Add types there first, then create data files that implement them.

**Static output with API routes:** The site is statically generated (`output: 'static'`). The Cloudflare adapter enables server-side API routes under `src/pages/api/` that run as Workers at runtime.

**CSS custom properties:** Brand colors and fonts are defined as CSS custom properties in `BaseLayout.astro` (injected from `brand.ts`) with static fallbacks in `tokens.css`. Components reference `var(--color-primary)`, `var(--font-display)`, etc. — never hardcoded hex values.

**Animation system:** Add `fade-up` class for scroll reveal (handled by `ScrollAnimations.astro`). Wrap siblings in `stagger-children` for sequential 80ms delays. All animations respect `prefers-reduced-motion`.

**Analytics tracking:** Use `data-track-event="event_name"` and `data-track-label="label"` attributes on clickable elements for automatic GTM/GA4 event tracking.

### Astro-First

- Default to `.astro` files for pages and components
- Use `is:inline` scripts for interactivity (tabs, accordions, dropdowns, mobile nav, scroll animations, counters)
- Do NOT use React islands unless vanilla JS is clearly insufficient — React is installed but rarely used
- Keep hydrated islands rare and intentional
- All island scripts run on `astro:page-load` event (supports Astro's client-side navigation / view transitions)

### Navigation Structure

Main nav uses dropdown menus configured in `src/data/navigation.ts`:

- **Solutions** (dropdown) → Capabilities, Who We Serve, Past Performance
- **Insights** (standalone link)
- **About** (dropdown) → About, Capability Statement
- **Contact** (dropdown) → Contact, Partners, Careers

Desktop dropdowns use CSS `group-hover:` (no JS). Mobile uses JS collapsible groups with `data-mobile-nav-group-toggle`. The `NavigationItem` type supports optional `children` array. Footer navigation is flat and separate from main nav.

### Content Collections

**New capability:** Create `src/content/capabilities/slug.md` with required frontmatter (title, order, icon, summary, heroDescription, excerpt, buyerProblems[3+], outcomes[3+], includedWork[3+], idealBuyers[2+]). Auto-appears on `/capabilities` index and gets its own detail page. Capabilities are sorted by the `order` field.

**New insight:** Create `src/content/insights/slug.md` with title, description, publishDate. Auto-appears on `/insights`, gets its own page, and shows in homepage FeaturedInsights if among the 3 most recent. Sorted newest-first by publishDate. Set `draft: true` to hide.

**New team member:** Add photo to `public/team/`, add entry to `src/data/team.ts`.

**New sector:** Add entry to `src/data/sectors.ts`. Auto-appears as a new tab on `/who-we-serve`.

### Form Handling Pipeline

All 3 form endpoints (`/api/forms/contact`, `/api/forms/vendor`, `/api/forms/careers`) follow the same pipeline:

1. Zod schema validation (schemas in `src/lib/forms/`)
2. Honeypot check
3. Rate limit check (sliding-window, in-memory, 5 req / 60s per IP)
4. Turnstile token verification (5-second AbortController timeout)
5. File magic number validation (careers only — checks first 4 bytes for PDF `%PDF`, DOCX `PK\x03\x04`, DOC `\xD0\xCF\x11\xE0`)
6. Send email via Resend (HTML with `escapeHtml()` for XSS prevention)
7. Return JSON result → client-side JS displays success/error banner

Error messages are sanitized — generic to users, `console.error` + `captureException()` for details.

**Environment variables needed:**
- Server: `RESEND_API_KEY`, `CONTACT_FROM_ADDRESS`, `CONTACT_TO_ADDRESS`, `TURNSTILE_SECRET_KEY`, `SENTRY_DSN`
- Public: `PUBLIC_SITE_URL`, `PUBLIC_GTM_CONTAINER_ID` or `PUBLIC_GA4_MEASUREMENT_ID`

### SEO

- Per-page `<title>`, `<meta description>`, canonical URL via `BaseLayout` props
- Structured data (JSON-LD) for Organization and BreadcrumbList via `src/lib/seo.ts`
- Title format: `"Page Title | Infinity Stone Solutions Inc."`
- Description fallback: `siteConfig.positioning`
- OG + Twitter meta tags fully rendered
- Sitemap generated by `@astrojs/sitemap` (filters `/print` and `/404`)
- `robots.txt` generated dynamically
- SVG favicon at `/brand/iss-mark.svg` with PNG fallback

### Component CSS Classes

Defined in `src/styles/global.css` — use these instead of reinventing:

| Class | Purpose |
|---|---|
| `.section-space` | Standard section padding (py-16 / md:py-20) |
| `.section-space-tight` | Tighter section padding (py-12 / md:py-16) |
| `.section-grid` | Responsive 1/2/3 column grid |
| `.panel` | Bordered card with shadow, rounded-3xl, hover lift |
| `.panel-static` | Panel without hover effect |
| `.panel-muted` | Panel with lighter gradient background |
| `.eyebrow` | Uppercase small tracking text in secondary color |
| `.rich-copy` | Prose styling for markdown content (tables, lists, links) |
| `.fade-up` | Scroll reveal animation (use with ScrollAnimations) |
| `.stagger-children` | Sequential child reveal delays (up to 6 children) |
| `.nav-link` | Nav item with animated underline on hover/active |
| `.hero-grid` | 2-column hero layout (1.15fr / 0.85fr) |

## Coding Standards

- TypeScript everywhere
- Tailwind for styling — no ad hoc CSS unless truly necessary
- Clean, boring, maintainable code over clever abstractions
- Mobile-first responsive design — treat this as a core requirement, not a polish task
- Keep brand/marketing content in `src/data/` files, not inline in components
- Do not hardcode brand colors, logo paths, or CTA labels in components
- Do not duplicate markup patterns — extract to shared components
- Comment only where it helps a beginner understand intent
- Prefer extending existing patterns over creating parallel ones
- Assume the project owner is not a trained developer — code should be easy to read and edit

## Terminology

Use these terms consistently across code, copy, and conversation:

| Use this | Not this | Why |
|---|---|---|
| Capabilities | Services | ISS brand language |
| Who We Serve | Industries / Sectors | ISS brand language |
| Capability Statement | Brochure / Overview | Federal procurement term |
| Past Performance | Case Studies | Federal procurement language |
| Proof signals | Trust badges / Credibility | Internal term for trust-building elements |
| Insights | Blog / Articles | ISS brand language |
| Set-aside eligible | Preferred vendor | Procurement-accurate language |
| Named delivery history | Proven track record | Evidence over buzzwords |
| Brand system | Design system | Owner-editable content emphasis |

**Content tone:** Specific, procurement-aware, evidence-driven. Avoid "innovative solutions," "trusted partner," "leading provider," and other govcon clichés. Use "past performance" not "experience." Focus on outcomes, not capabilities in the abstract. Every claim should be traceable to named delivery.

## Business Context for Content Decisions

When writing or editing any business-facing copy, understand:

- **Primary audience:** Federal contracting officers (COs), government program managers, prime contractor subcontract managers, government CIOs. These buyers value procurement compliance signals (UEI, CAGE, SAM, NAICS codes) over marketing polish.
- **Dual certification advantage:** WOSB + SDVOSB together is rare. A single vendor giving a prime two SBA scorecard credits is a concrete procurement advantage. Treat this as a headline, not a badge.
- **VA is the anchor opportunity:** The VA's Vets First mandate legally requires SDVOSB-first consideration before any other procurement vehicle.
- **40–80% of federal buyers identify a preferred vendor before the RFP.** The website's job is to win that pre-RFP preference through credibility, specificity, and procurement readiness signals.
- **ISS is not a staffing body shop.** It is a solutions provider with named past performance and a credentialed team. Content should never position ISS as providing "resources" or "staff augmentation" — it delivers capability.
- **Staffing model:** ISS uses a blended model (core direct employees + long-term contracted professionals managed by ISS). Emphasize management accountability and personnel continuity, not a strict W-2-only model.
- **Tiered agency targets:** Tier 1 (highest probability): VA, ICE/HSI, DOI/BLM, NAVWAR/SPAWAR, NGA. Tier 2: FBI, DEA, CBP, USGS, EPA. Content should resonate with these agencies first.

## Security Practices

- CSP, HSTS (`max-age=31536000; includeSubDomains`), X-Frame-Options DENY, Referrer-Policy, Permissions-Policy in `public/_headers`
- Turnstile verification with 5-second AbortController timeout on all forms
- Honeypot fields on all forms
- Rate limiting on all form endpoints (5 req / 60s per IP, in-memory)
- File magic number validation (not just MIME type) for resume uploads
- Sanitized error messages — never expose internals to users
- `security.txt` at `public/.well-known/security.txt`
- Sentry middleware catches uncaught errors (`src/middleware.ts`)
- HTML email content escaped with `escapeHtml()` to prevent XSS

## Known Issues

- **AnimatedCounter "25+" bug** — the credentialed-team proof signal counter may show "0+" instead of animating to 25. The data in `proof.ts` is correct (`stat.value: 25`); root cause needs investigation in `AnimatedCounter.astro` and/or `ProofStrip.astro`.
- **Cathi Landauer profile** — awaiting photo and profile text approval. Draft content bank at `docs/cathi-landauer-qualification-injection.md`. Do not publish without owner verification.
- **Founder placeholders** — `src/data/team.ts` has `[Name]` and `[Title TBD]` for the founder entry. Must be completed before launch.
- **Sentry DSN** — integration code is ready but DSN is not configured. Error monitoring is a no-op until `SENTRY_DSN` env var is set.
- **Resend domain** — `infinitystonesolutions.com` must be verified in Resend dashboard before forms can send email. All 3 form handlers surface delivery errors rather than false success.
- **Phone number inconsistency** — `src/data/site.ts` has `(720) 432-4633` while `src/data/capability-statement.ts` has `720-432-4663`. Different last digits (4633 vs 4663). Must be verified before launch.

## What NOT to Do

- Do not turn the site into a React app — Astro + `is:inline` scripts handle all current interactivity
- Do not add heavyweight dependencies for simple UI work
- Do not create giant utility files — keep modules focused
- Do not put business data inline in page files — use `src/data/` or `src/content/`
- Do not skip mobile considerations — responsive is a core requirement
- Do not overpromise in copy — ISS content is specific, evidence-driven, and procurement-aware
- Do not expose internal error details to users in form responses
- Do not add features, refactoring, or "improvements" beyond what is requested
- Do not use bare `/path` hrefs — always use `withBase()` from `@/lib/paths`
- Do not hardcode CSS hex colors — use `var(--color-*)` custom properties
- Do not write content that positions ISS as a staffing/body shop — it delivers solutions
- Do not claim current Top Secret clearance for the founder — the clearance is previous/historical
- Do not claim ISS is a "partner" of Palantir, Esri, or cloud vendors unless explicitly confirmed — the site references platform experience, not vendor partnerships

## After Making Changes

1. Run `npm run check` (TypeScript) and `npm test` (Vitest) to verify. Both must pass — CI gates on these.
2. **Always update `docs/context-tracker.md`** — this is mandatory after every meaningful change, not optional. Keep current state, roadmap, decisions, risks, and next steps accurate. Follow the file's own Update Rules section.
3. Keep `docs/website-development-plan.md` aligned if completing or adding roadmap items.
4. If the change adds a new component, data file, route, or architectural decision, ensure it's reflected in `docs/website-content-architecture.md`.
