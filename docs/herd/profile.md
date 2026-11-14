# Herd profile

This website is served locally by Laravel Herd. The values below are in `profile.json`, which `scripts/herd-setup.ps1` reads; `scripts/preview.ps1` repeats the ones it needs.

| Item | Value |
| --- | --- |
| Site | `http://apes-pet-care-website.test`, from `herd link apes-pet-care-website` run in this clone |
| Document root | `public/`, as on Cloudron (Herd serves `public/` when the linked folder has one) |
| Web server | Herd's nginx on port 80, with `LocalValetDriver.php` applying `public/.htaccess` |
| PHP | Herd's PHP 8.4 through PHP-FPM, isolated to this site with `herd isolate 8.4` (Cloudron runs 8.4; Herd's global default is 8.5). Only `.php` files go through PHP |
| Database | None. There is no demo seeder, because the site stores no records |
| Live reload | Browsersync on `http://localhost:3103` (UI on 3113), proxying `http://apes-pet-care-website.test` and reloading on any change under `public/` |
| Node | Herd's Node 22 (`%USERPROFILE%\.config\herd\bin\nvm\v22.*`), for Browsersync only. Herd's default Node is newer, so the scripts put 22 first on `PATH`. The deployed site needs no Node |

## Why a local driver

Cloudron's LAMP app runs Apache, which reads `public/.htaccess`. Herd runs nginx, which does not, and its default static driver answers every missing path with the home page. `LocalValetDriver.php` in the repository root reads `public/.htaccess` on each request and applies `DirectoryIndex`, the trailing-slash redirect for folders, the `RewriteRule` redirects and `[F]` blocks with their `RewriteCond` lines, and the `ErrorDocument` pages. Plain files go straight back to nginx; redirects and error pages are sent by `dev/herd-router.php`. Both sit outside `public/`, so they are never deployed.

`Header` and `php_value` lines are not applied locally. Keep `php_value` inside `<IfModule php_module>` for Cloudron, and put any local equivalent in `public/.user.ini`, which PHP-FPM reads.

## Set up

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\herd-setup.ps1
```

It is safe to run twice and only touches this project: it links the clone, isolates PHP 8.4, runs `npm ci` if `node_modules/` is missing, checks the site serves this clone and checks `/crawl/` is blocked (proof the driver is in use).

## Daily loop

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\preview.ps1
```

It pulls the latest changes, checks `http://apes-pet-care-website.test/VERSION` matches this checkout and starts Browsersync. Open `http://localhost:3103`.

## Gotchas

- Put Herd first on `PATH` in agent shells: `$env:Path = "$env:USERPROFILE\.config\herd\bin;" + (Get-ChildItem "$env:USERPROFILE\.config\herd\bin\nvm" -Directory -Filter 'v22.*' | Sort-Object Name -Descending | Select-Object -First 1).FullName + ";$env:Path"`. Run PHP with `php84`: plain `php` is Herd's global 8.5, and `herd php` uses 8.4 but always exits 0, which hides failed checks.
- After editing `LocalValetDriver.php`, Herd picks it up on the next request; if not, run `herd restart`.
- The legacy `Care%20Plans` and `APES%20Lab%20Services` redirects in `public/.htaccess` don't fire on Cloudron or locally, because Apache matches rules against the decoded path.
