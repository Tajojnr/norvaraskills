"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const customEase = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: customEase } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const WA_GENERAL =
  "https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20have%20a%20question%20about%20Norvara";

// Same regional prices as /book. Display only: the real amount is always set on the server at checkout.
type Region = "ng" | "africa" | "intl";
const PRICES: Record<Region, string> = { ng: "₦9,900", africa: "$10", intl: "$29" };

function useRegionPrice() {
  const [region, setRegion] = useState<Region>("ng");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nv_region");
      if (saved && saved in PRICES) { setRegion(saved as Region); return; }
    } catch {}
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      setRegion(tz === "Africa/Lagos" ? "ng" : tz.startsWith("Africa/") ? "africa" : "intl");
    } catch {}
  }, []);
  return PRICES[region];
}

const BOOKS = [
  { src: "/book/cover-story.png", w: 420, h: 675, tag: "Book 1", title: "Stop Waiting. Start Building.", alt: "Book cover: Stop Waiting. Start Building. by A. Nova" },
  { src: "/book/cover-idea.png", w: 420, h: 761, tag: "Book 2", title: "Find Your Idea", alt: "Book cover: Find Your Idea by A. Nova" },
  { src: "/book/cover-product.png", w: 420, h: 734, tag: "Book 3", title: "Create Your Digital Product", alt: "Book cover: Create Your Digital Product by A. Nova" },
  { src: "/book/cover-teach.png", w: 420, h: 791, tag: "Book 4", title: "Teach Your Idea", alt: "Book cover: Teach Your Idea by A. Nova" },
];

const COURSES = [
  "Facebook", "TikTok", "Instagram", "WhatsApp Business", "Telegram",
  "AI video creation", "Selling with Selar and abroad", "Starting a YouTube channel", "Turning your product into content",
];

const btnPrimary =
  "inline-flex items-center justify-center rounded-2xl bg-white text-slate-950 px-8 py-4 text-sm font-bold hover:bg-slate-100 transition-colors";
const btnGreen =
  "inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-8 py-4 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors";
const btnGhost =
  "inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-colors";

