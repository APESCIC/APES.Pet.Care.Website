<#
.SYNOPSIS
    Live preview gate, steps 1 and 2: load the latest code, then check the
    Herd preview serves it. Run before any development work.

.DESCRIPTION
    1. Stops if tracked files have uncommitted changes. Fetches origin, fast-
       forwards the branch, and merges origin/main into it (a merge commit, never
       a rebase; a conflict is aborted and reported). Nothing is pushed.
    2. Runs npm ci with Herd's Node 22 when package-lock.json is newer than the
       installed dependencies.
    3. Checks Herd serves the checked-out code: /VERSION matches public/VERSION,
       and /crawl/ is blocked, which proves LocalValetDriver.php applies
       public/.htaccess.
    4. Starts Browsersync in its own window if nothing listens on its port.

    Opening the page in Cursor's browser is the agent's step 3.

    Exit codes: 0 ready, 1 blocked (the message says why), 3 needs a decision.

.EXAMPLE
    powershell -NoProfile -ExecutionPolicy Bypass -File scripts\preview.ps1
#>
[CmdletBinding()]
param(
    [switch]$NoSync,
    [switch]$NoMergeMain,
    [switch]$NoDevServer,
    [string]$HerdHome = (Join-Path $env:USERPROFILE '.config\herd')
)

# This repository's Herd values (docs/herd/profile.md).
$Config = @{
    AppUrl     = 'http://apes-pet-care-website.test'
    Node       = '22'
    DevPort    = 3103
    DevCommand = 'npm run dev'
}

$ErrorActionPreference = 'Stop'

function Write-Step([string]$Message) { Write-Host "==> $Message" -ForegroundColor Cyan }
function Write-Ok([string]$Message) { Write-Host "    $Message" -ForegroundColor Green }
function Write-Warn([string]$Message) { Write-Host "    WARNING: $Message" -ForegroundColor Yellow }
function Stop-Preview([int]$Code, [string]$Message) { Write-Host "    STOP: $Message" -ForegroundColor Red; exit $Code }

function Invoke-Native([scriptblock]$Command) {
    $previous = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try { $output = & $Command 2>&1 } finally { $ErrorActionPreference = $previous }
    return [pscustomobject]@{ Code = $LASTEXITCODE; Output = ($output | Out-String).Trim() }
}

function Get-Status([string]$Url) {
    try {
        $response = Invoke-WebRequest $Url -UseBasicParsing -TimeoutSec 60 -MaximumRedirection 0
        $content = $response.Content
        if ($content -is [byte[]]) { $content = [Text.Encoding]::UTF8.GetString($content) }
        return [pscustomobject]@{ Code = [int]$response.StatusCode; Content = "$content" }
    } catch {
        if ($null -eq $_.Exception.Response) { return [pscustomobject]@{ Code = 0; Content = '' } }
        return [pscustomobject]@{ Code = [int]$_.Exception.Response.StatusCode; Content = '' }
    }
}

$repo = Split-Path $PSScriptRoot -Parent
$herdBin = Join-Path $HerdHome 'bin'
if (-not (Test-Path (Join-Path $herdBin 'herd.bat'))) { Stop-Preview 1 "Laravel Herd is not installed ($herdBin\herd.bat is missing)." }
$nodeDir = Get-ChildItem (Join-Path $herdBin 'nvm') -Directory -Filter "v$($Config.Node).*" -ErrorAction SilentlyContinue |
    Sort-Object { [version]$_.Name.TrimStart('v') } -Descending | Select-Object -First 1
if (-not $nodeDir) { Stop-Preview 3 "Herd has no Node $($Config.Node). Ask Bambie before running herd node:install $($Config.Node)." }
$env:Path = "$herdBin;$($nodeDir.FullName);" + $env:Path

