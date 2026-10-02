"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { MessageCircle, Clock, Mail, ShieldCheck, Sparkles, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-4xl mx-auto w-full space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Direct Founder Communication</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">
              Get in Touch with A. Nova
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-medium">
              No generic automated customer support scripts. Want to order a book or have questions about a course? Message directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Primary Channel: WhatsApp */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-slate-900 p-8 flex flex-col justify-between space-y-6 shadow-2xl shadow-emerald-900/10"
            >
              <div className="space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <MessageCircle className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Direct WhatsApp</h2>
                  <p className="text-sm text-emerald-400 font-mono mt-1 font-bold">09034111438</p>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  This is the absolute fastest way to buy your e-books, enroll in masterclasses, or get your questions answered.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <Clock className="h-4 w-4 text-amber-400" />
                  <span>I usually respond within 24 hours.</span>
                </div>

                <a
                  href="https://wa.me/2349034111438?text=Hi%20A.%20Nova,%20I%20have%20a%20question%20regarding%20Norvara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 rounded-2xl bg-emerald-500 px-6 py-4 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
                >
                  <Send className="h-4 w-4" />
                  <span>Open WhatsApp Chat</span>
                </a>
              </div>
            </motion.div>

            {/* Email Support */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-slate-800 text-slate-300 flex items-center justify-center border border-white/5">
                  <Mail className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Official Domain</h2>
                  <p className="text-sm text-slate-400 font-mono mt-1">norvara.com.ng</p>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  For corporate partnerships, bulk access for institutions, or media inquiries regarding the book launch.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Verified official platform email.</span>
                </div>

                <a
                  href="mailto:support@norvara.com.ng"
                  className="w-full inline-flex items-center justify-center space-x-2 rounded-2xl border border-white/10 bg-slate-800 px-6 py-4 text-sm font-bold text-white hover:bg-slate-700 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send Email</span>
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