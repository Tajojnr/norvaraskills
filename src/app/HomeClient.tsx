"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const customEase = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: customEase },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const WA_BOOK =
  "https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20want%20to%20buy%20Building%20From%20Zero%20for%20%E2%82%A69%2C900";
const WA_GENERAL =
  "https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20have%20a%20question%20about%20Norvara";

export default function HomeClient() {
  const { lang, t } = useLanguage();

  return (
    <div className="w-full text-slate-100 flex flex-col">
      {/* Hero */}
      <section className="relative w-full overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28 border-b border-white/5">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-900/20 blur-[120px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-4xl flex flex-col items-center"
          >
            <motion.p
              variants={fadeUp}
              className="mb-6 text-xs font-semibold uppercase tracking-widest text-emerald-400"
            >
              {lang === "en" ? "Zero theory. Real trial and error." : "Babu tatsuniya. Ainihin gwaji da kuskure."}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[1.08]"
            >
              {lang === "en" ? "How I turned a " : "Yadda na mai da "}
              <span className="text-emerald-400">{lang === "en" ? "₦39,000 phone" : "wayar ₦39,000"}</span>
              {lang === "en" ? " into daily income" : " ta zama hanyar samun kudi kullum"}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-base sm:text-xl text-slate-400 leading-relaxed max-w-2xl font-medium"
            >
              {lang === "en"
                ? "No wealthy family. No government connections. An English Education graduate who refused a ₦20,000 a month ceiling and built a system that works on autopilot."
                : "Babu masu kudi a iyalina. Babu haɗin gwiwa da gwamnati. Malami ne da ya ƙi amincewa da rufin albashin ₦20,000 a wata, ya gina tsarin da ke kawo kudi koda baya aiki tukuru."}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
            >
              <a
                href={WA_BOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-white text-slate-950 px-8 py-4 text-sm font-bold hover:bg-slate-100 transition-colors"
              >
                {lang === "en" ? "Get the blueprint. ₦9,900" : "Sami littafin jagora. ₦9,900"}
              </a>
              <Link
                href="/story"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                {lang === "en" ? "Read the story" : "Karanta labarin"}
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/5 border border-white/10 rounded-3xl overflow-hidden w-full max-w-3xl"
            >
              <div className="bg-slate-950/90 p-5 sm:p-6 text-left">
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tighter">₦2k ➔ ₦50k+</p>
                <p className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-wider">
                  {lang === "en" ? "Daily income growth" : "Karuwar kudin shiga"}
                </p>
              </div>
              <div className="bg-slate-950/90 p-5 sm:p-6 text-left">
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tighter">₦39,000</p>
                <p className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-wider">
                  {lang === "en" ? "Hardware used" : "Kudin wayar duka"}
                </p>
              </div>
              <div className="bg-slate-950/90 p-5 sm:p-6 text-left col-span-2 sm:col-span-1">
                <p className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tighter">
                  {lang === "en" ? "Unedited" : "Ainihi"}
                </p>
                <p className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-wider">
                  {lang === "en" ? "Bank proof on request" : "Shaidar banki tana nan"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contrast */}
      <section className="py-20 sm:py-24 border-b border-white/5 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
          >
            <motion.div variants={fadeUp} className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter leading-tight">
                {lang === "en" ? "The average job ceiling" : "Rufin albashin aikin gwamnati"}
                <span className="block text-slate-500">
                  {lang === "en" ? "versus building your own" : "da kuma gina naka tsarin"}
                </span>
              </h2>
              <p className="text-slate-400 leading-relaxed font-medium text-sm sm:text-base">
                {lang === "en"
                  ? "Formal education and a standard salary have a hard top. Inflation eats the raise. Digital products flip that. Build once. Sell many times. Run the day in short bursts on your phone."
                  : "Aikin albashi yana da iyakaccen kudi ko da ka dade kana yi. Haunhawar farashi yana cinye karin albashi. Kayayyakin dijital sun bambanta. Ka gina sau daya, ka sayar sau da yawa a wayarka."}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid gap-3">
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 sm:p-6">
                <h3 className="text-white font-bold tracking-tight">
                  {lang === "en" ? "Standard path" : "Hanyar Kowa"}
                </h3>
                <p className="text-sm text-slate-400 mt-2 font-medium leading-relaxed">
                  {lang === "en"
                    ? "Fixed pay. Time traded for money. Little room to decide what your work is worth."
                    : "Kafaffen albashi. Kana musayar lokacinka ne da kudi. Baka da ikon sa farashin aikinka."}
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 sm:p-6">
                <h3 className="text-white font-bold tracking-tight">
                  {lang === "en" ? "Digital product path" : "Hanyar Samfurin Dijital"}
                </h3>
                <p className="text-sm text-slate-400 mt-2 font-medium leading-relaxed">
                  {lang === "en"
                    ? "Same file sold again and again. Low overhead. Orders and questions handled in minutes a day."
                    : "Fayil daya ake sayarwa akai-akai. Babu kudin haya ko kaya. Amsa tambayoyi a yan mintuna a rana."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Offer */}
      <section className="py-20 sm:py-24 w-full border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 sm:p-12 lg:p-14"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                  {lang === "en" ? "Official release" : "Saki na Musamman"}
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight">
                  {lang === "en" ? "Building From Zero" : "Gina Daga farko"}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
                  {lang === "en"
                    ? "The complete story and the practical guide. What was tested. What failed. How the daily income system was built on a basic phone. Written so you do not repeat the slow mistakes."
                    : "Cikakken labari da jagoran aiki. Abin da aka gwada da wanda ya fadi. Yadda aka gina tsarin samun kudi a karamar waya. An rubuta domin ka tsallake kura-kurai."}
                </p>
                <ul className="space-y-2.5 text-sm text-slate-300 font-medium">
                  <li className="flex gap-2">
                    <span className="text-emerald-400">1.</span>
                    {lang === "en" ? "Product creation with almost no budget" : "Kirkirar kayan dijital ba tare da jari ba"}
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-400">2.</span>
                    {lang === "en" ? "Mistakes that wasted months" : "Kuskuren da ya bata watanni ana yi"}
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-400">3.</span>
                    {lang === "en" ? "How orders run automatically" : "Yadda ake gudanar da oda cikin sauki"}
                  </li>
                </ul>

                <div className="pt-2">
                  <p className="text-3xl font-black text-white tracking-tight">₦9,900</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {lang === "en" ? "First 40 buyers get bonus materials. Pay and receive via WhatsApp." : "Mutane 40 na farko zasu samu kyauta. Biya a karba a WhatsApp."}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={WA_BOOK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-7 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
                  >
                    {lang === "en" ? "Order on WhatsApp" : "Yi Oda A WhatsApp"}
                  </a>
                  <a
                    href={WA_GENERAL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
                  >
                    {lang === "en" ? "Message 09034111438" : "Turo Sako 09034111438"}
                  </a>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-sm aspect-[3/4] rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-950 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-xl bg-slate-950 p-8 flex flex-col justify-between border border-white/5">
                    <div>
                      <p className="text-[10px] tracking-widest text-emerald-400 uppercase font-bold">
                        Norvara
                      </p>
                      <h3 className="text-3xl font-black text-white mt-4 leading-none tracking-tighter">
                        {lang === "en" ? "BUILDING\nFROM ZERO" : "GINA DAGA\nfarko"}
                      </h3>
                      <p className="text-xs text-slate-400 mt-3 font-medium">
                        {lang === "en" ? "Story and practical blueprint" : "Labari da jagoran aiki"}
                      </p>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-sm font-bold text-white">A. Nova</p>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                        {lang === "en" ? "Digital guide. ₦9,900" : "Littafin dijital. ₦9,900"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 text-center border-b border-white/5">
        <div className="mx-auto max-w-3xl px-4">
          <blockquote className="text-lg sm:text-2xl text-slate-300 font-medium leading-relaxed tracking-tight">
            {lang === "en" 
              ? "Spending ₦9,900 on knowledge that can return more than that is not the risk. Not trying is the risk." 
              : "Kashe ₦9,900 akan ilimin da zai dawo da fiye da haka ba kasada bane. Rashin gwadawa gaba daya shine asara."}
          </blockquote>
          <p className="mt-4 text-xs tracking-widest uppercase font-bold text-emerald-400">
            A. Nova
          </p>
        </div>
      </section>
    </div>
  );
}