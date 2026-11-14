<#
.SYNOPSIS
    Sets up or repairs this website's Laravel Herd site. Safe to run twice; touches only this project.

.DESCRIPTION
    Reads docs/herd/profile.json, links this clone in Herd as <project>.test, isolates it to the profile's PHP
    version (Cloudron's), runs npm ci with Herd's Node 22 when node_modules is missing, and checks that the site
    serves this clone's public/ folder through LocalValetDriver.php.

    Exit codes: 0 ready, 1 blocked, 3 a decision or a click in Herd is needed.
#>
[CmdletBinding()]
param(
    [string] $HerdHome = (Join-Path $env:USERPROFILE '.config\herd')
)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
$profile = Get-Content (Join-Path $repo 'docs\herd\profile.json') -Raw | ConvertFrom-Json

function Write-Ok([string] $Message) { Write-Host "  ok   $Message" -ForegroundColor Green }
function Write-Warn([string] $Message) { Write-Host "  warn $Message" -ForegroundColor Yellow }
function Stop-Setup([int] $Code, [string] $Message) {
    Write-Host "  stop $Message" -ForegroundColor Red
    exit $Code
}

function Invoke-Herd([string[]] $Arguments) {
    $previous = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try { $output = & herd @Arguments 2>&1 } finally { $ErrorActionPreference = $previous }
    return [pscustomobject]@{ Code = $LASTEXITCODE; Output = ($output | Out-String).Trim() }
}

function Get-SiteInfo {
    $info = Invoke-Herd @('site:info', '--json')
    if ($info.Code -ne 0) { return $null }
    try { return $info.Output | ConvertFrom-Json } catch { return $null }
}

Write-Host "Herd set-up for $($profile.appUrl)"

$herdBin = Join-Path $HerdHome 'bin'
if (-not (Test-Path (Join-Path $herdBin 'herd.bat'))) { Stop-Setup 1 "Laravel Herd is not installed ($herdBin\herd.bat is missing)." }
$node = Get-ChildItem (Join-Path $herdBin 'nvm') -Directory -Filter "v$($profile.node).*" -ErrorAction SilentlyContinue |
    Sort-Object { [version]$_.Name.TrimStart('v') } -Descending | Select-Object -First 1
$env:Path = "$herdBin;$(if ($node) { $node.FullName });" + $env:Path
if ($node) { Write-Ok "Node $($node.Name) from Herd" }
else { Write-Warn "Herd has no Node $($profile.node). Only Browsersync needs it; ask Bambie before running herd node:install $($profile.node)." }

Push-Location $repo
try {
    $site = Get-SiteInfo
    if (-not $site -or $site.name -ne $profile.project -or ($site.path.TrimEnd('\') -ne $repo.TrimEnd('\'))) {
        $link = Invoke-Herd @('link', $profile.project)
        if ($link.Code -ne 0) { Stop-Setup 3 "herd link $($profile.project) failed. Is Herd running? $($link.Output)" }
        $site = Get-SiteInfo
        Write-Ok "Linked this clone as $($profile.site)"
    } else {
        Write-Ok "Linked: $($profile.site) -> $($site.path)"
    }

    if ($site.isolatedPhpVersion -ne $profile.php) {
        $installed = @($site.availablePhpVersions | Where-Object { $_.version -eq $profile.php -and $_.installed })
        if ($installed.Count -eq 0) { Stop-Setup 3 "Herd has no PHP $($profile.php). Ask Bambie before running herd php:install $($profile.php)." }
        $isolate = Invoke-Herd @('isolate', $profile.php)
        if ($isolate.Code -ne 0) { Stop-Setup 1 "herd isolate $($profile.php) failed: $($isolate.Output)" }
        Write-Ok "Isolated to PHP $($profile.php)"
    } else {
        Write-Ok "PHP $($profile.php) (isolated)"
    }

    if (-not (Test-Path (Join-Path $repo 'node_modules'))) {
        npm ci --no-audit --no-fund
        if ($LASTEXITCODE) { Stop-Setup 1 'npm ci failed.' }
        Write-Ok 'npm ci'
    } else {
        Write-Ok 'node_modules present'
    }
} finally {
    Pop-Location
}

if (-not (Test-Path (Join-Path $repo $profile.driver))) { Stop-Setup 1 "$($profile.driver) is missing, so Herd would ignore public/.htaccess." }

try {
    $served = (Invoke-WebRequest -UseBasicParsing -TimeoutSec 15 "$($profile.appUrl)/VERSION").Content
    if ($served -is [byte[]]) { $served = [Text.Encoding]::UTF8.GetString($served) }
    $served = "$served".Trim()
} catch {
    Stop-Setup 3 "$($profile.appUrl) did not answer. Open Herd and check it is running, then run this again."
}
$expected = (Get-Content (Join-Path $repo 'public\VERSION') -Raw).Trim()
if ($served -ne $expected) { Stop-Setup 1 "$($profile.appUrl)/VERSION is $served, not $expected from this clone." }
Write-Ok "$($profile.appUrl) serves this clone (VERSION $served)"

try {
    $null = Invoke-WebRequest -UseBasicParsing -TimeoutSec 15 "$($profile.appUrl)/crawl/"
    Stop-Setup 1 "$($profile.appUrl)/crawl/ is not blocked, so $($profile.driver) is not in use. Run herd restart, then this again."
} catch {
    if ($_.Exception.Response -and [int]$_.Exception.Response.StatusCode -eq 403) { Write-Ok "$($profile.driver) applies public/.htaccess (/crawl/ is 403)" }
    else { Stop-Setup 1 "$($profile.appUrl)/crawl/ did not return 403: $($_.Exception.Message)" }
}

Write-Host 'Ready. Run scripts\preview.ps1 for the live preview.'
exit 0
