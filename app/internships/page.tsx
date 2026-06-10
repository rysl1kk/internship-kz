"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Internship {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  category: string;
  logo: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  techStack: string[];
}

const initialInternships: Internship[] = [
  {
    id: 1,
    title: "Frontend Developer (React)",
    company: "Kaspi.kz",
    location: "Алматы",
    type: "Full-time",
    salary: "От 150,000 ₸",
    category: "Разработка",
    logo: "💻",
    description: "Мы ищем амбициозного Frontend-разработчика в команду Kaspi Maps. Вам предстоит работать над улучшением пользовательского опыта миллионов казахстанцев, оптимизировать производительность карт и внедрять новые фичи.",
    requirements: [
      "Уверенное знание JavaScript (ES6+) и TypeScript",
      "Опыт работы с React и хуками (useState, useEffect, useMemo)",
      "Понимание работы CSS-фреймворков (Tailwind CSS) и препроцессоров",
      "Базовые навыки работы с Git"
    ],
    responsibilities: [
      "Разработка и поддержка интерактивных компонентов интерфейса",
      "Оптимизация скорости загрузки клиентской части приложения",
      "Взаимодействие с UI/UX дизайнерами и Backend-разработчиками"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Vite"]
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Kolesa Group",
    location: "Удаленно",
    type: "Flexible",
    salary: "По результатам",
    category: "Дизайн",
    logo: "🎨",
    description: "Присоединяйтесь к дизайну продуктов, которыми пользуются каждый день. В Kolesa Group вы будете исследовать боли пользователей, проектировать интерфейсы высокой сложности и тестировать гипотезы.",
    requirements: [
      "Отличное владение Figma (компоненты, варианты, auto-layout)",
      "Понимание принципов веб- и мобильной доступности (UI/UX)",
      "Наличие портфолио с учебными или коммерческими кейсами",
      "Умение обосновывать свои дизайнерские решения"
    ],
    responsibilities: [
      "Создание wireframe'ов и высокоточных интерактивных прототипов",
      "Проведение качественных интервью и юзабилити-тестирований",
      "Развитие и поддержка внутренней дизайн-системы"
    ],
    techStack: ["Figma", "FigJam", "Principle", "Adobe Photoshop"]
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Halyk Bank",
    location: "Астана",
    type: "Internship",
    salary: "120,000 ₸",
    category: "Аналитика",
    logo: "📈",
    description: "Стажировка в департаменте больших данных Halyk. Отличный шанс поработать с терабайтами реальной информации, научиться строить сложные дашборды и находить скрытые инсайты для бизнеса.",
    requirements: [
      "Базовые знания SQL (написание простых SELECT, JOIN, GROUP BY)",
      "Знание основ языка Python (библиотеки Pandas, NumPy, Matplotlib)",
      "Понимание базовых принципов математической статистики",
      "Внимательность к деталям и аналитический склад ума"
    ],
    responsibilities: [
      "Сбор, очистка и предварительная обработка сырых данных",
      "Разработка автоматизированных дашбордов в BI-системах",
      "Подготовка регулярной аналитической отчетности для менеджмента"
    ],
    techStack: ["SQL", "Python", "Pandas", "PowerBI", "PostgreSQL"]
  },
  {
    id: 4,
    title: "Backend Engineer (Go / Python)",
    company: "Chocofamily",
    location: "Алматы",
    type: "Full-time",
    salary: "От 180,000 ₸",
    category: "Разработка",
    logo: "⚙️",
    description: "Ищем начинающего инженера на бэкенд высоконагруженных сервисов покупки билетов Chocotravel. Поможем вырасти в крепкого backend-разработчика под руководством опытных менторов.",
    requirements: [
      "Знание синтаксиса Go или Python на базовом уровне",
      "Понимание принципов работы реляционных БД",
      "Представление об архитектурном стиле REST API",
      "Желание изучать Docker и основы контейнеризации"
    ],
    responsibilities: [
      "Написание чистого и тестируемого серверного кода",
      "Проектирование простых схем баз данных и оптимизация запросов",
      "Покрытие написанного функционала интеграционными тестами"
    ],
    techStack: ["Go", "Python", "FastAPI", "PostgreSQL", "Docker", "Redis"]
  },
  {
    id: 5,
    title: "SMM Specialist",
    company: "Beevile",
    location: "Шымкент",
    type: "Flexible",
    salary: "90,000 ₸",
    category: "Маркетинг",
    logo: "📱",
    description: "Ищем креативного контент-мейкера, который вдохнет новую жизнь в наши социальные сети. Если ты следишь за трендами TikTok, Reels и умеешь писать вовлекающие тексты — мы ждем тебя.",
    requirements: [
      "Опыт создания мобильного видеоконтента (монтаж в CapCut / VN)",
      "Грамотный русский и казахский языки (письменный)",
      "Понимание алгоритмов продвижения Instagram, TikTok, YouTube Shorts",
      "Базовое чувство стиля и эстетики"
    ],
    responsibilities: [
      "Разработка ежемесячного контент-плана для соцсетей",
      "Съемка, монтаж и публикация ежедневных видеороликов",
      "Модерация комментариев и общение с аудиторией в директе"
    ],
    techStack: ["CapCut", "Canva", "Instagram API", "TikTok Trends"]
  },
  {
    id: 6,
    title: "Product Manager Assistant",
    company: "Technodom",
    location: "Алматы",
    type: "Internship",
    salary: "По результатам",
    category: "Аналитика",
    logo: "💼",
    description: "Стань правой рукой продуктового менеджера в e-commerce гиганте. Ты будешь помогать развивать мобильное приложение Technodom, анализировать конкурентов и собирать требования пользователей.",
    requirements: [
      "Понимание концепций MVP, Product-Market Fit, Юнит-экономики",
      "Умение структуруировать информацию и вести документацию",
      "Проактивность и сильные коммуникативные навыки",
      "Базовый опыт работы с Notion или Jira будет плюсом"
    ],
    responsibilities: [
      "Анализ фич конкурентов на рынке СНГ и мира",
      "Помощь в составлении технических заданий (PRD) для разработки",
      "Сбор обратной связи от пользователей и классификация багов"
    ],
    techStack: ["Notion", "Jira", "Miro", "Google Analytics"]
  }
];

const floatingOrbs = [
  { cx: "10%", cy: "30%", r: 300, color: "#3b82f6", opacity: 0.08 },
  { cx: "90%", cy: "70%", r: 250, color: "#818cf8", opacity: 0.06 },
];

export default function InternshipsPage() {
  const [filter, setFilter] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<Internship | null>(null);

  const categories = ["Все", "Разработка", "Дизайн", "Аналитика", "Маркетинг"];

  const filteredData = initialInternships.filter(item => {
    const matchesCategory = filter === "Все" || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative w-full overflow-hidden min-h-screen text-white bg-[#060b18]">
      {/* Шапка без кнопки Войти */}
      <div className="w-full border-b border-slate-900/80 bg-[#060b18]/60 backdrop-blur-md sticky top-0 z-40">
        <header className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <span className="font-black text-xl tracking-tight cursor-pointer" onClick={() => { setFilter("Все"); setSearchQuery(""); }}>
              Intern<span className="text-blue-500">.kz</span>
            </span>
            <nav className="flex items-center gap-8 text-sm font-medium">
              <button onClick={() => { setFilter("Все"); setSearchQuery(""); }} className="text-blue-400 font-bold transition">
                Стажировки
              </button>
            </nav>
          </div>
        </header>
      </div>

      {/* Анимированный фон */}
      <div className="fixed inset-0 -z-10 bg-[#060b18] pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        {floatingOrbs.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ left: orb.cx, top: orb.cy, width: orb.r * 2, height: orb.r * 2, background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`, opacity: orb.opacity, transform: "translate(-50%, -50%)", filter: "blur(50px)" }}
            animate={{ scale: [1, 1.1, 1], opacity: [orb.opacity, orb.opacity * 1.5, orb.opacity] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Каталог стажировок */}
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 text-xs font-bold px-4 py-2 rounded-full mb-4 border border-blue-500/20 uppercase tracking-widest backdrop-blur-sm">
            Актуальные вакансии • 2026
          </span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1] mb-4">
            Каталог <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">стажировок</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl font-medium leading-relaxed">
            Найди свою первую работу в топовых компаниях. Мы собрали лучшие предложения для студентов и выпускников.
          </p>
        </div>

        {/* Поиск и фильтры */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12">
          <div className="flex-grow relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по названию или компании..." 
              className="w-full bg-slate-900/40 border border-slate-800/60 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all backdrop-blur-md text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-4 rounded-2xl text-xs font-bold transition-all duration-200 ${
                  filter === cat 
                  ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] border-blue-500" 
                  : "bg-slate-900/40 text-slate-400 border border-slate-800/60 hover:border-slate-500/40"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Сетка вакансий */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredData.length > 0 ? (
              filteredData.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative p-8 rounded-[32px] border border-slate-800/60 flex flex-col justify-between cursor-pointer"
                  style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(12px)" }}
                  onClick={() => setSelectedJob(job)}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl border border-slate-700/50">
                        {job.logo}
                      </div>
                      <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20 uppercase tracking-tighter">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-slate-400 text-sm font-medium mb-6">
                      {job.company} • {job.location}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-800/60 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                    <span className="text-white font-bold text-sm">{job.salary}</span>
                    <button onClick={() => setSelectedJob(job)} className="text-xs font-bold px-4 py-2.5 rounded-xl border bg-blue-600/10 border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white transition-all">
                      Подробнее
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-slate-500 text-sm font-medium">
                По вашему запросу ничего не найдено.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Модалка */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => setSelectedJob(null)} className="absolute inset-0 bg-black/75 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 md:p-10 rounded-[32px] border border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-2xl z-10"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl border border-slate-700/50">
                    {selectedJob.logo}
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-white">{selectedJob.title}</h2>
                    <p className="text-slate-400 text-sm font-medium">{selectedJob.company} • {selectedJob.location}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedJob(null)} className="text-slate-500 hover:text-white text-sm bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-700/30">
                  Закрыть
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-xl border border-blue-400/20 uppercase">{selectedJob.type}</span>
                <span className="text-xs font-bold text-indigo-400 bg-indigo-400/10 px-3 py-1.5 rounded-xl border border-indigo-400/20 uppercase">{selectedJob.category}</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-xl border border-emerald-400/20">{selectedJob.salary}</span>
              </div>

              <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
                <div>
                  <h4 className="text-white font-bold text-base mb-2">О стажировке</h4>
                  <p>{selectedJob.description}</p>
                </div>
                <div>
                  <h4 className="text-white font-bold text-base mb-2">Требования</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-400">
                    {selectedJob.requirements.map((req, i) => <li key={i}>{req}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold text-base mb-2">Обязанности</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-400">
                    {selectedJob.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold text-base mb-3">Технологический стек</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.techStack.map((tech, i) => (
                      <span key={i} className="text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 block">Оклад</span>
                  <span className="text-white font-black text-lg md:text-xl">{selectedJob.salary}</span>
                </div>
                <button onClick={() => alert("Вы откликнулись!")} className="text-sm font-bold px-6 py-3.5 rounded-2xl border bg-blue-600 border-blue-500 text-white hover:bg-blue-500 transition-all">
                  Откликнуться
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}