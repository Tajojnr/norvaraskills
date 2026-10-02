"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const WA_BOOK =
  "https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20read%20your%20story%20and%20want%20the%20book%20for%20%E2%82%A69%2C900";
const WA_ASK =
  "https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20have%20a%20question%20after%20reading%20your%20story";

export default function StoryPage() {
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
              The Story
            </h1>
            <p className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed">
              From English Education under a school tree to building daily income on a ₦39,000 phone.
              Nothing invented. Nothing exaggerated.
            </p>
          </header>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-[17px] font-medium"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Welcome
            </h2>
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
              Sacrifices that cost more than I want to admit.
            </p>
            <p>
              I am writing the full story as a book. Before it is ready, I am sharing parts of it here.
              Real moments. Real evidence. Make your own judgment.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-[17px] font-medium"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              The Tree
            </h2>
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
            <p>
              I had grown up believing real success needed a father with money, a government opportunity,
              or a scholarship abroad. I had none of those. So I asked myself: is this really it?
            </p>
            <p>
              I thought I was just sitting under a tree feeling lost. I did not know I was already starting.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-[17px] font-medium"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              The ₦39,000 Phone
            </h2>
            <p>
              The phone I used to build everything cost ₦39,000. I had owned it almost four years
              by the time this began.
            </p>
            <p>
              After graduation I moved to a new city alone. No job waiting. No wealthy relative.
              Only a decision to build something, and a phone most people would have replaced years earlier.
            </p>
            <p>
              I had tried things before. Products nobody bought. Ideas that sounded good until the market
              answered honestly. Collaborations that collapsed. More failures than I want to count.
            </p>
            <p>
              One lesson stayed with me: you do not need perfect resources to start. You need the right idea
              and the decision to begin.
            </p>
            <p>
              Every lesson. Every video. Every advert. Every message to every customer. Built on that phone.
              The phone was never the real limit. The real limit was an idea I had refused to try.
            </p>
            <p>
              When I finally started building with what I already had, the market was not small.
              The market had been waiting.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 sm:p-8 space-y-4 text-slate-300 leading-relaxed text-base sm:text-[17px] font-medium"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              The Proof
            </h2>
            <p>
              People share income claims online every day. Anyone can write a number.
              What I show is different: live, unedited screen recordings from my real OPay account.
              Name. Figures. Month by month.
            </p>
            <p>
              I show it for one reason. Everything you have read is true. Watch the figures.
              Then decide if the full story is worth reading.
            </p>
            <div className="aspect-video rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center p-6 text-center">
              <p className="text-sm text-slate-400 font-medium max-w-sm">
                OPay proof video is shared with buyers and on request via WhatsApp after you message A. Nova.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-[17px] font-medium"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              The Million and the Spaghetti
            </h2>
            <p>
              In the same month I made one million and forty-five thousand naira, I was eating spaghetti
              from a dirty kitchen floor. Both are true.
            </p>
            <p>
              April was the month everything broke open. Five months after graduation.
              One month after I built the idea I had almost said no to.
            </p>
            <p>
              The money was real. The messages kept coming. Then about four or five days before I started
              making ₦50,000 plus per day, I was making spaghetti for breakfast. It was all I had.
              It fell on the floor. The kitchen was not clean. I picked it up, washed it, and ate it.
            </p>
            <p>
              Making money and having your life figured out are two different things. I learned that in April.
            </p>
            <p>
              Since then I changed my method. Less intensive grinding. The income continued.
              Sometimes stronger. A bit of phone work every hour or so. Then back to the day.
              Not because the product is complicated. Because I built something that keeps working
              when I am not pushing as hard as I once did.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-emerald-500/25 bg-slate-900/80 p-8 sm:p-10 space-y-5"
          >
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">
              What is inside the book
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
              The full story and the practical guide. Step by step. What I tried. What failed.
              What it cost. What I corrected. The mindset that keeps you going when it is hard.
            </p>
            <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
              You do not need to be Nigerian, African, or an English Education graduate.
              You need a phone and the decision to start.
            </p>
            <p className="text-white text-lg font-black tracking-tight">₦9,900</p>
            <p className="text-xs text-slate-400 font-medium">
              First 40 buyers get something extra. Message now to order.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={WA_BOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                Buy the book on WhatsApp
              </a>
              <a
                href={WA_ASK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-transparent px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-white/5 transition-colors"
              >
                Ask a question first
              </a>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              WhatsApp 09034111438. Usually replies within 24 hours.
            </p>
          </motion.section>
        </article>
      </main>

      <Footer />
    </div>
  );
}