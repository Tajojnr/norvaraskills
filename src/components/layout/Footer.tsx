import Link from "next/link";
import { MessageCircle, ShieldCheck, FileText, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 font-bold text-lg">
                N
              </div>
              <span className="text-lg font-black text-white tracking-tight">NORVARA</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              Real-world systems for building digital wealth using simple tools. No fluff, no AI generic hype.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
              <Globe className="h-4 w-4" />
              <span>norvara.com.ng</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Navigation</h3>
            <ul className="space-y-2 text-sm font-medium">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link href="/courses" className="hover:text-emerald-400 transition-colors">Courses</Link></li>
              <li><Link href="/products" className="hover:text-emerald-400 transition-colors">E-Books</Link></li>
              <li><Link href="/story" className="hover:text-emerald-400 transition-colors">My Story (A. Nova)</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Legal & Policies</h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/terms" className="flex items-center space-x-2 hover:text-emerald-400 transition-colors">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="flex items-center space-x-2 hover:text-emerald-400 transition-colors">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Direct Contact</h3>
            <p className="text-xs text-slate-400 font-medium">
              Ready to order or have questions? Send a direct WhatsApp message.
            </p>
            <a
              href="https://wa.me/2349034111438?text=Hi%20A.%20Nova,%20I%20have%20a%20question%20about%20Norvara"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 rounded-xl bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp: 09034111438</span>
            </a>
            <p className="text-[11px] text-slate-500 font-medium">
              *Usually responds within 24 hours.
            </p>
          </div>

        </div>

        <div className="mt-12 border-t border-white/5 pt-6 text-center text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Norvara by Ahmad Suleiman Baraya (A. Nova). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}