// Composant racine : machine à états (accueil / examen / résultats), chrono, persistance.
import { useEffect, useMemo, useRef, useState } from 'react'
import type { ExamMode, ExamSection, Session, Store } from './types'
import { buildQuestions, SEC_MIN, type Lang } from './lib/questions'
import { useLocalStorage } from './lib/storage'
import { useLang } from './i18n'
import { Intro } from './components/Intro'
import { Exam } from './components/Exam'
import { Results } from './components/Results'

const STORAGE_KEY = 'cognitive-tests:v2'
const INIT: Store = { session: null, history: [] }

/** Mélange de Fisher-Yates (copie). */
function shuffled(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Ordre d'affichage des options par question. On randomise le numérique et
 * l'abstrait (pour entraîner le raisonnement, pas la position), mais on conserve
 * l'ordre canonique Vrai / Faux / On ne peut pas savoir en verbal.
 */
function makeOrders(sec: ExamSection, lang: Lang): number[][] {
  return buildQuestions(sec, lang).map((q) => (q.sec === 'verb' ? q.options.map((_, i) => i) : shuffled(q.options.length)))
}

/** Ajoute `d` ms au temps passé sur la question courante. Pur : dérivé de `prev`. */
function addTime(prev: Store, d: number): Store {
  if (!prev.session || d <= 0) return prev
  const ts = (prev.session.timeSpent ?? new Array(prev.session.answers.length).fill(0)).slice()
  ts[prev.session.idx] = (ts[prev.session.idx] ?? 0) + d
  return { ...prev, session: { ...prev.session, timeSpent: ts } }
}

/** Calcule le score et clôt la session (ajout à l'historique). Pur : dérivé de `prev`. */
function markFinished(prev: Store, at: number, lang: Lang): Store {
  if (!prev.session || prev.session.finished) return prev
  const s = prev.session
  const qs = buildQuestions(s.sec, lang)
  let correct = 0
  qs.forEach((q, i) => {
    if (s.answers[i] === q.correct) correct++
  })
  const total = qs.length
  const record = {
    sec: s.sec,
    mode: s.mode,
    chrono: s.chrono,
    correct,
    total,
    pct: Math.round((correct / total) * 100),
    durationMs: at - s.startedAt,
    date: new Date(at).toISOString(),
  }
  return { session: { ...s, finished: true, finishedAt: at }, history: [record, ...prev.history].slice(0, 100) }
}

export default function App() {
  const { lang, t } = useLang()
  const [store, setStore] = useLocalStorage<Store>(STORAGE_KEY, INIT)
  const session = store.session
  const qs = useMemo(() => (session ? buildQuestions(session.sec, lang) : []), [session?.sec, lang])

  // Horodatage d'affichage de la question courante, pour mesurer le temps par question.
  const viewRef = useRef(Date.now())
  function elapsed() {
    const t = Date.now()
    const d = t - viewRef.current
    viewRef.current = t
    return d
  }

  // Horloge : ne tourne qu'en examen chronométré non terminé.
  const [now, setNow] = useState(() => Date.now())
  const chronoActive = !!session && !session.finished && session.chrono && session.deadline != null
  useEffect(() => {
    if (!chronoActive) return
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 500)
    return () => clearInterval(id)
  }, [chronoActive, session?.startedAt])

  const remaining =
    session && session.chrono && session.deadline != null ? Math.max(0, Math.ceil((session.deadline - now) / 1000)) : null

  // Fin de temps → clôture automatique.
  useEffect(() => {
    if (chronoActive && remaining === 0) {
      const d = elapsed()
      setStore((prev) => markFinished(addTime(prev, d), Date.now(), lang))
    }
  }, [chronoActive, remaining, setStore, lang])

  // --- Actions ---
  function start(sec: ExamSection, mode: ExamMode, chrono: boolean) {
    const n = buildQuestions(sec, lang).length
    const startedAt = Date.now()
    const s: Session = {
      sec,
      mode,
      chrono,
      answers: new Array(n).fill(null),
      orders: makeOrders(sec, lang),
      flagged: new Array(n).fill(false),
      timeSpent: new Array(n).fill(0),
      idx: 0,
      startedAt,
      deadline: chrono ? startedAt + SEC_MIN[sec] * 60 * 1000 : null,
      finishedAt: null,
      finished: false,
    }
    viewRef.current = startedAt
    setStore((prev) => ({ ...prev, session: s }))
    window.scrollTo(0, 0)
  }

  function select(i: number) {
    setStore((prev) =>
      prev.session
        ? { ...prev, session: { ...prev.session, answers: prev.session.answers.map((a, j) => (j === prev.session!.idx ? i : a)) } }
        : prev,
    )
  }
  function toggleFlag(idx: number) {
    setStore((prev) =>
      prev.session
        ? { ...prev, session: { ...prev.session, flagged: prev.session.flagged.map((f, j) => (j === idx ? !f : f)) } }
        : prev,
    )
  }
  function goto(idx: number) {
    const d = elapsed()
    setStore((prev) => {
      const p = addTime(prev, d)
      return p.session ? { ...p, session: { ...p.session, idx } } : p
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  function prevQ() {
    if (!session || session.idx === 0) return
    const d = elapsed()
    setStore((prev) => {
      if (!prev.session) return prev
      const p = addTime(prev, d)
      return { ...p, session: { ...p.session!, idx: Math.max(0, p.session!.idx - 1) } }
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  function nextQ() {
    if (!session || session.idx >= qs.length - 1) return
    const d = elapsed()
    setStore((prev) => {
      if (!prev.session) return prev
      const p = addTime(prev, d)
      return { ...p, session: { ...p.session!, idx: p.session!.idx + 1 } }
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  function finish() {
    const d = elapsed()
    setStore((prev) => markFinished(addTime(prev, d), Date.now(), lang))
    window.scrollTo(0, 0)
  }
  function retry() {
    setStore((prev) => {
      if (!prev.session) return prev
      const sec = prev.session.sec
      const n = buildQuestions(sec, lang).length
      const startedAt = Date.now()
      return {
        ...prev,
        session: {
          ...prev.session,
          answers: new Array(n).fill(null),
          orders: makeOrders(sec, lang),
          flagged: new Array(n).fill(false),
          timeSpent: new Array(n).fill(0),
          idx: 0,
          startedAt,
          deadline: prev.session.chrono ? startedAt + SEC_MIN[sec] * 60 * 1000 : null,
          finishedAt: null,
          finished: false,
        },
      }
    })
    viewRef.current = Date.now()
    window.scrollTo(0, 0)
  }
  function home() {
    setStore((prev) => ({ ...prev, session: null }))
    window.scrollTo(0, 0)
  }
  function reset() {
    if (confirm(t.resetConfirm)) {
      setStore(INIT)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="wrap">
      {!session ? (
        <Intro history={store.history} onStart={start} onReset={reset} />
      ) : session.finished ? (
        <Results session={session} qs={qs} onRetry={retry} onHome={home} />
      ) : (
        <Exam
          session={session}
          qs={qs}
          remaining={remaining}
          onSelect={select}
          onGoto={goto}
          onPrev={prevQ}
          onNext={nextQ}
          onFinish={finish}
          onToggleFlag={toggleFlag}
          onQuit={home}
        />
      )}
    </div>
  )
}
