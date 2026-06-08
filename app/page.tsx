import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 max-w-4xl mx-auto px-6">
      {/* Тэг сверху */}
      <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6 border border-blue-500/20 uppercase tracking-wider">
        Проект для студентов Казахстана • 2026
      </span>
      
      {/* Крупный заголовок */}
      <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
        Твоя первая стажировка <br />
        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          начинается здесь
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
        Сотни актуальных стажировок от лучших компаний Казахстана. Найди своё место — без опыта, без посредников.
      </p>
      
      {/* Кнопка действия */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link href="/internships" className="inline-flex items-center justify-center bg-blue-600 text-white text-base font-bold px-8 py-4 rounded-2xl shadow-xl shadow-blue-600/10 hover:bg-blue-700 hover:-translate-y-0.5 transition duration-200 w-full sm:w-auto">
          Открыть каталог стажировок
        </Link>
        <Link href="/about" className="inline-flex items-center justify-center bg-slate-900 border border-slate-800 text-slate-300 text-base font-bold px-8 py-4 rounded-2xl hover:bg-slate-800 transition duration-200 w-full sm:w-auto">
          Связаться с нами
        </Link>
      </div>

      {/* Простая статистика снизу в темном стиле */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-20 border-t border-slate-900 pt-10">
        {[
          { num: "500+", label: "стажировок" },
          { num: "120+", label: "компаний-партнёров" },
          { num: "3 200+", label: "студентов устроено" },
          { num: "17", label: "городов Казахстана" }
        ].map((stat, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-900/30 border border-slate-900">
            <p className="text-3xl font-black text-white">{stat.num}</p>
            <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}