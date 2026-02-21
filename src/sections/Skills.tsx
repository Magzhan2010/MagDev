import { useEffect, useRef } from 'react'

const SKILLS = [
  {
    category: 'Frontend',
    color: '#38BDF8',
    items: [
      { name: 'HTML', level: 90, icon: '🌐' },
      { name: 'CSS', level: 88, icon: '🎨' },
      { name: 'JavaScript', level: 82, icon: '⚡' },
      { name: 'React.js', level: 78, icon: '⚛️' },
      { name: 'Tailwind CSS', level: 85, icon: '💨' },
    ],
  },
  {
    category: 'Backend',
    color: '#68A063',
    items: [
      { name: 'Node.js', level: 55, icon: '🟢', learning: true },
      { name: 'Express.js', level: 45, icon: '🛤️', learning: true },
      { name: 'REST API', level: 50, icon: '🔗', learning: true },
    ],
  },
  {
    category: 'Другие',
    color: '#38BDF8',
    items: [
      { name: 'Python', level: 60, icon: '🐍' },
      { name: 'TypeScript', level: 50, icon: '📘', learning: true },
      { name: 'Git / GitHub', level: 72, icon: '🐙' },
      { name: 'Figma', level: 40, icon: '🎭' },
    ],
  },
]

const TECH_LOGOS = [
  { name: 'HTML5', bg: '#E34F26', short: 'H5' },
  { name: 'CSS3', bg: '#1572B6', short: 'C3' },
  { name: 'JavaScript', bg: '#F7DF1E', short: 'JS', dark: true },
  { name: 'React', bg: '#20232A', short: '⚛' },
  { name: 'Node.js', bg: '#339933', short: 'NJ' },
  { name: 'Tailwind', bg: '#06B6D4', short: 'TW' },
  { name: 'Python', bg: '#3776AB', short: 'PY' },
  { name: 'TypeScript', bg: '#3178C6', short: 'TS' },
  { name: 'Git', bg: '#F05032', short: 'GT' },
]

function SkillBar({ name, level, icon, learning }: { name: string; level: number; icon: string; learning?: boolean }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && barRef.current) {
            barRef.current.style.width = `${level}%`
          }
        })
      },
      { threshold: 0.5 }
    )
    if (barRef.current) observer.observe(barRef.current)
    return () => observer.disconnect()
  }, [level])

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="font-body text-sm text-white">{name}</span>
          {learning && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-acid/10 text-acid border border-acid/20">
              учу
            </span>
          )}
        </div>
        <span className="font-mono text-xs text-muted">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: '0%', background: 'linear-gradient(90deg, #38BDF8, #0ea5e9)' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-10')
          }
        })
      },
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-surface/30" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div data-reveal className="opacity-0 translate-y-10 transition-all duration-700 mb-16">
          <span className="font-mono text-xs text-acid tracking-widest uppercase">02 / Навыки</span>
          <h2 className="font-display font-black text-5xl mt-3">
            Мой стек
            <span className="text-acid"> технологий</span>
          </h2>
          <p className="font-body text-muted mt-4 max-w-lg">
            Постоянно расту. То что помечено "учу" — уже в процессе, скоро буду уверенно использовать.
          </p>
        </div>

        {/* Tech logos marquee */}
        <div data-reveal className="opacity-0 translate-y-10 transition-all duration-700 delay-100 mb-16 overflow-hidden">
          <div className="flex gap-4 animate-marquee w-max">
            {[...TECH_LOGOS, ...TECH_LOGOS].map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border bg-surface whitespace-nowrap hover:border-acid/40 transition-colors duration-300 group shrink-0"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold group-hover:scale-110 transition-transform duration-200"
                  style={{
                    background: tech.bg,
                    color: tech.dark ? '#000' : '#fff',
                  }}
                >
                  {tech.short}
                </div>
                <span className="font-display font-bold text-sm text-white">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILLS.map((cat, catIdx) => (
            <div
              key={cat.category}
              data-reveal
              className="opacity-0 translate-y-10 transition-all duration-700 p-6 rounded-2xl border border-border bg-surface/50 hover:border-acid/20 transition-colors"
              style={{ transitionDelay: `${catIdx * 100 + 200}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 rounded-full" style={{ background: cat.color }} />
                <h3 className="font-display font-bold text-xl">{cat.category}</h3>
              </div>
              <div className="space-y-4">
                {cat.items.map((item) => (
                  <SkillBar key={item.name} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Currently learning banner */}
        <div
          data-reveal
          className="opacity-0 translate-y-10 transition-all duration-700 delay-500 mt-12 p-6 rounded-2xl border border-acid/20 bg-acid/5"
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-acid/10 flex items-center justify-center text-xl shrink-0">
              📚
            </div>
            <div>
              <div className="font-display font-bold text-white">Сейчас активно изучаю</div>
              <div className="font-body text-sm text-muted mt-0.5">
                Node.js, Express, REST API, базы данных — стану fullstack разработчиком
              </div>
            </div>
            <div className="ml-auto">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-acid animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
