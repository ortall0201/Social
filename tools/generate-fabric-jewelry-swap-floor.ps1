# Pose-locked floor fabric+jewelry swap — 1K nano-banana legacy.
# powershell -ExecutionPolicy Bypass -File tools/generate-fabric-jewelry-swap-floor.ps1
# powershell -ExecutionPolicy Bypass -File tools/generate-fabric-jewelry-swap-floor.ps1 -Slide 03 -Force

[CmdletBinding()]
param(
  [string]$CampaignDir = "contenty/product-campaigns/2026-07-07-fabric-jewelry-swap-floor",
  [ValidateSet("01", "02", "03", "04", "05", "all")]
  [string]$Slide = "all",
  [switch]$Force,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$repoRoot = "C:\Users\user\Desktop\Social"
if ([System.IO.Path]::IsPathRooted($CampaignDir)) {
  $campaignDir = $CampaignDir
} else {
  $campaignDir = Join-Path $repoRoot ($CampaignDir -replace '/', '\')
}

$deckPath = Join-Path $campaignDir "pose-deck.json"
if (-not (Test-Path $deckPath)) { throw "Missing $deckPath" }
$deck = Get-Content -LiteralPath $deckPath -Raw | ConvertFrom-Json

$slidesDir = Join-Path $campaignDir "slides"
$promptsDir = Join-Path $campaignDir "prompts"
New-Item -ItemType Directory -Force -Path $slidesDir, $promptsDir | Out-Null

$faceRef = $deck.faceRef
$poseRef = $deck.poseRef
$aspect = if ($deck.aspectRatio) { $deck.aspectRatio } else { "4:5" }
$modelSlug = "nano-banana"
$lockPrefix = if ($deck.poseLock) { "$($deck.poseLock)`n`n" } else { "" }

$negFile = Join-Path $campaignDir $deck.negativePromptFile
$globalNegative = if (Test-Path $negFile) { (Get-Content -LiteralPath $negFile -Raw).Trim() } else { "" }

function Resolve-ReplicateToken {
  if ($env:REPLICATE_API_TOKEN) { return $env:REPLICATE_API_TOKEN.Trim() }
  foreach ($p in @(
      (Join-Path $repoRoot "local-secrets\replicate_api_token.txt"),
      (Join-Path $repoRoot "local-secrets\replicate_access_token.txt")
    )) {
    if (Test-Path $p) { return (Get-Content -LiteralPath $p -Raw).Trim() }
  }
  $mcpPath = Join-Path $env:USERPROFILE ".cursor\mcp.json"
  if (Test-Path $mcpPath) {
    $mcp = Get-Content -LiteralPath $mcpPath -Raw | ConvertFrom-Json
    $t = $mcp.mcpServers.replicate.env.REPLICATE_API_TOKEN
    if ($t) { return $t.Trim() }
  }
  throw "No Replicate token"
}

function Get-LatestVersionId([string]$Owner, [string]$Name, [hashtable]$Headers) {
  (Invoke-RestMethod -Uri "https://api.replicate.com/v1/models/$Owner/$Name" -Headers $Headers -Method Get).latest_version.id
}

function Start-ModelPrediction([hashtable]$Body, [hashtable]$Headers, [string]$VersionId) {
  $bytes = [System.Text.Encoding]::UTF8.GetBytes(($Body | ConvertTo-Json -Depth 30 -Compress))
  for ($i = 1; $i -le 8; $i++) {
    try {
      $pred = Invoke-RestMethod -Uri "https://api.replicate.com/v1/predictions" -Headers $Headers -Method Post -ContentType "application/json; charset=utf-8" -Body $bytes
      while ($true) {
        Start-Sleep -Seconds 5
        $cur = Invoke-RestMethod -Uri $pred.urls.get -Headers $Headers -Method Get
        if ($cur.status -eq "succeeded") { return $cur }
        if ($cur.status -in @("failed", "canceled")) { throw "Prediction failed: $($cur.error)" }
      }
    } catch {
      if ($_.Exception.Message -match '429|throttled|rate limit') {
        Start-Sleep -Seconds ([Math]::Min(90, 12 * $i))
        continue
      }
      throw
    }
  }
  throw "Model prediction failed"
}

function Build-Prompt($slide) {
  $wardrobe = if ($slide.wardrobeFabric) { $slide.wardrobeFabric } elseif ($slide.styling) { $slide.styling } else { "Editorial wardrobe appropriate to slide role." }
  @"
Wardrobe fabric swap slide $($slide.id) — ROLE: $($slide.slideRole) — POSE LOCKED floor editorial.

$($deck.publicationLock)

$lockPrefix
Product lock: $($deck.productLock)
$($deck.productHeroLock)
Wardrobe fabric swap (ONLY thing that changes — Devi's clothes material/type/weave): $wardrobe
Floor fabric: UNCHANGED cream champagne silk satin pool on parquet — same as reference.
Product clarity job: $($slide.productJob)

Realism: $($deck.realismLock)
Story: $($deck.storyPromise)
Expression: Dreamy half-lidded smile — same as reference, strange but inviting. Anti: fear eyes, horror mouth, QVC point, duck face.

CRITICAL: Necklace is IDENTICAL gold coin pendant every slide. Only clothing fabric type changes. Floor silk pool unchanged.

Photorealistic campaign photography. Shot on medium-format digital, 35mm wide environmental, f/4.
Natural skin texture, HIGH CONTOUR makeup, accurate knit weave and fabric hand-feel rendering, subtle film grain.
Aspect ratio $aspect vertical. No on-image text, no logos.

Negative guidance: $globalNegative
"@.Trim()
}

$targetSlides = if ($Slide -eq "all") { @($deck.slides) } else { @($deck.slides | Where-Object { $_.id -eq $Slide }) }
if (-not $targetSlides) { throw "No slides for $Slide" }

foreach ($s in $targetSlides) {
  $prompt = Build-Prompt $s
  $promptPath = Join-Path $promptsDir ("slide-{0}.txt" -f $s.id)
  Set-Content -LiteralPath $promptPath -Value $prompt -Encoding utf8
}

if ($DryRun) {
  Write-Host ('[fabric-swap] DRY-RUN ok — prompts in ' + $promptsDir)
  exit 0
}

$token = Resolve-ReplicateToken
$headers = @{ Authorization = "Bearer $token" }
$versionId = Get-LatestVersionId "google" $modelSlug $headers
$runStamp = (Get-Date).ToString("yyyyMMdd-HHmmss")
$runPath = Join-Path $campaignDir ("run-fabric-swap-{0}.json" -f $runStamp)
$runSlides = @()

foreach ($s in $targetSlides) {
  $sid = $s.id
  $outFile = Join-Path $slidesDir ("slide-{0}.jpg" -f $sid)
  if ((Test-Path $outFile) -and -not $Force) {
    Write-Host ('[fabric-swap] slide-' + $sid + ' exists; skip')
    continue
  }

  $prompt = (Get-Content -LiteralPath (Join-Path $promptsDir ("slide-{0}.txt" -f $sid)) -Raw).Trim()
  Write-Host ('[fabric-swap] slide-' + $sid + ' nano-banana 1K pose-locked...')

  $nanoInput = [ordered]@{
    prompt = $prompt
    image_input = @($poseRef, $faceRef)
    aspect_ratio = $aspect
    output_format = "jpg"
  }
  $pred = Start-ModelPrediction @{ version = $versionId; input = $nanoInput } $headers $versionId
  $stillUrl = if ($pred.output -is [array]) { $pred.output[0] } else { $pred.output }
  Invoke-WebRequest -Uri $stillUrl -OutFile $outFile -UseBasicParsing

  $raw = & ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 $outFile 2>$null
  Write-Host ('[fabric-swap] slide-' + $sid + ' -> ' + $outFile + ' (' + $raw + ')')
  $runSlides += [ordered]@{ id = $sid; stillUrl = $stillUrl; localPath = $outFile; dimensions = $raw }
  Start-Sleep -Seconds 3
}

@{
  createdAt = (Get-Date).ToString("o")
  campaignId = $deck.campaignId
  model = $modelSlug
  resolution = "1K"
  poseRef = $poseRef
  slides = $runSlides
  status = "done"
} | ConvertTo-Json -Depth 6 | Set-Content $runPath -Encoding utf8

Write-Host ('[fabric-swap] done — ' + $runSlides.Count + ' slides')
