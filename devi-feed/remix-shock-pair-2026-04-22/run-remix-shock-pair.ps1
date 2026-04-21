# Run top-2-view remixes: google/nano-banana still -> kwaivgi/kling-v2.5-turbo-pro i2v
# Requires Replicate token (https://replicate.com/account/api-tokens) from one of:
#   1) env:REPLICATE_API_TOKEN (process/user/machine)
#   2) local-secrets/replicate_api_token.txt (or replicate_access_token.txt)
#   3) ~/.cursor/mcp.json -> mcpServers.replicate.env.REPLICATE_API_TOKEN
#
# From repo root:
#   $env:REPLICATE_API_TOKEN = "<token>"
#   powershell -ExecutionPolicy Bypass -File devi-feed/remix-shock-pair-2026-04-22/run-remix-shock-pair.ps1
#
# Outputs under ./output/ next to this script.

$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$outDir = Join-Path $here "output"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Resolve-ReplicateToken {
  if (-not [string]::IsNullOrWhiteSpace($env:REPLICATE_API_TOKEN)) {
    return @{ token = $env:REPLICATE_API_TOKEN; source = "env:REPLICATE_API_TOKEN (process)" }
  }

  $userToken = [Environment]::GetEnvironmentVariable("REPLICATE_API_TOKEN", "User")
  if (-not [string]::IsNullOrWhiteSpace($userToken)) {
    return @{ token = $userToken; source = "REPLICATE_API_TOKEN (user env)" }
  }

  $machineToken = [Environment]::GetEnvironmentVariable("REPLICATE_API_TOKEN", "Machine")
  if (-not [string]::IsNullOrWhiteSpace($machineToken)) {
    return @{ token = $machineToken; source = "REPLICATE_API_TOKEN (machine env)" }
  }

  $repoRoot = Resolve-Path (Join-Path $here "..\..")
  $localSecretCandidates = @(
    (Join-Path $repoRoot "local-secrets\replicate_api_token.txt"),
    (Join-Path $repoRoot "local-secrets\replicate_access_token.txt")
  )
  foreach ($path in $localSecretCandidates) {
    if (Test-Path $path) {
      $val = (Get-Content -Path $path -Raw).Trim()
      if (-not [string]::IsNullOrWhiteSpace($val)) {
        return @{ token = $val; source = $path }
      }
    }
  }

  $cursorMcpPath = Join-Path $HOME ".cursor\mcp.json"
  if (Test-Path $cursorMcpPath) {
    try {
      $mcpJson = Get-Content -Path $cursorMcpPath -Raw | ConvertFrom-Json
      $mcpToken = $mcpJson.mcpServers.replicate.env.REPLICATE_API_TOKEN
      if (-not [string]::IsNullOrWhiteSpace($mcpToken)) {
        return @{ token = $mcpToken; source = "$cursorMcpPath (mcpServers.replicate.env.REPLICATE_API_TOKEN)" }
      }
    } catch {
      Write-Warning "Failed parsing ${cursorMcpPath}: $($_.Exception.Message)"
    }
  }

  return $null
}

$tokenInfo = Resolve-ReplicateToken
if ($null -eq $tokenInfo -or [string]::IsNullOrWhiteSpace($tokenInfo.token)) {
  throw "Replicate token not found. Set env REPLICATE_API_TOKEN, or create local-secrets/replicate_api_token.txt, or configure Cursor MCP replicate token."
}
$token = $tokenInfo.token
Write-Host ("Using Replicate token from: {0}" -f $tokenInfo.source)

$faceUrl = "https://raw.githubusercontent.com/ortall0201/Social/main/devi-identity/images/devi-face-primary.png"
$klingVersion = "18f41bfca7f1997ce37b04b407152c385c9159095681a6f5a4ff47718bc25a57"

$neg = "blurry, distorted, low quality, extra limbs, exaggerated motion, sudden movement, fake, robotic movements, morphing face, deformed hands, watermark, text overlay, logos, extra fingers"

