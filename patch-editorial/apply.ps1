# Applique le volet editorial Home-Secure : theme kaki clair, marque, home
# magazine. L'arborescence de patch-editorial\ EST celle du repo.
#
# A lancer depuis la RACINE du repo :
#
#     powershell -ExecutionPolicy Bypass -File .\patch-editorial\apply.ps1
#
# Le script travaille sur la branche editorial : si le resultat ne convient pas,
#     git checkout main
# et rien n'est perdu.
#
# NOTE : fichier volontairement en ASCII pur. PowerShell 5.1 lit un .ps1 sans
# BOM en ANSI et un seul caractere accentue casse l'analyse syntaxique.

$ErrorActionPreference = 'Continue'

if (-not (Test-Path '.\package.json')) {
  Write-Host 'ERREUR : lance ce script depuis la racine du repo (package.json introuvable).' -ForegroundColor Red
  exit 1
}
if (-not (Test-Path '.\patch-editorial')) {
  Write-Host 'ERREUR : dossier patch-editorial introuvable.' -ForegroundColor Red
  exit 1
}

$dirty = git status --porcelain
if ($dirty) {
  Write-Host 'Des modifications ne sont pas committees. Je les mets de cote.' -ForegroundColor Yellow
  git add -A 2>&1 | Out-Null
  git commit -m 'WIP avant application du volet editorial' 2>&1 | Out-Null
}

$existing = git branch --list editorial
if ($existing) {
  git checkout editorial 2>&1 | Out-Null
} else {
  git checkout -b editorial 2>&1 | Out-Null
}

Write-Host ''
Write-Host '=== Copie des fichiers ===' -ForegroundColor Cyan

$root = (Resolve-Path '.\patch-editorial').Path
$sources = Get-ChildItem -Path '.\patch-editorial' -Recurse -File |
           Where-Object { $_.Name -ne 'apply.ps1' -and $_.Name -ne 'README.md' }

foreach ($file in $sources) {
  $to = $file.FullName.Substring($root.Length + 1)
  $dir = Split-Path $to -Parent
  if ($dir -and -not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }
  Copy-Item $file.FullName $to -Force
  Write-Host ('  {0}' -f $to)
}

# Verification des visuels : la home en attend quatre.
$missing = @()
foreach ($shot in @('01-lead-camera.png','02-smart-lock.png','03-alarm-app.png','04-window-sensor.png')) {
  if (-not (Test-Path (Join-Path 'public\images' $shot))) { $missing += $shot }
}
if ($missing.Count -gt 0) {
  Write-Host ''
  Write-Host 'ATTENTION : visuels absents de public\images :' -ForegroundColor Yellow
  $missing | ForEach-Object { Write-Host ('  - {0}' -f $_) -ForegroundColor Yellow }
}

Write-Host ''
Write-Host '=== npm run typecheck ===' -ForegroundColor Cyan
npm run typecheck
if ($LASTEXITCODE -ne 0) {
  Write-Host ''
  Write-Host "typecheck en echec. git checkout main revient en arriere." -ForegroundColor Red
  exit 1
}

Write-Host ''
Write-Host '=== npm run build ===' -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
  Write-Host ''
  Write-Host 'build en echec. git checkout main revient en arriere.' -ForegroundColor Red
  exit 1
}

Remove-Item -LiteralPath 'patch-editorial' -Recurse -Force
Write-Host '  dossier patch-editorial supprime' -ForegroundColor Green

git add -A 2>&1 | Out-Null
git commit -m 'Home-Secure : theme kaki clair, marque, home editoriale' 2>&1 | Out-Null

Write-Host ''
Write-Host '=== Termine ===' -ForegroundColor Green
Write-Host '  Verifier :   npm run dev'
Write-Host '  Deployer :   git checkout main; git merge editorial; git push'
Write-Host ''
