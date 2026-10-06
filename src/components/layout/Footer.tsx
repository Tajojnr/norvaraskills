"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="border-t border-white/5 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 font-black text-lg">
                N
              </div>
              <span className="text-lg font-black text-white tracking-tight">NORVARA</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              {lang === "en" 
                ? "Real-world systems for building digital wealth using simple tools. No fluff, no AI generic hype."
                : "Ainihin hanyoyin gina samun kudi a intanet ta hanyar amfani da karamar waya. Ba tare da yaudara ba."}
            </p>
            <p className="text-xs text-emerald-400 font-semibold font-mono">
              norvara.com.ng
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {lang === "en" ? "Navigation" : "Mafita"}
            </h3>
            <ul className="space-y-2 text-sm font-medium">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">{t("nav_home")}</Link></li>
              <li><Link href="/courses" className="hover:text-emerald-400 transition-colors">{t("nav_courses")}</Link></li>
              <li><Link href="/products" className="hover:text-emerald-400 transition-colors">{t("nav_ebooks")}</Link></li>
              <li><Link href="/story" className="hover:text-emerald-400 transition-colors">{t("nav_story")}</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {lang === "en" ? "Legal & Policies" : "Ka'idoji"}
            </h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  {lang === "en" ? "Terms of Service" : "Ka'idojin Aiki"}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  {lang === "en" ? "Privacy Policy" : "Kare Bayanai"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {lang === "en" ? "Direct Contact" : "Tuntuba Kai Tsaye"}
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              {lang === "en" 
                ? "Ready to order or have questions? Send a direct WhatsApp message."
                : "Kana son oda ko kana da tambaya? Tura sakon WhatsApp kai tsaye."}
            </p>
            <a
              href="https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20have%20a%20question%20about%20Norvara"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 rounded-xl bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
            >
              <span>WhatsApp: 09034111438</span>
            </a>
            <p className="text-[11px] text-slate-500 font-medium">
              {lang === "en" ? "*Usually responds within 24 hours." : "*Yana amsawa a cikin sa'o'i 24."}
            </p>
          </div>

        </div>

        <div className="mt-12 border-t border-white/5 pt-6 text-center text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Norvara by Ahmad Suleiman Baraya (A. Nova). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}