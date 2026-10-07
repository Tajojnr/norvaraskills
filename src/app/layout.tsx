import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/ui/Chatbot";
import { LanguageProvider } from "@/lib/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

// ==========================================
// GOOGLE SEARCH CONSOLE & SEO MASTER TAGS
// ==========================================
export const metadata: Metadata = {
  metadataBase: new URL("https://norvara.com.ng"),

  title: {
    default: "NORVARA | How to Make Money Online Selling PDFs & Courses",
    template: "%s | NORVARA",
  },

  description:
    "Learn how to make money online in Nigeria. A. Nova shares the exact side hustle blueprint to sell digital PDFs and video courses using just a smartphone.",

  keywords: [
    "how to make money online",
    "pdf selling online",
    "how to do side hustles",
    "make money online in Nigeria",
    "Ahmad Suleiman Baraya",
    "A Nova",
    "digital products side hustle",
    "make money with smartphone",
    "sell ebooks online",
  ],

  authors: [
    {
      name: "Ahmad Suleiman Baraya (A. Nova)",
    },
  ],

  creator: "A. Nova",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://norvara.com.ng",
    title: "NORVARA | Start Your Digital Side Hustle Today",
    description:
      "The practical blueprint to selling PDFs and courses online with zero capital. Built from real proof.",
    siteName: "Norvara",
  },

  twitter: {
    card: "summary_large_image",
    title: "NORVARA | Make Money Online Selling Digital Products",
    description:
      "Step-by-step side hustle guide to selling PDFs using a ₦39,000 phone.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Norvara",
  },

  formatDetection: {
    telephone: false,
  },
};

// ==========================================
// ROOT LAYOUT
// ==========================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Direct Google Verification Tag */}
        <meta
          name="google-site-verification"
          content="V5dtFV1hfvIbO6aPdYRyGhmdW3NvVGTQLL8LuyPlVH4"
        />
      </head>
      <body
        className={`${inter.className} bg-slate-950 text-slate-100 antialiased`}
      >
        <LanguageProvider>
          {children}
          <Chatbot />
        </LanguageProvider>
      </body>
    </html>
  );
}