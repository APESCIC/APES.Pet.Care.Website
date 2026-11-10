# APES Pet Care Clinic Website

Public website repository for <https://www.apespetcare.org.uk/>, maintained by the Association of Protecting Exotic Species CIC.

<p align="center">
  <a href="https://www.apespetcare.org.uk/"><img alt="Website: www.apespetcare.org.uk live" src="https://img.shields.io/badge/website-www.apespetcare.org.uk%20live-0f7f75"></a>
  <img alt="Status: Stable" src="https://img.shields.io/badge/status-stable-0f7f75">
  <img alt="Version: v3.3.12" src="https://img.shields.io/badge/version-v3.3.12-0f7f75">
  <img alt="Runtime: HTML with PHP support tools" src="https://img.shields.io/badge/runtime-HTML%20%2B%20PHP%20tools-245c6b">
  <img alt="Hosting: Cloudron LAMP compatible" src="https://img.shields.io/badge/hosting-Cloudron%20LAMP%20compatible-55423d">
</p>

## Current release

- Version: `v3.3.12`
- Status: Stable
- Summary: Maintenance release. The site is unchanged for visitors; it now follows the APES repository standards (Laragon preview, versions from the milestone version, tagged releases and deploys, GitHub security checks).
- Public Change Log Hub: `/changelog/`
- Canonical release records: root `VERSION`, root `CHANGELOG.md`, `public/VERSION`, and `public/CHANGELOG.md`

## Project purpose

This repository powers the APES Pet Care Clinic public website. The site explains available welfare-first support for pet owners, species-specific care routes, booking guidance, donation options, policies, and contact paths.

The current architecture intentionally stays simple:

- Static HTML route files under `public/`
- Shared CSS, JavaScript, images, and consent-gated third-party client-side integrations only
- Apache and `.htaccess` routing with `index.html` as the preferred public entrypoint
- PHP support tools for shared-chrome syncing, public-root checks, and smoke testing
- No frontend framework, package manager, database, persistent PHP application, or build pipeline required for the live public site

## Repository structure

```text
.
|-- .github/
|-- dev/
|   |-- sync-site-chrome.php
|   |-- check-public-root.sh
|   `-- smoke-test.sh
|-- docs/
|   |-- local-preview.md
|   |-- maintenance-artifacts.md
|   `-- preview-checklist.md
|-- public/
|   |-- .htaccess
|   |-- 403.html
|   |-- 404.html
|   |-- 500.html
|   |-- VERSION
|   |-- CHANGELOG.md
|   |-- assets/
|   |   |-- css/
|   |   |-- theme/
|   |   `-- ...
|   |-- changelog/
|   |   `-- index.html
|   |-- services/
|   |   `-- index.html
|   |-- bookings/
|   |   `-- index.html
|   |-- policies/
|   `-- ...
|-- VERSION
|-- CHANGELOG.md
|-- README.md
`-- AGENTS.md
```

## Document root and deployment

- Document root: `public/`
- Expected hosting: HTML-first Apache hosting, including Cloudron LAMP, with PHP limited to preview/support tooling unless a future approved task expands the scope
- Primary route pattern: folder-based URLs such as `/services/` and `/contact/`
- Redirects and error documents are managed in `public/.htaccess`

## Local development

Laragon is the only supported local set-up. Its Apache serves `public/` with the same `.htaccess` rules as Cloudron.

1. Once: `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\laragon-setup.ps1` links `C:\laragon\www\apes-pet-care-website` to this clone, so Laragon serves `http://apes-pet-care-website.test`.
2. Before each change: `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\preview.ps1` pulls the latest changes and starts Browsersync on `http://localhost:3103/`, which reloads the page on save.
3. Use `docs/preview-checklist.md` for route, footer, sitemap, error-page, and hosting checks, and run `php scripts/check-site.php`.

Notes:

- External integrations and absolute web URLs such as `https://...` remain unchanged.
- Legacy snapshot files under `public/crawl/` are maintenance artifacts and are not part of the runtime website.
- Keep public routes as static HTML, CSS, browser JavaScript, images, and Apache configuration so the deployable tree remains Cloudron LAMP-compatible.
- The repo-level `eslint.config.js` covers the browser JavaScript under `public/assets/js/`; CI runs it.
- This repository does not depend on PHP to render the public routes in production. PHP is used for support tooling: shared-chrome syncing, public-root checks, and the smoke test.

See `docs/local-preview.md` for the full local preview workflow, and `CONTRIBUTING.md` for how work ships.

## HTML-first route architecture

The live website now renders from static HTML route files and shared front-end assets:

- `public/index.html` and `public/**/index.html`
  Canonical public routes served as static HTML documents.
- `public/403.html`, `public/404.html`, and `public/500.html`
  Branded public error pages wired through Apache `ErrorDocument`.
- `public/assets/css/styles.css`
  Compatibility stylesheet entrypoint that preserves the live asset URL used by the static HTML routes.
