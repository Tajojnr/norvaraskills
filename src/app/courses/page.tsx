"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  CheckCircle2,
  Clock,
  GraduationCap,
  MessageCircle,
  Sparkles,
  Zap,
  Lock as LockIcon,
  ShieldCheck,
} from "lucide-react";

const WHATSAPP_ENROLL =
  "https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20want%20to%20enroll%20in%20the%20Digital%20Product%20Masterclass%20for%20%E2%82%A619%2C500";
const WHATSAPP_ASK =
  "https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20have%20a%20question%20about%20your%20courses";

const courseModules = [
  {
    number: "01",
    title: "The Mindset Shift & De-risking",
    duration: "45 mins",
    lessons: [
      "Why 95% of online courses fail beginners",
      "Escaping the ₦2,000/month wage ceiling",
      "Finding your minimum viable digital offer",
    ],
  },
  {
    number: "02",
    title: "Building With Zero Capital",
    duration: "1 hr 15 mins",
    lessons: [
      "The ₦39,000 Phone stack (Apps & workflows)",
      "Formatting PDFs that sell for ₦9,900+",
      "Creating unedited proof videos that build trust",
    ],
  },
  {
    number: "03",
    title: "Automated Traffic & WhatsApp Funnels",
    duration: "1 hr 30 mins",
    lessons: [
      "Writing precise copy (No generic AI dashes)",
      "Handling customer inquiries in 15 mins/day",
      "Payment setups and order fulfillment flow",
    ],
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>No Overwhelm — Just Clear Roadmaps</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">
              Actionable Video Courses
            </h1>
            <p className="text-slate-400 text-sm sm:text-base font-medium">
              Most online courses are too complex and padded with fluff. Every lesson here is direct, precise, and immediately applicable.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-8">
              <div className="space-y-3 max-w-2xl">
                <span className="inline-block rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                  FLAGSHIP PROGRAM
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  The Phone-First Digital Product Masterclass
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                  A complete video roadmap on how to launch, market, and automate digital books and mini-courses using your existing smartphone.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col justify-center items-start lg:items-end shrink-0 space-y-3">
                <div className="text-3xl font-black text-white">₦19,500</div>
                <div className="text-xs text-slate-400 font-medium">Full Video Access + PDF Workbook</div>
                <a
                  href={WHATSAPP_ENROLL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>Enroll on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-400" />
                <span>Curriculum Roadmap</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courseModules.map((mod) => (
                  <div
                    key={mod.number}
                    className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 space-y-4 hover:border-emerald-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-emerald-400 font-mono">
                        {mod.number}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                        <Clock className="h-3 w-3" />
                        {mod.duration}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white leading-snug">{mod.title}</h4>
                    <ul className="space-y-2 text-xs text-slate-400 pt-2 font-medium">
                      {mod.lessons.map((les, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{les}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <LockIcon className="h-4 w-4 text-emerald-400" />
                <span>Access delivered manually after WhatsApp payment confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Self-paced learning with lifetime update intent</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center space-y-4">
            <h3 className="text-xl font-bold text-white">Not sure which program fits you?</h3>
            <p className="text-slate-400 text-sm max-w-xl mx-auto font-medium">
              Message A. Nova on WhatsApp. Usually responds within 24 hours.
            </p>
            <a
              href={WHATSAPP_ASK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat on WhatsApp — 09034111438</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}