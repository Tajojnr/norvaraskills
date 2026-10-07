"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

type NovaMood = "idle" | "talk" | "happy";
type NovaSize = "sm" | "md" | "lg";

// =========================================================================
// Nova Avatar Component (with animated face & waving hand 👋)
// =========================================================================
function NovaAvatar({
  size = "md",
  mood = "idle",
  wave = false,
}: {
  size?: NovaSize;
  mood?: NovaMood;
  wave?: boolean;
}) {
  const dim =
    size === "lg"
      ? "h-14 w-14"
      : size === "sm"
        ? "h-8 w-8"
        : "h-11 w-11";

  const eye =
    size === "lg"
      ? "h-2 w-2"
      : size === "sm"
        ? "h-1 w-1"
        : "h-1.5 w-1.5";

  const cheek = size === "sm" ? "h-1 w-1.5" : "h-1.5 w-2";

  const hand =
    size === "lg"
      ? "text-base"
      : size === "sm"
        ? "text-[9px]"
        : "text-xs";

  return (
    <motion.div
      className={`relative ${dim} shrink-0`}
      animate={
        mood === "talk"
          ? { scale: [1, 1.04, 1], y: [0, -1, 0] }
          : { scale: [1, 1.06, 1], y: [0, -3, 0] }
      }
      transition={
        mood === "talk"
          ? {
              duration: 0.45,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : {
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      {/* Soft ambient glow */}
      <div className="absolute inset-0 rounded-full bg-emerald-400/30 blur-md scale-110" />

      {/* Cute Head */}
      <div className="relative h-full w-full rounded-full bg-gradient-to-br from-emerald-300 via-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/40 border-2 border-white/30 overflow-hidden">
        {/* Light shine */}
        <div className="absolute top-1 left-2 h-2 w-3 rounded-full bg-white/50 blur-[1px]" />

        {/* Eyes */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 pt-0.5">
          <motion.div
            className={`${eye} rounded-full bg-slate-900`}
            animate={
              mood === "happy"
                ? { scaleY: [1, 0.2, 1] }
                : { scaleY: [1, 0.15, 1] }
            }
            transition={{
              duration: mood === "happy" ? 0.3 : 3.5,
              repeat: Infinity,
              repeatDelay: mood === "happy" ? 0.5 : 2.2,
            }}
          />

          <motion.div
            className={`${eye} rounded-full bg-slate-900`}
            animate={
              mood === "happy"
                ? { scaleY: [1, 0.2, 1] }
                : { scaleY: [1, 0.15, 1] }
            }
            transition={{
              duration: mood === "happy" ? 0.3 : 3.5,
              repeat: Infinity,
              repeatDelay: mood === "happy" ? 0.5 : 2.2,
              delay: 0.05,
            }}
          />
        </div>

        {/* Cheeks */}
        <div className={`absolute left-1 top-1/2 ${cheek} rounded-full bg-rose-400/70`} />
        <div className={`absolute right-1 top-1/2 ${cheek} rounded-full bg-rose-400/70`} />

        {/* Mouth */}
        <motion.div
          className="absolute bottom-[22%] left-1/2 -translate-x-1/2"
          animate={
            mood === "talk"
              ? { height: [3, 7, 3], width: [8, 10, 8] }
              : mood === "happy"
                ? { height: 4, width: 10 }
                : { height: 3, width: 8 }
          }
          transition={
            mood === "talk"
              ? { duration: 0.35, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3 }
          }
          style={{
            borderRadius: 999,
            background: "#0f172a",
          }}
        />
      </div>

      {/* Animated Waving Hand 👋 */}
      <AnimatePresence>
        {wave && (
          <motion.span
            className={`absolute -right-1 -top-1 ${hand} select-none origin-bottom-left drop-shadow-md z-10`}
            initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
            animate={{
              opacity: 1,
              rotate: [-20, 25, -15, 20, -10, 15, 0],
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            aria-hidden
          >
            👋
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// =========================================================================
// Bilingual Knowledge Matrix
// =========================================================================
const knowledgeMatrix = [
  {
    phrases: [
      "how long",
      "results",
      "when will i make money",
      "how fast",
      "timeline",
      "quick money",
      "overnight",
      "how soon",
      "yaushe zan ga kudi",
      "lokaci",
      "sauri",
      "yaya jimawa",
    ],
    responses: {
      en: "This is not get-rich-quick. A. Nova graduated in November and broke through about 5 months later in April.\n\nYour speed depends on how fast you apply the framework. Some people see first sales within weeks.",
      ha: "Wannan ba tsarin kudi dare daya bane. A. Nova ya gama karatu a Nuwamba, ya sami nasara bayan watanni 5 a Apilu.\n\nSauri naka ya danganta da yadda kake aiki da tsarin. Wasu suna ganin ciniki a cikin makwanni.",
    },
  },
  {
    phrases: [
      "scam",
      "legit",
      "fake",
      "trust",
      "is this real",
      "fraud",
      "scammer",
      "why should i trust",
      "karya",
      "zamba",
      "yaudara",
      "da gaske ne",
      "gaskiya ne",
    ],
    responses: {
      en: "A. Nova (Ahmad Suleiman Baraya) is real. He shows unedited OPay screen recordings.\n\nRead My Story free, or message him on WhatsApp 09034111438 before you spend a naira.",
      ha: "A. Nova mutum ne na gaske. Yana nuna bidiyon OPay ba tare da gyara ba.\n\nKaranta Labarina kyauta, ko tura masa sako a WhatsApp 09034111438 kafin ka biya.",
    },
  },
  {
    phrases: [
      "capital",
      "ads",
      "extra money",
      "ad budget",
      "facebook ads",
      "running ads",
      "more money",
      "investment",
      "jari",
      "kudin talla",
    ],
    responses: {
      en: "You do not need ad capital to start. A. Nova built with zero ad spend on a ₦39,000 phone and WhatsApp.\n\nYou need ₦9,900 for the book, your phone, and data.",
      ha: "Ba ka buƙatar kudin talla. A. Nova ya gina ba tare da talla mai tsada ba a wayar ₦39,000 da WhatsApp.\n\nKana buƙatar ₦9,900 na littafi, waya, da data.",
    },
  },
  {
    phrases: [
      "what will i sell",
      "what product",
      "niche",
      "idea",
      "what to sell",
      "my own product",
      "creation",
      "me zan sayar",
      "wani kaya",
    ],
    responses: {
      en: "You learn to spot demand and package knowledge into PDF guides or mini courses on your phone.\n\nYou do not need to be a famous expert. Solve one clear problem people already want fixed.",
      ha: "Kana koyo yadda ake gano buƙata ka maida ilimi ya zama PDF ko ƙaramin darasi a waya.\n\nBa sai ka zama mashahuri ba. Ka warware matsala ɗaya da mutane ke nema.",
    },
  },
  {
    phrases: ["refund", "money back", "guarantee", "return", "maida kudi"],
    responses: {
      en: "Digital products deliver instantly, so sales are final.\n\nThe guide is built so applied knowledge can return far more than ₦9,900.",
      ha: "Ana tura kayan dijital nan take, don haka biya ta ƙarshe ce.\n\nIdan ka yi aiki da ilimin, zai iya dawo da fiye da ₦9,900.",
    },
  },
  {
    phrases: [
      "get started",
      "getting started",
      "how to start",
      "where to begin",
      "how do i begin",
      "how to buy",
      "how do i buy",
      "i want to buy",
      "join",
      "enroll",
      "first step",
      "steps",
      "yaya zan fara",
      "yaya zan saya",
    ],
    responses: {
      en: "Two steps:\n1. Pick the ₦9,900 book or ₦19,500 masterclass.\n2. Pay on the site (Paystack / Flutterwave) or WhatsApp 09034111438 for instant delivery.\n\nWhich one do you want?",
      ha: "Mataki biyu:\n1. Zaɓi littafi ₦9,900 ko darasi ₦19,500.\n2. Biya a shafin (Paystack / Flutterwave) ko WhatsApp 09034111438.\n\nWanne kake so?",
    },
  },
  {
    phrases: [
      "delivery",
      "after payment",
      "how do i get",
      "receive",
      "download",
      "access",
      "where is the book",
      "instant",
      "email",
      "after buying",
      "after i pay",
      "yaya zan karba",
      "bayan biya",
    ],
    responses: {
      en: "After successful payment you get access fast: dashboard unlock and/or file via WhatsApp and email depending on the path you used.",
      ha: "Bayan biya ta ci nasara za ka samu shiga da sauri: dakin karatu da/ko fayil ta WhatsApp da email.",
    },
  },
  {
    phrases: [
      "price",
      "cost",
      "how much",
      "amount",
      "fee",
      "cheap",
      "discount",
      "first 40",
      "bonus",
      "offer",
      "expensive",
      "nawa ne",
      "farashi",
      "kudi",
      "kudinsa",
    ],
    responses: {
      en: "Prices:\n• Building From Zero book: ₦9,900 (first 40 get bonus)\n• Video masterclass: ₦19,500\n\nOne-time. Lifetime access.",
      ha: "Farashi:\n• Littafi Gina Daga Cero: ₦9,900 (40 na farko suna da kyauta)\n• Darasin bidiyo: ₦19,500\n\nSau ɗaya. Har abada.",
    },
  },
  {
    phrases: [
      "difference",
      "versus",
      "vs",
      "which one",
      "book or course",
      "masterclass or ebook",
      "should i get",
      "bambanci",
      "wanne ya kamata",
    ],
    responses: {
      en: "Book ₦9,900 = story + written step-by-step blueprint.\nMasterclass ₦19,500 = video walkthroughs and phone demos.\n\nStart with the book if you like reading. Take the masterclass if you want to watch and copy.",
      ha: "Littafi ₦9,900 = labari + jagora a rubuce.\nDarasi ₦19,500 = bidiyo da nuni a waya.\n\nLittafi idan kana son karatu. Darasi idan kana son kallo ka biyo.",
    },
  },
  {
    phrases: [
      "phone",
      "laptop",
      "computer",
      "39000",
      "39k",
      "39,000",
      "device",
      "hardware",
      "android",
      "iphone",
      "data",
      "tech",
      "waya",
      "kwamfuta",
    ],
    responses: {
      en: "No laptop required. Built on a ₦39,000 phone. Your smartphone and data are enough.",
      ha: "Ba ka buƙatar laptop. An gina a wayar ₦39,000. Wayarka da data sun isa.",
    },
  },
  {
    phrases: [
      "beginner",
      "experience",
      "student",
      "skills",
      "no experience",
      "never done",
      "can i do this",
      "difficult",
      "hard",
      "education",
      "degree",
      "ban iya ba",
      "ban taba yi ba",
    ],
    responses: {
      en: "Beginners are welcome. A. Nova failed JAMB twice, studied English Education, and had no mentor. The writing is plain and direct.",
      ha: "Masu farawa suna da wuri. A. Nova ya fadi JAMB sau biyu, ya karanta English Education, ba shi da malami. An rubuta a sauƙi.",
    },
  },
  {
    phrases: [
      "pay",
      "payment",
      "card",
      "transfer",
      "bank transfer",
      "flutterwave",
      "stripe",
      "paystack",
      "dollars",
      "usd",
      "naira",
      "opay",
      "ussd",
      "account",
      "yadda zan biya",
    ],
    responses: {
      en: "Pay on the site with Paystack or Flutterwave (card, transfer, USSD where available), or message WhatsApp 09034111438 for direct order.",
      ha: "Biya a shafin da Paystack ko Flutterwave, ko tura sako a WhatsApp 09034111438.",
    },
  },
  {
    phrases: [
      "inside",
      "what is in",
      "content",
      "curriculum",
      "modules",
      "topics",
      "learn",
      "what will i learn",
      "table of contents",
      "spaghetti",
      "tree",
      "me ke ciki",
    ],
    responses: {
      en: "Inside:\n1. Mindset off the salary ceiling\n2. Create digital products on your phone\n3. WhatsApp sales in short daily bursts\n4. Mistakes that wasted months",
      ha: "A ciki:\n1. Tunani daga rufin albashi\n2. Ƙirƙirar kayan dijital a waya\n3. Ciniki a WhatsApp a ƙanana a rana\n4. Kuskuren da suka ɓata watanni",
    },
  },
  {
    phrases: [
      "proof",
      "opay",
      "recording",
      "video proof",
      "evidence",
      "bank statement",
      "shaida",
      "bidiyo",
    ],
    responses: {
      en: "Proof is unedited OPay recordings. See My Story, or ask A. Nova on WhatsApp 09034111438.",
      ha: "Shaida bidiyon OPay ne ba a gyara ba. Duba Labarina, ko tambayi A. Nova a 09034111438.",
    },
  },
  {
    phrases: [
      "time",
      "hours",
      "schedule",
      "busy",
      "job",
      "9-5",
      "15 minutes",
      "daily",
      "workload",
      "minti",
    ],
    responses: {
      en: "After setup, many days need only 15–30 minutes: orders, forwards, quick replies.",
      ha: "Bayan saiti, yawancin rana mintuna 15–30: oda, tura, amsa gajere.",
    },
  },
  {
    phrases: [
      "international",
      "foreign",
      "outside nigeria",
      "ghana",
      "kenya",
      "uk",
      "usa",
      "dollar",
      "country",
      "abroad",
      "diaspora",
      "kasar waje",
    ],
    responses: {
      en: "Yes, digital products work worldwide. Use site checkout or WhatsApp 09034111438 for help with payment.",
      ha: "E, yana aiki a duniya. Biya a shafin ko nemi taimako a WhatsApp 09034111438.",
    },
  },
  {
    phrases: [
      "who is",
      "nova",
      "ahmad",
      "author",
      "background",
      "story",
      "founder",
      "baraya",
      "waye",
    ],
    responses: {
      en: "A. Nova is Ahmad Suleiman Baraya, 24, English Education graduate. He built daily income on a ₦39k phone and wrote the guide from real experience.",
      ha: "A. Nova shine Ahmad Suleiman Baraya, shekara 24, digiri English Education. Ya gina kudi a wayar ₦39k ya rubuta daga gogewa.",
    },
  },
  {
    phrases: [
      "whatsapp",
      "contact",
      "chat",
      "talk",
      "human",
      "phone number",
      "09034111438",
      "call",
      "support",
      "message",
      "tuntuba",
      "namba",
      "magana",
    ],
    responses: {
      en: "WhatsApp A. Nova on 09034111438. He usually replies within 24 hours.",
      ha: "WhatsApp A. Nova a 09034111438. Yawanci amsa cikin sa'o'i 24.",
    },
  },
  {
    phrases: [
      "age",
      "too old",
      "too young",
      "housewife",
      "unemployed",
      "who is this for",
      "can anyone",
      "shekaru",
      "wa yake da shi",
    ],
    responses: {
      en: "For anyone with a phone, data, and discipline: students, graduates, workers, unemployed.",
      ha: "Ga kowa da waya, data, da ƙuduri: ɗalibai, masu digiri, ma'aikata, masu neman aiki.",
    },
  },
  {
    phrases: ["data", "internet", "heavy data", "gb", "mb", "kudin data"],
    responses: {
      en: "Light data is enough. Mostly WhatsApp text and PDF reading.",
      ha: "Data kadan ya isa. Galibi rubutu a WhatsApp da karanta PDF.",
    },
  },
  {
    phrases: [
      "hi",
      "hello",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "greetings",
      "sannu",
      "barka",
      "salama",
      "salamu",
    ],
    responses: {
      en: "Hey! I am Nova. Ask me about the book, masterclass, pricing, results, or how to start.",
      ha: "Sannu! Ni Nova. Tambaye ni game da littafi, darasi, farashi, sakamako, ko yadda ake farawa.",
    },
  },
];

function matchUserQuestion(input: string, lang: "en" | "ha"): string {
  const cleanInput = input.toLowerCase().replace(/[^\w\s]/gi, "");

  for (const item of knowledgeMatrix) {
    for (const phrase of item.phrases) {
      if (cleanInput.includes(phrase)) {
        return item.responses[lang];
      }
    }
  }

  return lang === "en"
    ? "I want to answer you well. Try asking:\n• Is this real?\n• How long for results?\n• How much is the book?\n\nOr WhatsApp A. Nova: 09034111438"
    : "Ina so in amsa da kyau. Gwada:\n• Da gaske ne?\n• Yaushe zan ga sakamako?\n• Nawa ne littafin?\n\nKo WhatsApp: 09034111438";
}

// =========================================================================
// Animated Typing Dots
// =========================================================================
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-emerald-400"
          animate={{
            y: [0, -4, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

// =========================================================================
// Main Chatbot Component
// =========================================================================
export default function Chatbot() {
  const { lang } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mood, setMood] = useState<NovaMood>("idle");
  const [wave, setWave] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const greeting =
    lang === "en"
      ? "Hey! I am Nova, your little guide. Ask me anything about the book, pricing, or how to start."
      : "Sannu! Ni Nova, ƙaramin jagoranka. Tambaye ni game da littafi, farashi, ko farawa.";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: greeting,
    },
  ]);

  // Reset greeting when language changes
  useEffect(() => {
    setMessages([
      {
        id: "1",
        sender: "bot",
        text: greeting,
      },
    ]);
  }, [lang, greeting]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  // Avatar mood state
  useEffect(() => {
    setMood(isTyping ? "talk" : "idle");
  }, [isTyping]);

  // Periodic subtle wave on launcher button while closed (every 8s)
  useEffect(() => {
    if (isOpen) return;
    const interval = window.setInterval(() => {
      setWave(true);
      window.setTimeout(() => setWave(false), 1200);
    }, 8000);
    return () => window.clearInterval(interval);
  }, [isOpen]);

  // Open Chat with Wave Hand trigger 👋
  const openChat = () => {
    setIsOpen(true);
    setWave(true);
    setMood("happy");
    window.setTimeout(() => setWave(false), 1400);
    window.setTimeout(() => setMood("idle"), 1600);
  };

  const handleSend = (
    e?: React.FormEvent,
    presetMessage?: string
  ) => {
    e?.preventDefault();

    const textToSend = presetMessage || input.trim();

    if (!textToSend || isTyping) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "user",
        text: textToSend,
      },
    ]);

    setInput("");
    setIsTyping(true);

    const delay = 600 + Math.random() * 700;

    setTimeout(() => {
      const botReply = matchUserQuestion(textToSend, lang);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: botReply,
        },
      ]);

      setIsTyping(false);
      setMood("happy");

      setTimeout(() => {
        setMood("idle");
      }, 1200);
    }, delay);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans sm:bottom-6 sm:right-6">
      {/* Floating Launcher Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={openChat}
            className="group relative flex items-center gap-3 rounded-full bg-slate-900/95 pl-2 pr-4 py-2 border border-emerald-500/30 shadow-2xl shadow-emerald-500/20 backdrop-blur-md"
            aria-label="Open chat"
          >
            {/* Pulse Ring */}
            <span className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping opacity-40 pointer-events-none" />

            {/* Avatar with Wave 👋 */}
            <NovaAvatar
              size="md"
              mood="idle"
              wave={wave && !isOpen}
            />

            <div className="text-left hidden sm:block">
              <p className="text-[11px] font-black text-white leading-none">
                Nova
              </p>
              <p className="text-[10px] text-emerald-400 font-medium mt-0.5">
                {lang === "en" ? "Ask me anything" : "Tambaye ni"}
              </p>
            </div>

            <span className="sm:hidden text-xs font-bold text-white pr-1">
              {lang === "en" ? "Chat" : "Tambaya"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="w-[min(92vw,380px)] h-[min(72vh,540px)] rounded-[1.75rem] border border-white/10 bg-slate-950 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="relative px-4 py-3 border-b border-white/5 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <NovaAvatar
                  size="md"
                  mood={isTyping ? "talk" : mood}
                  wave={wave && isOpen}
                />

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-white tracking-tight">
                      Nova
                    </h3>

                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                  </div>

                  <p className="text-[10px] text-emerald-400/90 font-medium">
                    {isTyping
                      ? lang === "en"
                        ? "typing..."
                        : "yana rubutu..."
                      : lang === "en"
                        ? "Online · usually instant"
                        : "Kan layi · amsa da sauri"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-2 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Message Body */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/20 via-slate-950 to-slate-950">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex gap-2 ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <NovaAvatar size="sm" mood="idle" />
                  )}

                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line font-medium shadow-sm ${
                      msg.sender === "user"
                        ? "bg-emerald-500 text-slate-950 rounded-br-md"
                        : "bg-slate-900/90 border border-white/10 text-slate-100 rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex items-end gap-2">
                  <NovaAvatar size="sm" mood="talk" />
                  <div className="rounded-2xl rounded-bl-md border border-white/10 bg-slate-900/90 px-3 py-2">
                    <TypingDots />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Pills */}
            <div className="px-3 py-2 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
              {(lang === "en"
                ? [
                    ["Is this real?", "Is this real?"],
                    ["How long for results?", "How long for results?"],
                    ["Book price?", "How much is the book?"],
                  ]
                : [
                    ["Gaskiya ne?", "Da gaske ne?"],
                    ["Yaushe kudi?", "Yaushe zan ga kudi?"],
                    ["Nawa littafi?", "Nawa ne littafin?"],
                  ]
              ).map(([label, send]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleSend(undefined, send)}
                  className="whitespace-nowrap rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => handleSend(e)}
              className="p-3 border-t border-white/5 bg-slate-900/60 flex gap-2 items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  lang === "en"
                    ? "Message Nova..."
                    : "Rubuta wa Nova..."
                }
                className="flex-1 rounded-2xl border border-white/10 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />

              <motion.button
                type="submit"
                disabled={!input.trim() || isTyping}
                whileTap={{ scale: 0.9 }}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-slate-950 disabled:opacity-40 shadow-lg shadow-emerald-500/25"
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}