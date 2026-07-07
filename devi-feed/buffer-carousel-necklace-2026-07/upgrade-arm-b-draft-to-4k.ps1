# Lock 1K draft composition -> Seedream 4.5 4K (Arm B same creative, HQ pixels).
# powershell -ExecutionPolicy Bypass -File devi-feed/buffer-carousel-necklace-2026-07/upgrade-arm-b-draft-to-4k.ps1

[CmdletBinding()]
param(
  [string]$RepoRoot = "C:\Users\user\Desktop\Social",
  [ValidateSet("01", "02", "03", "04", "05", "all")]
  [string]$Slide = "all",
  [switch]$Force
)

$ErrorActionPreference = "Stop"
$campaignDir = Join-Path $RepoRoot "contenty\product-campaigns\2026-07-07-necklace-pilot"
$packDir = Join-Path $RepoRoot "devi-feed\buffer-carousel-necklace-2026-07"
$outDir = Join-Path $packDir "arm-b-draft-4k"
$draftDir = Join-Path $packDir "arm-b-draft"
$promptsDir = Join-Path $campaignDir "prompts"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$faceRef = "https://raw.githubusercontent.com/ortall0201/Social/main/devi-identity/images/devi-face-primary.png"
$draftBase = "https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/buffer-carousel-necklace-2026-07/arm-b-draft"
$lockPrefix = "EXACT RECREATION of the reference photograph. Preserve identical composition, pose, body line, product placement, props, lighting, wardrobe, and set dressing. 4K photoreal refinement only - do not invent a new scene or change the layout.`n`n"

function Resolve-ReplicateToken {
  if ($env:REPLICATE_API_TOKEN) { return $env:REPLICATE_API_TOKEN.Trim() }
  foreach ($p in @(
      (Join-Path $RepoRoot "local-secrets\replicate_api_token.txt"),
      (Join-Path $RepoRoot "local-secrets\replicate_access_token.txt")
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

function Start-Seedream {
  param(
    [Parameter(Mandatory = $true)][hashtable]$SeedreamBody,
    [Parameter(Mandatory = $true)][hashtable]$Headers
  )
  $uri = "https://api.replicate.com/v1/models/bytedance/seedream-4.5/predictions"
  $bytes = [System.Text.Encoding]::UTF8.GetBytes((@{ input = $SeedreamBody } | ConvertTo-Json -Depth 20 -Compress))
  for ($i = 1; $i -le 8; $i++) {
    try {
      $pred = Invoke-RestMethod -Uri $uri -Headers $Headers -Method Post -ContentType "application/json; charset=utf-8" -Body $bytes
      while ($true) {
        Start-Sleep -Seconds 4
        $cur = Invoke-RestMethod -Uri $pred.urls.get -Headers $Headers -Method Get
        if ($cur.status -eq "succeeded") { return $cur }
        if ($cur.status -in @("failed", "canceled")) { throw "Seedream failed: $($cur.error)" }
      }
    }
    catch {
      if ($_.Exception.Message -match '429|throttled|rate limit') { Start-Sleep -Seconds ([Math]::Min(90, 8 * $i)); continue }
      throw
    }
  }
  throw "Seedream rate limited"
}

$token = Resolve-ReplicateToken
$headers = @{ Authorization = "Bearer $token" }
$slides = if ($Slide -eq "all") { @("01", "02", "03", "04", "05") } else { @($Slide) }
$run = [ordered]@{ createdAt = (Get-Date).ToString("o"); slides = @(); status = "in_progress" }

foreach ($sid in $slides) {
  $outFile = Join-Path $outDir ("slide-{0}.jpg" -f $sid)
  if ((Test-Path $outFile) -and -not $Force) {
    Write-Host "[arm-b-4k] slide-$sid exists; skip"
    continue
  }
  $draftLocal = Join-Path $draftDir ("slide-{0}.jpg" -f $sid)
  if (-not (Test-Path $draftLocal)) {
    $draftLocal = Join-Path (Join-Path $campaignDir "slides") ("slide-{0}.jpg" -f $sid)
  }
  if (-not (Test-Path $draftLocal)) { throw "Missing draft slide $sid" }

  $promptPath = Join-Path $promptsDir ("slide-{0}.txt" -f $sid)
  if (-not (Test-Path $promptPath)) { throw "Missing $promptPath" }
  $prompt = $lockPrefix + (Get-Content -LiteralPath $promptPath -Raw).Trim()
  if ($prompt.Length -gt 3900) {
    $prompt = $prompt.Substring(0, 3900)
  }

  $refUrl = "$draftBase/slide-$sid.jpg"
  Write-Host "[arm-b-4k] slide-$sid Seedream 4K (draft-locked)..."
  $seedreamInput = [ordered]@{
    prompt = $prompt
    image_input = @($refUrl, $faceRef)
    size = "4K"
    aspect_ratio = "3:4"
    max_images = 1
    sequential_image_generation = "disabled"
  }
  $pred = Start-Seedream -SeedreamBody $seedreamInput -Headers $headers
  $url = if ($pred.output -is [array]) { $pred.output[0] } else { $pred.output }
  Invoke-WebRequest -Uri $url -OutFile $outFile -UseBasicParsing
  $dim = & ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 $outFile 2>$null
  Write-Host "[arm-b-4k] slide-$sid -> $outFile ($dim)"
  $run.slides += [ordered]@{ id = $sid; ref = $refUrl; localPath = $outFile; dimensions = $dim }
  Start-Sleep -Seconds 10
}

$run.status = "done"
$runPath = Join-Path $packDir ("run-arm-b-draft-4k-{0}.json" -f (Get-Date -Format "yyyyMMdd-HHmmss"))
$run | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $runPath -Encoding utf8
Write-Host "Done -> $outDir"
