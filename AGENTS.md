# Agent instructions for APES Pet Care Website

Cursor's user rules and skills set how work is done here (branches, issues, pull requests, merge, release, deploy, ship gate, decisions and safety). This file describes this repository and fills the named slots below. If anything here disagrees with them, Cursor's rules win and this file is corrected in the same milestone.

The owner is Bambie Murphy, Director. Write UK English (organisation, behaviour, colour, licence) in the site, docs, issues and pull requests. Never print, paste or commit secrets. This repository's shipping details are in [`.cursor/rules/version-shipping.mdc`](.cursor/rules/version-shipping.mdc) and its preview slots in [`.cursor/rules/herd-local-dev.mdc`](.cursor/rules/herd-local-dev.mdc).

## About the app

APES Pet Care Website (`https://www.apespetcare.org.uk`) is the public website of APES Pet Care Clinic, maintained by the Association of Protecting Exotic Species CIC (APES CIC). It tells pet owners about the clinic's services, bookings, policies and donations.

- Repository: `APESCIC/APES.Pet.Care.Website`. Work only in this repository.

## Stack and architecture

- Static HTML, CSS and browser JavaScript served from `public/`, the web root. No build step, no database, no runtime server code.
- Apache rules in `public/.htaccess` handle redirects, blocked folders (`includes/`, `crawl/`) and the branded 403, 404 and 500 pages on Cloudron.
- The shared header and footer live in `public/includes/*.html` and are synced into every page by `dev/sync-site-chrome.php`.
- PHP 8.4 is used only for the maintenance tools in `dev/` and `scripts/` and for the local Herd driver (`LocalValetDriver.php`, `dev/herd-router.php`), none of which is deployed.

## Ground rules

