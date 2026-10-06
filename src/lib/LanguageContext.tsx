"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ha";

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    nav_home: "Home",
    nav_courses: "Courses",
    nav_ebooks: "E-Books",
    nav_story: "My Story",
    nav_contact: "Contact",
    nav_signin: "Sign In",
    nav_signup: "Sign Up",

    // Hero
    hero_badge: "Zero Theory. Built From Real Trial & Error.",
    hero_title_1: "How I Turned a ",
    hero_title_2: "₦39,000 Phone",
    hero_title_3: " Into Daily Income.",
    hero_desc: "No wealthy family. No government connections. An English Education graduate who refused a ₦20,000 a month ceiling and built a system that works on autopilot.",
    hero_btn_buy: "Get The Blueprint — ₦9,900",
    hero_btn_story: "Read A. Nova's Story",

    // Stats
    stat_growth: "Daily Income Growth",
    stat_cost: "Hardware Cost",
    stat_proof: "Unedited Video Proof",

    // Contrast
    contrast_title: "The average job ceiling vs. building your own",
    contrast_desc: "Formal education and a standard salary have a hard top. Inflation eats the raise. Digital products flip that. Build once. Sell many times.",

    // Book Spotlight
    book_badge: "Official First Edition",
    book_title: "Building From Zero",
    book_desc: "The complete story and practical guide. What was tested, what failed, and how the daily income system was built on a basic phone.",
    book_btn_wa: "Order on WhatsApp",
    book_price_note: "First 40 buyers get bonus materials. Pay and receive via WhatsApp.",

    // General
    ask_questions: "Questions?",
    whatsapp_support: "WhatsApp Support",
  },

  ha: {
    // Nav
    nav_home: "Gida",
    nav_courses: "Darussa",
    nav_ebooks: "Littattafai",
    nav_story: "Labarina",
    nav_contact: "Tuntube Mu",
    nav_signin: "Shiga",
    nav_signup: "Yi Rajista",

    // Hero
    hero_badge: "Babu Tatsuniya. An Gina Ne Daga Ainihin Ƙoƙari Da Kuskure.",
    hero_title_1: "Yadda Na Mai Da ",
    hero_title_2: "Wayar ₦39,000",
    hero_title_3: " Ta Zama Hanyar Samun Kudi Kullum.",
    hero_desc: "Babu mai kudi a iyaye. Babu haɗin gwiwa da gwamnati. Malami ne mai digirin English Education wanda ya ƙi albashin ₦20,000 a wata, ya gina hanyar samun kansa.",
    hero_btn_buy: "Sami Littafin Shiriyar — ₦9,900",
    hero_btn_story: "Karanta Labarin A. Nova",

    // Stats
    stat_growth: "Ainihin Karuwar Kudi",
    stat_cost: "Kudin Wayar Da Na Yi Amfani Da Ita",
    stat_proof: "Shaidar Bidiyo Ta Ainihi",

    // Contrast
    contrast_title: "Bambancin Aikin Albashi Da Gina Taki Hanyar",
    contrast_desc: "Aikin albashi yana da iyakaccen rufin kudi. Samfurin dijital kuma sau ɗaya ake yin sa, sannan a ci gaba da sayar da shi sau da yawa a waya.",

    // Book Spotlight
    book_badge: "Na Farko A Ainihin Saki",
    book_title: "Gina Daga farko",
    book_desc: "Cikakken labari da littafin jagora na aiki. Abubuwan da aka gwada, kuskuren da aka yi, da yadda aka gina hanyar samun kudi a waya.",
    book_btn_wa: "Yi Odar Littafi A WhatsApp",
    book_price_note: "Mutane 40 na farko za su sami ƙarin kayan kyauta. Biya ka karɓa a WhatsApp.",

    // General
    ask_questions: "Kana da tambaya?",
    whatsapp_support: "Tuntube Mu A WhatsApp",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("norvara_lang") as Language;
    if (saved && (saved === "en" || saved === "ha")) {
      setLang(saved);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("norvara_lang", newLang);
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};