// Internationalisation FR / EN. Langue par défaut : anglais. Préférence persistée.
import { createContext, useContext, type ReactNode } from 'react'
import { useLocalStorage } from './lib/storage'
import type { ExamSection } from './types'

export type Lang = 'en' | 'fr'

interface SecStrings {
  name: string
  short: string
  badge: string
  blurb: string
}

export interface Strings {
  sec: Record<ExamSection, SecStrings>
  // Intro
  kicker: string
  title: string
  lede: string
  timerLabel: string
  learnLabel: string
  learnImmediate: string
  learnDeferred: string
  start: string
  ready: (name: string) => string
  selectFirst: string
  qCount: (n: number, min: number) => string
  howItWorks: string
  progressTitle: string
  best: string
  sessions: string
  storageHint: string
  resetData: string
  footerLegal: string
  footerLinkLabel: string
  // Exam
  learningChip: string
  onPace: string
  behindPace: string
  flagOn: string
  flagOff: string
  flagTitle: string
  verbalConsigne: ReactNode
  questionOf: (i: number, n: number) => string
  answeredOf: (a: number, n: number) => string
  goToQuestion: (i: number) => string
  timeRemaining: (mm: string, ss: string) => string
  prev: string
  next: string
  finish: string
  correctPrefix: string
  incorrectPrefix: string
  quit: string
  modalTitle: string
  modalBody: (count: number, list: string) => string
  goThere: string
  finishAnyway: string
  // Results
  resGood: string
  resMid: string
  resLow: string
  pctCorrect: (pct: number, name: string) => string
  avgTime: (s: number) => string
  cannotSayLabel: string
  cannotSayTitle: string
  answerLabel: (letter: string) => string
  answerWord: string
  yourAnswer: string
  correctAnswer: string
  solution: string
  explanation: string
  notAnswered: string
  vCorrect: string
  vIncorrect: string
  retry: string
  changeSection: string
  resultsFooter: string
  // App
  resetConfirm: string
}

const EN: Strings = {
  sec: {
    num: { name: 'Numerical reasoning', short: 'Numerical', badge: 'NUMERICAL', blurb: 'Tables, charts, percentages, ratios' },
    verb: { name: 'Verbal reasoning', short: 'Verbal', badge: 'VERBAL', blurb: 'True / False / Cannot say' },
    abs: { name: 'Abstract reasoning', short: 'Abstract', badge: 'ABSTRACT', blurb: 'Logical series, odd one out, figures' },
    all: { name: 'Full test', short: 'Full', badge: 'FULL TEST', blurb: 'All three sections in a row' },
  },
  kicker: 'Practice · cognitive reasoning',
  title: 'SHL-style simulator — EPSO preparation',
  lede: 'Choose a family of tests, or take the full test. Each section reproduces the format of SHL Verify cognitive assessments: single answer, commented feedback, optional timer.',
  timerLabel: 'Timer',
  learnLabel: 'Learning mode',
  learnImmediate: '(immediate feedback)',
  learnDeferred: '(feedback at the end)',
  start: 'Start',
  ready: (name) => `Ready: ${name}.`,
  selectFirst: 'Select a section first.',
  qCount: (n, min) => `${n} questions · ~${min} min`,
  howItWorks:
    'How it works — answer each question and move freely with “Previous / Next”, via the progress stars, or with the keyboard (keys A–E, arrows ← →). In exam mode, feedback appears at the end; in learning mode, it appears after each answer. Goal: recognise the mechanisms, manage your time, and spot the classic traps (notably the “Cannot say” items in verbal).',
  progressTitle: 'Your progress',
  best: 'best',
  sessions: 'Sessions',
  storageHint: 'Progress and history are stored on this device (localStorage).',
  resetData: 'Reset data',
  footerLegal:
    'Independent practice tool, not affiliated with SHL or EPSO. The questions are original and designed to reproduce the reasoning formats.',
  footerLinkLabel: 'shl.com · cognitive assessments',
  learningChip: 'LEARNING',
  onPace: 'On pace',
  behindPace: 'Behind pace',
  flagOn: '★ To review',
  flagOff: '☆ Flag',
  flagTitle: 'Flag this question to come back to it (key F)',
  verbalConsigne: (
    <>
      Judge the statement <b>only</b> from the text, without outside knowledge.
    </>
  ),
  questionOf: (i, n) => `Question ${i} / ${n}`,
  answeredOf: (a, n) => `${a} / ${n} answered`,
  goToQuestion: (i) => `Go to question ${i}`,
  timeRemaining: (mm, ss) => `Time remaining ${mm} minutes ${ss} seconds`,
  prev: '← Previous',
  next: 'Next →',
  finish: 'Finish ✓',
  correctPrefix: '✓ Correct — ',
  incorrectPrefix: '✗ Incorrect — ',
  quit: 'Give up and return home',
  modalTitle: 'Finish the test?',
  modalBody: (count, list) =>
    `There ${count > 1 ? 'are' : 'is'} still ${count} unanswered question${count > 1 ? 's' : ''} (no. ${list}). Unanswered questions will be counted as incorrect.`,
  goThere: 'Go there',
  finishAnyway: 'Finish anyway',
  resGood: 'Solid!',
  resMid: 'Making progress',
  resLow: 'Needs work',
  pctCorrect: (pct, name) => `${pct}% correct · ${name}`,
  avgTime: (s) => `Avg. time / question ${s}s`,
  cannotSayLabel: '“Cannot say”',
  cannotSayTitle: 'Items whose correct answer is “Cannot say” — the most predictive trap in verbal',
  answerLabel: (letter) => `Answer ${letter}`,
  answerWord: 'Answer',
  yourAnswer: 'Your answer:',
  correctAnswer: 'Correct answer:',
  solution: 'Solution:',
  explanation: 'Explanation — ',
  notAnswered: 'Not answered',
  vCorrect: 'Correct',
  vIncorrect: 'Incorrect',
  retry: 'Retry this section',
  changeSection: 'Change section',
  resultsFooter: 'Review each explanation: regular practice matters more than the score of a single test.',
  resetConfirm: 'Reset all progress and history? This action cannot be undone.',
}

