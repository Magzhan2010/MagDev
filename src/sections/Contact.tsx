import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/translations'

const WHATSAPP_NUMBER = '77055718202'

export default function Contact() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ name: '', service: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.message) return
    setSending(true)
    const text = encodeURIComponent(
      t.contact.waMsg
        .replace('{name}', form.name)
        .replace('{service}', form.service || '—')
        .replace('{message}', form.message)
    )
    setTimeout(() => {
      setSending(false)
      setSent(true)
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank')
      setTimeout(() => { setSent(false); setForm({ name: '', service: '', message: '' }) }, 4000)
    }, 800)
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-10')
        }
      })
    }, { threshold: 0.1 })
    ref.current?.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const inputClass = 'w-full px-4 py-3.5 bg-white/5 border border-border rounded-xl font-body text-white placeholder-muted focus:outline-none focus:border-acid/50 focus:bg-acid/5 transition-all duration-300 text-sm'

  return (
    <section id="contact" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display font-black text-[15vw] text-white/[0.015] leading-none">CONTACT</span>
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-acid/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div data-reveal className="opacity-0 translate-y-10 transition-all duration-700">
              <span className="font-mono text-xs text-acid tracking-widest uppercase">{t.contact.tag}</span>
              <h2 className="font-display font-black text-5xl mt-3 leading-tight">
                {t.contact.title1}<br /><span className="text-acid">{t.contact.title2}</span>
              </h2>
            </div>
            <div data-reveal className="opacity-0 translate-y-10 transition-all duration-700 delay-100">
              <p className="font-body text-muted text-lg leading-relaxed">{t.contact.desc}</p>
            </div>
            <div data-reveal className="opacity-0 translate-y-10 transition-all duration-700 delay-200 space-y-4">
              {[
                { icon: '💬', label: 'WhatsApp', value: '+7 705 571 82 02', href: `https://wa.me/${WHATSAPP_NUMBER}` },
                { icon: '✈️', label: 'Telegram', value: '@mag1sh', href: 'https://t.me/mag1sh' },
                { icon: '📧', label: 'Email', value: 'zhenismagzhan99@gmail.com', href: 'mailto:zhenismagzhan99@gmail.com' },
              ].map((c) => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface/50 hover:border-acid/30 hover:bg-acid/5 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                    {c.icon}
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm text-white">{c.label}</div>
                    <div className="font-mono text-xs text-muted mt-0.5">{c.value}</div>
                  </div>
                  <div className="ml-auto text-muted group-hover:text-acid transition-colors duration-300">→</div>
                </a>
              ))}
            </div>
            <div data-reveal className="opacity-0 translate-y-10 transition-all duration-700 delay-300 p-4 rounded-xl border border-acid/20 bg-acid/5">
              <div className="flex items-center gap-3">
                <span className="text-xl">⏰</span>
                <div>
                  <div className="font-display font-bold text-sm text-white">{t.contact.responseTitle}</div>
                  <div className="font-body text-xs text-muted mt-0.5">{t.contact.responseDesc}</div>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-acid rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-acid">{t.contact.online}</span>
                </div>
              </div>
            </div>
          </div>

          <div data-reveal className="opacity-0 translate-y-10 transition-all duration-700 delay-200">
            <div className="p-8 rounded-2xl border border-border bg-surface/70 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-acid/5 rounded-bl-full pointer-events-none" />
              <h3 className="font-display font-bold text-xl mb-6 text-white">{t.contact.formTitle}</h3>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <div className="text-6xl animate-bounce">✅</div>
                  <div className="font-display font-bold text-xl text-white text-center">{t.contact.successTitle}</div>
                  <p className="font-body text-sm text-muted text-center">{t.contact.successDesc}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="font-mono text-xs text-muted block mb-2">{t.contact.nameLabel}</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder={t.contact.namePlaceholder} required className={inputClass} />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-muted block mb-2">{t.contact.serviceLabel}</label>
                    <select name="service" value={form.service} onChange={handleChange} className={inputClass}>
                      <option value="" className="bg-surface">{t.contact.serviceDefault}</option>
                      {t.contact.services.map((s) => (
                        <option key={s} value={s} className="bg-surface">{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-mono text-xs text-muted block mb-2">{t.contact.msgLabel}</label>
                    <textarea name="message" value={form.message} onChange={handleChange}
                      placeholder={t.contact.msgPlaceholder} required rows={4}
                      className={`${inputClass} resize-none`} />
                  </div>
                  <button type="submit" disabled={sending || !form.name || !form.message}
                    className="w-full py-4 bg-acid text-dark font-display font-black rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 relative overflow-hidden group">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {sending ? (
                        <><span className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />{t.contact.submitting}</>
                      ) : t.contact.submit}
                    </span>
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                  <p className="font-mono text-xs text-muted text-center">{t.contact.hint}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
