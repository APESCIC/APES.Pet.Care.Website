# Contributing to APES Pet Care Website

Thank you for helping. This page is the short version; the rules agents and people follow are in [`AGENTS.md`](AGENTS.md), [`.cursor/rules/version-shipping.mdc`](.cursor/rules/version-shipping.mdc) and [`.cursor/rules/herd-local-dev.mdc`](.cursor/rules/herd-local-dev.mdc).

## Local preview

Laravel Herd serves the site locally.

1. Run `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\herd-setup.ps1` once. It links your clone in Herd, isolated to PHP 8.4, so Herd serves `http://apes-pet-care-website.test` from `public/`. `LocalValetDriver.php` applies `public/.htaccess`, because Herd's nginx ignores it.
2. Before each change, run `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\preview.ps1`. It pulls the latest changes and starts Browsersync on `http://localhost:3103`, which reloads the page when you save.
3. Check every page you change on desktop and mobile, and run `php84 scripts/check-site.php` (Herd's PHP 8.4).

## How work ships

- Work happens on the milestone's branch, `milestone/vX-Y-Z-<slug>`, behind one draft pull request into `main`. There are no per-issue branches or pull requests.
- Commit messages follow Conventional Commits and name the issue: `fix: correct the donate link (Refs #123)`.
- Names carry the milestone's version, never GitHub's milestone number. `php scripts/milestone-version next` prints the branch, PR title and Release title; CI checks the PR title and branch name.
- The version is set once per milestone with `php scripts/milestone-version bump vX.Y.Z`, with the `## [X.Y.Z] - YYYY-MM-DD` change log entry, as the last commit.
- The pull request merges once, as a merge commit, after Bambie's ship-gate answer. The tag `vX.Y.Z` publishes the Release, and that tag is deployed with `deploy/cloudron/deploy.ps1 -Tag vX.Y.Z`.
- A hotfix may skip these stages only with Bambie's written approval, recorded on the issue.

## Checks on every pull request

`ci` (site checks, PHP lint, ESLint where configured), `milestone-version-check`, `dependency-review` and CodeQL. They are all free GitHub features.

## Data and secrets

Never commit passwords, keys, tokens, `.env` files or personal data. Example content uses `example.test` addresses.
