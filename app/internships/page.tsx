"use client";

import { useState, useRef } from "react";
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
    logo: "💻"
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Kolesa Group",
    location: "Удаленно",
    type: "Flexible",
    salary: "По результатам",
    category: "Дизайн",
    logo: "🎨"
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Halyk Bank",
    location: "Астана",
    type: "Internship",
    salary: "120,000 ₸",
    category: "Аналитика",
    logo: "📈"
  },
  {
    id: 4,
    title: "Backend Engineer (Go / Python)",
    company: "Chocofamily",
    location: "Алматы",
    type: "Full-time",
    salary: "От 180,000 ₸",
    category: "Разработка",
    logo: "⚙️"
  },
  {
    id: 5,
    title: "SMM Specialist",
    company: "Beevile",
    location: "Шымкент",
    type: "Flexible",
    salary: "90,000 ₸",
    category: "Маркетинг",
    logo: "📱"
  },
  {
    id: 6,
    title: "Product Manager Assistant",
    company: "Technodom",
    location: "Алматы",
    type: "Internship",
    salary: "По результатам",
    category: "Аналитика",
    logo: "💼"
  }
];

const floatingOrbs = [
  { cx: "10%", cy: "30%", r: 300, color: "#3b82f6", opacity: 0.08, delay: 0 },
  { cx: "90%", cy: "70%", r: 250, color: "#818cf8", opacity: 0.06, delay: 1 },
];

export default function InternshipsPage() {
  const [filter, setFilter] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedJobIds, setAppliedJobIds] = useState<number[]>([]);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const categories = ["Все", "Разработка", "Дизайн", "Аналитика", "Маркетинг"];

  const handleApplyToggle = (id: number) => {
    if (appliedJobIds.includes(id)) {
      setAppliedJobIds(appliedJobIds.filter(jobId => jobId !== id));
    } else {
      setAppliedJobIds([...appliedJobIds, id]);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setUser({
        email,
        username: isSignUp ? username || email.split("@")[0] : email.split("@")[0],
        avatar: avatarUrl
      });
      setIsAuthModalOpen(false);
      setEmail("");
      setPassword("");
      setUsername("");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setAvatarUrl(null);
  };

  const filteredData = initialInternships.filter(item => {
    const matchesCategory = filter === "Все" || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative w-full overflow-hidden min-h-screen text-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-40 max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className="font-black text-xl tracking-tight">Intern<span className="text-blue-500">.kz</span></span>
        <div>
          {user ? (
            <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800/80 rounded-2xl p-2 pr-4 backdrop-blur-md">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-sm font-bold overflow-hidden border border-slate-700">
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  user.username[0].toUpperCase()
                )}
              </div>
              <div className="flex flex-col max-w-[120px]">
                <span className="text-xs font-bold text-slate-100 truncate">@{user.username}</span>
                <button onClick={handleLogout} className="text-[10px] text-left text-red-400 font-semibold hover:underline">
                  Выйти
                </button>
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

      {/* Background Orbs */}
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

      <div className="mx-auto max-w-7xl px-6 py-32">
        {/* Hero Section */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 text-xs font-bold px-4 py-2 rounded-full mb-4 border border-blue-500/20 uppercase tracking-widest backdrop-blur-sm">
            Актуальные вакансии • 2026
          </span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1]">
            Каталог <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">стажировок</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-2xl leading-relaxed">
            Найди свою первую работу в топовых компаниях Казахстана. Откликайся в один клик и отслеживай статус.
          </p>
        </div>

        {/* Filters */}
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

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredData.map((job) => {
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
                  className="group relative p-8 rounded-[32px] border border-slate-800/60 flex flex-col justify-between"
                  style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(12px)" }}
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

                  <div className="pt-6 border-t border-slate-800/60 flex items-center justify-between">
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
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Auth Modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-md p-8 rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-2xl z-10"
            >
              <h2 className="text-2xl font-black mb-2">
                {isSignUp ? "Создать аккаунт" : "Войти в систему"}
              </h2>
              <p className="text-slate-400 text-xs mb-6">
                {isSignUp ? "Настройте профиль интерна" : "Введите ваши данные для доступа к профилю"}
              </p>

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
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-[11px] text-blue-400 hover:underline mt-1 text-left"
                        >
                          Загрузить изображение
                        </button>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleAvatarChange} 
                          accept="image/*" 
                          className="hidden" 
                        />
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
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 mb-2">Пароль</label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold p-3 rounded-xl transition text-sm mt-2 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  {isSignUp ? "Зарегистрироваться" : "Войти"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-xs text-blue-400 hover:underline"
                >
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