$reels = @(
  @{
    slug = "soft-touch-radiant-glow"
    nano_prompt = @"
Devi, face locked to reference portrait. Editorial beauty — dewy glass skin, rose-cream tones, subtle highlight on cheekbones. One hand raised toward cheek (fingers soft, nails clean). Luxe minimal jewelry (thin ear stack or single statement ear). Hair: polished, natural color, off-face or soft wave. Background: cream seamless or soft gradient — no logos. 3/4 or portrait, eyes to lens. Photoreal, fashion campaign energy (not clinical skincare ad).
"@
    kling_prompt = @"
A real woman with short rainbow-streak hair and fair skin, cinematic beauty editorial, photoreal. Seconds 0-1: extreme ambiguous macro close-up — skin or glitter texture at wrong scale so the viewer cannot tell what body part it is yet; subtle breathing motion or pulse of light; unsettling but not gore. Seconds 1-2.5: hard flash or match-cut on a highlight — land on clear medium shot of her face with one hand at cheek, dewy rose-cream radiant finish, eyes to camera. Seconds 2.5-6: slow hand glides along jaw and cheek; micro head tilt; catchlights move; slow camera push or subtle orbit. Seconds 6-10: editorial hold, subtle breathing, optional tiny restrained smile; cream seamless background; no on-screen text; no logos.
"@
  },
  @{
    slug = "glow-gloss-lip"
    nano_prompt = @"
Devi, face locked to reference portrait. High-gloss lip (glass finish), defined cupid's bow, healthy glass skin. Eyes sharp and visible (no heavy shadow that hides gaze). Hair: sleek or soft wave, natural color, pushed back so mouth zone reads. Minimal outfit hint — silk strap or bare shoulders implied; no busy patterns. Background: deep charcoal or soft mauve gradient — no logos. Tight beauty framing — face dominates frame; lips hero. Photoreal campaign lighting.
"@
    kling_prompt = @"
A real woman with short rainbow-streak hair and fair skin, cinematic beauty close-up, photoreal. Seconds 0-1: macro lip fills frame with distorted mirror reflection or wrong color temperature (too cold or too magenta) so it feels off for one beat; subtle smear like wiping steam from glass. Seconds 1-2.5: horizontal wipe or snap transition — correct skin tone and perfect glass gloss; eyes enter frame sharp. Seconds 2.5-6: slow pull back to full face; she presses lips lightly; gloss catchlight travels; tiny chin lift. Seconds 6-10: editorial stare toward lens; optional micro-smile; no speaking; charcoal or mauve gradient background; no on-screen text; no logos.
"@
  }
)

function Get-ModelVersionId([string]$owner, [string]$name) {
  $u = "https://api.replicate.com/v1/models/$owner/$name"
  $r = Invoke-RestMethod -Uri $u -Headers @{ Authorization = "Bearer $token" } -Method Get
  return $r.latest_version.id
}

function Wait-Prediction([string]$getUrl) {
  while ($true) {
    $p = Invoke-RestMethod -Uri $getUrl -Headers @{ Authorization = "Bearer $token" } -Method Get
    if ($p.status -eq "succeeded") { return $p }
    if ($p.status -eq "failed" -or $p.status -eq "canceled") {
      throw ("Prediction failed: " + ($p.error | ConvertTo-Json -Compress))
    }
    Start-Sleep -Seconds 3
  }
}

function Start-Prediction([hashtable]$body) {
  $u = "https://api.replicate.com/v1/predictions"
  $json = ($body | ConvertTo-Json -Depth 12 -Compress)
  if ($env:REPLICATE_DEBUG_JSON -eq "1") {
    $debugPath = Join-Path $outDir "last-replicate-request.json"
    Set-Content -Path $debugPath -Value $json -Encoding utf8
    Write-Host "Debug JSON written: $debugPath"
  }
  $jsonBytes = [System.Text.Encoding]::UTF8.GetBytes($json)
  $p = Invoke-RestMethod -Uri $u -Headers @{ Authorization = "Bearer $token" } -Method Post -ContentType "application/json; charset=utf-8" -Body $jsonBytes
  return Wait-Prediction $p.urls.get
}

$nanoVersion = Get-ModelVersionId "google" "nano-banana"
Write-Host "nano-banana version: $nanoVersion"

foreach ($reel in $reels) {
  $slug = $reel.slug
  Write-Host "`n=== STILL: $slug ==="
  $nanoInput = @{
    prompt        = $reel.nano_prompt.Trim()
    image_input   = @($faceUrl)
    aspect_ratio  = "9:16"
    output_format = "jpg"
  }
  $predStill = Start-Prediction @{
    version = $nanoVersion
    input   = $nanoInput
  }
  $stillUrl = $predStill.output
  if (-not $stillUrl) { throw "No still output URL for $slug" }
  $stillPath = Join-Path $outDir ("devi-remix-{0}-image.jpg" -f $slug)
  Invoke-WebRequest -Uri $stillUrl -OutFile $stillPath -UseBasicParsing
  Write-Host "Still: $stillPath"

  Write-Host "`n=== KLING: $slug ==="
  $klingInput = @{
    start_image      = $stillUrl
    prompt           = $reel.kling_prompt.Trim()
    negative_prompt  = $neg
    duration         = 10
    aspect_ratio     = "9:16"
  }
  $predVid = Start-Prediction @{
    version = $klingVersion
    input   = $klingInput
  }
  $vidUrl = $predVid.output
  if ($null -eq $vidUrl -and $predVid.output -is [array]) { $vidUrl = $predVid.output[0] }
  $mp4Path = Join-Path $outDir ("devi-remix-{0}-reel.mp4" -f $slug)
  Invoke-WebRequest -Uri $vidUrl -OutFile $mp4Path -UseBasicParsing
  Write-Host "Reel: $mp4Path"
}

Write-Host "`nDone. Review outputs in: $outDir"
