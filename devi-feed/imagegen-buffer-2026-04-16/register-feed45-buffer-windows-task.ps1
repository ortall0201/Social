# Register a Windows Scheduled Task (local "cron") to run the feed45 Buffer batch with retries.
#
# One-shot ~24h from now:
#   powershell -ExecutionPolicy Bypass -File devi-feed/imagegen-buffer-2026-04-16/register-feed45-buffer-windows-task.ps1
#
# Specific local time:
#   powershell -ExecutionPolicy Bypass -File devi-feed/imagegen-buffer-2026-04-16/register-feed45-buffer-windows-task.ps1 -OnceAt "2026-04-17 09:00"
#
# Daily at 09:00 local:
#   powershell -ExecutionPolicy Bypass -File devi-feed/imagegen-buffer-2026-04-16/register-feed45-buffer-windows-task.ps1 -DailyAtHour 9
#
# Remove:
#   powershell -ExecutionPolicy Bypass -File devi-feed/imagegen-buffer-2026-04-16/register-feed45-buffer-windows-task.ps1 -Unregister

[CmdletBinding()]
param(
  [string]$TaskName = "Iris-Devi-Feed45-BufferBatch",
  [datetime]$OnceAt = [datetime]::MinValue,
  [int]$DailyAtHour = -1,
  [int]$DailyAtMinute = 0,
  [switch]$Unregister,
  [int]$RetryIntervalMinutes = 45
)

$ErrorActionPreference = "Stop"
$retryScript = Join-Path $PSScriptRoot "run-feed45-buffer-batch-retry.ps1"
if (-not (Test-Path -LiteralPath $retryScript)) {
  throw "Missing $retryScript"
}

$existing = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
if ($Unregister) {
  if ($existing) {
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
    Write-Host "Removed scheduled task: $TaskName"
  }
  else {
    Write-Host "No task named $TaskName"
  }
  exit 0
}

if ($existing) {
  Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
}

$arg = "-NoProfile -ExecutionPolicy Bypass -File `"$retryScript`" -RetryIntervalMinutes $RetryIntervalMinutes -MaxAttempts 0"
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument $arg

if ($DailyAtHour -ge 0) {
  $trigger = New-ScheduledTaskTrigger -Daily -At ([datetime]::Today.AddHours($DailyAtHour).AddMinutes($DailyAtMinute))
}
elseif ($OnceAt -ne [datetime]::MinValue) {
  $trigger = New-ScheduledTaskTrigger -Once -At $OnceAt
}
else {
  $trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddHours(24)
}

$settings = New-ScheduledTaskSettingsSet `
  -AllowStartIfOnBatteries `
  -DontStopIfGoingOnBatteries `
  -StartWhenAvailable `
  -ExecutionTimeLimit (New-TimeSpan -Hours 12)

Register-ScheduledTask `
  -TaskName $TaskName `
  -Action $action `
  -Trigger $trigger `
  -Settings $settings `
  -Description "Iris: queue Devi feed45 image batch to Buffer (retry until rate limit clears)" | Out-Null

Write-Host "Registered task '$TaskName'."
$info = Get-ScheduledTaskInfo -TaskName $TaskName
Write-Host "Next run (if reported): $($info.NextRunTime)"
