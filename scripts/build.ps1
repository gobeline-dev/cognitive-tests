# Build de production (vérification TypeScript + bundle Vite dans dist/).
# Usage : pwsh ./scripts/build.ps1   (ou  npm run build)
$ErrorActionPreference = 'Stop'

Write-Host "==> Installation des dépendances..." -ForegroundColor Cyan
npm install

Write-Host "==> Build de production (sortie dans dist/)..." -ForegroundColor Cyan
npm run build

Write-Host "==> Build terminé. Prévisualiser avec :  npm run preview" -ForegroundColor Green
