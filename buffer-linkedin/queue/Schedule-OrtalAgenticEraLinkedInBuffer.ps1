# Schedules Agentic Era batch (native video) to Ortal LinkedIn Buffer.
# Run from repo root after feed-reel-v1.mp4 files are pushed and URLs return 200:
#   . .\local-secrets\buffer_ids.ps1
#   .\buffer-linkedin\queue\Schedule-OrtalAgenticEraLinkedInBuffer.ps1
#   .\buffer-linkedin\queue\Schedule-OrtalAgenticEraLinkedInBuffer.ps1 -DryRun

[CmdletBinding()]
param(
    [switch]$DryRun,
    [string]$StartDateUtc = "2026-06-02"
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
Set-Location $repoRoot

$idsPath = Join-Path $repoRoot "local-secrets\buffer_ids.ps1"
if (-not (Test-Path -LiteralPath $idsPath)) { throw "Missing $idsPath" }
. $idsPath

$channelId = $env:BUFFER_PROFILE_LINKEDIN_ORTAL
if (-not $channelId) { throw "BUFFER_PROFILE_LINKEDIN_ORTAL not set in buffer_ids.ps1" }

$manifestPath = Join-Path $repoRoot "buffer-linkedin\queue\2026-06-01-ortal-agentic-era-eight.json"
$manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json

$queueScript = Join-Path $repoRoot "scripts\buffer-queue-video-post.ps1"
if (-not (Test-Path -LiteralPath $queueScript)) { throw "Missing $queueScript" }

$baseUrl = $manifest.mediaBaseUrl.TrimEnd("/")
$v = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$start = [DateTimeOffset]::Parse("${StartDateUtc}T00:00:00Z")

# Interleave T_C_T_C_T_C_T_T — tactical 08:00Z, comic 19:00Z
$day = 0
$results = @()

foreach ($post in @($manifest.posts | Sort-Object { [int]$_.queueSlot })) {
    $track = "$($post.track)".ToLowerInvariant()
    $hour = if ($track -eq "blue-comic") { 19 } else { 8 }
    $due = $start.AddDays($day).AddHours($hour).ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
    if ($track -eq "blue-comic") { $day++ }

    $slug = $post.slug
    $videoUrl = "{0}/{1}/{2}?v={3}" -f $baseUrl, $slug, $manifest.videoFile, $v
    $text = [string]$post.text
    if (-not $text.Trim()) { throw "Empty text for $slug" }

    if ($DryRun) {
        Write-Host "[DRY] $slug ($track) due $due"
        $results += [pscustomobject]@{ slug = $slug; dueAt = $due; status = "dry_run" }
        continue
    }

    Write-Host "Queue $slug due $due"
    $json = & $queueScript `
        -ChannelId $channelId `
        -Text $text `
        -VideoUrl $videoUrl `
        -DueAt $due `
        -SkipCaptionGate
    $parsed = $json | ConvertFrom-Json
    $results += [pscustomobject]@{
        slug = $slug
        queueSlot = $post.queueSlot
        dueAt = $due
        bufferPostId = $parsed.post.id
        videoUrl = $parsed.videoUrl
    }
    Start-Sleep -Seconds 2
}

$outPath = Join-Path $repoRoot "buffer-linkedin\exports\ortal-agentic-era-buffer-schedule-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"
$results | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $outPath -Encoding UTF8
$results | Format-Table -AutoSize
Write-Host "Wrote $outPath"
Write-Host "Add pin comments in Buffer UI per manifest pinComment fields."
