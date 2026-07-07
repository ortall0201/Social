# Build Buffer-ready autoplay carousel reels from slide JPGs (lane-G spec + smooth xfade).
# powershell -ExecutionPolicy Bypass -File devi-feed/buffer-carousel-necklace-2026-07/build-necklace-carousel-reels-for-buffer.ps1
# powershell -ExecutionPolicy Bypass -File ... -ArmOnly arm-b-draft-4k

[CmdletBinding()]
param(
  [string]$RepoRoot = "C:\Users\user\Desktop\Social",
  [ValidateSet("", "arm-a-hq", "arm-b-draft", "arm-b-draft-4k")]
  [string]$ArmOnly = "",
  [double]$SlideSeconds = 2.5,
  [double]$XfadeSeconds = 0.45
)

$ErrorActionPreference = "Stop"
$srcRoot = Join-Path $RepoRoot "devi-feed\buffer-carousel-necklace-2026-07"
$outRoot = Join-Path $RepoRoot "buffer-delivery"

$arms = @(
  @{ name = "necklace-carousel-arm-a-hq-reel.mp4"; slides = Join-Path $srcRoot "arm-a-hq" },
  @{ name = "necklace-carousel-arm-b-draft-reel.mp4"; slides = Join-Path $srcRoot "arm-b-draft" },
  @{ name = "necklace-carousel-arm-b-draft-4k-reel.mp4"; slides = Join-Path $srcRoot "arm-b-draft-4k"; publishAs = "necklace-carousel-arm-b-draft-reel.mp4" }
)

$fps = 30
$slideFrames = [int][Math]::Round($SlideSeconds * $fps)
# Static hold per slide — motion comes from crossfade only (no per-segment zoom reset).
$vf = 'scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1,format=yuv420p'

function Invoke-CrossfadeStitch {
  param(
    [Parameter(Mandatory = $true)][string[]]$SegPaths,
    [Parameter(Mandatory = $true)][double]$Xfade,
    [Parameter(Mandatory = $true)][string]$OutFile
  )

  if ($SegPaths.Count -eq 1) {
    Copy-Item -LiteralPath $SegPaths[0] -Destination $OutFile -Force
    return
  }

  $durations = @()
  foreach ($p in $SegPaths) {
    $dur = ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 $p 2>$null
    if (-not $dur) { throw "Could not read duration: $p" }
    $durations += [double]$dur
  }

  $xf = [string]::Format([System.Globalization.CultureInfo]::InvariantCulture, "{0:0.###}", $Xfade)
  $inputs = @()
  for ($i = 0; $i -lt $SegPaths.Count; $i++) {
    $inputs += "-i"
    $inputs += $SegPaths[$i]
  }

  if ($SegPaths.Count -eq 2) {
    $offset = [string]::Format([System.Globalization.CultureInfo]::InvariantCulture, "{0:0.###}", ($durations[0] - $Xfade))
    $filter = "[0:v][1:v]xfade=transition=fade:duration=${xf}:offset=${offset}[v]"
  }
  else {
    $parts = @()
    $prev = "[0:v]"
    for ($i = 1; $i -lt $SegPaths.Count; $i++) {
      $offsetVal = 0.0
      for ($j = 0; $j -lt $i; $j++) { $offsetVal += ($durations[$j] - $Xfade) }
      $offset = [string]::Format([System.Globalization.CultureInfo]::InvariantCulture, "{0:0.###}", $offsetVal)
      $nextIn = "[$i`:v]"
      $outLabel = if ($i -eq ($SegPaths.Count - 1)) { "[v]" } else { "[v$i]" }
      $parts += "${prev}${nextIn}xfade=transition=fade:duration=${xf}:offset=${offset}${outLabel}"
      $prev = $outLabel
    }
    $filter = $parts -join ";"
  }

  & ffmpeg -y -hide_banner -loglevel error @inputs `
    -filter_complex $filter -map "[v]" -an `
    -c:v libx264 -profile:v high -pix_fmt yuv420p -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 `
    -b:v 4M -maxrate 5M -bufsize 10M -movflags +faststart $OutFile
  if ($LASTEXITCODE -ne 0) { throw "xfade stitch failed" }
}

if ($ArmOnly) {
  $arms = @($arms | Where-Object { $_.slides -match [regex]::Escape($ArmOnly) })
}

foreach ($arm in $arms) {
  $work = Join-Path $env:TEMP ("necklace-build-{0}" -f ([guid]::NewGuid().ToString("N").Substring(0,8)))
  New-Item -ItemType Directory -Force -Path $work | Out-Null
  $segPaths = @()
  for ($i = 1; $i -le 5; $i++) {
    $nn = "{0:D2}" -f $i
    $slide = Join-Path $arm.slides "slide-$nn.jpg"
    if (-not (Test-Path -LiteralPath $slide)) { throw "Missing $slide" }
    $seg = Join-Path $work "seg-$nn.mp4"
    & ffmpeg -y -hide_banner -loglevel error -loop 1 -i $slide -frames:v $slideFrames `
      -vf $vf -r $fps -an `
      -c:v libx264 -profile:v high -pix_fmt yuv420p -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 `
      -b:v 4M -maxrate 5M -bufsize 10M -g $fps -keyint_min $fps -movflags +faststart $seg
    if ($LASTEXITCODE -ne 0) { throw "segment failed $slide" }
    $segPaths += $seg
  }

  $outName = if ($arm.publishAs) { $arm.publishAs } else { $arm.name }
  $out = Join-Path $outRoot $outName
  Write-Host "Stitching $outName (${SlideSeconds}s/slide, ${XfadeSeconds}s xfade)..."
  Invoke-CrossfadeStitch -SegPaths $segPaths -Xfade $XfadeSeconds -OutFile $out
  Remove-Item -LiteralPath $work -Recurse -Force
  ffprobe -v error -show_entries stream=pix_fmt,codec_type -show_entries format=duration,bit_rate,size -of default=noprint_wrappers=1 $out
  Write-Host "Built $outName"
}

Write-Host "Done. Output -> $outRoot"
