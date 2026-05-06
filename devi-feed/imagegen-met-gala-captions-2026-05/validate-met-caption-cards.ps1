[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
$scriptPath = Join-Path $PSScriptRoot "validate-met-caption-cards.py"
if (-not (Test-Path -LiteralPath $scriptPath)) {
  throw "Missing validator: $scriptPath"
}

@'
import runpy
runpy.run_path(r"__SCRIPT__", run_name="__main__")
'@.Replace("__SCRIPT__", $scriptPath) | python -
