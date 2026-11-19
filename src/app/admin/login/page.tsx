"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "admin">("admin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.replace("/admin");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-5 py-10 text-slate-100">
      <Link href="/" className="mb-8 flex flex-col items-center">
        <Image src="/logo.webp" alt="Norvara" width={64} height={64} className="mb-4 rounded-full" priority />
        <span className="text-xl font-black tracking-tight text-white">NORVARA</span>
      </Link>

      <section className="w-full max-w-sm rounded-3xl border border-white/10 bg-slate-900/70 p-7 shadow-2xl sm:p-8">
        <div className="mb-7 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Administrator access</p>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-white">Admin sign in</h1>
          <p className="mt-2 text-sm text-slate-400">Sign in with an account on the administrator allowlist.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="admin-login-role" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Sign in as</label>
            <select
              id="admin-login-role"
              value={role}
              onChange={(event) => {
                const nextRole = event.target.value === "student" ? "student" : "admin";
                setRole(nextRole);
                if (nextRole === "student") router.push("/login");
              }}
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && (
            <p role="alert" className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-center text-xs font-semibold text-rose-300">
              {error}
            </p>
          )}
          <label className="block space-y-2 text-xs font-bold text-slate-300">
            Admin email
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500"
            />
          </label>
          <label className="block space-y-2 text-xs font-bold text-slate-300">
            Password
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-black text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in to admin"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Not an administrator?{" "}
          <Link href="/login" className="font-bold text-emerald-400 hover:text-emerald-300">Student sign in</Link>
        </p>
      </section>
    </main>
  );
}