- `public/assets/theme/clinic.css`
  Canonical shared clinic theme covering layout, APES design tokens, buttons, pre-pay cards, navigation, hero patterns, and Change Log Hub styling.
- `public/assets/js/site.js`
  Shared interaction layer for mobile navigation, click-driven desktop mega-menu behaviour, popup windows, reveal animation, and optional Change Log Hub filtering.
- `public/includes/header.html`, `public/includes/menu-desktop.html`, `public/includes/menu-mobile.html`, and `public/includes/footer.html`
  Source-of-truth site chrome fragments used for independent header, desktop menu, mobile menu, and footer maintenance.
- `dev/sync-site-chrome.php`
  Maintenance sync tool that injects the site chrome fragments into every runtime HTML route and keeps route-relative links aligned by page depth.

Each public page now follows the same maintenance pattern:

1. Keep route content in the route's `index.html`.
2. Preserve canonical URLs, metadata, Open Graph tags, and JSON-LD directly in the page head.
3. Keep the shared site chrome and navigation patterns consistent across routes.
4. Update release records whenever public or operational website behaviour changes.
5. Run `dev/sync-site-chrome.php` whenever a site chrome fragment changes so the generated runtime HTML stays in sync.

## Brand and asset locations

- The canonical shared clinic theme lives in `public/assets/theme/clinic.css`, with `public/assets/css/styles.css` retained as the public compatibility entrypoint.
- Treat `public/assets/theme/clinic.css` as the editable source of truth for shared APES Pet Care Clinic theming. `public/assets/css/styles.css` should remain a stable browser-facing import wrapper unless the public asset contract is intentionally migrated.
- Treat `public/assets/js/site.js` as the single shared interaction file for navigation, popups, reveal states, and Change Log Hub controls.
- Optimized clinic logos for shared chrome and footer lockups live in `public/assets/logos/optimized/`.
- Public favicon and app-icon files live in `public/favicons/`.
- Clinic-specific website imagery lives in `public/assets/images/`.
- Open Graph and social-share images live in `public/assets/social/`.

## Integrations preserved in this repo

The current HTML-first pass preserves existing public integrations:

- Booking form links
- Stripe payment and plan links
- Chatwoot
- OneSignal
- Donorbox sticky widget
- External APES News redirects

These integrations remain runtime dependencies of the live website even though the site itself no longer depends on a frontend build toolchain.

## Release records and versioning

APES CIC release hygiene for this repository now uses mirrored canonical records:

- Root `VERSION`
- Root `CHANGELOG.md`
- `public/VERSION`
- `public/CHANGELOG.md`
- Public Change Log Hub route at `/changelog/`

When a public-facing or operational website change is made:

1. Choose the correct semantic version bump.
2. Update both version files.
3. Update both changelog files.
4. Update the Change Log Hub route data.
5. Confirm footer version output and the static Change Log Hub match the new release.

## SEO, routing, and compliance notes

- Keep page titles, meta descriptions, canonicals, robots, and structured data intact unless a change requires an update.
- Keep `/news/`, `/news/newsletters/`, and `/news/tag/news-letters/` redirecting to the APES News site.
- Keep footer links for Donate, Privacy Policy, Terms and Conditions, and Change Log Hub present and correct.
- Keep branded HTML error pages available for `403`, `404`, and `500` handling.
- Keep `sitemap.xml` and `robots.txt` aligned with the live public routes.

## Legacy maintenance artifacts

Some files inside `public/` exist as maintenance or historic migration artifacts rather than runtime dependencies, including crawl snapshots and audit records.

Reference note:

- See `docs/maintenance-artifacts.md` for the current runtime source of truth versus retained legacy artifacts.

Current default:

- Keep retained artifacts unless a later task proves they are safe to remove or move.
- Treat them as non-authoritative for runtime unless the task specifically uses them.

## Validation expectations

Before release in a PHP-capable environment:

- Check main public routes on desktop and mobile widths.
- Check footer links, Change Log Hub, robots, and sitemap references.
- Check booking, Stripe, contact, and News redirect behaviour.
- Check browser console and missing assets.
- Run PHP syntax checks where `php` CLI is available.
- Run `dev/check-public-root.sh` and `dev/smoke-test.sh` where shell support is available.

Current workspace limitations:

- `php` CLI may not be available in every local workspace, but the live site does not depend on PHP for public route rendering.
- Browser QA and real Apache error-document testing still need to be completed elsewhere before release.

## Security and operational notes

- Do not commit secrets or production credentials.
- Do not deploy automatically from Codex work without explicit approval.
- Preserve public URLs and visible content unless a task explicitly calls for change.
- Prefer the smallest safe HTML, CSS, JavaScript, and Apache change over introducing new complexity.

## Next-step workflow

For typical maintenance work:

1. Inspect the existing route or include first.
2. Keep page content in the route template unless it becomes genuinely shared.
3. Update release records for qualifying public or operational changes.
4. Verify footer compliance, News redirects, sitemap, robots, and error-page coverage when relevant.
5. Show the diff and validation notes before any commit.





