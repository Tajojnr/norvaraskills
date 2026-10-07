"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const { lang } = useLanguage();
  const supabase = createClient();

  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: { data: { full_name: formData.fullName } },
    });

    if (error) setError(error.message);
    else setSuccess(true);
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans selection:bg-emerald-500/30">
      
      <Link href="/" className="mb-8 flex flex-col items-center group">
        <div className="h-16 w-16 overflow-hidden rounded-full ring-1 ring-white/10 bg-slate-900 shadow-2xl mb-4 group-hover:ring-emerald-500/50 transition-all">
          <img src="/logo.png" alt="Norvara Logo" className="h-full w-full object-contain p-1" />
        </div>
        <span className="text-xl font-black tracking-tight text-white leading-none">NORVARA</span>
      </Link>

      <div className="w-full max-w-sm rounded-[2rem] border border-white/5 bg-slate-900/50 p-8 backdrop-blur-xl shadow-2xl">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl font-black text-white tracking-tighter">
            {lang === "en" ? "Create Account" : "Bude Akawunti"}
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            {lang === "en" ? "Already have an account?" : "Kana da akawunti?"}{" "}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
              {lang === "en" ? "Sign in" : "Shiga nan"}
            </Link>
          </p>
        </div>

        {success ? (
          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-center">
            <p className="text-emerald-400 font-bold text-sm">
              {lang === "en" 
                ? "Success! Check your email to verify." 
                : "An gama! Duba email dinka domin tabbatarwa."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-3 text-rose-400 text-xs font-bold text-center">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {lang === "en" ? "Full Name" : "Cikakken Suna"}
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {lang === "en" ? "Password" : "Kalmar Sirri"}
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors disabled:opacity-50 mt-4 shadow-lg shadow-emerald-500/20"
            >
              {loading 
                ? (lang === "en" ? "Creating..." : "Ana kan yi...") 
                : (lang === "en" ? "Create Account" : "Bude Akawunti")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}