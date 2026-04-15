# Retry scheduling feed45 Buffer batch until Buffer accepts (or a non rate-limit error occurs).
# Use when the API returns RATE_LIMIT_EXCEEDED and you can leave the machine on.
#
# From repo root:
#   powershell -ExecutionPolicy Bypass -File devi-feed/imagegen-buffer-2026-04-16/run-feed45-buffer-batch-retry.ps1
#
# Options:
#   -RetryIntervalMinutes 45   (default 60)
#   -MaxAttempts 0             (0 = unlimited until success; default 0)
#   -StartUtc "2026-04-17T17:00:00Z"  (passed through to schedule-feed45-buffer-batch.ps1)

[CmdletBinding()]
param(
  [int]$RetryIntervalMinutes = 60,
  [int]$MaxAttempts = 0,
  [string]$StartUtc = ""
)

$ErrorActionPreference = "Stop"
$here = $PSScriptRoot
$batchScript = Join-Path $here "schedule-feed45-buffer-batch.ps1"
$logFile = Join-Path $here "buffer-batch-retry.log"

if (-not (Test-Path -LiteralPath $batchScript)) {
  throw "Missing batch script: $batchScript"
}

function Write-Log([string]$Line) {
  $ts = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
  $entry = "[$ts] $Line"
  Add-Content -LiteralPath $logFile -Value $entry -Encoding utf8
  Write-Host $entry
}

$attempt = 0
while ($true) {
  $attempt++
  if ($MaxAttempts -gt 0 -and $attempt -gt $MaxAttempts) {
    Write-Log "Stopped after $MaxAttempts attempts without success."
    exit 1
  }

  Write-Log "Attempt $attempt : running schedule-feed45-buffer-batch.ps1 ..."
  try {
    if ($StartUtc) {
      & $batchScript -StartUtc $StartUtc
    }
    else {
      & $batchScript
    }
    Write-Log "SUCCESS: Buffer batch scheduled (9 cards x IG + FB)."
    exit 0
  }
  catch {
    $msg = $_.Exception.Message
    if ($msg -match "RATE_LIMIT|Too many requests") {
      Write-Log "Rate limited: waiting $RetryIntervalMinutes min before retry. ($($_.Exception.Message))"
      Start-Sleep -Seconds ($RetryIntervalMinutes * 60)
    }
    else {
      Write-Log "FATAL: $($_.Exception.Message)"
      throw
    }
  }
}
