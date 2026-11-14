<?php

/*
 * Front controller for LocalValetDriver.php in the local Herd preview: sends the redirect, the blocked or error page,
 * or a page nginx did not serve directly, as the driver resolved it from public/.htaccess. Never deployed.
 */

$response = LocalValetDriver::$response;
http_response_code($response['status']);

if (isset($response['location'])) {
    header('Location: '.$response['location']);
    exit;
}

if (isset($response['file'])) {
    $type = preg_match('/\.html?$/i', $response['file']) ? 'text/html; charset=UTF-8' : (function_exists('mime_content_type') ? mime_content_type($response['file']) : false);
    header('Content-Type: '.($type ?: 'application/octet-stream'));
    readfile($response['file']);
}
