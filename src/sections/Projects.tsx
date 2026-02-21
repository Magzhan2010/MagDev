import { useEffect, useRef, useState } from 'react'

interface Project {
  id: number
  title: string
  shortDesc: string
  fullDesc: string
  tags: string[]
  type: string
  color: string
  emoji: string
  status: string
  link?: string
  features: string[]
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'AI Platform',
    shortDesc: 'Платформа с ИИ — чат, генерация кода и изображений в одном месте.',
    fullDesc: 'Полноценный AI-сайт с несколькими режимами: умный чат с ИИ, генерация и объяснение кода, генерация изображений по описанию. Чистый интерфейс, быстрый отклик, адаптивный дизайн.',
    tags: ['React', 'JavaScript', 'AI API', 'Tailwind'],
    type: 'Frontend',
    color: '#38BDF8',
    emoji: '🤖',
    status: 'Завершён',
    features: ['💬 Чат с ИИ', '💻 Генерация кода', '🖼️ Генерация изображений', '📱 Адаптивный дизайн'],
    link: '#',
  },
  {
    id: 2,
    title: 'Auth System',
    shortDesc: 'Система авторизации — регистрация, вход, защита роутов.',
    fullDesc: 'Полноценный сайт с системой аутентификации: регистрация, вход, выход, защищённые страницы. Валидация форм, хранение сессии, красивый UI.',
    tags: ['React', 'Node.js', 'JWT', 'CSS'],
    type: 'Fullstack',
    color: '#a78bfa',
    emoji: '🔐',
    status: 'Завершён',
    features: ['🔑 Регистрация и вход', '🛡️ JWT токены', '🔒 Защита роутов', '✅ Валидация форм'],
    link: '#',
  },
  {
    id: 3,
    title: 'Language Courses',
    shortDesc: 'Языковые курсы для школы — как Duolingo, сделал в 15 лет!',
    fullDesc: 'Проект для своей школы — платформа изучения языков в стиле Duolingo. Уроки, упражнения, прогресс, очки. Полностью с нуля в 15 лет — моя гордость.',
    tags: ['React', 'JavaScript', 'Tailwind', 'localStorage'],
    type: 'Frontend',
    color: '#34d399',
    emoji: '🌍',
    status: 'Завершён',
    features: ['📚 Уроки и упражнения', '⭐ Система очков', '📊 Отслеживание прогресса', '🏆 Достижения'],
    link: '#',
  },
  {
    id: 4,
    title: 'Weather Telegram Bot',
    shortDesc: 'Telegram бот — погода по городу в реальном времени.',
    fullDesc: 'Бот в Telegram который показывает погоду по любому городу: температура, влажность, ветер, прогноз. Простые команды, быстрый ответ.',
    tags: ['Python', 'Telegram API', 'Weather API'],
    type: 'Python',
    color: '#0088CC',
    emoji: '⛅',
    status: 'Завершён',
    features: ['🌡️ Текущая погода', '📅 Прогноз на 7 дней', '🌍 Любой город', '⚡ Мгновенный ответ'],
    link: '#',
  },
  {
    id: 5,
    title: 'Python Games',
    shortDesc: 'Коллекция мини-игр на Python — змейка, тетрис и другие.',
    fullDesc: 'Несколько игр написанных на Python с использованием pygame: Змейка, Тетрис, Угадай число, Крестики-нолики. Хороший старт для изучения логики программирования.',
    tags: ['Python', 'Pygame', 'OOP'],
    type: 'Python',
    color: '#facc15',
    emoji: '🎮',
    status: 'Завершён',
    features: ['🐍 Змейка', '🧱 Тетрис', '❌ Крестики-нолики', '🔢 Угадай число'],
    link: '#',
  },
  {
    id: 6,
    title: 'Frontend Projects',
    shortDesc: 'Коллекция небольших фронтенд сайтов и компонентов.',
    fullDesc: 'Много маленьких но красивых фронтенд проектов: лендинги, калькуляторы, todo-списки, анимации, UI компоненты. Каждый сделан чтобы отточить навык.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    type: 'Frontend',
    color: '#fb923c',
    emoji: '🎨',
    status: 'Пополняется',
    features: ['🖼️ Лендинги', '🧮 Калькуляторы', '✅ Todo apps', '✨ CSS анимации'],
    link: '#',
  },
  {
    id: 7,
    title: 'Portfolio Site',
    shortDesc: 'Этот сайт — сделан на React + Vite + TypeScript + Tailwind.',
    fullDesc: 'Мой личный сайт-портфолио. Кастомные анимации, частицы на canvas, typewriter эффект, scroll-reveal, форма заявки через WhatsApp. Всё с нуля.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    type: 'Frontend',
    color: '#38BDF8',
    emoji: '🚀',
    status: 'Завершён',
    features: ['✨ Canvas частицы', '⌨️ Typewriter эффект', '📜 Scroll анимации', '💬 WhatsApp форма'],
    link: '#',
  },
]

