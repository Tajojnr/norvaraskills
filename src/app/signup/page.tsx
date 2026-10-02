"use client";

import Link from "next/link";

const WA =
  "https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20want%20to%20buy%20Building%20From%20Zero%20for%20%E2%82%A69%2C900";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 sm:p-10 text-center space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Member area
          </p>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">
            Sign up coming soon
          </h1>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">
            Account creation and the private library will go live with the backend.
            You do not need an account to buy today. Message A. Nova, pay, and receive access on WhatsApp.
          </p>
        </div>

        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
        >
          Order on WhatsApp 09034111438
        </a>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-white transition-colors">
            Back to home
          </Link>
          <Link href="/story" className="hover:text-white transition-colors">
            Read the story
          </Link>
        </div>
      </div>
    </div>
  );
}