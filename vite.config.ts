import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` doit correspondre au nom du dépôt pour un site "project" GitHub Pages :
// https://gobeline-dev.github.io/cognitive-tests/
export default defineConfig({
  base: '/cognitive-tests/',
  plugins: [react()],
})
