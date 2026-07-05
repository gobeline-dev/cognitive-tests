// Écran d'accueil : choix de la section, du mode, du chronomètre, tableau de bord, reset.
import { useState } from 'react'
import type { ExamMode, ExamSection, ResultRecord } from '../types'
import { questionCount, SEC_META } from '../lib/questions'
import { Emblem } from './Emblem'

const ICONS: Record<ExamSection, React.ReactNode> = {
  num: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fontFamily="'IBM Plex Mono', monospace"
        fontWeight="700"
        fontSize="13"
        letterSpacing="0.5"
      >
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
  const [sec, setSec] = useState<ExamSection | null>(null)
  const [mode, setMode] = useState<ExamMode>('exam')
  const [chrono, setChrono] = useState(true)

  // Meilleur score par section (pour le tableau de bord).
  const best: Partial<Record<ExamSection, number>> = {}
  history.forEach((h) => {
    if (best[h.sec] === undefined || h.pct > best[h.sec]!) best[h.sec] = h.pct
  })

  return (
    <>
      <div className="mast">
        <Emblem />
        <div className="mast-txt">
          <div className="kicker">Entraînement · raisonnement cognitif</div>
          <h1>Simulateur type SHL — préparation EPSO</h1>
        </div>
      </div>

      <div className="card">
        <div className="lede">
          <p>
            Choisissez une famille de tests, ou lancez le test complet. Chaque section reproduit le format des évaluations
            cognitives SHL Verify : réponse unique, correction commentée, chronomètre optionnel.
          </p>
        </div>

        <div className="sec-grid">
          {SECTIONS.map((s) => {
            const m = SEC_META[s]
            return (
              <button key={s} className="sec" aria-pressed={sec === s} onClick={() => setSec(s)}>
                <span className="ic">{ICONS[s]}</span>
                <span>
                  <b>{m.name}</b>
                  <span className="desc">{m.blurb}</span>
                  <span className="n">
                    {questionCount(s)} questions · ~{m.min} min
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        <div className="opts-row">
          <label className="toggle">
            <input type="checkbox" checked={chrono} onChange={(e) => setChrono(e.target.checked)} />
            <span className="sw" />
            Chronomètre
          </label>
          <label className="toggle">
            <input type="checkbox" checked={mode === 'learn'} onChange={(e) => setMode(e.target.checked ? 'learn' : 'exam')} />
            <span className="sw" />
            <span className="opt-label">
              Mode apprentissage <b>{mode === 'learn' ? '(correction immédiate)' : '(correction à la fin)'}</b>
            </span>
          </label>
        </div>

        <div className="foot-cta">
          <button className="btn btn-primary" disabled={!sec} onClick={() => sec && onStart(sec, mode, chrono)}>
            Commencer
          </button>
          <span className="hint">{sec ? `Prêt : ${SEC_META[sec].name}.` : "Sélectionnez d'abord une section."}</span>
        </div>

        <div className="note">
          <div className="box">
            <b>Comment ça marche —</b> répondez à chaque question, naviguez librement avec « Précédent / Suivant », via les
            étoiles de progression ou au clavier (touches <b>A–E</b>, flèches <b>← →</b>). En <b>mode examen</b>, la correction
            apparaît à la fin ; en <b>mode apprentissage</b>, elle s'affiche après chaque réponse. Objectif : reconnaître les
            mécanismes, gérer le temps, et repérer les pièges classiques (notamment les « On ne peut pas savoir » en verbal).
          </div>
        </div>

        {history.length > 0 && (
          <div className="dash">
            <h3>Votre progression</h3>
            <div className="dash-box">
              <div className="dash-grid">
                {SECTIONS.map((s) =>
                  best[s] !== undefined ? (
                    <span key={s} className="stat-chip">
                      {SEC_META[s].badge.charAt(0) + SEC_META[s].badge.slice(1).toLowerCase()} · meilleur{' '}
                      <b className={best[s]! >= 70 ? 'hi' : best[s]! < 45 ? 'lo' : ''}>{best[s]}%</b>
                    </span>
                  ) : null,
                )}
                <span className="stat-chip">
                  Sessions <b>{history.length}</b>
                </span>
              </div>
              <div className="dash-foot">
                <span className="hint">Progression et historique sont enregistrés sur cet appareil (localStorage).</span>
                <button className="btn btn-danger btn-sm" onClick={onReset}>
                  Réinitialiser les données
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="legal">
        Outil d'entraînement indépendant, non affilié à SHL ni à EPSO. Les questions sont originales et conçues pour
        reproduire les <i>formats</i> de raisonnement.
        <br />
        Ressource officielle :{' '}
        <a className="plain" href="https://www.shl.com/products/assessments/cognitive-assessments/" target="_blank" rel="noopener noreferrer">
          shl.com · cognitive assessments
        </a>
      </footer>
    </>
  )
}
