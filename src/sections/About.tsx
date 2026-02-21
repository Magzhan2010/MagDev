import { useEffect, useRef } from 'react'
import { useLang } from '../i18n/translations'

export default function About() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-10')
        }
      })
    }, { threshold: 0.15 })
    ref.current?.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const cardIcons = ['⚡', '🔧', '🎨', '🐍']

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-acid/[0.02] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div data-reveal className="opacity-0 translate-y-10 transition-all duration-700 relative">
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-border bg-surface group">
                <img src="/photo.jpg" alt="Maga — Node.js Developer"
                  className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-acid/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full border border-acid/20 rounded-2xl -z-10" />
              <div className="absolute -top-8 -right-8 w-full h-full border border-acid/10 rounded-2xl -z-20" />
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 bg-surface border border-border rounded-full whitespace-nowrap">
                <span className="w-2 h-2 bg-acid rounded-full animate-pulse" />
                <span className="font-mono text-xs text-white">{t.about.status}</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div data-reveal className="opacity-0 translate-y-10 transition-all duration-700 delay-100">
              <span className="font-mono text-xs text-acid tracking-widest uppercase">{t.about.tag}</span>
              <h2 className="font-display font-black text-5xl mt-3 leading-tight">
                {t.about.title1}<span className="text-acid">{t.about.title2}</span>{t.about.title3}
              </h2>
            </div>
            <div data-reveal className="opacity-0 translate-y-10 transition-all duration-700 delay-200">
              <p className="font-body text-muted leading-relaxed text-lg">{t.about.p1}</p>
            </div>
            <div data-reveal className="opacity-0 translate-y-10 transition-all duration-700 delay-300">
              <p className="font-body text-muted leading-relaxed">{t.about.p2}</p>
            </div>
            <div data-reveal className="opacity-0 translate-y-10 transition-all duration-700 delay-400 grid grid-cols-2 gap-4">
              {t.about.cards.map((card, i) => (
                <div key={card}
                  className="p-4 rounded-xl border border-border bg-surface/50 hover:border-acid/30 hover:bg-acid/5 transition-all duration-300 group">
                  <div className="text-2xl mb-2">{cardIcons[i]}</div>
                  <div className="font-display font-bold text-sm text-white">{card}</div>
                  <div className="font-body text-xs text-muted mt-0.5">{t.about.cardDescs[i]}</div>
                </div>
              ))}
            </div>
            <div data-reveal className="opacity-0 translate-y-10 transition-all duration-700 delay-500">
              <a href="#contact"
                className="inline-flex items-center gap-2 font-display font-bold text-acid hover:gap-4 transition-all duration-300">
                {t.about.cta} <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
