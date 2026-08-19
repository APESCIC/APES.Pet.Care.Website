## [v3.3.11] - 2026-08-19

<span class="pill pill-version">Version v3.3.11</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-content">Contact Details</span>
<span class="pill pill-fix">Crawl Protection</span>

### Summary

Updated live clinic contact details to the Morris Street address including Merseyside, the new St Helens phone number, and a visitor-visible clinic email that is not offered to crawlers to follow or reuse.

### Detailed changes

- Replaced the published phone number `0300 302 0228` with `01744 374 015` (`tel:01744374015`, JSON-LD `+441744374015`) across shared chrome, sidebars, contact and donate copy, error pages, and `public/sitemap.html`.
- Expanded the postal address to `40 Morris Street, St Helens, Merseyside, WA9 3EN`.
- Kept `info@apespetcare.org.uk` available to visitors through `rel="nofollow"` links hydrated from split data attributes in `public/assets/js/site.js`, with a noscript fallback that does not use a harvestable `mailto:` string.
- Removed the Organization JSON-LD `email` property so search engines are not given the address in structured data.
- Synced header and footer fragments through `dev/sync-site-chrome.php` where PHP CLI is available, and aligned mirrored version files, changelogs, Change Log Hub, README, and footer version text to `v3.3.11`.

### Type pills

- <span class="pill pill-type">Changed</span> Updates visitor-facing contact copy on existing routes without changing routing, forms, or hosting.
- <span class="pill pill-content">Contact Details</span> Aligns address, phone, and clinic email across chrome, page copy, and structured data.
- <span class="pill pill-fix">Crawl Protection</span> Stops crawlers being given a plaintext `mailto:` address or JSON-LD email to follow or reuse.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Shared header and footer, Contact, Donate, Need Help Fast sidebars, Organization JSON-LD, Change Log Hub, error pages, and sitemap HTML.
- Files changed: `public/includes/header.html`, `public/includes/footer.html`, `public/assets/js/site.js`, runtime HTML routes, `public/sitemap.html`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, and `README.md`.
- User groups affected: Public visitors looking up clinic contact details.
- Public impact: Callers and visitors see the new phone number and full postal address; the clinic email remains usable in the browser without being published for crawler reuse.
- Internal impact: GitHub issue #34 tracks this patch. Email harvesters that execute JavaScript can still recover the address.

### Version decision

- Previous version: `v3.3.10`
- New version: `v3.3.11`
- Version type: Stable patch release
- Reason for version bump: This is a visitor-facing contact-details correction and crawl-protection change on existing routes with no hosting or architecture change.

### Validation

- Checks run: leftover-string grep on live `public/` excluding `public/crawl/`, PHP chrome sync where CLI is available, local preview at `http://127.0.0.1:8080/` and `/contact/`, and a `file:///` static-page check.
- Manual checks completed: Confirm hydrated email links use `rel="nofollow"`, JSON-LD has no `email` property, and address copy includes Merseyside.
- Known limitations: JavaScript-capable harvesters can still assemble the email. `file:///` cannot exercise PHP routing. Historical `public/crawl/` archives were left unchanged.
- Rollback notes: Restore previous chrome, JSON-LD email, and phone copy, then revert mirrored release records to `v3.3.10`.

## [v3.3.10] - 2026-06-12

<span class="pill pill-version">Version v3.3.10</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Layout Fix</span>
<span class="pill pill-content">Sidebar Content</span>

### Summary

Extended the reassurance-card sidebar rollout across the matching service-detail routes and synced the README back to the canonical version records.

### Detailed changes

- Moved the final informational cards from the main article flow into the right-hand sidebar stack on `public/general-services/index.html`, `public/dog-care/index.html`, `public/cat-care/index.html`, `public/lab-services/index.html`, `public/rabbit-care/index.html`, `public/guinea-care/index.html`, and `public/ferret-care/index.html`.
- Reused the existing `.side-card-reassurance` pattern and upgraded each affected sidebar to the sticky stack variant so the right rail matches the already-migrated routes.
- Left primary service and priced offer cards in the main article column on other service pages, including routes such as `reptile-care` and `invert-care`.
- Synced mirrored version files, markdown changelog records, the Change Log Hub entry, repeated footer version text, and the previously stale `README.md` release version to `v3.3.10`.

### Type pills

- <span class="pill pill-type">Changed</span> Reorders informational content on existing service-detail routes without changing routing, forms, or payment flows.
- <span class="pill pill-fix">Layout Fix</span> Keeps low-priority reassurance content out of the main article column once the primary service content has ended.
- <span class="pill pill-content">Sidebar Content</span> Uses the established right-rail reading order so help, payment guidance, and reassurance content stay grouped together.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: General Services, Dog Care, Cat Care, Lab Services, Rabbit Care, Guinea Pig Care, Ferret Care, mirrored release records, Change Log Hub, repeated footer version text, and README current-release metadata.
- Files changed: `public/general-services/index.html`, `public/dog-care/index.html`, `public/cat-care/index.html`, `public/lab-services/index.html`, `public/rabbit-care/index.html`, `public/guinea-care/index.html`, `public/ferret-care/index.html`, `README.md`, `VERSION`, `public/VERSION`, `public/CHANGELOG.md`, `CHANGELOG.md`, `public/changelog/index.html`, and runtime HTML pages carrying repeated footer version text.
- User groups affected: Public visitors using the affected service-detail routes and maintainers reading repo release metadata.
- Public impact: Informational service-route reassurance now appears in the right-hand information rail instead of as the last article card on the affected service-detail pages.
- Internal impact: Release records, footer version text, and README release notes now agree on the live version.

### Version decision

- Previous version: `v3.3.9`
- New version: `v3.3.10`
- Version type: Stable patch release
- Reason for version bump: This is a visitor-facing layout adjustment plus release-record sync on existing routes with no hosting, runtime, or route changes.

### Validation

- Checks run: `php -l dev/router.php`, repo public-root validation, local preview via `php -S 127.0.0.1:8080 -t public dev/router.php`, preview smoke requests for `/general-services/`, `/dog-care/`, `/cat-care/`, `/lab-services/`, `/rabbit-care/`, `/guinea-care/`, `/ferret-care/`, `/changelog/`, `/robots.txt`, `/sitemap.xml`, `/403.html`, `/404.html`, and `/500.html`.
- Manual checks completed: Source review confirmed the moved cards now live in the affected sidebars after the primary help and payment guidance cards where applicable, and the selected article columns no longer end with those reassurance blocks.
- Known limitations: Browser automation is still limited in this environment, so visual confirmation depends on local preview checks and direct browser review rather than scripted UI capture.
- Rollback notes: Restore the moved informational cards to the article flow on the four affected routes and revert mirrored release records and repeated version text to return to `v3.3.9`.

## [v3.3.9] - 2026-06-12

<span class="pill pill-version">Version v3.3.9</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Layout Fix</span>
<span class="pill pill-content">Sidebar Content</span>

### Summary

Moved the low-priority reassurance cards out of the main article column and into the right-hand sidebar stack on the shared sticky-sidebar routes.

### Detailed changes

- Added a dedicated `.side-card-reassurance` variant in `public/assets/theme/clinic.css` so moved reassurance blocks use the existing sidebar card system without inheriting the article-card width and spacing.
- Moved the reassurance and attendance guidance cards from the bottom of the main article flow into the right rail on `public/index.html`, `public/services/index.html`, `public/bookings/index.html`, and `public/contact/index.html`.
- Kept the reassurance copy intact while changing the placement so the content now appears after the primary help card and before the support illustration, with the Services route preserving its existing payment-guidance side card.
- Synced mirrored version files, markdown changelog records, the Change Log Hub entry, and repeated footer version text to `v3.3.9`.

### Type pills

- <span class="pill pill-type">Changed</span> Reorders low-priority informational content on the shared two-column layout without changing routes, forms, or public metadata.
- <span class="pill pill-fix">Layout Fix</span> Prevents reassurance cards from extending the main article column after the primary page content has ended.
- <span class="pill pill-content">Sidebar Content</span> Keeps the informational copy available on the affected routes while aligning it with the existing sidebar reading order.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Home, Services Hub, Bookings, Contact, shared sidebar theme CSS, mirrored release records, Change Log Hub, and repeated footer version text.
- Files changed: `public/index.html`, `public/services/index.html`, `public/bookings/index.html`, `public/contact/index.html`, `public/assets/theme/clinic.css`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, and runtime HTML pages carrying repeated footer version text.
- User groups affected: Public visitors using the homepage, service payment guidance, bookings, and contact routes.
- Public impact: Reassurance and attendance guidance now sits in the right-hand information rail instead of appearing as a final article card on the affected pages.
- Internal impact: Shared sidebar styling now supports a reusable reassurance-card variant for sticky-right-rail pages.

### Version decision

- Previous version: `v3.3.8`
- New version: `v3.3.9`
- Version type: Stable patch release
- Reason for version bump: This is a visitor-facing layout adjustment on existing routes with no route, hosting, or runtime changes.

### Validation

- Checks run: `C:\xampp\php\php.exe -l dev\router.php`, PowerShell equivalent of `dev/check-public-root.sh`, and preview smoke requests against `http://127.0.0.1:8080/` for `/`, `/index.html`, `/robots.txt`, `/sitemap.xml`, `/changelog/`, `/403.html`, `/404.html`, `/500.html`, `/crawl/`, and `/missing-smoke-test-route/`.
- Manual checks completed: Source review confirmed the moved cards now live inside the sidebar stack on the Home, Services, Bookings, and Contact pages and no longer remain at the bottom of the main article markup.
- Known limitations: Browser-level automation against the local preview could not run in this environment because Playwright is installed without its Chromium binary, so visual verification is limited to source review plus the passing preview smoke checks.
- Rollback notes: Restore the final article cards on the affected routes, remove `.side-card-reassurance`, and revert mirrored version and changelog records to return to `v3.3.8`.

## [v3.3.8] - 2026-06-12

<span class="pill pill-version">Version v3.3.8</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Workflow</span>
<span class="pill pill-accessibility">Developer Tooling</span>

### Summary

Documented the XAMPP-backed PHP CLI fallback for Windows maintainers and re-verified the repo's recommended VS Code extensions, npm dependency state, and local preview validation workflow.

### Detailed changes

- Verified the existing workspace recommendations still match the repo workflow, then installed the recommended VS Code ESLint and Intelephense extensions locally through the VS Code CLI.
- Re-ran `npm install` to confirm the declared ESLint dependency and lockfile were already current without changing the repo's production runtime model.
- Updated `README.md` and `docs/local-preview.md` to show the `C:\xampp\php\php.exe` fallback when Windows maintainers do not have `php` on `PATH`.
- Re-verified the XAMPP PHP CLI, PHP syntax checks, ESLint validation, public-root check, local preview server, and smoke tests against the documented HTML-first workflow.

### Type pills

- <span class="pill pill-type">Changed</span> Updates maintainer setup guidance and validation evidence without changing public routes or runtime architecture.
- <span class="pill pill-fix">Workflow</span> Documents the XAMPP-backed PHP path that is already suitable for local preview and repo checks on Windows.
- <span class="pill pill-accessibility">Developer Tooling</span> Keeps local setup instructions aligned with the recommended VS Code extensions and the existing ESLint and PHP support workflow.

### Affected areas

- Website: APES Pet Care Clinic public website repository.
- Page or route: README current-release notes, local preview documentation, mirrored release records, Change Log Hub, and repeated footer version text.
- Files changed: `README.md`, `docs/local-preview.md`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, and runtime HTML pages carrying repeated footer version text.
- User groups affected: Maintainers setting up the repo locally on Windows.
- Public impact: No visitor-facing route, content, SEO, sitemap, footer links, or hosting behavior changes.
- Internal impact: The documented Windows setup path now matches the validated XAMPP-based PHP workflow used to run the repo checks.

### Version decision

- Previous version: `v3.3.7`
- New version: `v3.3.8`
- Version type: Stable patch release
- Reason for version bump: This is a maintainer-facing documentation and workflow clarification that updates release records without changing the public website runtime.

### Validation

- Checks run: VS Code CLI extension install for `dbaeumer.vscode-eslint` and `bmewburn.vscode-intelephense-client`, `npm install`, `npx eslint public/assets/js/site.js`, `C:\xampp\php\php.exe -l dev/router.php`, `C:\xampp\php\php.exe -l dev/sync-site-chrome.php`, `C:\xampp\php\php.exe dev/sync-site-chrome.php --check`, `sh dev/check-public-root.sh`, `C:\xampp\php\php.exe -S 127.0.0.1:8080 -t public dev/router.php`, and `sh dev/smoke-test.sh`.
- Manual checks completed: Confirmed the local preview server responded at `http://127.0.0.1:8080/` and the documented smoke-test routes returned the expected statuses.
- Known limitations: `C:\xampp\php\php.exe dev/sync-site-chrome.php --check` still reports pre-existing out-of-sync runtime HTML pages versus the shared include fragments; this setup refresh documented the validated PHP path but did not widen scope into a full chrome resync.
- Rollback notes: Revert the XAMPP workflow notes, mirrored release records, Change Log Hub entry, and repeated footer version text to return to `v3.3.7`.

## [v3.3.7] - 2026-06-12

<span class="pill pill-version">Version v3.3.7</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-content">Content Accuracy</span>
<span class="pill pill-fix">Pricing Copy</span>

### Summary

Renamed the flea and worming payment cards and aligned their displayed pricing copy across the affected dog, cat, ferret, and Services Hub routes.

### Detailed changes

- Renamed the payment options from `Flea control support` to `Flea Control` and from `Parasite control guidance` to `Worming Control` on the dog, cat, ferret, and Services Hub runtime pages.
- Updated the affected routine-support pricing text to `£3 + Cost of Product Used` on the runtime cards and the species-page summary price lines so the sections stay internally consistent.
- Synced the matching `aria-label` text, `public/PAYMENT_LINK_AUDIT.md`, mirrored version files, changelog records, Change Log Hub entry, README current-release note, and repeated footer version text to `v3.3.7`.

### Type pills

- <span class="pill pill-type">Fixed</span> Corrects public-facing service labels and pricing copy without changing routes, payment destinations, or hosting assumptions.
- <span class="pill pill-content">Content Accuracy</span> Keeps the flea and worming payment wording aligned across the affected species pages, the Services Hub, and the payment audit record.
- <span class="pill pill-fix">Pricing Copy</span> Replaces the old `£3.00` card wording with the requested `£3 + Cost of Product Used` display text.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: `public/dog-care/index.html`, `public/cat-care/index.html`, `public/ferret-care/index.html`, `public/services/index.html`, `public/PAYMENT_LINK_AUDIT.md`, README current-release notes, version files, changelog records, Change Log Hub, and repeated footer version text.
- Files changed: affected runtime service pages, `public/PAYMENT_LINK_AUDIT.md`, `README.md`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, and runtime HTML pages carrying repeated footer version text.
- User groups affected: Public visitors comparing routine flea and worming support options before pre-paying or booking with APES.
- Public impact: Visitors now see the requested Flea Control and Worming Control labels together with the updated pricing copy across the affected service routes.
- Internal impact: Payment-label audit records and release metadata remain aligned with the visitor-facing pages.

### Version decision

- Previous version: `v3.3.6`
- New version: `v3.3.7`
- Version type: Stable patch release
- Reason for version bump: This is a user-visible content and pricing-copy correction that updates public runtime pages and mirrored release records without changing runtime architecture.

### Validation

- Checks run: repo text search for affected labels/prices, `npx eslint public/assets/js/site.js`, and git diff review.
- Manual checks completed: Planned for `/dog-care/`, `/cat-care/`, `/ferret-care/`, and `/services/` once local preview is available.
- Known limitations: `php` CLI availability must be confirmed before PHP router, public-root, and local preview checks can be run in this workspace.
- Rollback notes: Revert the affected service-page copy, payment audit record, version files, README current-release note, changelog records, Change Log Hub entry, and repeated footer version text to return to `v3.3.6`.

## [v3.3.6] - 2026-06-12

<span class="pill pill-version">Version v3.3.6</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Workflow</span>
<span class="pill pill-accessibility">Developer Tooling</span>

### Summary

Added repo-aligned VS Code extension recommendations, validation tasks, and a minimal ESLint setup for the existing browser JavaScript without changing the HTML-first website runtime model.

### Detailed changes

- Added `.vscode/extensions.json` with recommended ESLint and PHP editor support extensions for the repo's documented workflow.
- Replaced the stale `phpSwitcher.detectedApps` workspace setting with ESLint flat-config validation settings and expanded `.vscode/tasks.json` with PHP lint and chrome-sync check tasks that match existing repo commands.
- Added a minimal `eslint.config.js` that targets `public/assets/js/**/*.js`, then ran `npm install` to reconcile the declared ESLint dependency without adding new packages or changing the site's production runtime.
- Synced the mirrored version files, changelog records, Change Log Hub entry, README current-release notes, and repeated footer version text to `v3.3.6`.

### Type pills

- <span class="pill pill-type">Changed</span> Updates developer workflow files without changing public routes, hosting assumptions, or runtime architecture.
- <span class="pill pill-fix">Workflow</span> Aligns VS Code recommendations, validation tasks, and lint setup with the repo's PHP-preview and HTML-first maintenance workflow.
- <span class="pill pill-accessibility">Developer Tooling</span> Makes editor feedback and repeatable checks easier to use for maintainers working in VS Code.

### Affected areas

- Website: APES Pet Care Clinic public website repository.
- Page or route: Workspace tooling files, mirrored release records, Change Log Hub, README current release, and runtime HTML pages carrying repeated footer version text.
- Files changed: `.vscode/extensions.json`, `.vscode/settings.json`, `.vscode/tasks.json`, `eslint.config.js`, `README.md`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, and repeated `public/**/*.html` footer version strings.
- User groups affected: Maintainers and contributors working in VS Code or reviewing repo-supported validation tasks.
- Public impact: No visitor-facing route or content behavior changes.
- Internal impact: Workspace recommendations, linting coverage, and validation task discovery now match the current repo workflow more closely.

### Version decision

- Previous version: `v3.3.5`
- New version: `v3.3.6`
- Version type: Stable patch release
- Reason for version bump: This is a repo-tracked workflow and release-record alignment update that changes developer tooling and operational maintenance surfaces without changing public architecture.

### Validation

