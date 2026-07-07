# Burn cinematic "Iris Productions" signature onto wardrobe-fabric-swap slides.
# powershell -ExecutionPolicy Bypass -File contenty/product-campaigns/2026-07-07-fabric-jewelry-swap-floor/sign-iris-productions-slides.ps1

[CmdletBinding()]
param(
  [string]$RepoRoot = "C:\Users\user\Desktop\Social"
)

$ErrorActionPreference = "Stop"
$campaignDir = Join-Path $RepoRoot "contenty\product-campaigns\2026-07-07-fabric-jewelry-swap-floor"
$slidesDir = Join-Path $campaignDir "slides"
$signedDir = Join-Path $slidesDir "signed"
New-Item -ItemType Directory -Force -Path $signedDir | Out-Null

$scriptFontSrc = "C:\Windows\Fonts\ITCEDSCR.TTF"
$sansFontSrc = "C:\Windows\Fonts\segoeui.ttf"
if (-not (Test-Path $scriptFontSrc)) { $scriptFontSrc = "C:\Windows\Fonts\BRUSHSCI.TTF" }
if (-not (Test-Path $sansFontSrc)) { throw "Missing sans font for credit line" }

Copy-Item -LiteralPath $scriptFontSrc -Destination (Join-Path $campaignDir "credit-script.ttf") -Force
Copy-Item -LiteralPath $sansFontSrc -Destination (Join-Path $campaignDir "credit-sans.ttf") -Force

# Center-bottom film credit: flowing script "Iris" + tracked small-caps line underneath.
$draw = @(
  "drawtext=fontfile=credit-script.ttf:text=Iris:fontcolor=white@0.94:fontsize=78:borderw=1:bordercolor=black@0.22:shadowcolor=black@0.55:shadowx=2:shadowy=3:x=(w-tw)/2:y=h-128",
  "drawtext=fontfile=credit-sans.ttf:text=P\ R\ O\ D\ U\ C\ T\ I\ O\ N\ S:fontcolor=white@0.82:fontsize=14:borderw=1:bordercolor=black@0.18:shadowcolor=black@0.45:shadowx=1:shadowy=2:x=(w-tw)/2:y=h-58"
) -join ","

Push-Location $campaignDir
try {
  for ($i = 1; $i -le 5; $i++) {
    $nn = '{0:D2}' -f $i
    $src = Join-Path $slidesDir ("slide-{0}.jpg" -f $nn)
    $dst = Join-Path $signedDir ("slide-{0}.jpg" -f $nn)
    if (-not (Test-Path $src)) { throw "Missing $src" }
    & ffmpeg -y -hide_banner -loglevel error -i $src -vf $draw -q:v 2 $dst
    if ($LASTEXITCODE -ne 0) { throw ('sign failed slide ' + $nn) }
    Write-Host ('Signed slide-' + $nn + ' -> ' + $dst)
  }
}
finally {
  Pop-Location
}

Write-Host ('Done. Cinematic signature slides in ' + $signedDir)
