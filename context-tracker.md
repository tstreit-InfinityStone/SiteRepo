# Infinity Stone Solutions Website Context Tracker

## Project
Rebuild the Infinity Stone Solutions website into a modular, owner-editable marketing site that is easier to design, maintain, and expand.

## Canonical Documents
- strategy and stack brief: `website-development-plan.md`
- page and content blueprint: `website-content-architecture.md`
- coding and AI-agent guardrails: `codex-project-instructions.md`
- rolling status and next-step tracker: `context-tracker.md`

## Current State
The website is past the v1 baseline and into a fully featured pre-launch state. All core pages are implemented, verified, and polished. A significant content and credibility pass has been completed, including dual-certification signals, platform coverage, past performance, team presentation, and SEO groundwork.

### Implemented Routes
- `Home` — full hero, proof strip, dual cert section, capability highlights, platforms strip, why ISS, who we serve preview, capability statement CTA, final CTA
- `Capabilities` — tabbed capability groups, platforms strip, capability statement CTA
- `Capability Detail` — 6 slugs (individual capability pages)
- `Who We Serve` — sector cards, proof signals, CTA
- `Capability Statement` — web-native print layout, PDF download box, accordion sections, 1-page summary link
- `Past Performance` — 5 named case studies (U.S. Navy, SPAWAR, ICE/HSI, DOI/BLM, SourceGas), breadcrumb schema
- `About` — company overview, leadership + team section (2 members)
- `Contact` — inquiry form, Turnstile, Resend, honeypot
- `Partners` — vendor inquiry form, Turnstile, Resend, honeypot
- `Careers` — resume upload form (PDF/Word, 10 MB max), Turnstile, Resend with attachment, honeypot
- `Insights` — placeholder content destination (not in main nav yet)
- `Privacy` — legal page
- `404` — custom error page

### Server Actions (3)
- **Contact** — general inquiry with Turnstile + Resend + honeypot
- **Vendor** — partner/vendor inquiry with Turnstile + Resend + honeypot
- **Careers** — resume upload with file attachment (PDF/Word, 10 MB max), Turnstile + Resend + honeypot

### Navigation
- **Main nav:** Home, Capabilities, Who We Serve, Past Performance, Capability Statement, About, Partners, Contact
- **Footer — Explore:** Capabilities, Who We Serve, Capability Statement, About, Past Performance, Insights
- **Footer — Contact:** Contact, Partners, Careers
- **Footer — Policies:** Privacy
- **Legal:** Privacy

### Active Components (sections)
- `HeroSection` — homepage hero with headline, subheadline, dual CTA
- `ProofStrip` — credential cards with centered headers (18+ SAM registration, WOSB, SDVOSB, etc.)
- `DualCertSection` — dark navy gradient WOSB + SDVOSB procurement detail section
- `PlatformsStrip` — "Platforms We Deliver On" — 9 platform cards with full-card colored logo overlays at 7% opacity
- `CapabilityHighlights` — 4–6 capability group cards
- `WhyIssSection` — 3–5 differentiators
- `WhoWeServePreview` — sector audience preview
- `CapabilityStatementCta` — centered 3-button download panel (View, Full PDF, 1-Page Summary)
- `FinalCtaSection` — "Ready to move a program forward?" — 3 buttons (Start Discussion, Download Cap Statement, 1-Page Summary)
- `PageHero` — reusable interior page hero component
- `SiteHeader` — sticky header with centered nav link text, mobile nav island
- `SiteFooter` — 4-column grid (brand | Explore | Contact | Policies)

### Platform Logos (public/logos/)
9 brand-colored SVG files used in PlatformsStrip cards (full-card overlay, 7% opacity, no grayscale):
- `palantir.svg` — dark wordmark
- `arcgis.svg` — Esri blue/green gradient globe mark
- `azure.svg` — Microsoft blue gradient "A"
- `aws.svg` — dark + orange AWS smile logo
- `servicenow.svg` — "Now" mark with sage green circle
- `workday.svg` — orange arc + blue wordmark
- `oracle.svg` — red Oracle wordmark
- `linux.svg` — Tux penguin silhouette
- `sccm.svg` — 4-color Windows flag (red, green, blue, yellow panes)

