"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CheckoutButtons from "@/components/payments/CheckoutButtons";
import { useLanguage } from "@/lib/LanguageContext";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Zap,
  Award,
  Clock,
  ArrowDown,
  HelpCircle,
} from "lucide-react";

export default function DedicatedSalesPage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30">
      <Navbar />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto space-y-16">
          
          {/* ================= HERO HEADER ================= */}
          <header className="text-center space-y-6 pt-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-400">
              <Zap className="h-3.5 w-3.5" />
              <span>
                {lang === "en"
                  ? "LIMITED LAUNCH OFFER — FIRST 40 BUYERS GET 3 FREE BONUSES"
                  : "SAYE NA MUSAMMAN — MUTANE 40 NA FARKO ZASU SAMU KYAUTA 3"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1]">
              {lang === "en" ? (
                <>
                  How an English Graduate Turned a <span className="text-emerald-400">₦39,000 Phone</span> Into Daily Income Without Capital or Experience
                </>
              ) : (
                <>
                  Yadda Malami Ya Mai Da <span className="text-emerald-400">Wayar ₦39,000</span> Ta Zama Hanyar Samun Kudi Kullum Ba Tare Da Jari Ba
                </>
              )}
            </h1>

            <p className="text-slate-400 text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              {lang === "en"
                ? "No laptop needed. No expensive Facebook ads. Read the raw, unedited story and get the exact step-by-step blueprint today."
                : "Ba a buƙatar laptop. Ba a kashe kudin talla a Facebook. Karanta ainihin labarin da samun jagora mataki-mataki."}
            </p>

            <div className="pt-4 flex justify-center">
              <a
                href="#checkout"
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-8 py-4 text-base font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20"
              >
                <span>{lang === "en" ? "Get Instant Access — ₦9,900" : "Karɓi Jagora Yanzu — ₦9,900"}</span>
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </header>


          {/* ================= STORY / PROOF SECTION ================= */}
          <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-10 space-y-8 text-slate-300 font-medium leading-relaxed">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                {lang === "en" ? "From A. Nova" : "Daga A. Nova"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {lang === "en" ? "In April, I Made ₦1,045,000. That Same Month, I Ate Spaghetti Off the Floor." : "A Watan Apilu Na Samu ₦1,045,000. A Wannan Watan Na Ciyar Da Kaina Spaghetti A Kasa."}
              </h2>
            </div>

            {lang === "en" ? (
              <>
                <p>
                  I am 24 years old. I graduated from university with a degree in English Education. I had no wealthy family behind me. No government connection. No scholarship that took me abroad.
                </p>
                <p>
                  I sat under a tree inside my teaching practice school compound and asked myself one terrifying question: <strong>"Is this really the ceiling above my life?"</strong>
                </p>
                <p>
                  I refused to accept a ₦2,000/month wage. I moved to a new city alone with a ₦39,000 smartphone that I had owned for almost four years. I failed at products nobody bought, collaborations that collapsed, and ideas that died.
                </p>
                <p>
                  Then I stopped guessing. I built a simple digital product directly on my phone. Five months after graduation, I hit ₦1,045,000 in a single month. Today, I manage orders in 15 minutes a day while watching movies.
                </p>
              </>
            ) : (
              <>
                <p>
                  Ina da shekaru 24. Na gama digiri a English Education. Babu mai kudi a iyalina. Babu haɗin gwiwa da gwamnati.
                </p>
                <p>
                  Na zauna a ƙarƙashin bishiyar makarantar horarwa na tambayi kaina: <strong>"Shin wannan ne iyakaccen rufin kudin rayuwata?"</strong>
                </p>
                <p>
                  Na ƙi amincewa da albashin ₦2,000 a wata. Na koma wani garin da wayar ₦39,000 da nayi shekaru 4 da ita. Na yi kuskure da yawa a baya.
                </p>
                <p>
                  Daga nan na koya yadda ake gina samfurin dijital a waya. Watan Apilu na samu ₦1,045,000. Yanzu ina gudanar da ciniki a mintuna 15 a rana.
                </p>
              </>
            )}

            {/* Live Proof Box */}
            <div className="rounded-2xl border border-emerald-500/30 bg-slate-950 p-6 text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                <span>{lang === "en" ? "100% Unedited OPay Account Proof" : "Shaidar OPay Ta Ainihi"}</span>
              </div>
              <p className="text-xs text-slate-400">
                {lang === "en"
                  ? "Month-by-month bank statement recordings proving the progression from ₦2,000/month to ₦50,000+/day."
                  : "Cikakken bidiyon shaidar bankin OPay daga ₦2,000 zuwa ₦50,000+ a rana."}
              </p>
            </div>
          </section>


          {/* ================= WHAT'S INSIDE / OFFER STACK ================= */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {lang === "en" ? "Here Is Everything You Get Today" : "Abubuwan Da Zaka Samu A Yau"}
              </h2>
              <p className="text-sm text-slate-400 font-medium">
                {lang === "en" ? "Instant access delivered immediately to your email & phone upon payment" : "Zaka samu shiga nan take bayan biya"}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 sm:p-10 space-y-6">
              
              {/* Main Product */}
              <div className="flex items-start gap-4 border-b border-white/5 pb-6">
                <div className="h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-sm">
                  ✓
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">
                      {lang === "en" ? "Building From Zero Main Digital Book" : "Ainihin Littafin Gina Daga Cero"}
                    </h3>
                    <span className="text-xs font-bold text-slate-400 line-through">₦35,000</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {lang === "en"
                      ? "The complete story and practical guide detailing step-by-step product creation, phone tools, and mistakes to avoid."
                      : "Cikakken labari da jagoran aiki na ƙirƙirar samfurin dijital a waya."}
                  </p>
                </div>
              </div>

              {/* Bonus 1 */}
              <div className="flex items-start gap-4 border-b border-white/5 pb-6">
                <div className="h-8 w-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-sm">
                  BONUS
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">
                      {lang === "en" ? "Bonus #1: Phone-Only Setup Checklist" : "Kyauta #1: Jerin Kayan Aikin Waya"}
                    </h3>
                    <span className="text-xs font-bold text-slate-400 line-through">₦15,000</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {lang === "en"
                      ? "The exact free apps used to format PDFs, record screen proof, and automate customer delivery."
                      : "Manhajoji kyauta da ake amfani da su wajen tsara PDF da tura kaya."}
                  </p>
                </div>
              </div>

              {/* Bonus 2 */}
              <div className="flex items-start gap-4 border-b border-white/5 pb-6">
                <div className="h-8 w-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-sm">
                  BONUS
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">
                      {lang === "en" ? "Bonus #2: WhatsApp Auto-Funnel Scripts" : "Kyauta #2: Rubutun Saƙonnin WhatsApp"}
                    </h3>
                    <span className="text-xs font-bold text-slate-400 line-through">₦20,000</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {lang === "en"
                      ? "The exact text messages and replies that turn curious inquiries into buyers in under 15 minutes."
                      : "Saƙonnin rubutu da amsoshin da ke juyar da mai tambaya ya zama mai saya."}
                  </p>
                </div>
              </div>

              {/* Total Stack Value */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 p-6 rounded-2xl border border-white/5">
                <div>
                  <div className="text-xs text-slate-400 uppercase font-bold">{lang === "en" ? "Total Value:" : "Jimillar Daraja:"} <span className="line-through text-slate-500">₦70,000</span></div>
                  <div className="text-3xl font-black text-white tracking-tight">{lang === "en" ? "Today Only: ₦9,900" : "Yau Kawai: ₦9,900"}</div>
                </div>
                <a
                  href="#checkout"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
                >
                  {lang === "en" ? "Claim Offer Now" : "Karɓi Wannan Tallahi"}
                </a>
              </div>

            </div>
          </section>


          {/* ================= RISK REVERSAL: GUARANTEE ================= */}
          <section className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/30 via-slate-900 to-slate-950 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl">
            <div className="h-16 w-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="h-8 w-8" />
            </div>

            <div className="space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {lang === "en" ? "100% 7-Day Action-Based Money-Back Guarantee" : "Garanti Na Maida Kudi 100% A Cikin Kwanaki 7"}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                {lang === "en" ? (
                  <>
                    Read the book. Apply the steps. If you give it honest effort and do not find immense value that helps you see a clear path to building digital income, send a simple message to <strong>09034111438</strong> within 7 days for a 100% full refund. Zero hard feelings.
                  </>
                ) : (
                  <>
                    Karanta littafin. Bi matakan. Idan har ka gwada kuma baka samu kyakkyawan sakamako ba, tura sako ga <strong>09034111438</strong> a cikin kwanaki 7 domin maida kudin ka 100%.
                  </>
                )}
              </p>
            </div>
          </section>


          {/* ================= CHECKOUT CONTAINER ================= */}
          <section id="checkout" className="scroll-mt-20 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {lang === "en" ? "Complete Your Order Safely" : "Kammala Odar Ku Cikin Aminci"}
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                {lang === "en" ? "Select your preferred payment gateway below (Paystack, Flutterwave, or WhatsApp)" : "Zabi hanyar biya da kake so a kasa"}
              </p>
            </div>

            <div className="max-w-md mx-auto rounded-3xl border border-emerald-500/30 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm font-bold text-white">Building From Zero</span>
                <span className="text-xl font-black text-emerald-400">₦9,900</span>
              </div>

              {/* Dual Gateway Checkout Component */}
              <CheckoutButtons productId="building-from-zero" />

              <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-medium">
                <Lock className="h-3 w-3 text-emerald-400" />
                <span>{lang === "en" ? "Encrypted 256-bit payment SSL connection" : "Biyan kuɗi na amintaccen tsaro"}</span>
              </div>
            </div>
          </section>


          {/* ================= FREQUENTLY ASKED QUESTIONS ================= */}
          <section className="space-y-6 pt-6 border-t border-white/5">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center">
              {lang === "en" ? "Frequently Asked Questions" : "Tambayoyi Masu Maimaitawa"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
              <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-5 space-y-2">
                <h3 className="text-white font-bold text-sm">Do I need a laptop or expensive equipment?</h3>
                <p className="text-slate-400">No. A. Nova built this entire system using a ₦39,000 smartphone. If you have an Android or iPhone with internet access, you have everything needed.</p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-5 space-y-2">
                <h3 className="text-white font-bold text-sm">How do I receive my book after paying?</h3>
                <p className="text-slate-400">Access is instant. Upon payment on Paystack/Flutterwave, you are redirected to your dashboard and a copy is sent to your email and WhatsApp.</p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-5 space-y-2">
                <h3 className="text-white font-bold text-sm">Is this a scam or a get-rich-quick scheme?</h3>
                <p className="text-slate-400">No. Nothing is guaranteed without real effort. A. Nova shows unedited bank screen recordings and details the 5 months of trial and error before success.</p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-5 space-y-2">
                <h3 className="text-white font-bold text-sm">What if I have questions after buying?</h3>
                <p className="text-slate-400">You can message A. Nova directly on WhatsApp at 09034111438. He usually responds within 24 hours.</p>
              </div>
            </div>
          </section>

        </article>
      </main>

      <Footer />
    </div>
  );
}