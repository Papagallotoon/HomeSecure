# Applique le patch : copie chaque fichier a sa destination, supprime patch\,
# verifie qu'il ne reste aucune fuite de niche, puis lance typecheck et build.
#
# A lancer depuis la RACINE du repo :
#
#     powershell -ExecutionPolicy Bypass -File .\patch\apply.ps1
#
# Le script cree une branche dediee : si le resultat ne convient pas,
#     git checkout main
# et rien n'est perdu.
#
# NOTE : ce fichier est volontairement en ASCII pur (aucun accent, aucun tiret
# long). PowerShell 5.1 lit un .ps1 sans BOM en ANSI et un caractere accentue
# suffit a casser l'analyse syntaxique.

$ErrorActionPreference = 'Stop'

if (-not (Test-Path '.\package.json')) {
  Write-Host 'ERREUR : lance ce script depuis la racine du repo (package.json introuvable).' -ForegroundColor Red
  exit 1
}
if (-not (Test-Path '.\patch')) {
  Write-Host 'ERREUR : dossier patch introuvable.' -ForegroundColor Red
  exit 1
}

# --- Filet de securite : tout committer avant, puis travailler sur une branche.
$dirty = git status --porcelain
if ($dirty) {
  Write-Host 'Des modifications ne sont pas committees. Je les mets de cote.' -ForegroundColor Yellow
  git add -A
  git commit -m 'WIP avant application du patch de templatisation' | Out-Null
}

git rev-parse --verify templatisation 2>$null | Out-Null
if ($LASTEXITCODE -eq 0) {
  git checkout templatisation | Out-Null
} else {
  git checkout -b templatisation | Out-Null
}

# --- Table de copie : fichier du patch -> destination.
$map = [ordered]@{
  'config-active.ts'                     = 'config\active.ts'
  'config-registry.ts'                   = 'config\registry.ts'
  'lib-validateNiche.ts'                 = 'lib\validateNiche.ts'
  'lib-types.ts'                         = 'lib\types.ts'
  'env-example'                          = '.env.example'
  'config-niches-readyscore-site.ts'     = 'config\niches\readyscore\site.ts'
  'config-niches-readyscore-quiz.ts'     = 'config\niches\readyscore\quiz.ts'
  'config-niches-readyscore-scoring.ts'  = 'config\niches\readyscore\scoring.ts'
  'config-niches-growready-site.ts'      = 'config\niches\growready\site.ts'
  'config-niches-growready-quiz.ts'      = 'config\niches\growready\quiz.ts'
  'config-niches-growready-scoring.ts'   = 'config\niches\growready\scoring.ts'
  'app-globals.css'                      = 'app\globals.css'
  'app-layout.tsx'                       = 'app\layout.tsx'
  'app-page.tsx'                         = 'app\page.tsx'
  'app-result-page.tsx'                  = 'app\result\page.tsx'
  'app-icon.svg'                         = 'app\icon.svg'
  'tailwind.config.ts'                   = 'tailwind.config.ts'
  'lib-heading.ts'                       = 'lib\heading.ts'
  'components-layout-Header.tsx'         = 'components\layout\Header.tsx'
  'components-layout-Footer.tsx'         = 'components\layout\Footer.tsx'
  'components-quiz-ProgressBar.tsx'      = 'components\quiz\ProgressBar.tsx'
  'components-quiz-QuestionCard.tsx'     = 'components\quiz\QuestionCard.tsx'
  'components-result-ScoreDisplay.tsx'   = 'components\result\ScoreDisplay.tsx'
  'components-result-ScoreGauge.tsx'     = 'components\result\ScoreGauge.tsx'
  'components-result-StrengthsGaps.tsx'  = 'components\result\StrengthsGaps.tsx'
  'components-result-ReadinessRadar.tsx' = 'components\result\ReadinessRadar.tsx'
  'components-result-FurtherTests.tsx'   = 'components\result\FurtherTests.tsx'
  'components-result-ProductCard.tsx'    = 'components\result\ProductCard.tsx'
  'root-README.md'                       = 'README.md'
}

Write-Host ''
Write-Host '=== Copie des fichiers ===' -ForegroundColor Cyan

$missing = New-Object System.Collections.ArrayList

foreach ($src in $map.Keys) {
  $from = Join-Path '.\patch' $src
  $to   = $map[$src]

  if (-not (Test-Path $from)) {
    [void]$missing.Add($src)
    continue
  }

  $dir = Split-Path $to -Parent
  if ($dir -and -not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  Copy-Item $from $to -Force
  Write-Host ('  {0,-40} -> {1}' -f $src, $to)
}

if ($missing.Count -gt 0) {
  Write-Host ''
  Write-Host 'ATTENTION - fichiers absents du patch, non copies :' -ForegroundColor Yellow
  foreach ($m in $missing) { Write-Host ('  ' + $m) -ForegroundColor Yellow }
}

# --- .env.local : la niche servie en local.
if (-not (Test-Path '.\.env.local')) {
  Copy-Item '.\.env.example' '.\.env.local'
  Write-Host ''
  Write-Host '  .env.local cree (NEXT_PUBLIC_NICHE=readyscore)' -ForegroundColor Green
}

# --- patch\ a fait son travail : il pollue les recherches de fuites.
Remove-Item -LiteralPath 'patch' -Recurse -Force
Write-Host ''
Write-Host '  dossier patch supprime' -ForegroundColor Green

# --- Controle : le moteur ne doit plus connaitre le sujet.
Write-Host ''
Write-Host '=== Fuites de niche dans app, components, lib ===' -ForegroundColor Cyan

$pattern = 'readyscore|growready|looter|prepared|prepper|72-hour|blackout|first aid|water storage|home defense'
$files = Get-ChildItem -Path 'app', 'components', 'lib' -Recurse -Include '*.ts', '*.tsx', '*.css' -ErrorAction SilentlyContinue
$leaks = $files | Select-String -Pattern $pattern | Where-Object { $_.Line.TrimStart() -notmatch '^(//|\*|/\*)' }

if ($leaks) {
  Write-Host '  Fuites restantes :' -ForegroundColor Yellow
  foreach ($leak in $leaks) {
    $name = Split-Path $leak.Path -Leaf
    Write-Host ('  {0}:{1}  {2}' -f $name, $leak.LineNumber, $leak.Line.Trim()) -ForegroundColor Yellow
  }
} else {
  Write-Host '  Aucune. Le moteur est agnostique.' -ForegroundColor Green
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

git add -A
git commit -m 'Moteur templatise : niche par NEXT_PUBLIC_NICHE, registre, garde-fou, theme turquoise, passe mobile' | Out-Null

Write-Host ''
Write-Host '=== Termine ===' -ForegroundColor Green
Write-Host '  Branche templatisation, commit cree, build OK.'
Write-Host ''
Write-Host '  Verifier le parcours :    npm run dev'
Write-Host '  Verifier growready :      $env:NEXT_PUBLIC_NICHE=''growready''; npm run dev'
Write-Host '  Fusionner :               git checkout main; git merge templatisation; git push'
Write-Host ''
