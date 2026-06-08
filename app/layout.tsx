"use client";

import { useState } from "react";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Состояния для работы личного кабинета
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<"info" | "responses">("info");

  // Имитация отправленных откликов студента
  const sampleResponses = [
    { id: 1, company: "Kaspi.kz", position: "Frontend Developer Intern", status: "Рассматривается", date: "Вчера" },
    { id: 2, company: "Jusan Bank", position: "Data Analyst Intern", status: "Приглашение", date: "4 дня назад" }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail.trim()) {
      setIsLoggedIn(true);
      setIsAuthModalOpen(false);
    }
  };

  const openCabinetTab = (tab: "info" | "responses") => {
    setActiveProfileTab(tab);
    setIsProfileModalOpen(true);
    setDropdownOpen(false);
  };

  return (
    <html lang="ru" className="dark">
      <body className="antialiased bg-slate-950 text-slate-100 min-h-screen flex flex-col selection:bg-blue-500/30 selection:text-blue-200">
        
        {/* Шапка сайта */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-900 bg-slate-950/80 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex h-16 items-center justify-between gap-8">

              {/* Логотип */}
              <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-500/20 group-hover:bg-blue-700 transition-colors duration-200">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 12L8 4L13 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.5 9H10.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-[15px] font-bold tracking-tight text-white">
                  Intern<span className="text-blue-500">.kz</span>
                </span>
              </Link>

              {/* Навигация */}
              <nav className="hidden md:flex items-center gap-1">
                {[
                  { label: "Стажировки", href: "/internships" },
                  { label: "Блог", href: "/blog" },
                  { label: "О нас", href: "/about" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-400 transition-all duration-200 hover:bg-slate-900 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Блок профиля / Авторизации */}
              <div className="flex items-center gap-3 shrink-0 relative">
                {isLoggedIn ? (
                  <div className="relative">
                    <button 
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 text-sm font-medium text-slate-200 hover:border-slate-700 transition"
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {userEmail[0].toUpperCase()}
                      </div>
                      <span className="max-w-[120px] truncate hidden sm:inline">{userEmail}</span>
                    </button>
                    
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="px-3 py-2 text-xs text-slate-500 border-b border-slate-800 truncate">{userEmail}</div>
                        
                        {/* ИСПРАВЛЕНО: Теперь кнопки кликабельны и открывают нужный раздел */}
                        <button 
                          onClick={() => openCabinetTab("info")}
                          className="w-full text-left rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800 transition mt-1 flex items-center gap-2"
                        >
                          👤 Мой профиль
                        </button>
                        <button 
                          onClick={() => openCabinetTab("responses")}
                          className="w-full text-left rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800 transition flex items-center gap-2"
                        >
                          📁 Мои отклики
                        </button>
                        
                        <button 
                          onClick={() => { setIsLoggedIn(false); setDropdownOpen(false); setUserEmail(""); }}
                          className="w-full text-left rounded-xl px-3 py-2.5 text-sm text-red-400 hover:bg-red-950/30 transition mt-1 border-t border-slate-800/60"
                        >
                          🚪 Выйти
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="flex items-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 hover:bg-blue-700 transition duration-200"
                  >
                    Войти
                  </button>
                )}
              </div>

            </div>
          </div>
        </header>

        {/* Фоновый мягкий свет */}
        <div className="fixed -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 blur-[150px] pointer-events-none rounded-full z-0" />
        
        <main className="pt-16 flex-grow relative z-10">{children}</main>
        
        <footer className="border-t border-slate-900 bg-slate-950 relative z-10">
          <div className="mx-auto max-w-7xl px-6 py-6 text-center sm:text-left">
            <span className="text-xs text-slate-600">© 2026 Intern.kz. Платформа для молодых талантов.</span>
          </div>
        </footer>

        {/* МОДАЛЬНОЕ ОКНО ЛИЧНОГО КАБИНЕТА (ПРОФИЛЬ И ОТКЛИКИ) */}
        {isProfileModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
              
              {/* Шапка кабинета с табами */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveProfileTab("info")}
                    className={`px-4 py-2 text-sm font-bold rounded-xl transition ${activeProfileTab === "info" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white bg-slate-950/40"}`}
                  >
                    👤 Личные данные
                  </button>
                  <button 
                    onClick={() => setActiveProfileTab("responses")}
                    className={`px-4 py-2 text-sm font-bold rounded-xl transition ${activeProfileTab === "responses" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white bg-slate-950/40"}`}
                  >
                    📁 Мои отклики ({sampleResponses.length})
                  </button>
                </div>
                <button onClick={() => setIsProfileModalOpen(false)} className="text-slate-400 hover:text-white p-1">✕</button>
              </div>

              {/* Контент кабинета */}
              <div className="p-6 overflow-y-auto flex-grow bg-slate-950/30">
                {activeProfileTab === "info" ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email аккаунта</label>
                        <div className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 font-mono">{userEmail}</div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Статус аккаунта</label>
                        <div className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-green-400 font-semibold flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" /> Студент Активен
                        </div>
                      </div>
                    </div>
                    <div className="border border-dashed border-slate-800 rounded-2xl p-6 text-center bg-slate-950/20">
                      <p className="text-sm font-semibold text-white mb-2">Резюме не загружено</p>
                      <p className="text-xs text-slate-500 mb-4">Загрузите файл формата PDF, чтобы автоматически откликаться на вакансии.</p>
                      <button className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl transition">
                        📎 Выбрать PDF файл
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sampleResponses.map((resp) => (
                      <div key={resp.id} className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <h4 className="font-bold text-white text-sm">{resp.position}</h4>
                          <p className="text-xs text-blue-400 font-medium mt-0.5">{resp.company}</p>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 border-slate-800/40 pt-2 sm:pt-0">
                          <span className="text-xs text-slate-500 font-mono">{resp.date}</span>
                          <span className={`text-xs px-2.5 py-1 rounded-md font-bold ${resp.status === "Приглашение" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"}`}>
                            {resp.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Модальное окно Входа/Регистрации */}
        {isAuthModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
              <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white">✕</button>
              <h2 className="text-2xl font-black text-white mb-2">Создать профиль</h2>
              <p className="text-sm text-slate-400 mb-6">Введите почту для быстрого входа в демо-режиме.</p>
              <form onSubmit={handleLogin} className="space-y-4">
                <input 
                  type="email" required placeholder="student@example.kz" value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500 transition"
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg">
                  Зарегистрироваться
                </button>
              </form>
            </div>
          </div>
        )}

      </body>
    </html>
  );
}