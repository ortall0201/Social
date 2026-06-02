# Schedules Ortal LinkedIn Bisociation series (native video) to Buffer.
#   . .\local-secrets\buffer_ids.ps1
#   .\buffer-linkedin\queue\Schedule-OrtalBisociationCollisionsBuffer.ps1 -ManifestPath buffer-linkedin\queue\2026-06-02-ortal-bisociation-collisions-four.json -OnePerDay -StartDateUtc "2026-06-09"
#   .\buffer-linkedin\queue\Schedule-OrtalBisociationCollisionsBuffer.ps1 -ManifestPath buffer-linkedin\queue\2026-06-19-ortal-bisociation-scene-morph-v2-seven.json
#   .\buffer-linkedin\queue\Schedule-OrtalBisociationCollisionsBuffer.ps1 -DryRun

[CmdletBinding()]
param(
    [switch]$DryRun,
    [string]$StartDateUtc = "",
    [switch]$OnePerDay,
    [string]$ManifestPath = "buffer-linkedin\queue\2026-06-02-ortal-bisociation-collisions-four.json"
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
Set-Location $repoRoot

$idsPath = Join-Path $repoRoot "local-secrets\buffer_ids.ps1"
if (-not (Test-Path -LiteralPath $idsPath)) { throw "Missing $idsPath" }
. $idsPath

$channelId = $env:BUFFER_PROFILE_LINKEDIN_ORTAL
if (-not $channelId) { throw "BUFFER_PROFILE_LINKEDIN_ORTAL not set" }

$manifestFull = Join-Path $repoRoot $ManifestPath
if (-not (Test-Path -LiteralPath $manifestFull)) { throw "Missing manifest $manifestFull" }
$manifest = Get-Content -LiteralPath $manifestFull -Raw | ConvertFrom-Json
$queueScript = Join-Path $repoRoot "scripts\buffer-queue-video-post.ps1"

function ConvertTo-LinkedInBufferText {
    param([string]$Text)
    ($Text -replace '\*\*', '' -replace [char]0x2014, '-' -replace '—', '-' -replace '·', ',').Trim()
}

$v = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$useExplicitDueAt = $false
if ($manifest.scheduling -and $manifest.scheduling.useExplicitDueAt) {
    $useExplicitDueAt = [bool]$manifest.scheduling.useExplicitDueAt
}

if ([string]::IsNullOrWhiteSpace($StartDateUtc)) {
    $StartDateUtc = [DateTimeOffset]::UtcNow.ToString("yyyy-MM-dd")
}
$start = [DateTimeOffset]::Parse("${StartDateUtc}T00:00:00Z")
$nowUtc = [DateTimeOffset]::UtcNow
$baseUrl = $manifest.mediaBaseUrl
$postCount = @($manifest.posts).Count
$slotDay = if ($OnePerDay) {
    0..([Math]::Max(0, $postCount - 1))
} else {
    @(0, 0, 1, 1)[0..([Math]::Min(3, $postCount - 1))]
}
$results = @()
$idx = 0

foreach ($post in @($manifest.posts | Sort-Object { [int]$_.seriesPart })) {
    if ($useExplicitDueAt -and $post.dueAtUtc) {
        $due = [DateTimeOffset]::Parse([string]$post.dueAtUtc).ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
    } else {
        $hour = 19
        $dayOffset = if ($idx -lt $slotDay.Count) { $slotDay[$idx] } else { $idx }
        $dueAt = $start.AddDays($dayOffset).AddHours($hour)
        if ($idx -eq 0 -and $dueAt -le $nowUtc.AddMinutes(30)) {
            $dueAt = $start.AddDays($dayOffset).AddHours(19)
        }
        if ($dueAt -le $nowUtc.AddMinutes(30)) {
            $dueAt = $nowUtc.AddHours(2)
        }
        $due = $dueAt.ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
    }
    $idx++

    $slug = $post.slug
    $videoUrl = "{0}/{1}/{2}?v={3}" -f $baseUrl, $slug, $manifest.videoFile, $v
    $text = ConvertTo-LinkedInBufferText ([string]$post.text)

    if ($DryRun) {
        Write-Host "[DRY] part $($post.seriesPart) $slug due $due"
        continue
    }

    Write-Host "Queue part $($post.seriesPart) $slug due $due"
    $json = & $queueScript -ChannelId $channelId -Text $text -VideoUrl $videoUrl -DueAt $due -SkipCaptionGate -UseStableCdnForGithub $false
    $parsed = $json | ConvertFrom-Json
    $results += [pscustomobject]@{
        seriesPart = $post.seriesPart
        slug = $slug
        reelId = $post.reelId
        dueAt = $due
        bufferPostId = $parsed.post.id
    }
    Start-Sleep -Seconds 2
}

if (-not $DryRun) {
    $out = Join-Path $repoRoot "buffer-linkedin\exports\ortal-bisociation-collisions-buffer-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"
    $results | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $out -Encoding UTF8
    $manifest | Add-Member -NotePropertyName bufferSchedule -NotePropertyValue @($results) -Force -ErrorAction SilentlyContinue
    $manifest.status = "scheduled_buffer_live"
    $manifest | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $manifestFull -Encoding UTF8
    $results | Format-Table -AutoSize
    Write-Host "Wrote $out"
}
Write-Host "Add pin comments in Buffer per manifest pinComment."
