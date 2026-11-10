#!/usr/bin/env sh
set -eu

BASE_URL="${BASE_URL:-http://apes-pet-care-website.test}"

fetch_status() {
  url="$1"

  if command -v curl >/dev/null 2>&1; then
    curl -L -s -o /dev/null -w '%{http_code}' "$url"
    return
  fi

  if command -v wget >/dev/null 2>&1; then
    wget -q --server-response --spider "$url" 2>&1 | awk '/HTTP\// { code=$2 } END { print code }'
    return
  fi

  printf '%s\n' "curl or wget is required for smoke tests" >&2
  exit 2
}

assert_status() {
  path="$1"
  expected="$2"
  status="$(fetch_status "${BASE_URL}${path}")"

  if [ "$status" != "$expected" ]; then
    printf '%s\n' "smoke test failed: ${path} returned ${status}, expected ${expected}" >&2
    exit 1
  fi

  printf '%s\n' "ok ${expected} ${path}"
}

assert_status "/" "200"
assert_status "/index.html" "200"
assert_status "/robots.txt" "200"
assert_status "/sitemap.xml" "200"
assert_status "/changelog/" "200"
assert_status "/403.html" "200"
assert_status "/404.html" "200"
assert_status "/500.html" "200"
assert_status "/crawl/" "403"
assert_status "/missing-smoke-test-route/" "404"

printf '%s\n' "smoke tests passed against ${BASE_URL}"
