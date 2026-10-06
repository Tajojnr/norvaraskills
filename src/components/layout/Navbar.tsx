"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ComingSoonModal from "@/components/ui/ComingSoonModal";
import { useLanguage } from "@/lib/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { name: t("nav_home"), href: "/" },
    { name: t("nav_courses"), href: "/courses" },
    { name: t("nav_ebooks"), href: "/products" },
    { name: t("nav_story"), href: "/story" },
    { name: t("nav_contact"), href: "/contact" },
  ];

  const openComingSoon = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    setShowComingSoon(true);
  };

  return (
    <>
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

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Side: Lang Toggle + Auth */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* EN | HA Language Switcher Button */}
            <div className="flex items-center bg-slate-900 rounded-full border border-white/10 p-0.5 text-[11px] font-bold">
              <button
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

            <button
              onClick={openComingSoon}
              className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              {t("nav_signin")}
            </button>

            <button
              onClick={openComingSoon}
              className="rounded-full bg-white text-slate-950 px-4 py-2 text-xs font-bold hover:bg-slate-200 transition-all shadow-sm"
            >
              {t("nav_signup")}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Lang Toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "ha" : "en")}
              className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 text-emerald-400"
            >
              <Globe className="h-3 w-3" />
              <span>{lang.toUpperCase()}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none p-1.5"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu Drawer */}
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
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-semibold text-slate-300 hover:text-emerald-400 py-1 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <button
                  onClick={openComingSoon}
                  className="w-1/2 text-center rounded-xl border border-white/10 bg-slate-900 py-2.5 text-xs font-semibold text-slate-200"
                >
                  {t("nav_signin")}
                </button>
                <button
                  onClick={openComingSoon}
                  className="w-1/2 text-center rounded-xl bg-white py-2.5 text-xs font-bold text-slate-950"
                >
                  {t("nav_signup")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        title="Member Area Coming Soon"
        description="Login, signup, and the private dashboard are being connected. Right now, order on WhatsApp and A. Nova will send your book or course access instantly."
      />
    </>
  );
}