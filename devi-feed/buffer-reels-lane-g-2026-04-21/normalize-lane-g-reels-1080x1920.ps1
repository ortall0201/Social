# Normalize lane G reel MP4s to exact 1080x1920 (9:16) for Meta / Buffer.
# Kling outputs are often 1088x1904; Meta Reels expect 1080x1920 to avoid container errors.
# Requires ffmpeg on PATH. Run from repo root:
#   powershell -ExecutionPolicy Bypass -File devi-feed/buffer-reels-lane-g-2026-04-21/normalize-lane-g-reels-1080x1920.ps1

[CmdletBinding()]
param(
  [string]$Folder = ""
)

$ErrorActionPreference = "Stop"
if (-not $Folder) {
  $Folder = $PSScriptRoot
}
$ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue
if (-not $ffmpeg) {
  throw "ffmpeg not found on PATH. Install ffmpeg and retry."
}

$vf = "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1"
Get-ChildItem -LiteralPath $Folder -Filter "*.mp4" | ForEach-Object {
  $in = $_.FullName
  $tmp = "$in.tmp1080.mp4"
  Write-Host "Normalizing $($_.Name) -> 1080x1920"
  & ffmpeg -y -hide_banner -loglevel error -i $in -vf $vf -c:v libx264 -crf 18 -preset medium -an $tmp
  if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed for $($_.Name)" }
  Move-Item -LiteralPath $tmp -Destination $in -Force
}
Write-Host "Done."
