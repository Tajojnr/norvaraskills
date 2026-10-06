"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

// =========================================================================
// EXPANDED BILINGUAL MASTER KNOWLEDGE MATRIX (21 INTENT CATEGORIES)
// =========================================================================
const knowledgeMatrix = [
  // 1. TIMELINE & WHEN TO SEE RESULTS
  {
    phrases: ["how long", "results", "when will i make money", "how fast", "timeline", "quick money", "overnight", "how soon", "yaushe zan ga kudi", "lokaci", "sauri", "yaya jimawa"],
    responses: {
      en: "This is not a get-rich-quick scheme. A. Nova graduated in November and hit his breakthrough 5 months later in April.\n\nYour results depend entirely on how fast you apply the framework. Some people see their first sales within weeks of releasing their digital product.",
      ha: "Wannan ba tsarin samun kudi dare daya bane. A. Nova ya gama karatu a watan Nuwamba, kuma ya sami nasara bayan watanni 5 a watan Apilu.\n\nSakamakonka ya danganta ne da yadda kaje kake aiki da tsarin. Wasu suna ganin ciniki na farko a cikin makwanni kadan."
    }
  },

  // 2. SCAM / LEGITIMACY / TRUST OBJECTIONS
  {
    phrases: ["scam", "legit", "fake", "trust", "is this real", "fraud", "scammer", "why should i trust", "karya", "zamba", "yaudara", "da gaske ne", "gaskiya ne"],
    responses: {
      en: "A. Nova (Ahmad Suleiman Baraya) is a real person, an English Education graduate, and publicly shows unedited bank screen recordings from his OPay account.\n\nNothing in this story is exaggerated. You can read his full story for free on the My Story page or message him directly on WhatsApp at 09034111438 before spending a single naira.",
      ha: "A. Nova (Ahmad Suleiman Baraya) mutum ne na gaske kuma yana nuna bidiyon asusunsa na OPay ba tare da an gyara ba.\n\nBabu kintace ko karya. Zaka iya karanta labarinsa kyauta a shafin 'My Story' ko ka yi masa magana a WhatsApp a 09034111438 kafin ka kashe kobo 1."
    }
  },

  // 3. DO I NEED EXTRA MONEY FOR ADS / CAPITAL?
  {
    phrases: ["capital", "ads", "extra money", "ad budget", "facebook ads", "running ads", "more money", "investment", "jari", "kudin talla"],
    responses: {
      en: "You do not need capital or ad budget to start. A. Nova built his system with zero ad spend using organic WhatsApp strategies and simple content on his ₦39,000 phone.\n\nYou only need ₦9,900 for the book, your phone, and data.",
      ha: "Ba ka buƙatar wani babban jari ko kudin talla. A. Nova ya gina wannan tsarin ne ba tare da kashe kudin talla ba, amfani kawai ya yi da hanyoyin WhatsApp a wayarsa ta ₦39,000.\n\n₦9,900 kacal kake buƙata na littafin da wayarka da data."
    }
  },

  // 4. WHAT PRODUCT WILL I ACTUALLY SELL?
  {
    phrases: ["what will i sell", "what product", "niche", "idea", "what to sell", "my own product", "creation", "me zan sayar", "wani kaya"],
    responses: {
      en: "The book teaches you step-by-step how to identify market demand and package simple knowledge into downloadable PDF guides or mini video courses using your phone.\n\nYou do not need to be an expert. You just need to solve a specific problem people are already searching for.",
      ha: "Littafin yana koya maka mataki-mataki yadda zaka gano abin da mutane ke buƙata ka maida ilimi mai sauki ya koma littafin PDF ko gajeren bidiyo a wayarka.\n\nBa sai ka zama gwani ba. Kawai ka warware wata matsala da mutane ke neman mafita a kanta."
    }
  },

  // 5. REFUND POLICY
  {
    phrases: ["refund", "money back", "guarantee", "return", "maida kudi"],
    responses: {
      en: "Because digital books and courses are delivered instantly upon purchase, all sales are final.\n\nHowever, the practical knowledge inside is structured to return many times what you paid if you actually apply it.",
      ha: "Saboda ana tura littattafai da darussan dijital ne nan take bayan biya, babu maida kudi.\n\nSai dai, ilimin aiki dake ciki an tsara shi ne domin ya dawo maka da ribar kudin da ka biya idan har ka yi aiki da shi."
    }
  },

  // 6. GETTING STARTED & HOW TO BUY
  {
    phrases: ["get started", "getting started", "how to start", "where to begin", "how do i begin", "how to buy", "how do i buy", "i want to buy", "join", "enroll", "first step", "steps", "yaya zan fara", "yaya zan saya"],
    responses: {
      en: "Starting takes two steps:\n\n1. Choose your product: The ₦9,900 Practical Book or ₦19,500 Video Masterclass.\n2. Message A. Nova on WhatsApp at 09034111438 to pay and receive instant file delivery.\n\nWhich one do you want to start with?",
      ha: "Farawa mataki biyu ne:\n1. Zaɓi samfur: Littafin aiki na ₦9,900 ko Babban Bidiyo na ₦19,500.\n2. Tura wa A. Nova sako a WhatsApp (09034111438) domin biya da karɓar kayanka nan take.\n\nWanne kake so ka fara da shi?"
    }
  },

  // 7. DELIVERY & ACCESS AFTER PAYMENT
  {
    phrases: ["delivery", "after payment", "how do i get", "receive", "download", "access", "where is the book", "instant", "email", "after buying", "after i pay", "yaya zan karba", "bayan biya"],
    responses: {
      en: "Access is instant on WhatsApp. As soon as you confirm payment with A. Nova (09034111438), your PDF file or course link is sent directly to your phone.",
      ha: "Ana tura kaya nan take a WhatsApp. Da zarar ka tabbatar da biya tare da A. Nova (09034111438), za a tura maka fayil ɗin PDF ko hanyar shiga darussanka a wayarka."
    }
  },

  // 8. PRICING & DISCOUNTS
  {
    phrases: ["price", "cost", "how much", "amount", "fee", "cheap", "discount", "first 40", "bonus", "offer", "expensive", "nawa ne", "farashi", "kudi", "kudinsa"],
    responses: {
      en: "Pricing:\n\n• Building From Zero Book: ₦9,900 (First 40 buyers get bonus materials).\n• Video Masterclass: ₦19,500.\n\nBoth give lifetime access with no monthly charges.",
      ha: "Farashi:\n• Littafin Gina Daga farko: ₦9,900 (Mutane 40 na farko za su samu kyauta).\n• Darussan Bidiyo: ₦19,500.\n\nDuka biyun mallakarka ne har abada babu kudin wata-wata."
    }
  },

  // 9. BOOK VS MASTERCLASS DIFFERENCE
  {
    phrases: ["difference", "versus", "vs", "which one", "book or course", "masterclass or ebook", "should i get", "bambanci", "wanne ya kamata"],
    responses: {
      en: "Difference:\n\n• The ₦9,900 Book is a practical text blueprint detailing the exact story, mistakes to avoid, and step-by-step framework.\n\n• The ₦19,500 Masterclass includes full video walkthroughs and phone setup demonstrations.",
      ha: "Bambanci:\n• Littafin ₦9,900 jagora ne na rubutu da ke bayanin ainihin labari, kuskuren da za ka gujewa, da tsarin aiki.\n\n• Darussan ₦19,500 sun haɗa da bidiyoyi masu nuna maka yadda ake saita komai a waya."
    }
  },

  // 10. PHONE & HARDWARE REQUIREMENTS
  {
    phrases: ["phone", "laptop", "computer", "39000", "39k", "39,000", "device", "hardware", "android", "iphone", "data", "tech", "waya", "kwamfuta"],
    responses: {
      en: "You do not need a laptop. A. Nova built this system on a ₦39,000 phone. Your smartphone and an internet connection are all you need.",
      ha: "Ba ka buƙatar kwamfuta (laptop). A. Nova ya gina wannan tsarin ne akan wayar ₦39,000. Wayarka ta hannu da intanet kawai kake buƙata."
    }
  },

  // 11. BEGINNERS & NO EXPERIENCE
  {
    phrases: ["beginner", "experience", "student", "skills", "no experience", "never done", "can i do this", "difficult", "hard", "education", "degree", "ban iya ba", "ban taba yi ba"],
    responses: {
      en: "No business experience needed. A. Nova studied English Education, failed JAMB twice, and had no mentor. The book is written in plain, direct English.",
      ha: "Ba ka buƙatar kwarewar kasuwanci a baya. A. Nova ya karanta English Education ne, ya fadi JAMB sau biyu, kuma ba shi da wanda ya koya masa. An rubuta littafin ne a sauƙaƙen harshe."
    }
  },

  // 12. PAYMENT METHODS (NAIRA & GLOBAL)
  {
    phrases: ["pay", "payment", "card", "transfer", "bank transfer", "flutterwave", "stripe", "dollars", "usd", "naira", "opay", "ussd", "account", "yadda zan biya"],
    responses: {
      en: "You can pay via direct bank transfer or card on WhatsApp with A. Nova (09034111438). International cards in USD or EUR are also supported.",
      ha: "Zaka iya biya ta hanyar tura kudi daga banki (transfer) ko amfani da katin banki a WhatsApp wajen A. Nova (09034111438). Muna karɓar katin waje a Doli ko Yuro."
    }
  },

  // 13. CURRICULUM & WHAT IS INSIDE
  {
    phrases: ["inside", "what is in", "content", "curriculum", "modules", "topics", "learn", "what will i learn", "table of contents", "spaghetti", "tree", "me ke ciki"],
    responses: {
      en: "Inside the book:\n1. Shifting from a low salary ceiling to daily income.\n2. Creating digital products on your phone.\n3. Setting up WhatsApp funnels in 15 minutes a day.\n4. Specific mistakes that cost months.",
      ha: "Abin da ke cikin littafin:\n1. Sauya tunani daga ƙaramin albashi zuwa samun kudi kullum.\n2. Ƙirƙirar kayan dijital a wayarka.\n3. Saita tsarin WhatsApp a yan mintuna a rana.\n4. Kuskuren da ya ɓata watanni."
    }
  },

  // 14. PROOF & OPAY BANK RECORDINGS
  {
    phrases: ["proof", "opay", "recording", "video proof", "evidence", "bank statement", "shaida", "bidiyo"],
    responses: {
      en: "Everything is backed by unedited screen recordings from A. Nova's real OPay account. Check the My Story page or ask him directly on WhatsApp at 09034111438.",
      ha: "Komai yana samun goyon bayan ainihin bidiyon asusun OPay na A. Nova. Duba shafin My Story ko ka tambaye shi kai tsaye a WhatsApp a 09034111438."
    }
  },

  // 15. DAILY TIME COMMITMENT
  {
    phrases: ["time", "hours", "how long", "schedule", "busy", "job", "9-5", "15 minutes", "daily", "workload", "minti", "lokaci"],
    responses: {
      en: "Once set up, running the system takes 15 to 30 minutes a day. Forwarding items, taking orders, and answering customer questions on your phone.",
      ha: "Da zarar ka saita, gudanar da tsarin yana ɗaukar mintuna 15 zuwa 30 ne kawai a rana. Tura kaya, karɓar oda, da amsa tambayoyi a wayarka."
    }
  },

  // 16. INTERNATIONAL BUYERS
  {
    phrases: ["international", "foreign", "outside nigeria", "ghana", "kenya", "uk", "usa", "dollar", "country", "abroad", "diaspora", "kasar waje"],
    responses: {
      en: "Yes. Digital products work anywhere in the world. Message A. Nova on WhatsApp at 09034111438 for card or international payment details.",
      ha: "E. Kayayyakin dijital suna aiki a kowace ƙasa a duniya. Tura wa A. Nova sako a WhatsApp a 09034111438 domin samun hanyar biya ta katin waje."
    }
  },

  // 17. FOUNDER STORY
  {
    phrases: ["who is", "nova", "ahmad", "author", "background", "story", "founder", "baraya", "malam", "waye"],
    responses: {
      en: "A. Nova (Ahmad Suleiman Baraya) is a 24 year old English Education graduate. He built a daily income engine on a ₦39k phone and wrote this guide to share what worked.",
      ha: "A. Nova (Ahmad Suleiman Baraya) ɗalibin da ya gama karatu ne a fannin English Education yana shekara 24. Ya gina hanyar samun kudi a wayar ₦39k kuma ya rubuta wannan littafin domin raba abin da ya yi aiki."
    }
  },

  // 18. WHATSAPP DIRECT CONTACT
  {
    phrases: ["whatsapp", "contact", "chat", "talk", "human", "phone number", "09034111438", "call", "support", "message", "tuntuba", "namba", "magana"],
    responses: {
      en: "Chat directly with A. Nova on WhatsApp at 09034111438. He usually replies within 24 hours.",
      ha: "Yi magana kai tsaye da A. Nova a WhatsApp a 09034111438. Yana bayar da amsa a cikin sa'o'i 24."
    }
  },

  // 19. AGE & WHO IS THIS FOR?
  {
    phrases: ["age", "too old", "too young", "housewife", "unemployed", "who is this for", "can anyone", "shekaru", "wa yake da shi"],
    responses: {
      en: "This is for anyone who has a smartphone, internet access, and the discipline to follow instructions. Students, graduates, 9-to-5 workers, and unemployed individuals can all build this.",
      ha: "Wannan yana da kyau ga kowa mai wayar hannu, intanet, da ƙudurin bin umarni. Ɗalibai, masu neman aiki, da ma'aikata duka za su iya gina wannan."
    }
  },

  // 20. DATA CONSUMPTION
  {
    phrases: ["data", "internet", "heavy data", "gb", "mb", "kudin data"],
    responses: {
      en: "You do not need heavy data. The system runs primarily on WhatsApp text messages and light PDF viewing on your phone.",
      ha: "Ba ka buƙatar data mai yawa. Tsarin yana tafiya ne galibi akan saƙonnin rubutu na WhatsApp da kuma karanta PDF a wayarka."
    }
  },

  // 21. GREETINGS
  {
    phrases: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "greetings", "sannu", "barka", "salama"],
    responses: {
      en: "Welcome to Norvara. I can answer questions about the ₦9,900 book, the masterclass, results timeline, or how to order. What do you want to know?",
      ha: "Barka da zuwa Norvara. Ina amsa tambayoyi game da littafin ₦9,900, babban bidiyo, ko yadda zaka yi oda. Wace tambaya kake da ita?"
    }
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
    ? "I want to give you the exact answer. You can ask:\n• Is this a scam?\n• How long until I see results?\n• Do I need extra money for ads?\n• How much is the book?\n\nOr message A. Nova directly on WhatsApp at 09034111438."
    : "Ina so in baka amsa mai kyau. Zaka iya tambaya:\n• Shin da gaske ne?\n• Yaushe zan ga sakamako?\n• Ina buƙatar jari?\n\nKo ka yiwa A. Nova magana kai tsaye a WhatsApp: 09034111438.";
}

