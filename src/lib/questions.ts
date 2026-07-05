// Assemblage de la banque (par langue) et normalisation des questions.
import type { ExamSection, Question, RawQuestion, Section } from '../types'
import { numeric as numericFr } from '../data/numeric'
import { verbal as verbalFr } from '../data/verbal'
import { abstract as abstractFr } from '../data/abstract'
import { numeric as numericEn } from '../data/en/numeric'
import { verbal as verbalEn } from '../data/en/verbal'
import { abstract as abstractEn } from '../data/en/abstract'
import { figAria, renderFig } from './figures'

export type Lang = 'en' | 'fr'

const BANKS: Record<Lang, Record<Section, RawQuestion[]>> = {
  fr: { num: numericFr, verb: verbalFr, abs: abstractFr },
  en: { num: numericEn, verb: verbalEn, abs: abstractEn },
}

/** Budget-temps indicatif par section (minutes, mode chronomètre). Indépendant de la langue. */
export const SEC_MIN: Record<ExamSection, number> = { num: 16, verb: 14, abs: 11, all: 40 }

/** Nombre de questions d'une section (identique dans les deux langues). */
export function questionCount(sec: ExamSection): number {
  const b = BANKS.en
  return sec === 'all' ? b.num.length + b.verb.length + b.abs.length : b[sec].length
}

/** Normalise une question brute en question affichable. */
export function normalize(q: RawQuestion, lang: Lang): Question {
  if (q.kind === 'verbal') {
    const stemHTML = `<div class="passage">${q.passage}</div><div class="statement">« ${q.statement} »</div>`
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
      optionAria: q.options.map((s) => figAria(s, lang)),
      correct: q.correct,
      explain: q.explain,
      fig: true,
    }
  }
  return { sec: q.sec, tag: q.tag, stemHTML: q.stem, options: q.options, correct: q.correct, explain: q.explain, fig: false }
}

/** Construit la liste normalisée des questions d'une section, dans la langue donnée. */
export function buildQuestions(sec: ExamSection, lang: Lang): Question[] {
  const b = BANKS[lang]
  const raw = sec === 'all' ? [...b.num, ...b.verb, ...b.abs] : [...b[sec]]
  return raw.map((q) => normalize(q, lang))
}
