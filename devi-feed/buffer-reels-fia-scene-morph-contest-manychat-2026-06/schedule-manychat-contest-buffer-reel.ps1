# Queue Manychat #MyRealJob contest reel to Buffer (Instagram only).
#
# powershell -ExecutionPolicy Bypass -File devi-feed/buffer-reels-fia-scene-morph-contest-manychat-2026-06/schedule-manychat-contest-buffer-reel.ps1

[CmdletBinding()]
param(
  [string]$ManifestPath = "",
  [string]$MediaBaseUrlOverride = "",
  [switch]$SkipPreflight,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
if (-not $ManifestPath) { $ManifestPath = Join-Path $PSScriptRoot "schedule-manifest.json" }

$idsPath = Join-Path $repoRoot "local-secrets\buffer_ids.ps1"
. $idsPath
if ([string]::IsNullOrWhiteSpace($env:BUFFER_PROFILE_IG_DEVI)) { throw "BUFFER_PROFILE_IG_DEVI missing" }

$profiles = @{ instagram = $env:BUFFER_PROFILE_IG_DEVI.Trim() }

$queueScript = Join-Path $repoRoot "scripts\buffer-queue-video-post.ps1"
$validator = Join-Path $PSScriptRoot "validate-manychat-contest-manifest-and-media.ps1"
$deliveryDir = Join-Path $repoRoot "buffer-delivery"

if (-not $SkipPreflight) {
  Write-Host "Preflight validation..."
  & $validator -ManifestPath $ManifestPath -MediaFolder $deliveryDir -Strict
}

$manifest = Get-Content -LiteralPath $ManifestPath -Raw | ConvertFrom-Json
$baseUrl = ($MediaBaseUrlOverride, $manifest.defaults.mediaBaseUrl | Where-Object { $_ } | Select-Object -First 1).TrimEnd("/")

$results = @()
foreach ($post in $manifest.posts) {
  $caption = "$($post.caption)".Trim()
  $hashtags = @($manifest.defaults.hashtags)
  $body = if ($hashtags.Count -gt 0) { "{0}`n`n{1}" -f $caption, ($hashtags -join " ") } else { $caption }
  $due = ([DateTimeOffset]::Parse($post.dueAtUtc)).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
  $channels = @($post.channels)
  if ($channels.Count -eq 0) { $channels = @("instagram") }

  $v = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
  $videoUrl = ("{0}/{1}?v={2}" -f $baseUrl, $post.file, $v)

  foreach ($channel in $channels) {
    $key = "$channel".ToLowerInvariant()
    if (-not $profiles.ContainsKey($key)) { continue }
    $row = [ordered]@{
      id = $post.id
      channel = $key
      dueAtUtc = $due
      file = $post.file
      videoUrl = $videoUrl
      status = "pending"
      postId = $null
      error = $null
    }
    if ($DryRun) {
      Write-Host "[DRY] $($post.id) -> $key due $due"
      Write-Host "      $videoUrl"
      $row.status = "dry_run"
      $results += [pscustomobject]$row
      continue
    }
    try {
      Write-Host "Queue $($post.id) -> $key due $due"
      $out = & $queueScript -ChannelId $profiles[$key] -Service $key -PostType reel -Text $body -VideoUrl $videoUrl -DueAt $due -ShouldShareToFeed $true | ConvertFrom-Json
      $row.status = "scheduled"
      $row.postId = $out.post.id
    } catch {
      $row.status = "failed"
      $row.error = $_.Exception.Message
      Write-Warning $row.error
    }
    $results += [pscustomobject]$row
    Start-Sleep -Milliseconds 800
  }
}

$outPath = Join-Path $PSScriptRoot ("buffer-schedule-results-{0}.json" -f (Get-Date).ToString("yyyyMMdd-HHmmss"))
$results | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $outPath -Encoding utf8
Write-Host "Results -> $outPath"
Write-Host "Done."
