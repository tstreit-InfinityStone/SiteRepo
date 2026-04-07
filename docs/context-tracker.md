# Infinity Stone Solutions Website Context Tracker

## Project
Rebuild the Infinity Stone Solutions website into a modular, owner-editable marketing site that is easier to design, maintain, and expand.

## Canonical Documents
- strategy and stack brief: `website-development-plan.md`
- page and content blueprint: `website-content-architecture.md`
- coding and AI-agent guardrails: `codex-project-instructions.md`
- rolling status and next-step tracker: `context-tracker.md`

## Current State
The website is past the v1 baseline and into a fully featured pre-launch state. All core pages are implemented, content marketing pipeline is active (7 insight articles), security hardening is complete, testing infrastructure is in place, navigation has been restructured into dropdown menus, and three procurement tools have been added to the site. The site is deployment-ready pending production secrets and domain verification.

### Implemented Routes
- `Home` — full hero, proof strip, dual cert section, capability highlights, platforms strip, why ISS, who we serve preview, featured insights (3 most recent), capability statement CTA, final CTA
- `Capabilities` — tabbed capability groups, platforms strip, capability statement CTA
- `Capability Detail` — 6 slugs (individual capability pages)
- `Who We Serve` — sector cards, proof signals, CTA
- `Capability Statement` — web-native print layout, PDF download box, accordion sections, 1-page summary link
- `Past Performance` — 5 named case studies (U.S. Navy, SPAWAR, ICE/HSI, DOI/BLM, SourceGas), breadcrumb schema
- `About` — company overview, leadership + team section (2 members), explicit image dimensions to prevent layout shift
- `Contact` — inquiry form, Turnstile, Resend, honeypot, rate limiting
- `Partners` — vendor inquiry form, Turnstile, Resend, honeypot, rate limiting
- `Careers` — resume upload form (PDF/Word, 10 MB max, magic number validation), Turnstile, Resend with attachment, honeypot, rate limiting
- `Insights Index` — article cards for all 7 insight articles
- `Insight Detail` — 7 slugs (individual article pages with InsightCta)
- `Tools Hub` — `/tools` landing page listing all 3 procurement tools with descriptions
- `Set-Aside Eligibility Checker` — `/tools/set-aside-checker` — live result cards for WOSB/SDVOSB set-aside eligibility, VA Vets First, sole-source authority; inputs: NAICS code, agency, contract value; all client-side
- `Subcontract Calculator` — `/tools/subcontract-calculator` — real-time WOSB/SDVOSB goal progress bars before/after ISS engagement; dual credit banner; inputs: 6 dollar fields + tier radio; all client-side
- `Readiness Assessment` — `/tools/assessment` — 8-step wizard (sector + 6 dimension questions) → profile cards mapped to ISS capabilities with past performance evidence; URL-hashable results; all client-side
- `Privacy` — legal page
- `404` — custom error page

### Form API Endpoints (3)
- **`/api/forms/contact`** — general inquiry with Zod validation + honeypot + rate limiting + Turnstile (5s timeout) + Resend
- **`/api/forms/vendor`** — partner/vendor inquiry with Zod validation + honeypot + rate limiting + Turnstile (5s timeout) + Resend
- **`/api/forms/careers`** — resume upload with file magic number validation (PDF/DOCX/DOC) + Zod validation + honeypot + rate limiting + Turnstile (5s timeout) + Resend with attachment

### Navigation
- **Main nav (dropdown menus):**
  - **Solutions** (dropdown) → Capabilities, Capability Statement (indented), Who We Serve, Past Performance, Tools & Calculators
  - **Insights** (standalone link)
  - **About** (standalone link)
  - **Contact** (dropdown) → Contact, Partners, Careers
  - **CTA button** — "View Capability Statement" pill button at far right of desktop nav bar
- **Desktop:** CSS `group-hover:` dropdowns, no JS required; chevron rotation on hover
- **Mobile:** collapsible groups with tap-to-expand, JS toggle via `data-mobile-nav-group-toggle`
- **Footer — Explore:** Capabilities, Who We Serve, Capability Statement, About, Past Performance, Insights
- **Footer — Contact:** Contact, Partners, Careers
- **Footer — Policies:** Privacy

### Interactive Islands (tools)
- `Assessment.astro` — 8-step readiness wizard, vanilla JS state machine, URL hash encode/restore
- `SetAsideChecker.astro` — live set-aside result cards, 18 ISS NAICS codes, SBA program rules as static constants
- `SubcontractCalculator.astro` — real-time WOSB/SDVOSB goal math, progress bars, dual credit banner

