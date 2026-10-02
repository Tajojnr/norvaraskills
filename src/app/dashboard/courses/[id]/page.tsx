"use client";

import Link from "next/link";

const WA =
  "https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20enrolled%20in%20the%20masterclass%20and%20I%20need%20access";

export default function CoursePlayerAccessPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 sm:p-10 text-center space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Course access
          </p>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">
            Video player coming soon
          </h1>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">
            The secure streaming player is still being connected. If you already enrolled,
            message A. Nova on WhatsApp and your course access is delivered directly.
          </p>
        </div>

        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
        >
          Get my access on WhatsApp
        </a>

        <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500">
          <Link href="/dashboard" className="hover:text-white transition-colors">
            Back to dashboard
          </Link>
          <Link href="/courses" className="hover:text-white transition-colors">
            View the masterclass
          </Link>
        </div>
      </div>
    </div>
  );
}