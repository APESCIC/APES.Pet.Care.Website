# Local Preview

This repository is an HTML website with PHP support tools. Public pages are static HTML under `public/`. Laravel Herd serves `public/` locally. Herd runs nginx, which ignores `.htaccess`, so `LocalValetDriver.php` in the repository root applies the same `public/.htaccess` rules as Cloudron's Apache: redirects, blocked maintenance folders such as `public/crawl/`, and the branded 403, 404 and 500 pages behave as they do live. The driver and `dev/herd-router.php` sit outside `public/` and are never deployed.

The runtime routes are the generated HTML files under `public/`. Source fragments under `public/includes/` are blocked from public serving and must be synced into the runtime pages before preview if they are edited.

## Set up once

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\herd-setup.ps1
```

It links this clone in Herd as `http://apes-pet-care-website.test`, isolated to PHP 8.4 as on Cloudron. See `docs/herd/profile.md`.

## Preview

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\preview.ps1
```

It pulls the latest changes, checks the site serves this checkout and starts Browsersync with Herd's Node 22. Open:

```text
http://localhost:3103/
```

Browsersync proxies `http://apes-pet-care-website.test` and reloads the page when anything under `public/` changes.

## Validation

Run these with Herd first on `PATH`. `php84` is Herd's PHP 8.4, as on Cloudron; plain `php` is Herd's global 8.5, and `herd php` always exits 0, which hides failures:

```powershell
php84 scripts/check-site.php
php84 -l dev/sync-site-chrome.php
php84 dev/sync-site-chrome.php
php84 dev/sync-site-chrome.php --check
sh dev/check-public-root.sh
BASE_URL=http://apes-pet-care-website.test sh dev/smoke-test.sh
npx eslint .
```

Keep `public/` as the web root. Do not add `public/index.php` unless a future approved task changes the architecture.
