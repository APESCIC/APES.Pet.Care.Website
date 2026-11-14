<?php

declare(strict_types=1);

$root = dirname(__DIR__);
$publicRoot = $root . DIRECTORY_SEPARATOR . 'public';
$includesRoot = $publicRoot . DIRECTORY_SEPARATOR . 'includes';

$version = trim((string) file_get_contents($root . DIRECTORY_SEPARATOR . 'VERSION'));
$siteVersionLabel = 'APES Pet Care Clinic v' . $version;

$fragments = [
    'header' => loadFragment($includesRoot . DIRECTORY_SEPARATOR . 'header.html'),
    'menuDesktop' => loadFragment($includesRoot . DIRECTORY_SEPARATOR . 'menu-desktop.html'),
    'menuMobile' => loadFragment($includesRoot . DIRECTORY_SEPARATOR . 'menu-mobile.html'),
    'footer' => loadFragment($includesRoot . DIRECTORY_SEPARATOR . 'footer.html'),
];

$routeMetadata = [
    'public/index.html' => ['section' => 'home', 'page' => 'home'],
    'public/about-us/index.html' => ['section' => 'information', 'page' => 'about-us'],
    'public/bookings/index.html' => ['section' => 'bookings', 'page' => 'bookings'],
    'public/care-plans/index.html' => ['section' => 'services', 'page' => 'care-plans'],
    'public/cat-care/index.html' => ['section' => 'services', 'page' => 'cat-care'],
    'public/changelog/index.html' => ['section' => 'information', 'page' => 'changelog'],
    'public/contact/index.html' => ['section' => 'contact', 'page' => 'contact'],
    'public/dog-care/index.html' => ['section' => 'services', 'page' => 'dog-care'],
    'public/donate/index.html' => ['section' => 'donate', 'page' => 'donate'],
    'public/events/index.html' => ['section' => 'information', 'page' => 'events'],
    'public/ferret-care/index.html' => ['section' => 'services', 'page' => 'ferret-care'],
    'public/general-services/index.html' => ['section' => 'services', 'page' => 'general-services'],
    'public/guinea-care/index.html' => ['section' => 'services', 'page' => 'guinea-care'],
    'public/invert-care/index.html' => ['section' => 'services', 'page' => 'invert-care'],
    'public/lab-services/index.html' => ['section' => 'services', 'page' => 'lab-services'],
    'public/policies/booking-policy/index.html' => ['section' => 'information', 'page' => 'booking-policy'],
    'public/policies/cookies-policy/index.html' => ['section' => 'information', 'page' => 'cookies-policy'],
    'public/policies/privacy-policy/index.html' => ['section' => 'information', 'page' => 'privacy-policy'],
    'public/policies/refund-policy/index.html' => ['section' => 'information', 'page' => 'refund-policy'],
    'public/policies/terms-and-conditions/index.html' => ['section' => 'information', 'page' => 'terms-and-conditions'],
    'public/rabbit-care/index.html' => ['section' => 'services', 'page' => 'rabbit-care'],
    'public/reptile-care/index.html' => ['section' => 'services', 'page' => 'reptile-care'],
    'public/services/index.html' => ['section' => 'services', 'page' => 'services'],
    'public/403.html' => ['section' => 'none', 'page' => '403'],
    'public/404.html' => ['section' => 'none', 'page' => '404'],
    'public/500.html' => ['section' => 'none', 'page' => '500'],
];

$pages = discoverRuntimePages($publicRoot);
$checkMode = in_array('--check', $argv, true);
$changedFiles = [];

