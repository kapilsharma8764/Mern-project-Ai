$ErrorActionPreference = 'SilentlyContinue'
$runtimeDir = Join-Path $PSScriptRoot '.runtime'

foreach ($name in @('server', 'client')) {
    $pidFile = Join-Path $runtimeDir "$name.pid"
    if (Test-Path -LiteralPath $pidFile) {
        $procId = Get-Content -LiteralPath $pidFile
        Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
        Get-CimInstance Win32_Process -Filter "ParentProcessId=$procId" -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
        Remove-Item -LiteralPath $pidFile -Force
    }
}

Write-Host 'Forge (MERN) stopped.'
