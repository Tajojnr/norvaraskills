"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ComingSoonModal from "@/components/ui/ComingSoonModal";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "E-Books", href: "/products" },
  { name: "My Story", href: "/story" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const openComingSoon = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    setShowComingSoon(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-10 w-10 flex items-center justify-center overflow-hidden rounded-full ring-1 ring-white/10 group-hover:ring-emerald-500/50 transition-all bg-slate-900">
              <img
                src="/logo.png"
                alt="Norvara"
                className="h-full w-full object-contain p-0.5"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector(".fallback-logo")) {
                    const fallback = document.createElement("div");
                    fallback.className =
                      "fallback-logo flex h-full w-full items-center justify-center bg-emerald-500 font-black text-slate-950 text-sm";
                    fallback.innerText = "N";
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-base font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors leading-none">
                NORVARA
              </span>
              <span className="text-[9px] tracking-widest text-slate-400 uppercase font-semibold mt-1 leading-none">
                by A. Nova
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth — Coming Soon */}
          <div className="hidden md:flex items-center space-x-5">
            <button
              onClick={openComingSoon}
              className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={openComingSoon}
              className="rounded-full bg-white text-slate-950 px-4 py-2 text-xs font-bold hover:bg-slate-200 transition-all shadow-sm"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-white focus:outline-none p-1.5"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-white/5 bg-slate-950 px-5 pt-3 pb-6 space-y-4"
            >
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-semibold text-slate-300 hover:text-emerald-400 py-1 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <button
                  onClick={openComingSoon}
                  className="w-1/2 text-center rounded-xl border border-white/10 bg-slate-900 py-2.5 text-xs font-semibold text-slate-200"
                >
                  Sign In
                </button>
                <button
                  onClick={openComingSoon}
                  className="w-1/2 text-center rounded-xl bg-white py-2.5 text-xs font-bold text-slate-950"
                >
                  Sign Up
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        title="Member Area Coming Soon"
        description="Login, signup, and the private dashboard are being connected. Right now, order on WhatsApp and A. Nova will send your book or course access instantly."
      />
    </>
  );
}