### Active Components (sections)
- `HeroSection` — homepage hero with headline, subheadline, dual CTA
- `ProofStrip` — credential cards with animated counters (18+ SAM, 25+ credentials)
- `DualCertSection` — dark navy gradient WOSB + SDVOSB procurement detail section
- `PlatformsStrip` — "Platforms We Deliver On" — 9 platform cards with full-card colored logo overlays at 7% opacity
- `CapabilityHighlights` — capability group cards with height equalization script
- `WhyIssSection` — 3–5 differentiators
- `WhoWeServePreview` — sector audience preview
- `CapabilityStatementCta` — centered 3-button download panel (View, Full PDF, 1-Page Summary)
- `FinalCtaSection` — "Ready to move a program forward?" — 3 buttons
- `FeaturedInsights` — 3 most recent insight articles (homepage)
- `InsightCta` — CTA panel after each insight article
- `CredibilitySection` — trust badges and credibility signals
- `PageHero` — reusable interior page hero component
- `SiteHeader` — sticky header with dropdown nav menus + mobile nav island
- `SiteFooter` — 4-column grid (brand | Explore | Contact | Policies)

### Form Components (shared)
- `FormStatusBanners` — success/error result banners
- `TurnstileWidget` — Cloudflare Turnstile CAPTCHA integration
- `HoneypotField` — hidden spam-trap input
- `FieldError` — per-field validation error display
- `FormScripts` — submit-disable + analytics event scripts

### Platform Logos (public/logos/)
9 brand-colored SVG files used in PlatformsStrip cards (full-card overlay, 7% opacity, no grayscale):
- `palantir.svg`, `arcgis.svg`, `azure.svg`, `aws.svg`, `servicenow.svg`, `workday.svg`, `oracle.svg`, `linux.svg`, `sccm.svg`

### Data Files
- `src/data/brand.ts` — logo, colors, CTAs, asset URLs (capabilityStatement, capabilityStatementOnePage)
- `src/data/site.ts` — business name, phone, email, location, footer summary, hero copy, differentiators
- `src/data/navigation.ts` — mainNavigation (dropdown groups), footerNavigation, contactNavigation, legalNavigation
- `src/data/capability-statement.ts` — procurement artifact: registration, NAICS/PSC, competencies, differentiators
- `src/data/case-studies.ts` — 5 named past performance entries
- `src/data/team.ts` — 2 team member entries (founder + co-founder)
- `src/data/redirects.ts` — URL redirect rules
- `src/data/proof.ts` — proof signals: SAM, delivery history, credentials, AI, past performance
- `src/data/sectors.ts` — Who We Serve: sector definitions with agencies, concerns, capabilities
- `src/data/credentials.ts` — team credential details

### Library Files
- `src/lib/contact.ts` — Turnstile verification (5s AbortController timeout), Resend email, escapeHtml utility
- `src/lib/content.ts` — content collection helpers
- `src/lib/seo.ts` — structured data (Organization + BreadcrumbList JSON-LD)
- `src/lib/rate-limit.ts` — sliding-window in-memory rate limiting
- `src/lib/sentry.ts` — Sentry error capture via dynamic import (no-op without DSN)
- `src/lib/paths.ts` — `withBase()` and `stripBase()` path utilities
- `src/lib/forms/contact.ts` — contact form validation schema
- `src/lib/forms/vendor.ts` — vendor form validation schema
- `src/lib/forms/careers.ts` — careers form validation schema
- `src/lib/forms/shared.ts` — shared form utilities

### Content Collections
- `src/content/capabilities/` — 6 capability entries generating `/capabilities/[slug]` pages
- `src/content/insights/` — 7 insight articles generating `/insights/[slug]` pages

### SEO Infrastructure
- `@astrojs/sitemap` active with filter (excludes `/print`, `/404`)
- `<link rel="icon">` — `iss-mark.svg` SVG favicon
- Apple-touch-icon and PNG fallback favicons in `BaseLayout.astro`
- Each page has `canonicalPath` and `structuredData` (Organization + BreadcrumbList JSON-LD)
- `robots.txt` generated at build

