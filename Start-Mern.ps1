$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$runtimeDir = Join-Path $root '.runtime'
New-Item -ItemType Directory -Path $runtimeDir -Force | Out-Null

if (!(Test-Path (Join-Path $root 'server\node_modules'))) {
    Write-Host 'Installing server dependencies...'
    Push-Location (Join-Path $root 'server')
    npm install
    Pop-Location
}

$serverLog = Join-Path $runtimeDir 'server.out.log'
$serverErr = Join-Path $runtimeDir 'server.err.log'

$npmCmd = (Get-Command npm.cmd -ErrorAction Stop).Source

$serverProc = Start-Process -FilePath $npmCmd -ArgumentList @('run', 'dev') -WorkingDirectory (Join-Path $root 'server') -WindowStyle Hidden -RedirectStandardOutput $serverLog -RedirectStandardError $serverErr -PassThru
$serverProc.Id | Set-Content -LiteralPath (Join-Path $runtimeDir 'server.pid')

Start-Sleep -Seconds 2
Write-Host 'Squarespace mirror is running.'
Write-Host 'Site: http://localhost:4000/'
Write-Host 'Use Stop-Mern.cmd to stop it.'
