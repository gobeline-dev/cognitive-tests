// Sélecteur de langue EN / FR (anglais par défaut).
import { useLang } from '../i18n'

export function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="langtoggle" role="group" aria-label="Language / Langue">
      <button className={lang === 'en' ? 'on' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
        EN
      </button>
      <button className={lang === 'fr' ? 'on' : ''} aria-pressed={lang === 'fr'} onClick={() => setLang('fr')}>
        FR
      </button>
    </div>
  )
}