- Never print, paste or commit passwords, secrets, tokens, keys, `.env` values or Cloudron credentials (including the app's `/app/data/credentials.txt`).
- Ask Bambie for every decision with AskQuestion: the best option first, ending in `(Recommended)`, with the reason in one line; a safe `Stop here` last; and the prompt ending "Or choose Other to type your own." Don't ask again about something a rule, the confirmed plan or an earlier answer settles.
- Work only in `APESCIC/APES.Pet.Care.Website`.
- Every Cloudron app is production. Read-only commands (status, logs) run freely. A deploy needs the ship-gate answer in the current chat. Any other change needs an AskQuestion answer with `Back up, then <change> (Recommended)` first. Don't change DNS or Cloudflare.
- Security checks use GitHub's free features only: Dependabot (into the `dependencies` branch), dependency review and CodeQL. Don't add paid or third-party scanners.

## Local development and preview

Laravel Herd serves the site locally. The preview gate steps are Cursor's `live-preview-gate` and `herd-local-preview` skills; this table fills their slots.

| Item | Value |
| --- | --- |
| Clone | `C:\Users\BambieMurphy\Documents\GitHub\APES.Pet.Care.Website` |
| Herd site | `apes-pet-care-website` (linked; PHP 8.4 isolated, as on Cloudron) |
| Preview URL | `http://apes-pet-care-website.test`; open Browsersync on `http://localhost:3103` in Cursor's browser |
| Preview command | `scripts\preview.ps1` (starts Browsersync with `npm run dev`) |
| HMR port | None; Browsersync live reload on 3103 (UI on 3113) |
| Env file | None |
| Database | None, so there is no demo seeder |
| Mail | None |
| Set up or repair | `scripts\herd-setup.ps1` |
| Profile | [docs/herd/profile.md](docs/herd/profile.md) |

- Herd runs nginx, which ignores `.htaccess`. `LocalValetDriver.php` in the repository root applies `public/.htaccess` locally (redirects, `[F]` blocks, error pages, folder slash redirects), so local routes behave as on Cloudron. `/crawl/` returning 403 proves it is in use.
- Browsersync needs Herd's Node 22 (`%USERPROFILE%\.config\herd\bin\nvm\v22.*`); Herd's default Node is newer. The scripts put 22 first on `PATH`.
- Run PHP commands with `php84` (Herd's PHP 8.4 shim). Plain `php` runs Herd's global 8.5 or whichever PHP comes first on the machine `PATH`, and `herd php` uses 8.4 but always exits 0, which hides failed checks.

## Tests and checks

| Check | Command |
| --- | --- |
| Site checks | `php84 scripts/check-site.php` (CI runs it too) |
| PHP lint | `php84 -l <file>` (CI lints every tracked PHP file) |
| Site chrome in sync | `php84 dev/sync-site-chrome.php --check` |
| Public-root contract | `sh dev/check-public-root.sh` (Git Bash) |
| Route smoke test | `BASE_URL=http://apes-pet-care-website.test sh dev/smoke-test.sh` (Git Bash) |
| ESLint | `npx eslint .` (CI runs it too) |
| CI workflows | `.github/workflows/ci.yml`, `codeql.yml`, `dependency-review.yml`, `milestone-version-check.yml`, `release.yml` |

## Shipping and versioning

Work ships once per milestone, by the milestone's version, never by GitHub's milestone number: one `milestone/vX-Y-Z-<slug>` branch, one draft PR into `main`, one merge commit, one `vX.Y.Z` tag and Release, one deploy of that tag. The rule is [`version-shipping.mdc`](.cursor/rules/version-shipping.mdc); the skills are [`complete-next-version`](.cursor/skills/complete-next-version/SKILL.md) and [`release-version`](.cursor/skills/release-version/SKILL.md); the command is `/complete-next-version`.

- `php scripts/milestone-version next` prints the next milestone, its branch, PR title and Release title. `bump vX.Y.Z` sets `VERSION`, `public/VERSION` and every footer that repeats the version, once per milestone.
- **An issue is done** when its acceptance criteria are met and committed on the milestone branch. Post the Committed comment and leave it open; it closes when the milestone PR merges.
- **A milestone is done** only after the single merge, the release, a verified deploy (`https://www.apespetcare.org.uk/VERSION` shows the tag) and close-out.
- Hotfixes only with Bambie's AskQuestion approval, recorded on the issue (see the rule).

### Milestone shipping

1. Complete **all** the milestone's issues on its milestone branch.
2. One merge into `main`: a merge commit, never a squash or rebase.
3. One release: the `vX.Y.Z` tag on that merge commit and its GitHub Release.
4. One deploy of that tag.

Nothing reaches `main`, and nothing is tagged, released or deployed, before stage 2. A hotfix may skip these stages only with Bambie's written approval recorded on the issue.

## Issues

- Assignee `apescic-director`. Every issue has a milestone; ask before creating one.
- Title `[Type] Short title`, where the type is `Epic`, `Story`, `Task`, `Bug`, `Chore` or `Spike`.
- Post progress with the `github-closeout` scripts (`Add-IssueUpdate.ps1`): Started, Decision, Blocked, Split and Committed.

## Hosting

| Item | Value |
| --- | --- |
| App | Cloudron LAMP app `423d3af2-6b2b-4525-b4dd-eea7ae88b07f` |
| Domain | `https://www.apespetcare.org.uk` |
| Web root | `/app/data/public` (PHP 8.4, set by `/app/data/PHP_VERSION`) |
| Deploy | `deploy/cloudron/deploy.ps1 -Tag vX.Y.Z`: backup, upload the tag's `public/`, swap, check `/VERSION`, roll back on failure |

## Site specifics

- The shared header and footer live in `public/includes/*.html`. After changing one, run `php dev/sync-site-chrome.php`, then `php dev/sync-site-chrome.php --check`.
- Checks are listed under "Tests and checks" above.
- Change log entries (`CHANGELOG.md`, `public/CHANGELOG.md` and the `/changelog/` page) use this shape:

```markdown
## [X.Y.Z] - YYYY-MM-DD

<span class="pill pill-version">Version vX.Y.Z</span>
<span class="pill pill-type">Changed</span>

### Summary

Short plain-language description of the release.

### Detailed changes

- Specific content, route, styling, configuration or hosting changes.

### Affected areas

- Page or route, files changed, who is affected, public and internal impact.

### Validation

- Checks run, manual checks (routes, breakpoints, footer, sitemap, error pages), known limitations, rollback notes.
```

## Decisions and gotchas

- 2026-11-14: local development moved to Laravel Herd, decided by Bambie ([#50](https://github.com/APESCIC/APES.Pet.Care.Website/issues/50)); do not use Laragon for this repository.
- 2026-11-14: a local `LocalValetDriver.php` copies the `public/.htaccess` behaviour under Herd's nginx rather than accepting differences, decided by Bambie ([#50](https://github.com/APESCIC/APES.Pet.Care.Website/issues/50)).
- Gotcha: Apache matches `RewriteRule` patterns against the decoded path, so match a space in a legacy URL with `\s`, not `%20` ([#53](https://github.com/APESCIC/APES.Pet.Care.Website/issues/53)).
- Gotcha: `npm run dev` fails with `Cannot find module` after a dependencies merge until `npm ci` runs; `scripts\preview.ps1` does this when `package-lock.json` is newer than `node_modules`.

## Where to find things

- Local preview: [docs/local-preview.md](docs/local-preview.md) and [docs/herd/profile.md](docs/herd/profile.md).
- Release history: [CHANGELOG.md](CHANGELOG.md), [public/CHANGELOG.md](public/CHANGELOG.md) and the `/changelog/` page.
- Version tooling: `scripts/milestone-version` and [scripts/MilestoneVersion/fields.json](scripts/MilestoneVersion/fields.json).
- Contributing: [CONTRIBUTING.md](CONTRIBUTING.md); pull request checklist: [.github/pull_request_template.md](.github/pull_request_template.md).

# Website standards

The sections below are the APES CIC website standards. They apply to every change.

## Repository documentation, version, and release records

During planning for repository work, verify the repository documentation, version, and release state where files exist:

1. `README.md`.
2. Root `VERSION`.
3. `/public/VERSION`.
4. Root `CHANGELOG.md`.
5. `/public/CHANGELOG.md`.
6. Website Change Log Hub source page or data.
7. Release metadata files or generated output that render footer version text, public release cards, or static snapshots.
8. Hosting and local preview notes.
9. Repository specific documentation, generated output, package metadata, manifest, sitemap, index, configuration, or operational notes affected by the change.

Record the verified release state in the plan, issue update, or working notes:

1. Current version.
2. Beta or stable status.
3. Expected version bump type.
4. Required README updates.
5. Required changelog updates.
6. Required Change Log Hub updates.
7. Required generated output updates.
8. Hosting assumptions.
9. Local preview assumptions.
10. Selected website type.
11. Any mismatch or deferral.

Versions are `MAJOR.MINOR.PATCH`, taken from the milestone title and set once per milestone by `php scripts/milestone-version bump vX.Y.Z`. Beta status is carried by the milestone title (for example `v3.2.3 Beta: Repo standards`), not by a `b` suffix. Past change log entries keep the form they were written in.

Major changes are breaking route, architecture, public journey, data, compliance, platform, hosting, or operational changes.

Minor changes add user visible features, public routes, broad content expansions, shared components, or meaningful workflow additions.

Patch changes are fixes, copy edits, styling polish, metadata corrections, dependency or configuration fixes, hosting clarifications, local preview clarifications, generated output syncs, and small maintenance changes.

Do not update a version without a matching `## [X.Y.Z] - YYYY-MM-DD` change log entry in `CHANGELOG.md`, `public/CHANGELOG.md` and the Change Log Hub page.

## APES website public folder and website type rules

For applicable APES CIC website repositories, `public/` is the website folder and public web root.

When creating APES CIC websites, set them up as HTML websites by default unless the user selects another website type. Use `public/index.html`, static HTML, CSS, browser JavaScript, images, downloads, and other public assets served from `public/`, with PHP available where it supports the HTML site through local preview routing, form handling, reusable includes, lightweight server side helpers, search or sitemap helpers, maintenance scripts, or documented support tools.

Do not make PHP the primary website model unless the repository, issue, selected website type, or user explicitly requires a PHP backed feature.

Do not create WordPress style, CMS backed, custom database backed, or persistent runtime applications by default.

All browser served website files must live inside `public/`.

Do not use `content/` as the public web root. Do not scatter website files across the repository root. Do not create nested public folders such as `public/public/`.

For custom portal projects, prefer this structure when approved:

```text
/public
/public/portal
```

The public front end can sit in `/public`, and the portal can sit in `/public/portal`. Apache rewrite rules may serve the portal from a subdomain such as `portal.apes.org.uk` or another approved portal domain.

## Website type rules

When creating, merging, migrating, or refactoring a website, agents must confirm the selected website type and ensure the repository structure, language stack, routes, validation, documentation, and hosting notes comply with that setup.

Agents must not assume that every APES CIC website should be Laravel, WordPress, Node.js, or a full application. Match the implementation to the approved website type.

### Static websites

Good for simple public websites with pages such as:

1. Home.
2. About.
3. Contact.
4. Services.
5. Policies.
6. Terms.
7. Privacy.
8. Donation information.
9. Basic landing pages.

Languages used:

1. HTML.
2. CSS.
3. JavaScript.

This works well for brochure websites, public information websites, campaign pages, simple front ends, and content based public websites.

### PHP websites

Good for custom websites that need server side logic, such as:

1. Contact forms.
2. Login systems.
3. User dashboards.
4. Staff portals.
5. Public registration forms.
6. Admin panels.
7. Resource libraries.
8. Booking request forms.
9. Case tracking portals.
10. Internal tools.

Languages used:

1. PHP.
2. HTML.
3. CSS.
4. JavaScript.
5. SQL for MySQL queries.

This is the main intended use of the Cloudron LAMP app.

### MySQL database websites

The LAMP app includes MySQL access. Cloudron gives each app its own non root MySQL credentials, while the MySQL server itself is shared across Cloudron apps. MySQL credentials are exposed as environment variables and may rotate, so production code must use `getenv()` rather than hard coded credential values.

Good for:

1. User accounts.
2. Registrations.
3. Enquiries.
4. Form submissions.
5. Membership systems.
6. Ticket systems.
7. Basic CRM style tools.
8. Client portals.
9. Content management systems.
10. Animal records only where the approved project includes the required access control and data protection design.

Languages used:

1. PHP.
2. SQL.
3. JavaScript for front end interaction.

### Content management systems

Cloudron LAMP can host PHP based CMS platforms where their server requirements match the LAMP environment.

Examples include:

1. WordPress.
2. Joomla.
3. Drupal.
4. Grav.
5. ClassicPress.
6. ProcessWire.
7. October CMS.
8. Custom PHP CMS systems.

Cloudron has dedicated apps for some platforms. For something like WordPress, the dedicated Cloudron WordPress app may be easier and safer than the generic LAMP app.

### Custom portals

A Cloudron LAMP container is suitable for a custom portal such as:

1. Public front end website.
2. Login area.
3. Client portal.
4. Student portal.
5. Volunteer portal.
6. Staff tools area.
7. Admin dashboard.

For APES CIC style portal projects, this structure is preferred unless repository evidence or user instructions require another structure:

```text
/public
/public/portal
```

The public site can sit in `/public`, and the portal can sit in `/public/portal`, with Apache rewrite rules used to serve a subdomain such as `portal.apes.org.uk` or another approved portal domain.

For MyAPES Portal style projects, the usual LAMP compatible pattern is:

1. Public front end in HTML, CSS, and JavaScript.
2. Portal area in PHP.
3. MySQL for public registrations.
4. Cloudron LDAP for staff, volunteer, and student login where LDAP is available and approved.
5. Redis for cache, sessions, or rate limiting.
6. Cloudron email variables for sending messages.
7. Apache rewrite rules for clean URLs and subdomains.

### Small web applications

Good examples:

1. Appointment request system.
2. Public registration system.
3. Volunteer application form.
4. Donation tracking interface.
5. Simple support ticket tool.
6. Knowledgebase.
7. Document request portal.
8. Contact centre forms.
9. Internal reporting tool.

For heavier applications, a dedicated app container or custom Cloudron packaged app may be better.

## Cloudron LAMP compatibility rules

A Cloudron LAMP container is suitable for websites that run on:

```text
Linux
Apache
MySQL
PHP
```

Cloudron LAMP works like traditional shared hosting. Website files are served by Apache and PHP. Cloudron also handles DNS, SSL certificates, MySQL, Redis, email integration, backups, restore, updates, and app isolation for the LAMP app.

For APES CIC style projects, the safest Cloudron LAMP stack is:

```text
HTML
CSS
JavaScript
PHP 8.3 or PHP 8.4
MySQL
Redis
Apache .htaccess
```

Use PHP 8.3 or PHP 8.4 unless repository evidence or user approval requires another supported version.

Languages and formats suitable inside a LAMP container:

| Area | Languages and formats |
| --- | --- |
| Front end structure | HTML |
| Styling | CSS |
| Browser interaction | JavaScript |
| Server side logic | PHP |
| Database queries | SQL |
| Apache configuration | `.htaccess` rules |
| Configuration | `.ini`, `.env`, JSON |

Cloudron LAMP is a good fit for:

1. HTML, CSS, JavaScript, and PHP websites.
2. Custom PHP portals.
3. MySQL backed public registration systems.
4. Simple dashboards.
5. Contact forms and enquiry handling.
6. CMS websites where the server requirements fit.
7. Internal admin tools.
8. Small to medium web applications.
9. Websites needing SMTP email sending.
10. Websites needing Redis caching or sessions.

Cloudron LAMP is less suitable for:

1. Large Node.js applications.
2. Python Django or Flask applications.
3. Ruby, Go, Rust, Java, or .NET live server applications.
4. WebSocket heavy systems.
5. Heavy background workers.
6. Microservice architecture.
7. Large API platforms.
8. Applications needing root level server control.
9. High traffic transactional systems requiring horizontal scaling.
10. Sensitive case management, safeguarding, HR, finance, client record, or animal welfare record systems unless access control, audit logging, retention, backup, incident response, and UK GDPR controls are explicitly designed and approved.
11. Payment heavy systems, where hosted Stripe or payment provider flows are usually safer.

Tools such as Node.js may still be used locally for building CSS or JavaScript assets, but the deployed Cloudron LAMP app should normally serve the final built files through Apache and PHP.

For apps written in Node.js, Python, Ruby, Go, Rust, Java, or similar, the better route is usually a custom Cloudron app package. Cloudron apps are packaged as Docker images and can use platform addons where declared in `CloudronManifest.json`.

Required Cloudron LAMP checks before completion:

1. Browser served files live under `public/`.
2. The entry point is `public/index.html`, or `public/index.php` is justified by a documented PHP feature.
3. The selected website type is recorded.
4. `.htaccess` is present and Apache compatible where required.
5. Clean URLs work through Apache fallback rules or PHP routing.
6. No route requires a persistent Node, Python, Ruby, Go, Java, WebSocket, worker, scheduler, or daemon process unless approved.
7. Database use is PHP compatible and documented.
8. Cloudron environment variables are used for MySQL and email rather than hard coded credentials.
9. Forms, email, uploads, and third party integrations protect private configuration.
10. UK GDPR, consent, retention, security, and audit implications are noted for forms or stored personal data.
11. README, changelog, Change Log Hub, version records, generated output, and issue updates reflect the hosting impact.
12. Local preview remains aligned with Cloudron LAMP assumptions.
13. The changed pages have been checked in the Herd preview (`http://apes-pet-care-website.test`, or Browsersync on `http://localhost:3103`).
14. Direct `file:///` access has been checked for browser served static pages and public assets where applicable, or a justified server required blocker has been recorded.

## Security, safety, and UK GDPR rules

Do not edit private production configuration or unrelated environment files.

Do not deploy automatically.

Commit and push only on the milestone branch. Merge, tag, release and deploy only after the ship-gate answer (see `.cursor/rules/version-shipping.mdc`). Never rewrite history, force push, reset, rebase, stash or delete branches unless Bambie approves that exact action.


Never overwrite local user work. If uncommitted or unrelated changes exist, stop and explain the safest options.

Do not add temporary tools, dependencies, deployment scripts, extension recommendations, or workspace settings unless the user approves.

Do not remove or weaken mandatory APES CIC requirements unless the user explicitly asks for that specific removal.

Do not store secrets, database passwords, SMTP passwords, OAuth secrets, API keys, private keys, generated credential files, local database dumps, or private configuration in the repository.

For UK GDPR relevant work, identify and record where applicable:

1. Personal data being collected or processed.
2. Lawful basis.
3. Data minimisation.
4. Consent requirements.
5. Privacy notice impact.
6. Retention period.
7. Access control.
8. Audit logging.
9. Deletion and correction rights.
10. Incident response.
11. Security measures.
12. Processor or third party sharing implications.

Sensitive case management, safeguarding, HR, finance, client record, or animal welfare record systems require explicit access control, audit logging, retention, backup, incident response, and UK GDPR design before implementation.

## SEO, sitemap, footer, Newsroom, and error pages

Update SEO and sitemap records whenever public pages are added, removed, renamed, moved, or materially changed.

Check:

1. Page titles.
2. Meta descriptions.
3. Canonical URLs.
4. Open Graph metadata.
5. Structured data.
6. Robots rules.
7. Noindex rules.
8. Navigation.
9. Footer links.
10. Change Log Hub links.
11. Canonical URL consistency.
12. Sitemap entries.

Confirm the APES universal footer remains present, accurate, accessible, and consistent.

Confirm donation, Privacy Policy, Terms of Service, and Change Log Hub footer links where relevant.

Confirm APES Newsroom routing for news, updates, announcements, newsletters, footer, navigation, and article related changes.

Verify branded, accessible 404 pages and any supported 403, 500, offline, maintenance, or fallback pages.

Error pages must not expose stack traces, internal system details, private URLs, credentials, environment values, or debugging output.
