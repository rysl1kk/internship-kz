"use client";

import { useState } from "react";
// Исправили путь: теперь он точно найдет файл в корне проекта
import { supabase } from "../../supabaseClient"; 

export default function InternshipsPage() {
  // Переменная, которая будет помнить, на какие компании мы откликнулись
  const [appliedVacancies, setAppliedVacancies] = useState<string[]>([]);

  // Главная функция: отправляет отклик в Supabase или удаляет его
  const handleApply = async (companyName: string) => {
    const isApplied = appliedVacancies.includes(companyName);

    if (isApplied) {
      // Если уже откликались — удаляем строку из базы Supabase
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('vacancy_id', companyName);

      if (!error) {
        // Делаем кнопку снова синей
        setAppliedVacancies(appliedVacancies.filter(name => name !== companyName));
      }
    } else {
      // Если не откликались — добавляем строку в базу Supabase
      const { error } = await supabase
        .from('applications')
        .insert([{ user_id: 'student_1', vacancy_id: companyName }]);

      if (!error) {
        // Делаем кнопку красной
        setAppliedVacancies([...appliedVacancies, companyName]);
      }
    }
  };
  // База данных стажировок
  const internships = [
    { id: 1, company: "Kaspi.kz", position: "Frontend Developer Intern", salary: "150 000 ₸", type: "Полный день", city: "Алматы", tag: "IT", hot: true, icon: "💳" },
    { id: 2, company: "Jusan Bank", position: "Data Analyst Intern", salary: "120 000 ₸", type: "Частичная занятость", city: "Астана", tag: "Финансы", hot: false, icon: "📊" },
    { id: 3, company: "Chocofamily", position: "UX/UI Designer", salary: "100 000 ₸", type: "Удалённо", city: "Алматы", tag: "Дизайн", hot: true, icon: "🎨" },
    { id: 4, company: "Kolesa Group", position: "Backend Developer (Python)", salary: "140 000 ₸", type: "Полный день", city: "Алматы", tag: "IT", hot: false, icon: "🚗" },
    { id: 5, company: "Halyk Bank", position: "Marketing Intern", salary: "80 000 ₸", type: "Частичная занятость", city: "Астана", tag: "Маркетинг", hot: false, icon: "💚" },
    { id: 6, company: "KEGOC", position: "Графический дизайнер", salary: "90 000 ₸", type: "Полный день", city: "Шымкент", tag: "Дизайн", hot: false, icon: "⚡" }
  ];

  const cities = ["Алматы", "Астана", "Шымкент", "Атырау", "Актобе"];
  const categories = ["IT", "Маркетинг", "Дизайн", "Финансы", "Инженерия", "SMM"];

  // Состояния для хранения выбранных фильтров и поисковой строки
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Логика фильтрации
  const filteredInternships = internships.filter((item) => {
    const matchesCity = selectedCity ? item.city === selectedCity : true;
    const matchesCategory = selectedCategory ? item.tag === selectedCategory : true;
    const matchesSearch = item.position.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCity && matchesCategory && matchesSearch;
  });

  // Функции для переключения фильтров (если кликнуть повторно — фильтр сбросится)
  const toggleCity = (city: string) => {
    setSelectedCity(selectedCity === city ? null : city);
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategory(selectedCategory === cat ? null : cat);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 animate-fade-in-up">
      {/* Заголовок страницы */}
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Все стажировки</h1>
        <p className="text-sm text-slate-500 mt-1">
          Найдено: {filteredInternships.length} из {internships.length} предложений
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* БОКОВАЯ ПАНЕЛЬ ФИЛЬТРОВ С ИНТЕРАКТИВОМ */}
        <aside className="rounded-3xl border border-slate-900 bg-slate-900/30 p-6 backdrop-blur-xl space-y-8 shadow-2xl">
          
          {/* Блок Городов */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                📍 <span>Города</span>
              </h3>
              {selectedCity && (
                <button onClick={() => setSelectedCity(null)} className="text-[10px] text-blue-500 hover:underline">
                  Сбросить
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => {
                const isActive = selectedCity === city;
                return (
                  <button 
                    key={city} 
                    onClick={() => toggleCity(city)}
                    className={`text-xs font-semibold px-3 py-2 rounded-xl border transition-all duration-200 select-none ${
                      isActive 
                        ? "bg-blue-600/20 border-blue-500 text-blue-400 shadow-md shadow-blue-500/5" 
                        : "border-slate-800/80 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    {city}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Блок Направлений */}
          <div className="border-t border-slate-900/60 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                🚀 <span>Направление</span>
              </h3>
              {selectedCategory && (
                <button onClick={() => setSelectedCategory(null)} className="text-[10px] text-blue-500 hover:underline">
                  Сбросить
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button 
                    key={cat} 
                    onClick={() => toggleCategory(cat)}
                    className={`text-xs font-semibold px-3 py-2 rounded-xl border transition-all duration-200 select-none ${
                      isActive 
                        ? "bg-blue-600/20 border-blue-500 text-blue-400 shadow-md shadow-blue-500/5" 
                        : "border-slate-800/80 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
          
        </aside>

        {/* СПИСОК КАРТОЧЕК ВАКАНСИЙ */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Рабочая поисковая строка */}
          <div className="w-full bg-slate-900/40 border border-slate-900 rounded-2xl p-2 flex gap-2 focus-within:border-blue-500/50 transition-all duration-300">
            <input 
              type="text" 
              placeholder="Должность или компания..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
            />
          </div>

          {/* Отображение карточек */}
          {filteredInternships.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredInternships.map((item, index) => (
                <div 
                  key={item.id} 
                  className="group relative rounded-2xl border border-slate-900 bg-slate-900/20 p-6 backdrop-blur-sm hover:border-slate-700 hover:bg-slate-900/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 group-hover:border-blue-500/30 transition-all duration-300">
                          {item.icon}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-400 block">{item.company}</span>
                          <h3 className="font-bold text-white text-base mt-0.5 group-hover:text-blue-400 transition-colors duration-200 truncate max-w-[180px] sm:max-w-[150px]">
                            {item.position}
                        </h3>
                        </div>
                      </div>
                      {item.hot && (
                        <span className="bg-amber-500/10 text-amber-400 text-[10px] font-black px-2 py-1 rounded border border-amber-500/20 uppercase tracking-wide">
                          🔥 Горячая
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="text-[11px] font-medium bg-slate-900 text-slate-400 px-2.5 py-1 rounded-md border border-slate-800/60">{item.type}</span>
                      <span className="text-[11px] font-medium bg-slate-900 text-slate-400 px-2.5 py-1 rounded-md border border-slate-800/60">{item.city}</span>
                      <span className="text-[11px] font-medium bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-md border border-blue-500/15">{item.tag}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-900/80 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">Оклад</span>
                      <span className="text-base font-black text-white">{item.salary} <span className="text-xs text-slate-500 font-normal">/ мес</span></span>
                    </div>
                    <button
  onClick={() => handleApply(item.company)}
  className={`px-5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
    appliedVacancies.includes(item.company)
      ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20' 
      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20'
  }`}
>
  {appliedVacancies.includes(item.company) ? 'Отменить отклик' : 'Откликнуться'}
</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Сообщение, если ничего не найдено по фильтрам
            <div className="text-center py-16 border border-dashed border-slate-900 rounded-3xl bg-slate-900/10">
              <p className="text-sm text-slate-400 font-medium">Нет подходящих стажировок</p>
              <p className="text-xs text-slate-600 mt-1">Попробуйте изменить параметры фильтра или поиска.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}