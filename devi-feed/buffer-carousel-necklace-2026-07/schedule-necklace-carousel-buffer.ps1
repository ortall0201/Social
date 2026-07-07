# Queue necklace carousel A/B test to Buffer (Devi IG carousel).
#
# powershell -ExecutionPolicy Bypass -File devi-feed/buffer-carousel-necklace-2026-07/schedule-necklace-carousel-buffer.ps1
# powershell -ExecutionPolicy Bypass -File devi-feed/buffer-carousel-necklace-2026-07/schedule-necklace-carousel-buffer.ps1 -DryRun

[CmdletBinding()]
param(
  [string]$ManifestPath = "",
  [string]$MediaBaseUrlOverride = "",
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
if (-not $ManifestPath) {
  $ManifestPath = Join-Path $PSScriptRoot "schedule-buffer-carousel-ab.json"
}

$idsPath = Join-Path $repoRoot "local-secrets\buffer_ids.ps1"
if (-not (Test-Path -LiteralPath $idsPath)) {
  throw "Missing $idsPath"
}
. $idsPath
if ([string]::IsNullOrWhiteSpace($env:BUFFER_PROFILE_IG_DEVI)) {
  throw "BUFFER_PROFILE_IG_DEVI missing in buffer_ids.ps1"
}

$ig = $env:BUFFER_PROFILE_IG_DEVI.Trim()
$queueScript = Join-Path $repoRoot "scripts\buffer-queue-carousel-post.ps1"
$manifest = Get-Content -LiteralPath $ManifestPath -Raw -Encoding utf8 | ConvertFrom-Json
$baseUrl = ($MediaBaseUrlOverride, $manifest.defaults.mediaBaseUrl | Where-Object { $_ } | Select-Object -First 1).TrimEnd("/")
$hashtags = $manifest.defaults.hashtags
$v = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()

$results = @()
foreach ($post in $manifest.posts) {
  $folder = $post.slideFolder
  $urls = @()
  for ($i = 1; $i -le 5; $i++) {
    $nn = "{0:D2}" -f $i
    $rel = "{0}/slide-{1}.jpg" -f $folder, $nn
    $urls += ("{0}/{1}?v={2}" -f $baseUrl, $rel, $v)
  }

  $body = "{0}`n`n{1}" -f $post.caption.Trim(), $hashtags
  $due = ([DateTimeOffset]::Parse($post.dueAtUtc)).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")

  $row = [ordered]@{
    id = $post.id
    arm = $post.arm
    variant = $post.variant
    dueAtUtc = $due
    slideCount = $urls.Count
    status = "pending"
    postId = $null
    error = $null
  }

  if ($DryRun) {
    Write-Host "[DRY] $($post.id) arm $($post.arm) due $due ($($urls.Count) slides)"
    Write-Host "  slide-01: $($urls[0])"
    $preview = $post.caption
    if ($preview.Length -gt 120) { $preview = $preview.Substring(0, 120) + "..." }
    Write-Host "  caption: $preview"
    $row.status = "dry_run"
    $results += [pscustomobject]$row
    continue
  }

  try {
    Write-Host "Queue $($post.id) arm $($post.arm) due $due"
    $out = & $queueScript `
      -ChannelId $ig `
      -Service instagram `
      -Text $body `
      -ImageUrls $urls `
      -DueAt $due `
      -ShouldShareToFeed $true `
      -SkipCaptionGate | ConvertFrom-Json
    $row.status = "scheduled"
    $row.postId = $out.post.id
    Write-Host "  -> postId $($out.post.id)"
  }
  catch {
    $row.status = "failed"
    $row.error = $_.Exception.Message
    Write-Warning $row.error
  }

  $results += [pscustomobject]$row
  Start-Sleep -Milliseconds 900
}

$outPath = Join-Path $PSScriptRoot ("buffer-schedule-results-{0}.json" -f (Get-Date -Format "yyyyMMdd-HHmmss"))
$results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $outPath -Encoding utf8
Write-Host "Wrote $outPath"
Write-Host "Done. $($results.Count) carousel post(s)."