export default function HomeClient() {
  const { lang } = useLanguage();
  const price = useRegionPrice();
  const L = (en: string, ha: string) => (lang === "en" ? en : ha);

  return (
    <div className="w-full text-slate-100 flex flex-col">
      {/* ================= Hero ================= */}
      <section className="relative w-full overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-white/5">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] max-w-full bg-emerald-900/20 blur-[120px] rounded-full pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="mx-auto max-w-4xl flex flex-col items-center">
            <motion.p variants={fadeUp} className="mb-6 text-xs font-semibold uppercase tracking-widest text-emerald-400">
              {L("Zero theory. Real trial and error.", "Babu tatsuniya. Ainihin gwaji da kuskure.")}
            </motion.p>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[1.08]">
              {L("How I turned a ", "Yadda na mai da ")}
              <span className="text-emerald-400">{L("₦39,000 phone", "wayar ₦39,000")}</span>
              {L(" into daily income", " ta zama hanyar samun kudi kullum")}
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 text-base sm:text-xl text-slate-400 leading-relaxed max-w-2xl font-medium">
              {L(
                "No wealthy family. No connections. An English Education graduate who built a phone-only system, from a first ₦50,000 day to a first ₦1,000,000 month.",
                "Babu mai kudi a iyalina. Babu haɗin gwiwa. Malami ne da ya gama digiri a English Education, ya gina tsari a waya kawai, daga ranar ₦50,000 ta farko zuwa watan ₦1,000,000 na farko."
              )}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <Link href="/book" className={`${btnPrimary} w-full sm:w-auto`}>
                {L("Get the book now", "Sami littafin yanzu")}
              </Link>
              <Link href="/story" className={`${btnGhost} w-full sm:w-auto`}>
                {L("Read the story", "Karanta labarin")}
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/5 border border-white/10 rounded-3xl overflow-hidden w-full max-w-3xl">
              <div className="bg-slate-950/90 p-5 sm:p-6 text-left">
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tighter">₦5k ➔ ₦50k+</p>
                <p className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-wider">
                  {L("Daily income, early days to good days", "Kudin shiga a rana, daga farko zuwa kwanaki masu kyau")}
                </p>
              </div>
              <div className="bg-slate-950/90 p-5 sm:p-6 text-left">
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tighter">₦39,000</p>
                <p className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-wider">
                  {L("The phone it started on", "Wayar da aka fara da ita")}
                </p>
              </div>
              <div className="bg-slate-950/90 p-5 sm:p-6 text-left col-span-2 sm:col-span-1">
                <p className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tighter">{L("30 days", "Kwanaki 30")}</p>
                <p className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-wider">
                  {L("Money-back guarantee", "Garanti na maida kudi")}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Bundle image: tall crop on phones, wide on larger screens */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="mt-14 mx-auto max-w-5xl"
          >
            <Image
              src="/book/bundle-wide.png"
              alt="The four books: Stop Waiting. Start Building., Find Your Idea, Create Your Digital Product, Teach Your Idea"
              width={1400}
              height={788}
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="hidden sm:block h-auto w-full rounded-3xl border border-white/10 shadow-2xl"
            />
            <Image
              src="/book/bundle-tall.png"
              alt="The four books: Stop Waiting. Start Building., Find Your Idea, Create Your Digital Product, Teach Your Idea"
              width={900}
              height={1599}
              sizes="100vw"
              className="sm:hidden mx-auto h-auto w-full max-w-sm rounded-3xl border border-white/10 shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= Contrast ================= */}
      <section className="py-20 sm:py-24 border-b border-white/5 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
          >
            <motion.div variants={fadeUp} className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter leading-tight">
                {L("The average job ceiling", "Rufin albashin aiki")}
                <span className="block text-slate-500">{L("versus building your own", "da kuma gina naka tsarin")}</span>
              </h2>
              <p className="text-slate-400 leading-relaxed font-medium text-sm sm:text-base">
                {L(
                  "A salary has a top. Inflation eats the raise. A digital product flips that: build it once, sell it many times, and run the day in short bursts on your phone.",
                  "Albashi yana da iyaka. Hauhawar farashi yana cinye karin albashi. Samfurin dijital ya bambanta: ka gina sau ɗaya, ka sayar sau da yawa, ka gudanar da aiki a ɗan lokaci a wayarka."
                )}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid gap-3">
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 sm:p-6">
                <h3 className="text-white font-bold tracking-tight">{L("Standard path", "Hanyar kowa")}</h3>
                <p className="text-sm text-slate-400 mt-2 font-medium leading-relaxed">
                  {L(
                    "Fixed pay. Time traded for money. Little say in what your work is worth.",
                    "Kafaffen albashi. Kana musayar lokacinka da kudi. Baka da ikon sa farashin aikinka."
                  )}
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 sm:p-6">
                <h3 className="text-white font-bold tracking-tight">{L("Digital product path", "Hanyar samfurin dijital")}</h3>
                <p className="text-sm text-slate-400 mt-2 font-medium leading-relaxed">
                  {L(
                    "The same file sold again and again. Low overhead. Orders and questions handled in minutes a day.",
                    "Fayil ɗaya ana sayarwa akai-akai. Ƙarancin kashe kudi. Ana amsa oda da tambayoyi a ɗan mintuna a rana."
                  )}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= Two paths ================= */}
      <section className="py-20 sm:py-24 border-b border-white/5 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="max-w-2xl space-y-3 mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                {L("Two paths. Choose yours.", "Hanyoyi biyu. Zaɓi taka.")}
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter leading-tight">
                {L("Everything starts with one idea you already know", "Komai yana farawa da ra'ayi ɗaya da ka riga ka sani")}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={fadeUp} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">{L("Path 1", "Hanya ta 1")}</p>
                <h3 className="mt-2 text-xl sm:text-2xl font-black text-white tracking-tight">{L("Create a digital product", "Ƙirƙiri samfurin dijital")}</h3>
                <p className="mt-3 text-sm text-slate-400 font-medium leading-relaxed">
                  {L(
                    "Package what you know into a guide, video lessons or voice lessons. Build it once, sell it many times.",
                    "Ka haɗa abin da ka sani a jagora, bidiyo ko saƙon murya. Ka gina sau ɗaya, ka sayar sau da yawa."
                  )}
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-400">{L("Path 2", "Hanya ta 2")}</p>
                <h3 className="mt-2 text-xl sm:text-2xl font-black text-white tracking-tight">{L("Teach your idea", "Koyar da ra'ayinka")}</h3>
                <p className="mt-3 text-sm text-slate-400 font-medium leading-relaxed">
                  {L(
                    "One to one or in groups. In person or online. In your country or abroad. Income from students every month.",
                    "Ɗaya-da-ɗaya ko a rukuni. A zahiri ko a yanar gizo. A ƙasarka ko a waje. Samun kudi daga ɗalibai kowane wata."
                  )}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= Offer ================= */}
      <section className="py-20 sm:py-24 w-full border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
            className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 sm:p-12 lg:p-14"
          >
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                {L("The complete system", "Cikakken tsarin")}
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight">
                {L("Stop Waiting. Start Building.", "Daina Jira. Fara Ginawa.")}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
                {L(
                  "Four books and step-by-step video courses in one place: the full story of how it was built, then a practical guide to finding your idea and either selling it as a digital product or teaching it.",
                  "Littattafai huɗu da bidiyoyin koyarwa mataki-mataki a wuri ɗaya: cikakken labarin yadda aka gina shi, sannan jagorar aiki don gano ra'ayinka da sayar da shi a matsayin samfurin dijital ko koyar da shi."
                )}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {BOOKS.map((b) => (
                <div key={b.title} className="flex flex-col">
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-slate-900 shadow-xl">
                    <Image src={b.src} alt={b.alt} width={b.w} height={b.h} sizes="(min-width: 1024px) 22vw, 45vw" className="h-auto w-full" />
                  </div>
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-emerald-400">{b.tag}</p>
                  <p className="text-sm font-bold text-white leading-snug">{b.title}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">{L("Plus step-by-step video courses", "Da bidiyoyin koyarwa mataki-mataki")}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {COURSES.map((c) => (
                    <li key={c} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300">
                      {c}
                    </li>
                  ))}
                  <li className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300">
                    {L("and more", "da ƙari")}
                  </li>
                </ul>
                <p className="mt-5 text-xs text-slate-500 font-medium leading-relaxed">
                  {L(
                    "Everything works from a phone. You do not have to show your face. The results described are the author's own and are not a promise of what you will earn.",
                    "Komai yana aiki a waya. Ba sai ka nuna fuskarka ba. Sakamakon da aka bayyana na marubucin ne kuma ba alkawari bane na abin da zaka samu."
                  )}
                </p>
              </div>

              <div className="rounded-3xl border border-emerald-500/30 bg-slate-950 p-6 sm:p-8 space-y-5">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{L("One payment", "Biya sau ɗaya")}</p>
                  <p className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-1">{price}</p>
                  <p className="text-xs text-slate-500 font-medium mt-2">
                    {L(
                      "Secure online checkout. Instant access. 30-day money-back guarantee.",
                      "Biya a yanar gizo cikin aminci. Samun shiga nan take. Garanti na maida kudi cikin kwanaki 30."
                    )}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/book" className={`${btnGreen} w-full sm:w-auto`}>{L("Get the book now", "Sami littafin yanzu")}</Link>
                  <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className={`${btnGhost} w-full sm:w-auto`}>
                    {L("Questions? WhatsApp us", "Tambaya? Tura sako a WhatsApp")}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= Closing quote ================= */}
      <section className="py-16 sm:py-20 text-center border-b border-white/5">
        <div className="mx-auto max-w-3xl px-4">
          <blockquote className="text-lg sm:text-2xl text-slate-300 font-medium leading-relaxed tracking-tight">
            {L(
              `Spending ${price} on knowledge that can return more than that is not the risk. Not trying is the risk.`,
              `Kashe ${price} akan ilimin da zai iya dawo da fiye da haka ba kasada bane. Rashin gwadawa gaba ɗaya shine asara.`
            )}
          </blockquote>
          <p className="mt-4 text-xs tracking-widest uppercase font-bold text-emerald-400">A. Nova</p>
          <div className="mt-8">
            <Link href="/book" className={btnPrimary}>{L("Get the book now", "Sami littafin yanzu")}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}