- Checks run: `npm install`, `npx eslint public/assets/js/site.js`, git diff review, git status review, and task/workspace source review.
- Manual checks completed: Confirmed the preview-server task still uses `php -S 127.0.0.1:8080 -t public dev/router.php`, extension recommendations are limited to ESLint and PHP support, and the ESLint config is scoped to the existing browser JavaScript only.
- Known limitations: `php` CLI is not available in this workspace, so `php -l dev/router.php`, `php -l dev/sync-site-chrome.php`, `php dev/sync-site-chrome.php --check`, and local preview startup could not be executed here.
- Rollback notes: Revert the workspace files, ESLint config, README current-release note, mirrored version files, changelog entries, Change Log Hub entry, and repeated footer version text to return to `v3.3.5`.

## [v3.3.5] - 2026-06-12

<span class="pill pill-version">Version v3.3.5</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-content">Content Accuracy</span>
<span class="pill pill-compliance">Service Scope</span>

### Summary

Reconciled the beta website's products and services content against the old live APES Pet Care Clinic website so public service routes, pricing guidance, lab examples, and the APES Pet Shop products route better match the services APES offers.

### Detailed changes

- Added the missing Products/APES Pet Shop route to the shared desktop menu, mobile menu, footer services list, homepage service cards, and Services Hub cards.
- Added an old-site services summary to the Services Hub and a general-services note covering consultations, microchipping, and care plans.
- Updated dog, cat, rabbit, guinea pig, ferret, reptile, and invertebrate service descriptions so flea, worming, nail/claw clipping, teeth and ear cleaning, shedding aid, parasite support, fang support, respiratory concern support, and moult support reflect the old website while retaining beta suitability warnings.
- Expanded Lab Services with the missing reptile test examples from the old site and corrected mojibake currency symbols across runtime HTML.
- Synced shared site chrome and repeated footer version text to `v3.3.5`.

### Type pills

- <span class="pill pill-type">Fixed</span> Corrects public service and product information without changing runtime architecture or routes.
- <span class="pill pill-content">Content Accuracy</span> Aligns beta service pages with the old website's listed products, services, and example prices.
- <span class="pill pill-compliance">Service Scope</span> Keeps veterinary-scope, suitability, emergency, and refund warnings visible while restoring missing service information.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: `public/index.html`, `public/services/index.html`, `public/general-services/index.html`, species service pages, `public/lab-services/index.html`, shared menu and footer includes, runtime HTML pages synced from shared chrome, README, version files, changelog records, and Change Log Hub.
- Files changed: shared chrome includes, homepage, Services Hub, General Services, Dog Care, Cat Care, Rabbit Care, Guinea Pig Care, Ferret Care, Reptile Care, Invert Care, Lab Services, runtime HTML routes carrying the shared header/footer, README, version files, changelog records, and Change Log Hub.
- User groups affected: Public visitors comparing service options, products, care plans, lab testing support, and pre-payment suitability before contacting or booking with APES.
- Public impact: Visitors can now see the products link and old-site service coverage while still seeing beta safety, scope, and referral guidance.
- Internal impact: Shared navigation and footer fragments now carry the Products route consistently across generated runtime pages.

### Version decision

- Previous version: `v3.3.4`
- New version: `v3.3.5`
- Version type: Stable patch release
- Reason for version bump: This is a user-visible content-correction release that fixes service/product information, example pricing, and shared navigation without adding new runtime dependencies or changing hosting assumptions.

### Validation

- Checks run: Old-site source review via web crawl/open, local source review, shared chrome sync, public-root check, PHP router syntax check, ESLint, PHP local preview smoke test, and git diff review.
- Manual checks completed: Confirmed Products appears in shared menus/footer, old-site service categories are represented on the Services Hub and relevant species routes, lab examples include the missing old-site reptile tests, and currency mojibake is removed from runtime HTML.
- Known limitations: Old-site text was used as a content reference, but final beta copy intentionally keeps APES veterinary-scope and suitability wording rather than copying older wording verbatim.
- Rollback notes: Revert the service-content updates, shared Products navigation/footer addition, Lab Services examples, version files, README release note, changelog records, Change Log Hub entry, and synced footer version text to return to `v3.3.4`.

## [v3.3.4] - 2026-06-12

<span class="pill pill-version">Version v3.3.4</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-fix">Layout Fix</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Tidied the service-page payment layout so service-specific cards stay in the main content while shared Stripe guidance now sits consistently in the right-hand column.

### Detailed changes

- Removed the repeated late `Pre-pay from this...` article panels from the species-detail service routes while keeping the smaller in-context service cards in place.
- Moved the shared `Before you pay` warning and Stripe process note into the sidebar on the Services Hub, General Services, and the affected species-detail routes.
- Added a small shared sidebar-guidance styling pass in `public/assets/theme/clinic.css` and synced the mirrored version files, changelog records, Change Log Hub entry, README current-release notes, and repeated footer version text to `v3.3.4`.

### Type pills

- <span class="pill pill-type">Fixed</span> Consolidates duplicated payment guidance without changing service routes, payment links, or runtime architecture.
- <span class="pill pill-fix">Layout Fix</span> Keeps service-specific payment cards in the main column and relocates shared payment guidance to the right-hand support column.
- <span class="pill pill-accessibility">Accessibility</span> Reduces repeated payment content and makes the sidebar guidance easier to scan across the affected service pages.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: `public/services/index.html`, `public/general-services/index.html`, `public/dog-care/index.html`, `public/cat-care/index.html`, `public/rabbit-care/index.html`, `public/guinea-care/index.html`, `public/ferret-care/index.html`, `public/reptile-care/index.html`, `public/invert-care/index.html`, mirrored release records, Change Log Hub, README current release, and runtime HTML pages carrying repeated footer version text.
- Files changed: `public/assets/theme/clinic.css`, the nine affected service routes, `README.md`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, and runtime HTML routes carrying the repeated footer version text.
- User groups affected: Public visitors comparing services and payment options, plus staff maintaining service-route release records.
- Public impact: Visitors now see one clearer payment-guidance location in the sidebar while the main content stays focused on the relevant service options for each page.
- Internal impact: Shared service-page structure is more consistent, which reduces repeated payment-content maintenance across the service route set.

### Version decision

- Previous version: `v3.3.3`
- New version: `v3.3.4`
- Version type: Stable patch release
- Reason for version bump: This is a user-visible service-page tidy-up that changes layout and content placement without changing routes, hosting assumptions, or payment-link behavior.

### Validation

- Checks run: Source review of the affected service routes, duplicate-payment-section removal checks, sidebar-guidance placement checks, release-record alignment review, and footer version sync checks.
- Manual checks completed: Confirmed by source review that the affected service routes now keep their service-specific cards in the article column, move the shared Stripe guidance into the sidebar, and remove the repeated `Pre-pay from this...` article sections from the species-detail pages.
- Known limitations: Full rendered browser QA and the documented PHP preview and smoke-test commands still depend on local environment support and need to be re-run after the source changes.
- Rollback notes: Revert the service-route HTML tidy-up, the shared sidebar-guidance styling update, mirrored release-record updates, Change Log Hub entry, README release note, and footer version sync to return to `v3.3.3`.

## [v3.3.3] - 2026-06-12

<span class="pill pill-version">Version v3.3.3</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-fix">Layout Fix</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Completed the shared hero-to-content alignment follow-up so the lower two-column section now matches the hero's desktop container and column flow.

### Detailed changes

- Updated the shared `public/assets/theme/clinic.css` desktop layout contract so both `.hero` and `.content-layout` use the same explicit container width, column tracks, and inter-column gap.
- Kept the existing tablet and mobile single-column collapse behavior unchanged while removing the desktop mismatch that still left the lower band looking narrower than the hero.
- Synced the mirrored version files, changelog records, Change Log Hub entry, README current-release notes, and repeated footer version text to `v3.3.3`.

### Type pills

- <span class="pill pill-type">Fixed</span> Corrects the incomplete follow-up from the previous shared layout release without changing routes, content, or runtime architecture.
- <span class="pill pill-fix">Layout Fix</span> Ensures the lower shared two-column band visually mates with the hero above it on desktop-width layouts.
- <span class="pill pill-accessibility">Accessibility</span> Preserves the existing responsive stacking behavior while improving scan consistency across repeated page templates.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Shared hero and `content-layout` styling used by the homepage, About Us, Services Hub, and other routes that follow the same pattern.
- Files changed: `public/assets/theme/clinic.css`, `README.md`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, and runtime HTML routes carrying repeated footer version text.
- User groups affected: Public visitors viewing desktop and large-tablet layouts, plus staff maintaining synced release records.
- Public impact: The content band beneath the hero now lines up with the same column geometry and width as the hero itself on shared layouts.
- Internal impact: Shared layout tokens now drive both sections together, reducing the chance of future alignment drift.

### Version decision

- Previous version: `v3.3.2`
- New version: `v3.3.3`
- Version type: Stable patch release
- Reason for version bump: This is a small user-visible corrective layout fix that preserves the site's routes, architecture, and hosting assumptions.

### Validation

- Checks run: Shared CSS source review, release-record alignment review, shared footer sync, PHP syntax checks, and local preview support checks where available.
- Manual checks completed: Confirmed by source review that the final active desktop `.hero` and `.content-layout` rules now share the same width, track, and gap tokens while the existing responsive collapse rules remain in place.
- Known limitations: Visual confirmation for the shared routes still depends on local browser preview after the static HTML files are refreshed.
- Rollback notes: Revert the shared layout token update, mirrored release-record updates, Change Log Hub entry, and footer version sync to return to `v3.3.2`.

## [v3.3.2] - 2026-06-12

<span class="pill pill-version">Version v3.3.2</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Layout Fix</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Aligned the shared two-column content layout with the hero layout so the desktop page structure now lines up cleanly across the site.

### Detailed changes

- Updated the shared `public/assets/theme/clinic.css` desktop `content-layout` grid to use the same left and right track proportions as the shared hero layout.
- Preserved the existing tablet and mobile single-column collapse behavior so the fix only changes desktop-width alignment.
- Synced the mirrored version files, changelog records, Change Log Hub entry, README current-release notes, and repeated footer version text to `v3.3.2`.

### Type pills

- <span class="pill pill-type">Changed</span> Refines the existing shared desktop layout without altering routes, structure, or runtime behavior.
- <span class="pill pill-fix">Layout Fix</span> Brings the hero and the two-column section below it into visual alignment across shared page templates.
- <span class="pill pill-accessibility">Accessibility</span> Keeps the established responsive stacking behavior intact while improving layout consistency for content scanning.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Shared hero and `content-layout` styling used by the homepage, About Us, Services Hub, and other routes that follow the same layout pattern.
- Files changed: `public/assets/theme/clinic.css`, `README.md`, `VERSION`, `public/VERSION`, `public/CHANGELOG.md`, `CHANGELOG.md`, `public/changelog/index.html`, and runtime HTML routes carrying the repeated footer version text.
- User groups affected: Public visitors viewing desktop and large-tablet layouts, plus staff maintaining synced release records.
- Public impact: Hero sections and the two-column content band beneath them now align more neatly on desktop-width pages.
- Internal impact: The shared layout system is more consistent and easier to maintain because both sections now use the same desktop column geometry.

### Version decision

- Previous version: `v3.3.1`
- New version: `v3.3.2`
- Version type: Stable patch release
- Reason for version bump: This is a user-facing visual polish to an existing shared layout pattern that preserves routes, hosting assumptions, and runtime architecture.

### Validation

- Checks run: Shared CSS source review, release-record alignment review, and targeted visual QA on the shared route pattern.
- Manual checks completed: Confirmed by source review that `.hero` and `.content-layout` now use matching desktop column proportions while the existing responsive single-column collapse rules remain in place.
- Known limitations: The documented PHP syntax, local-preview, public-root, and smoke-test commands still depend on the local environment supporting `php` CLI and repository shell scripts; those results should be confirmed from the fresh verification step after the code changes.
- Rollback notes: Revert the shared layout rule, mirrored release-record updates, Change Log Hub entry, README release note, and repeated footer version text sync to return to `v3.3.1`.

## [v3.3.1] - 2026-06-12

<span class="pill pill-version">Version v3.3.1</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-fix">SEO Fix</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Brought the public `sitemap.html` route into line with the live website's shared chrome, release governance, and SEO metadata standards.

### Detailed changes

- Rebuilt `public/sitemap.html` as a fully aligned public route with canonical metadata, Open Graph and Twitter metadata, structured data, the shared header and footer, cookie settings access, and footer version text.
- Added the standard temporary-premises notice, clinic-scope alert, support sidebar, and governance links so the sitemap route matches the rest of the launch-ready site experience instead of acting like a detached utility page.
- Synced the mirrored version files, changelog records, Change Log Hub entry, README current-release notes, and repeated footer version text to `v3.3.1`.

### Type pills

- <span class="pill pill-type">Fixed</span> Repairs a public route that was missing the site's standard governance and metadata layer.
- <span class="pill pill-fix">SEO Fix</span> Adds the missing canonical, description, Open Graph, and Twitter metadata to the sitemap route.
- <span class="pill pill-accessibility">Accessibility</span> Restores the shared skip link, navigation, footer, and cookie settings access on the sitemap page.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: `public/sitemap.html`, mirrored release records, Change Log Hub, README current release, and runtime HTML pages carrying repeated footer version text.
- Files changed: `public/sitemap.html`, `README.md`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, and runtime HTML routes carrying the repeated footer version text.
- User groups affected: Public visitors using the sitemap route, search and sharing surfaces that read sitemap page metadata, and staff checking launch readiness.
- Public impact: Visitors now get a consistent branded route with working governance links, shared navigation, footer controls, and proper metadata on `/sitemap.html`.
- Internal impact: The sitemap route now follows the same release-record and launch-governance pattern as the rest of the HTML-first site.

### Version decision

- Previous version: `v3.3.0`
- New version: `v3.3.1`
- Version type: Stable patch release
- Reason for version bump: This is a user-facing route fix that corrects missing metadata and shared site chrome on an existing public page without changing architecture, routes, or hosting assumptions.

### Validation

- Checks run: Source-led QA review of the public route set, metadata and footer-governance inspection, route/reference verification, and release-record alignment review.
- Manual checks completed: Confirmed by source review that `public/sitemap.html` now carries the same shared header, footer, cookie settings control, version text, governance links, and public metadata pattern used by the rest of the runtime site.
- Known limitations: `php` CLI remains unavailable in this workspace, so `php -l dev/router.php`, `php -l dev/sync-site-chrome.php`, `php dev/sync-site-chrome.php --check`, the documented PHP local-preview command, `dev/check-public-root.sh`, and `dev/smoke-test.sh` still need to be run in a PHP-enabled environment; the in-app browser connector also failed to attach in this sandboxed session, so rendered browser QA remains partially environment-limited here.
- Rollback notes: Revert the sitemap route rebuild, mirrored release-record updates, Change Log Hub entry, README release note, and repeated footer version text sync to return to `v3.3.0`.

## [v3.3.0] - 2026-06-12

<span class="pill pill-version">Version v3.3.0</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Layout Fix</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Completed the pre-live responsive optimisation pass across the APES Pet Care Clinic website and promoted the release from beta to stable.

### Detailed changes

- Consolidated shared responsive spacing, card padding, hero stacking, content/sidebar balance, and footer grid behavior in the clinic theme so repeated layout patterns stay consistent across desktop, tablet, and mobile widths.
- Tightened topbar, header, mobile navigation, service grid, feature-card, notice, and footer action-link behavior to reduce wrapping, crowding, and overflow risks across the runtime public routes and branded error pages.
- Promoted the mirrored version files, changelog records, Change Log Hub entry, README current-release notes, and repeated footer version text from `v3.2.11b` beta to stable `v3.3.0`.

### Type pills

- <span class="pill pill-type">Changed</span> Refines shared responsive presentation and spacing across the live website.
- <span class="pill pill-fix">Layout Fix</span> Reduces breakpoint-specific crowding, stacking, and card-spacing inconsistencies before go-live.
- <span class="pill pill-accessibility">Accessibility</span> Improves small-screen readability and reduces overflow risk for long headings, notices, and action links.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Shared clinic theme, all runtime public routes under `public/` excluding retained `public/crawl/` maintenance artifacts, branded `403`, `404`, and `500` pages, Change Log Hub, README current release, and mirrored version files.
- Files changed: `public/assets/theme/clinic.css`, `README.md`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, and runtime HTML routes carrying the repeated footer version text.
- User groups affected: Public visitors using desktop, laptop, tablet, and mobile devices, plus staff reviewing launch readiness.
- Public impact: Visitors now get more consistent card spacing, section rhythm, header/footer behavior, and small-screen presentation across the site.
- Internal impact: Shared responsive decisions are now concentrated in the clinic theme layer while release records move to the first stable website release.

### Version decision

- Previous version: `v3.2.11b`
- New version: `v3.3.0`
- Version type: Stable minor release
- Reason for version bump: This release completes the planned responsive optimisation pass, improves shared public presentation across multiple routes, and intentionally promotes the website from beta to stable ahead of go-live.

### Validation

- Checks run: Runtime route inventory review excluding `public/crawl/`, source review of shared responsive CSS and shared route patterns, local static preview fallback setup on `127.0.0.1:8080`, and release-record alignment review.
- Manual checks completed: Confirmed by source review that the responsive pass is concentrated in shared theme rules covering navigation, hero layout, content/sidebar balance, shared cards, notices, service grids, footer grids, and release cards, with runtime footer version text aligned to `v3.3.0`.
- Known limitations: `php` CLI is unavailable in this workspace, so `php -l dev/router.php`, the documented PHP preview command, and shell-based smoke checks could not be run here; the in-app browser runtime also failed to attach in this sandboxed session, so rendered QA remains source-led in this environment.
- Rollback notes: Revert the shared clinic theme responsive pass, repeated footer version text, README current release note, mirrored version files, and changelog/Change Log Hub updates to return to `v3.2.11b`.

## [v3.2.11b] - 2026-06-12

<span class="pill pill-version">Version v3.2.11b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Integration Fix</span>

### Summary

Replaced Hello Bar with the requested consent-gated Donorbox, OneSignal, Chatwoot, and Mastodon integration refresh across the live website.

### Detailed changes

- Removed the shared Hello Bar loader from the live runtime integration script so the old marketing bar no longer loads after consent.
- Updated the shared consent-gated runtime integrations to load the requested OneSignal SDK and app ID, replace the Chatwoot widget token and launcher settings, and add the sticky Donorbox popup widget.
- Added the Mastodon verification link once in the shared footer source and synced the mirrored version files, changelog records, Change Log Hub entry, README current-release notes, and repeated footer version text to `v3.2.11b`.

