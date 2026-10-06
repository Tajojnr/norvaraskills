"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/LanguageContext";

const WA_ENROLL =
  "https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20want%20to%20enroll%20in%20the%20Digital%20Product%20Masterclass%20for%20%E2%82%A619%2C500";
const WA_ASK =
  "https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20have%20a%20question%20about%20your%20courses";

export default function CoursesPage() {
  const { lang } = useLanguage();

  const modules =
    lang === "en"
      ? [
          {
            number: "01",
            title: "Mindset and de-risking",
            duration: "45 mins",
            lessons: [
              "Why most online courses fail beginners",
              "Escaping the ₦20,000 a month ceiling",
              "Finding a minimum viable digital offer",
            ],
          },
          {
            number: "02",
            title: "Building with zero capital",
            duration: "1 hr 15 mins",
            lessons: [
              "The ₦39,000 phone stack and workflows",
              "Formatting PDFs that sell",
              "Proof videos that build trust",
            ],
          },
          {
            number: "03",
            title: "Traffic and WhatsApp funnels",
            duration: "1 hr 30 mins",
            lessons: [
              "Writing precise copy without fluff",
              "Handling buyers in 15 minutes a day",
              "Payment and fulfillment flow",
            ],
          },
        ]
      : [
          {
            number: "01",
            title: "Tunani da rage haɗari",
            duration: "minti 45",
            lessons: [
              "Dalilin da yasa yawancin darussan intanet ke kasa",
              "Ficewa daga rufin albashin ₦20,000 a wata",
              "Nemo mafi ƙarancin samfurin dijital da zai iya aiki",
            ],
          },
          {
            number: "02",
            title: "Gina ba tare da jari ba",
            duration: "sa'a 1 da minti 15",
            lessons: [
              "Tsarin wayar ₦39,000 da yadda ake amfani da shi",
              "Shirya PDF da mutane ke saye",
              "Bidiyoyin shaida da ke kawo aminci",
            ],
          },
          {
            number: "03",
            title: "Masu saye da tsarin WhatsApp",
            duration: "sa'a 1 da minti 30",
            lessons: [
              "Rubuta saƙo mai sauƙi ba tare da banza ba",
              "Amsa masu saye a mintuna 15 a rana",
              "Biyan kuɗi da tura kaya",
            ],
          },
        ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              {lang === "en" ? "Clear roadmaps. No overwhelm." : "Hanya a bayyane. Babu damuwa."}
            </p>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">
              {lang === "en" ? "Actionable video courses" : "Darussan bidiyo na aiki"}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base font-medium">
              {lang === "en"
                ? "Most online courses are too complex. Every lesson here is direct and usable the same day."
                : "Yawancin darussan intanet suna da wahala. Kowane darasi anan kai tsaye ne kuma zaka iya amfani da shi a rana guda."}
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-8">
              <div className="space-y-3 max-w-2xl">
                <span className="inline-block rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                  {lang === "en" ? "FLAGSHIP PROGRAM" : "BABBA DARAJA"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {lang === "en"
                    ? "The Phone-First Digital Product Masterclass"
                    : "Babban Darasi na Samfurin Dijital a Waya"}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                  {lang === "en"
                    ? "A full video roadmap on how to launch, market, and run digital books and mini-courses on the phone you already have."
                    : "Cikakken hanyar bidiyo kan yadda zaka ƙaddamar, tallata, da gudanar da littattafai da ƙananan darussa a wayar da kake da ita yanzu."}
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col justify-center items-start lg:items-end shrink-0 space-y-3">
                <div className="text-3xl font-black text-white">₦19,500</div>
                <div className="text-xs text-slate-400 font-medium">
                  {lang === "en"
                    ? "Full video access + PDF workbook"
                    : "Cikakken bidiyo + littafin aiki na PDF"}
                </div>
                <a
                  href={WA_ENROLL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
                >
                  {lang === "en" ? "Enroll on WhatsApp" : "Shiga a WhatsApp"}
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">
                {lang === "en" ? "Curriculum roadmap" : "Tsarin darussa"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {modules.map((mod) => (
                  <div
                    key={mod.number}
                    className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-emerald-400 font-mono">
                        {mod.number}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{mod.duration}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white leading-snug">{mod.title}</h4>
                    <ul className="space-y-2 text-xs text-slate-400 pt-2 font-medium">
                      {mod.lessons.map((les, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-400 shrink-0">{idx + 1}.</span>
                          <span>{les}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400 font-medium space-y-2 sm:space-y-0 sm:flex sm:justify-between sm:gap-4">
              <p>
                {lang === "en"
                  ? "Access delivered after WhatsApp payment confirmation."
                  : "Ana tura shiga bayan tabbatar da biya a WhatsApp."}
              </p>
              <p>
                {lang === "en"
                  ? "Self-paced. Learn on your own schedule."
                  : "Kana iya koyo a naka lokaci."}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center space-y-4">
            <h3 className="text-xl font-bold text-white">
              {lang === "en"
                ? "Not sure which program fits you?"
                : "Ba ka tabbata wanne ya dace da kai ba?"}
            </h3>
            <p className="text-slate-400 text-sm max-w-xl mx-auto font-medium">
              {lang === "en"
                ? "Message A. Nova on WhatsApp. Usually replies within 24 hours."
                : "Tura wa A. Nova sako a WhatsApp. Yawanci yana amsa cikin sa'o'i 24."}
            </p>
            <a
              href={WA_ASK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
            >
              {lang === "en"
                ? "Chat on WhatsApp — 09034111438"
                : "Yi magana a WhatsApp — 09034111438"}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}