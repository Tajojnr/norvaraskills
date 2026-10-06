"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function ContactPage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-4xl mx-auto w-full space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              {lang === "en" ? "Direct founder communication" : "Magana kai tsaye da mai gidan"}
            </p>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">
              {lang === "en" ? "Get in touch with A. Nova" : "Tuntubi A. Nova"}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-medium">
              {lang === "en"
                ? "No automated support scripts. Want to order a book or have questions about a course? Message directly."
                : "Babu wata roboti mai amsa sakonni. Kana son odar littafi ko kana da tambaya? Tura sako kai tsaye."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Primary Channel: WhatsApp */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-slate-900 p-8 flex flex-col justify-between space-y-6 shadow-2xl"
            >
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Direct WhatsApp</h2>
                  <p className="text-sm text-emerald-400 font-mono mt-1 font-bold">09034111438</p>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  {lang === "en"
                    ? "The fastest way to buy your e-books, enroll in masterclasses, or get your questions answered."
                    : "Hanya mafi sauri wajen siyan littattafai, shiga darussan bidiyo, ko samun amsar tambayoyinka."}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <p className="text-xs text-slate-400 font-medium">
                  {lang === "en" ? "Usually responds within 24 hours." : "Yawanci yana amsawa a cikin sa'o'i 24."}
                </p>

                <a
                  href="https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20have%20a%20question%20regarding%20Norvara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-4 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
                >
                  {lang === "en" ? "Open WhatsApp chat" : "Bude WhatsApp din"}
                </a>
              </div>
            </motion.div>

            {/* Email Support */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Official Domain</h2>
                  <p className="text-sm text-slate-400 font-mono mt-1">norvara.com.ng</p>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  {lang === "en"
                    ? "For institutional access, media, or direct email inquiries regarding the book launch."
                    : "Domin gudanar da aiki da kungiyoyi ko tambayoyi na musamman ta hanyar sakon email."}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <p className="text-xs text-slate-400 font-medium">
                  {lang === "en" ? "Official platform email." : "Ainihin sakon adreshin yanar gizo."}
                </p>

                <a
                  href="mailto:support@norvara.com.ng"
                  className="w-full inline-flex items-center justify-center rounded-2xl border border-white/10 bg-slate-800 px-6 py-4 text-sm font-bold text-white hover:bg-slate-700 transition-colors"
                >
                  {lang === "en" ? "Send email" : "Tura Email"}
                </a>
              </div>
            </motion.div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}