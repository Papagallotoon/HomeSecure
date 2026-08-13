# Applique le theme kaki clair : recopie l'arborescence de patch-theme\ par
# dessus le repo, puis lance typecheck et build.
#
# A lancer depuis la RACINE du repo :
#
#     powershell -ExecutionPolicy Bypass -File .\patch-theme\apply.ps1
#
# Le script travaille sur une branche dediee : si le resultat ne convient pas,
#     git checkout main
# et rien n'est perdu.
#
# NOTE : fichier volontairement en ASCII pur (aucun accent, aucun tiret long).
# PowerShell 5.1 lit un .ps1 sans BOM en ANSI et un caractere accentue suffit
# a casser l'analyse syntaxique.

$ErrorActionPreference = 'Continue'

if (-not (Test-Path '.\package.json')) {
  Write-Host 'ERREUR : lance ce script depuis la racine du repo (package.json introuvable).' -ForegroundColor Red
  exit 1
}
if (-not (Test-Path '.\patch-theme')) {
  Write-Host 'ERREUR : dossier patch-theme introuvable.' -ForegroundColor Red
  exit 1
}

# --- Filet de securite : tout committer avant, puis travailler sur une branche.
$dirty = git status --porcelain
if ($dirty) {
  Write-Host 'Des modifications ne sont pas committees. Je les mets de cote.' -ForegroundColor Yellow
  git add -A 2>&1 | Out-Null
  git commit -m 'WIP avant application du theme kaki clair' 2>&1 | Out-Null
}

$existing = git branch --list theme-kaki
if ($existing) {
  Write-Host 'Branche theme-kaki deja presente : je m''y place.'
  git checkout theme-kaki 2>&1 | Out-Null
} else {
  git checkout -b theme-kaki 2>&1 | Out-Null
}

# --- Copie : l'arborescence de patch-theme\ EST l'arborescence du repo.
Write-Host ''
Write-Host '=== Copie des fichiers ===' -ForegroundColor Cyan

$sources = Get-ChildItem -Path '.\patch-theme' -Recurse -File |
           Where-Object { $_.Name -ne 'apply.ps1' -and $_.Name -ne 'README.md' }

$root = (Resolve-Path '.\patch-theme').Path

foreach ($file in $sources) {
  $to = $file.FullName.Substring($root.Length + 1)

  $dir = Split-Path $to -Parent
  if ($dir -and -not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  Copy-Item $file.FullName $to -Force
  Write-Host ('  {0}' -f $to)
}

# --- Verification.
Write-Host ''
Write-Host '=== npm run typecheck ===' -ForegroundColor Cyan
npm run typecheck
if ($LASTEXITCODE -ne 0) {
  Write-Host ''
  Write-Host "typecheck en echec. Rien n'est perdu : git checkout main revient en arriere." -ForegroundColor Red
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

Remove-Item -LiteralPath 'patch-theme' -Recurse -Force
Write-Host ''
Write-Host '  dossier patch-theme supprime' -ForegroundColor Green

git add -A 2>&1 | Out-Null
git commit -m 'Theme kaki clair : rampe brand inversee vers le clair, camouflage sable, accent turquoise fonce' 2>&1 | Out-Null

Write-Host ''
Write-Host '=== Termine ===' -ForegroundColor Green
Write-Host '  Branche theme-kaki, commit cree, build OK.'
Write-Host ''
Write-Host '  Verifier :      npm run dev'
Write-Host '  Fusionner :     git checkout main; git merge theme-kaki; git push'
Write-Host ''
