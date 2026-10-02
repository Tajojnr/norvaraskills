import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeClient from "./HomeClient"; // We will build this inline below

// ==========================================
// 1. SERVER-SIDE SEO & METADATA (Perfect for Google)
// ==========================================
export const metadata: Metadata = {
  title: "NORVARA | Build Digital Wealth With Zero Capital",
  description: "Learn how A. Nova turned a ₦39,000 phone into daily income. Practical digital product blueprints, secure video masterclasses, and real-world proof.",
  keywords: ["digital products", "make money online", "A Nova", "Norvara", "ebooks", "video courses", "financial freedom Nigeria"],
  openGraph: {
    title: "NORVARA | Real Digital Wealth Systems",
    description: "Zero theory. Built from real trial and error. Read the story and get the step-by-step blueprint.",
    url: "https://norvara.com.ng",
    siteName: "Norvara",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NORVARA | By A. Nova",
    description: "Learn how to build digital products using just a smartphone.",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://norvara.com.ng",
  },
};

// ==========================================
// 2. SERVER COMPONENT WRAPPER
// ==========================================
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow flex flex-col items-center bg-slate-950 font-sans selection:bg-emerald-500/30">
        <HomeClient />
      </main>
      <Footer />
    </>
  );
}