// Composant racine : machine à états (accueil / examen / résultats), chrono, persistance.
import { useEffect, useMemo, useState } from 'react'
import type { ExamMode, ExamSection, Session, Store } from './types'
import { buildQuestions, SEC_META } from './lib/questions'
import { useLocalStorage } from './lib/storage'
import { Intro } from './components/Intro'
import { Exam } from './components/Exam'
import { Results } from './components/Results'

const STORAGE_KEY = 'cognitive-tests:v1'
const INIT: Store = { session: null, history: [] }

/** Calcule le score et clôt la session (ajout à l'historique). Pur : dérivé de `prev`. */
function markFinished(prev: Store, at: number): Store {
  if (!prev.session || prev.session.finished) return prev
  const s = prev.session
  const qs = buildQuestions(s.sec)
  let correct = 0
  qs.forEach((q, i) => {
    if (s.answers[i] === q.correct) correct++
  })
  const total = qs.length
  const finishedAt = at
  const record = {
    sec: s.sec,
    mode: s.mode,
    chrono: s.chrono,
    correct,
    total,
    pct: Math.round((correct / total) * 100),
    durationMs: finishedAt - s.startedAt,
    date: new Date(finishedAt).toISOString(),
  }
  return {
    session: { ...s, finished: true, finishedAt },
    history: [record, ...prev.history].slice(0, 100),
  }
}

export default function App() {
  const [store, setStore] = useLocalStorage<Store>(STORAGE_KEY, INIT)
  const session = store.session
  const qs = useMemo(() => (session ? buildQuestions(session.sec) : []), [session?.sec])

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
      setStore((prev) => markFinished(prev, Date.now()))
    }
  }, [chronoActive, remaining, setStore])

  // --- Actions ---
  function start(sec: ExamSection, mode: ExamMode, chrono: boolean) {
    const n = buildQuestions(sec).length
    const startedAt = Date.now()
    const s: Session = {
      sec,
      mode,
      chrono,
      answers: new Array(n).fill(null),
      idx: 0,
      startedAt,
      deadline: chrono ? startedAt + SEC_META[sec].min * 60 * 1000 : null,
      finishedAt: null,
      finished: false,
    }
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
  function goto(idx: number) {
    setStore((prev) => (prev.session ? { ...prev, session: { ...prev.session, idx } } : prev))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  function prevQ() {
    setStore((prev) => (prev.session && prev.session.idx > 0 ? { ...prev, session: { ...prev.session, idx: prev.session.idx - 1 } } : prev))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  function nextQ() {
    setStore((prev) =>
      prev.session && prev.session.idx < qs.length - 1
        ? { ...prev, session: { ...prev.session, idx: prev.session.idx + 1 } }
        : prev,
    )
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  function finish() {
    setStore((prev) => markFinished(prev, Date.now()))
    window.scrollTo(0, 0)
  }
  function retry() {
    setStore((prev) => {
      if (!prev.session) return prev
      const n = buildQuestions(prev.session.sec).length
      const startedAt = Date.now()
      return {
        ...prev,
        session: {
          ...prev.session,
          answers: new Array(n).fill(null),
          idx: 0,
          startedAt,
          deadline: prev.session.chrono ? startedAt + SEC_META[prev.session.sec].min * 60 * 1000 : null,
          finishedAt: null,
          finished: false,
        },
      }
    })
    window.scrollTo(0, 0)
  }
  function home() {
    setStore((prev) => ({ ...prev, session: null }))
    window.scrollTo(0, 0)
  }
  function reset() {
    if (confirm('Réinitialiser toute la progression et l\'historique ? Cette action est irréversible.')) {
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
          onQuit={home}
        />
      )}
    </div>
  )
}
