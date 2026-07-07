# Build Buffer-ready autoplay carousel reels from IG slide JPGs (lane-G spec).
# powershell -ExecutionPolicy Bypass -File devi-feed/buffer-carousel-necklace-2026-07/build-necklace-carousel-reels-for-buffer.ps1

[CmdletBinding()]
param(
  [string]$RepoRoot = "C:\Users\user\Desktop\Social"
)

$ErrorActionPreference = "Stop"
$srcRoot = Join-Path $RepoRoot "devi-feed\buffer-carousel-necklace-2026-07"
$outRoot = Join-Path $RepoRoot "buffer-delivery"

$arms = @(
  @{ name = "necklace-carousel-arm-a-hq-reel.mp4"; slides = Join-Path $srcRoot "arm-a-hq" },
  @{ name = "necklace-carousel-arm-b-draft-reel.mp4"; slides = Join-Path $srcRoot "arm-b-draft" }
)

$vf = "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1,format=yuv420p,fps=30"
$slideDur = 1.2

foreach ($arm in $arms) {
  $work = Join-Path $env:TEMP ("necklace-build-{0}" -f ([guid]::NewGuid().ToString("N").Substring(0,8)))
  New-Item -ItemType Directory -Force -Path $work | Out-Null
  $segPaths = @()
  for ($i = 1; $i -le 5; $i++) {
    $nn = "{0:D2}" -f $i
    $slide = Join-Path $arm.slides "slide-$nn.jpg"
    if (-not (Test-Path -LiteralPath $slide)) { throw "Missing $slide" }
    $seg = Join-Path $work "seg-$nn.mp4"
    & ffmpeg -y -hide_banner -loglevel error -loop 1 -i $slide -t $slideDur `
      -vf $vf -an `
      -c:v libx264 -profile:v high -pix_fmt yuv420p -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 `
      -b:v 4M -maxrate 5M -bufsize 10M -g 30 -movflags +faststart $seg
    if ($LASTEXITCODE -ne 0) { throw "segment failed $slide" }
    $segPaths += $seg
  }
  $list = Join-Path $work "concat.txt"
  ($segPaths | ForEach-Object { "file '$($_ -replace '\\','/')'" }) | Set-Content -LiteralPath $list -Encoding ascii
  $out = Join-Path $outRoot $arm.name
  & ffmpeg -y -hide_banner -loglevel error -f concat -safe 0 -i $list -c copy -movflags +faststart $out
  if ($LASTEXITCODE -ne 0) { throw "concat failed $($arm.name)" }
  Remove-Item -LiteralPath $work -Recurse -Force
  ffprobe -v error -show_entries stream=pix_fmt,codec_type -show_entries format=duration,bit_rate,size -of default=noprint_wrappers=1 $out
  Write-Host "Built $($arm.name)"
}

Write-Host "Done. Output -> $outRoot"
