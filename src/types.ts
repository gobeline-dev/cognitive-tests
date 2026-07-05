// Types partagés de l'application d'entraînement aux tests cognitifs SHL / EPSO.

export type Section = 'num' | 'verb' | 'abs'
export type ExamSection = Section | 'all'
export type ExamMode = 'exam' | 'learn'

/** Descripteur de figure abstraite : [nom de générateur, ...arguments]. */
export type FigSpec = [string, ...(number | boolean)[]]

interface RawBase {
  sec: Section
  tag: string
  correct: number
  explain: string
}

/** Question numérique : énoncé HTML (tableau + question). */
export interface TextQuestion extends RawBase {
  kind: 'text'
  sec: 'num'
  options: string[]
  stem: string
}

/** Question verbale : passage + affirmation, réponses Vrai / Faux / On ne peut pas savoir. */
export interface VerbalQuestion extends RawBase {
  kind: 'verbal'
  sec: 'verb'
  options: string[]
  passage: string
  statement: string
}

/** Question abstraite : série de figures (ou intrus) décrites par des FigSpec. */
export interface FigureQuestion extends RawBase {
  kind: 'figure'
  sec: 'abs'
  options: FigSpec[]
  prompt: string
  series: FigSpec[] | null
}

export type RawQuestion = TextQuestion | VerbalQuestion | FigureQuestion

/** Question normalisée, prête à afficher. */
export interface Question {
  sec: Section
  tag: string
  stemHTML: string
  options: string[] // texte, ou chaîne SVG pour les figures
  correct: number
  explain: string
  fig: boolean
  optionAria?: string[] // libellés accessibles pour les figures
}

/** Résultat d'une session terminée, conservé dans l'historique. */
export interface ResultRecord {
  sec: ExamSection
  mode: ExamMode
  chrono: boolean
  correct: number
  total: number
  pct: number
  durationMs: number | null
  date: string // ISO
}

/** Session en cours ou dernière session terminée. */
export interface Session {
  sec: ExamSection
  mode: ExamMode
  chrono: boolean
  answers: (number | null)[]
  /** Ordre d'affichage des options par question : orders[q][position] = index d'option d'origine. */
  orders: number[][]
  /** Questions marquées « à revoir ». */
  flagged: boolean[]
  /** Temps cumulé passé sur chaque question (ms). */
  timeSpent: number[]
  idx: number
  deadline: number | null // horodatage d'échéance (ms epoch), null si sans chrono
  startedAt: number
  finishedAt: number | null
  finished: boolean
}

/** Contenu complet persisté dans localStorage. */
export interface Store {
  session: Session | null
  history: ResultRecord[]
}
