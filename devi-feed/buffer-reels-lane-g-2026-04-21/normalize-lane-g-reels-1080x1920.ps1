# Normalize lane G reel MP4s for Instagram / Buffer preview reliability.
# - Frame size: 1080x1920 (9:16), SAR 1:1
# - Frame rate: 30 fps (Kling is often 24; IG recommends 30 — avoids "off" playback in some previews)
# - moov atom: +faststart (progressive download — Buffer/browser preview closer to IG)
# - Audio: silent AAC stereo (some upload paths expect an audio track; keeps container conventional)
#
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

$vf = "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30"
Get-ChildItem -LiteralPath $Folder -Filter "*.mp4" | ForEach-Object {
  $in = $_.FullName
  $tmp = "$in.tmp1080.mp4"
  Write-Host "Normalizing $($_.Name) -> 1080x1920, 30fps, faststart, silent AAC"
  & ffmpeg -y -hide_banner -loglevel error `
    -i $in `
    -f lavfi -i anullsrc=r=48000:cl=stereo `
    -map 0:v:0 -map 1:a:0 `
    -vf $vf `
    -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 18 -preset medium `
    -c:a aac -b:a 128k `
    -movflags +faststart `
    -shortest `
    $tmp
  if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed for $($_.Name)" }
  Move-Item -LiteralPath $tmp -Destination $in -Force
}
Write-Host "Done."