### Type pills

- <span class="pill pill-type">Changed</span> Refreshes the shared third-party integration setup used across live website routes.
- <span class="pill pill-fix">Integration Fix</span> Removes the old Hello Bar dependency and replaces it with the requested consent-gated donation and messaging setup.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Shared footer source, shared runtime integration script, live runtime HTML routes, Change Log Hub, README current release, and mirrored version files.
- Files changed: `public/assets/js/site.js`, `public/includes/footer.html`, `public/**/*.html` runtime routes excluding `public/crawl/`, `README.md`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, and `public/changelog/index.html`.
- User groups affected: Public visitors, donors, supporters subscribing to notifications, and staff relying on the live chat and footer verification links.
- Public impact: Visitors now receive the requested sticky Donorbox widget, refreshed OneSignal setup, refreshed Chatwoot launcher settings, and the Mastodon verification link without loading Hello Bar.
- Internal impact: Shared source fragments, live runtime HTML, and release records stay aligned while the site remains HTML-first with PHP support tooling only.

### Version decision

- Previous version: `v3.2.10b`
- New version: `v3.2.11b`
- Version type: Beta patch release
- Reason for version bump: This is a public-facing third-party integration refresh that changes live donation, chat, notification, and footer verification behaviour without changing routes, architecture, or hosting assumptions.

### Validation

- Checks run: Source-level integration search before and after the update, shared chrome sync, Git diff review, and release-record alignment review.
- Manual checks completed: Confirmed by source review that live runtime pages now contain the synced shared footer, the Donorbox widget path, the refreshed OneSignal loader, a single active Chatwoot bootstrap path, and the Mastodon verification link while Hello Bar references were removed from the live integration sources.
- Known limitations: `php` CLI availability still needs to be confirmed for `php -l`, local preview, public-root checks, and smoke tests in this workspace, and the supplied dual Chatwoot snippet was normalised to one consent-gated widget bootstrap to avoid duplicate loader conflicts.
- Rollback notes: Revert the shared integration refresh, footer sync, mirrored version updates, Change Log Hub entry, and README release note to return to `v3.2.10b`.

## [v3.2.10b] - 2026-06-11

<span class="pill pill-version">Version v3.2.10b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Content Fix</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Rolled the approved clinic-scope statement across the live website so visitors now see the same non-veterinary wording wherever clinic limitations are shown.

### Detailed changes

- Replaced the older clinic-scope alert wording across the live route pages with the approved statement covering partner-lab supported investigation and diagnosis support, non-veterinary boundaries, and suitable over-the-counter alternatives after consultation.
- Updated repeated inline `Clinical scope:` notices and the small number of nearby live paragraphs that still used the older `do not diagnose disease` or `non-diagnostic observation` wording.
- Synced the mirrored version files, changelog records, Change Log Hub entry, README current-release notes, and repeated footer version text to `v3.2.10b`.

### Type pills

- <span class="pill pill-type">Changed</span> Rolls the approved clinic-scope wording out across the live website.
- <span class="pill pill-fix">Content Fix</span> Removes conflicting older limitation wording from repeated service and policy page notices.
- <span class="pill pill-accessibility">Accessibility</span> Keeps the clinic boundary wording consistent and easier to understand wherever visitors encounter it.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Live runtime route disclaimers, inline clinic-scope notices, Change Log Hub, README current release, mirrored version files, and repeated footer version text.
- Files changed: `public/**/*.html` runtime routes excluding `public/crawl/`, `README.md`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, and `public/changelog/index.html`.
- User groups affected: Public visitors checking clinic scope, carers comparing support routes, and staff sharing public clinic-limit wording.
- Public impact: Visitors now see the same approved clinic-scope statement across service, policy, information, booking, donation, and changelog routes.
- Internal impact: Release records and repeated footer version labels stay aligned with the wording rollout while the site remains HTML-first with PHP support tooling only.

### Version decision

- Previous version: `v3.2.9b`
- New version: `v3.2.10b`
- Version type: Beta patch release
- Reason for version bump: This is a public-facing wording and compliance clarification that updates repeated live content without changing routes, architecture, or hosting assumptions.

### Validation

- Checks run: Source-level search before and after the wording rollout, Git diff review, and release-record alignment review.
- Manual checks completed: Confirmed by source review that the approved clinic-scope statement now appears across the repeated live disclaimer patterns and that conflicting nearby wording was aligned on the affected pages.
- Known limitations: `php` CLI is unavailable in this workspace, so `php -l`, `php -S`, `dev/check-public-root.sh`, and `dev/smoke-test.sh` still need to be run in a PHP-enabled environment before release.
- Rollback notes: Revert the clinic-scope wording rollout, mirrored version updates, Change Log Hub entry, README release note, and repeated footer version text sync to return to `v3.2.9b`.

## [v3.2.9b] - 2026-06-11

<span class="pill pill-version">Version v3.2.9b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Content Fix</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Clarified the homepage clinic-scope wording so it explains the clinic's non-veterinary boundaries, OTC recommendation guidance, and partner-lab support more accurately.

### Detailed changes

- Updated the homepage scope alert to state that the clinic does not prescribe veterinary medicines, may recommend suitable over-the-counter alternatives after consultation, and can sometimes offer lower-cost options where appropriate.
- Revised the homepage "What we do not do" section to match the same non-veterinary scope wording and to mention partner-lab support for investigating certain illnesses and diseases.
- Synced the mirrored version files, changelog records, Change Log Hub entry, README current-release notes, and repeated footer version text to `v3.2.9b`.

### Type pills

- <span class="pill pill-type">Changed</span> Updates public-facing clinic-scope wording on the homepage.
- <span class="pill pill-fix">Content Fix</span> Aligns repeated homepage limitation copy with the clinic's intended wording.
- <span class="pill pill-accessibility">Accessibility</span> Keeps the warning content clear and consistent wherever visitors encounter it on the homepage.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Homepage scope alert, homepage clinic-limits content card, Change Log Hub, README current release, and repeated footer version text.
- Files changed: `public/index.html`, `README.md`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, and runtime `public/**/*.html` files for footer version sync.
- User groups affected: Public visitors reviewing clinic scope, limitations, and next-step guidance.
- Public impact: Visitors now see clearer wording about non-veterinary boundaries, OTC recommendation support after consultation, and partner-lab investigation support.
- Internal impact: Release records stay aligned with the homepage copy update while the site remains a static HTML website with PHP support tooling.

### Version decision

- Previous version: `v3.2.8b`
- New version: `v3.2.9b`
- Version type: Beta patch release
- Reason for version bump: This is a public-facing wording clarification that changes homepage service-scope messaging without altering routes, architecture, or the hosting model.

### Validation

- Checks run: Source-level regression check before and after the edit, Git diff review, and release-record alignment review.
- Manual checks completed: Confirmed by source review that both homepage limitation statements now describe the same clinic scope, OTC recommendation guidance, partner-lab investigation wording, and non-emergency boundaries.
- Known limitations: `php` CLI is unavailable in this workspace, so `php -l`, `php -S`, `dev/check-public-root.sh`, and `dev/smoke-test.sh` still need to be run in a PHP-enabled environment before release.
- Rollback notes: Revert the homepage wording, mirrored release-record updates, Change Log Hub entry, and repeated footer version text sync to return to `v3.2.8b`.

## [v3.2.8b] - 2026-06-11

<span class="pill pill-version">Version v3.2.8b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Maintenance</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Split the shared site chrome into independent header, desktop menu, mobile menu, and footer source files, then added a sync workflow so those areas can be updated without manually editing every route.

### Detailed changes

- Added blocked source fragments in `public/includes/` for the header, desktop menu, mobile menu, and footer.
- Added `dev/sync-site-chrome.php` to inject the source fragments into every runtime HTML route with route-depth-aware relative links and page metadata for active navigation states.
- Updated runtime HTML routes to use bounded header/footer marker blocks and `data-nav-section` plus `data-nav-page` metadata on `<body>`.
- Removed footer and menu content mutation from `public/assets/js/site.js` so it now keeps interaction behavior only.
- Updated README and maintenance docs to document the new sync workflow, then synced the root/public version files, changelog mirrors, Change Log Hub output, and repeated footer version text to `v3.2.8b`.

### Type pills

- <span class="pill pill-type">Changed</span> Refactors the shared site chrome into separately maintained source fragments.
- <span class="pill pill-fix">Maintenance</span> Replaces repeated manual route edits with a deterministic sync workflow.
- <span class="pill pill-accessibility">Accessibility</span> Preserves current navigation and footer behavior while making future updates less error-prone.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Shared header navigation, mobile navigation, shared footer, error pages, Change Log Hub, README current release, and repeated footer version text.
- Files changed: `public/includes/*.html`, `dev/sync-site-chrome.php`, `public/assets/js/site.js`, runtime `public/**/*.html` routes, `README.md`, `docs/local-preview.md`, `docs/maintenance-artifacts.md`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, and `public/changelog/index.html`.
- User groups affected: Site maintainers updating shared chrome, plus public visitors using the shared navigation and footer.
- Public impact: Public routes keep the same destinations and behavior while the shared site chrome becomes independently maintainable.
- Internal impact: The live site remains static HTML under `public/`, and PHP stays a maintenance-time tool rather than a production rendering dependency.

### Version decision

- Previous version: `v3.2.7b`
- New version: `v3.2.8b`
- Version type: Beta patch release
- Reason for version bump: This is a maintenance-focused public chrome refactor that changes shared route generation without changing the site architecture or public URL model.

### Validation

- Checks run: Generated-route source review, marker and metadata spot checks, Git diff review, and a workspace-runtime sync pass equivalent to the new fragment injection workflow because `php` CLI is not installed in this local environment.
- Manual checks completed: Confirmed by source review that runtime pages now use bounded header/footer sync markers, route-aware relative links, separate desktop/mobile menu fragments, footer cookie-settings controls, and body metadata for active navigation states.
- Known limitations: `php` CLI is unavailable in this workspace, so `php -l`, `php dev/sync-site-chrome.php`, and the standard PHP local-preview smoke checks still need to be run in a PHP-enabled environment before release.
- Rollback notes: Revert the fragment files, sync tool, generated route updates, documentation sync, and the `v3.2.8b` release-record updates to restore the previous repeated inline chrome structure.

## [v3.2.7b] - 2026-06-11

<span class="pill pill-version">Version v3.2.7b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-fix">Navigation Fix</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Stopped the desktop mega menus from opening on hover so they now open only on click and close cleanly when visitors move to another top-level item or click elsewhere on the page.

### Detailed changes

- Removed desktop hover-only mega-menu panel display rules so shared desktop navigation panels no longer open before a click.
- Kept the shared desktop menu state driven by the existing `open` class, preserving click-to-open, click-to-close, outside-click close, and `Escape` close behavior.
- Preserved the mobile/tap navigation model, route structure, SEO metadata, sitemap records, footer links, Newsroom routing, branded error pages, and Cloudron LAMP compatibility.
- Synced root and public version files, changelog mirrors, Change Log Hub output, README current-release notes, and repeated footer version text to `v3.2.7b`.

### Type pills

- <span class="pill pill-type">Fixed</span> Changes the shared desktop mega menu interaction from hover-open to click-open only.
- <span class="pill pill-fix">Navigation Fix</span> Keeps top-level desktop menu switching and outside-click close behavior predictable.
- <span class="pill pill-accessibility">Accessibility</span> Prevents accidental desktop mega-menu opening while preserving explicit trigger control.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Shared desktop header navigation, Change Log Hub, README current release, and repeated footer version text.
- Files changed: `public/assets/theme/clinic.css`, `public/assets/js/site.js`, `VERSION`, `public/VERSION`, `README.md`, `CHANGELOG.md`, `public/CHANGELOG.md`, and `public/changelog/index.html`.
- User groups affected: Desktop and laptop visitors using the shared mega menus, keyboard users, and maintainers reviewing release records.
- Public impact: Desktop mega menus stay closed until clicked and close again when visitors click outside or move to another top-level navigation item.
- Internal impact: The site remains a static HTML deployment with PHP support tooling only, preserving Cloudron LAMP compatibility.

### Version decision

- Previous version: `v3.2.6b`
- New version: `v3.2.7b`
- Version type: Beta patch release
- Reason for version bump: This is a small public-facing desktop navigation interaction fix with accessibility impact.

### Validation

- Checks run: Source review of the shared navigation CSS/JavaScript, version alignment checks, and static release-record alignment checks.
- Manual checks completed: Confirmed by source review that desktop mega-menu panels no longer have hover-open CSS and the shared click-driven open state remains intact in the navigation script.
- Known limitations: PHP CLI is unavailable in this workspace and browser automation was not available here, so local preview commands and an interactive desktop/mobile browser pass still need to be completed after reload.
- Rollback notes: Revert the shared navigation CSS/version updates plus the `v3.2.7b` release-record sync to restore the previous `v3.2.6b` menu behavior.

## [v3.2.6b] - 2026-06-11

<span class="pill pill-version">Version v3.2.6b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-compliance">Compliance</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Moved the governance links into the relevant footer columns, added Cookies Policy to the Information menu, and added the centered CIC legal line while keeping the version label visible.

### Detailed changes

- Added Cookies Policy to the shared Information mega menu so the policy sits with the rest of the public navigation.
- Moved Donate into a new Support Us footer column and left the policies column to carry the policy links and cookie controls.
- Removed the extra footer governance links from the meta row so the version line is the only item left there.
- Added a centered CIC legal line at the bottom of the footer to satisfy the requested compliance wording.
- Synced the shared footer/version text and the mirrored release files to `v3.2.6b`.

### Type pills

- <span class="pill pill-type">Changed</span> Adjusts the shared footer structure and the Information navigation.
- <span class="pill pill-fix">Content Fix</span> Moves duplicated governance links into the relevant footer columns.
- <span class="pill pill-compliance">Compliance</span> Adds the CIC notice and keeps the release record aligned with the public site.
- <span class="pill pill-accessibility">Accessibility</span> Keeps the footer grouped so the version line and controls remain easy to scan.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Shared header navigation, shared footer columns, cookies policy route, Change Log Hub, README current release, and repeated footer version text.
- Files changed: `public/assets/js/site.js`, `public/assets/theme/clinic.css`, `public/assets/theme/cookie-consent.css`, `VERSION`, `public/VERSION`, `README.md`, `CHANGELOG.md`, `public/CHANGELOG.md`, and `public/changelog/index.html`.
- User groups affected: Public visitors using the main navigation, footer links, cookie preferences, and release records.
- Public impact: Visitors can find Cookies Policy in the Information menu and the footer now groups governance links in the relevant footer columns.
- Internal impact: The site remains a static HTML deployment with PHP support tooling only, preserving Cloudron LAMP compatibility.

### Version decision

- Previous version: `v3.2.5b`
- New version: `v3.2.6b`
- Version type: Beta patch release
- Reason for version bump: This is a public-facing navigation and footer-structure update with compliance and accessibility impact.

### Validation

- Checks run: Source review of the shared footer and navigation logic, plus planned local preview and browser inspection for the public homepage and policy routes.
- Manual checks completed: Pending the final browser pass after the file updates are in place.
- Known limitations: The footer and menu changes are shared through the front-end script, so the rendered result must be checked across the main public routes.
- Rollback notes: Revert the footer/navigation script and theme updates plus the `v3.2.6b` release-record sync to restore the previous `v3.2.5b` layout.

## [v3.1.2] - 2026-06-11

<span class="pill pill-version">Version v3.1.2</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-fix">Content Fix</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Replaced visible `GBP` price labels with the pound sign `£` across the public service pricing routes and public payment-link audit record.

### Detailed changes

- Updated the public service route cards and inline price summaries so visible sterling prices now use `£` instead of the text prefix `GBP`.
- Updated `public/PAYMENT_LINK_AUDIT.md` so the public governance record matches the visitor-facing sterling formatting now shown on the live pricing routes.
- Preserved numeric prices, Stripe destinations, payment behaviour, SEO metadata, sitemap records, footer governance links, Newsroom routing, branded error pages, and Cloudron LAMP compatibility.
- Synced root and public version files, changelog mirrors, Change Log Hub output, README current-release notes, and repeated footer version text to the new `v3.1.2` stable patch release.

### Type pills

- <span class="pill pill-type">Fixed</span> Replaces visible `GBP` price prefixes with `£` across public pricing content.
- <span class="pill pill-fix">Content Fix</span> Keeps pricing display consistent without changing any actual amounts or Stripe payment links.
- <span class="pill pill-accessibility">Accessibility</span> Uses the familiar sterling symbol visitors expect when scanning service prices.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Public pricing content across the services hub, general services, species care routes, lab services, the Change Log Hub, README current release, repeated footer version text, and the public payment-link audit record.
- Files changed: `public/services/index.html`, `public/general-services/index.html`, `public/dog-care/index.html`, `public/cat-care/index.html`, `public/ferret-care/index.html`, `public/rabbit-care/index.html`, `public/guinea-care/index.html`, `public/reptile-care/index.html`, `public/invert-care/index.html`, `public/lab-services/index.html`, `public/PAYMENT_LINK_AUDIT.md`, `public/**/*.html` footer version lines, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, and `README.md`.
- User groups affected: Visitors reviewing service prices, pet owners opening Stripe payment links, and maintainers checking public release records.
- Public impact: Visitors now see sterling prices formatted with `£` across the public pricing routes and matching public governance content.
- Internal impact: The site remains static HTML with shared CSS and JavaScript; no build pipeline, database, or persistent runtime is introduced.

### Version decision

- Previous version: `v3.1.2b`
- New version: `v3.1.2`
- Version type: Stable patch release
- Reason for version bump: This is a small public-facing content and formatting correction that preserves existing pricing values and payment behaviour.

### Validation

- Checks run: Source checks for public `GBP` price labels, version string alignment, footer version text alignment, public-folder structure, local preview support files, and targeted route content review where the local environment supports them.
- Manual checks completed: Confirmed by source review that the affected public price labels now use `£` while the numeric values and Stripe links remain unchanged.
- Known limitations: Browser visual QA and local PHP/shell validation are environment-dependent and should be reported with exact results after the local validation pass.
- Rollback notes: Revert the public price-label text replacements and `v3.1.2` release-record sync to restore the previous `v3.1.2b` beta release state.

## [v3.1.2b] - 2026-06-11

