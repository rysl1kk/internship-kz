"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const stats = [
  { num: "500+", label: "стажировок" },
  { num: "120+", label: "компаний-партнёров" },
  { num: "3 200+", label: "студентов устроено" },
  { num: "17", label: "городов Казахстана" },
];

const floatingOrbs = [
  { cx: "15%", cy: "20%", r: 300, color: "#3b82f6", opacity: 0.12, delay: 0 },
  { cx: "80%", cy: "60%", r: 250, color: "#818cf8", opacity: 0.10, delay: 1 },
  { cx: "50%", cy: "85%", r: 200, color: "#6366f1", opacity: 0.08, delay: 2 },
];

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl border border-blue-500/30 bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-blue-900/30"
    >
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400/30">
        <svg className="w-4 h-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </span>
      <p className="text-sm font-medium text-slate-100">{message}</p>
    </motion.div>
  );
}

export default function Home() {
  const [toast, setToast] = useState<string | null>(null);

  const handleCatalogClick = () => {
    setToast("Открываем каталог стажировок...");
  };

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

  const statVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.6 + i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div className="relative w-full overflow-hidden">
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
            transition={{ duration: 6 + i * 2, repeat: Infinity, delay: orb.delay }}
          />
        ))}
      </div>

      <motion.div
        className="flex flex-col items-center justify-center text-center py-24 max-w-4xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 text-xs font-bold px-4 py-2 rounded-full mb-8 border border-blue-500/20 uppercase tracking-widest backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Проект для студентов Казахстана • 2026
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.08]"
        >
          Твоя первая стажировка{" "}
          <br className="hidden sm:block" />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #60a5fa 0%, #818cf8 50%, #a78bfa 100%)",
            }}
          >
            начинается здесь
          </span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed"
        >
          Сотни актуальных стажировок от лучших компаний Казахстана.{" "}
          <span className="text-slate-300">Найди своё место</span> — без опыта, без посредников.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link href="/internships" onClick={handleCatalogClick} className="group relative w-full sm:w-auto">
            <motion.span
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                boxShadow: "0 0 24px rgba(79,70,229,0.45), 0 4px 20px rgba(37,99,235,0.3)",
              }}
            >
              {/* Shimmer */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.2s infinite",
                }}
              />
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
              Открыть каталог стажировок
            </motion.span>
          </Link>

          <Link href="/about" className="w-full sm:w-auto">
            <motion.span
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-300 border border-slate-700/60 backdrop-blur-sm hover:border-slate-500/60 hover:text-white transition-colors duration-200"
              style={{ background: "rgba(15,23,42,0.6)" }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              Связаться с нами
            </motion.span>
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.p variants={fadeUp} className="mt-6 text-xs text-slate-600">
          Бесплатно для студентов · Без регистрации для просмотра
        </motion.p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-20 pt-10 border-t border-slate-800/60">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={statVariant}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.04, y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group p-5 rounded-2xl border border-slate-800/60 overflow-hidden cursor-default"
              style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(12px)" }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.07) 0%, rgba(59,130,246,0.05) 100%)" }} />
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"
                style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)" }} />

              <p
                className="text-3xl font-black text-white mb-1"
                style={{ textShadow: "0 0 20px rgba(99,102,241,0.3)" }}
              >
                {stat.num}
              </p>
              <p className="text-xs text-slate-500 leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </div>
  );
}