### Data Files
- `src/data/brand.ts` — logo, colors, CTAs, asset URLs (capabilityStatement, capabilityStatementOnePage)
- `src/data/site.ts` — business name, phone, email, location, footer summary
- `src/data/navigation.ts` — mainNavigation, footerNavigation, contactNavigation, legalNavigation
- `src/data/capabilities.ts` — capability groups and entries
- `src/data/case-studies.ts` — 5 named past performance entries
- `src/data/team.ts` — 2 team member entries (founder + co-founder)
- `src/data/redirects.ts` — URL redirect rules

### SEO Infrastructure
- `@astrojs/sitemap` active with filter (excludes `/print`, `/404`)
- `<link rel="icon">` — `iss-mark.svg` SVG favicon
- Apple-touch-icon and PNG fallback favicons in `BaseLayout.astro`
- Each page has `canonicalPath` and `structuredData` (Organization + BreadcrumbList JSON-LD)
- `robots.txt` generated at build

### Build Status
- `npm run build` passes — 0 errors
- `npm run check` passes — 0 TypeScript errors

### Current Operational Blocker
Resend rejects outbound email until `infinitystonesolutions.com` is verified in the Resend dashboard. All three form actions surface provider-side delivery errors rather than false success states.

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
26. complete launch hardening, production configuration, and deployment — **next**

---

## Major Decisions So Far
1. The project is a marketing website focused on credibility and lead generation.
2. The primary early audience is government services procurers and related buyers.
3. The website should remain flexible enough to support future private-sector growth.
4. The site should use `Capabilities` as the main organizing language instead of `Services`.
5. Core pages are Home, Capabilities, Who We Serve, Capability Statement, About, Contact, Partners, Careers, Past Performance, and Insights.
6. `Insights` exists but stays out of the top navigation until content quality is strong enough (3+ posts).
7. `Careers` is footer-nav only; `Past Performance` appears in both main and footer nav.
8. Proof signals surface prominently across the site — not just on one page.
9. Preferred stack: Astro + TypeScript + Tailwind CSS + selective React islands + Cloudflare Workers.
10. Centrally managed brand system in `src/data/brand.ts` and `src/data/site.ts` for owner-editable content.
11. Mostly static public site; server behavior only where needed (contact/vendor/careers forms).
12. Capability Statement has both a web-native page and a downloadable PDF asset (full + 1-page summary).
13. Environment handling is template-driven locally; Cloudflare secrets for production.
14. GTM is the preferred analytics path; direct GA4 supported as fallback.
15. Partners page uses a vendor/partner inquiry form (not informational only).
16. Careers page accepts resume uploads (PDF/Word, 10 MB max) delivered via Resend attachment.
17. Homepage messaging driven by `docs/marketing-intelligence.md` and `docs/competitor-analysis.md`.
18. Primary buttons use ISS brand blue (#1e78c8 / --color-secondary); text forced white via `!text-white`.
19. All decorative eyebrow subheaders removed site-wide.
20. WOSB and SDVOSB certifications are treated as primary procurement differentiators, not footnotes.
21. PlatformsStrip uses actual brand-colored SVG logos (not monochrome) as full-card overlays at 7% opacity.
22. Past performance is labeled "Past Performance" throughout (not "Case Studies") to align with federal procurement language.
23. FinalCtaSection button 1 uses `variant="ghost"` to avoid a Tailwind !important specificity conflict with the primary variant's `!text-white`.
24. Footer structured as 4-column grid: brand block | Explore | Contact | Policies.

---

## Current Risks
1. Publishing procurement-sensitive claims or identifiers without final owner verification.
2. Shipping without real production values for Resend, Turnstile, and GTM/GA4 configuration.
3. Leaving provisional or placeholder brand collateral (team photos, co-founder details) in place.
4. Treating current copy baseline as fully approved before a business review.
5. Resume file uploads are functional but untested end-to-end with a configured Resend account.
6. Team page has one real credential entry (founder) and one placeholder (co-founder) — must be completed before launch.

---

## Next Immediate Step
1. Verify `infinitystonesolutions.com` domain in Resend dashboard to unblock email delivery.
2. Configure all production secrets (Resend API key, Turnstile site/secret keys, GTM ID or GA4 measurement ID).
3. Test all three form flows end-to-end (contact, vendor, careers with resume upload).
4. Complete co-founder team entry in `src/data/team.ts`.
5. Owner review of all business-sensitive copy (case studies, certifications, identifiers, pricing signals).
6. Prepare and deploy to Cloudflare Workers (staging, then production).

---

## Update Rules
After every meaningful change:
- update this file
- keep current state and next step accurate
- record major structure decisions briefly
- keep the document concise and restart-friendly
