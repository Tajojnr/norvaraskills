"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, MessageCircle, Construction } from "lucide-react";

type ComingSoonModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
};

export default function ComingSoonModal({
  isOpen,
  onClose,
  title = "Coming Soon",
  description = "This member feature is being connected to our secure backend. For now, order directly on WhatsApp and A. Nova will grant you instant access.",
}: ComingSoonModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            className="relative w-full max-w-md rounded-3xl border border-emerald-500/30 bg-slate-900 p-6 sm:p-8 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <Construction className="h-7 w-7" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  <Sparkles className="h-3 w-3" />
                  Backend in progress
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
              </div>

              <a
                href="https://wa.me/2349034111438?text=Hi%20A.%20Nova%2C%20I%20want%20to%20buy%20and%20get%20instant%20access"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Order on WhatsApp — 09034111438
              </a>

              <button
                onClick={onClose}
                className="text-xs font-semibold text-slate-500 hover:text-slate-300 transition-colors"
              >
                Close and keep browsing
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}