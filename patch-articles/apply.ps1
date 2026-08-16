# Applique le volet articles Home-Secure : hubs de categorie, gabarits
# d'article avec graphiques, bibliotheque, evaluation chiffree.
#
# A lancer depuis la RACINE du repo, APRES patch-editorial :
#
#     powershell -ExecutionPolicy Bypass -File .\patch-articles\apply.ps1
#
# Le script travaille sur la branche editorial-articles : si le resultat ne
# convient pas, git checkout main et rien n'est perdu.
#
# NOTE : fichier volontairement en ASCII pur. PowerShell 5.1 lit un .ps1 sans
# BOM en ANSI et un seul caractere accentue casse l'analyse syntaxique.

$ErrorActionPreference = 'Continue'

if (-not (Test-Path '.\package.json')) {
  Write-Host 'ERREUR : lance ce script depuis la racine du repo (package.json introuvable).' -ForegroundColor Red
  exit 1
}
if (-not (Test-Path '.\patch-articles')) {
  Write-Host 'ERREUR : dossier patch-articles introuvable.' -ForegroundColor Red
  exit 1
}
if (-not (Test-Path '.\content\editorial.ts')) {
  Write-Host 'ERREUR : content\editorial.ts absent. Applique patch-editorial d abord.' -ForegroundColor Red
  exit 1
}

$dirty = git status --porcelain
if ($dirty) {
  Write-Host 'Des modifications ne sont pas committees. Je les mets de cote.' -ForegroundColor Yellow
  git add -A 2>&1 | Out-Null
  git commit -m 'WIP avant application du volet articles' 2>&1 | Out-Null
}

$existing = git branch --list editorial-articles
if ($existing) {
  git checkout editorial-articles 2>&1 | Out-Null
} else {
  git checkout -b editorial-articles 2>&1 | Out-Null
}

Write-Host ''
Write-Host '=== Copie des fichiers ===' -ForegroundColor Cyan

$root = (Resolve-Path '.\patch-articles').Path
$sources = Get-ChildItem -Path '.\patch-articles' -Recurse -File |
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

# Verification des visuels : sept prises sont consommees par ces pages.
$missing = @()
$shots = @(
  '01-lead-camera.png','02-smart-lock.png','03-alarm-app.png','04-window-sensor.png',
  '06-product-1.png','07-product-2.png','09-jamb-kit.png','10-patio-door.png'
)
foreach ($shot in $shots) {
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
  Write-Host 'typecheck en echec. git checkout main revient en arriere.' -ForegroundColor Red
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

Remove-Item -LiteralPath 'patch-articles' -Recurse -Force
Write-Host '  dossier patch-articles supprime' -ForegroundColor Green

git add -A 2>&1 | Out-Null
git commit -m 'Home-Secure : hubs, articles illustres, evaluation chiffree' 2>&1 | Out-Null

Write-Host ''
Write-Host '=== Termine ===' -ForegroundColor Green
Write-Host '  Verifier :   npm run dev  puis  /  /detection  /assessment  /library'
Write-Host '  Deployer :   git checkout main; git merge editorial-articles; git push'
Write-Host ''
