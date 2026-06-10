"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const floatingOrbs = [
  { cx: "10%", cy: "30%", r: 300, color: "#3b82f6", opacity: 0.08 },
  { cx: "90%", cy: "70%", r: 250, color: "#818cf8", opacity: 0.06 },
];

export default function InternshipsPage() {
  return (
    <div className="relative w-full overflow-hidden min-h-screen text-white bg-[#060b18]">
      {/* Только верхний раздел (Шапка) */}
      <div className="w-full border-b border-slate-900/80 bg-[#060b18]/60 backdrop-blur-md sticky top-0 z-40">
        <header className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <span className="font-black text-xl tracking-tight cursor-pointer">
              Intern<span className="text-blue-500">.kz</span>
            </span>
            <nav className="flex items-center gap-8 text-sm font-medium">
              <button className="text-blue-400 font-bold transition">
                Стажировки
              </button>
              <button onClick={() => alert("Раздел 'Блог' находится в разработке")} className="text-slate-400 hover:text-white transition">
                Блог
              </button>
              <button onClick={() => alert("Раздел 'О нас' находится в разработке")} className="text-slate-400 hover:text-white transition">
                О нас
              </button>
            </nav>
          </div>
          <div>
            <button 
              onClick={() => alert("Авторизация отключена")}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Войти
            </button>
          </div>
        </header>
      </div>

      {/* Анимированный фон */}
      <div className="fixed inset-0 -z-10 bg-[#060b18] pointer-events-none">
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
    </div>
  );
}