Push-Location $repo
try {
    # 1. Latest code ------------------------------------------------------------
    Write-Step 'Latest code'
    $before = (git rev-parse HEAD).Trim()
    $branch = (git branch --show-current).Trim()
    if ($NoSync) {
        Write-Warn 'Skipped the sync (-NoSync)'
    } else {
        $dirty = @(git status --porcelain --untracked-files=no)
        if ($dirty.Count -gt 0) { Stop-Preview 3 "$($dirty.Count) tracked files have uncommitted changes. Commit them or decide what to do before syncing." }
        $fetch = Invoke-Native { git fetch origin --prune --tags }
        if ($fetch.Code -ne 0) { Stop-Preview 1 "git fetch failed: $($fetch.Output)" }
        $upstream = Invoke-Native { git rev-parse --abbrev-ref '@{u}' }
        if ($upstream.Code -eq 0) {
            $ff = Invoke-Native { git merge --ff-only '@{u}' }
            if ($ff.Code -ne 0) { Stop-Preview 3 "$branch and $($upstream.Output) have both moved on. Merge them (no rebase), then run this again." }
        }
        if ($branch -ne 'main' -and -not $NoMergeMain) {
            $behind = [int](git rev-list --count 'HEAD..origin/main').Trim()
            if ($behind -gt 0) {
                $merge = Invoke-Native { git merge --no-edit origin/main }
                if ($merge.Code -ne 0) {
                    Invoke-Native { git merge --abort } | Out-Null
                    Stop-Preview 3 "Merging origin/main into $branch conflicts. The merge was aborted; resolve it before starting work."
                }
                Write-Ok "Merged $behind commits from origin/main into $branch (not pushed)"
            }
        }
    }
    $head = (git rev-parse HEAD).Trim()
    $short = $head.Substring(0, 12)
    Write-Ok "$branch at $short"

    # 2. Dependencies -----------------------------------------------------------
    Write-Step "Dependencies (Node $($nodeDir.Name) from Herd)"
    $npmMarker = Join-Path $repo 'node_modules\.package-lock.json'
    if (-not (Test-Path $npmMarker) -or (Get-Item 'package-lock.json').LastWriteTime -gt (Get-Item $npmMarker).LastWriteTime) {
        $run = Invoke-Native { npm ci --no-audit --no-fund }
        if ($run.Code -ne 0) { Stop-Preview 1 "npm ci failed: $($run.Output)" }
        Write-Ok 'Ran npm ci (restart the dev server if it was running)'
    } else { Write-Ok 'npm dependencies are current' }

    # 3. Herd preview ------------------------------------------------------------
    Write-Step "Herd preview $($Config.AppUrl)"
    $version = Get-Status "$($Config.AppUrl)/VERSION"
    if ($version.Code -eq 0) { Stop-Preview 1 "$($Config.AppUrl) did not answer. Open Herd and check it is running, or run scripts\herd-setup.ps1." }
    $served = $version.Content.Trim()
    $expected = (Get-Content (Join-Path $repo 'public\VERSION') -Raw).Trim()
    if ($served -ne $expected) { Stop-Preview 1 "The preview serves VERSION '$served', not $expected from this checkout. Run scripts\herd-setup.ps1 to link this clone." }
    Write-Ok "Serves this checkout (VERSION $served)"
    $blocked = Get-Status "$($Config.AppUrl)/crawl/"
    if ($blocked.Code -ne 403) { Stop-Preview 1 "/crawl/ returned $($blocked.Code), not 403, so LocalValetDriver.php is not applying public/.htaccess. Run herd restart, then this again." }
    Write-Ok 'LocalValetDriver.php applies public/.htaccess'

    # 4. Dev server ------------------------------------------------------------
    Write-Step "Dev server on port $($Config.DevPort)"
    if (Get-NetTCPConnection -State Listen -LocalPort $Config.DevPort -ErrorAction SilentlyContinue) {
        Write-Ok 'Already running'
    } elseif ($NoDevServer) {
        Write-Warn "Not running (-NoDevServer). Start it with $($Config.DevCommand)."
    } else {
        Start-Process -FilePath 'cmd.exe' -ArgumentList '/c', $Config.DevCommand -WorkingDirectory $repo -WindowStyle Minimized
        Write-Ok "Started $($Config.DevCommand) in its own window"
    }

    Write-Step 'Ready'
    Write-Ok "Open http://localhost:$($Config.DevPort) in Cursor's browser (Browsersync proxying $($Config.AppUrl), reloads on save)."
    if ($before -ne $head) { Write-Ok "Code moved from $($before.Substring(0, 12)) to $short during the sync." }
} finally {
    Pop-Location
}
