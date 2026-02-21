import { useState, useEffect } from 'react'
import { useLang } from '../i18n/translations'
import LangSwitcher from './LangSwitcher'

export default function Navbar() {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const links = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.contact, href: '#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'py-3 bg-dark/80 backdrop-blur-xl border-b border-border' : 'py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-xl tracking-tight group">
          <span className="text-acid">Mag</span>
          <span className="text-white">Dev</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.href} href={link.href}
              className="font-body text-sm text-muted hover:text-white transition-colors duration-300 relative group">
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-acid transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <LangSwitcher />
          <a href="#contact"
            className="px-5 py-2 bg-acid text-dark font-display font-bold text-sm rounded-full hover:scale-105 active:scale-95 transition-transform duration-200">
            {t.nav.cta}
          </a>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <LangSwitcher />
          <button className="flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)}>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-500 overflow-hidden ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-4 flex flex-col gap-4 border-t border-border bg-dark/95">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}
              className="text-muted hover:text-white font-body transition-colors duration-200">
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}
            className="px-5 py-2.5 bg-acid text-dark font-display font-bold text-sm rounded-full text-center">
            {t.nav.cta}
          </a>
        </div>
      </div>
    </nav>
  )
}
