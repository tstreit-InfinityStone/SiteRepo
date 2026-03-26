# Infinity Stone Solutions Website Content Architecture

## Purpose
This file defines the page structure, section order, and content model for the website.

Use it to:
- decide what pages should exist
- decide what belongs on each page
- keep the homepage focused
- keep Capabilities organized in a way buyers can scan quickly
- keep proof signals and owner-editable content placed intentionally

This file is about information architecture and content placement. It is not the stack or implementation brief.

---

## Primary Audience
- government services procurers and evaluators
- public-sector and regulated-environment buyers
- organizations seeking modernization, security, infrastructure, advisory, data, or digital support
- teaming partners and subcontractors
- prospective candidates
- future private-sector buyers who need a credible technology partner

---

## Experience Goal
The site should feel smooth, intuitive, and credible. Visitors should understand the company quickly, identify relevant Capabilities quickly, and find proof signals without digging.

---

## Conversion Goals
Primary:
- encourage visitors to contact ISS for a capability discussion or consultation

Secondary:
- build credibility through proof signals, past performance, and certifications
- explain Capabilities clearly and connect them to buyer needs
- support Capability Statement review and download (full + 1-page)
- support future SEO growth through structured content and sitemaps
- make the company easy to validate from a phone or at a conference
- support deeper desktop review for procurement evaluation

---

## Navigation

### Main Navigation
- Home
- Capabilities
- Who We Serve
- Past Performance
- Capability Statement
- About
- Partners
- Contact

### Footer — Explore Column
- Capabilities
- Who We Serve
- Capability Statement
- About
- Past Performance
- Insights

### Footer — Contact Column
- Contact
- Partners
- Careers

### Footer — Policies Column
- Privacy

### Navigation Rules
- `Insights` stays out of the top navigation until there are at least 3 strong posts.
- `Careers` is linked in the footer Contact column only — not in the main navigation.
- `Past Performance` appears in both main navigation and footer Explore column.
- `Partners` appears in both main navigation and footer Contact column.
- `Privacy` is linked in the footer Policies column only.

---

## Homepage Blueprint

### 1. Hero
- clear headline (currently: "Built for programs that can't afford to fail.")
- concise subheadline with government and regulated-environment relevance
- primary CTA → /contact
- secondary CTA → /capabilities

### 2. Proof Strip (ProofStrip)
- credential and trust cards with centered headers
- includes: SAM registration status, NAICS codes, WOSB certification, SDVOSB certification, security clearance readiness
- each card includes a label and short supporting detail

### 3. Dual Certification Section (DualCertSection)
- dark navy gradient background for visual weight
- WOSB and SDVOSB procurement explanation
- bullet list of specific set-aside authorities and thresholds (e.g., sole-source up to $4.5M)
- positioned directly after ProofStrip to reinforce the certification signal

### 4. Capability Highlights
- 4–6 capability group cards
- short summaries with links into /capabilities or capability detail pages

### 5. Platforms We Deliver On (PlatformsStrip)
- 9 platform cards: Palantir, ArcGIS Enterprise, Microsoft Azure, AWS, ServiceNow, Workday, Oracle, UNIX/Linux, SCCM
- each card displays platform name, category, and a full-card brand-colored logo overlay at 7% opacity
- also placed on the /capabilities page

### 6. Why ISS (WhyIssSection)
- 3–5 differentiators
- business-oriented, credibility-driven language

### 7. Who We Serve Preview
- government focus
- regulated-environment relevance
- room for future private-sector credibility
- points to /who-we-serve

### 8. Capability Statement CTA (CapabilityStatementCta)
- centered layout, "markety" feel
- headline: "Download our Capability Statement."
- 3 buttons: View Capability Statement (inline), Full Version PDF (external), 1-Page Summary PDF (external)

### 9. Final CTA (FinalCtaSection)
- dark gradient panel: "Ready to move a program forward?"
- 3 buttons: Start a Capability Discussion (/contact), Download Capability Statement, 1-Page Summary

---

## Capabilities Page Blueprint

### Purpose
Help visitors understand the full offering without feeling overwhelmed.

### Structure
1. page hero
2. short overview
3. tabbed capability groups
4. capability cards within each group
5. Platforms We Deliver On strip (PlatformsStrip)
6. Capability Statement CTA

### Responsive Notes
- cards must stack cleanly on mobile
- capability groupings must remain obvious on smaller screens
- tabs should degrade cleanly on mobile (stacked or scrollable)

---

## Capability Detail Page Template
Each capability detail page should contain:
1. hero
2. overview
3. buyer problems or mission needs
4. outcomes and benefits
5. what is included
6. who this is for
7. related proof signals
8. related capabilities
9. CTA

Responsive notes:
- keep opening sections concise
- avoid long unbroken text walls
- keep related navigation easy to tap

---

## Who We Serve Page
- target buyer types (defense, intelligence, civilian federal, law enforcement, regulated commercial)
- government-focused positioning
- regulated-environment fit
- future-ready private-sector relevance
- short explanations of how ISS aligns to each audience
- supporting proof signals where relevant
- CTA to /contact or /capabilities

