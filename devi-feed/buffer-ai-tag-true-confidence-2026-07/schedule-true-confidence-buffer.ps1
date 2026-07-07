# Queue TRUE CONFIDENCE stop-motion reel to Buffer (Devi IG).
#
# powershell -ExecutionPolicy Bypass -File devi-feed/buffer-ai-tag-true-confidence-2026-07/schedule-true-confidence-buffer.ps1
# powershell -ExecutionPolicy Bypass -File devi-feed/buffer-ai-tag-true-confidence-2026-07/schedule-true-confidence-buffer.ps1 -DryRun

[CmdletBinding()]
param(
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$packDir = $PSScriptRoot
$idsPath = Join-Path $repoRoot "local-secrets\buffer_ids.ps1"
. $idsPath
if ([string]::IsNullOrWhiteSpace($env:BUFFER_PROFILE_IG_DEVI)) { throw "BUFFER_PROFILE_IG_DEVI missing" }

$ig = $env:BUFFER_PROFILE_IG_DEVI.Trim()
. (Join-Path $repoRoot "scripts\buffer-common.ps1")
$queueScript = Join-Path $repoRoot "scripts\buffer-queue-video-post.ps1"
$manifestPath = Join-Path $packDir "schedule-buffer-true-confidence.json"
$manifest = Get-Content -LiteralPath $manifestPath -Raw -Encoding utf8 | ConvertFrom-Json
$baseUrl = $manifest.defaults.mediaBaseUrl.TrimEnd("/")
$hashtags = $manifest.defaults.hashtags
$v = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$reelFile = "devi-true-confidence-stopmo-buffer-reel.mp4"
$deliveryReel = Join-Path $repoRoot "buffer-delivery\$reelFile"
$sourceReel = Join-Path $repoRoot "contenty\product-campaigns\2026-07-08-ai-tag-true-confidence\devi-true-confidence-buffer-reel.mp4"

if (-not (Test-Path $sourceReel)) { throw "Missing finalized source reel: $sourceReel" }
Copy-Item -LiteralPath $sourceReel -Destination $deliveryReel -Force
Write-Host "Copied reel -> $deliveryReel"

$results = @()
foreach ($post in $manifest.posts) {
  $videoUrl = ("{0}/{1}?v={2}" -f $baseUrl, $reelFile, $v)
  $body = "{0}`n`n{1}" -f $post.caption.Trim(), $hashtags
  $due = ([DateTimeOffset]::Parse($post.dueAtUtc)).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")

  $row = [ordered]@{
    id = $post.id
    format = "reel-mp4"
    file = $reelFile
    dueAtUtc = $due
    status = "pending"
    postId = $null
    error = $null
  }

  if ($DryRun) {
    Write-Host ('[DRY] ' + $post.id + ' due ' + $due)
    Write-Host $body
    $row.status = "dry_run"
    $results += [pscustomobject]$row
    continue
  }

  try {
    Write-Host ('Queue ' + $post.id + ' due ' + $due)
    $out = & $queueScript `
      -ChannelId $ig `
      -Service instagram `
      -PostType reel `
      -Text $body `
      -VideoUrl $videoUrl `
      -ThumbnailOffsetMs 0 `
      -DueAt $due `
      -ShouldShareToFeed $true `
      -UseStableCdnForGithub $false `
      -SkipCaptionGate | ConvertFrom-Json
    $row.status = "scheduled"
    $row.postId = $out.post.id
    Write-Host ('  -> postId ' + $out.post.id)
  }
  catch {
    $row.status = "failed"
    $row.error = $_.Exception.Message
    Write-Warning $row.error
  }

  $results += [pscustomobject]$row
}

$outPath = Join-Path $packDir ("buffer-schedule-results-{0}.json" -f (Get-Date -Format "yyyyMMdd-HHmmss"))
$results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $outPath -Encoding utf8
Write-Host ('Wrote ' + $outPath)
