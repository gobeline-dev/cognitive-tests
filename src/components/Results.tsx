// Écran de résultats : anneau de score, sous-scores, temps moyen, revue commentée.
import type { Question, Session } from '../types'
import { useLang } from '../i18n'

interface Props {
  session: Session
  qs: Question[]
  onRetry: () => void
  onHome: () => void
}

export function Results({ session, qs, onRetry, onHome }: Props) {
  const { t } = useLang()
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

  // Sous-score « Cannot say » (le plus prédictif en verbal).
  let onpsTot = 0
  let onpsOk = 0
  qs.forEach((q, i) => {
    if (q.sec === 'verb' && q.correct === 2) {
      onpsTot++
      if (ans[i] === q.correct) onpsOk++
    }
  })

  const R = 64
  const C = 2 * Math.PI * R
  const off = C * (1 - correct / total)
  const col = pct >= 70 ? 'var(--good)' : pct >= 45 ? 'var(--gold)' : 'var(--bad)'
  const title = pct >= 70 ? t.resGood : pct >= 45 ? t.resMid : t.resLow

  const durationMs = session.finishedAt && session.startedAt ? session.finishedAt - session.startedAt : null
  const avgSec = durationMs ? Math.round(durationMs / 1000 / total) : null
  const timeSpent = session.timeSpent ?? []

  // Performance par type de question (tag) — pour cibler ses points faibles.
  const byTag: Record<string, { ok: number; tot: number }> = {}
  qs.forEach((q, i) => {
    byTag[q.tag] = byTag[q.tag] || { ok: 0, tot: 0 }
    byTag[q.tag].tot++
    if (ans[i] === q.correct) byTag[q.tag].ok++
  })
  const tags = Object.entries(byTag).sort((a, b) => a[1].ok / a[1].tot - b[1].ok / b[1].tot)

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
          <div className="sub">{t.pctCorrect(pct, t.sec[session.sec].name)}</div>
        </div>

        <div className="subscores">
          {session.sec === 'all' &&
            (['num', 'verb', 'abs'] as const).map((k) =>
              bySec[k] ? (
                <span key={k} className="chip">
                  {t.sec[k].short}{' '}
                  <b>
                    {bySec[k].ok}/{bySec[k].tot}
                  </b>
                </span>
              ) : null,
            )}
          {onpsTot > 0 && (
            <span className="chip" title={t.cannotSayTitle}>
              {t.cannotSayLabel}{' '}
              <b>
                {onpsOk}/{onpsTot}
              </b>
            </span>
          )}
          {avgSec != null && (
            <span className="chip" dangerouslySetInnerHTML={{ __html: t.avgTime(avgSec).replace(/(\d+s)$/, '<b>$1</b>') }} />
          )}
        </div>

        <div className="bytype">
          <h3>{t.byType}</h3>
          <div className="bytype-grid">
            {tags.map(([tag, s]) => {
              const r = s.ok / s.tot
              return (
                <span key={tag} className={'stat-chip' + (r < 0.5 ? ' weak' : r >= 0.8 ? ' strong' : '')}>
                  {tag}{' '}
                  <b>
                    {s.ok}/{s.tot}
                  </b>
                </span>
              )
            })}
          </div>
        </div>

        <div className="review">
          {qs.map((q, i) => {
            const a = ans[i]
            const skipped = a === null
            const ok = a === q.correct
            const optLabel = (j: number) => (q.fig ? t.answerLabel(String.fromCharCode(65 + j)) : q.options[j])
            return (
              <div key={i} className={'rev-item ' + (skipped ? 'skip' : ok ? 'ok' : 'ko')}>
                <div className="rev-top">
                  Q{i + 1} · {t.sec[q.sec].badge} · {q.tag}
                  <span className={'verdict ' + (skipped ? 'skip' : ok ? 'ok' : 'ko')}>
                    {skipped ? t.notAnswered : ok ? t.vCorrect : t.vIncorrect}
                  </span>
                  {timeSpent[i] > 0 && <span className="rev-time">⏱ {t.perQuestionTime(Math.round(timeSpent[i] / 1000))}</span>}
                </div>
                <div className="rev-q" dangerouslySetInnerHTML={{ __html: q.stemHTML }} />
                {!ok && !skipped && (
                  <div className="rev-line">
                    <span className="lab">{t.yourAnswer} </span>
                    <span className="you" dangerouslySetInnerHTML={{ __html: optLabel(a!) }} />
                  </div>
                )}
                <div className="rev-line">
                  <span className="lab">{t.correctAnswer} </span>
                  <span className="cor" dangerouslySetInnerHTML={{ __html: optLabel(q.correct) }} />
                </div>
                {q.fig && (
                  <div className="rev-line" style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
                    <span className="lab">{t.solution} </span>
                    <span
                      style={{ width: 54, height: 54, border: '1.5px solid var(--good)', borderRadius: 8, padding: 4, background: '#fff' }}
                      dangerouslySetInnerHTML={{ __html: q.options[q.correct] }}
                    />
                  </div>
                )}
                <div className="explain">
                  <b>{t.explanation}</b>
                  <span dangerouslySetInnerHTML={{ __html: q.explain }} />
                </div>
              </div>
            )
          })}
        </div>

        <div className="res-cta">
          <button className="btn btn-primary" onClick={onRetry}>
            {t.retry}
          </button>
          <button className="btn btn-ghost" onClick={onHome}>
            {t.changeSection}
          </button>
        </div>
      </div>
      <footer className="legal">{t.resultsFooter}</footer>
    </>
  )
}
