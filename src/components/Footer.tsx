import { useLang } from '../i18n/translations'

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()
  return (
    <footer className="py-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
        <div className="font-display font-bold text-xl">
          <span className="text-acid">Mag</span>
          <span className="text-white">Dev</span>
        </div>
        <p className="font-mono text-xs text-muted flex flex-wrap items-center gap-1.5">
          © {year} — Zhenis Magzhan
          <span className="mx-1 text-border">|</span>
          <span className="px-2 py-0.5 rounded-md bg-acid/10 text-acid border border-acid/20 font-bold tracking-wider">
            Computer Science
          </span>
          <span className="text-border">&amp;</span>
          <span className="px-2 py-0.5 rounded-md bg-white/5 text-white/70 border border-white/10 font-bold tracking-wider">
            Software Engineer
          </span>
        </p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/Magzhan2010" target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-acid transition-colors">GitHub</a>
          <a href="https://t.me/mag1shx" target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-acid transition-colors">Telegram</a>
          <a href="#contact" className="font-mono text-xs text-acid hover:underline">{t.footer.connect}</a>
        </div>
      </div>
    </footer>
  )
}
