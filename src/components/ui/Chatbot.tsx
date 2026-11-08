"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

type NovaMood = "idle" | "talk" | "happy";
type NovaSize = "sm" | "md" | "lg";

const WHATSAPP_PHONE = "+2349076776905";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_PHONE.replace(/\D/g, "")}`;

// =========================================================================
// Nova's compact brand avatar
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
  const dimensions = {
    sm: "h-7 w-7 rounded-[10px]",
    md: "h-11 w-11 rounded-[15px]",
    lg: "h-14 w-14 rounded-[18px]",
  }[size];
  const markSize = size === "sm" ? "text-xs" : "text-lg";

  return (
    <motion.div
      role="img"
      aria-label="Nova"
      className={`relative isolate grid shrink-0 place-items-center border border-emerald-200/20 bg-gradient-to-br from-emerald-300 via-emerald-500 to-teal-700 shadow-[0_5px_18px_rgba(16,185,129,0.22)] ${dimensions}`}
      animate={
        mood === "talk"
          ? { scale: [1, 1.035, 1] }
          : mood === "happy"
            ? { rotate: [0, -5, 5, 0], scale: [1, 1.05, 1] }
            : { y: [0, -1, 0] }
      }
      transition={
        mood === "idle"
          ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
          : { duration: mood === "talk" ? 0.7 : 0.55, repeat: mood === "talk" ? Infinity : 0, ease: "easeInOut" }
      }
    >
      <span
        className={`relative font-black tracking-[-0.09em] text-white drop-shadow-sm ${markSize}`}
        aria-hidden="true"
      >
        N
      </span>
      {size !== "sm" && (
        <Sparkles
          className="absolute right-0.5 top-0.5 h-3 w-3 text-white/90"
          strokeWidth={2.5}
          aria-hidden="true"
        />
      )}
      <AnimatePresence>
        {wave && (
          <motion.span
            className="absolute -right-2 -top-2 z-10 text-xs drop-shadow-md"
            initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
            animate={{
              opacity: 1,
              rotate: [-20, 25, -15, 20, -10, 15, 0],
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            aria-hidden="true"
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
      en: "A. Nova (Ahmad Suleiman Baraya) is real. He shows unedited OPay screen recordings.\n\nRead My Story free, or message him on WhatsApp +2349076776905 before you spend a naira.",
      ha: "A. Nova mutum ne na gaske. Yana nuna bidiyon OPay ba tare da gyara ba.\n\nKaranta Labarina kyauta, ko tura masa sako a WhatsApp +2349076776905 kafin ka biya.",
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
      en: "Two steps:\n1. Pick the ₦9,900 book or ₦19,500 masterclass.\n2. Message A. Nova on WhatsApp to order or ask questions. He'll guide you through the next steps.\n\nWhich one do you want?",
      ha: "Mataki biyu:\n1. Zaɓi littafi ₦9,900 ko darasi ₦19,500.\n2. Tura wa A. Nova sako a WhatsApp don yin oda ko tambaya. Zai gaya maka matakan gaba.\n\nWanne kake so?",
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
      en: "Message A. Nova on WhatsApp +2349076776905 to place an order or ask about payment and delivery.",
      ha: "Tura wa A. Nova sako a WhatsApp +2349076776905 don yin oda ko tambaya game da biya da isarwa.",
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
      en: "Proof is unedited OPay recordings. See My Story, or ask A. Nova on WhatsApp +2349076776905.",
      ha: "Shaida bidiyon OPay ne ba a gyara ba. Duba Labarina, ko tambayi A. Nova a +2349076776905.",
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
      en: "Yes, digital products work worldwide. WhatsApp A. Nova at +2349076776905 to ask about ordering from your country.",
      ha: "E, kayayyakin dijital suna aiki a duniya. Tura wa A. Nova sako a +2349076776905 don tambaya game da yin oda daga ƙasarka.",
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
      "+2349076776905",
      "call",
      "support",
      "message",
      "tuntuba",
      "namba",
      "magana",
    ],
    responses: {
      en: "WhatsApp A. Nova on +2349076776905. He usually replies within 24 hours.",
      ha: "WhatsApp A. Nova a +2349076776905. Yawanci amsa cikin sa'o'i 24.",
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
    ? "I want to answer you well. Try asking:\n• Is this real?\n• How long for results?\n• How much is the book?\n\nOr WhatsApp A. Nova: +2349076776905"
    : "Ina so in amsa da kyau. Gwada:\n• Da gaske ne?\n• Yaushe zan ga sakamako?\n• Nawa ne littafin?\n\nKo WhatsApp: +2349076776905";
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

  return <ChatbotExperience key={lang} lang={lang} />;
}

function ChatbotExperience({ lang }: { lang: "en" | "ha" }) {
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

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

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
    }, 950);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans sm:bottom-6 sm:right-6">
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
            className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 py-2 pl-2.5 pr-4 shadow-[0_12px_42px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-colors hover:border-emerald-400/40 hover:bg-slate-900"
            aria-label={lang === "en" ? "Chat with Nova" : "Yi hira da Nova"}
          >
            <NovaAvatar
              size="md"
              mood={mood}
              wave={wave && !isOpen}
            />

            <div className="min-w-0 text-left">
              <p className="text-xs font-bold leading-tight text-white">
                {lang === "en" ? "Chat with Nova" : "Yi hira da Nova"}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                {lang === "en" ? "Ask me anything" : "Tambaye ni"}
              </p>
            </div>
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
            role="dialog"
            aria-label={lang === "en" ? "Chat with Nova" : "Yi hira da Nova"}
            className="flex h-[min(78dvh,38rem)] max-h-[calc(100dvh-2rem)] w-[min(calc(100vw-2rem),25rem)] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#07110f]/95 shadow-[0_24px_80px_rgba(0,0,0,0.6)] ring-1 ring-emerald-400/10 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-white/[0.08] bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/50 px-4 py-4">
              <div className="flex items-center gap-3">
                <NovaAvatar
                  size="md"
                  mood={isTyping ? "talk" : mood}
                  wave={wave && isOpen}
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold tracking-tight text-white">
                      Nova
                    </h3>
                  </div>

                  <p className="mt-0.5 flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    {isTyping
                      ? lang === "en"
                        ? "Nova is typing"
                        : "Nova yana rubutu"
                      : lang === "en"
                        ? "Norvara guide · Online"
                        : "Jagorar Norvara · Kan layi"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-transparent p-2 text-slate-400 transition-colors hover:border-white/10 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
                aria-label={lang === "en" ? "Close chat" : "Rufe hira"}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Message Body */}
            <div
              className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.08),transparent_58%)] px-4 py-5"
              role="log"
              aria-live="polite"
              aria-label={lang === "en" ? "Chat messages" : "Saƙonnin hira"}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
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
                    className={`max-w-[84%] whitespace-pre-line rounded-2xl px-3.5 py-3 text-[13px] leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "rounded-br-md bg-emerald-400 font-medium text-slate-950"
                        : "rounded-bl-md border border-white/[0.08] bg-slate-900/90 text-slate-200"
                    }`}
                  >
                    {msg.text.split(WHATSAPP_PHONE).flatMap((part, index) => [
                      ...(index > 0
                        ? [
                            <a
                              key={`whatsapp-${index}`}
                              href={WHATSAPP_HREF}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={
                                lang === "en"
                                  ? "Chat with A. Nova on WhatsApp"
                                  : "Yi hira da A. Nova a WhatsApp"
                              }
                              title={
                                lang === "en"
                                  ? "Chat on WhatsApp"
                                  : "Yi hira a WhatsApp"
                              }
                              className="mx-1 inline-flex h-7 w-7 -translate-y-0.5 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                              <WhatsAppIcon />
                            </a>,
                          ]
                        : []),
                      ...(part
                        ? [<span key={`text-${index}`}>{part}</span>]
                        : []),
                    ])}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex items-end gap-2">
                  <NovaAvatar size="sm" mood="talk" />
                  <div
                    className="rounded-2xl rounded-bl-md border border-white/[0.08] bg-slate-900/90 px-3 py-2"
                    aria-label={lang === "en" ? "Nova is typing" : "Nova yana rubutu"}
                  >
                    <TypingDots />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Pills */}
            <div className="flex gap-2 overflow-x-auto border-t border-white/[0.08] px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                  disabled={isTyping}
                  className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-medium text-slate-300 transition-colors hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => handleSend(e)}
              className="border-t border-white/[0.08] bg-slate-950/60 p-3 sm:p-4"
            >
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 p-1.5 transition-colors focus-within:border-emerald-400/40 focus-within:ring-2 focus-within:ring-emerald-400/10">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    lang === "en"
                      ? "Ask Nova a question..."
                      : "Tambayi Nova..."
                  }
                  aria-label={lang === "en" ? "Your message" : "Saƙonka"}
                  className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none"
                />

                <motion.button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  whileTap={{ scale: 0.92 }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/15 transition-colors hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none"
                  aria-label={lang === "en" ? "Send message" : "Aika saƙo"}
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}