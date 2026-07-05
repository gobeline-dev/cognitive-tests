# Build + déploiement manuel sur GitHub Pages (branche gh-pages).
# Usage : pwsh ./scripts/deploy.ps1   (ou  npm run deploy)
$ErrorActionPreference = 'Stop'

Write-Host "==> Installation des dépendances..." -ForegroundColor Cyan
npm install

Write-Host "==> Build de production..." -ForegroundColor Cyan
npm run build

Write-Host "==> Publication sur la branche gh-pages..." -ForegroundColor Cyan
npx gh-pages -d dist -t

Write-Host "==> Terminé. Le site sera disponible sous quelques instants à :" -ForegroundColor Green
Write-Host "    https://gobeline-dev.github.io/cognitive-tests/" -ForegroundColor Green
