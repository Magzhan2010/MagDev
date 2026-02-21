import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/translations'

const ROLES_RU = ['Node.js Developer', 'React Developer', 'Backend Engineer', 'Fullstack Dev']
const ROLES_EN = ['Node.js Developer', 'React Developer', 'Backend Engineer', 'Fullstack Dev']
const ROLES_KZ = ['Node.js Әзірлеуші', 'React Әзірлеуші', 'Backend Инженер', 'Fullstack Dev']

export default function Hero() {
  const { t, lang } = useLang()
  const ROLES = lang === 'KZ' ? ROLES_KZ : lang === 'EN' ? ROLES_EN : ROLES_RU
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setDisplayed('')
    setDeleting(false)
    setRoleIndex(0)
  }, [lang])

  useEffect(() => {
    const current = ROLES[roleIndex]
    let timeout: ReturnType<typeof setTimeout>
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % ROLES.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex, ROLES])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []
    for (let i = 0; i < 80; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5, opacity: Math.random() * 0.5 + 0.1 })
    }
    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity})`; ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / 120) * 0.1})`; ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display font-black text-[20vw] text-white/[0.02] leading-none tracking-tighter">DEV</span>
      </div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/8 rounded-full blur-[80px] animate-float pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-indigo-500/5 rounded-full blur-[60px] animate-spin-slow pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-acid/30 bg-acid/5 mb-8"
            style={{ animation: 'fadeInUp 0.6s ease 0.1s both' }}>
            <span className="w-2 h-2 bg-acid rounded-full animate-pulse" />
            <span className="font-mono text-xs text-acid tracking-widest uppercase">{t.hero.badge}</span>
          </div>

          <h1 className="font-display font-black leading-[0.9] mb-6" style={{ animation: 'fadeInUp 0.8s ease 0.2s both' }}>
            <span className="block text-[clamp(3rem,9vw,8rem)] text-white">{t.hero.greeting}</span>
            <span className="block text-[clamp(3rem,9vw,8rem)] text-acid glow">{t.hero.developer}</span>
            <span className="block text-[clamp(1.5rem,4vw,3.5rem)] text-white/60 mt-2 font-mono">
              &lt; {displayed}<span className="animate-pulse text-acid">|</span>&nbsp;/&gt;
            </span>
          </h1>

          <p className="font-body text-lg text-muted max-w-xl leading-relaxed mb-10"
            style={{ animation: 'fadeInUp 0.8s ease 0.4s both' }}>{t.hero.desc}</p>

          <div className="flex flex-wrap gap-4" style={{ animation: 'fadeInUp 0.8s ease 0.5s both' }}>
            <a href="#projects"
              className="group relative px-8 py-4 bg-acid text-dark font-display font-bold text-sm rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95">
              <span className="relative z-10">{t.hero.cta1}</span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a href="#contact"
              className="px-8 py-4 border border-white/20 text-white font-display font-bold text-sm rounded-full hover:border-acid/60 hover:text-acid transition-all duration-300">
              {t.hero.cta2}
            </a>
          </div>

          <div className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-border"
            style={{ animation: 'fadeInUp 0.8s ease 0.7s both' }}>
            {[
              { num: '8+', label: t.hero.stat1 },
              { num: '∞', label: t.hero.stat2 },
              { num: '24/7', label: t.hero.stat3 },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display font-black text-3xl text-acid">{s.num}</div>
                <div className="font-body text-sm text-muted mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="font-mono text-xs text-muted tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-acid/60 to-transparent" />
      </div>
    </section>
  )
}
