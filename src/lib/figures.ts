// Générateurs de figures SVG pour le raisonnement abstrait + libellés accessibles.
import type { FigSpec } from '../types'

const NAVY = '#0B3D91'

const S = (inner: string) =>
  `<svg class="fig" viewBox="0 0 100 100" aria-hidden="true">${inner}</svg>`

/** Flèche. angle en degrés : 0 = vers le haut, sens horaire. */
export function arrow(angle: number): string {
  return S(`<g transform="rotate(${angle} 50 50)" stroke="${NAVY}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <line x1="50" y1="78" x2="50" y2="24"/>
    <polyline points="34,40 50,22 66,40"/></g>`)
}

/** Polygone régulier à `sides` côtés. */
export function poly(sides: number): string {
  const r = 34
  const pts: [number, number][] = []
  for (let i = 0; i < sides; i++) {
    const a = ((-90 + (i * 360) / sides) * Math.PI) / 180
    pts.push([50 + r * Math.cos(a), 50 + r * Math.sin(a)])
  }
  return S(`<polygon points="${pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')}"
     fill="none" stroke="${NAVY}" stroke-width="5" stroke-linejoin="round"/>`)
}

/** Carré avec un point. corner : 0 haut-gauche, 1 haut-droit, 2 bas-droit, 3 bas-gauche, 4 centre. */
export function dotSquare(corner: number): string {
  const C = [
    [30, 30],
    [70, 30],
    [70, 70],
    [30, 70],
    [50, 50],
  ][corner]
  return S(`<rect x="20" y="20" width="60" height="60" rx="4" fill="none" stroke="${NAVY}" stroke-width="4"/>
    <circle cx="${C[0]}" cy="${C[1]}" r="8" fill="${NAVY}"/>`)
}

/** Une forme (triangle ou cercle) au-dessus de `bars` barres verticales. */
export function shapeBars(isTri: boolean, bars: number): string {
  const shape = isTri
    ? `<polygon points="50,20 68,50 32,50" fill="none" stroke="${NAVY}" stroke-width="5" stroke-linejoin="round"/>`
    : `<circle cx="50" cy="35" r="16" fill="none" stroke="${NAVY}" stroke-width="5"/>`
  let b = ''
  const n = bars
  const totalW = n * 9 - 3
  const x0 = 50 - totalW / 2
  for (let i = 0; i < n; i++) {
    b += `<rect x="${x0 + i * 9}" y="62" width="6" height="18" fill="${NAVY}"/>`
  }
  return S(shape + b)
}

/** Polygone à `sides` côtés contenant `dots` points alignés. */
export function polyDots(sides: number, dots: number): string {
  const r = 36
  const pts: [number, number][] = []
  for (let i = 0; i < sides; i++) {
    const a = ((-90 + (i * 360) / sides) * Math.PI) / 180
    pts.push([50 + r * Math.cos(a), 50 + r * Math.sin(a)])
  }
  let d = ''
  const totalW = dots * 11 - 5
  const x0 = 50 - totalW / 2
  for (let i = 0; i < dots; i++) {
    d += `<circle cx="${x0 + i * 11 + 3}" cy="50" r="3.4" fill="${NAVY}"/>`
  }
  return S(`<polygon points="${pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')}"
     fill="none" stroke="${NAVY}" stroke-width="4" stroke-linejoin="round"/>${d}`)
}

/** Convertit un descripteur FigSpec en chaîne SVG. */
export function renderFig(spec: FigSpec): string {
  const [g, ...a] = spec
  switch (g) {
    case 'arrow':
      return arrow(a[0] as number)
    case 'poly':
      return poly(a[0] as number)
    case 'dotSquare':
      return dotSquare(a[0] as number)
    case 'shapeBars':
      return shapeBars(a[0] as boolean, a[1] as number)
    case 'polyDots':
      return polyDots(a[0] as number, a[1] as number)
    default:
      return S('')
  }
}

type Lang = 'en' | 'fr'

const POLY_NAMES: Record<Lang, Record<number, string>> = {
  fr: { 3: 'triangle', 4: 'carré', 5: 'pentagone', 6: 'hexagone', 7: 'heptagone', 8: 'octogone', 9: 'ennéagone', 10: 'décagone' },
  en: { 3: 'triangle', 4: 'square', 5: 'pentagon', 6: 'hexagon', 7: 'heptagon', 8: 'octagon', 9: 'nonagon', 10: 'decagon' },
}
const CORNER_NAMES: Record<Lang, string[]> = {
  fr: ['coin haut-gauche', 'coin haut-droit', 'coin bas-droit', 'coin bas-gauche', 'centre'],
  en: ['top-left corner', 'top-right corner', 'bottom-right corner', 'bottom-left corner', 'centre'],
}
const DIRS: Record<Lang, string[]> = {
  fr: ['le haut', 'le haut-droite', 'la droite', 'le bas-droite', 'le bas', 'le bas-gauche', 'la gauche', 'le haut-gauche'],
  en: ['up', 'up-right', 'right', 'down-right', 'down', 'down-left', 'left', 'up-left'],
}

function arrowDir(angle: number, lang: Lang): string {
  return DIRS[lang][Math.round((((angle % 360) + 360) % 360) / 45) % 8]
}

/** Libellé accessible (aria-label) décrivant une figure. */
export function figAria(spec: FigSpec, lang: Lang = 'en'): string {
  const [g, ...a] = spec
  const polyName = POLY_NAMES[lang][a[0] as number] ?? (lang === 'en' ? `${a[0]}-sided polygon` : `polygone à ${a[0]} côtés`)
  switch (g) {
    case 'arrow':
      return lang === 'en' ? `arrow pointing ${arrowDir(a[0] as number, lang)}` : `flèche pointant vers ${arrowDir(a[0] as number, lang)}`
    case 'poly':
      return polyName
    case 'dotSquare':
      return lang === 'en'
        ? `square with a dot in the ${CORNER_NAMES.en[a[0] as number]}`
        : `carré avec un point au ${CORNER_NAMES.fr[a[0] as number]}`
    case 'shapeBars':
      return lang === 'en'
        ? `${a[0] ? 'triangle' : 'circle'} above ${a[1]} bars`
        : `${a[0] ? 'triangle' : 'cercle'} au-dessus de ${a[1]} barres`
    case 'polyDots':
      return lang === 'en'
        ? `${polyName} containing ${a[1]} dot${(a[1] as number) > 1 ? 's' : ''}`
        : `${polyName} contenant ${a[1]} point${(a[1] as number) > 1 ? 's' : ''}`
    default:
      return 'figure'
  }
}