### Security Infrastructure
- HSTS (`max-age=31536000; includeSubDomains`)
- CSP with `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `upgrade-insecure-requests`
- Turnstile verification with 5-second AbortController timeout
- Sanitized error messages in all form handlers (generic to user, `console.error` for details)
- `public/.well-known/security.txt` with contact email
- File magic number validation for resume uploads (PDF, DOCX, DOC)
- Sentry error monitoring integration (dynamic import, no-op without DSN)
- Rate limiting on all form endpoints (sliding-window, in-memory)
- Honeypot fields on all forms
- Astro middleware catches and reports uncaught errors to Sentry

### Testing Infrastructure
- Vitest with 33 unit tests across 5 test files
- Tests cover form validation schemas, rate limiting, HTML escaping, contact utilities
- GitHub Actions CI: type check → tests → build → deploy
- Dependabot for weekly dependency updates (npm + GitHub Actions)

### Build Status
- `npm run build` passes — 0 errors
- `npm run check` passes — 0 TypeScript errors
- `npm test` passes — 33 tests

### Known Issues
- **AnimatedCounter "25+" bug** — the credentialed-team proof signal counter may show "0+" and not animate to 25. The `stat.value` (25) in `proof.ts` is correct; root cause is under investigation.
- **Cathi Landauer profile** — awaiting photo and profile text approval. Qualification injection doc at `docs/cathi-landauer-qualification-injection.md`.
- **Sentry DSN** — integration is ready, needs project creation at sentry.io and DSN added to environment variables.

### Current Operational Blocker
Resend rejects outbound email until `infinitystonesolutions.com` is verified in the Resend dashboard. All three form handlers surface provider-side delivery errors rather than false success states.

---

## Current Goal
Move from fully implemented pre-launch site to production deployment by verifying domain and email delivery, configuring production secrets, testing all form flows, and finalizing business-sensitive copy.

---

## Roadmap Status
1. define website goals, audience, and constraints — **completed**
2. define page architecture and content placement — **completed**
3. define coding guardrails and owner-editable content rules — **completed**
4. lock stack and hosting direction — **completed**
5. normalize terminology across all planning docs — **completed**
6. create the website build plan from these docs — **completed**
7. scaffold the Astro project and core architecture — **completed**
8. build shared layout, navigation, brand system, and content model — **completed**
9. build v1 pages, capability routes, redirects, and contact workflow — **completed**
10. verify local build and implementation integrity — **completed**
11. build Partners page with vendor inquiry form — **completed**
12. build Careers page with resume file upload — **completed**
13. homepage copy and visual polish pass (marketing-intelligence-driven) — **completed**
14. site-wide eyebrow removal and button color fix — **completed**
15. capability statement page refinements (download box, accordion fix) — **completed**
16. SEO pass — sitemap, favicon, canonical paths, structured data — **completed**
17. dual certification section (WOSB + SDVOSB) on homepage — **completed**
18. "Platforms We Deliver On" strip with 9 brand-colored logo overlays — **completed**
19. Past Performance page (`/past-performance`) with 5 named case studies — **completed**
20. About page expanded with leadership + team section — **completed**
21. footer restructured to 4-column layout (Explore / Contact / Policies) — **completed**
22. CapabilityStatementCta refreshed — centered, 3 buttons, markety — **completed**
23. FinalCtaSection — button visibility fix, 1-Page Summary button added — **completed**
24. header nav text centered for multi-line labels — **completed**
25. Past Performance added to main nav and footer nav — **completed**
26. content marketing — 7 insight articles, index page, FeaturedInsights on homepage — **completed**
27. component consolidation — CapabilityHighlights, shared form components — **completed**
28. testing and CI — Vitest, 33 tests, GitHub Actions pipeline, Dependabot — **completed**
29. security hardening — HSTS, CSP, Turnstile timeout, sanitized errors, security.txt, Sentry, rate limiting, file validation — **completed**
30. navigation dropdown menus — Solutions, Insights, About, Contact groups — **completed**
31. bug fixes — about page image sizing, capability card height equalization, proof label deduplication — **completed**
32. navigation refinements — Capability Statement moved to Solutions dropdown (indented), About made standalone, CTA button added to desktop nav bar, view transition fix via `transition:name="site-header"` — **completed**
33. procurement tools — Set-Aside Checker, Subcontract Calculator, IT Readiness Assessment, /tools hub page — **completed**
34. complete launch hardening, production configuration, and deployment — **next**

---

## Major Decisions So Far
1. The project is a marketing website focused on credibility and lead generation.
2. The primary early audience is government services procurers and related buyers.
3. The website should remain flexible enough to support future private-sector growth.
4. The site should use `Capabilities` as the main organizing language instead of `Services`.
5. Core pages are Home, Capabilities, Who We Serve, Capability Statement, About, Contact, Partners, Careers, Past Performance, and Insights.
6. `Insights` now appears in main nav as a standalone link (7 articles published).
7. `Careers` is accessible via the Contact dropdown; `Past Performance` via Solutions dropdown.
8. Proof signals surface prominently across the site — not just on one page.
9. Preferred stack: Astro 6.x + TypeScript + Tailwind CSS 4.x + `is:inline` scripts + Cloudflare Workers.
10. Centrally managed brand system in `src/data/brand.ts` and `src/data/site.ts` for owner-editable content.
11. Mostly static public site; server behavior only where needed (form API endpoints).
12. Capability Statement has both a web-native page and a downloadable PDF asset (full + 1-page summary).
13. Environment handling is template-driven locally; Cloudflare secrets for production.
14. GTM is the preferred analytics path; direct GA4 supported as fallback.
15. Partners page uses a vendor/partner inquiry form (not informational only).
16. Careers page accepts resume uploads (PDF/Word, 10 MB max) with file magic number validation, delivered via Resend attachment.
17. Homepage messaging driven by `docs/marketing-intelligence.md` and `docs/competitor-analysis.md`.
18. Primary buttons use ISS brand blue (#1e78c8 / --color-secondary); text forced white via `!text-white`.
19. All decorative eyebrow subheaders removed site-wide.
20. WOSB and SDVOSB certifications are treated as primary procurement differentiators, not footnotes.
21. PlatformsStrip uses actual brand-colored SVG logos (not monochrome) as full-card overlays at 7% opacity.
22. Past performance is labeled "Past Performance" throughout (not "Case Studies") to align with federal procurement language.
23. FinalCtaSection button 1 uses `variant="ghost"` to avoid a Tailwind !important specificity conflict with the primary variant's `!text-white`.
24. Footer structured as 4-column grid: brand block | Explore | Contact | Policies.
25. Main navigation uses dropdown menus (Solutions, Insights, About, Contact) to reduce visual clutter from 9 flat links.
26. Desktop dropdowns use CSS `group-hover:` — no JavaScript required. Mobile uses JS collapsible groups.
27. Form handlers moved from Astro server actions to API endpoints at `/api/forms/{type}` for better separation.
28. All form endpoints implement: Zod validation → honeypot check → rate limiting → Turnstile verification (5s timeout) → email via Resend.
29. Sentry integration uses dynamic import (`await import('@sentry/cloudflare')`) to keep it off the synchronous module graph; no-op without DSN.
30. Error messages are sanitized — generic messages to users, detailed logging server-side.
31. Shared form components (FormStatusBanners, TurnstileWidget, HoneypotField, FieldError, FormScripts) extracted to `src/components/form/`.
32. CapabilityHighlights extracted from 3 inline copies into 1 shared component with height equalization script.
33. Insight articles target federal IT buyers — established content pipeline for adding new articles via markdown.
34. Capability Statement moved from About dropdown to Solutions dropdown with `indent: true` flag. About changed to standalone nav link.
35. CTA button ("View Capability Statement") added to right end of desktop nav bar and bottom of mobile nav panel.
36. `transition:name="site-header"` added to `<header>` to fix backdrop-blur compositing artifact with Astro's ClientRouter view transitions.
37. Three procurement tools added as pure client-side islands — no new server endpoints, no PII collected, no external API calls. All interactivity via `is:inline` + vanilla JS on `astro:page-load`. URL-hashable results in Assessment.
38. Tools hub at `/tools` added; "Tools & Calculators" added to Solutions dropdown in `navigation.ts`.

---

## Current Risks
1. Publishing procurement-sensitive claims or identifiers without final owner verification.
2. Shipping without real production values for Resend, Turnstile, and GTM/GA4 configuration.
3. Leaving provisional or placeholder brand collateral (founder name/title, co-founder title) in place.
4. Treating current copy baseline as fully approved before a business review.
5. Resume file uploads are functional but untested end-to-end with a configured Resend account.
6. Sentry DSN not yet configured — error monitoring is a no-op until project is created at sentry.io.
7. In-memory rate limiting resets on worker restart — sufficient for now but may need persistent storage if abuse occurs.
8. AnimatedCounter "25+" bug may affect proof strip presentation — needs investigation.

---

## Next Immediate Step
1. Verify `infinitystonesolutions.com` domain in Resend dashboard to unblock email delivery.
2. Configure all production secrets (Resend API key, Turnstile site/secret keys, GTM ID or GA4 measurement ID, Sentry DSN).
3. Test all three form flows end-to-end (contact, vendor, careers with resume upload).
4. Investigate and fix AnimatedCounter "25+" bug on proof strip.
5. Complete founder name/title in `src/data/team.ts`.
6. Owner review of all business-sensitive copy (case studies, certifications, identifiers, pricing signals).
7. Prepare and deploy to Cloudflare Workers (staging, then production).

---

## Update Rules
After every meaningful change:
- update this file
- keep current state and next step accurate
- record major structure decisions briefly
- keep the document concise and restart-friendly
