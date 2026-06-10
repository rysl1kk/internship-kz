"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js"; // Убедись, что пакет установлен

// Инициализация Supabase (замени url и anon_key на свои переменные окружения, если необходимо)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  
  // Состояния для авторизации
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const categories = ["Все", "Разработка", "Дизайн", "Аналитика"];

  // Проверка текущего юзера при загрузке страницы
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert("Регистрация успешна! Проверьте почту для подтверждения.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      setIsAuthModalOpen(false);
      setEmail("");
      setPassword("");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setShowDropdown(false);
  };

  const filteredData = initialInternships.filter(item => {
    const matchesCategory = filter === "Все" || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative w-full overflow-hidden min-h-screen text-white bg-[#060b18]">
      
      {/* Шапка с динамической кнопкой Вход / Профиль */}
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

          {/* Правая часть: Динамический профиль пользователя */}
          <div className="relative">
            {user ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 hover:border-slate-700 px-4 py-2 rounded-2xl transition"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                    {user.email[0].toUpperCase()}
                  </div>
                  <span className="text-xs text-slate-300 hidden md:inline-block max-w-[120px] truncate">
                    {user.email}
                  </span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-14 w-48 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl z-50">
                    <button 
                      onClick={handleSignOut}
                      className="w-full text-left text-xs font-bold text-red-400 hover:bg-red-500/10 px-4 py-3 rounded-xl transition"
                    >
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                Войти
              </button>
            )}
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
            {filteredData.map((job) => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -5, scale: 1.02 }}
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
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Модальное окно Авторизации */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => setIsAuthModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md p-8 md:p-10 rounded-[32px] border border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-2xl z-10"
            >
              <h3 className="text-2xl font-black mb-2">
                {isSignUp ? "Создать аккаунт" : "С возвращением"}
              </h3>
              <p className="text-slate-400 text-xs font-medium mb-6">
                {isSignUp ? "Зарегистрируйтесь, чтобы откликаться на стажировки" : "Войдите в свой личный профиль"}
              </p>

              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-2">Email адрес</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-2">Пароль</label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-4 rounded-xl transition uppercase tracking-wider mt-2 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  {loading ? "Загрузка..." : isSignUp ? "Зарегистрироваться" : "Войти"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-xs font-bold text-slate-400 hover:text-blue-400 transition"
                >
                  {isSignUp ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Создать"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Модальное окно деталей вакансии */}
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
                <button 
                  onClick={() => {
                    if (!user) {
                      setIsAuthModalOpen(true);
                    } else {
                      alert("Вы успешно откликнулись!");
                    }
                  }} 
                  className="text-sm font-bold px-6 py-3.5 rounded-2xl border bg-blue-600 border-blue-500 text-white hover:bg-blue-500 transition-all"
                >
                  {user ? "Откликнуться" : "Войдите, чтобы откликнуться"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}