export default function Chatbot() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: lang === "en" 
        ? "Hi. Ask me anything about how to get started, results timeline, pricing, or if this system is right for you." 
        : "Sannu. Yi min kowace tambaya game da yadda zaka fara, farashi, ko kuma lokacin ganin sakamako.",
    },
  ]);

  // Sync initial message when user switches language
  useEffect(() => {
    setMessages([
      {
        id: "1",
        sender: "bot",
        text: lang === "en" 
          ? "Hi. Ask me anything about how to get started, results timeline, pricing, or if this system is right for you." 
          : "Sannu. Yi min kowace tambaya game da yadda zaka fara, farashi, ko kuma lokacin ganin sakamako.",
      },
    ]);
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent, presetMessage?: string) => {
    e?.preventDefault();
    const textToSend = presetMessage || input.trim();
    if (!textToSend) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botReply = matchUserQuestion(textToSend, lang);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: "bot", text: botReply },
      ]);
      setIsTyping(false);
    }, 300);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3.5 text-slate-950 font-bold shadow-xl hover:bg-emerald-400 transition-colors"
          >
            <Bot className="h-5 w-5" />
            <span className="hidden sm:inline text-xs tracking-wide">
              {lang === "en" ? "Questions?" : "Tambaye-tambaye?"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="w-[92vw] sm:w-[380px] h-[500px] rounded-3xl border border-white/10 bg-slate-950 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Nova Assistant</h3>
                  <p className="text-[10px] text-slate-400">
                    {lang === "en" ? "Instant answers" : "Amsa nan take"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[85%] leading-relaxed whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-emerald-500 text-slate-950 font-medium rounded-tr-none"
                        : "bg-slate-900 border border-white/5 text-slate-200 rounded-tl-none font-medium"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="text-slate-500 text-[11px] italic font-medium">
                  {lang === "en" ? "Nova Assistant is typing..." : "Nova yana rubutu..."}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Pills */}
            <div className="px-3 py-2 border-t border-white/5 bg-slate-950 flex gap-1.5 overflow-x-auto text-[10px] no-scrollbar">
              <button
                onClick={() => handleSend(undefined, lang === "en" ? "Is this a scam?" : "Da gaske ne?")}
                className="whitespace-nowrap px-2.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold"
              >
                {lang === "en" ? "Is this real?" : "Gaskiya ne?"}
              </button>
              <button
                onClick={() => handleSend(undefined, lang === "en" ? "How long until I see results?" : "Yaushe zan ga sakamako?")}
                className="whitespace-nowrap px-2.5 py-1.5 rounded-full bg-slate-900 border border-white/10 text-slate-300"
              >
                {lang === "en" ? "How long for results?" : "Yaushe zan ga kudi?"}
              </button>
              <button
                onClick={() => handleSend(undefined, lang === "en" ? "Do I need money for ads?" : "Ina bukatan kudin talla?")}
                className="whitespace-nowrap px-2.5 py-1.5 rounded-full bg-slate-900 border border-white/10 text-slate-300"
              >
                {lang === "en" ? "Do I need ad capital?" : "Kudin talla?"}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={(e) => handleSend(e)} className="p-3 border-t border-white/5 bg-slate-900/50 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === "en" ? "Ask a question..." : "Yi tambayarka..."}
                className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder:text-slate-500"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="bg-emerald-500 text-slate-950 p-2.5 rounded-xl hover:bg-emerald-400 transition-colors font-bold disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}