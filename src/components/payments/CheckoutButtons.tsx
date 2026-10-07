"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ProductId } from "@/lib/products";
import { useLanguage } from "@/lib/LanguageContext";

type Props = {
  productId: ProductId;
  className?: string;
};

const WA_BOOK =
  "https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20want%20to%20buy%20Building%20From%20Zero%20for%20%E2%82%A69%2C900";
const WA_COURSE =
  "https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20want%20to%20enroll%20in%20the%20Masterclass%20for%20%E2%82%A619%2C500";

export default function CheckoutButtons({ productId, className = "" }: Props) {
  const { lang } = useLanguage();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<"paystack" | "flutterwave" | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) setEmail(session.user.email);
    });
  }, [supabase]);

  const wa = productId === "phone-first-masterclass" ? WA_COURSE : WA_BOOK;

  const startPaystack = async () => {
    if (!email.trim()) {
      alert(lang === "en" ? "Enter your email first" : "Rubuta email dinka tukunna");
      return;
    }
    setLoading("paystack");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/payments/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          productId,
          userId: session?.user?.id,
        }),
      });
      const data = await res.json();
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
        return;
      }
      alert(data.error || "Paystack failed");
    } catch {
      alert("Network error");
    } finally {
      setLoading(null);
    }
  };

  const startFlutterwave = async () => {
    if (!email.trim()) {
      alert(lang === "en" ? "Enter your email first" : "Rubuta email dinka tukunna");
      return;
    }
    setLoading("flutterwave");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/payments/flutterwave/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          productId,
          userId: session?.user?.id,
          name: session?.user?.user_metadata?.full_name,
        }),
      });
      const data = await res.json();
      if (data.payment_link) {
        window.location.href = data.payment_link;
        return;
      }
      alert(data.error || "Flutterwave failed");
    } catch {
      alert("Network error");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={lang === "en" ? "Email for receipt and access" : "Email don karɓar bayani"}
        className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
      />

      <button
        type="button"
        onClick={startPaystack}
        disabled={loading !== null}
        className="w-full rounded-xl bg-emerald-500 px-4 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition-colors"
      >
        {loading === "paystack"
          ? lang === "en"
            ? "Opening Paystack..."
            : "Ana buɗe Paystack..."
          : lang === "en"
            ? "Pay with Paystack"
            : "Biya da Paystack"}
      </button>

      <button
        type="button"
        onClick={startFlutterwave}
        disabled={loading !== null}
        className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3.5 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-50 transition-colors"
      >
        {loading === "flutterwave"
          ? lang === "en"
            ? "Opening Flutterwave..."
            : "Ana buɗe Flutterwave..."
          : lang === "en"
            ? "Pay with Flutterwave"
            : "Biya da Flutterwave"}
      </button>

      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3.5 text-center text-sm font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
      >
        {lang === "en" ? "Or order on WhatsApp 09034111438" : "Ko yi oda a WhatsApp 09034111438"}
      </a>
    </div>
  );
}