<span class="pill pill-version">Version v3.1.2b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-fix">Navigation Fix</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Separated the desktop/laptop and mobile/tablet primary menus so mobile mega-menu panels open and scroll without flashing.

### Detailed changes

- Updated the repeated public HTML header markup so the desktop navigation and mobile navigation now have separate `desktop-nav` and `mobile-nav` structures with independent ids, aria labels, and JavaScript hooks.
- Updated `public/assets/js/site.js` so desktop mega-menu positioning, mobile menu open state, mobile submenu taps, Escape handling, outside-click handling, resize handling, and scroll handling no longer share one navigation state.
- Updated `public/assets/theme/clinic.css` so the desktop menu is hidden on mobile/tablet viewports, the mobile menu is hidden on desktop/laptop viewports, and mobile submenu panels are only controlled inside the mobile navigation.
- Preserved route paths, SEO metadata, sitemap records, footer links, Newsroom routing, branded error-page structure, public-folder structure, and Cloudron LAMP compatibility.
- Synced root and public version files, changelog mirrors, Change Log Hub output, README current-release notes, and repeated footer version text to the new `v3.1.2b` beta patch release.

### Type pills

- <span class="pill pill-type">Fixed</span> Stops mobile/tablet navigation flicker caused by shared desktop and mobile menu state.
- <span class="pill pill-fix">Navigation Fix</span> Keeps desktop mega menus and mobile tap menus independently maintainable.
- <span class="pill pill-accessibility">Accessibility</span> Preserves explicit menu controls, expanded states, focus handling, and Escape close behavior.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Shared header navigation across public HTML routes, Change Log Hub, README current release, and repeated footer version text.
- Files changed: `public/**/*.html`, `public/assets/js/site.js`, `public/assets/theme/clinic.css`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, and `README.md`.
- User groups affected: Mobile and tablet visitors using the menu, desktop visitors using mega menus, keyboard users, and maintainers updating navigation.
- Public impact: Mobile and tablet users get a dedicated tap-driven menu that stays stable while opening panels and scrolling.
- Internal impact: The site remains static HTML with shared CSS and JavaScript; no build pipeline, database, or persistent runtime is introduced.

### Version decision

- Previous version: `v3.1.1`
- New version: `v3.1.2b`
- Version type: Beta patch release
- Reason for version bump: This is a user-visible navigation bug fix that changes repeated header markup and shared menu behavior.

### Validation

- Checks run: Source checks for separated menu markup, CSS breakpoint isolation, JavaScript menu-state isolation, version string alignment, public-folder structure, local preview, and smoke tests where the local environment supports them.
- Manual checks completed: Confirmed by source review that desktop and mobile menus now use independent DOM hooks and that scroll/resize positioning only targets the desktop menu.
- Known limitations: Browser visual QA and local PHP/shell validation are environment-dependent and should be reported with exact results after the local validation pass.
- Rollback notes: Revert the separated header markup, menu JavaScript, mobile/desktop navigation CSS, and `v3.1.2b` release-record sync to restore the previous `v3.1.1` menu implementation.

## [v3.1.1] - 2026-06-11

<span class="pill pill-version">Version v3.1.1</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-fix">Navigation Fix</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Fixed inconsistent top-level header menu font weights so plain links and dropdown menu triggers present with the same visual emphasis.

### Detailed changes

- Updated `public/assets/theme/clinic.css` so `.main-nav a` and `.drop-trigger` explicitly share the same font weight in the final navigation override block.
- Preserved the existing header order, active states, hover treatment, focus treatment, dropdown panels, mobile menu behavior, route paths, SEO metadata, sitemap records, footer links, Newsroom routing, and branded error-page structure.
- Synced root and public version files, changelog mirrors, Change Log Hub output, README current-release notes, and repeated footer version text to the new `v3.1.1` stable patch release.

### Type pills

- <span class="pill pill-type">Fixed</span> Aligns the visual weight of top-level header menu items across link and button elements.
- <span class="pill pill-fix">Navigation Fix</span> Keeps the shared primary navigation visually consistent without changing destinations or interaction behavior.
- <span class="pill pill-accessibility">Accessibility</span> Improves navigation scanability by removing unintended emphasis differences between adjacent menu items.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Shared header navigation across public HTML routes, Change Log Hub, README current release, and repeated footer version text.
- Files changed: `public/assets/theme/clinic.css`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, `README.md`, and repeated `public/**/*.html` footer version strings.
- User groups affected: Public visitors using the primary navigation, mobile users, keyboard users, and maintainers reviewing release records.
- Public impact: Header menu labels now present with consistent emphasis while all links and dropdowns continue to behave as before.
- Internal impact: The site remains static HTML with shared CSS; no build pipeline, database, or persistent runtime is introduced.

### Version decision

- Previous version: `v3.1.0`
- New version: `v3.1.1`
- Version type: Stable patch release
- Reason for version bump: This is a small user-visible navigation presentation and accessibility polish.

### Validation

- Checks run: Source checks for the final navigation CSS cascade, version string alignment, public-folder structure, local preview, and smoke tests where the local environment supports them.
- Manual checks completed: Confirmed by source review that plain header links and dropdown trigger buttons now share an explicit `font-weight: 700` in the final override block without changing routes, SEO metadata, sitemap entries, Newsroom links, footer governance links, or branded error-page structure.
- Known limitations: Browser visual QA and local PHP/shell validation are environment-dependent and should be reported with exact results after the local validation pass.
- Rollback notes: Revert the shared navigation CSS weight override and `v3.1.1` release-record sync to restore the previous `v3.1.0` header presentation.

## [v3.1.0] - 2026-06-11

<span class="pill pill-version">Version v3.1.0</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Updated the repeated Pet Care Clinic footer to follow the standard APES footer structure while preserving clinic-specific content, contact details, partner information, governance links, and version output.

### Detailed changes

- Reworked every shared `footer.page-footer` instance across the runtime public HTML routes into APES-style grouped link cards with lower partnership, social, and governance bands.
- Preserved Pet Care Clinic service, information, policy, donation, News, Change Log Hub, contact, Bold Vets, OneSignal, and version content while cleaning spacing, contrast, wrapping, and responsive behavior.
- Updated `public/assets/theme/clinic.css` with the card-style footer layout, lower-band styling, focus states, and mobile stacking rules.
- Synced root and public version files, changelog mirrors, Change Log Hub output, README current-release notes, and repeated footer version text to the new `v3.1.0` stable minor release.

### Type pills

- <span class="pill pill-type">Changed</span> Standardises the site-wide footer presentation against the APES footer pattern.
- <span class="pill pill-accessibility">Accessibility</span> Improves footer scanability, keyboard focus treatment, and mobile wrapping while preserving existing link destinations.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Repeated footer across homepage, service routes, information routes, policy routes, Change Log Hub, branded error pages, README current release, and release records.
- Files changed: `public/assets/theme/clinic.css`, repeated `public/**/*.html` footer blocks, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, and `README.md`.
- User groups affected: Public visitors using footer navigation, mobile users, keyboard users, and maintainers reviewing release records.
- Public impact: Footer content remains intact but is now grouped and formatted more consistently with APES CIC standards.
- Internal impact: The site remains static HTML with shared CSS; no build pipeline, database, or persistent runtime is introduced.

### Version decision

- Previous version: `v3.0.1b`
- New version: `v3.1.0`
- Version type: Stable minor release
- Reason for version bump: This is a site-wide public footer standardisation and formatting improvement.

### Validation

- Checks run: Footer/source checks for repeated footer blocks, version text alignment, required governance links, News and Bold Vets links, public-folder structure, release-record alignment, local preview, and smoke tests where the local environment supports them.
- Manual checks completed: Confirmed by source review that Pet Care Clinic content, contact details, Bold Vets partner content, Newsroom link, OneSignal footer container, donation link, Privacy Policy, Terms and Conditions, and Change Log Hub remain present with depth-correct relative links.
- Known limitations: Browser visual QA and local PHP/shell validation are environment-dependent and should be reported with exact results after the local validation pass.
- Rollback notes: Revert the repeated footer HTML, footer CSS updates, and `v3.1.0` release-record sync to restore the previous `v3.0.1b` beta footer.

## [v3.0.1b] - 2026-06-11

<span class="pill pill-version">Version v3.0.1b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Layout Fix</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Stopped the repeated right-hand clinic help sidebars from floating on desktop layouts so the support panels now scroll naturally with each page.

### Detailed changes

- Updated `public/assets/theme/clinic.css` so the shared `.side` sidebar container no longer uses desktop sticky positioning.
- Simplified the `side-stack-sticky` modifier so homepage, services, bookings, and contact sidebar stacks no longer cap themselves to the viewport or scroll internally.
- Synced root and public version files, changelog mirrors, Change Log Hub output, README current-release notes, and repeated footer version text to the new `v3.0.1b` beta patch release.

### Type pills

- <span class="pill pill-type">Changed</span> Returned repeated clinic sidebars to normal page flow across desktop and mobile layouts.
- <span class="pill pill-accessibility">Accessibility</span> Improves reading flow by avoiding a floating sidebar region with its own scroll area.

### Fix pills

- <span class="pill pill-fix">Layout Fix</span> The “Need Help Fast?” sidebar and matching support cards now scroll with the rest of the page.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Homepage, services page, bookings page, contact page, shared clinic sidebar styling, Change Log Hub, README current release, and repeated footer version text.
- Files changed: `public/assets/theme/clinic.css`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, `README.md`, and repeated `public/**/*.html` footer version strings.
- User groups affected: Public visitors using desktop and small-laptop layouts, pet owners reviewing help and booking guidance, and maintainers reviewing release records.
- Public impact: Repeated sidebars no longer float or create an internal scrolling panel; public routes, content, metadata, footer links, Newsroom routing, sitemap, robots, and branded error pages are otherwise unchanged.
- Internal impact: The existing sidebar classes remain in markup, but the shared CSS now treats the sidebar as normal page content.

### Version decision

- Previous version: `v3.0.0b`
- New version: `v3.0.1b`
- Version type: Beta patch release
- Reason for version bump: This is a small user-visible layout and accessibility fix to a shared repeated sidebar pattern.

### Validation

- Checks run: `rg` source checks for sidebar and sticky CSS usage, PowerShell public-folder structure checks equivalent to `dev/check-public-root.sh`, release-record alignment review, and footer version string verification across public HTML files.
- Manual checks completed: Confirmed by source review that `.side` and `side-stack-sticky` no longer apply desktop sticky positioning, viewport height caps, or internal sidebar scrolling; the remaining sticky CSS is limited to the site header, and the remaining max-height/overflow rule is for the mobile navigation menu.
- Known limitations: PHP CLI, Bash, and the in-app browser bridge are not available in this Windows workspace, so `php -l dev/router.php`, `dev/check-public-root.sh`, `php -S 127.0.0.1:8080 -t public dev/router.php`, `dev/smoke-test.sh`, and browser visual QA still need a local pass in an environment with those tools available.
- Rollback notes: Restore the previous sticky sidebar CSS and `v3.0.0b` release records if this layout fix needs to be undone.

## [v3.0.0b] - 2026-06-11

<span class="pill pill-version">Version v3.0.0b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-type">Tooling</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Migrated the repository contract to an HTML website with PHP support tools, keeping public routes static while adding APES-standard local preview routing, public-root validation, smoke tests, and dedicated preview documentation.

### Detailed changes

- Added `dev/router.php` so maintainers can preview the static HTML site through the PHP built-in server with routing parity, blocked maintenance folders, and branded 403/404 handling.
- Added `dev/check-public-root.sh` and `dev/smoke-test.sh` to verify the `public/` web-root contract and key local-preview routes.
- Added `docs/local-preview.md` and `docs/preview-checklist.md` so future work has a clear HTTP loopback preview workflow and release QA checklist.
- Updated README architecture notes, version records, changelog mirrors, Change Log Hub output, and repeated footer version text to the new `v3.0.0b` Major Beta release.

### Type pills

- <span class="pill pill-type">Changed</span> Formalised the repository as an HTML website with PHP support tools rather than a PHP-rendered public site.
- <span class="pill pill-type">Tooling</span> Added local preview, public-root validation, and smoke-test tooling.
- <span class="pill pill-accessibility">Accessibility</span> Keeps branded error pages, footer links, and route QA in the release checklist.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: No public route content changed intentionally; local preview covers `/`, `/index.html`, `/robots.txt`, `/sitemap.xml`, `/changelog/`, and branded error pages.
- Files changed: `dev/router.php`, `dev/check-public-root.sh`, `dev/smoke-test.sh`, `docs/local-preview.md`, `docs/preview-checklist.md`, `README.md`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, and repeated `public/**/*.html` footer version strings.
- User groups affected: Maintainers, reviewers, and future Codex agents validating website changes.
- Public impact: Public pages remain static HTML with existing URLs, metadata, footer links, News routing, sitemap, robots, and branded error pages preserved.
- Internal impact: Local preview and validation now match the APES CIC `public/` web-root and Cloudron LAMP compatibility standard more closely.

### Version decision

- Previous version: `v2.1.7b`
- New version: `v3.0.0b`
- Version type: Major Beta release
- Reason for version bump: This formalises the site architecture and support-tooling workflow while preserving the HTML public route model.

### Validation

- Checks run: Repository status check before editing, source review of the new PHP router and shell support scripts, public-folder structure review, and release-record alignment check.
- Manual checks completed: Confirmed by source review that `public/index.html` remains the production entrypoint, `public/.htaccess` remains present, PHP is limited to support tooling, and no database, CMS, persistent runtime, forms, uploads, payments, sitemap routes, robots rules, News redirects, or branded error-page content were intentionally changed.
- Known limitations: PHP CLI is not available in this workspace, so `php -l dev/router.php`, `php -S 127.0.0.1:8080 -t public dev/router.php`, and `dev/smoke-test.sh` need a PHP-capable local pass before release. Codex browser access was blocked by the Windows sandbox during planning, so final visual QA still needs an interactive browser pass.
- Rollback notes: Remove the `dev/` PHP support tooling and the two preview docs, then restore the `v2.1.7b` release records if this architecture/tooling migration needs to be undone.

## [v2.1.7b] - 2026-06-10

<span class="pill pill-version">Version v2.1.7b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Layout Fix</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Fixed the floating right-hand sidebar stack so the lower support card no longer overlaps the clinic help card on the affected desktop layouts while keeping the newer nested-route header and compact top-bar icon updates already on main.

### Detailed changes

- Added a new `side-stack-sticky` shared modifier in `public/assets/theme/clinic.css` so the affected two-card right rails stay sticky as one stack, cap themselves to the available desktop viewport height, and scroll internally when space is limited.
- Updated the homepage, contact, bookings, and services templates to apply the shared stacked-sidebar modifier while preserving the newer nested-route Home and brand link path fixes already present on main.
- Carried forward the current `v2.1.5b` nested-route navigation fix and `v2.1.6b` compact top-bar social icon changes, then synced root and public version files, changelog mirrors, Change Log Hub output, README current-release notes, and repeated footer version text to the new `v2.1.7b` beta patch release.

### Type pills

- <span class="pill pill-type">Changed</span> Adjusted the shared right-hand sidebar behaviour so affected card stacks float together instead of risking overlap during desktop scrolling.
- <span class="pill pill-accessibility">Accessibility</span> Keeps booking and contact actions readable and reachable on shorter desktop viewports while preserving the accessible header improvements already on main.

### Fix pills

- <span class="pill pill-fix">Layout Fix</span> The floating right-hand column now behaves as a single scroll-safe stack on the affected pages.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Homepage, contact page, bookings page, services page, shared clinic sidebar styling, Change Log Hub, README current release, and repeated footer version text.
- Files changed: `public/assets/theme/clinic.css`, `public/index.html`, `public/contact/index.html`, `public/bookings/index.html`, `public/services/index.html`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, `README.md`, and repeated `public/**/*.html` footer version strings.
- User groups affected: Public visitors using desktop and small-laptop layouts, pet owners trying to book or contact the clinic, and maintainers reviewing release records.
- Public impact: The right-hand help and support cards stay readable and clickable instead of overlapping while the newer header and navigation fixes remain intact.
- Internal impact: The sidebar pattern now has an explicit shared modifier for stacked sticky behaviour, and the merged release record remains aligned after integrating newer mainline website changes.

### Version decision

- Previous version: `v2.1.6b`
- New version: `v2.1.7b`
- Version type: Beta patch release
- Reason for version bump: This is a small user-visible layout and accessibility fix applied after the already-released `v2.1.5b` and `v2.1.6b` header and navigation changes.

### Validation

- Checks run: Merge conflict review, source review of the stacked sidebar modifier, release-record alignment check, and footer version string verification across public HTML files.
- Manual checks completed: Confirmed by source review that the affected stacked sidebars now use the shared sticky-stack modifier, the nested-route Home and brand links remain depth-correct from main, the compact top-bar social icon styling remains present, and no SEO metadata, sitemap entries, robots rules, Newsroom routing, footer links, or branded error-page structure were intentionally changed by this merge resolution.
- Known limitations: PHP CLI is not available in this workspace, so the recommended `php -S 127.0.0.1:8080 -t public` preview and full browser-based visual QA still need a manual pass outside this non-interactive workspace.
- Rollback notes: Revert the merged sidebar modifier changes and restore the previous `v2.1.6b` release records if the desktop sidebar layout fix needs to be undone.

## [v2.1.6b] - 2026-06-10

<span class="pill pill-version">Version v2.1.6b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Header Fix</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Replaced the visible top-bar social network names with compact social icons while keeping the existing links accessible across the shared website header.

### Detailed changes

- Updated `public/assets/theme/clinic.css` so the repeated top-bar social links now render as compact icon buttons with shared hover and focus styling instead of visible text labels.
- Preserved the existing social destination URLs and kept the source link text in the repeated header markup so the links still expose readable names while the visual presentation becomes more compact.
- Synced root and public version files, changelog mirrors, Change Log Hub output, README current-release notes, and repeated footer version text to the new `v2.1.6b` beta patch release.

### Type pills

- <span class="pill pill-type">Changed</span> Updated the shared header top bar so social links display as icons instead of text labels across the static route set.
- <span class="pill pill-accessibility">Accessibility</span> Retained readable link names in the source and visible focus treatment while reducing header clutter.

### Fix pills

