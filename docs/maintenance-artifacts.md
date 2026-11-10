# Maintenance Artifacts

This repository treats the HTML website under `public/` as the runtime source of truth, with PHP limited to support tooling for local preview and validation.

Some older files remain because they may still be useful for audit history, manual content reference, or later cleanup work. They are not required for the live Cloudron LAMP runtime unless a future task proves otherwise.

## Runtime source of truth

Use these files and directories as the active website architecture:

- `public/index.html`
- `public/**/index.html`
- `public/403.html`
- `public/404.html`
- `public/500.html`
- `public/assets/`
- `public/assets/theme/clinic.css`
- `public/assets/js/site.js`
- `public/includes/header.html`
- `public/includes/menu-desktop.html`
- `public/includes/menu-mobile.html`
- `public/includes/footer.html`
- `public/.htaccess`
- `public/robots.txt`
- `public/sitemap.xml`
- `VERSION`
- `CHANGELOG.md`
- `public/VERSION`
- `public/CHANGELOG.md`
- `dev/sync-site-chrome.php`
- `dev/check-public-root.sh`
- `dev/smoke-test.sh`
- `docs/local-preview.md`
- `docs/preview-checklist.md`

## Legacy or maintenance-only artifacts

These files should be treated as non-runtime unless a task explicitly depends on them:

- `public/crawl/`
  Crawl extracts, text snapshots, and intermediate audit content retained for reference. Python helper scripts have been removed from this folder so it remains a non-executable reference archive for the Cloudron LAMP deployment.
- `public/crawl_urls.txt`
  Historic route list used by older crawl or extraction workflows.
- `public/sitemap.html`
  Human-readable sitemap artifact retained for reference alongside the canonical XML sitemap.
- `public/PAYMENT_LINK_AUDIT.md`
  Governance and audit record for Stripe link inventory rather than a runtime dependency.

## Default handling

- Keep these artifacts unless a later task proves they are safe to remove or relocate.
- Do not treat them as the deployment contract for the live site.
- Prefer updating the active static HTML routes and shared front-end assets over reviving older generation or Python helper workflows.
- Keep PHP helper use limited to preview routing, public-root validation, and smoke testing unless a future approved task changes the architecture.

## Theme source model

- This repo intentionally mirrors parts of the `www.apes.org.uk` theme pattern without adopting the PHP include and static-export architecture.
- `public/assets/theme/clinic.css` is the canonical shared theme source for APES Pet Care Clinic.
- `public/assets/css/styles.css` remains the stable public stylesheet URL and should continue importing the canonical theme file.
- `public/assets/js/site.js` is the shared interaction layer for navigation, popups, reveal states, cookie consent, and Change Log Hub behaviour.
- `public/includes/` holds the source-of-truth fragments for the header, desktop menu, mobile menu, and footer.
- `dev/sync-site-chrome.php` injects those source fragments into the runtime HTML routes while preserving route-specific heads and page content.
- Keep `public/` as the preview and deployment web root so local testing matches deployed asset paths.
