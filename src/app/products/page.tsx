"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  MessageCircle,
  Sparkles,
  Zap,
  Lock as LockIcon,
} from "lucide-react";

const WHATSAPP_ORDER =
  "https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20want%20to%20buy%20Building%20From%20Zero%20for%20%E2%82%A69%2C900";
const WHATSAPP_ASK =
  "https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20have%20questions%20about%20the%20book";
const WHATSAPP_NOTIFY = (title: string) =>
  `https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20notify%20me%20when%20${encodeURIComponent(title)}%20launches`;

const availableBooks = [
  {
    id: "building-from-zero",
    title: "BUILDING FROM ZERO",
    subtitle: "The Complete Practical Guide to Digital Product Income",
    author: "A. Nova",
    price: "₦9,900",
    badge: "Official Launch Offer",
    description:
      "The exact blueprint used to go from a ₦2,000 salary to making ₦50,000+ per day using a ₦39,000 phone. Includes the step-by-step practical guide and the critical mistakes that cost months.",
    features: [
      "Complete story & mindset shifts",
      "Step-by-step digital product creation framework",
      "The specific mistakes to avoid (saves you months)",
      "Instant delivery after WhatsApp confirmation",
      "Bonus resources for first 40 buyers",
    ],
  },
];

const upcomingBooks = [
  {
    title: "THE AUTOPILOT AUDIENCE",
    subtitle: "How to Attract Buyers Without Begging or High Ad Costs",
    author: "A. Nova",
    expected: "Coming Next Month",
    caption: "The exact messaging strategy that turns curious visitors into paying buyers.",
  },
  {
    title: "PHONE-ONLY WORKFLOWS",
    subtitle: "Running a Digital Empire on a Basic Smartphone",
    author: "A. Nova",
    expected: "Coming Q3",
    caption: "Apps, tools, and automation shortcuts that let you manage orders in 15 minutes a day.",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Tested Practical Digital Books</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">
              E-Books & Practical Blueprints
            </h1>
            <p className="text-slate-400 text-sm sm:text-base font-medium">
              No generic theory. Every guide contains real hands-on frameworks built through trial, error, and documented proof.
            </p>
          </div>

          <div className="space-y-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-400" />
              <span>Available Now</span>
            </h2>

            <div className="grid grid-cols-1 gap-8">
              {availableBooks.map((book) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="w-full max-w-xs rounded-2xl border border-emerald-500/40 bg-slate-950 p-6 shadow-2xl">
                        <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 p-6 flex flex-col justify-between border border-slate-800">
                          <div>
                            <span className="text-[10px] tracking-widest text-emerald-400 uppercase font-bold">
                              {book.badge}
                            </span>
                            <h3 className="text-2xl font-black text-white mt-2 leading-tight">
                              {book.title}
                            </h3>
                            <p className="text-xs text-slate-400 mt-2">{book.subtitle}</p>
                          </div>
                          <div className="border-t border-slate-800 pt-4">
                            <div className="text-sm font-semibold text-slate-200">{book.author}</div>
                            <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                              Instant WhatsApp Delivery
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-7 space-y-6">
                      <div className="space-y-2">
                        <div className="inline-block rounded-md bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
                          {book.badge}
                        </div>
                        <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                          {book.title}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed font-medium">
                          {book.description}
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        {book.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-sm text-slate-200 font-medium">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                          <div className="text-3xl font-black text-white">{book.price}</div>
                          <div className="text-xs text-slate-400 font-medium">
                            One-time payment • Lifetime access
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                          <a
                            href={WHATSAPP_ORDER}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center space-x-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors w-full sm:w-auto"
                          >
                            <BookOpen className="h-4 w-4" />
                            <span>Buy on WhatsApp — {book.price}</span>
                          </a>

                          <a
                            href={WHATSAPP_ASK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center space-x-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3.5 text-sm font-semibold text-slate-300 hover:bg-slate-800 transition-colors w-full sm:w-auto"
                          >
                            <MessageCircle className="h-4 w-4 text-emerald-400" />
                            <span>Ask First</span>
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500 pt-1 font-medium">
                        <LockIcon className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Pay on WhatsApp → A. Nova sends your file instantly after confirmation.</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-8 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-400" />
              <span>Upcoming Releases</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingBooks.map((upBook, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {upBook.expected}
                    </span>
                    <span className="text-xs text-slate-500">{upBook.author}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{upBook.title}</h3>
                    <p className="text-xs text-amber-400 font-medium mt-0.5">{upBook.subtitle}</p>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    &ldquo;{upBook.caption}&rdquo;
                  </p>
                  <div className="pt-2">
                    <a
                      href={WHATSAPP_NOTIFY(upBook.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Get notified when launched</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}