foreach ($pages as $pagePath) {
    $relativePath = normaliseRelativePath(substr($pagePath, strlen($root) + 1));
    if (!isset($routeMetadata[$relativePath])) {
        fwrite(STDERR, "No route metadata configured for {$relativePath}\n");
        exit(1);
    }

    $raw = (string) file_get_contents($pagePath);
    $eol = str_contains($raw, "\r\n") ? "\r\n" : "\n";
    $original = str_replace("\r\n", "\n", $raw);
    $metadata = $routeMetadata[$relativePath];
    $depth = routeDepth($relativePath);
    $basePath = $depth === 0 ? './' : str_repeat('../', $depth);

    $updated = syncBodyMetadata($original, $metadata);
    $renderedHeader = renderHeader($fragments, $basePath, $metadata);
    $renderedFooter = renderFooter($fragments['footer'], $basePath, $siteVersionLabel);

    $updated = syncSection(
        $updated,
        'header',
        '~<div class="site-topbar">.*?</header>~s',
        $renderedHeader
    );
    $updated = syncSection(
        $updated,
        'footer',
        '~<footer class="page-footer">.*?</footer>~s',
        $renderedFooter
    );

    if ($updated !== $original) {
        $changedFiles[] = $relativePath;
        if (!$checkMode) {
            file_put_contents($pagePath, str_replace("\n", $eol, $updated));
        }
    }
}

if ($checkMode) {
    if ($changedFiles !== []) {
        fwrite(STDERR, "Out-of-sync site chrome detected:\n");
        foreach ($changedFiles as $path) {
            fwrite(STDERR, " - {$path}\n");
        }
        exit(1);
    }

    fwrite(STDOUT, "Site chrome is in sync.\n");
    exit(0);
}

fwrite(STDOUT, "Synced site chrome for " . count($pages) . " runtime HTML files.\n");

function loadFragment(string $path): string
{
    if (!is_file($path)) {
        fwrite(STDERR, "Missing fragment: {$path}\n");
        exit(1);
    }

    return rtrim(str_replace("\r\n", "\n", (string) file_get_contents($path))) . "\n";
}

function discoverRuntimePages(string $publicRoot): array
{
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($publicRoot, FilesystemIterator::SKIP_DOTS)
    );

    $pages = [];

    foreach ($iterator as $file) {
        if (!$file instanceof SplFileInfo || !$file->isFile()) {
            continue;
        }

        $path = str_replace('\\', '/', $file->getPathname());
        $relative = substr($path, strlen(str_replace('\\', '/', $publicRoot)) + 1);

        if (str_starts_with($relative, 'crawl/') || str_starts_with($relative, 'includes/')) {
            continue;
        }

        if (!preg_match('~(?:^index\.html$|/index\.html$|^403\.html$|^404\.html$|^500\.html$)~', $relative)) {
            continue;
        }

        $pages[] = $file->getPathname();
    }

    sort($pages);
    return $pages;
}

function normaliseRelativePath(string $path): string
{
    return str_replace('\\', '/', $path);
}

function routeDepth(string $relativePath): int
{
    $trimmed = preg_replace('~^public/~', '', $relativePath);
    $dir = trim((string) dirname($trimmed), '.');

    if ($dir === '') {
        return 0;
    }

    return count(array_filter(explode('/', $dir), static fn(string $part): bool => $part !== ''));
}

function syncBodyMetadata(string $html, array $metadata): string
{
    $section = htmlspecialchars($metadata['section'], ENT_QUOTES);
    $page = htmlspecialchars($metadata['page'], ENT_QUOTES);

    return (string) preg_replace_callback(
        '~<body\b([^>]*)>~',
        static function (array $matches) use ($section, $page): string {
            $attrs = $matches[1] ?? '';
            $attrs = (string) preg_replace('~\sdata-nav-section="[^"]*"~', '', $attrs);
            $attrs = (string) preg_replace('~\sdata-nav-page="[^"]*"~', '', $attrs);
            return '<body' . $attrs . ' data-nav-section="' . $section . '" data-nav-page="' . $page . '">';
        },
        $html,
        1
    );
}

function renderHeader(array $fragments, string $basePath, array $metadata): string
{
    $desktopMenu = renderMenu($fragments['menuDesktop'], $basePath, $metadata);
    $mobileMenu = renderMenu($fragments['menuMobile'], $basePath, $metadata);

    $tokens = [
        '{{BASE}}' => $basePath,
        '{{DESKTOP_MENU}}' => rtrim($desktopMenu),
        '{{MOBILE_MENU}}' => rtrim($mobileMenu),
    ];

    return applyTokens($fragments['header'], $tokens);
}

function renderFooter(string $footerFragment, string $basePath, string $siteVersionLabel): string
{
    return applyTokens(
        $footerFragment,
        [
            '{{BASE}}' => $basePath,
            '{{SITE_VERSION_LABEL}}' => $siteVersionLabel,
        ]
    );
}

