"use client";

import { useState } from "react";

interface Post {
  id: number;
  date: string;
  readTime: string;
  category: string;
  title: string;
  desc: string;
  content: string[];
}

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

  // ЕСЛИ СТАТЬЯ ОТКРЫТА — ПОКАЗЫВАЕМ ЭКРАН ЧТЕНИЯ
  if (selectedPost) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12 reveal-up">
        <button 
          onClick={() => setSelectedPost(null)}
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-400 transition mb-8 group"
        >
          <svg className="transform group-hover:-translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Назад к списку статей
        </button>

        <article className="glass-card p-8 md:p-12 rounded-[32px]">
          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mb-6">
            <span className="bg-blue-600/10 text-blue-400 px-3 py-1 rounded-xl border border-blue-500/20">{selectedPost.category}</span>
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
      </div>
    );
  }

  // ОСНОВНОЙ СПИСОК СТАТЕЙ (ЗАПОЛНЯЕТ ВСЮ СЕТКУ)
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 reveal-up">
      <div className="mb-12">
        <span className="bg-blue-600/10 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full border border-blue-600/20 uppercase tracking-widest">
          Медиа для студентов
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-4">
          Блог для интернов
        </h1>
        <p className="text-slate-400 mt-2 text-sm max-w-xl">
          Практические руководства, разборы технологий и честные инсайты про старт карьеры без цензуры.
        </p>
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs font-bold px-4 py-2.5 rounded-xl border transition-all duration-300 active:scale-95 ${
              activeCategory === cat
                ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                : "border-slate-900 bg-slate-900/40 text-slate-400 hover:border-slate-800 hover:text-slate-200"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Сетка статей — теперь занимает края (3 колонки на десктопе) */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {filteredPosts.map((post, index) => (
          <div
            key={post.id}
            className="glass-card p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                <span className="text-blue-400 font-semibold">{post.category}</span>
                <span>{post.date}</span>
              </div>
              <h3 className="font-bold text-white text-lg leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed mt-3 line-clamp-3">
                {post.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-900/60 flex justify-end">
              <button 
                onClick={() => setSelectedPost(post)}
                className="text-xs font-bold text-blue-500 flex items-center gap-1 group-hover:text-blue-400 transition-colors"
              >
                Читать статью 
                <svg className="transform group-hover:translate-x-1 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}