"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Post {
  id: number;
  date: string;
  readTime: string;
  category: string;
  title: string;
  desc: string;
  content: string[];
}

const floatingOrbs = [
  { cx: "85%", cy: "15%", r: 280, color: "#818cf8", opacity: 0.10, delay: 0 },
  { cx: "15%", cy: "75%", r: 220, color: "#3b82f6", opacity: 0.08, delay: 2 },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

export default function BlogPage() {
  const categories = ["Все", "Карьера", "Технологии", "Дизайн", "Интервью"];
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const posts: Post[] = [
    {
      id: 1,
      date: "08 Июн 2026",
      readTime: "5 мин",
      category: "Карьера",
      title: "Как составить резюме студенту без опыта работы?",
      desc: "Разбираем главные ошибки в резюме казахстанских студентов. Как правильно упаковать пет-проекты, хакатоны и лабораторные, чтобы пройти скрининг в Kaspi или Kolesa.",
      content: [
        "Для студента отсутствие коммерческого опыта — это норма. Рекрутеры технологических компаний смотрят на ваш потенциал и инженерную базу. Вместо пустой графы 'Опыт работы' сфокусируйтесь на секции 'Проекты'.",
        "Укажите ваши курсовые работы, лабораторные или пет-проекты, которые вы писали для себя. Обязательно прикрепите ссылку на GitHub. Описывайте проекты по методологии STAR: какую задачу решали, какие технологии использовали и какого результата достигли.",
        "Не забудьте упомянуть участие в хакатонах (даже если вы не заняли призовое место) и профильные олимпиады. Это покажет вашу проактивность и умение работать в команде под давлением времени."
      ]
    },
    {
      id: 2,
      date: "05 Июн 2026",
      readTime: "7 мин",
      category: "Карьера",
      title: "Топ-5 IT компаний Алматы для старта карьеры",
      desc: "Где лучшие условия для интернов, развитая культура менторства, реальные боевые задачи и самый высокий процент офферов после окончания стажировки.",
      content: [
        "Рынок стажировок в Алматы сейчас переживает бум. На основе отзывов студентов мы выделили топ-5 экосистем, куда определенно стоит подавать резюме.",
        "1. Kaspi.kz — жесткий отбор, высокая интенсивность, но колоссальный рост. Вы сразу попадаете на реальные фичи приложения, которым пользуются миллионы.",
        "2. Kolesa Group — эталонная школа менторства. За каждым стажером закрепляется синьор-разработчик, проводятся регулярные синки и код-ревью.",
        "3. Chocofamily — идеальная атмосфера стартапа внутри крупного холдинга. Минимум бюрократии, максимум продуктовой свободы.",
        "4. Jusan Bank — мощный финтех-стек и отличные зарплаты для интернов.",
        "5. BTS Digital — масштабные инфраструктурные проекты, где можно прокачаться в Highload архитектуре."
      ]
    },
    {
      id: 3,
      date: "28 Май 2026",
      readTime: "6 мин",
      category: "Технологии",
      title: "Что учить фронтендеру в 2026 году: Next.js vs Remix",
      desc: "Актуальный стек для захода на джуна в локальные стартапы. Разбираемся, почему знание чистого React больше не гарантирует вам даже приглашение на техническое интервью.",
      content: [
        "В 2026 году требования к фронтенд-интернам выросли. Знания чистого клиентского React (SPA) уже недостаточно, так как индустрия полностью перешла на гибридный рендеринг (SSR/SSG).",
        "Next.js остается абсолютным стандартом индустрии в Казахстане. App Router, серверные компоненты (RSC) и оптимизация изображений используются практически в каждом новом проекте.",
        "Remix активно наступает на пятки благодаря более чистой работе с веб-стандартами и встроенной обработке форм. Наш совет: начните с Next.js, так как вакансий на него в разы больше, а понимание архитектуры SSR позволит вам легко переключиться на любой другой фреймворк."
      ]
    }
  ];

  const filteredPosts = activeCategory === "Все" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="relative w-full overflow-hidden min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-[#060b18]">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Orbs */}
        {floatingOrbs.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: orb.cx,
              top: orb.cy,
              width: orb.r * 2,
              height: orb.r * 2,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              opacity: orb.opacity,
              transform: "translate(-50%, -50%)",
              filter: "blur(40px)",
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [orb.opacity, orb.opacity * 1.4, orb.opacity] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, delay: orb.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedPost ? (
          /* ЭКРАН ЧТЕНИЯ СТАТЬИ */
          <motion.div
            key="article"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-4xl px-6 py-24"
          >
            <button 
              onClick={() => setSelectedPost(null)}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors mb-8 group"
            >
              <svg className="transform group-hover:-translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Назад к списку статей
            </button>

            <article 
              className="p-8 md:p-12 rounded-[32px] border border-slate-800/60"
              style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(12px)" }}
            >
              <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mb-6">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-xl border border-blue-500/20">{selectedPost.category}</span>
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.readTime} чтения</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-8 leading-tight">
                {selectedPost.title}
              </h1>

              <div className="space-y-6 text-slate-300 text-base md:text-lg leading-relaxed font-normal">
                {selectedPost.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </article>
          </motion.div>
        ) : (
          /* ОСНОВНОЙ СПИСОК СТАТЕЙ */
          <motion.div
            key="list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-7xl px-6 py-24"
          >
            <div className="mb-12">
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 text-xs font-bold px-4 py-2 rounded-full mb-4 border border-blue-500/20 uppercase tracking-widest backdrop-blur-sm">
                  Медиа для студентов
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black text-white tracking-tight">
                Блог для интернов
              </motion.h1>
              <motion.p variants={fadeUp} className="text-slate-400 mt-4 text-base max-w-xl leading-relaxed">
                Практические руководства, разборы технологий и честные инсайты про старт карьеры без цензуры.
              </motion.p>
            </div>

            {/* Фильтры */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-bold px-4 py-3 rounded-xl border transition-all duration-200 active:scale-95 ${
                    activeCategory === cat
                      ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_24px_rgba(59,130,246,0.35)]"
                      : "border-slate-800/60 bg-slate-900/30 text-slate-400 hover:border-slate-600/60 hover:text-slate-200"
                  }`}
                  style={{ backdropFilter: "blur(4px)" }}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </motion.div>

            {/* Сетка статей */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  custom={index}
                  variants={cardVariant}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="relative group p-6 rounded-3xl border border-slate-800/60 flex flex-col justify-between cursor-default"
                  style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(12px)" }}
                >
                  {/* Glow effects */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(59,130,246,0.04) 100%)" }} />
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4 font-medium">
                      <span className="text-blue-400 font-semibold">{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="font-bold text-white text-lg leading-snug group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 tracking-tight">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mt-3 line-clamp-3">
                      {post.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/40 flex justify-end relative z-10">
                    <button 
                      onClick={() => setSelectedPost(post)}
                      className="text-xs font-bold text-blue-500 flex items-center gap-1 group-hover:text-blue-400 transition-colors duration-200"
                    >
                      Читать статью 
                      <svg className="transform group-hover:translate-x-1 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}