const FR: Strings = {
  sec: {
    num: { name: 'Raisonnement numérique', short: 'Numérique', badge: 'NUMÉRIQUE', blurb: 'Tableaux, graphiques, pourcentages, ratios' },
    verb: { name: 'Raisonnement verbal', short: 'Verbal', badge: 'VERBAL', blurb: 'Vrai / Faux / On ne peut pas savoir' },
    abs: { name: 'Raisonnement abstrait', short: 'Abstrait', badge: 'ABSTRAIT', blurb: 'Séries logiques, intrus, figures' },
    all: { name: 'Test complet', short: 'Complet', badge: 'TEST COMPLET', blurb: 'Les trois sections à la suite' },
  },
  kicker: 'Entraînement · raisonnement cognitif',
  title: 'Simulateur type SHL — préparation EPSO',
  lede: 'Choisissez une famille de tests, ou lancez le test complet. Chaque section reproduit le format des évaluations cognitives SHL Verify : réponse unique, correction commentée, chronomètre optionnel.',
  timerLabel: 'Chronomètre',
  learnLabel: 'Mode apprentissage',
  learnImmediate: '(correction immédiate)',
  learnDeferred: '(correction à la fin)',
  start: 'Commencer',
  ready: (name) => `Prêt : ${name}.`,
  selectFirst: "Sélectionnez d'abord une section.",
  qCount: (n, min) => `${n} questions · ~${min} min`,
  howItWorks:
    'Comment ça marche — répondez à chaque question, naviguez librement avec « Précédent / Suivant », via les étoiles de progression ou au clavier (touches A–E, flèches ← →). En mode examen, la correction apparaît à la fin ; en mode apprentissage, elle s’affiche après chaque réponse. Objectif : reconnaître les mécanismes, gérer le temps, et repérer les pièges classiques (notamment les « On ne peut pas savoir » en verbal).',
  progressTitle: 'Votre progression',
  best: 'meilleur',
  sessions: 'Sessions',
  storageHint: 'Progression et historique sont enregistrés sur cet appareil (localStorage).',
  resetData: 'Réinitialiser les données',
  footerLegal:
    "Outil d'entraînement indépendant, non affilié à SHL ni à EPSO. Les questions sont originales et conçues pour reproduire les formats de raisonnement.",
  footerLinkLabel: 'shl.com · cognitive assessments',
  learningChip: 'APPRENTISSAGE',
  onPace: 'Dans les temps',
  behindPace: 'En retard sur le rythme',
  flagOn: '★ À revoir',
  flagOff: '☆ Marquer',
  flagTitle: 'Marquer cette question pour y revenir (touche F)',
  verbalConsigne: (
    <>
      Jugez l'affirmation <b>uniquement</b> d'après le texte, sans connaissance extérieure.
    </>
  ),
  questionOf: (i, n) => `Question ${i} / ${n}`,
  answeredOf: (a, n) => `${a} / ${n} répondues`,
  goToQuestion: (i) => `Aller à la question ${i}`,
  timeRemaining: (mm, ss) => `Temps restant ${mm} minutes ${ss} secondes`,
  prev: '← Précédent',
  next: 'Suivant →',
  finish: 'Terminer ✓',
  correctPrefix: '✓ Correct — ',
  incorrectPrefix: '✗ Incorrect — ',
  quit: "Abandonner et revenir à l'accueil",
  modalTitle: 'Terminer le test ?',
  modalBody: (count, list) =>
    `Il reste ${count} question${count > 1 ? 's' : ''} sans réponse (n° ${list}). Les questions non répondues seront comptées comme incorrectes.`,
  goThere: 'Y aller',
  finishAnyway: 'Terminer quand même',
  resGood: 'Solide !',
  resMid: 'En progression',
  resLow: 'À retravailler',
  pctCorrect: (pct, name) => `${pct} % de bonnes réponses · ${name}`,
  avgTime: (s) => `Temps moyen / question ${s}s`,
  cannotSayLabel: '« On ne peut pas savoir »',
  cannotSayTitle: 'Items dont la bonne réponse est « On ne peut pas savoir » — le piège le plus prédictif en verbal',
  answerLabel: (letter) => `Réponse ${letter}`,
  answerWord: 'Réponse',
  yourAnswer: 'Votre réponse :',
  correctAnswer: 'Bonne réponse :',
  solution: 'Solution :',
  explanation: 'Explication — ',
  notAnswered: 'Non répondue',
  vCorrect: 'Correct',
  vIncorrect: 'Incorrect',
  retry: 'Recommencer cette section',
  changeSection: 'Changer de section',
  resultsFooter: "Revoyez chaque explication : la régularité de l'entraînement compte plus que le score d'un test isolé.",
  resetConfirm: "Réinitialiser toute la progression et l'historique ? Cette action est irréversible.",
}

const STRINGS: Record<Lang, Strings> = { en: EN, fr: FR }

interface Ctx {
  lang: Lang
  setLang: (l: Lang) => void
  t: Strings
}
const LangContext = createContext<Ctx>(null as unknown as Ctx)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useLocalStorage<Lang>('cognitive-tests:lang', 'en')
  return <LangContext.Provider value={{ lang, setLang, t: STRINGS[lang] }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