- <span class="pill pill-fix">Header Fix</span> The shared top bar now uses a more compact icon treatment for social links without changing the underlying destinations.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Shared header top bar across repeated public routes, Change Log Hub, README current release, and repeated footer version text.
- Files changed: `public/assets/theme/clinic.css`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, `README.md`, and repeated `public/**/*.html` footer version strings.
- User groups affected: Public visitors using the shared header and maintainers reviewing release records.
- Public impact: The header top bar is more compact and visually scannable while the same social links remain available.
- Internal impact: Shared header styling and release records remain aligned without introducing new runtime dependencies.

### Version decision

- Previous version: `v2.1.5b`
- New version: `v2.1.6b`
- Version type: Beta patch release
- Reason for version bump: This is a small shared UI and accessibility-safe header polish that changes visual presentation without adding new routes or workflows.

### Validation

- Checks run: Source review of the shared top-bar CSS, release-record alignment review, and footer version string verification across public HTML files.
- Manual checks completed: Confirmed by source review that the shared top-bar social links now render as icon buttons from CSS, keep the existing social URLs, retain focus treatment, and do not change SEO metadata, sitemap entries, robots rules, Newsroom routing, footer links, or branded error-page structure.
- Known limitations: No browser preview was run in this non-interactive workspace, so final visual QA of icon rendering and spacing across desktop and mobile breakpoints still needs a manual pass.
- Rollback notes: Revert the shared top-bar CSS icon treatment and restore the previous `v2.1.5b` release records if the header presentation needs to return to text links.

## [v2.1.5b] - 2026-06-09

<span class="pill pill-version">Version v2.1.5b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Navigation Fix</span>

### Summary

Fixed the repeated nested-route header links so the brand and Home navigation reliably return visitors to the homepage instead of reloading the current page.

### Detailed changes

- Updated the repeated header markup across nested first-level routes and nested policy routes so the brand link and Home link now use depth-correct relative paths back to the website root.
- Preserved the existing Services, Information, Bookings, Donate, and Contact navigation paths along with the shared JavaScript and CSS behavior because the bug was caused by static HTML pathing rather than the menu interaction layer.
- Synced root and public version files, changelog mirrors, Change Log Hub output, README current-release notes, and repeated footer version text to the new `v2.1.5b` beta patch release.

### Type pills

- <span class="pill pill-type">Changed</span> Corrected the shared nested-route header pathing so homepage navigation resolves to `/` from repeated route pages.

### Fix pills

- <span class="pill pill-fix">Navigation Fix</span> The brand and Home links no longer loop visitors back to the current nested route when used from inner pages.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Repeated first-level routes, nested policy routes, Change Log Hub, README current release, branded error-page footer version text, and repeated footer version strings across the public site.
- Files changed: Repeated `public/**/index.html` header links, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, `README.md`, and repeated `public/**/*.html` footer version strings.
- User groups affected: Public visitors using nested routes and maintainers reviewing release records.
- Public impact: Visitors on nested pages can now use the brand and Home links to return to the homepage as expected.
- Internal impact: Shared static header markup now uses the correct directory depth for homepage navigation while release records remain aligned.

### Version decision

- Previous version: `v2.1.4b`
- New version: `v2.1.5b`
- Version type: Beta patch release
- Reason for version bump: This is a small user-visible navigation bug fix that corrects repeated header behavior without changing routes or introducing a new workflow.

### Validation

- Checks run: Source review of repeated header links, release-record alignment review, and path-audit searches across nested route files.
- Manual checks completed: Confirmed by source review that only `public/index.html` keeps `href="./"` for the brand and Home links, nested first-level routes now use `../`, nested policy routes now use `../../`, and no SEO metadata, sitemap entries, robots rules, Newsroom routing, footer links, or branded error-page structure were changed by this fix.
- Known limitations: PHP CLI is not available in this workspace, so the recommended `php -S 127.0.0.1:8080 -t public` preview and full browser-based click testing still need a manual pass outside this non-interactive workspace.
- Rollback notes: Revert the repeated nested-route header links and restore the previous `v2.1.4b` release records if the navigation fix needs to be undone.

## [v2.1.4b] - 2026-06-09

<span class="pill pill-version">Version v2.1.4b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Layout Fix</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Fixed the shared help sidebar so both cards float together with clearer spacing across the homepage and repeated route pages.

### Detailed changes

- Updated `public/assets/theme/clinic.css` so the shared sidebar container now handles sticky positioning, the two-column content grid aligns items correctly, and the support cards keep a clearer gap on desktop.
- Preserved the existing stacked mobile layout by returning the sidebar to normal flow below the desktop breakpoint.
- Synced root and public version files, changelog mirrors, Change Log Hub output, README current-release notes, and repeated footer version text to the new `v2.1.4b` beta patch release.

### Type pills

- <span class="pill pill-type">Changed</span> Corrected the shared sidebar behavior so the help panel and illustration card move together instead of separating during desktop scrolling.
- <span class="pill pill-accessibility">Accessibility</span> Improved visual separation and reading flow for the repeated support sidebar on shared public pages.

### Fix pills

- <span class="pill pill-fix">Layout Fix</span> Moved sticky behavior from the first sidebar card to the shared sidebar container and increased the inter-card gap.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Homepage, services, bookings, contact, repeated species and policy pages, branded error pages, Change Log Hub, README current release, and repeated footer version text.
- Files changed: `public/assets/theme/clinic.css`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, `README.md`, and repeated `public/**/*.html` footer version strings.
- User groups affected: Public visitors, pet owners using service and information pages, and maintainers reviewing release records.
- Public impact: The shared support sidebar now reads as two separate cards while floating together more reliably on desktop pages.
- Internal impact: Shared layout behavior and release records remain aligned for future maintenance.

### Version decision

- Previous version: `v2.1.3b`
- New version: `v2.1.4b`
- Version type: Beta patch release
- Reason for version bump: This is a small user-visible layout and usability fix to a shared repeated sidebar pattern.

### Validation

- Checks run: Source review of the shared sidebar CSS cascade and release-record alignment review.
- Manual checks completed: Confirmed by source review that the shared sidebar now owns desktop sticky behavior, keeps a larger card gap, and returns to normal flow below `980px` without changing routes, navigation, SEO metadata, sitemap entries, robots rules, Newsroom routing, footer links, or branded error-page structure.
- Known limitations: PHP CLI is not available in this workspace, so the recommended `php -S 127.0.0.1:8080 -t public` preview and full browser-based visual scrolling QA still need a manual pass outside this non-interactive workspace.
- Rollback notes: Revert the shared sidebar CSS changes and restore the previous `v2.1.3b` release records if the layout fix needs to be undone.

## [v2.1.3b] - 2026-06-09

<span class="pill pill-version">Version v2.1.3b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Contrast Fix</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Improved the shared clinic hero contrast so the heading and badge text remain readable on the light panel across the homepage and related route pages.

### Detailed changes

- Updated the final shared hero override in `public/assets/theme/clinic.css` so the light-panel hero now explicitly sets readable dark text colors for the panel, heading, and badge labels instead of inheriting pale text from the earlier dark hero block.
- Preserved the existing hero layout, background treatment, badges, and imagery while fixing the low-contrast text issue affecting repeated hero sections across the website.
- Synced root and public version files, changelog mirrors, Change Log Hub output, README current-release notes, and repeated footer version text to the new `v2.1.3b` beta patch release.

### Type pills

- <span class="pill pill-type">Changed</span> Corrected the shared hero theme cascade so light-panel hero copy is readable without changing the page structure or content.
- <span class="pill pill-accessibility">Accessibility</span> Improved text contrast for the shared hero heading and badge labels on repeated public pages.

### Fix pills

- <span class="pill pill-fix">Contrast Fix</span> The shared hero no longer relies on dark-theme inherited text colors that became too faint on the later light-panel variant.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Homepage hero, repeated hero sections on service and information pages, Change Log Hub, README current release, and repeated footer version text.
- Files changed: `public/assets/theme/clinic.css`, `VERSION`, `public/VERSION`, `CHANGELOG.md`, `public/CHANGELOG.md`, `public/changelog/index.html`, `README.md`, and repeated `public/**/*.html` footer version strings.
- User groups affected: Public visitors, pet owners using service and information pages, and maintainers reviewing release records.
- Public impact: Hero headings and support badges are easier to read on the light-panel clinic theme.
- Internal impact: Shared theme behavior and release records remain aligned for future maintenance.

### Version decision

- Previous version: `v2.1.2b`
- New version: `v2.1.3b`
- Version type: Beta patch release
- Reason for version bump: This is a small user-visible accessibility and styling fix to the shared hero presentation.

### Validation

- Checks run: Source review of the final hero cascade, release-record alignment check, and footer version string verification across public HTML files.
- Manual checks completed: Confirmed by source review that the final light hero override now sets explicit readable colors for the panel, heading, and badge labels without changing routes, navigation, SEO metadata, sitemap entries, robots rules, News routing, footer links, or branded error-page structure.
- Known limitations: Browser QA with a live local preview still needs a manual visual pass outside this non-interactive workspace.
- Rollback notes: Revert the shared hero color overrides and restore the previous `v2.1.2b` release records if the contrast fix needs to be undone.

## [v2.1.2b] - 2026-06-09

<span class="pill pill-version">Version v2.1.2b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-compliance">Deployment Hygiene</span>
<span class="pill pill-fix">Runtime Cleanup</span>

### Summary

Removed Python helper usage from the deployable website tree and updated local workflow guidance so the APES Pet Care Clinic website remains aligned with Cloudron LAMP hosting expectations.

### Detailed changes

- Removed the legacy Python static-generation helper from `public/build_site.py` and Python crawl helper scripts from `public/crawl/` so the public document root no longer contains Python executable files.
- Replaced the Python-based VS Code preview task with a PHP built-in server preview command that points at the `public/` document root.
- Updated `README.md`, `AGENTS.md`, and `docs/maintenance-artifacts.md` so setup, preview, validation, and retained-artifact guidance no longer recommends Python or npm workflows for this static Cloudron LAMP website.
- Synced root and public version files, mirrored changelogs, Change Log Hub output, README current-release notes, and repeated footer version text to the new `v2.1.2b` beta patch release.
- Preserved normal browser-side JavaScript, JSON-LD, Stripe, Chatwoot, OneSignal, Hello Bar, Apache `.htaccess`, sitemap, robots, branded error pages, and static HTML routes.

### Type pills

- <span class="pill pill-type">Changed</span> The repository workflow now reflects static HTML, browser JavaScript, Apache, and optional PHP preview instead of Python or npm tooling.
- <span class="pill pill-compliance">Deployment Hygiene</span> The deployable `public/` tree no longer includes Python executable scripts.

### Fix pills

- <span class="pill pill-fix">Runtime Cleanup</span> Removed non-LAMP helper scripts and stale setup instructions that could confuse Cloudron LAMP maintenance.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Deployment source tree, local preview workflow, Change Log Hub, README current release, and repeated footer version text.
- Files changed: `VERSION`, `CHANGELOG.md`, `README.md`, `AGENTS.md`, `.vscode/tasks.json`, `docs/maintenance-artifacts.md`, `public/VERSION`, `public/CHANGELOG.md`, `public/changelog/index.html`, deleted Python helper scripts under `public/`, and repeated `public/**/*.html` footer version strings.
- User groups affected: Website maintainers, APES staff, and anyone preparing the site for Cloudron LAMP hosting.
- Public impact: Public routes and visitor journeys remain unchanged.
- Internal impact: The deployable website source is cleaner and easier to audit for Cloudron LAMP compatibility.

### Version decision

- Previous version: `v2.1.1b`
- New version: `v2.1.2b`
- Version type: Beta patch release
- Reason for version bump: This is a deployment hygiene, documentation, and release-record sync that removes non-LAMP helper scripts without changing public routes.

### Validation

- Checks run: Source review, non-LAMP runtime search, public executable-extension inventory, release-record alignment check, and footer version string verification across public HTML files.
- Manual checks completed: Confirmed by source review that static HTML routes, browser JavaScript, Apache routing, sitemap, robots, branded error pages, News redirects, and required footer governance links remain present.
- Known limitations: Browser QA and real Cloudron/Apache preview still need a manual pass outside this non-interactive workspace.
- Rollback notes: Restore the deleted Python helper scripts and revert the workflow, documentation, version, changelog, Change Log Hub, and footer version updates to return to `v2.1.1b`.

## [v2.1.1b] - 2026-06-09

<span class="pill pill-version">Version v2.1.1b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Theme Alignment</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Aligned the shared APES Pet Care Clinic theme and navigation behaviour more closely with the wider APES website pattern while keeping this repository's static HTML route model and public URLs unchanged.

### Detailed changes

- Refined the canonical shared clinic theme in `public/assets/theme/clinic.css` with clearer APES-style design tokens, stronger header and footer treatments, improved hero and card surfaces, and more consistent notice styling across the static route set.
- Updated `public/assets/js/site.js` so navigation behaves more like the APES reference model, including click-driven desktop mega menus, one-open-menu handling, mobile body scroll locking, outside-click close, Escape close, and safer desktop panel positioning.
- Kept `public/assets/css/styles.css` as the public compatibility entrypoint and documented that `public/assets/theme/clinic.css` remains the editable theme source of truth for maintainers.
- Synced the mirrored root and public version files, changelog mirrors, Change Log Hub entry, README release notes, and repeated footer version text to the new `v2.1.1b` beta patch release.
- Preserved the existing route map, SEO metadata, News routing, footer governance links, and HTML-first deployment approach while improving the shared visual system and maintainability guidance.

### Type pills

- <span class="pill pill-type">Changed</span> Brought the shared visual layer and interaction behaviour closer to the wider APES reference pattern without introducing PHP rendering or changing public routes.
- <span class="pill pill-accessibility">Accessibility</span> Improved contrast-supporting surfaces, focus-visible navigation cues, and mobile menu handling while retaining the existing skip-link and static page structure.

### Fix pills

- <span class="pill pill-fix">Theme Alignment</span> The shared clinic theme, navigation treatment, and maintainer guidance now follow a more deliberate APES-style source model instead of a looser static-only refresh.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Shared header, footer, hero, card, notice, navigation, Change Log Hub, branded error pages, and repeated footer version text across the static route set.
- Files changed: `VERSION`, `CHANGELOG.md`, `README.md`, `docs/maintenance-artifacts.md`, `public/VERSION`, `public/CHANGELOG.md`, `public/changelog/index.html`, `public/assets/theme/clinic.css`, `public/assets/js/site.js`, and repeated `public/**/*.html` footer version strings.
- User groups affected: Public visitors, pet owners, APES staff, and maintainers working on shared styling and navigation behaviour.
- Public impact: Visitors see a more consistent APES-aligned presentation and steadier navigation behaviour without any route or content migration.
- Internal impact: The repository now has clearer theme-source ownership and better shared interaction behaviour while staying within the existing static HTML maintenance model.

### Version decision

- Previous version: `v2.1.0b`
- New version: `v2.1.1b`
- Version type: Beta patch release
- Reason for version bump: This is a user-visible theming and interaction refinement plus release-record sync that preserves routes and deployment structure.

### Validation

- Checks run: Source review of shared CSS and JS, release-record alignment checks, local HTTP preview requests for key routes, and footer version string verification across public HTML files.
- Manual checks completed: Confirmed by source review that the shared stylesheet and JavaScript paths remain stable, required footer governance links remain present, and the Change Log Hub reflects the new release.
- Known limitations: Visual browser QA, responsive interaction QA in a real browser, and full keyboard-navigation checks still need a manual pass in an interactive preview session.
- Rollback notes: Revert the shared theme and navigation script updates, release-record changes, README/docs adjustments, Change Log Hub entry, and repeated footer version sync to restore `v2.1.0b`.

## [v2.1.0b] - 2026-06-09

<span class="pill pill-version">Version v2.1.0b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Workflow Fix</span>
<span class="pill pill-compliance">Documentation</span>

### Summary

Added a VS Code localhost preview workflow for the HTML-first website and reorganised the shared clinic theme into a dedicated theme folder so maintainers can see styling and images correctly during local preview.

### Detailed changes

- Added a workspace task that runs `python -m http.server 8000` from `public/`, giving the static site a proper localhost web root for VS Code Simple Browser and other local previews.
- Documented that direct `file://` previews show white text-first pages because the website intentionally uses root-relative asset and route paths such as `/assets/...` and `/services/`.
- Moved the canonical shared clinic stylesheet to `public/assets/theme/clinic.css` and converted `public/assets/css/styles.css` into a lightweight compatibility entrypoint so live public URLs remain unchanged.
- Kept the existing route files, image paths, JavaScript path, SEO metadata, sitemap URLs, News routing, and footer governance links intact while improving the repository's local preview ergonomics.
- Updated the root and public version files, changelog mirrors, Change Log Hub output, README current-release notes, and static footer version text so the release record matches the new `v2.1.0b` beta minor workflow update.

### Type pills

- <span class="pill pill-type">Changed</span> Added a repository-level localhost preview workflow without changing the live website routing or asset contract.
- <span class="pill pill-compliance">Documentation</span> Clarified the supported local preview method in the repository guidance so maintainers do not mistake raw `file://` rendering for a broken deployment.

### Fix pills

- <span class="pill pill-fix">Workflow Fix</span> VS Code previewing now has a first-class localhost path that correctly loads the shared theme, images, and root-relative links.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: `/`, `/services/`, `/contact/`, `/changelog/`, shared static footer version text, and local preview workflow documentation.
- Files changed: `.vscode/tasks.json`, `VERSION`, `CHANGELOG.md`, `README.md`, `public/VERSION`, `public/CHANGELOG.md`, `public/changelog/index.html`, `public/assets/css/styles.css`, `public/assets/theme/clinic.css`, and the repeated `public/**/*.html` footer version strings.
- User groups affected: Website maintainers, APES staff, and anyone previewing the website locally in VS Code.
- Public impact: No live route, asset, or content contract changed for visitors.
- Internal impact: Local previewing is clearer, faster, and more reliable, and the shared theme now has a dedicated canonical home.

### Version decision

- Previous version: `v2.0.1b`
- New version: `v2.1.0b`
- Version type: Beta minor release
- Reason for version bump: This adds a meaningful new maintainer workflow and internal theme organisation improvement without changing live public routes.

### Validation

- Checks run: Started a local Python HTTP server from `public/`, requested `/`, `/services/`, `/contact/`, and `/changelog/` over localhost, and inspected release-record alignment by source.
- Manual checks completed: Confirmed by source review that the shared stylesheet import preserves the `/assets/css/styles.css` contract, the new canonical theme file exists under `public/assets/theme/`, and required footer governance links remain present.
- Known limitations: Final visual QA in VS Code Simple Browser, responsive browser QA, and browser-console review still need a manual pass in an interactive browser session.
- Rollback notes: Revert the VS Code task, stylesheet move, compatibility import, README updates, footer version sync, and aligned release records to restore the previous `v2.0.1b` repository workflow.

