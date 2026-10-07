"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import CheckoutButtons from "@/components/payments/CheckoutButtons";
import {
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";

const WA_NOTIFY = (title: string) =>
  `https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20notify%20me%20when%20${encodeURIComponent(title)}%20launches`;

export default function ProductsPage() {
  const { lang } = useLanguage();

  const available = {
    title: lang === "en" ? "BUILDING FROM ZERO" : "GINA DAGA CERO",
    subtitle:
      lang === "en"
        ? "The Complete Practical Guide to Digital Product Income"
        : "Cikakken Jagorar Aiki na Samun Kudi Daga Kayayyakin Dijital",
    badge: lang === "en" ? "Official Launch Offer" : "Saki Na Farko",
    description:
      lang === "en"
        ? "The exact blueprint used to go from a ₦2,000 salary to making ₦50,000+ per day using a ₦39,000 phone. Includes the step-by-step guide and the mistakes that cost months."
        : "Ainihin tsarin da aka bi daga albashin ₦2,000 zuwa ₦50,000+ a rana da wayar ₦39,000. Ya haɗa da jagora mataki-mataki da kuskuren da suka ɓata watanni.",
    features:
      lang === "en"
        ? [
            "Complete story and mindset shifts",
            "Step-by-step digital product creation",
            "Mistakes to avoid so you save months",
            "Instant automated access after payment",
            "Bonus materials for the first 40 buyers",
          ]
        : [
            "Cikakken labari da sauyin tunani",
            "Ƙirƙirar kayan dijital mataki-mataki",
            "Kuskuren da za ka gujewa don ka tsallake watanni",
            "Samun shiga nan take bayan tabbatar da biya",
            "Ƙarin kyauta ga masu saye 40 na farko",
          ],
  };

  const upcoming =
    lang === "en"
      ? [
          {
            title: "THE AUTOPILOT AUDIENCE",
            subtitle: "How to Attract Buyers Without Heavy Ad Costs",
            expected: "Coming next month",
            caption: "Messaging that turns curious visitors into paying buyers.",
          },
          {
            title: "PHONE-ONLY WORKFLOWS",
            subtitle: "Run digital sales on a basic smartphone",
            expected: "Coming later",
            caption: "Tools and shortcuts so orders fit into 15 minutes a day.",
          },
        ]
      : [
          {
            title: "MASU SAYE BA TARE DA TALLA MAI TSADA BA",
            subtitle: "Yadda ake jawo masu saye ba tare da kashe kudi mai yawa ba",
            expected: "Yana zuwa wata mai zuwa",
            caption: "Saƙonni da ke juyar da mai tambaya ya zama mai biya.",
          },
          {
            title: "AIKIN WAYA KAWAI",
            subtitle: "Gudanar da ciniki a karamar waya",
            expected: "Yana zuwa daga baya",
            caption: "Kayan aiki da hanyoyi don oda su cika cikin mintuna 15 a rana.",
          },
        ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              {lang === "en" ? "Practical digital books" : "Littattafan dijital na aiki"}
            </p>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">
              {lang === "en" ? "E-Books and blueprints" : "Littattafai da jagorori"}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base font-medium">
              {lang === "en"
                ? "No generic theory. Real frameworks built through trial, error, and documented proof."
                : "Babu tatsuniya. Tsaruka na gaske daga gwaji, kuskure, da shaidar da aka rubuta."}
            </p>
          </div>

          {/* Available Books */}
          <div className="space-y-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-400" />
              <span>{lang === "en" ? "Available now" : "Akwai yanzu"}</span>
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Visual Cover */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-full max-w-sm rounded-2xl border border-emerald-500/40 bg-slate-950 p-6">
                    <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 p-6 flex flex-col justify-between border border-slate-800 shadow-inner">
                      <div>
                        <span className="text-[10px] tracking-widest text-emerald-400 uppercase font-bold">
                          {available.badge}
                        </span>
                        <h3 className="text-3xl font-black text-white mt-3 leading-tight tracking-tighter">
                          {available.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-2 font-medium">{available.subtitle}</p>
                      </div>
                      <div className="border-t border-slate-800 pt-4">
                        <div className="text-sm font-semibold text-slate-200">A. Nova</div>
                        <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                          {lang === "en" ? "Instant Digital Delivery" : "Ana tura a nan take"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details & Payment */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <div className="inline-block rounded-md bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
                      {available.badge}
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {available.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed font-medium">
                      {available.description}
                    </p>
                  </div>

                  <ul className="space-y-2.5">
                    {available.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-200 font-medium">
                        <span className="text-emerald-400 shrink-0">{idx + 1}.</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 border-t border-slate-800/80 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                    
                    {/* Price */}
                    <div className="shrink-0">
                      <div className="text-4xl font-black text-white tracking-tighter">₦9,900</div>
                      <div className="text-xs text-slate-400 font-medium mt-1">
                        {lang === "en"
                          ? "One-time payment. Lifetime access."
                          : "Biyan sau ɗaya. Mallaka har abada."}
                      </div>
                    </div>

                    {/* Dual Checkout Component (Paystack + Flutterwave + WA) */}
                    <div className="w-full max-w-sm">
                      <CheckoutButtons productId="building-from-zero" />
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>

          {/* Upcoming Books */}
          <div className="space-y-8 pt-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-400" />
              <span>{lang === "en" ? "Upcoming releases" : "Masu zuwa"}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcoming.map((book, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {book.expected}
                    </span>
                    <span className="text-xs text-slate-500">A. Nova</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{book.title}</h3>
                    <p className="text-xs text-amber-400 font-medium mt-0.5">{book.subtitle}</p>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    &ldquo;{book.caption}&rdquo;
                  </p>
                  <a
                    href={WA_NOTIFY(book.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    {lang === "en" ? "Notify me when it launches" : "Sanar da ni idan ya fito"} →
                  </a>
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