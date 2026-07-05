// Assemblage de la banque, métadonnées de section et normalisation des questions.
import type { ExamSection, Question, RawQuestion, Section } from '../types'
import { numeric } from '../data/numeric'
import { verbal } from '../data/verbal'
import { abstract } from '../data/abstract'
import { figAria, renderFig } from './figures'

export const BANK: Record<Section, RawQuestion[]> = {
  num: numeric,
  verb: verbal,
  abs: abstract,
}

export interface SecMeta {
  name: string
  badge: string
  min: number // budget-temps indicatif en minutes (mode chronomètre)
  blurb: string
}

export const SEC_META: Record<ExamSection, SecMeta> = {
  num: { name: 'Raisonnement numérique', badge: 'NUMÉRIQUE', min: 16, blurb: 'Tableaux, graphiques, pourcentages, ratios' },
  verb: { name: 'Raisonnement verbal', badge: 'VERBAL', min: 14, blurb: 'Vrai / Faux / On ne peut pas savoir' },
  abs: { name: 'Raisonnement abstrait', badge: 'ABSTRAIT', min: 11, blurb: 'Séries logiques, intrus, figures' },
  all: { name: 'Test complet', badge: 'TEST COMPLET', min: 40, blurb: 'Les trois sections à la suite' },
}

/** Nombre de questions d'une section (ou du test complet). */
export function questionCount(sec: ExamSection): number {
  return sec === 'all'
    ? BANK.num.length + BANK.verb.length + BANK.abs.length
    : BANK[sec].length
}

/** Normalise une question brute en question affichable. */
export function normalize(q: RawQuestion): Question {
  if (q.kind === 'verbal') {
    const stemHTML = `<div class="passage">${q.passage}</div><div class="statement">« ${q.statement} »</div>
      <p class="ask">L'affirmation est-elle&nbsp;:</p>`
    return { sec: q.sec, tag: q.tag, stemHTML, options: q.options, correct: q.correct, explain: q.explain, fig: false }
  }
  if (q.kind === 'figure') {
    let row = '<div class="figrow">'
    if (q.series) {
      q.series.forEach((f) => (row += `<div class="fig">${renderFig(f)}</div>`))
      row += '<span class="arw" aria-hidden="true">→</span><div class="qbox">?</div>'
    }
    row += '</div>'
    const stemHTML = `<p>${q.prompt}</p>${row}`
    return {
      sec: q.sec,
      tag: q.tag,
      stemHTML,
      options: q.options.map(renderFig),
      optionAria: q.options.map(figAria),
      correct: q.correct,
      explain: q.explain,
      fig: true,
    }
  }
  return { sec: q.sec, tag: q.tag, stemHTML: q.stem, options: q.options, correct: q.correct, explain: q.explain, fig: false }
}

/** Construit la liste normalisée des questions d'une section. */
export function buildQuestions(sec: ExamSection): Question[] {
  const raw = sec === 'all' ? [...BANK.num, ...BANK.verb, ...BANK.abs] : [...BANK[sec]]
  return raw.map(normalize)
}