const FILTERS = ['Все', 'Frontend', 'Fullstack', 'Python']

export default function Projects() {
  const [filter, setFilter] = useState('Все')
  const [selected, setSelected] = useState<Project | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const filtered = filter === 'Все' ? PROJECTS : PROJECTS.filter((p) => p.type === filter)

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

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="projects" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-acid/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div data-reveal className="opacity-0 translate-y-10 transition-all duration-700 mb-12">
          <span className="font-mono text-xs text-acid tracking-widest uppercase">03 / Проекты</span>
          <h2 className="font-display font-black text-5xl mt-3">
            Что я
            <span className="text-acid"> построил</span>
          </h2>
          <p className="font-body text-muted mt-4 max-w-lg">
            Реальные проекты. Нажми на карточку — увидишь подробности.
          </p>
        </div>

        {/* Filters */}
        <div data-reveal className="opacity-0 translate-y-10 transition-all duration-700 delay-100 flex flex-wrap gap-3 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full font-display font-bold text-sm transition-all duration-300 ${
                filter === f
                  ? 'bg-acid text-dark scale-105'
                  : 'border border-border text-muted hover:border-acid/40 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              data-reveal
              onClick={() => setSelected(project)}
              className="opacity-0 translate-y-10 transition-all duration-700 group p-6 rounded-2xl border border-border bg-surface/50 hover:border-acid/30 hover:bg-surface relative overflow-hidden cursor-pointer"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}12, transparent 70%)` }}
              />

              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{project.emoji}</div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-mono ${
                    project.status === 'Пополняется'
                      ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      : 'bg-acid/10 text-acid border border-acid/20'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-acid transition-colors duration-300">
                {project.title}
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed mb-4">{project.shortDesc}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-white/5 text-white/60 rounded-lg font-mono text-xs border border-white/10">
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2.5 py-1 bg-white/5 text-white/40 rounded-lg font-mono text-xs border border-white/10">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>

              <div className="h-px bg-border mt-3 group-hover:bg-acid/30 transition-colors duration-300" />
              <p className="font-mono text-xs text-muted mt-3 group-hover:text-acid transition-colors duration-300">
                Нажми для деталей →
              </p>
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-700 rounded-b-2xl"
                style={{ background: project.color }}
              />
            </div>
          ))}
        </div>

        <div data-reveal className="opacity-0 translate-y-10 transition-all duration-700 delay-300 mt-10 text-center">
          <p className="font-mono text-sm text-muted">
            Больше проектов в разработке
            <span className="text-acid animate-pulse"> ...</span>
          </p>
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-dark/85 backdrop-blur-md" />

          <div
            className="relative w-full max-w-lg rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden"
            style={{ animation: 'scaleIn 0.25s ease' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1 w-full" style={{ background: selected.color }} />

            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted hover:text-white transition-all duration-200 text-sm"
            >
              ✕
            </button>

            <div className="p-7">
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                  style={{ background: `${selected.color}15`, border: `1px solid ${selected.color}30` }}
                >
                  {selected.emoji}
                </div>
                <div>
                  <h3 className="font-display font-black text-2xl text-white">{selected.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-xs text-muted">{selected.type}</span>
                    <span className="text-border">·</span>
                    <span className="font-mono text-xs" style={{ color: selected.color }}>{selected.status}</span>
                  </div>
                </div>
              </div>

              <p className="font-body text-sm text-white/70 leading-relaxed mb-5">{selected.fullDesc}</p>

              <div className="mb-5">
                <div className="font-mono text-xs text-muted tracking-widest uppercase mb-3">Что внутри</div>
                <div className="grid grid-cols-2 gap-2">
                  {selected.features.map((f) => (
                    <div key={f} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 font-body text-xs text-white/70">
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg font-mono text-xs border"
                    style={{ color: selected.color, borderColor: `${selected.color}40`, background: `${selected.color}10` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {selected.link && selected.link !== '#' ? (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl font-display font-bold text-sm text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={{ background: selected.color, color: '#040d1a' }}
                  >
                    Открыть проект →
                  </a>
                ) : (
                  <div
                    className="flex-1 py-3 rounded-xl font-display font-bold text-sm text-center opacity-40 cursor-not-allowed"
                    style={{ background: selected.color, color: '#040d1a' }}
                  >
                    Ссылка скоро будет
                  </div>
                )}
                <button
                  onClick={() => setSelected(null)}
                  className="px-5 py-3 rounded-xl border border-border font-display font-bold text-sm text-muted hover:text-white hover:border-acid/30 transition-all duration-300"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
