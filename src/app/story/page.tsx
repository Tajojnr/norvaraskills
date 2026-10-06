"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const WA_BOOK =
  "https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20read%20your%20story%20and%20want%20the%20book%20for%20%E2%82%A69%2C900";
const WA_ASK =
  "https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20have%20a%20question%20after%20reading%20your%20story";

export default function StoryPage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto space-y-14">
          <header className="border-b border-white/5 pb-8 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              A. Nova
            </p>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-tight">
              {lang === "en" ? "The Story" : "Ainihin Labarin"}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed">
              {lang === "en"
                ? "From English Education under a school tree to building daily income on a ₦39,000 phone. Nothing invented. Nothing exaggerated."
                : "Daga karatun English Education a ƙarƙashin bishiyar makaranta zuwa gina hanyar samun kudi a wayar ₦39,000. Ba ƙarya. Ba ƙari."}
            </p>
          </header>

          {/* WELCOME */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-[17px] font-medium"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {lang === "en" ? "Welcome" : "Barka Da Zuwa"}
            </h2>
            {lang === "en" ? (
              <>
                <p>My name is A. Nova.</p>
                <p>
                  I am twenty-four years old. I graduated with a degree in English Education.
                  No wealthy family. No government connection. No scholarship that took me somewhere better.
                  No guarantee that anything I tried would work.
                </p>
                <p>What I had was one question I could not stop asking:</p>
                <p className="pl-4 border-l-2 border-amber-500/60 text-white italic font-serif text-lg">
                  Is this really the future I want?
                </p>
                <p>
                  That question started a journey I did not plan. Failures I am still honest about.
                  A breakthrough I never expected. Money that came faster than I knew how to handle.
                </p>
              </>
            ) : (
              <>
                <p>Sunana A. Nova.</p>
                <p>
                  Ina da shekaru ashirin da hudu. Na kammala digiri a fannin English Education.
                  Babu masu kudi a iyalina. Babu wani haɗin gwiwa da gwamnati. Babu tallafin karatu da ya kai ni wani wuri mai kyau.
                  Babu tabbacin cewa abin da zan gwada zai yi aiki.
                </p>
                <p>Abin da nake da shi kawai shine tambaya ɗaya da na kasa daina yiwa kaina:</p>
                <p className="pl-4 border-l-2 border-amber-500/60 text-white italic font-serif text-lg">
                  Shin wannan ne makomar da nake so?
                </p>
                <p>
                  Wannan tambayar ta fara wata tafiya da ban tsara ba. Kuskuren da nake faɗa da gaskiya.
                  Nasarar da ban zata ba. Kudi da suka zo da sauri fiye da yadda zan iya sarrafawa.
                </p>
              </>
            )}
          </motion.section>

          {/* THE TREE */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-[17px] font-medium"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {lang === "en" ? "The Tree" : "Bishiyar"}
            </h2>
            {lang === "en" ? (
              <>
                <p>Before the money. Before the breakthrough. There was a tree.</p>
                <p>
                  Third year of university. Teaching practice. I sat under a tree inside the school compound
                  and watched a version of my future walk past me.
                </p>
                <p>
                  Study English Education. Graduate. Find a school. Stand in front of students for the rest
                  of my working life. Collect a salary that would never be enough. Call that a career.
                </p>
                <p>
                  Teaching is real work. It matters. What I could not push away was the ceiling above it.
                  The idea that the system had already decided what my life was worth.
                </p>
              </>
            ) : (
              <>
                <p>Kafin kudin. Kafin nasarar. Akwai wata bishiya.</p>
                <p>
                  Shekarata ta uku a jami'a, lokacin aikin koyarwa (teaching practice). Na zauna a ƙarƙashin bishiya a harabar makarantar,
                  ina kallon yadda makomata za ta kasance tana wucewa ta gabana.
                </p>
                <p>
                  In karanta English Education. In kammala. In nemi makaranta. In tsaya a gaban ɗalibai har ƙarshen rayuwata ta aiki.
                  In riƙa karɓar albashin da ba zai taɓa isata ba. In kira hakan sana'a.
                </p>
                <p>
                  Koyarwa aiki ne mai muhimmanci. Amma abin da ya dame ni shine iyakaccen rufin kudin dake kansa.
                  Tunanin cewa tsarin ya riga ya tsara iyakacin abin da rayuwata ta isa.
                </p>
              </>
            )}
          </motion.section>

          {/* THE 39k PHONE */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-[17px] font-medium"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {lang === "en" ? "The ₦39,000 Phone" : "Wayar ₦39,000"}
            </h2>
            {lang === "en" ? (
              <>
                <p>The phone I used to build everything cost ₦39,000. I had owned it almost four years by the time this began.</p>
                <p>
                  I had tried things before. Products nobody bought. Ideas that sounded good until the market
                  answered honestly. More failures than I want to count.
                </p>
                <p>
                  One lesson stayed with me: you do not need perfect resources to start. You need the right idea
                  and the decision to begin.
                </p>
                <p>
                  Every lesson. Every video. Every advert. Built on that phone. The phone was never the real limit.
                  When I finally started building with what I already had, the market had been waiting.
                </p>
              </>
            ) : (
              <>
                <p>Wayar da na yi amfani da ita wajen gina komai kudinta ₦39,000 ne. Kuma na yi kusan shekaru hudu da ita kafin in fara wannan.</p>
                <p>
                  Na gwada abubuwa da yawa a baya. Kayan da babu wanda ya saya. Dabaru da suka yi kyau a baki har sai da kasuwa ta nuna min gaskiya. Kuskure da yawa.
                </p>
                <p>
                  Darasi ɗaya ya zauna dani: ba ka buƙatar komai ya zama cikakke kafin ka fara. Kana buƙatar kyakkyawan tunani da kuma ƙudurin farawa.
                </p>
                <p>
                  Kowane darasi. Kowane bidiyo. Kowane tallace-tallace. An gina shi ne akan wannan wayar. Wayar ba ita ce matsalar ba.
                  Lokacin da na fara gina abin da nake da shi, ashe kasuwa tana jirana.
                </p>
              </>
            )}
          </motion.section>

          {/* THE PROOF */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 sm:p-8 space-y-4 text-slate-300 leading-relaxed text-base sm:text-[17px] font-medium"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {lang === "en" ? "The Proof" : "Shaidar"}
            </h2>
            <p>
              {lang === "en"
                ? "People share income claims online every day. Anyone can write a number. What I show is different: live, unedited screen recordings from my real OPay account."
                : "Mutane suna raba bayanan samun kudi a intanet kullum. Kowa zai iya rubuta lamba. Abin da nake nunawa daban ne: ainihin bidiyon asusun OPay na ba tare da an gyara ba."}
            </p>
            <div className="aspect-video rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center p-6 text-center">
              <p className="text-sm text-slate-400 font-medium max-w-sm">
                {lang === "en"
                  ? "OPay proof video is shared with buyers and on request via WhatsApp after you message A. Nova."
                  : "Ana tura bidiyon shaidar OPay ga masu saye da kuma masu buƙata a WhatsApp bayan kun tura wa A. Nova sako."}
              </p>
            </div>
          </motion.section>

          {/* OFFER / CTA */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-emerald-500/25 bg-slate-900/80 p-8 sm:p-10 space-y-5"
          >
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">
              {lang === "en" ? "What is inside the book" : "Abin da ke cikin littafin"}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
              {lang === "en"
                ? "The full story and the practical guide. Step by step. What I tried. What failed. What I corrected. You do not need to be an English Education graduate. You need a phone and the decision to start."
                : "Cikakken labarin da jagoran aiki. Mataki-mataki. Abin da na gwada. Abin da ya fadi. Abin da na gyara. Ba ka buƙatar zama mai digiri. Kana buƙatar waya da kuma ƙudurin farawa."}
            </p>
            <p className="text-white text-lg font-black tracking-tight">₦9,900</p>
            <p className="text-xs text-slate-400 font-medium">
              {lang === "en"
                ? "First 40 buyers get something extra. Message now to order."
                : "Mutane 40 na farko za su sami ƙarin wani abu. Turo sako yanzu don yin oda."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={WA_BOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                {lang === "en" ? "Buy the book on WhatsApp" : "Sayo littafin a WhatsApp"}
              </a>
              <a
                href={WA_ASK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-transparent px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-white/5 transition-colors"
              >
                {lang === "en" ? "Ask a question first" : "Yi tambaya tukunna"}
              </a>
            </div>
          </motion.section>
        </article>
      </main>

      <Footer />
    </div>
  );
}