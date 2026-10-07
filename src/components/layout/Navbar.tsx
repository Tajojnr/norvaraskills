"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { lang, setLang, t } = useLanguage();
  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const navLinks = [
    { name: t("nav_home"), href: "/" },
    { name: t("nav_courses"), href: "/courses" },
    { name: t("nav_ebooks"), href: "/products" },
    { name: t("nav_story"), href: "/story" },
    { name: t("nav_contact"), href: "/contact" },
  ];

  if (user) {
    navLinks.push({
      name: lang === "en" ? "Dashboard" : "Dakin Karatu",
      href: "/dashboard",
    });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative h-10 w-10 flex items-center justify-center overflow-hidden rounded-full ring-1 ring-white/10 group-hover:ring-emerald-500/50 transition-all bg-slate-900">
            <img
              src="/logo.png"
              alt="Norvara"
              className="h-full w-full object-contain p-0.5"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentElement;
                if (parent && !parent.querySelector(".fallback-logo")) {
                  const fallback = document.createElement("div");
                  fallback.className =
                    "fallback-logo flex h-full w-full items-center justify-center bg-emerald-500 font-black text-slate-950 text-sm";
                  fallback.innerText = "N";
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-base font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors leading-none">
              NORVARA
            </span>
            <span className="text-[9px] tracking-widest text-slate-400 uppercase font-semibold mt-1 leading-none">
              by A. Nova
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Right: Language + Auth State */}
        <div className="hidden md:flex items-center space-x-4">
          {/* EN | HA Switcher */}
          <div className="flex items-center bg-slate-900 rounded-full border border-white/10 p-0.5 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-full transition-all ${
                lang === "en"
                  ? "bg-emerald-500 text-slate-950 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("ha")}
              className={`px-2.5 py-1 rounded-full transition-all ${
                lang === "ha"
                  ? "bg-emerald-500 text-slate-950 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              HA
            </button>
          </div>

          {user ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-sm"
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>{lang === "en" ? "My Dashboard" : "Dakin Karatu"}</span>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                {t("nav_signin")}
              </Link>

              <Link
                href="/signup"
                className="rounded-full bg-white text-slate-950 px-4 py-2 text-xs font-bold hover:bg-slate-200 transition-all shadow-sm"
              >
                {t("nav_signup")}
              </Link>
            </>
          )}
        </div>

        {/* Mobile Right Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "ha" : "en")}
            className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 text-emerald-400"
            aria-label="Switch language"
          >
            <Globe className="h-3 w-3" />
            <span>{lang.toUpperCase()}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-300 hover:text-white focus:outline-none p-1.5"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-white/5 bg-slate-950 px-5 pt-3 pb-6 space-y-4"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold text-slate-300 hover:text-emerald-400 py-1 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              {user ? (
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-slate-950"
                >
                  {lang === "en" ? "My Dashboard" : "Dakin Karatu"}
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-1/2 text-center rounded-xl border border-white/10 bg-slate-900 py-2.5 text-xs font-semibold text-slate-200"
                  >
                    {t("nav_signin")}
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="w-1/2 text-center rounded-xl bg-white py-2.5 text-xs font-bold text-slate-950"
                  >
                    {t("nav_signup")}
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}