# Codex Project Instructions for Infinity Stone Solutions Website

## Required Behavior
- prefer clean, boring, maintainable code
- optimize for readability and future editing
- build modularly from the start
- use TypeScript by default
- use `.astro` files by default for pages and presentational components
- use Tailwind consistently instead of ad hoc styling
- keep components focused and reusable
- keep page composition separate from reusable sections and UI primitives
- keep repeated business content in content or data files where practical
- keep brand and marketing materials centrally editable
- assume the project owner is not a trained developer
- build all UI with mobile and desktop behavior in mind from the start

## Primary Objective
Help build a polished, intuitive small-business IT website for Infinity Stone Solutions inside VS Code.

The code should be:
- easy to understand
- easy to edit later
- easy to expand with new Capabilities and pages
- production-appropriate for a business marketing website
- responsive and reliable across phone, tablet, laptop, and desktop sizes

## Shared Terminology
Use these terms consistently:
- `Capabilities` instead of `Services`
- `Who We Serve`
- `Capability Statement`
- `proof signals`
- `brand system`
- `owner-editable content`
- `Insights` for blog/article content

## First-Pass Response Requirements
Before proposing or implementing code, first identify:
- what page, section, UI primitive, island, or content/data file is being built
- whether the logic should be reusable
- what content belongs in structured data instead of inline markup
- whether the work should be done in `.astro` or a React island
- the simplest implementation that keeps the code modular
- how the implementation should behave on mobile and desktop

## Response Format
When proposing implementation, organize into:
- what we are building
- file(s) to create or edit
- why the structure is modular
- responsive considerations
- code
- notes for a beginner

## Astro-First Rules
- default to Astro for pages and static sections
- use React only for clearly justified interactive islands
- place hydrated interactive components in `src/components/islands`
- do not turn the whole site into a React app by habit
- keep JavaScript minimal by default — prefer `is:inline` scripts for simple interactivity
- prefer static rendering unless a real need justifies something dynamic

Use `is:inline` scripts for:
- mobile navigation state
- accordions or disclosures
- tab groups
- scroll-based animations and counters
- dropdown menu interactions

Use React islands only when Astro + vanilla JS is not the cleaner solution.

## Coding Rules
- use TypeScript
- keep files focused
- keep page files mostly for composition
- place reusable page sections in `src/components/sections`
- place layout pieces in `src/components/layout`
- place small reusable UI pieces in `src/components/ui`
- place shared form components in `src/components/form`
- place long-form structured content in `src/content` (Astro content collections)
- place short structured business data in `src/data`
- place shared layouts in `src/layouts`
- place shared style tokens and global styles in `src/styles`
- place shared utility libraries in `src/lib`
- place form action handlers in `src/pages/api/forms`
- place tests alongside the code they test in `__tests__` directories
- do not create giant all-purpose utility files
- do not duplicate the same markup pattern across pages if it should be reusable
- avoid unnecessary libraries when Astro and Tailwind are enough
- avoid clever abstractions that make the code harder to follow
- prefer explicit props over hidden behavior
- comment only where it truly helps a beginner understand intent

## Brand System Rules
The brand system must remain owner-editable.

Hard rules:
- do not hardcode logo paths in section components
- do not hardcode brand colors inside page markup
- do not hardcode CTA labels in multiple places
- do not scatter trust badges and marketing assets across unrelated files

Expected ownership:
- brand assets should live in `src/assets/brand`
- brand settings should live in `src/data/brand.ts`
- reusable sections should read brand values from shared data, not local constants

Owner-editable content should include:
- logo variants
- color tokens (CSS custom properties in `src/styles/global.css`)
- typography choices
- CTA labels
- hero/support copy where practical
- proof-strip items
- trust badges
- downloadable marketing collateral
- team member data (`src/data/team.ts`)

## Content Rules
- write concise, professional copy
- avoid filler and buzzword-heavy text
- focus on business outcomes and client value
- do not overpromise
- keep headings plain and useful
- make each page support a next step
- prioritize relevance to government-oriented buyers in the first version
- keep room for future private-industry messaging without rewriting the whole structure
- keep proof signals close to the claims they support

## Interaction Quality Rules
- treat smoothness and perceived responsiveness as core quality metrics
- dropdowns, menus, accordions, cards, and navigation states should feel polished and immediate
- prefer subtle, fast transitions over dramatic animation
- keep interaction patterns consistent across pages and components
- avoid heavy-handed animation that makes the site feel slower
- preserve accessibility and reduced-motion considerations when adding motion

## Responsive Rules
- treat mobile responsiveness as a core requirement, not a later polish task
- build layouts mobile-first where practical
- verify sections remain readable and visually balanced on small screens
- avoid oversized hero sections that feel awkward on mobile
- keep navigation simple and thumb-friendly on phones
- ensure buttons, links, and form fields are easy to tap
- avoid dense multi-column layouts that collapse poorly
- design section spacing so pages do not feel cramped on mobile or too loose on desktop
- make sure critical proof signals and contact information remain easy to find on both device types

