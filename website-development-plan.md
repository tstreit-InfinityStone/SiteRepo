# Infinity Stone Solutions Website Development Plan

## Purpose
This file is the canonical strategy brief for the Infinity Stone Solutions website rebuild.

Use it to:
- define the business and website goals
- lock the stack and hosting direction
- keep the site aligned to its primary audience
- protect maintainability and low ongoing cost
- guide future implementation planning without dictating code-level details

If another planning note conflicts with this file on strategy, stack, or priorities, this file wins.

---

## Project Summary
Build a modern, fast, self-hosted marketing website for Infinity Stone Solutions that presents the company as a credible technology partner for government and regulated-environment buyers. The site must support procurement evaluation, capability discovery, and low-friction contact initiation.

The site should:
- look polished and trustworthy
- work equally well on mobile and desktop
- make Capabilities easy to understand and browse
- surface proof signals, certifications, and past performance prominently
- support low-friction contact and capability discussions
- give procurement evaluators fast access to the Capability Statement (full and 1-page)
- remain easy for the owner to update over time

---

## Business Positioning
ISS is a mission-aware, credible, professional small-business technology partner with dual socioeconomic certification (WOSB + SDVOSB). These certifications are meaningful procurement differentiators and should be treated as primary positioning signals — not footnotes.

Initial positioning priorities:
- government services and public-sector procurement audiences first
- credibility for regulated, process-driven, and mission-oriented environments
- clear visibility into Capabilities, proof signals, past performance, and next steps
- easy access to the Capability Statement and contact paths

Growth positioning priorities:
- remain flexible enough to support future private-sector outreach
- avoid messaging that locks the company into one buyer type forever
- keep a professional B2B tone that works across public and private markets

---

## Primary Audience
- government services procurers and evaluators (primary)
- public-sector and regulated-environment decision-makers
- buyers seeking modernization, infrastructure, cybersecurity, advisory, data, or digital support
- teaming partners and subcontractors pursuing joint opportunities
- prospective candidates
- future private-sector buyers looking for a credible technology partner

---

## Primary Goals
- create a polished, trustworthy small-business IT website
- improve homepage clarity and visitor pathways
- organize Capabilities in a way that feels intuitive instead of cluttered
- surface proof signals — certifications, past performance, platform expertise — early and clearly
- support mobile-first credibility for event, expo, and referral follow-up traffic
- support deeper desktop review for office-based procurement evaluation
- keep the site easy to update, extend, and maintain
- keep first-version cost and technical complexity low

---

## Core Website Strategy
The rebuilt site should help visitors answer these questions quickly:
- what does ISS do?
- who is ISS best suited to help?
- why trust ISS?
- what Capabilities are offered?
- what platforms does ISS work with?
- what set-aside certifications does ISS hold, and what does that unlock for buyers?
- what past performance supports these claims?
- what should the visitor do next?

---

## Core Pages
All of the following should be live at launch:

| Page | Path | Nav |
|---|---|---|
| Home | `/` | main |
| Capabilities | `/capabilities` | main |
| Capability Detail | `/capabilities/[slug]` (6 slugs) | — |
| Who We Serve | `/who-we-serve` | main |
| Past Performance | `/past-performance` | main + footer |
| Capability Statement | `/capability-statement` | main |
| About | `/about` | main |
| Partners | `/partners` | main + footer |
| Careers | `/careers` | footer only |
| Contact | `/contact` | main |
| Insights | `/insights` | footer only (until 3+ posts) |
| Privacy | `/privacy` | footer legal |
| 404 | — | — |

Note: "Case Studies" has been renamed to "Past Performance" site-wide to align with federal procurement language.

---

## Capabilities Model
Use `Capabilities` as the primary organizing language (not "Services").

Top-level capability groups:
- Enterprise IT Modernization
- Cloud and Infrastructure
- Cybersecurity and Compliance
- AI, Data, and Geospatial Intelligence
- Program and Requirements Support
- Digital Experience and Custom Solutions

Each capability supports a detail page with: buyer problems, outcomes, included work, ideal buyers, and related proof signals.

---

## Proof Signals
Proof signals are a core content requirement, not optional polish. The website prominently supports:

- WOSB and SDVOSB dual certification (set-aside and sole-source authorities)
- SAM registration status and NAICS/CAGE codes
- Past performance — 5 named engagements: U.S. Navy, SPAWAR, ICE/HSI, DOI/BLM, SourceGas
- Platform expertise — 9 production-proven platforms: Palantir, ArcGIS, Azure, AWS, ServiceNow, Workday, Oracle, Linux, SCCM
- Leadership credibility and team credentials
- Capability Statement (full version + 1-page summary)
- Clear contact information