## [v2.0.1b] - 2026-06-09

<span class="pill pill-version">Version v2.0.1b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Brand Refresh</span>
<span class="pill pill-accessibility">Accessibility</span>

### Summary

Refreshed the APES Pet Care Clinic public website so it now reads clearly as a warm, reassuring pet care clinic while keeping the HTML-first runtime, existing routes, and welfare-first safety messaging intact.

### Detailed changes

- Reworked the shared stylesheet into a softer clinic-led visual system with warmer cards, calmer gradients, stronger CTA hierarchy, improved notice styling, and a more welcoming APES-aligned header and footer treatment.
- Replaced the repeated logo, favicon, manifest, and social-sharing asset references with the optimized website logo pack, including a new favicon set, updated JSON-LD logo path, refreshed header/footer logo usage, and consistent social image metadata.
- Added new custom clinic imagery under `public/assets/images/` and integrated the visuals into the shared hero pattern so key public pages now present a more supportive pet-care atmosphere rather than text-led logo-only panels.
- Added icon-led feature panels and supportive illustration blocks to the homepage, Services Hub, bookings page, and contact page so visitors can scan core guidance, booking expectations, and support routes more easily.
- Kept the existing route URLs, footer governance links, News redirects, Stripe and booking flows, Chatwoot, OneSignal, Hello Bar, and clinical-scope wording intact while improving the site’s visual clarity and consistency.
- Updated the root and public version files, changelog mirrors, Change Log Hub output, and README current-release notes so the release record matches the refreshed public presentation.

### Type pills

- <span class="pill pill-type">Changed</span> Applied a full clinic-first visual refresh across the shared site chrome and key public routes without changing the underlying HTML-first route structure.
- <span class="pill pill-accessibility">Accessibility</span> Improved visual hierarchy, scannability, and focus-friendly component treatments while keeping warning content and navigation patterns easy to locate.

### Fix pills

- <span class="pill pill-fix">Brand Refresh</span> The site no longer feels like a text-first placeholder and now uses clinic-appropriate imagery, iconography, and brand assets throughout the public experience.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: `/`, `/services/`, `/bookings/`, `/contact/`, `/changelog/`, shared hero/footer/header patterns, and the repeated public HTML head metadata.
- Files changed: `VERSION`, `CHANGELOG.md`, `README.md`, `public/VERSION`, `public/CHANGELOG.md`, `public/changelog/index.html`, `public/site.webmanifest`, `public/assets/css/styles.css`, new files under `public/assets/images/`, `public/assets/social/`, `public/assets/logos/optimized/`, `public/favicons/`, and updated `public/**/*.html` route files.
- User groups affected: Pet owners, donors, public visitors, and staff maintaining the website.
- Public impact: Visitors now see a warmer, more trustworthy clinic presentation with clearer visual guidance, richer hero media, and stronger route scanning cues.
- Internal impact: Public brand assets, release records, and head metadata are now more consistent and easier to maintain across the static route set.

### Version decision

- Previous version: `v2.0.0b`
- New version: `v2.0.1b`
- Version type: Beta patch release
- Reason for version bump: This is a significant user-visible branding and presentation refresh that preserves routes, integrations, and runtime architecture while improving the public visual experience.

### Validation

- Checks run: Source inspection across the shared stylesheet, repeated HTML head metadata, shared hero/footer patterns, generated image assets, favicon paths, version files, and changelog mirrors.
- Manual checks completed: Confirmed by source review that the optimized logos, favicons, social images, manifest, and new clinic imagery are referenced from the public document root and that footer governance links and clinical-scope messaging remain present.
- Known limitations: Browser QA, keyboard QA, real popup behaviour checks, and final responsive verification in a running `public/` web-root environment still need to be completed manually.
- Rollback notes: Revert the shared CSS refresh, updated public HTML route files, added clinic image and favicon assets, and synchronized release-record updates to restore the previous `v2.0.0b` presentation.

## [v2.0.0b] - 2026-06-09

<span class="pill pill-version">Version v2.0.0b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Migration</span>
<span class="pill pill-compliance">Architecture</span>

### Summary

Migrated the APES Pet Care Clinic public website from PHP route templates to an HTML-first runtime, aligned the site chrome with the wider APES navigation pattern, and removed the live dependency on shared PHP includes.

### Detailed changes

- Converted the public route templates into static `index.html` pages, including the homepage, Services Hub, species pages, policies, donate, contact, bookings, and the Change Log Hub.
- Added static `403.html`, `404.html`, and `500.html` error documents and switched Apache to use them as the active public fallback pages.
- Rebuilt the shared site chrome as static HTML with a skip link, topbar contact links, APES network social links, a sticky header, accessible menu controls, grouped navigation, and a denser footer layout.
- Migrated the payment catalogue, route-level metadata, canonical tags, Open Graph tags, and JSON-LD output into static HTML so public pages no longer depend on `public/includes/` PHP helpers at runtime.
- Switched `.htaccess` to prioritise `index.html`, added redirects from direct `.php` requests to clean folder URLs or HTML error pages, and blocked direct browser access to helper-only directories.
- Updated the root and public version records, changelog mirrors, README, and maintenance-artifact notes so the repository documents the HTML-first runtime accurately.
- Removed obsolete route-level PHP entrypoints, PHP error pages, legacy redirect wrappers, and unused include files after generating the verified HTML equivalents.

### Type pills

- <span class="pill pill-type">Changed</span> Replaced the public PHP route runtime with static HTML output while preserving clean folder URLs, external integrations, and the existing welfare-first copy.
- <span class="pill pill-compliance">Architecture</span> Brought the Pet Care Clinic runtime into line with the APES HTML-first website direction and made the public output easier to audit and host safely.

### Fix pills

- <span class="pill pill-fix">Migration</span> Direct public `.php` requests now redirect to the correct clean routes instead of depending on runtime PHP files that no longer serve the live site.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: `/`, service routes, policy routes, `/bookings/`, `/contact/`, `/about-us/`, `/events/`, `/donate/`, `/changelog/`, and the branded error pages.
- Files changed: `VERSION`, `CHANGELOG.md`, `README.md`, `docs/maintenance-artifacts.md`, `public/VERSION`, `public/CHANGELOG.md`, `public/.htaccess`, `public/assets/css/styles.css`, `public/assets/js/site.js`, generated `public/**/*.html` route files, and removal of obsolete `public/**/*.php` route and include files.
- User groups affected: Public visitors, staff maintaining the website, donors, and pet owners using the booking, support, payment, and policy routes.
- Public impact: Visitors now reach an HTML-first website with the same clean public URLs, updated navigation chrome, preserved integrations, and static error pages.
- Internal impact: The live site no longer depends on PHP includes for headers, footers, metadata, or payment-card output, reducing runtime complexity and making release artefacts easier to inspect.

### Version decision

- Previous version: `v1.0.0b`
- New version: `v2.0.0b`
- Version type: Beta major release
- Reason for version bump: This replaces the public runtime architecture, routing preference, and error-page contract while preserving the existing user journeys and route inventory.

### Validation

- Checks run: Generated the static route set from the current PHP templates, reviewed the produced HTML output, checked for remaining public template markers, and inspected the HTML-first routing rules and release-record alignment by source.
- Manual checks completed: Confirmed by source inspection that public routes now have `index.html` equivalents, the footer exposes the required governance links and version text, and Apache now prefers HTML with redirects for direct `.php` requests.
- Known limitations: `php` CLI is unavailable in this workspace, and no live browser or Apache preview was available here, so final visual QA, keyboard QA, external-link behaviour, and real `403`/`404`/`500` server handling still need a manual pass in a running environment.
- Rollback notes: Revert the generated HTML routes, `.htaccess`, CSS and JS changes, release-record updates, and the removal of runtime PHP files to restore the previous `v1.0.0b` PHP-driven site.

## [v1.0.0b] - 2026-06-09

<span class="pill pill-version">Version v1.0.0b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Maintenance</span>
<span class="pill pill-compliance">Architecture</span>

### Summary

Simplified the shared PHP architecture for the APES Pet Care Clinic website, added canonical root release records, introduced branded error pages, and aligned the repository documentation with the real Cloudron LAMP deployment pattern.

### Detailed changes

- Split the shared website bootstrap into focused include layers for site configuration, reusable helpers, and metadata assembly while keeping all public routes and visible page content intact.
- Extracted the repeated standard-page hero banner into one shared include so the main route templates now carry less duplicated markup.
- Preserved the existing PHP page pattern and third-party integrations without introducing any frontend build tooling, framework, or dependency pipeline.
- Added branded `403`, `404`, and `500` PHP error pages and connected them in `.htaccess` so Cloudron LAMP deployments have safer fallback behaviour.
- Added missing universal footer governance links for the donation page, Privacy Policy, Terms and Conditions, and Change Log Hub.
- Added root-level `VERSION` and `CHANGELOG.md` records so the repository now carries canonical release metadata alongside the public mirror files.
- Rewrote the root `README.md` to document the actual PHP and Apache maintenance workflow, `public/` document root, shared include structure, and retained legacy maintenance artifacts.
- Added a dedicated maintenance-artifact note so older crawl and helper files are clearly documented as non-runtime unless a later task proves otherwise.

### Type pills

- <span class="pill pill-type">Changed</span> Refactored the shared include architecture and repository release record structure without changing public routes or page content.
- <span class="pill pill-compliance">Architecture</span> Aligned the repository and deployment guidance with the simplified Cloudron LAMP maintenance model used for the live site.

### Fix pills

- <span class="pill pill-fix">Maintenance</span> Release records, footer governance links, and error-page coverage are now easier to maintain and audit.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Shared templates, footer links, branded error pages, release records, and repository documentation.
- Files changed: `VERSION`, `CHANGELOG.md`, `README.md`, `docs/maintenance-artifacts.md`, `public/VERSION`, `public/CHANGELOG.md`, `public/.htaccess`, `public/403.php`, `public/404.php`, `public/500.php`, `public/changelog/index.php`, `public/index.php`, standard route templates, `public/includes/hero.php`, `public/includes/page-init.php`, `public/includes/site-config.php`, `public/includes/site-helpers.php`, `public/includes/site-metadata.php`, and `public/includes/footer.php`.
- User groups affected: Public visitors, staff maintaining the website, and anyone relying on footer governance links or release records.
- Public impact: The visible site contract remains the same while footer compliance and error-page coverage improve.
- Internal impact: The site is easier to maintain in a simple Cloudron LAMP workflow with clearer shared include boundaries, less duplicated page-banner markup, and synchronized release records.

### Version decision

- Previous version: `v0.5.1b`
- New version: `v1.0.0b`
- Version type: Beta major release
- Reason for version bump: This is a major internal architecture simplification and repository-governance reset that preserves public journeys while materially changing how the site is maintained and released.

### Validation

- Checks run: Reviewed shared include dependencies, route templates, release records, footer links, robots and sitemap references, and Apache error-document wiring by source inspection.
- Manual checks completed: Confirmed the site still uses folder-based public URLs, the footer now exposes donation, privacy, terms, and Change Log Hub links, and release metadata now exists in both root and public records.
- Known limitations: `php` CLI is not available in this workspace, so automated `php -l`, browser QA, popup behaviour QA, and Cloudron runtime verification still need to be completed in a PHP-capable environment.
- Rollback notes: Revert the shared include split, footer link additions, new error pages, version files, changelog entries, and README rewrite to restore the previous `v0.5.1b` maintenance structure.

## [v0.5.1b] - 2026-06-02

<span class="pill pill-version">Version v0.5.1b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-fix">Integration Fix</span>
<span class="pill pill-fix">Layout Fix</span>

### Summary

Removed the broken embedded booking form from the public bookings page, switched booking and pre-pay links to shared popup-window behaviour with a safe fallback, and fixed card and CTA spacing issues affecting the homepage and Services Hub.

### Detailed changes

- Replaced the broken `/bookings/` iframe section with booking guidance, a primary popup booking CTA, and fallback messaging explaining that popup blockers will fall back to a normal new tab.
- Generalised the shared external-link popup script so booking, contact, and Stripe pre-pay links now use one reusable popup-window pattern rather than separate hard-coded behaviours.
- Updated the shared clinic sidebar booking CTA and all shared `Pre-pay and book` buttons so they open external workflows in a popup window by default.
- Tightened the Services Hub pre-pay grid and card styling so long pill text, copy, and headings stay inside their cards at common desktop widths.
- Added explicit spacing below the homepage `Before you pay` warning box so the `Open the Services Hub` CTA no longer overlaps the panel.
- Updated the canonical `VERSION` file plus both changelog records so the release is synchronised under the new `v0.5.1b` beta patch entry.
- Confirmed this release does not change APES Newsroom routing, footer-news behaviour, newsletter prompts, or article metadata.

### Type pills

- <span class="pill pill-type">Changed</span> Reworked the public bookings page into a non-embedded booking guidance page and moved shared external workflow links onto one popup-window pattern.
- <span class="pill pill-type">Fixed</span> Corrected the broken booking embed, the overflowing Services Hub payment-card content, and the homepage `Before you pay` CTA overlap.

### Fix pills

- <span class="pill pill-fix">Integration Fix</span> Booking and Stripe pre-pay journeys now share consistent popup-window handling with safe new-tab fallback when popups are blocked.
- <span class="pill pill-fix">Layout Fix</span> Pre-pay cards now keep long text inside card bounds and the homepage CTA spacing no longer collides with the warning panel.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: `/`, `/services/`, `/bookings/`, `/contact/`, and `/changelog/`.
- Files changed: `assets/css/styles.css`, `assets/js/site.js`, `bookings/index.php`, `contact/index.php`, `includes/clinic-sidebar.php`, `includes/prepay-services.php`, `index.php`, `services/index.php`, `VERSION`, `CHANGELOG.md`, and `changelog/index.php`.
- User groups affected: Public visitors using the booking journey, owners using Stripe pre-pay links, and staff handling enquiries triggered from those routes.
- Public impact: Visitors now see a working booking route, consistent popup behaviour for external booking and payment journeys, and cleaner card layouts on the Services Hub and homepage.
- Internal impact: Shared popup handling and pre-pay card styling are now easier to maintain across routes without page-specific fixes.

### Version decision

- Previous version: `v0.5.0b`
- New version: `v0.5.1b`
- Version type: Beta patch release
- Reason for version bump: This is a low-risk public-facing fix to an existing booking journey, CTA behaviour, and layout presentation without adding a new route or expanding website scope.

### Validation

- Checks run: Reviewed the updated booking template, shared popup script, shared pre-pay renderer, and shared stylesheet changes by code inspection. A local `php` CLI was not available in this workspace, so automated `php -l` syntax checks could not be run.
- Manual checks completed: Confirmed by source inspection that the public bookings page no longer contains the broken iframe and that booking plus pre-pay links now share popup-window attributes and fallback-safe targets.
- Known limitations: Browser-based visual QA and live popup behaviour still need a manual pass in a running site environment because this workspace does not guarantee a local PHP server or deployed preview.
- Rollback notes: Revert the bookings template rewrite, shared popup-link updates, shared pre-pay button rendering, stylesheet changes, `VERSION`, and both changelog entries to restore the previous `v0.5.0b` booking and layout state.

## [v0.5.0b] - 2026-06-02

<span class="pill pill-version">Version v0.5.0b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Added</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-fix">Integration Fix</span>
<span class="pill pill-fix">Content Fix</span>

### Summary

Added the supplied Stripe Care Plan Pricing Table to the public Care Plans page and restructured the page into a clearer card-led journey so visitors can compare options, review suitability guidance, and contact the clinic before paying where needed.

### Detailed changes

- Reworked the `/care-plans/` page order so visitors now see a plan overview first, the live pricing table second, supporting plan information in a responsive card grid, and a final safety/contact card at the end of the main content.
- Embedded the supplied Stripe pricing table directly on `/care-plans/` and kept the script local to that page template rather than moving Stripe into the shared website header.
- Added pricing-table support copy explaining that the plan chooser is hosted securely by Stripe and that visitors should contact the clinic if the table does not load or if they are unsure whether a plan is suitable.
- Grouped the `Eligibility and exclusions`, `Flexible options`, and `Multiple pets` content into responsive cards while keeping the existing clinic sidebar layout intact.
- Updated the Care Plans route metadata and hero lead so the page communicates pricing comparison and next-step guidance more clearly.
- Updated the canonical `VERSION` file plus both changelog records so the release is synchronised under the new `v0.5.0b` beta minor entry.

### Type pills

- <span class="pill pill-type">Added</span> Introduced the live Care Plan Stripe pricing table and supporting fallback guidance on `/care-plans/`.
- <span class="pill pill-type">Changed</span> Reordered the page into a clearer pricing-first card journey and refined the Care Plans route copy and metadata.
- <span class="pill pill-type">Fixed</span> Reduced ambiguity in the plan-join journey by placing pricing, suitability guidance, and contact fallback in a clearer sequence.

### Fix pills

- <span class="pill pill-fix">Integration Fix</span> The supplied Stripe pricing table is now embedded directly on the Care Plans page without adding Stripe scripts to shared site templates.
- <span class="pill pill-fix">Content Fix</span> Visitors now see plan comparison, exclusions, and next-step guidance in one route instead of needing to infer pricing from generic page copy alone.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: `/care-plans/` and `/changelog/`.
- Files changed: `care-plans/index.php`, `assets/css/styles.css`, `VERSION`, `CHANGELOG.md`, and `changelog/index.php`.
- User groups affected: Public visitors, low-income pet owners, staff handling care-plan enquiries, and anyone choosing a routine welfare support plan.
- Public impact: Visitors can now compare live care-plan options on the page, read plan suitability guidance in a clearer order, and use a direct contact fallback if they need help before paying.
- Internal impact: The Care Plans route now carries a scoped Stripe embed and cleaner content structure without changing shared header behaviour.

### Version decision

- Previous version: `v0.4.0b`
- New version: `v0.5.0b`
- Version type: Beta minor release
- Reason for version bump: This adds a public-facing payment and plan-comparison component while materially restructuring the Care Plans route into a clearer user journey without changing the wider website platform.

### Validation

