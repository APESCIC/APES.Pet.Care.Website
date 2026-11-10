# Local Preview

This repository is an HTML website with PHP support tools. Public pages are static HTML under `public/`. Laragon is the only supported local set-up: its Apache serves `public/` with the same `.htaccess` rules as Cloudron, so redirects, blocked maintenance folders such as `public/crawl/`, and the branded 403, 404 and 500 pages behave as they do live.

The runtime routes are the generated HTML files under `public/`. Source fragments under `public/includes/` are blocked from public serving and must be synced into the runtime pages before preview if they are edited.

## Set up once

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\laragon-setup.ps1
```

It links `C:\laragon\www\apes-pet-care-website` to this clone, so Laragon serves `http://apes-pet-care-website.test`. See `docs/laragon/profile.md`.

## Preview

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\preview.ps1
```

It pulls the latest changes, checks the site serves this checkout and starts Browsersync. Open:

```text
http://localhost:3103/
```

Browsersync proxies `http://apes-pet-care-website.test` and reloads the page when anything under `public/` changes.

## Validation

Run these with Laragon's PHP 8.4 on `PATH`:

```powershell
php scripts/check-site.php
php -l dev/sync-site-chrome.php
php dev/sync-site-chrome.php
php dev/sync-site-chrome.php --check
sh dev/check-public-root.sh
BASE_URL=http://apes-pet-care-website.test sh dev/smoke-test.sh
npx eslint .
```

Keep `public/` as the web root. Do not add `public/index.php` unless a future approved task changes the architecture.