---

## Brand System
The website uses a centrally managed brand system. All owner-editable content is maintained in data files — not hardcoded in components.

Key files:
- `src/data/brand.ts` — logo variants, color tokens, typography, CTA labels, asset references (capabilityStatement, capabilityStatementOnePage)
- `src/data/site.ts` — business name, positioning, phone, email, location, footer copy
- `src/data/navigation.ts` — all four navigation arrays (main, footer/explore, footer/contact, footer/legal)
- `src/data/capabilities.ts` — capability groups and entries
- `src/data/case-studies.ts` — past performance entries
- `src/data/team.ts` — leadership and team members

Design tokens are defined in `src/styles/tokens.css` and applied as CSS custom properties throughout the site.

---

## Content Principles
- write in plain, credible business language
- avoid filler and buzzword-heavy messaging
- focus on client outcomes and buyer relevance
- keep headings practical and useful
- keep pages scannable on mobile
- make every page support a next step
- keep proof signals close to major claims
- make procurement-relevant information easy to find
- use federal procurement language ("Past Performance", not "Case Studies")

---

## Design and UX Principles
- clean and modern
- professional and credible
- premium but not flashy
- strong visual hierarchy
- generous whitespace
- responsive from the start
- subtle, consistent motion (fade-up, stagger-children)
- accessible contrast and readable typography
- multi-line nav labels center-aligned

---

## Technical Stack
| Layer | Choice |
|---|---|
| Framework | Astro 6.x |
| Language | TypeScript |
| Styles | Tailwind CSS v4 |
| Islands | React (selective — forms, mobile nav) |
| Deployment | Cloudflare Workers (SSR adapter) |
| Email | Resend |
| CAPTCHA | Cloudflare Turnstile |
| Analytics | GTM (preferred), GA4 (fallback) |
| Sitemap | @astrojs/sitemap (filtered) |

### Output Mode
- Static by default (`output: 'static'`)
- SSR hybrid for server action endpoints (contact, vendor, careers forms)

### Technical Principles
- keep JavaScript minimal by default
- use hydrated React islands only for truly interactive UI (mobile nav, forms)
- keep content and brand settings centrally editable via data files
- favor simple, secure form handling (honeypot + Turnstile + Resend) over heavy frameworks
- preserve room for future expansion without overengineering v1

### Known Technical Decision
`Button.astro`'s primary variant applies `!text-white` (Tailwind `!important`). When overriding text color in a dark-background context, pass `variant="ghost"` and override via `className` — this avoids a CSS specificity conflict where two `!important` rules fight over the same property.

---

## SEO Infrastructure
- `@astrojs/sitemap` with filter to exclude `/print` and `/404`
- Every page has `canonicalPath` and `structuredData` (Organization + BreadcrumbList JSON-LD)
- SVG favicon (`iss-mark.svg`) + apple-touch-icon + PNG fallback in `BaseLayout.astro`
- `robots.txt` generated at build

---

## Production Configuration Required (Pre-Launch)
| Item | Location |
|---|---|
| Resend API key | Cloudflare secret `RESEND_API_KEY` |
| Turnstile site key | Cloudflare env `PUBLIC_TURNSTILE_SITE_KEY` |
| Turnstile secret key | Cloudflare secret `TURNSTILE_SECRET_KEY` |
| GTM container ID | `src/data/site.ts` or Cloudflare env |
| Resend domain verified | Resend dashboard → infinitystonesolutions.com |

---

## Scope Boundaries
This file defines strategy, stack, priorities, and page-level direction.

This file does not:
- prescribe component implementation details
- prescribe folder structures or file naming
- act as the build execution plan
- define copy at the word level

Those details belong in `website-content-architecture.md`, `codex-project-instructions.md`, and the implementation itself.

---

## Success Criteria
The strategy is working if:
- a new visitor can understand ISS quickly
- Capabilities feel organized and credible
- certifications and set-aside positioning are visible and supported by detail
- past performance is easy to find and believable
- proof signals appear without hunting
- the site feels strong on both mobile and desktop
- the Capability Statement (full + 1-page) is easy to access from multiple entry points
- branding and marketing materials can be updated without structural rewrites
- the stack stays simple enough for low ongoing maintenance
- all three form flows work end-to-end in production