- Checks run: Reviewed the updated Care Plans template, confirmed the supplied Stripe pricing table ID and publishable key are present only on the `/care-plans/` template, reviewed the new card-layout styles, and synchronised the version and changelog records by code inspection. No local `php` CLI binary was available in this environment for automated `php -l` checks.
- Manual checks completed: Confirmed by source inspection that the page order now follows overview, pricing table, supporting info cards, and final safety/contact guidance, and that both changelog records plus `VERSION` now reference `v0.5.0b`.
- Known limitations: Live browser verification, responsive visual QA, and live Stripe pricing-table rendering could not be tested in this environment, so the final embedded-table display still needs a manual browser pass on staging or production.
- Rollback notes: Revert the Care Plans template restructure, scoped Care Plans stylesheet additions, `VERSION`, and both changelog entries to restore the previous `v0.4.0b` Care Plans release state.

## [v0.4.0b] - 2026-06-02

<span class="pill pill-version">Version v0.4.0b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Added</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-compliance">Compliance</span>
<span class="pill pill-fix">Accessibility Fix</span>
<span class="pill pill-fix">SEO Fix</span>

### Summary

Completed a beta audit-hardening release that reframes clinically sensitive public wording, moves pre-payment into a safer Services Hub journey, replaces encoded-space routes with clean canonical routes, and adds the metadata, sitemap, robots, and payment-audit records needed for a more maintainable public website.

### Detailed changes

- Refactored the shared pre-pay service registry so every payment route now carries safer welfare-first naming, suitability wording, Stripe and external-link notes, scope warnings, risk flags, and updated accessible labels.
- Added a reusable `Before you pay` warning block and stronger clinical-scope notices across the homepage, Services Hub, general services, species pages, booking route, and policy pages.
- Created the new `/services/` hub, removed the duplicated payment section from `/general-services/`, and moved the homepage away from the full payment catalogue toward a safer route-selection journey.
- Created clean canonical routes for `/care-plans/` and `/lab-services/`, added redirects from the old encoded-space URLs, and updated internal navigation, crawl inputs, source route lists, and sitemap artifacts to use the canonical paths.
- Reworked rabbit, guinea pig, reptile, invertebrate, ferret, dog, and cat wording to avoid implying diagnosis, treatment, surgery, or guaranteed intervention, while preserving clear referral guidance when veterinary care is needed.
- Fixed the `pet€™s` mojibake issue by replacing the old encoded care-plans route template with the new canonical page and sweeping remaining route/source files for the known encoding artefacts.
- Extended the shared page head with canonical URLs, Open Graph metadata, Twitter card metadata, and structured data for `Organization`, `WebSite`, `BreadcrumbList`, and safe `Service` pages.
- Added `robots.txt`, `sitemap.xml`, an updated public `sitemap.html`, and a root-level `PAYMENT_LINK_AUDIT.md` file so SEO and payment-link governance are tracked alongside the beta release.
- Updated the canonical `VERSION` file plus both changelog records so the release is synchronised under the new `v0.4.0b` beta minor entry.

### Type pills

- <span class="pill pill-type">Added</span> Introduced the new `/services/` hub, canonical `/care-plans/` and `/lab-services/` routes, `robots.txt`, `sitemap.xml`, and the `PAYMENT_LINK_AUDIT.md` governance record.
- <span class="pill pill-type">Changed</span> Reworked shared payment wording, public clinic-scope copy, navigation behaviour, metadata, sitemap records, and route references across the site.
- <span class="pill pill-type">Fixed</span> Removed the duplicated general-services payment block, fixed encoded-route references, corrected the care-plans mojibake, and standardised UK spelling and sentence case in the audited templates.
- <span class="pill pill-compliance">Compliance</span> Hardened clinically sensitive public wording and pre-payment messaging so APES is framed as first aid, welfare support, and referral triage only.

### Fix pills

- <span class="pill pill-fix">Accessibility Fix</span> Payment links now keep unique accessible labels, decorative hero logos use empty alt text, menu triggers have clearer focus treatment, and the Change Log Hub accessibility baseline remains intact.
- <span class="pill pill-fix">SEO Fix</span> Canonical metadata, Open Graph/Twitter metadata, robots, sitemap, and clean canonical routes are now aligned around the live public pages.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: `/`, `/services/`, `/general-services/`, `/dog-care/`, `/cat-care/`, `/reptile-care/`, `/invert-care/`, `/rabbit-care/`, `/guinea-care/`, `/ferret-care/`, `/care-plans/`, `/lab-services/`, `/bookings/`, `/contact/`, `/about-us/`, `/events/`, `/policies/booking-policy/`, `/policies/refund-policy/`, `/policies/privacy-policy/`, `/policies/terms-and-conditions/`, `/changelog/`, `/robots.txt`, `/sitemap.xml`, and `/sitemap.html`.
- Files changed: `.htaccess`, `assets/css/styles.css`, `assets/js/site.js`, `includes/page-init.php`, `includes/header.php`, `includes/prepay-services.php`, `includes/clinic-sidebar.php`, `index.php`, `services/index.php`, `general-services/index.php`, `dog-care/index.php`, `cat-care/index.php`, `reptile-care/index.php`, `invert-care/index.php`, `rabbit-care/index.php`, `guinea-care/index.php`, `ferret-care/index.php`, `care-plans/index.php`, `lab-services/index.php`, `bookings/index.php`, `contact/index.php`, `about-us/index.php`, `events/index.php`, policy templates, old-route wrappers, `build_site.py`, `crawl_urls.txt`, `PAYMENT_LINK_AUDIT.md`, `robots.txt`, `sitemap.xml`, `sitemap.html`, `VERSION`, `CHANGELOG.md`, and `changelog/index.php`.
- User groups affected: Public visitors, low-income pet owners, donors, volunteers, staff handling enquiries, and anyone using the payment or booking journeys.
- Public impact: Visitors now see safer service wording, a clearer Services Hub entry point, stronger pre-payment warnings, cleaner care-plan and lab-service URLs, and improved metadata and sitemap records.
- Internal impact: Payment governance, route inventories, and shared content rules are now more maintainable and better aligned with APES audit requirements.

### Version decision

- Previous version: v0.3.2
- New version: v0.4.0b
- Version type: Beta minor release
- Reason for version bump: This release adds a new Services Hub and canonical routes while materially reworking public payment journeys, compliance wording, metadata, and accessibility/SEO support across existing pages without changing the site platform.

### Validation

- Checks run: Searched the repo for encoded-space route references, mojibake artefacts, and outdated clinically sensitive labels; updated canonical route inventories and metadata sources; and reviewed the shared payment registry, redirects, sitemap files, and changelog synchronization by code inspection. No local `php` CLI binary was available in this environment for automated `php -l` checks.
- Manual checks completed: Confirmed the homepage now routes visitors into the Services Hub, the shared payment catalogue renders through the new warning helpers, the old care-plans and lab-services routes now wrap to canonical equivalents, and the new `v0.4.0b` version appears in the repo version source of truth and changelog records.
- Known limitations: Live browser verification, live Stripe destination verification, Lighthouse, axe, and external link status checks were not available in this environment, so responsive behaviour, keyboard interaction, and external payment destination validation still need a manual browser pass on staging or production.
- Rollback notes: Revert the shared payment and metadata helpers, route redirects, new canonical route pages, policy/template rewrites, sitemap/robots/payment-audit files, VERSION file, and both changelog entries to restore the previous `v0.3.2` public release state.

## [v0.3.2] - 2026-06-02

<span class="pill pill-version">Version v0.3.2</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-fix">Navigation Fix</span>
<span class="pill pill-fix">Content Fix</span>

### Summary

Replaced the Donorbox-branded donate anchor on the public donate page with an APES-owned heart button that opens the donation form in a popup window while keeping the website page in place.

### Detailed changes

- Removed the Donorbox-branded donate anchor styling, external Donorbox logo image, and old query-string destination from the donate funds card on `/donate/`.
- Added a new APES-styled green donate button with an inline white heart icon and `Donate Now` label so the funds card now uses the website's own visual language.
- Kept the popup-window behaviour for the external donation journey and updated the button to point at the base URL `https://donorbox.org/apes-pet-care-clinic-donations`.
- Updated the donation helper note so visitors are told that the secure donation page opens in a separate popup window.
- Updated the canonical VERSION file plus both changelog records so the release is synchronised under the new v0.3.2 stable patch entry.

### Type pills

- <span class="pill pill-type">Changed</span> Reworked the donate-page funds CTA to use APES-native button styling and the base donation URL.
- <span class="pill pill-type">Fixed</span> Removed third-party branded button code so the public donation route now matches the site design and still preserves the popup behaviour.

### Fix pills

- <span class="pill pill-fix">Navigation Fix</span> The donation journey still opens in a popup window without navigating visitors away from the donate page.
- <span class="pill pill-fix">Content Fix</span> The funds CTA now uses APES-owned button copy and visuals instead of embedded Donorbox branding.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: `/donate/` and `/changelog/`.
- Files changed: `donate/index.php`, `assets/css/styles.css`, `VERSION`, `CHANGELOG.md`, and `changelog/index.php`.
- User groups affected: Public visitors, donors, volunteers, and staff sharing the donation route.
- Public impact: Visitors now see an APES-branded heart donate button that opens the secure donation page in a separate popup window.
- Internal impact: The public donation CTA now matches the site design system while preserving the existing external donation workflow.

### Version decision

- Previous version: v0.3.1
- New version: v0.3.2
- Version type: Stable patch release
- Reason for version bump: This is a low-risk public-facing CTA refresh and interaction-preserving update on an existing donate route without adding a new workflow or page.

### Validation

- Checks run: Reviewed the updated donate template, confirmed the base Donorbox URL, checked that the old `dbox-donation-page-button` class no longer appears in live source files, and synchronised `v0.3.2` release records by code inspection. No local `php` CLI binary was available in this environment for automated `php -l` checks.
- Manual checks completed: Confirmed the new donate CTA uses an inline heart SVG, APES green styling, the requested `Donate Now` label, and the existing popup-window settings in the template source.
- Known limitations: Live browser verification was not available in this environment, so the final popup behaviour, button spacing, and popup-blocker behaviour still need a manual browser pass on staging or production.
- Rollback notes: Revert the donate template CTA swap, donate-button stylesheet updates, VERSION file, and both changelog entries to restore the previous v0.3.1 Donorbox-branded button state.

## [v0.3.1] - 2026-06-02

<span class="pill pill-version">Version v0.3.1</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-fix">Navigation Fix</span>

### Summary

Updated the donate-page Donorbox button so it now opens the donation form in a dedicated popup window instead of replacing the current website page.

### Detailed changes

- Updated the Donorbox donate button on `/donate/` to call `window.open(...)` and launch the donation flow in a popup window.
- Kept the existing destination URL, amount, designation, and button styling unchanged while adjusting only the click behaviour.
- Updated the canonical VERSION file plus both changelog records so the release is synchronised under the new v0.3.1 stable patch entry.

### Type pills

- <span class="pill pill-type">Changed</span> Adjusted the donate button interaction on the existing donate page.
- <span class="pill pill-type">Fixed</span> Prevented the donation journey from navigating visitors away from the APES donate page when opening the external Donorbox form.

### Fix pills

- <span class="pill pill-fix">Navigation Fix</span> The external donation form now opens in its own popup window rather than taking over the current page.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: `/donate/` and `/changelog/`.
- Files changed: `donate/index.php`, `VERSION`, `CHANGELOG.md`, and `changelog/index.php`.
- User groups affected: Public visitors and donors using the website donation route.
- Public impact: Visitors can keep the donate page open while the Donorbox donation form opens separately in a popup window.
- Internal impact: Donation handling remains unchanged, but the requested external-donation behaviour is now reflected in the audited release record.

### Version decision

- Previous version: v0.3.0
- New version: v0.3.1
- Version type: Stable patch release
- Reason for version bump: This is a low-risk user-visible interaction fix on an existing donate-page call to action and does not add a new page, route, or workflow.

### Validation

- Checks run: Reviewed the updated donate button markup and synchronised `v0.3.1` release records by code inspection. No local `php` CLI binary was available in this environment for automated `php -l` checks.
- Manual checks completed: Confirmed the donate button now uses inline popup-window behaviour while retaining the existing Donorbox link destination and button content in the template source.
- Known limitations: Live browser verification was not available in this environment, so the final popup behaviour still needs a manual browser pass to confirm popup blockers and window sizing behave as expected on the live site.
- Rollback notes: Revert the donate button click handler, VERSION file, and both changelog entries to restore the previous v0.3.0 donate-button behaviour.

## [v0.3.0] - 2026-06-02

<span class="pill pill-version">Version v0.3.0</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Added</span>
<span class="pill pill-type">Changed</span>

### Summary

Expanded the public donate page so supporters can now see how to donate practical supplies such as blankets, paper towels, and tea towels, while also getting a clearer funds donation route through a new Donorbox card.

### Detailed changes

- Rebuilt the `/donate/` page content into a clearer support journey with separate sections for donating useful supplies and donating funds.
- Added public guidance explaining that supporters can donate clean blankets, paper towels, tea towels, and other practical items that help with hygiene, comfort, feeding, and day-to-day welfare support.
- Added a new funds donation card using the supplied Donorbox button so visitors can donate directly to support the area of greatest need.
- Added lightweight illustrated donation panels and supporting visual styling to make the donate page feel more engaging without relying on extra external image assets.
- Added clearer drop-off and contact guidance so supporters know to check what is most useful before bringing larger or specialist items to the clinic.
- Updated the canonical VERSION file plus both changelog records so the release is synchronised under the new v0.3.0 stable minor entry.

### Type pills

- <span class="pill pill-type">Added</span> Introduced a new public supply-donation section, a new funds support card, and new illustrated content blocks on the donate page.
- <span class="pill pill-type">Changed</span> Reworked the donate page layout and copy so the donation journey is clearer for supporters and easier to act on.

### Fix pills

- None. This release adds and expands public donation content rather than correcting an existing defect.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: `/donate/` and `/changelog/`.
- Files changed: `donate/index.php`, `assets/css/styles.css`, `VERSION`, `CHANGELOG.md`, and `changelog/index.php`.
- User groups affected: Public visitors, donors, volunteers, low-income pet owners, and staff coordinating incoming donations.
- Public impact: Visitors can now understand how to donate useful supplies as well as how to donate funds to help support clinic work.
- Internal impact: Donation guidance is now clearer and easier for staff to reference when supporters ask what items are helpful.

### Version decision

- Previous version: v0.2.0
- New version: v0.3.0
- Version type: Stable minor release
- Reason for version bump: This release adds new public-facing donation content, a new direct funds support route, and a materially expanded donate-page journey without changing the website structure.

### Validation

- Checks run: Reviewed the updated donate template, new CSS selectors, supplied Donorbox link markup, and synchronised `v0.3.0` release records by code inspection. No local PHP CLI binary was available in this environment for automated `php -l` checks.
- Manual checks completed: Confirmed the donate page now includes supply-donation guidance, the supplied Donorbox button, contact and drop-off instructions, and new illustrated content blocks in the source templates.
- Known limitations: Live browser verification was not available in this environment, so the final rendered spacing, SVG illustration appearance, and external Donorbox button behaviour should still receive a manual browser pass on staging or production.
- Rollback notes: Revert the donate page template, donate-page stylesheet changes, VERSION file, and both changelog entries to restore the previous v0.2.0 donate-page presentation.

## [v0.2.0] - 2026-06-02

<span class="pill pill-version">Version v0.2.0</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Added</span>
<span class="pill pill-type">Changed</span>

### Summary

Added the Hello Bar script globally in the shared header and reviewed the website's shared notification integrations so the current OneSignal setup remains aligned with the requested global implementation.

### Detailed changes

- Added the supplied Hello Bar integration script to the shared header so it loads asynchronously across the public website before the closing `</head>` tag.
- Reviewed the existing OneSignal Web SDK initialisation in the shared header and confirmed it still uses the requested app ID `1526fa8e-132a-46ff-90b2-94386a285bde`.
- Reviewed the shared footer and confirmed the existing `<div class='onesignal-customlink-container'></div>` remains present once globally for the OneSignal custom link container.
- Searched the repository to confirm there is only one Hello Bar loader, one OneSignal SDK and init block, and one OneSignal custom link container in the live shared templates.
- Updated the canonical VERSION file plus both changelog records so the release is synchronised under the new v0.2.0 stable minor entry.

### Type pills

- <span class="pill pill-type">Added</span> Introduced a new shared Hello Bar integration across public website routes.
- <span class="pill pill-type">Changed</span> Reviewed and documented the shared notification integration baseline so Hello Bar and OneSignal are tracked together in the current release record.

### Fix pills

- None. OneSignal already satisfied the requested global header and footer implementation, so no corrective code change was required during this release.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Shared global header and footer integrations across all public routes, plus `/changelog/`.
- Files changed: `includes/header.php`, `VERSION`, `CHANGELOG.md`, and `changelog/index.php`.
- User groups affected: Public visitors, service users, donors, volunteers, and staff monitoring notification-driven engagement on the website.
- Public impact: Visitors can now receive the Hello Bar experience globally while the existing OneSignal custom link implementation remains in place.
- Internal impact: Shared notification integrations are now release-tracked together under one audited version entry.

### Version decision

- Previous version: v0.1.1
- New version: v0.2.0
- Version type: Stable minor release
- Reason for version bump: This release adds a new public-facing global integration across the website without restructuring existing routes or replacing the current OneSignal setup.

### Validation

- Checks run: Searched the codebase for Hello Bar and OneSignal references to confirm one global Hello Bar script include, one OneSignal SDK and init block, one OneSignal custom link container, and synchronised `v0.2.0` release records. No local PHP CLI binary was available in this environment for automated `php -l` checks.
- Manual checks completed: Reviewed the shared header and footer templates by code inspection to confirm the Hello Bar script remains asynchronous, the OneSignal app ID matches the issue requirement, and the OneSignal custom link container remains globally present.
- Known limitations: Live browser verification was not available in this environment, so Hello Bar rendering, OneSignal prompt behaviour, and any console output still need a manual pass on staging or production.
- Rollback notes: Remove the Hello Bar script from the shared header and revert the VERSION file plus both changelog entries to restore the previous v0.1.1 release state.

## [v0.1.1] - 2026-06-02

<span class="pill pill-version">Version v0.1.1</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-fix">Integration Fix</span>
<span class="pill pill-fix">Content Fix</span>

### Summary

Updated the global Chatwoot live chat integration to use the supplied website token and launcher configuration so the website shows the new right-hand expanded support bubble consistently.

### Detailed changes

