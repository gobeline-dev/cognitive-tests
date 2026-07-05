// Contenu additionnel bilingue chargé depuis des fichiers JSON (une seule source
// FR+EN par question). Les champs texte contiennent des entités HTML échappées
// (&lt; &gt; …) qui sont restaurées à l'exécution.
import type { FigSpec, FigureQuestion, RawQuestion, TextQuestion, VerbalQuestion } from '../types'
import numJson from './extra/numeric.json'
import verbJson from './extra/verbal.json'
import absJson from './extra/abstract.json'

type Lang = 'en' | 'fr'

const VFN: Record<Lang, string[]> = {
  fr: ['Vrai', 'Faux', 'On ne peut pas savoir'],
  en: ['True', 'False', 'Cannot say'],
}

/** Restaure le HTML échappé (&lt; &gt; &quot; &amp; &#39;). */
function unesc(s: string): string {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
}

const pick = (lang: Lang, fr: string, en: string) => (lang === 'fr' ? fr : en)

export function extraNumeric(lang: Lang): TextQuestion[] {
  return (numJson as any[]).map((q) => ({
    kind: 'text',
    sec: 'num',
    tag: pick(lang, q.tagFr, q.tagEn),
    stem: unesc(pick(lang, q.stemFr, q.stemEn)),
    options: (lang === 'fr' ? q.optionsFr : q.optionsEn) as string[],
    correct: q.correct,
    explain: unesc(pick(lang, q.explainFr, q.explainEn)),
  }))
}

export function extraVerbal(lang: Lang): VerbalQuestion[] {
  return (verbJson as any[]).map((q) => ({
    kind: 'verbal',
    sec: 'verb',
    tag: pick(lang, q.tagFr, q.tagEn),
    passage: pick(lang, q.passageFr, q.passageEn),
    statement: pick(lang, q.statementFr, q.statementEn),
    options: VFN[lang],
    correct: q.correct,
    explain: unesc(pick(lang, q.explainFr, q.explainEn)),
  }))
}

export function extraAbstract(lang: Lang): FigureQuestion[] {
  return (absJson as any[]).map((q) => ({
    kind: 'figure',
    sec: 'abs',
    tag: pick(lang, q.tagFr, q.tagEn),
    prompt: unesc(pick(lang, q.promptFr, q.promptEn)),
    series: (q.series ?? null) as FigSpec[] | null,
    options: q.options as FigSpec[],
    correct: q.correct,
    explain: unesc(pick(lang, q.explainFr, q.explainEn)),
  }))
}

export function extraFor(lang: Lang): { num: RawQuestion[]; verb: RawQuestion[]; abs: RawQuestion[] } {
  return { num: extraNumeric(lang), verb: extraVerbal(lang), abs: extraAbstract(lang) }
}
