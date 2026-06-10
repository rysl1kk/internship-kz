"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Пример данных (замени на свои данные из Supabase позже)
const initialInternships = [
  {
    id: 1,
    title: "Frontend Developer (React)",
    company: "Kaspi.kz",
    location: "Алматы",
    type: "Full-time",
    salary: "От 150,000 ₸",
    category: "Разработка",
    logo: "https://kaspi.kz/img/logo.svg"
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Kolesa Group",
    location: "Удаленно",
    type: "Flexible",
    salary: "По результатам",
    category: "Дизайн",
    logo: "🚀"
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
  }
];

const floatingOrbs = [
  { cx: "10%", cy: "30%", r: 300, color: "#3b82f6", opacity: 0.08, delay: 0 },
  { cx: "90%", cy: "70%", r: 250, color: "#818cf8", opacity: 0.06, delay: 1 },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

export default function InternshipsPage() {
  const [filter, setFilter] = useState("Все");
  const categories = ["Все", "Разработка", "Дизайн", "Аналитика", "Маркетинг"];

  const filteredData = filter === "Все" 
    ? initialInternships 
    : initialInternships.filter(item => item.category === filter);

  return (
    <div className="relative w-full overflow-hidden min-h-screen">
      {/* Background */}
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

      <motion.div 
        className="mx-auto max-w-7xl px-6 py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Заголовок */}
        <div className="mb-16">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 text-xs font-bold px-4 py-2 rounded-full mb-4 border border-blue-500/20 uppercase tracking-widest backdrop-blur-sm">
              Актуальные вакансии • 2026
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
            Каталог <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">стажировок</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-slate-400 max-w-2xl leading-relaxed">
            Найди свою первую работу в топовых компаниях. Мы собрали лучшие предложения для студентов и выпускников.
          </motion.p>
        </div>

        {/* Поиск и Фильтры */}
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-grow relative">
            <input 
              type="text" 
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
        </motion.div>

        {/* Сетка карточек */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredData.map((job, i) => (
              <motion.div
                key={job.id}
                layout
                custom={i}
                variants={cardVariant}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative p-8 rounded-[32px] border border-slate-800/60 flex flex-col justify-between"
                style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(12px)" }}
              >
                {/* Подсветка при наведении */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[32px] bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl border border-slate-700/50">
                      {job.logo.startsWith('http') ? <img src={job.logo} alt="" className="w-8" /> : job.logo}
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
                  <button className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                    Подробнее 
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}