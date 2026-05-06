[CmdletBinding()]
param(
  [string]$ManifestPath = "",
  [string]$MediaBaseUrlOverride = "",
  [switch]$SkipPreflight,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
if (-not $ManifestPath) {
  $ManifestPath = Join-Path $PSScriptRoot "schedule-manifest.json"
}
if (-not (Test-Path -LiteralPath $ManifestPath)) {
  throw "Missing manifest: $ManifestPath"
}

$idsPath = Join-Path $repoRoot "local-secrets\buffer_ids.ps1"
if (-not (Test-Path -LiteralPath $idsPath)) {
  throw "Missing $idsPath"
}
. $idsPath

if ([string]::IsNullOrWhiteSpace($env:BUFFER_PROFILE_IG_DEVI)) {
  throw "BUFFER_PROFILE_IG_DEVI missing in local-secrets/buffer_ids.ps1"
}

$profiles = @{
  instagram = $env:BUFFER_PROFILE_IG_DEVI.Trim()
}
if (-not [string]::IsNullOrWhiteSpace($env:BUFFER_PROFILE_FB_PAGE_DEVI)) {
  $profiles.facebook = $env:BUFFER_PROFILE_FB_PAGE_DEVI.Trim()
}

$queueScript = Join-Path $repoRoot "scripts\buffer-queue-image-post.ps1"
if (-not (Test-Path -LiteralPath $queueScript)) {
  throw "Missing $queueScript"
}

if (-not $SkipPreflight) {
  $validator = Join-Path $PSScriptRoot "validate-met-caption-cards.ps1"
  if (-not (Test-Path -LiteralPath $validator)) {
    throw "Missing preflight validator: $validator"
  }
  Write-Host "Running preflight validation..."
  & $validator
}

$manifest = Get-Content -LiteralPath $ManifestPath -Raw | ConvertFrom-Json
if (-not $manifest.posts -or $manifest.posts.Count -eq 0) {
  throw "Manifest has no posts: $ManifestPath"
}

$baseUrl = $manifest.defaults.mediaBaseUrl
if ($MediaBaseUrlOverride) {
  $baseUrl = $MediaBaseUrlOverride
}
if ([string]::IsNullOrWhiteSpace($baseUrl)) {
  throw "mediaBaseUrl missing (manifest defaults.mediaBaseUrl or -MediaBaseUrlOverride)"
}
$baseUrl = $baseUrl.TrimEnd("/")

foreach ($post in $manifest.posts) {
  if ([string]::IsNullOrWhiteSpace($post.file)) { throw "Post missing file: $($post.id)" }
  if ([string]::IsNullOrWhiteSpace($post.line)) { throw "Post missing line: $($post.id)" }
  if ([string]::IsNullOrWhiteSpace($post.dueAtUtc)) { throw "Post missing dueAtUtc: $($post.id)" }

  $hashtags = @()
  if ($manifest.defaults.hashtags) { $hashtags = @($manifest.defaults.hashtags) }

  $body = $post.line
  if ($hashtags.Count -gt 0) {
    $body = "{0}`n`n{1}" -f $post.line, ($hashtags -join " ")
  }

  $channels = @()
  if ($post.channels) { $channels = @($post.channels) }
  elseif ($manifest.defaults.channels) { $channels = @($manifest.defaults.channels) }
  if ($channels.Count -eq 0) { $channels = @("instagram") }

  $v = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
  $imageUrl = ("{0}/{1}?v={2}" -f $baseUrl, $post.file, $v)
  $due = ([DateTimeOffset]::Parse($post.dueAtUtc)).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")

  foreach ($channel in $channels) {
    $key = "$channel".ToLowerInvariant()
    if (-not $profiles.ContainsKey($key)) {
      Write-Warning "Skipping $($post.id) for unsupported/missing channel '$channel'"
      continue
    }

    if ($DryRun) {
      Write-Host ("[DRY] {0} -> {1} due {2}" -f $post.id, $key, $due)
      continue
    }

    Write-Host ("Queue {0} -> {1} due {2}" -f $post.id, $key, $due)
    $args = @{
      ChannelId = $profiles[$key]
      Service = $key
      PostType = "post"
      Text = $body
      ImageUrl = $imageUrl
      DueAt = $due
    }
    & $queueScript @args | Out-Null
    Start-Sleep -Milliseconds 700
  }
}

Write-Host "Done."
