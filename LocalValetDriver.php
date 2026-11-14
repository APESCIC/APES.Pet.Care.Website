<?php

/*
 * Laravel Herd driver for the local preview. Herd serves sites with nginx, which ignores public/.htaccess, so this
 * driver applies the same rules Cloudron's Apache does: DirectoryIndex, the trailing-slash redirect for folders,
 * RewriteRule redirects and [F] blocks (with their RewriteCond lines), and the ErrorDocument pages. Plain files are
 * handed back to nginx; every other response is sent by dev/herd-router.php.
 *
 * It sits outside public/, so it is never deployed. Header and php_value directives are not applied locally.
 */

use Valet\Drivers\ValetDriver;

class LocalValetDriver extends ValetDriver
{
    /** @var array{status: int, file?: string, location?: string} */
    public static array $response = ['status' => 404];

    public function serves(string $sitePath, string $siteName, string $uri): bool
    {
        return is_file($sitePath.'/public/.htaccess');
    }

    public function isStaticFile(string $sitePath, string $siteName, string $uri)
    {
        $response = $this->resolve($sitePath, $uri);

        return $response['status'] === 200 && ! str_ends_with($response['file'], '.php') ? $response['file'] : false;
    }

    public function frontControllerPath(string $sitePath, string $siteName, string $uri): ?string
    {
        $response = $this->resolve($sitePath, $uri);

        if ($response['status'] === 200 && str_ends_with($response['file'], '.php')) {
            $_SERVER['SCRIPT_FILENAME'] = $response['file'];
            $_SERVER['SCRIPT_NAME'] = substr($response['file'], strlen($sitePath.'/public'));
            $_SERVER['DOCUMENT_ROOT'] = $sitePath.'/public';

            return $response['file'];
        }

        self::$response = $response;

        return $sitePath.'/dev/herd-router.php';
    }

    /**
     * @return array{status: int, file?: string, location?: string}
     */
    private function resolve(string $sitePath, string $uri): array
    {
        $public = $sitePath.'/public';
        $config = $this->readHtaccess($public.'/.htaccess');
        $path = ltrim($uri, '/');

        if (preg_match('#(^|/)\.ht#i', $path)) {
            return $this->errorPage($public, $config, 403);
        }

        if ($config['rewrite']) {
            $conditions = [];
            foreach ($config['rules'] as $rule) {
                if ($rule['type'] === 'cond') {
                    $conditions[] = $rule;
                    continue;
                }

                $pending = $conditions;
                $conditions = [];
                $matched = preg_match($this->regex($rule['pattern'], $rule['flags']), $path, $matches) === 1;
                if ($matched === $rule['negate']) {
                    continue;
                }

                $condMatches = [];
                if (! $this->conditionsPass($pending, $condMatches)) {
                    continue;
                }

                if (isset($rule['flags']['F'])) {
                    return $this->errorPage($public, $config, 403);
                }

                if ($rule['target'] !== '-') {
                    $target = $this->substitute($rule['target'], $matches, $condMatches);
                    if (isset($rule['flags']['R'])) {
                        return ['status' => (int) ($rule['flags']['R'] ?: 302), 'location' => $this->location($target, $rule['flags'])];
                    }
                    $path = ltrim($target, '/');
                }

                if (isset($rule['flags']['L'])) {
                    break;
                }
            }
        }

        $file = rtrim($public.'/'.$path, '/');
        if (is_dir($file)) {
            if ($path !== '' && ! str_ends_with($path, '/')) {
                return ['status' => 301, 'location' => $this->location('/'.$path.'/', ['NE' => ''])];
            }
            foreach ($config['index'] as $index) {
                if (is_file($file.'/'.$index)) {
                    return ['status' => 200, 'file' => $file.'/'.$index];
                }
            }

            return $this->errorPage($public, $config, 403);
        }

        return is_file($file) ? ['status' => 200, 'file' => $file] : $this->errorPage($public, $config, 404);
    }

