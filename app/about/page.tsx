"use client";

import { motion } from "framer-motion";

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
    github: "samalkhandias-design",
    avatar: "🚀"
  }
];

const floatingOrbs = [
  { cx: "20%", cy: "25%", r: 250, color: "#3b82f6", opacity: 0.10, delay: 0 },
  { cx: "80%", cy: "75%", r: 200, color: "#6366f1", opacity: 0.08, delay: 1.5 },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.3 + i * 0.15, duration: 0.5 },
  }),
};

export default function AboutPage() {
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
            animate={{ scale: [1, 1.15, 1], opacity: [orb.opacity, orb.opacity * 1.5, orb.opacity] }}
            transition={{ duration: 7 + i * 2, repeat: Infinity, delay: orb.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.div 
        className="mx-auto max-w-4xl px-6 py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 text-xs font-bold px-4 py-2 rounded-full mb-4 border border-blue-500/20 uppercase tracking-widest backdrop-blur-sm">
              Наша команда • 2026
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeUp}
            className="text-4xl font-black text-white mt-4 tracking-tight sm:text-6xl"
          >
            Кто стоит за{" "}
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #60a5fa 0%, #818cf8 100%)",
              }}
            >
              Intern.kz
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeUp}
            className="mt-6 text-lg text-slate-400 max-w-xl mx-auto leading-relaxed"
          >
            Мы создаем платформу, которая поможет студентам Казахстана найти крутую практику и запустить карьеру без посредников.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {team.map((dev, i) => (
            <motion.div 
              key={dev.github} 
              custom={i}
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="relative group overflow-hidden rounded-3xl border border-slate-800/60 p-8 cursor-default"
              style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(12px)" }}
            >
              {/* Glow effects */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(59,130,246,0.04) 100%)" }} />
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl"
                style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }} />
              
              {/* Header inside card */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/80 text-3xl border border-slate-700/50 shadow-inner">
                  {dev.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{dev.name}</h3>
                  <p className="text-sm font-semibold text-blue-400/90 mt-0.5">{dev.role}</p>
                </div>
              </div>

              {/* Contacts */}
              <div className="space-y-3 relative z-10 text-sm text-slate-300">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/40 backdrop-blur-sm">
                  <span className="text-slate-500 font-mono text-xs uppercase tracking-wider">Тел:</span>
                  <a href={`tel:${dev.phone.replace(/\s+/g, '')}`} className="font-semibold text-slate-200 hover:text-blue-400 transition-colors duration-200">
                    {dev.phone}
                  </a>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/40 backdrop-blur-sm overflow-hidden">
                  <span className="text-slate-500 font-mono text-xs uppercase tracking-wider">Email:</span>
                  <a href={`mailto:${dev.email}`} className="font-semibold text-slate-200 hover:text-blue-400 transition-colors duration-200 truncate">
                    {dev.email}
                  </a>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/40 backdrop-blur-sm">
                  <span className="text-slate-500 font-mono text-xs uppercase tracking-wider">Git:</span>
                  <a 
                    href={`https://github.com/${dev.github}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-200 flex items-center gap-1 group/link"
                  >
                    @{dev.github}
                    <span className="inline-block transition-transform group-hover/link:translate-x-0.5">→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}