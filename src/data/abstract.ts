// Banque de questions — Raisonnement abstrait / inductif (format SHL).
// Les figures sont décrites par des FigSpec ([générateur, ...args]) rendus en SVG à l'affichage.
import type { FigureQuestion } from '../types'

const F = (q: Omit<FigureQuestion, 'kind' | 'sec'>): FigureQuestion => ({
  kind: 'figure',
  sec: 'abs',
  ...q,
})

export const abstract: FigureQuestion[] = [
  // --- Séries classiques ---
  F({
    tag: 'Série',
    prompt: 'Quelle figure complète logiquement la série ?',
    series: [['arrow', 0], ['arrow', 45], ['arrow', 90], ['arrow', 135]],
    options: [['arrow', 180], ['arrow', 135], ['arrow', 225], ['arrow', 90], ['arrow', 270]],
    correct: 0,
    explain: 'La flèche tourne de <b>45° dans le sens horaire</b> à chaque étape : 0°, 45°, 90°, 135°… la suivante pointe à <b>180°</b> (vers le bas).',
  }),
  F({
    tag: 'Série',
    prompt: 'Quelle figure vient ensuite ?',
    series: [['poly', 3], ['poly', 4], ['poly', 5], ['poly', 6]],
    options: [['poly', 7], ['poly', 6], ['poly', 8], ['poly', 5], ['poly', 4]],
    correct: 0,
    explain: 'Le nombre de côtés augmente de 1 : triangle (3), carré (4), pentagone (5), hexagone (6) → <b>heptagone (7 côtés)</b>.',
  }),
  F({
    tag: 'Série',
    prompt: 'Où se trouve le point à l\'étape suivante ?',
    series: [['dotSquare', 0], ['dotSquare', 1], ['dotSquare', 2], ['dotSquare', 3]],
    options: [['dotSquare', 0], ['dotSquare', 1], ['dotSquare', 2], ['dotSquare', 3], ['dotSquare', 4]],
    correct: 0,
    explain: 'Le point se déplace de coin en coin dans le sens horaire (haut-gauche → haut-droit → bas-droit → bas-gauche). Après le bas-gauche, il revient au <b>coin haut-gauche</b>.',
  }),
  F({
    tag: 'Deux règles',
    prompt: 'Deux règles évoluent en même temps. Quelle figure suit ?',
    series: [['shapeBars', true, 1], ['shapeBars', false, 2], ['shapeBars', true, 3], ['shapeBars', false, 4]],
    options: [['shapeBars', true, 5], ['shapeBars', false, 5], ['shapeBars', true, 4], ['shapeBars', false, 6], ['shapeBars', true, 6]],
    correct: 0,
    explain: 'Deux règles simultanées : la forme <b>alterne</b> triangle / cercle, et le nombre de barres <b>augmente de 1</b>. Après (cercle, 4 barres) vient donc <b>triangle avec 5 barres</b>.',
  }),
  F({
    tag: 'Intrus',
    prompt: 'Quatre figures suivent la même règle, une seule y échappe. Laquelle est l\'<b>intrus</b> ?',
    series: null,
    options: [['polyDots', 3, 3], ['polyDots', 4, 4], ['polyDots', 5, 4], ['polyDots', 6, 6], ['polyDots', 7, 7]],
    correct: 2,
    explain: 'Règle : <b>le nombre de points intérieurs = le nombre de côtés</b>. La 3ᵉ figure est un pentagone (5 côtés) mais ne contient que <b>4 points</b> : c\'est l\'intrus.',
  }),
  // --- Séries expertes (difficulté croissante) ---
  F({
    tag: 'Série',
    prompt: 'Quelle figure complète logiquement la série ?',
    series: [['arrow', 45], ['arrow', 90], ['arrow', 135], ['arrow', 180]],
    options: [['arrow', 225], ['arrow', 180], ['arrow', 270], ['arrow', 135], ['arrow', 90]],
    correct: 0,
    explain: 'Rotation constante de <b>45° dans le sens horaire</b> : 45°, 90°, 135°, 180°… la flèche suivante pointe à <b>225°</b> (bas-gauche).',
  }),
  F({
    tag: 'Série',
    prompt: 'Quelle figure vient ensuite ?',
    series: [['poly', 4], ['poly', 5], ['poly', 6], ['poly', 7]],
    options: [['poly', 8], ['poly', 7], ['poly', 9], ['poly', 6], ['poly', 5]],
    correct: 0,
    explain: 'Le <b>nombre de côtés augmente de 1</b> : carré (4), pentagone (5), hexagone (6), heptagone (7) → <b>octogone (8 côtés)</b>.',
  }),
  F({
    tag: 'Série',
    prompt: 'Où se trouve le point à l\'étape suivante ?',
    series: [['dotSquare', 0], ['dotSquare', 3], ['dotSquare', 2], ['dotSquare', 1]],
    options: [['dotSquare', 0], ['dotSquare', 1], ['dotSquare', 2], ['dotSquare', 3], ['dotSquare', 4]],
    correct: 0,
    explain: 'Le point tourne <b>dans le sens anti-horaire</b> : haut-gauche → bas-gauche → bas-droit → haut-droit. Après le haut-droit, il revient au <b>coin haut-gauche</b>.',
  }),
  F({
    tag: 'Deux règles',
    prompt: 'Deux règles évoluent en même temps. Quelle figure suit ?',
    series: [['shapeBars', true, 2], ['shapeBars', false, 4], ['shapeBars', true, 6], ['shapeBars', false, 8]],
    options: [['shapeBars', true, 10], ['shapeBars', false, 10], ['shapeBars', true, 8], ['shapeBars', false, 9], ['shapeBars', true, 9]],
    correct: 0,
    explain: 'Deux règles simultanées : la forme <b>alterne</b> triangle / cercle, et le nombre de barres <b>augmente de 2</b> (2, 4, 6, 8). Après (cercle, 8 barres) vient donc <b>triangle avec 10 barres</b>.',
  }),
  F({
    tag: 'Deux règles',
    prompt: 'Deux attributs progressent ensemble. Quelle figure complète la série ?',
    series: [['polyDots', 3, 1], ['polyDots', 4, 2], ['polyDots', 5, 3], ['polyDots', 6, 4]],
    options: [['polyDots', 7, 5], ['polyDots', 7, 4], ['polyDots', 6, 5], ['polyDots', 8, 5], ['polyDots', 7, 6]],
    correct: 0,
    explain: 'Deux règles simultanées : le <b>nombre de côtés augmente de 1</b> (3, 4, 5, 6) et le <b>nombre de points augmente de 1</b> (1, 2, 3, 4). La suivante est un <b>heptagone (7 côtés) contenant 5 points</b>.',
  }),
  F({
    tag: 'Intrus',
    prompt: 'Quatre figures suivent la même règle, une seule y échappe. Laquelle est l\'<b>intrus</b> ?',
    series: null,
    options: [['poly', 4], ['poly', 6], ['poly', 5], ['poly', 8], ['poly', 10]],
    correct: 2,
    explain: 'Règle commune : tous les polygones ont un <b>nombre pair de côtés</b> (4, 6, 8, 10). Le pentagone (5 côtés) est le seul <b>impair</b> : c\'est l\'intrus.',
  }),
  F({
    tag: 'Intrus',
    prompt: 'Quatre figures respectent une relation entre côtés et points, une seule non. Laquelle est l\'<b>intrus</b> ?',
    series: null,
    options: [['polyDots', 4, 3], ['polyDots', 5, 4], ['polyDots', 8, 8], ['polyDots', 6, 5], ['polyDots', 7, 6]],
    correct: 2,
    explain: 'Règle : le <b>nombre de points intérieurs = nombre de côtés − 1</b> (4→3, 5→4, 6→5, 7→6). L\'octogone (8 côtés) devrait contenir 7 points mais en contient <b>8</b> : c\'est l\'intrus.',
  }),
]
