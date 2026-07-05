// Écran d'examen : une question à la fois, chrono, étoiles, clavier, mode apprentissage.
import { useEffect, useState } from 'react'
import type { Question, Session } from '../types'
import { SEC_META } from '../lib/questions'

interface Props {
  session: Session
  qs: Question[]
  remaining: number | null // secondes restantes (mode chrono)
  onSelect: (i: number) => void
  onGoto: (idx: number) => void
  onPrev: () => void
  onNext: () => void
  onFinish: () => void
  onQuit: () => void
}

export function Exam({ session, qs, remaining, onSelect, onGoto, onPrev, onNext, onFinish, onQuit }: Props) {
  const [confirmFinish, setConfirmFinish] = useState(false)
  const idx = session.idx
  const q = qs[idx]
  const answered = session.answers[idx]
  const isLast = idx === qs.length - 1
  const reveal = session.mode === 'learn' && answered != null
  const answeredCount = session.answers.filter((a) => a !== null).length
  const missing = session.answers.reduce<number[]>((acc, a, i) => (a === null ? [...acc, i + 1] : acc), [])

  function tryFinish() {
    if (missing.length > 0) setConfirmFinish(true)
    else onFinish()
  }

  // Navigation clavier : A–E pour répondre, ← → pour naviguer, Entrée pour avancer.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (confirmFinish) return
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      const k = e.key.toLowerCase()
      const letter = 'abcde'.indexOf(k)
      if (letter >= 0 && letter < q.options.length) {
        if (!reveal) onSelect(letter)
        e.preventDefault()
      } else if (e.key === 'ArrowLeft') {
        if (idx > 0) onPrev()
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (isLast) tryFinish()
        else onNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const mm = remaining != null ? String(Math.floor(remaining / 60)).padStart(2, '0') : '00'
  const ss = remaining != null ? String(remaining % 60).padStart(2, '0') : '00'
  const warn = remaining != null && remaining <= 60

  return (
    <>
      <div className="exambar">
        <div className="row">
          <span className="badge">
            {SEC_META[q.sec].badge}
            {session.mode === 'learn' && <span className="mode">APPRENTISSAGE</span>}
          </span>
          {session.chrono && (
            <span className={'timer mono' + (warn ? ' warn' : '')} role="timer" aria-label={`Temps restant ${mm} minutes ${ss} secondes`}>
              {mm}:{ss}
            </span>
          )}
        </div>
        <div className="stars">
          {qs.map((_, i) => (
            <button
              key={i}
              className={'star' + (session.answers[i] !== null ? ' done' : '') + (i === idx ? ' cur' : '')}
              aria-label={`Aller à la question ${i + 1}${session.answers[i] !== null ? ' (répondue)' : ''}`}
              aria-current={i === idx ? 'true' : undefined}
              onClick={() => onGoto(i)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4 7.3 13.6 2.2 9l6.9-.7z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="q">
          <div className="qmeta">
            Question {idx + 1} / {qs.length}
            <span className="tag">
              {SEC_META[q.sec].badge} · {q.tag}
            </span>
          </div>
          <div className="stem" dangerouslySetInnerHTML={{ __html: q.stemHTML }} />
        </div>

        <div className={'answers' + (q.fig ? ' grid5' : '')}>
          {q.options.map((opt, i) => {
            let cls = 'ans'
            if (reveal) {
              if (i === q.correct) cls += ' correct'
              else if (i === answered) cls += ' wrong'
            }
            const letter = String.fromCharCode(65 + i)
            const aria = q.fig ? `Réponse ${letter} : ${q.optionAria?.[i] ?? ''}` : undefined
            return (
              <button
                key={i}
                className={cls}
                aria-pressed={answered === i}
                aria-label={aria}
                disabled={reveal}
                onClick={() => onSelect(i)}
              >
                <span className="key">{letter}</span>
                {q.fig ? (
                  <span className="figwrap" dangerouslySetInnerHTML={{ __html: opt }} />
                ) : (
                  <span className="txt" dangerouslySetInnerHTML={{ __html: opt }} />
                )}
              </button>
            )
          })}
        </div>

        {reveal && (
          <div className="feedback">
            <div className="explain">
              <b>{answered === q.correct ? '✓ Correct — ' : '✗ Incorrect — '}</b>
              <span dangerouslySetInnerHTML={{ __html: q.explain }} />
            </div>
          </div>
        )}

        <div className="navbar">
          <button className="btn btn-ghost" onClick={onPrev} disabled={idx === 0}>
            ← Précédent
          </button>
          <span className="hint mono">
            {answeredCount} / {qs.length} répondues
          </span>
          <button className="btn btn-primary" onClick={() => (isLast ? tryFinish() : onNext())}>
            {isLast ? 'Terminer ✓' : 'Suivant →'}
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <button className="btn btn-ghost btn-sm" onClick={onQuit}>
          Abandonner et revenir à l'accueil
        </button>
      </div>

      {confirmFinish && (
        <div className="modal-bg" role="dialog" aria-modal="true" aria-label="Confirmation">
          <div className="modal">
            <h3>Terminer le test ?</h3>
            <p>
              Il reste <b>{missing.length}</b> question{missing.length > 1 ? 's' : ''} sans réponse (n° {missing.join(', ')}).
              Les questions non répondues seront comptées comme incorrectes.
            </p>
            <div className="row">
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setConfirmFinish(false)
                  onGoto(missing[0] - 1)
                }}
              >
                Y aller
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setConfirmFinish(false)
                  onFinish()
                }}
              >
                Terminer quand même
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
