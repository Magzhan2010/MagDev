import { useLang, Lang } from '../i18n/translations'

const LANGS: Lang[] = ['RU', 'EN', 'KZ']

export default function LangSwitcher() {
  const { lang, setLang } = useLang()

  return (
    <div className="flex items-center gap-1 p-1 rounded-full border border-border bg-surface/50">
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 rounded-full font-mono text-xs font-bold transition-all duration-300 ${
            lang === l
              ? 'bg-acid text-dark scale-105'
              : 'text-muted hover:text-white'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
