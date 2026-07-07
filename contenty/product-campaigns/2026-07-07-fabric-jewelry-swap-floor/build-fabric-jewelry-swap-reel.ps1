# Build autoplay reel from fabric-jewelry-swap floor slides (xfade, lane-G spec).
# powershell -ExecutionPolicy Bypass -File contenty/product-campaigns/2026-07-07-fabric-jewelry-swap-floor/build-fabric-jewelry-swap-reel.ps1

[CmdletBinding()]
param(
  [string]$RepoRoot = "C:\Users\user\Desktop\Social",
  [double]$SlideSeconds = 2.5,
  [double]$XfadeSeconds = 0.45,
  [switch]$UseSignedSlides
)

$ErrorActionPreference = "Stop"
$campaignDir = Join-Path $RepoRoot "contenty\product-campaigns\2026-07-07-fabric-jewelry-swap-floor"
$slidesDir = Join-Path $campaignDir "slides"
if ($UseSignedSlides) {
  $signedDir = Join-Path $slidesDir "signed"
  if (-not (Test-Path $signedDir)) { throw 'Missing signed slides - run sign-iris-productions-slides.ps1 first' }
  $slidesDir = $signedDir
}
$outFile = Join-Path $campaignDir "fabric-jewelry-swap-floor-reel.mp4"
$fps = 30
$slideFrames = [int][Math]::Round($SlideSeconds * $fps)
$vf = 'scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1,format=yuv420p'

function Invoke-CrossfadeStitch {
  param([string[]]$SegPaths, [double]$Xfade, [string]$Out)
  if ($SegPaths.Count -eq 1) { Copy-Item $SegPaths[0] $Out -Force; return }
  $durations = foreach ($p in $SegPaths) {
    [double](ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 $p)
  }
  $xf = [string]::Format([System.Globalization.CultureInfo]::InvariantCulture, "{0:0.###}", $Xfade)
  $inputs = @()
  for ($i = 0; $i -lt $SegPaths.Count; $i++) { $inputs += "-i"; $inputs += $SegPaths[$i] }
  if ($SegPaths.Count -eq 2) {
    $offset = [string]::Format([System.Globalization.CultureInfo]::InvariantCulture, "{0:0.###}", ($durations[0] - $Xfade))
    $filter = "[0:v][1:v]xfade=transition=fade:duration=${xf}:offset=${offset}[v]"
  } else {
    $parts = @(); $prev = "[0:v]"
    for ($i = 1; $i -lt $SegPaths.Count; $i++) {
      $offsetVal = 0.0
      for ($j = 0; $j -lt $i; $j++) { $offsetVal += ($durations[$j] - $Xfade) }
      $offset = [string]::Format([System.Globalization.CultureInfo]::InvariantCulture, "{0:0.###}", $offsetVal)
      $outLabel = if ($i -eq ($SegPaths.Count - 1)) { "[v]" } else { "[v$i]" }
      $parts += "${prev}[$i`:v]xfade=transition=fade:duration=${xf}:offset=${offset}${outLabel}"
      $prev = $outLabel
    }
    $filter = $parts -join ";"
  }
  & ffmpeg -y -hide_banner -loglevel error @inputs -filter_complex $filter -map "[v]" -an `
    -c:v libx264 -profile:v high -pix_fmt yuv420p -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 `
    -b:v 4M -maxrate 5M -bufsize 10M -movflags +faststart $Out
  if ($LASTEXITCODE -ne 0) { throw "xfade failed" }
}

$work = Join-Path $env:TEMP ("fabric-swap-{0}" -f ([guid]::NewGuid().ToString("N").Substring(0,8)))
New-Item -ItemType Directory -Force -Path $work | Out-Null
$segPaths = @()
for ($i = 1; $i -le 5; $i++) {
  $slide = Join-Path $slidesDir ("slide-{0:D2}.jpg" -f $i)
  if (-not (Test-Path $slide)) { throw ('Missing ' + $slide + ' - run generate-fabric-jewelry-swap-floor.ps1 first') }
  $seg = Join-Path $work "seg-$i.mp4"
  & ffmpeg -y -hide_banner -loglevel error -loop 1 -i $slide -frames:v $slideFrames -vf $vf -r $fps -an `
    -c:v libx264 -profile:v high -pix_fmt yuv420p -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 `
    -b:v 4M -maxrate 5M -bufsize 10M -g $fps -keyint_min $fps -movflags +faststart $seg
  if ($LASTEXITCODE -ne 0) { throw "segment $i failed" }
  $segPaths += $seg
}

Write-Host "Stitching fabric-jewelry-swap reel..."
Invoke-CrossfadeStitch -SegPaths $segPaths -Xfade $XfadeSeconds -Out $outFile
Remove-Item $work -Recurse -Force
ffprobe -v error -show_entries format=duration,size -of default=noprint_wrappers=1 $outFile
Write-Host "Built $outFile"