    /**
     * @return array{rewrite: bool, index: list<string>, errors: array<int, string>, rules: list<array<string, mixed>>}
     */
    private function readHtaccess(string $htaccess): array
    {
        $config = ['rewrite' => false, 'index' => ['index.html'], 'errors' => [], 'rules' => []];
        $aliases = ['REDIRECT' => 'R', 'FORBIDDEN' => 'F', 'LAST' => 'L', 'NOCASE' => 'NC', 'NOESCAPE' => 'NE'];

        foreach (file($htaccess, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $line) {
            $line = trim($line);
            if ($line === '' || $line[0] === '#' || $line[0] === '<') {
                continue;
            }

            preg_match_all('/"[^"]*"|\S+/', $line, $parts);
            $args = array_map(fn ($part) => trim($part, '"'), $parts[0]);
            $directive = strtolower(array_shift($args));

            $flags = [];
            if (in_array($directive, ['rewritecond', 'rewriterule'], true) && preg_match('/^\[(.*)\]$/', (string) end($args), $flagList)) {
                array_pop($args);
                foreach (explode(',', $flagList[1]) as $flag) {
                    [$name, $value] = array_pad(explode('=', trim($flag), 2), 2, '');
                    $name = strtoupper($name);
                    $flags[$aliases[$name] ?? $name] = $value;
                }
            }

            switch ($directive) {
                case 'rewriteengine':
                    $config['rewrite'] = strtolower($args[0] ?? '') === 'on';
                    break;
                case 'directoryindex':
                    $config['index'] = $args;
                    break;
                case 'errordocument':
                    if (isset($args[1]) && str_starts_with($args[1], '/')) {
                        $config['errors'][(int) $args[0]] = $args[1];
                    }
                    break;
                case 'rewritecond':
                    $config['rules'][] = ['type' => 'cond', 'subject' => $args[0], 'pattern' => $args[1], 'flags' => $flags];
                    break;
                case 'rewriterule':
                    $negate = str_starts_with($args[0], '!');
                    $config['rules'][] = ['type' => 'rule', 'pattern' => ltrim($args[0], '!'), 'negate' => $negate, 'target' => $args[1], 'flags' => $flags];
                    break;
            }
        }

        return $config;
    }

    /**
     * @param  list<array<string, mixed>>  $conditions
     * @param  array<int, string>  $condMatches
     */
    private function conditionsPass(array $conditions, array &$condMatches): bool
    {
        $variables = [
            'THE_REQUEST' => ($_SERVER['REQUEST_METHOD'] ?? 'GET').' '.($_SERVER['REQUEST_URI'] ?? '/').' '.($_SERVER['SERVER_PROTOCOL'] ?? 'HTTP/1.1'),
            'REQUEST_URI' => (string) parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH),
            'REQUEST_METHOD' => $_SERVER['REQUEST_METHOD'] ?? 'GET',
            'QUERY_STRING' => $_SERVER['QUERY_STRING'] ?? '',
            'HTTP_HOST' => $_SERVER['HTTP_HOST'] ?? '',
            'HTTPS' => empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === 'off' ? 'off' : 'on',
        ];

        foreach ($conditions as $condition) {
            $subject = preg_replace_callback('/%\{([A-Z_]+)\}/', fn ($m) => $variables[$m[1]] ?? '', $condition['subject']);
            $negate = str_starts_with($condition['pattern'], '!');
            $matched = preg_match($this->regex(ltrim($condition['pattern'], '!'), $condition['flags']), $subject, $matches) === 1;
            if ($matched === $negate) {
                return false;
            }
            if ($matched) {
                $condMatches = $matches;
            }
        }

        return true;
    }

    /**
     * @param  array<string, string>  $flags
     */
    private function regex(string $pattern, array $flags): string
    {
        return '#'.str_replace('#', '\#', $pattern).'#'.(isset($flags['NC']) ? 'i' : '');
    }

    /**
     * @param  array<int, string>  $matches
     * @param  array<int, string>  $condMatches
     */
    private function substitute(string $target, array $matches, array $condMatches): string
    {
        $target = preg_replace_callback('/\$(\d)/', fn ($m) => $matches[(int) $m[1]] ?? '', $target);

        return preg_replace_callback('/%(\d)/', fn ($m) => $condMatches[(int) $m[1]] ?? '', $target);
    }

    /**
     * @param  array<string, string>  $flags
     */
    private function location(string $target, array $flags): string
    {
        if (! isset($flags['NE'])) {
            $target = preg_replace_callback("#[^A-Za-z0-9\\-._~:/?\\[\\]@!$&'()*+,;=]#", fn ($m) => rawurlencode($m[0]), $target);
        }

        $query = $_SERVER['QUERY_STRING'] ?? '';
        if ($query !== '' && ! str_contains($target, '?')) {
            $target .= '?'.$query;
        }

        return preg_match('#^https?://#i', $target) ? $target : 'http://'.($_SERVER['HTTP_HOST'] ?? 'localhost').$target;
    }

    /**
     * @param  array{errors: array<int, string>}  $config
     * @return array{status: int, file?: string}
     */
    private function errorPage(string $public, array $config, int $status): array
    {
        $page = isset($config['errors'][$status]) ? $public.$config['errors'][$status] : null;

        return $page !== null && is_file($page) ? ['status' => $status, 'file' => $page] : ['status' => $status];
    }
}
