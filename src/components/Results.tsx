// Écran de résultats : anneau de score, sous-scores, temps moyen, revue commentée.
import type { Question, Session } from '../types'
import { SEC_META } from '../lib/questions'

interface Props {
  session: Session
  qs: Question[]
  onRetry: () => void
  onHome: () => void
}

export function Results({ session, qs, onRetry, onHome }: Props) {
  const ans = session.answers
  let correct = 0
  const bySec: Record<string, { ok: number; tot: number }> = {}
  qs.forEach((q, i) => {
    const ok = ans[i] === q.correct
    if (ok) correct++
    bySec[q.sec] = bySec[q.sec] || { ok: 0, tot: 0 }
    bySec[q.sec].tot++
    if (ok) bySec[q.sec].ok++
  })
  const total = qs.length
  const pct = Math.round((correct / total) * 100)

  const R = 64
  const C = 2 * Math.PI * R
  const off = C * (1 - correct / total)
  const col = pct >= 70 ? 'var(--good)' : pct >= 45 ? 'var(--gold)' : 'var(--bad)'
  const title = pct >= 70 ? 'Solide !' : pct >= 45 ? 'En progression' : 'À retravailler'

  const durationMs = session.finishedAt && session.startedAt ? session.finishedAt - session.startedAt : null
  const avgSec = durationMs ? Math.round(durationMs / 1000 / total) : null

  return (
    <>
      <div className="card">
        <div className="res-head">
          <div className="score-ring">
            <svg viewBox="0 0 150 150">
              <circle cx="75" cy="75" r={R} fill="none" stroke="var(--line)" strokeWidth="11" />
              <circle
                cx="75"
                cy="75"
                r={R}
                fill="none"
                stroke={col}
                strokeWidth="11"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={off}
                transform="rotate(-90 75 75)"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
              <text x="75" y="70" textAnchor="middle" fontFamily="Libre Franklin" fontWeight="800" fontSize="34" fill="var(--ink)">
                {correct}
              </text>
              <text x="75" y="93" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="13" fill="var(--ink-soft)">
                / {total}
              </text>
            </svg>
          </div>
          <h2>{title}</h2>
          <div className="sub">
            {pct} % de bonnes réponses · {SEC_META[session.sec].name}
          </div>
        </div>

        <div className="subscores">
          {session.sec === 'all' &&
            (['num', 'verb', 'abs'] as const).map((k) =>
              bySec[k] ? (
                <span key={k} className="chip">
                  {SEC_META[k].name.replace('Raisonnement ', '')}{' '}
                  <b>
                    {bySec[k].ok}/{bySec[k].tot}
                  </b>
                </span>
              ) : null,
            )}
          {avgSec != null && (
            <span className="chip">
              Temps moyen / question <b>{avgSec}s</b>
            </span>
          )}
        </div>

        <div className="review">
          {qs.map((q, i) => {
            const a = ans[i]
            const skipped = a === null
            const ok = a === q.correct
            const optLabel = (j: number) => (q.fig ? `Réponse ${String.fromCharCode(65 + j)}` : q.options[j])
            return (
              <div key={i} className={'rev-item ' + (skipped ? 'skip' : ok ? 'ok' : 'ko')}>
                <div className="rev-top">
                  Q{i + 1} · {SEC_META[q.sec].badge} · {q.tag}
                  <span className={'verdict ' + (skipped ? 'skip' : ok ? 'ok' : 'ko')}>
                    {skipped ? 'Non répondue' : ok ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                <div className="rev-q" dangerouslySetInnerHTML={{ __html: q.stemHTML }} />
                {!ok && !skipped && (
                  <div className="rev-line">
                    <span className="lab">Votre réponse : </span>
                    <span className="you" dangerouslySetInnerHTML={{ __html: optLabel(a!) }} />
                  </div>
                )}
                <div className="rev-line">
                  <span className="lab">Bonne réponse : </span>
                  <span className="cor" dangerouslySetInnerHTML={{ __html: optLabel(q.correct) }} />
                </div>
                {q.fig && (
                  <div className="rev-line" style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
                    <span className="lab">Solution : </span>
                    <span
                      style={{ width: 54, height: 54, border: '1.5px solid var(--good)', borderRadius: 8, padding: 4, background: '#fff' }}
                      dangerouslySetInnerHTML={{ __html: q.options[q.correct] }}
                    />
                  </div>
                )}
                <div className="explain">
                  <b>Explication — </b>
                  <span dangerouslySetInnerHTML={{ __html: q.explain }} />
                </div>
              </div>
            )
          })}
        </div>

        <div className="res-cta">
          <button className="btn btn-primary" onClick={onRetry}>
            Recommencer cette section
          </button>
          <button className="btn btn-ghost" onClick={onHome}>
            Changer de section
          </button>
        </div>
      </div>
      <footer className="legal">
        Revoyez chaque explication : la régularité de l'entraînement compte plus que le score d'un test isolé.
      </footer>
    </>
  )
}
