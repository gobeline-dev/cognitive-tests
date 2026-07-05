# Déploiement sur GitHub Pages via GitHub Actions.
# Le déploiement est AUTOMATIQUE à chaque push sur la branche main
# (workflow .github/workflows/deploy.yml). Ce script se contente de
# vérifier le build localement puis de pousser main.
#
# Prérequis (une seule fois) : dans GitHub → Settings → Pages →
#   Build and deployment → Source = « GitHub Actions ».
#
# Usage : pwsh ./scripts/deploy.ps1
$ErrorActionPreference = 'Stop'

Write-Host "==> Vérification du build (tsc + vite build)..." -ForegroundColor Cyan
npm run build

Write-Host "==> Push de la branche main (déclenche le déploiement Actions)..." -ForegroundColor Cyan
git push origin main

Write-Host "==> Déploiement lancé. Suivi : onglet Actions du dépôt." -ForegroundColor Green
Write-Host "    https://gobeline-dev.github.io/cognitive-tests/" -ForegroundColor Green
