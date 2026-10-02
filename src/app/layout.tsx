import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/ui/Chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NORVARA | Real Digital Wealth Systems by A. Nova",
  description:
    "Official website of Ahmad Suleiman Baraya (A. Nova). Practical digital product guides and video courses built from real hands-on experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased`}>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}