"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/supabaseClient";

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
      "Умение структурировать информацию и вести документацию",
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
  { cx: "10%", cy: "30%", r: 300, color: "#3b82f6", opacity: 0.08, delay: 0 },
  { cx: "90%", cy: "70%", r: 250, color: "#818cf8", opacity: 0.06, delay: 1 },
];

export default function InternshipsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "applied">("all");
  const [filter, setFilter] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedJobIds, setAppliedJobIds] = useState<number[]>([]);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Internship | null>(null);

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [editUsername, setEditUsername] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const categories = ["Все", "Разработка", "Дизайн", "Аналитика", "Маркетинг"];

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", session.user.id)
          .single();

        const currentUsername = profile?.username || session.user.email?.split("@")[0] || "";
        setUser({
          id: session.user.id,
          email: session.user.email,
          username: currentUsername,
          avatar: profile?.avatar_url || null
        });
        setEditUsername(currentUsername);

        const { data: apps } = await supabase
          .from("applications")
          .select("job_id")
          .eq("user_id", session.user.id);
        
        if (apps) setAppliedJobIds(apps.map(a => a.job_id));
      }
    }
    checkUser();
  }, []);

  const handleApplyToggle = async (jobId: number) => {
    if (!user) {
      setIsSignUp(false);
      setIsAuthModalOpen(true);
      return;
    }

    if (appliedJobIds.includes(jobId)) {
      const { error } = await supabase
        .from("applications")
        .delete()
        .eq("user_id", user.id)
        .eq("job_id", jobId);

      if (!error) setAppliedJobIds(appliedJobIds.filter(id => id !== jobId));
    } else {
      const { error } = await supabase
        .from("applications")
        .insert({ user_id: user.id, job_id: jobId });

      if (!error) setAppliedJobIds([...appliedJobIds, jobId]);
    }
  };

  const uploadAvatar = async (file: File, userId: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) return null;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      return data.publicUrl;
    } catch {
      return null;
    }
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    let finalAvatarUrl = user.avatar;
    const file = editFileInputRef.current?.files?.[0];
    if (file) {
      const uploadedUrl = await uploadAvatar(file, user.id);
      if (uploadedUrl) finalAvatarUrl = uploadedUrl;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        username: editUsername,
        avatar_url: finalAvatarUrl
      })
      .eq("id", user.id);

    if (error) {
      alert("Этот никнейм уже занят или произошла ошибка!");
    } else {
      setUser((prev: any) => ({
        ...prev,
        username: editUsername,
        avatar: finalAvatarUrl
      }));
      setIsProfileModalOpen(false);
    }
    setLoading(false);
  };

  const handleLocalAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const handleEditAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUser((prev: any) => ({ ...prev, avatar: URL.createObjectURL(file) }));
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        alert(error.message);
      } else if (data.user) {
        let finalAvatarUrl = null;
        const file = fileInputRef.current?.files?.[0];
        if (file) {
          finalAvatarUrl = await uploadAvatar(file, data.user.id);
        }

        const registeredName = username || email.split("@")[0];
        await supabase.from("profiles").insert({
          id: data.user.id,
          username: registeredName,
          avatar_url: finalAvatarUrl
        });

        setUser({
          id: data.user.id,
          email,
          username: registeredName,
          avatar: finalAvatarUrl
        });
        setEditUsername(registeredName);
        setIsAuthModalOpen(false);
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert(error.message);
      } else if (data.user) {
        const { data: profile } = await supabase.from("profiles").select().eq("id", data.user.id).single();
        const loggedInName = profile?.username || email.split("@")[0];
        
        setUser({
          id: data.user.id,
          email: data.user.email,
          username: loggedInName,
          avatar: profile?.avatar_url || null
        });
        setEditUsername(loggedInName);

        const { data: apps } = await supabase.from("applications").select("job_id").eq("user_id", data.user.id);
        if (apps) setAppliedJobIds(apps.map(a => a.job_id));
        
        setIsAuthModalOpen(false);
      }
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAppliedJobIds([]);
    setAvatarUrl(null);
    setEditUsername("");
    setIsProfileModalOpen(false);
    setActiveTab("all");
  };

  const filteredData = initialInternships.filter(item => {
    const matchesTab = activeTab === "all" || appliedJobIds.includes(item.id);
    const matchesCategory = filter === "Все" || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesCategory && matchesSearch;
  });

  return (
    <div className="relative w-full overflow-hidden min-h-screen text-white">
      {/* Главная рабочая панель навигации (бывшая нижняя) */}
      <div className="w-full border-b border-slate-900 bg-[#060b18]/60 backdrop-blur-md">
        <header className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <span className="font-black text-xl tracking-tight cursor-pointer" onClick={() => setActiveTab("all")}>
              Intern<span className="text-blue-500">.kz</span>
            </span>
            {/* Навигационные кнопки, перенесенные из старой шапки */}
            <nav className="flex items-center gap-6 text-sm font-medium">
              <button 
                onClick={() => setActiveTab("all")} 
                className={`transition ${activeTab === "all" ? "text-blue-400 font-bold" : "text-slate-400 hover:text-white"}`}
              >
                Стажировки
              </button>
              <button 
                onClick={() => alert("Раздел 'Блог' находится в разработке")} 
                className="text-slate-400 hover:text-white transition"
              >
                Блог
              </button>
              <button 
                onClick={() => alert("Раздел 'О нас' находится в разработке")} 
                className="text-slate-400 hover:text-white transition"
              >
                О нас
              </button>
            </nav>
          </div>

          <div>
            {user ? (
              <div 
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center gap-3 bg-slate-900/50 border border-slate-800/80 rounded-2xl p-2 pr-4 hover:border-slate-600 transition cursor-pointer select-none"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-sm font-bold overflow-hidden border border-slate-700">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    user.username[0]?.toUpperCase()
                  )}
                </div>
                <div className="flex flex-col max-w-[140px]">
                  <span className="text-xs font-bold text-slate-100 truncate">@{user.username}</span>
                  <span className="text-[10px] text-slate-400 font-medium">Редактировать</span>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => { setIsSignUp(false); setIsAuthModalOpen(true); }}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                Войти
              </button>
            )}
          </div>
        </header>
      </div>

      {/* Фон сайта */}
      <div className="fixed inset-0 -z-10 bg-[#060b18]">
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

      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Контентная часть */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 text-xs font-bold px-4 py-2 rounded-full mb-4 border border-blue-500/20 uppercase tracking-widest backdrop-blur-sm">
            Актуальные вакансии • 2026
          </span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1]">
            Каталог <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">стажировок</span>
          </h1>
        </div>

        {/* Вкладки переключения контента */}
        <div className="flex border-b border-slate-800/80 gap-6 mb-8 text-sm font-bold">
          <button 
            onClick={() => setActiveTab("all")}
            className={`pb-4 transition-all relative ${activeTab === "all" ? "text-blue-400" : "text-slate-400 hover:text-white"}`}
          >
            Все стажировки
            {activeTab === "all" && <motion.div layoutId="activeTabBorder" className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500" />}
          </button>
          <button 
            onClick={() => setActiveTab("applied")}
            className={`pb-4 transition-all relative flex items-center gap-2 ${activeTab === "applied" ? "text-blue-400" : "text-slate-400 hover:text-white"}`}
          >
            Мои отклики 
            <span className="bg-slate-800 text-[10px] px-2 py-0.5 rounded-full text-slate-300 border border-slate-700/60">
              {appliedJobIds.length}
            </span>
            {activeTab === "applied" && <motion.div layoutId="activeTabBorder" className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500" />}
          </button>
        </div>

        {/* Поиск и Фильтры по категориям */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-grow relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по названию или компании..." 
              className="w-full bg-slate-900/40 border border-slate-800/60 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all backdrop-blur-md"
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

        {/* Список карточек стажировок */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredData.length > 0 ? (
              filteredData.map((job) => {
                const isApplied = appliedJobIds.includes(job.id);
                return (
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

                    <div 
                      className="pt-6 border-t border-slate-800/60 flex items-center justify-between"
                      onClick={(e) => e.stopPropagation()} 
                    >
                      <span className="text-white font-bold text-sm">
                        {job.salary}
                      </span>
                      <button 
                        onClick={() => handleApplyToggle(job.id)}
                        className={`text-xs font-bold px-4 py-2.5 rounded-xl border transition-all ${
                          isApplied 
                          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400"
                          : "bg-blue-600/10 border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white"
                        }`}
                      >
                        {isApplied ? "✓ Вы откликнулись" : "Откликнуться"}
                      </button>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12 text-slate-500 text-sm font-medium">
                {activeTab === "applied" ? "Вы еще не откликнулись ни на одну вакансию." : "По вашему запросу ничего не найдено."}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Модалка: Детали вакансии */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => setSelectedJob(null)} className="absolute inset-0 bg-black/75 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 md:p-10 rounded-[32px] border border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-2xl z-10 custom-scrollbar"
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
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="text-slate-500 hover:text-white text-sm bg-slate-800/60 hover:bg-slate-800 px-3 py-1.5 rounded-xl transition border border-slate-700/30"
                >
                  Закрыть
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-xl border border-blue-400/20 uppercase tracking-wider">
                  {selectedJob.type}
                </span>
                <span className="text-xs font-bold text-indigo-400 bg-indigo-400/10 px-3 py-1.5 rounded-xl border border-indigo-400/20 uppercase tracking-wider">
                  {selectedJob.category}
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-xl border border-emerald-400/20 tracking-wider">
                  {selectedJob.salary}
                </span>
              </div>

              <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
                <div>
                  <h4 className="text-white font-bold text-base mb-2">О стажировке</h4>
                  <p>{selectedJob.description}</p>
                </div>

                <div>
                  <h4 className="text-white font-bold text-base mb-2">Требования к кандидату</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-400">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-bold text-base mb-2">Что предстоит делать</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-400">
                    {selectedJob.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-bold text-base mb-3">Технологический стек</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.techStack.map((tech, index) => (
                      <span key={index} className="text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 block">Ежемесячный оклад</span>
                  <span className="text-white font-black text-lg md:text-xl">{selectedJob.salary}</span>
                </div>
                <button 
                  onClick={() => {
                    handleApplyToggle(selectedJob.id);
                    setSelectedJob(null);
                  }}
                  className={`text-sm font-bold px-6 py-3.5 rounded-2xl border transition-all shadow-lg ${
                    appliedJobIds.includes(selectedJob.id) 
                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400"
                    : "bg-blue-600 border-blue-500 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                  }`}
                >
                  {appliedJobIds.includes(selectedJob.id) ? "✓ Вы откликнулись" : "Откликнуться на вакансию"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Модалка настроек профиля */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => setIsProfileModalOpen(false)} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm p-8 rounded-3xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-2xl z-10"
            >
              <h2 className="text-xl font-black mb-1">Мой профиль</h2>
              <p className="text-slate-400 text-xs mb-6">Измените свои личные данные в базе</p>

              <form onSubmit={handleSaveChanges} className="space-y-5">
                <div className="flex flex-col items-center gap-3 py-2">
                  <div 
                    onClick={() => editFileInputRef.current?.click()}
                    className="w-20 h-20 rounded-2xl bg-slate-800 border-2 border-dashed border-slate-700 flex items-center justify-center cursor-pointer overflow-hidden group relative transition hover:border-blue-500"
                  >
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-slate-500 text-2xl">+</span>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] font-bold text-white transition">Сменить</div>
                  </div>
                  <input type="file" ref={editFileInputRef} onChange={handleEditAvatarSelect} accept="image/*" className="hidden" />
                  <span className="text-[11px] text-slate-500">Нажмите для изменения фото</span>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 mb-2">Ваш никнейм</label>
                  <input 
                    type="text" 
                    required
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div className="pt-2 space-y-2">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold p-3 rounded-xl transition text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50"
                  >
                    {loading ? "Сохранение..." : "Сохранить изменения"}
                  </button>
                  <button 
                    type="button" 
                    onClick={handleLogout}
                    className="w-full bg-red-950/40 hover:bg-red-900/30 border border-red-900/40 text-red-400 font-bold p-3 rounded-xl transition text-sm"
                  >
                    Выйти из аккаунта
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Модалка входа / регистрации (Supabase Auth) */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => setIsAuthModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-md p-8 rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-2xl z-10"
            >
              <h2 className="text-2xl font-black mb-2">{isSignUp ? "Создать аккаунт" : "Войти в систему"}</h2>
              <p className="text-slate-400 text-xs mb-6">{isSignUp ? "Настройте профиль интерна" : "Введите данные для доступа к профилю"}</p>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-slate-950/40 border border-slate-800 rounded-2xl">
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-14 h-14 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700/60 flex items-center justify-center cursor-pointer overflow-hidden transition group relative"
                      >
                        {avatarUrl ? (
                          <img src={avatarUrl} alt="Превью" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-slate-400 text-xl group-hover:scale-110 transition">+</span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-300">Фото профиля</span>
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="text-[11px] text-blue-400 hover:underline mt-1 text-left">Загрузить</button>
                        <input type="file" ref={fileInputRef} onChange={handleLocalAvatarSelect} accept="image/*" className="hidden" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-500 mb-2">Никнейм</label>
                      <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="your_tag"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 mb-2">Email</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 mb-2">Пароль</label>
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition" />
                </div>
                
                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold p-3 rounded-xl transition text-sm mt-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50">
                  {loading ? "Загрузка..." : isSignUp ? "Зарегистрироваться" : "Войти"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button onClick={() => setIsSignUp(!isSignUp)} className="text-xs text-blue-400 hover:underline">
                  {isSignUp ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Создать один"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}