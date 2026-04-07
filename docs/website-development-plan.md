# Website Development Plan

Status of planned work for the Infinity Stone Solutions website.

## Completed Sprints

### Foundation (completed)
- Astro 6 project with Cloudflare Pages adapter
- BaseLayout with SEO metadata, structured data, sitemap
- Brand system (colors, typography, CTA labels) in centralized data files
- SiteHeader with logo and navigation
- SiteFooter with nav columns and contact info
- Homepage with hero, proof strip, capability highlights, credibility, CTA sections
- 6 capability content collection entries with detail pages
- Who We Serve with tabbed sector display
- Past Performance page
- About page with leadership team profiles
- Capability Statement (full, one-page, and print versions)
- Contact, Partners, and Careers forms
- Privacy policy with print layout
- Custom 404 page
- Responsive design across all pages

### Content Marketing (completed)
- 7 insight articles targeting federal IT buyers
- Insights index page with article cards
- Featured Insights section on homepage (3 most recent)
- InsightCta component after each article
- Blog-style article pages with markdown rendering

### Component Consolidation (completed)
- CapabilityHighlights extracted from 3 inline copies into 1 shared component
- FormStatusBanners, TurnstileWidget, HoneypotField, FormScripts extracted into shared form components
- CapabilityCard grid height equalization script

### Testing & CI (completed)
- Vitest installed with 33 unit tests
- Tests cover form validation schemas, rate limiting, HTML escaping
- GitHub Actions CI: type check → tests → build → deploy
- Dependabot for weekly dependency updates

### Security Hardening (completed)
- HSTS header
- Tightened CSP (object-src, base-uri, form-action, upgrade-insecure-requests)
- Turnstile verification fetch timeout (5s AbortController)
- Sanitized error messages in all form handlers
- security.txt
- npm audit fix (picomatch vulnerabilities resolved)
- File magic number validation for resume uploads
- Sentry error monitoring integration (dynamic import)
- Rate limiting on all form endpoints

### Navigation Dropdowns (completed)
- NavigationItem type extended with optional children
- mainNavigation restructured into Solutions, Insights, About, Contact groups
- Desktop dropdowns with hover-open and chevron animation
- Mobile collapsible groups with tap-to-expand
- Active-page detection across dropdown children

## Known Pending Items

### Content
- **Cathi Landauer profile** — awaiting photo and profile text approval. Qualification injection doc exists at `docs/cathi-landauer-qualification-injection.md`
- **Sentry DSN** — integration is ready, needs project creation at sentry.io and DSN added to environment variables

### Future Considerations
These items were discussed but deferred. They are not committed work — revisit based on business need:

- **Nonce-based CSP** — would replace `'unsafe-inline'` with per-request nonces. Adds middleware complexity. Current CSP is sufficient since all scripts are first-party or trusted CDN.
- **Persistent rate limiting** — current in-memory rate limiting resets on worker restart. Cloudflare KV or D1 could persist across restarts if abuse becomes an issue.
- **Analytics dashboard** — GA4 and GTM container IDs are configured but may need verification of actual tracking.
- **Additional insight articles** — content pipeline is established, new articles just need markdown files.
- **Additional capabilities** — content collection supports unlimited entries, just add new `.md` files.