## Performance And Feel Rules
- prioritize fast-feeling UI behavior in addition to actual load speed
- do not add motion that blocks interaction or delays user intent
- make navigation open and close quickly and cleanly
- make interactive elements provide clear visual feedback
- preserve a premium, responsive feel even in simple components
- keep hydrated islands rare and intentional

## Security And Trust Rules
- implement sensible marketing-site security practices without unnecessary complexity
- use secure defaults (CSP, HSTS, X-Frame-Options, Referrer-Policy)
- keep forms simple and trustworthy
- protect forms with honeypot fields and Cloudflare Turnstile verification
- implement server-side rate limiting on all form endpoints
- validate file uploads by checking magic numbers, not just MIME types
- sanitize error messages — log details server-side, return generic messages to users
- avoid exposing unnecessary internals
- do not add heavy backend complexity unless a clear business need emerges
- present the company as security-aware through quality, clarity, and professionalism

## Navigation Rules
- navigation is configured centrally in `src/data/navigation.ts`
- top-level nav uses dropdown menus for grouping: Solutions, Insights, About, Contact
- `NavigationItem` type supports optional `children` array for dropdowns
- desktop dropdowns open on hover using CSS `group-hover:`
- mobile nav uses collapsible groups with tap-to-expand
- footer navigation is separate from main navigation and does not use dropdowns

## Architecture Rules
- use a content-driven structure when possible
- generate Capability detail pages from structured content collections
- generate Insight article pages from markdown content collections
- keep navigation configuration centralized
- keep SEO metadata intentional per page
- separate site-wide settings from page-specific content
- design the structure so adding another Capability or Insight later is easy

## Folder Responsibilities
- `src/pages/` = routes and page composition
- `src/pages/api/forms/` = server-side form handlers
- `src/layouts/` = shared page and document layouts (`BaseLayout`, `PrintLayout`)
- `src/components/layout/` = header, footer, navigation
- `src/components/sections/` = reusable page sections
- `src/components/ui/` = buttons, cards, badges, containers, section headers
- `src/components/islands/` = interactive components with `is:inline` scripts
- `src/components/form/` = shared form components (status banners, honeypot, Turnstile, field errors, form scripts)
- `src/content/` = content collections (capabilities, insights)
- `src/data/` = structured business, navigation, proof, brand, team, and sector data
- `src/lib/` = shared utility libraries (contact email, content helpers, rate-limit, sentry, SEO, paths)
- `src/styles/` = global styles and CSS custom properties
- `src/assets/brand/` = logos and brand images (processed by Astro)
- `public/team/` = team member photos
- `public/.well-known/` = security.txt and web standards files

## Anti-Patterns To Avoid
- one massive homepage file
- one giant file containing all Capabilities inline
- repeated CTA markup in many files
- inline arrays and business data inside page files
- hardcoded brand values spread across components
- too many dependencies for simple UI work
- styling each page differently without a shared system
- using AI output without simplifying it
- building desktop-first layouts that break down on mobile
- defaulting to React when Astro + `is:inline` scripts would be simpler
- leaking internal error details to users in form responses

## Workflow Rules
Before starting a new feature:
1. identify whether it is a page, section, UI primitive, island, or content/data file
2. check whether a similar pattern already exists
3. keep the implementation in the smallest responsible module
4. prefer extending the current structure over creating parallel patterns
5. decide how the feature should behave on mobile before finalizing the desktop version
6. decide whether brand or marketing content should live in shared editable data

After meaningful changes:
1. update `docs/context-tracker.md`
2. confirm the next recommended step
3. keep alignment with `docs/website-development-plan.md`
4. keep the code beginner-readable

## Technology Stack
- **Framework:** Astro 6.x with TypeScript
- **Styling:** Tailwind CSS 4.x with CSS custom properties
- **Deployment:** Cloudflare Pages with Cloudflare Workers adapter
- **Testing:** Vitest (unit tests for form validation, rate limiting, utilities)
- **CI/CD:** GitHub Actions (type check → tests → build → deploy)
- **Email:** Resend for form notification emails
- **CAPTCHA:** Cloudflare Turnstile for form spam protection
- **Error Monitoring:** Sentry via `@sentry/cloudflare` (dynamic import, no-op without DSN)
- **Content:** Astro content collections with Zod schemas for capabilities and insights
- **Dependency Updates:** Dependabot for weekly npm and GitHub Actions updates

## Good Default Build Mindset
- build the shared layout and brand system first
- keep the homepage focused
- make Capabilities data-driven
- surface proof signals early
- keep forms and interactions simple
- optimize for clarity, maintainability, and owner editing
