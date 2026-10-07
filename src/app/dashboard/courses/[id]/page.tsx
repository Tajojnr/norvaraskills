"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

const WA =
  "https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20enrolled%20in%20the%20masterclass%20and%20I%20need%20access";

export default function CoursePlayerAccessPage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 sm:p-10 text-center space-y-6 shadow-2xl">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            {lang === "en" ? "Course access" : "Sammun darasin bidiyo"}
          </p>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">
            {lang === "en" ? "Video player coming soon" : "Dandalin bidiyo yana zuwa"}
          </h1>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">
            {lang === "en"
              ? "The secure streaming player is being connected. If you already enrolled, message A. Nova on WhatsApp for direct video access."
              : "Ana gina dandalin kallon bidiyo. Idan ka riga ka shiga darasin, yi wa A. Nova magana a WhatsApp a turo maka hanyar kallo."}
          </p>
        </div>

        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
        >
          {lang === "en" ? "Get access on WhatsApp" : "Karɓi damar kallo a WhatsApp"}
        </a>

        <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-400 border-t border-white/10 pt-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-xl bg-slate-800 border border-white/10 px-5 py-2.5 text-white hover:bg-slate-700 transition-colors font-bold"
          >
            ← {lang === "en" ? "Back to Dashboard" : "Koma Dakin Karatu"}
          </Link>
        </div>
      </div>
    </div>
  );
}