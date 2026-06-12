[CmdletBinding()]
param(
  [string]$ManifestPath = "",
  [string]$MediaFolder = "",
  [switch]$Strict
)

$ErrorActionPreference = "Stop"

if (-not $ManifestPath) { $ManifestPath = Join-Path $PSScriptRoot "schedule-manifest.json" }
if (-not $MediaFolder) { $MediaFolder = Join-Path (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path "buffer-delivery" }

$manifest = Get-Content -LiteralPath $ManifestPath -Raw | ConvertFrom-Json
$missingFiles = @()
foreach ($post in $manifest.posts) {
  $path = Join-Path $MediaFolder $post.file
  if (-not (Test-Path -LiteralPath $path)) { $missingFiles += $post.file }
}

Write-Host "Manifest: $ManifestPath"
Write-Host "Media folder: $MediaFolder"
Write-Host "Posts: $($manifest.posts.Count)"
if ($missingFiles.Count -gt 0) {
  Write-Host "Missing files:"
  $missingFiles | ForEach-Object { Write-Host " - $_" }
  if ($Strict) { throw "Missing $($missingFiles.Count) media file(s)." }
  exit 1
}

foreach ($post in $manifest.posts) {
  $path = Join-Path $MediaFolder $post.file
  $dur = ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 $path 2>$null
  if ($dur) { Write-Host ("{0}: {1:N1}s" -f $post.file, [double]$dur) }
  $caption = "$($post.caption)"
  if ($caption -notmatch "@Manychat") { throw "Contest gate: caption must tag @Manychat for $($post.id)." }
  if (($manifest.defaults.hashtags -join " ") -notmatch "#MyRealJob") { throw "Contest gate: defaults.hashtags must include #MyRealJob." }
}

Write-Host "Validation OK — contest manifest + media present."
exit 0
