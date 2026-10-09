$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$frontend = Join-Path $root "frontend"
Set-Location $frontend

if (-not (Test-Path "node_modules")) {
  New-Item -ItemType Directory -Force -Path "..\npm-cache", "..\npm-tmp", "node_modules" | Out-Null
  $env:npm_config_cache = (Resolve-Path "..\npm-cache").Path
  $env:TEMP = (Resolve-Path "..\npm-tmp").Path
  $env:TMP = $env:TEMP
  npm install
}

$vite = Join-Path $frontend "node_modules\vite\bin\vite.js"
node $vite --host 127.0.0.1 --port 5173
