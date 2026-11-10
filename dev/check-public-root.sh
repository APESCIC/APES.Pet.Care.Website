#!/usr/bin/env sh
set -eu

fail() {
  printf '%s\n' "public-root check failed: $1" >&2
  exit 1
}

[ -d public ] || fail "missing public/ web root"
[ -f public/index.html ] || fail "missing public/index.html entrypoint"
[ ! -f public/index.php ] || fail "public/index.php must not be introduced for this HTML-first site"
[ -f public/.htaccess ] || fail "missing public/.htaccess"
[ -f public/robots.txt ] || fail "missing public/robots.txt"
[ -f public/sitemap.xml ] || fail "missing public/sitemap.xml"
[ -f public/403.html ] || fail "missing public/403.html"
[ -f public/404.html ] || fail "missing public/404.html"
[ -f public/500.html ] || fail "missing public/500.html"

for path in index.html 403.html 404.html 500.html robots.txt sitemap.xml site.webmanifest; do
  [ ! -e "$path" ] || fail "browser-served root-level file should live in public/: $path"
done

[ ! -d public/public ] || fail "nested public/public/ folder is not allowed"

printf '%s\n' "public-root check passed"
