export default function AboutPage() {
  const team = [
    {
      name: "Руслан Андамасов",
      role: "Lead Developer / Co-Founder",
      phone: "+7 707 591 03 90",
      email: "andamasovruslan444@gmail.com",
      github: "Rysl1kk",
      avatar: "👨‍💻"
    },
    {
      name: "Диас Самалхан",
      role: "Fullstack Developer / Co-Founder",
      phone: "+7 778 587 73 11",
      email: "Samalkhandias@gmail.com",
      github: "samalkhandias-design", // УСПЕШНО ИСПРАВЛЕНО ЗДЕСЬ!
      avatar: "🚀"
    }
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="text-center mb-16">
        <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full border border-blue-500/20 uppercase tracking-widest">
          Наша команда
        </span>
        <h1 className="text-4xl font-black text-white mt-4 tracking-tight sm:text-5xl">
          Кто стоит за <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Intern.kz</span>
        </h1>
        <p className="mt-4 text-slate-400 max-w-xl mx-auto text-base">
          Мы создаем платформу, которая поможет студентам Казахстана найти крутую практику и запустить карьеру без посредников.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {team.map((dev) => (
          <div key={dev.github} className="relative group overflow-hidden rounded-3xl border border-slate-900 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-md hover:border-blue-500/40 transition-all duration-300">
            <div className="absolute -inset-px bg-gradient-to-br from-blue-500/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-3xl border border-slate-700/60 shadow-inner">
                {dev.avatar}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{dev.name}</h3>
                <p className="text-sm font-medium text-blue-400">{dev.role}</p>
              </div>
            </div>

            <div className="space-y-3.5 relative z-10 text-sm text-slate-300">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60">
                <span className="text-slate-500 font-mono">Тел:</span>
                <a href={`tel:${dev.phone.replace(/\s+/g, '')}`} className="font-semibold text-white hover:text-blue-400 transition">
                  {dev.phone}
                </a>
              </div>
              
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60 overflow-hidden">
                <span className="text-slate-500 font-mono">Email:</span>
                <a href={`mailto:${dev.email}`} className="font-semibold text-white hover:text-blue-400 transition truncate">
                  {dev.email}
                </a>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60">
                <span className="text-slate-500 font-mono">Git:</span>
                <a 
                  href={`https://github.com/${dev.github}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="font-semibold text-indigo-400 hover:underline flex items-center gap-1 group/link"
                >
                  @{dev.github}
                  <span className="inline-block transition-transform group-hover/link:translate-x-0.5">→</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}