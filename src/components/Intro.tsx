// Écran d'accueil : langue, choix de section/mode/chrono, tableau de bord, reset.
import { useState } from 'react'
import type { ExamMode, ExamSection, ResultRecord } from '../types'
import { questionCount, SEC_MIN } from '../lib/questions'
import { useLang } from '../i18n'
import { Emblem } from './Emblem'
import { LangToggle } from './LangToggle'
import { Sparkline } from './Sparkline'

const ICONS: Record<ExamSection, React.ReactNode> = {
  num: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <text x="12" y="17" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontWeight="700" fontSize="13" letterSpacing="0.5">
        123
      </text>
    </svg>
  ),
  verb: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h9" /></svg>
  ),
  abs: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="7" height="7" rx="1" /><circle cx="17.5" cy="7.5" r="3.5" /><path d="M4 16l3.5 4L11 16z" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
  ),
  all: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v18M3 12h18" /><circle cx="12" cy="12" r="9" /></svg>
  ),
}

const SECTIONS: ExamSection[] = ['num', 'verb', 'abs', 'all']

interface Props {
  history: ResultRecord[]
  onStart: (sec: ExamSection, mode: ExamMode, chrono: boolean) => void
  onReset: () => void
}

export function Intro({ history, onStart, onReset }: Props) {
  const { t } = useLang()
  const [sec, setSec] = useState<ExamSection | null>(null)
  const [mode, setMode] = useState<ExamMode>('exam')
  const [chrono, setChrono] = useState(true)

  const best: Partial<Record<ExamSection, number>> = {}
  history.forEach((h) => {
    if (best[h.sec] === undefined || h.pct > best[h.sec]!) best[h.sec] = h.pct
  })

  // Historique par section, du plus ancien au plus récent (pour la courbe d'évolution).
  const trend: Partial<Record<ExamSection, number[]>> = {}
  ;[...history].reverse().forEach((h) => {
    ;(trend[h.sec] ||= []).push(h.pct)
  })

  return (
    <>
      <div className="mast">
        <Emblem />
        <div className="mast-txt">
          <div className="kicker">{t.kicker}</div>
          <h1>{t.title}</h1>
        </div>
        <LangToggle />
      </div>

      <div className="card">
        <div className="lede">
          <p>{t.lede}</p>
        </div>

        <div className="sec-grid">
          {SECTIONS.map((s) => (
            <button key={s} className="sec" aria-pressed={sec === s} onClick={() => setSec(s)}>
              <span className="ic">{ICONS[s]}</span>
              <span>
                <b>{t.sec[s].name}</b>
                <span className="desc">{t.sec[s].blurb}</span>
                <span className="n">{t.qCount(questionCount(s), SEC_MIN[s])}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="opts-row">
          <label className="toggle">
            <input type="checkbox" checked={chrono} onChange={(e) => setChrono(e.target.checked)} />
            <span className="sw" />
            {t.timerLabel}
          </label>
          <label className="toggle">
            <input type="checkbox" checked={mode === 'learn'} onChange={(e) => setMode(e.target.checked ? 'learn' : 'exam')} />
            <span className="sw" />
            <span className="opt-label">
              {t.learnLabel} <b>{mode === 'learn' ? t.learnImmediate : t.learnDeferred}</b>
            </span>
          </label>
        </div>

        <div className="foot-cta">
          <button className="btn btn-primary" disabled={!sec} onClick={() => sec && onStart(sec, mode, chrono)}>
            {t.start}
          </button>
          <span className="hint">{sec ? t.ready(t.sec[sec].name) : t.selectFirst}</span>
        </div>

        <div className="note">
          <div className="box">{t.howItWorks}</div>
        </div>

        {history.length > 0 && (
          <div className="dash">
            <h3>{t.progressTitle}</h3>
            <div className="dash-box">
              <div className="dash-grid">
                {SECTIONS.map((s) =>
                  best[s] !== undefined ? (
                    <span key={s} className="stat-chip">
                      {t.sec[s].short} · {t.best}{' '}
                      <b className={best[s]! >= 70 ? 'hi' : best[s]! < 45 ? 'lo' : ''}>{best[s]}%</b>
                    </span>
                  ) : null,
                )}
                <span className="stat-chip">
                  {t.sessions} <b>{history.length}</b>
                </span>
              </div>
              {SECTIONS.some((s) => (trend[s]?.length ?? 0) >= 2) && (
                <div className="trend">
                  <span className="trend-lab">{t.trend}</span>
                  {SECTIONS.map((s) =>
                    (trend[s]?.length ?? 0) >= 2 ? (
                      <span key={s} className="trend-row">
                        <span className="trend-sec">{t.sec[s].short}</span>
                        <Sparkline points={trend[s]!} />
                        <span className="trend-last">{trend[s]![trend[s]!.length - 1]}%</span>
                      </span>
                    ) : null,
                  )}
                </div>
              )}
              <div className="dash-foot">
                <span className="hint">{t.storageHint}</span>
                <button className="btn btn-danger btn-sm" onClick={onReset}>
                  {t.resetData}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="legal">
        {t.footerLegal}
        <br />
        <a className="plain" href="https://www.shl.com/products/assessments/cognitive-assessments/" target="_blank" rel="noopener noreferrer">
          {t.footerLinkLabel}
        </a>
      </footer>
    </>
  )
}