function renderMenu(string $fragment, string $basePath, array $metadata): string
{
    $page = $metadata['page'];
    $section = $metadata['section'];

    $tokens = [
        '{{BASE}}' => $basePath,
        '{{HOME_ATTR}}' => activeAttr($page === 'home'),
        '{{SERVICES_SECTION_CLASS}}' => sectionClass($section === 'services'),
        '{{INFORMATION_SECTION_CLASS}}' => sectionClass($section === 'information'),
        '{{SERVICES_LINK_CLASS}}' => activeClass($page === 'services'),
        '{{GENERAL_SERVICES_LINK_CLASS}}' => activeClass($page === 'general-services'),
        '{{DOG_CARE_LINK_CLASS}}' => activeClass($page === 'dog-care'),
        '{{CAT_CARE_LINK_CLASS}}' => activeClass($page === 'cat-care'),
        '{{REPTILE_CARE_LINK_CLASS}}' => activeClass($page === 'reptile-care'),
        '{{INVERT_CARE_LINK_CLASS}}' => activeClass($page === 'invert-care'),
        '{{RABBIT_CARE_LINK_CLASS}}' => activeClass($page === 'rabbit-care'),
        '{{GUINEA_CARE_LINK_CLASS}}' => activeClass($page === 'guinea-care'),
        '{{FERRET_CARE_LINK_CLASS}}' => activeClass($page === 'ferret-care'),
        '{{CARE_PLANS_LINK_CLASS}}' => activeClass($page === 'care-plans'),
        '{{LAB_SERVICES_LINK_CLASS}}' => activeClass($page === 'lab-services'),
        '{{ABOUT_US_LINK_CLASS}}' => activeClass($page === 'about-us'),
        '{{EVENTS_LINK_CLASS}}' => activeClass($page === 'events'),
        '{{NEWS_LINK_CLASS}}' => activeClass($page === 'news'),
        '{{BOOKING_POLICY_LINK_CLASS}}' => activeClass($page === 'booking-policy'),
        '{{PRIVACY_POLICY_LINK_CLASS}}' => activeClass($page === 'privacy-policy'),
        '{{COOKIES_POLICY_LINK_CLASS}}' => activeClass($page === 'cookies-policy'),
        '{{REFUND_POLICY_LINK_CLASS}}' => activeClass($page === 'refund-policy'),
        '{{TERMS_LINK_CLASS}}' => activeClass($page === 'terms-and-conditions'),
        '{{CHANGELOG_LINK_CLASS}}' => activeClass($page === 'changelog'),
        '{{BOOKINGS_ATTR}}' => activeAttr($page === 'bookings'),
        '{{DONATE_ATTR}}' => activeAttr($page === 'donate'),
        '{{CONTACT_ATTR}}' => activeAttr($page === 'contact'),
    ];

    return applyTokens($fragment, $tokens);
}

function applyTokens(string $template, array $tokens): string
{
    return strtr($template, $tokens);
}

function activeClass(bool $active): string
{
    return $active ? ' is-active' : '';
}

function activeAttr(bool $active): string
{
    return $active ? ' class="is-active"' : '';
}

function sectionClass(bool $active): string
{
    return $active ? ' is-active' : '';
}

function syncSection(string $html, string $name, string $fallbackPattern, string $replacementContent): string
{
    $start = '<!-- APES:' . strtoupper($name) . ' START -->';
    $end = '<!-- APES:' . strtoupper($name) . ' END -->';
    $wrapped = $start . "\n" . rtrim($replacementContent) . "\n" . $end;
    $markerPattern = '~' . preg_quote($start, '~') . '.*?' . preg_quote($end, '~') . '~s';

    if (preg_match($markerPattern, $html) === 1) {
        return (string) preg_replace($markerPattern, $wrapped, $html, 1);
    }

    if (preg_match($fallbackPattern, $html) !== 1) {
        fwrite(STDERR, "Could not locate {$name} section for sync.\n");
        exit(1);
    }

    return (string) preg_replace($fallbackPattern, $wrapped, $html, 1);
}