---

## Capability Statement Page
- short intro
- web-native summary with accordion sections
- procurement-relevant framing (NAICS, CAGE, SAM)
- key identifiers and differentiators
- download panel near top: Full Version PDF, 1-Page Summary PDF
- print-ready layout at /capability-statement/print
- related contact CTA at bottom

---

## Past Performance Page (/past-performance)
- page hero: "Past Performance"
- 5 named case study cards (U.S. Navy, SPAWAR, ICE/HSI, DOI/BLM, SourceGas)
- each card: client name + sector badge, capability tags, engagement summary, outcomes list
- bottom CTA section: "Ready to discuss your program?" with Capability Statement and Contact buttons
- breadcrumb schema, canonical path, Organization JSON-LD

Data source: `src/data/case-studies.ts`

Note: Use "Past Performance" throughout the site — not "Case Studies" — to align with federal procurement language and evaluation criteria.

---

## About Page
- company overview and mission
- approach and values
- leadership section (founder with real credentials)
- team section (additional members as data is finalized)
- ownership positioning (WOSB, SDVOSB) — references DualCertSection signals
- differentiators
- CTA

Data source: `src/data/team.ts`

---

## Contact Page
- short welcome statement
- inquiry form (name, email, phone, subject, message)
- honeypot, Turnstile CAPTCHA, Resend delivery
- phone, email, and location visible without extra navigation
- clear expectation of next step

Responsive notes:
- keep form short in v1
- all fields and buttons must be mobile-friendly
- alternate contact methods visible at first glance

---

## Partners Page
### Purpose
Invite qualified vendors, subcontractors, and teaming partners to connect with ISS.

### Structure
1. page hero — "Grow with us."
2. two-column layout: sidebar panels + vendor inquiry form
3. sidebar panels: "Why partner with ISS", "Partnerships we're looking for", "What to expect"
4. form: Company Name, Contact Name, Email, Phone, Partnership Type (dropdown), Description (textarea)
5. honeypot, Turnstile, Resend delivery

### Responsive Notes
- form and sidebar stack vertically on mobile (form below sidebar)
- all fields and buttons must be mobile-friendly

---

## Careers Page
### Purpose
Allow prospective candidates to submit a resume and learn about the company culture.

### Structure
1. page hero — "Build something that matters."
2. two-column layout: sidebar panels + application form
3. sidebar panels: "Why ISS", "What we look for", "What to expect"
4. form: Full Name, Email, Phone, Area of Interest (dropdown), Tell us about yourself (textarea), Resume file upload (PDF/Word, 10 MB max)
5. honeypot, Turnstile, Resend delivery with attachment

### Responsive Notes
- form and sidebar stack vertically on mobile (form below sidebar)
- file upload input must be clearly labeled with accepted formats and size limit

---

## Insights Page
- article cards or previews
- optional featured article
- topics aligned to ISS Capabilities and buyer concerns

Guidance:
- do not promote Insights heavily before content quality is there
- treat it as credibility and SEO support, not a first-visit conversion path
- keep out of the main navigation until at least 3 strong posts exist

---

## Structured Content Types

### Brand Settings (`src/data/brand.ts`)
- logo variants (wordmark, mark)
- color tokens
- typography settings
- default CTA labels
- asset URLs: capabilityStatement, capabilityStatementOnePage, socialPreview

### Site Settings (`src/data/site.ts`)
- business name, short name
- positioning statement
- contact channels (phone, email, location)
- footer summary copy
- contact expectation copy

### Navigation (`src/data/navigation.ts`)
- mainNavigation — header link array
- footerNavigation — Explore column
- contactNavigation — Contact column
- legalNavigation — Policies column

### Capability Entry (`src/data/capabilities.ts`)
- title, slug, group
- short summary, hero description
- buyer problems, outcomes, included work
- ideal buyers, proof references, related capabilities, CTA text

### Past Performance Entry (`src/data/case-studies.ts`)
- client, sector
- tags (capability labels)
- summary (engagement description)
- outcomes (bullet list)

### Team Entry (`src/data/team.ts`)
- name, title
- bio, credentials
- photo reference (optional)

### Platform Entry (inline in `PlatformsStrip.astro`)
- name, category, logo filename (`/logos/*.svg`)

---

## Homepage Warning
Do not try to place all capability detail on the homepage.

The homepage should:
- introduce
- build trust
- surface proof signals and certifications
- highlight capabilities
- point visitors deeper
- convert

---

## IA Warnings
- do not overload the navigation
- do not bury the Capability Statement
- do not separate proof signals so far from claims that credibility becomes weak
- do not let Insights crowd the main decision path before content quality exists
- do not allow placeholder team data to ship — finalize co-founder entry before launch

---

## Success Check
The architecture is working if:
- a new visitor can understand ISS quickly
- capabilities are easy to browse
- proof signals appear in the right places
- past performance is findable by procurers doing due diligence
- certifications (WOSB, SDVOSB) are visible early and supported by detail
- the homepage feels focused rather than crowded
- owner-editable content can be updated without changing the page structure
