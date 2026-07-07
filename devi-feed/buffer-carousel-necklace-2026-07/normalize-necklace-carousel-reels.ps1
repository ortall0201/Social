# Normalize necklace carousel reels for Buffer preview (same spec as lane G).
# powershell -ExecutionPolicy Bypass -File devi-feed/buffer-carousel-necklace-2026-07/normalize-necklace-carousel-reels.ps1

[CmdletBinding()]
param(
  [string]$Folder = ""
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
if (-not $Folder) {
  $Folder = Join-Path $repoRoot "buffer-delivery"
}

$targets = @(
  "necklace-carousel-arm-a-hq-reel.mp4",
  "necklace-carousel-arm-b-draft-reel.mp4"
)

$vf = "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1,format=yuv420p,fps=30"

foreach ($name in $targets) {
  $in = Join-Path $Folder $name
  if (-not (Test-Path -LiteralPath $in)) { throw "Missing $in" }
  $tmp = "$in.tmp-normalized.mp4"
  Write-Host "Normalizing $name"
  & ffmpeg -y -hide_banner -loglevel error `
    -i $in `
    -f lavfi -i anullsrc=r=48000:cl=stereo `
    -map 0:v:0 -map 1:a:0 `
    -vf $vf `
    -c:v libx264 -profile:v high -pix_fmt yuv420p -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 -crf 18 -preset medium `
    -c:a aac -b:a 128k `
    -movflags +faststart `
    -shortest `
    $tmp
  if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed for $name" }
  Move-Item -LiteralPath $tmp -Destination $in -Force
  ffprobe -v error -show_entries stream=codec_name,pix_fmt -show_entries format=duration,size -of default=noprint_wrappers=1 $in
}

Write-Host "Done."
