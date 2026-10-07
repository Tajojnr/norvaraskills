"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useLanguage } from "@/lib/LanguageContext";

function SuccessInner() {
  const params = useSearchParams();
  const { lang } = useLanguage();
  const gateway = params.get("gateway");
  const ref = params.get("ref");

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
      <Link href="/" className="mb-8 flex flex-col items-center">
        <div className="h-14 w-14 overflow-hidden rounded-full ring-1 ring-white/10 bg-slate-900 mb-3">
          <img src="/logo.png" alt="Norvara" className="h-full w-full object-contain p-1" />
        </div>
        <span className="text-lg font-black tracking-tight">NORVARA</span>
      </Link>

      <div className="max-w-md w-full rounded-3xl border border-emerald-500/30 bg-slate-900 p-8 text-center space-y-4">
        <h1 className="text-2xl font-black tracking-tighter">
          {lang === "en" ? "Payment received" : "An karɓi biyan kuɗi"}
        </h1>
        <p className="text-sm text-slate-400 font-medium leading-relaxed">
          {lang === "en"
            ? "If payment succeeded, access will show on your dashboard. Keep your email receipt."
            : "Idan biya ya ci nasara, zaka ga shiga a dakin karatunka. Ajiye sakon email dinka."}
        </p>
        {(gateway || ref) && (
          <p className="text-[11px] text-slate-500 font-mono break-all">
            {gateway} · {ref}
          </p>
        )}
        <Link
          href="/dashboard"
          className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400"
        >
          {lang === "en" ? "Go to Dashboard" : "Je Dakin Karatu"}
        </Link>
        <a
          href="https://wa.me/2349034111438"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-xs font-semibold text-emerald-400 hover:underline"
        >
          WhatsApp 09034111438
        </a>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <SuccessInner />
    </Suspense>
  );
}