- Replaced the existing global Chatwoot launcher settings in the shared header so the launcher now uses the requested right-hand placement, expanded bubble type, and `Speak with an advisor` title across the website.
- Updated the Chatwoot website token in the shared SDK bootstrap while keeping the existing APES workspace base URL and asynchronous SDK loading pattern.
- Confirmed the website still injects only one shared Chatwoot bootstrap script from the common header, avoiding duplicate launcher creation from legacy configuration.
- Updated the canonical VERSION file plus both changelog records so the release is synchronised under the new v0.1.1 stable patch entry.

### Type pills

- <span class="pill pill-type">Changed</span> Updated the shared live chat configuration used across public website pages.
- <span class="pill pill-type">Fixed</span> Corrected the launcher behaviour and account connection details so the website points at the supplied Chatwoot workspace and presents the requested copy.

### Fix pills

- <span class="pill pill-fix">Integration Fix</span> The shared Chatwoot SDK bootstrap now uses the supplied website token and launcher settings without duplicating the script.
- <span class="pill pill-fix">Content Fix</span> The live chat launcher title now reads `Speak with an advisor` instead of the previous incorrect wording.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Shared global header integration across all public routes, plus `/changelog/`.
- Files changed: `includes/header.php`, `VERSION`, `CHANGELOG.md`, and `changelog/index.php`.
- User groups affected: Public visitors, service users, donors, volunteers, and staff responding to incoming live chat enquiries.
- Public impact: Visitors should now see the requested Chatwoot launcher title and expanded bubble on the right-hand side of the website.
- Internal impact: Live chat messages should route through the supplied Chatwoot website token without relying on the retired launcher configuration.

### Version decision

- Previous version: v0.1.0
- New version: v0.1.1
- Version type: Stable patch release
- Reason for version bump: This is a low-risk public-facing integration correction to an existing global script and does not add a new website section or workflow.

### Validation

- Checks run: Searched the codebase for Chatwoot references to confirm the shared header is the single launcher source and reviewed the updated token, base URL, async SDK load, and launcher settings by code inspection. No local PHP CLI binary was available in this environment for automated `php -l` checks.
- Manual checks completed: Confirmed the shared runtime script now matches the supplied `position`, `type`, `launcherTitle`, `baseUrl`, and `websiteToken` values and that the live PHP source no longer references the retired Chatwoot token.
- Known limitations: Live browser verification on the rendered site was not available in this environment, so the final launcher appearance and console state still need a manual browser check on live or staging. Historical `crawl/` snapshot artifacts still contain the previous token string and were left untouched because they are generated records rather than the live source template.
- Rollback notes: Revert the shared header Chatwoot snippet, VERSION file, and both changelog entries to restore the previous v0.1.0 live chat configuration.

## [v0.1.0] - 2026-06-02

<span class="pill pill-version">Version v0.1.0</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Added</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-fix">Content Fix</span>
<span class="pill pill-fix">Integration Fix</span>

### Summary

Added a shared Stripe pre-pay service catalogue and surfaced the new pre-pay and book flow across the clinic services landing page plus the relevant species and general service detail pages.

### Detailed changes

- Added a shared structured pre-pay service catalogue for all 16 hosted Stripe payment-link services so pricing, descriptions, categories, routes, and accessible CTA labels are maintained in one reusable source.
- Added a new `Pre-pay and book your Pet Care Clinic appointment` section to the main clinic services landing page so visitors can browse every eligible pre-pay service in grouped categories before leaving for Stripe.
- Updated the general services, reptile care, invert care, dog care, cat care, rabbit care, guinea pig care, and ferret care pages with contextual pre-pay CTAs that match the services already described on those routes.
- Updated relevant service copy on detail pages where needed so the displayed pre-pay options align with the exact hosted Stripe service names and prices, including combined admittance packages and the rabbit and guinea pig spot-on treatment.
- Added reusable styling for the new service cards, compact CTA rows, focus states, and green-theme payment blocks while keeping payment handling fully external to Stripe hosted links.
- Updated the canonical VERSION file plus both changelog records so the release is synchronised under the new v0.1.0 stable minor entry.

### Type pills

- <span class="pill pill-type">Added</span> Introduced a shared pre-pay service catalogue and a new full landing-page payment section for clinic services.
- <span class="pill pill-type">Changed</span> Updated multiple clinic service detail pages to surface contextual Stripe pre-pay CTAs and aligned pricing copy.
- <span class="pill pill-type">Fixed</span> Corrected the public booking journey so customers can pay for supported services before following the booking instructions shown after payment.

### Fix pills

- <span class="pill pill-fix">Content Fix</span> Service pages now show exact pre-pay service names, prices, and booking guidance for supported Stripe-linked offers.
- <span class="pill pill-fix">Integration Fix</span> Hosted Stripe payment links are now surfaced directly from the relevant clinic service routes without introducing custom payment logic.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: `/`, `/general-services/`, `/dog-care/`, `/cat-care/`, `/reptile-care/`, `/invert-care/`, `/rabbit-care/`, `/guinea-care/`, `/ferret-care/`, and `/changelog/`.
- Files changed: `includes/prepay-services.php`, `includes/page-init.php`, `assets/css/styles.css`, `index.php`, `general-services/index.php`, `dog-care/index.php`, `cat-care/index.php`, `reptile-care/index.php`, `invert-care/index.php`, `rabbit-care/index.php`, `guinea-care/index.php`, `ferret-care/index.php`, `VERSION`, `CHANGELOG.md`, and `changelog/index.php`.
- User groups affected: Public visitors, service users, low-income pet owners, volunteers helping with bookings, and staff supporting appointment triage.
- Public impact: Visitors can now review supported clinic services, pre-pay securely through Stripe, and then complete booking using the instructions provided after payment.
- Internal impact: Stripe-linked clinic services now use one reusable data source, making future route, price, and accessibility updates easier to maintain.

### Version decision

- Previous version: v0.0.3
- New version: v0.1.0
- Version type: Stable minor release
- Reason for version bump: This adds a new public-facing payment-first booking workflow and reusable structured service content across multiple clinic routes without changing the hosted Stripe-only payment model.

### Validation

- Checks run: Reviewed the shared service catalogue, route mappings, Stripe link targets, external-link attributes, and synchronised release records by code inspection. No local PHP CLI binary was available in this environment for automated `php -l` checks.
- Manual checks completed: Verified that all 16 services appear in the landing-page pre-pay section, relevant detail pages now show contextual CTAs, accessible labels follow the required `Pre-pay and book: [service name]` format, and the payment-first booking note is present.
- Known limitations: Live browser and responsive rendering checks were not available in this environment, so a manual browser pass is still recommended for final spacing review on mobile and tablet layouts.
- Rollback notes: Revert the shared pre-pay catalogue include, updated page templates, stylesheet changes, VERSION file, and both changelog entries to restore the previous v0.0.3 booking presentation.

## [v0.0.3] - 2026-06-02

<span class="pill pill-version">Version v0.0.3</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-fix">Navigation Fix</span>
<span class="pill pill-fix">Content Fix</span>

### Summary

Reordered the main website navigation to prioritise Services and Information, moved About Us into the Information mega menu, and added descriptive supporting copy to every mega-menu item.

### Detailed changes

- Reordered the shared top-level header navigation to Home, Services, Information, Bookings, Donate, and Contact so the primary public journey matches the requested sequence.
- Removed About Us as a standalone top-level link and added it to the Information mega menu without changing the /about-us/ route.
- Added short descriptive summaries to every item inside the Services and Information mega menus so visitors can understand destination purpose before clicking.
- Updated shared menu rendering so each mega-menu card now presents a title and description while preserving external-link handling for the News destination.
- Expanded Information menu active-state handling so the group stays highlighted on About Us, Events, policy pages, and the Change Log Hub.
- Updated the canonical VERSION file plus both changelog records so the release remains synchronised under the new v0.0.3 stable patch entry.

### Type pills

- <span class="pill pill-type">Changed</span> Reordered the shared header navigation and enriched mega-menu card content with supporting descriptions.
- <span class="pill pill-type">Fixed</span> Corrected the information architecture so About Us now sits inside the Information menu and menu intent is clearer to visitors.

### Fix pills

- <span class="pill pill-fix">Navigation Fix</span> The main navigation now follows the requested six-item order and keeps related informational routes grouped together.
- <span class="pill pill-fix">Content Fix</span> Mega-menu items now explain their destination purpose with concise descriptive copy.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Shared header navigation, /about-us/, /events/, /policies/*, /changelog/, /bookings/, /donate/, and /contact/.
- Files changed: includes/page-init.php, includes/header.php, assets/css/styles.css, changelog/index.php, VERSION, CHANGELOG.md.
- User groups affected: Public visitors, donors, service users, volunteers, and staff sharing key website routes.
- Public impact: Visitors see the requested navigation order and clearer mega-menu destination descriptions across desktop and mobile navigation.
- Internal impact: Shared menu data now carries reusable descriptions for future navigation maintenance and release auditing.

### Version decision

- Previous version: v0.0.2
- New version: v0.0.3
- Version type: Stable patch release
- Reason for version bump: This is a low-risk public navigation and content clarification update that improves an existing user journey without changing routes or introducing a new workflow.

### Validation

- Checks run: Reviewed shared menu data, header rendering, and synchronized release records by diff inspection. No local PHP CLI binary was available for automated linting in this environment.
- Manual checks completed: Verified the intended top-level menu order, About Us placement within Information, active-state grouping, external News link handling, and the presence of descriptions for every Services and Information mega-menu item.
- Known limitations: Visual behaviour was reviewed statically in code only, so a live browser pass may still be helpful for final spacing confirmation on small screens.
- Rollback notes: Revert the shared navigation arrays, header markup, mega-menu card styling, VERSION, and both changelog entries to restore the previous top-level About Us link and earlier menu presentation.

## [v0.0.2] - 2026-06-02

<span class="pill pill-version">Version v0.0.2</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-compliance">Compliance</span>
<span class="pill pill-fix">Navigation Fix</span>
<span class="pill pill-fix">Content Fix</span>

### Summary

Standardised every public reference to the Change Log Hub and rebuilt the /changelog/ page so it follows the APES CIC searchable release-record pattern.

### Detailed changes

- Updated shared Information navigation and footer references so the website consistently labels the release record as Change Log Hub.
- Kept the existing /changelog/ route as the canonical public URL while rebuilding its page content into a dedicated Change Log Hub with current-version status pills.
- Added searchable, filterable timeline controls plus expand-all and collapse-all actions for release entries, while keeping all entries readable when JavaScript is unavailable.
- Converted release entries into accessible collapsible cards with clearer audit sections for summary, detailed changes, affected areas, version decisions, validation, and rollback notes.
- Revised existing release copy so the website Change Log Hub page, root CHANGELOG.md, and VERSION file all remain aligned under the same APES CIC naming and governance standard.

### Type pills

- <span class="pill pill-type">Changed</span> Updated shared navigation labels, footer links, page metadata, and release record presentation.
- <span class="pill pill-type">Fixed</span> Corrected inconsistent public naming so the website now uses Change Log Hub throughout visible release references.
- <span class="pill pill-compliance">Compliance</span> Brought the website release record into line with the APES CIC Change Log Hub structure, visibility, and audit-detail requirements.

### Fix pills

- <span class="pill pill-fix">Navigation Fix</span> The Information menu and footer now point to the release record using the required Change Log Hub label.
- <span class="pill pill-fix">Content Fix</span> Release record wording, metadata, and historical entries now use consistent Change Log Hub naming.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Shared header and footer, plus /changelog/.
- Files changed: includes/page-init.php, includes/header.php, includes/footer.php, assets/css/styles.css, assets/js/site.js, changelog/index.php, VERSION, CHANGELOG.md.
- User groups affected: Public visitors, donors, service users, volunteers, staff, directors, and future website maintainers.
- Public impact: Visitors can now find and understand the Change Log Hub more easily from shared navigation and footer routes.
- Internal impact: Website release records are now easier to audit, search, filter, and maintain against APES CIC governance requirements.

### Version decision

- Previous version: v0.0.1
- New version: v0.0.2
- Version type: Stable patch release
- Reason for version bump: This update improves existing release-record naming, visibility, and structure without changing the route set or adding a new user workflow.

### Validation

- Checks run: Ran a reference sweep for visible Change Log Hub labels plus a Git diff review of shared templates, styles, scripts, and release-record files. PHP lint could not be run because no local PHP CLI binary is available in this environment.
- Manual checks completed: Reviewed Information menu wording, footer Change Log Hub link, current-version display, filter controls, and details-card behaviour with and without JavaScript support.
- Known limitations: Search, filters, and expand or collapse controls rely on JavaScript, but all release content remains visible and individually expandable without it.
- Rollback notes: Revert the shared navigation labels, footer Change Log Hub link, Change Log Hub page structure, VERSION, and synchronized changelog entry to restore the previous release-record presentation.

## [v0.0.1] - 2026-06-02

<span class="pill pill-version">Version v0.0.1</span>
<span class="pill pill-status">Stable</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-type">Fixed</span>
<span class="pill pill-compliance">Compliance</span>
<span class="pill pill-fix">Navigation Fix</span>
<span class="pill pill-fix">Content Fix</span>

### Summary

Reorganised the public website navigation by moving informational links into a new Information mega menu, while also bringing the Change Log Hub and version records into alignment with APES CIC website governance requirements.

### Detailed changes

- Replaced separate top-level Events, News, Change Log Hub, and Policies navigation items with a shared Information mega menu in the global header. This was a public-facing navigation change affecting the main user journey across the website.
- Added Events, external News, all policy routes, and the Change Log Hub to the new Information mega menu so informational and governance content is grouped consistently.
- Kept Bookings, Donate, About Us, and Contact as top-level items so service and action-led journeys remain easy to reach.
- Updated shared navigation state handling so Events, policy pages, and the Change Log Hub correctly highlight the Information menu when visited. This improved navigation clarity and accessibility orientation.
- Created a root-level VERSION file and updated both the root-level CHANGELOG.md and website Change Log Hub page so all release records used the same version number, release date, and audit details.
- Normalised the historic release notes to preserve useful website rebuild history while removing unsupported legacy version suffix usage.

### Type pills

- <span class="pill pill-type">Changed</span> Reworked the shared header navigation and grouped informational pages under the Information menu.
- <span class="pill pill-type">Fixed</span> Aligned website and repository release records under one versioning and audit structure.
- <span class="pill pill-compliance">Compliance</span> Established the initial APES CIC governance-aligned Change Log Hub and repository release audit pairing.

### Fix pills

- <span class="pill pill-fix">Navigation Fix</span> Information links were grouped under one menu for clearer discovery.
- <span class="pill pill-fix">Content Fix</span> Change Log Hub records began following the required APES CIC versioning and audit format.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Global header navigation, /events/, /policies/*, /changelog/, and external News link access.
- Files changed: includes/page-init.php, includes/header.php, assets/css/styles.css, changelog/index.php, VERSION, CHANGELOG.md.
- User groups affected: Public visitors, donors, service users, volunteers, and staff sharing policy or update links.
- Public impact: Informational pages were grouped into a single mega menu for easier browsing.
- Internal impact: Release records were synchronised for future website maintenance and governance review.

### Version decision

- Previous version: v0.0.0b
- New version: v0.0.1
- Version type: Stable patch release
- Reason for version bump: The change updated an existing navigation pattern and release record structure without changing routes or introducing a new workflow.

### Validation

- Checks run: PHP lint on updated PHP files.
- Manual checks completed: Reviewed the Information mega menu structure for desktop and mobile behaviour, active menu highlighting, and footer version source alignment.
- Known limitations: External News behaviour still depends on the availability of the separate APES News website.
- Rollback notes: Revert the shared header and menu arrays to restore separate top-level Events, News, Change Log Hub, and Policies links, and reset VERSION plus changelog records to the previous release entry.

## [v0.0.0b] - 2026-05-31

<span class="pill pill-version">Version v0.0.0b</span>
<span class="pill pill-status">Beta</span>
<span class="pill pill-type">Added</span>
<span class="pill pill-type">Changed</span>
<span class="pill pill-fix">Content Fix</span>
<span class="pill pill-fix">Integration Fix</span>

### Summary

Recorded the beta rebuild baseline for the restored APES Pet Care Clinic website and preserved the initial shared layout, route, and integration work as the historic starting point for subsequent stable releases.

### Detailed changes

- Rebuilt live routes to shared PHP layouts using reusable header and footer includes. This was a public-facing structural website change.
- Added the initial Services mega menu and reorganised the main navigation around shared templates.
- Updated the bookings experience with an embedded booking form and site-wide external booking calls to action.
- Added the first website Change Log Hub page and global footer version display during the beta rebuild stage.
- Integrated Chatwoot live chat, OneSignal push messaging, and legacy News redirect handling as operational website integrations.
- Normalised this historic entry from earlier legacy notes that used an unsupported suffix, preserving the baseline history in the approved beta version format.

### Type pills

- <span class="pill pill-type">Added</span> Introduced shared layouts, the first Change Log Hub route, and major route scaffolding.
- <span class="pill pill-type">Changed</span> Updated navigation, copy, service wording, and booking journey content during the rebuild baseline.

### Fix pills

- <span class="pill pill-fix">Content Fix</span> Corrected species wording and clarified clinic scope messaging.
- <span class="pill pill-fix">Integration Fix</span> Updated News links and added redirect handling for legacy News routes.

### Affected areas

- Website: APES Pet Care Clinic public website.
- Page or route: Shared layouts, core service pages, bookings, contact actions, news handling, and the Change Log Hub route.
- Files changed: Historic rebuild baseline across shared templates, service routes, booking route, and integration scripts.
- User groups affected: Public visitors, booking users, donors, and staff maintaining the restored website.
- Public impact: Restored and standardised the public-facing website structure after content reconstruction.
- Internal impact: Established the template and integration baseline used by later releases.

### Version decision

- Previous version: No canonical version file was recorded.
- New version: v0.0.0b
- Version type: Beta baseline release
- Reason for version bump: The restored website was not final and acted as the beta foundation for later public refinements.

### Validation

- Checks run: Historic validation was not fully recorded in the legacy notes.
- Manual checks completed: Legacy navigation, route, and service content review was performed during the rebuild stage.
- Known limitations: Historic detail has been preserved from available release notes and may not reflect every rebuild-era file touched.
- Rollback notes: Restore the pre-rebuild exported site snapshot if the rebuilt shared-template version needs to be withdrawn.



