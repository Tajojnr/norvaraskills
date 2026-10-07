"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/LanguageContext";
import { createClient } from "@/lib/supabase/client";
import { Play, CheckCircle2, Download, ArrowRight, Smartphone } from "lucide-react";

export default function DashboardPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    // Check if app is installed (PWA)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsPWA(true);
    }

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };
    checkUser();
  }, [router, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-400 font-bold tracking-widest text-xs uppercase">Loading...</div>;
  }

  // MOCK DATA: To be replaced with Supabase fetch logic later
  const myCourses = [
    {
      id: "masterclass",
      title: "Phone-First Digital Masterclass",
      progress: 45, // percentage
      status: "In Progress",
      type: "course",
    },
    {
      id: "building-zero",
      title: "Building From Zero",
      progress: 100,
      status: "Completed",
      type: "ebook",
    }
  ];

  const recommended = [
    {
      title: "The Autopilot Audience",
      desc: "Messaging that turns visitors into buyers.",
      price: "Coming Soon"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Header & PWA Prompt */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 border-b border-white/5 pb-8">
            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tighter">
                {lang === "en" ? "My Dashboard" : "Dakin Karatu"}
              </h1>
              <p className="text-sm text-slate-400 mt-2 font-medium">
                {lang === "en" ? "Welcome back," : "Sannu da zuwa,"} <span className="text-emerald-400">{user?.user_metadata?.full_name || user?.email}</span>
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {!isPWA && (
                <button className="hidden sm:flex items-center gap-2 rounded-xl bg-slate-900 border border-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors">
                  <Smartphone className="h-4 w-4 text-emerald-400" />
                  <span>{lang === "en" ? "Install App" : "Saka Manhaja"}</span>
                </button>
              )}
              <button
                onClick={handleSignOut}
                className="text-xs font-bold text-slate-400 hover:text-white bg-slate-900 border border-white/5 px-4 py-2.5 rounded-xl transition-colors"
              >
                {lang === "en" ? "Sign Out" : "Fita"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Active & Completed Courses */}
            <div className="lg:col-span-8 space-y-8">
              
              <div>
                <h2 className="text-lg font-bold text-white mb-4">
                  {lang === "en" ? "My Learning" : "Karatuna"}
                </h2>
                
                <div className="grid gap-4">
                  {myCourses.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-white/5 bg-slate-900/50 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:bg-slate-900 transition-colors">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                            item.progress === 100 ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white">{item.title}</h3>
                        
                        {/* Progress Bar */}
                        <div className="w-full max-w-sm">
                          <div className="flex justify-between text-[10px] text-slate-400 mb-1.5 font-medium">
                            <span>{lang === "en" ? "Progress" : "Ci gaba"}</span>
                            <span>{item.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${item.progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-emerald-500 to-teal-400'}`}
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {item.progress === 100 ? (
                          <Link href={`/dashboard/${item.type}s/${item.id}`} className="flex items-center justify-center gap-2 bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-slate-700 transition-colors w-full">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            {lang === "en" ? "Review" : "Duba Kuma"}
                          </Link>
                        ) : (
                          <Link href={`/dashboard/${item.type}s/${item.id}`} className="flex items-center justify-center gap-2 bg-emerald-500 text-slate-950 text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-emerald-400 transition-colors w-full shadow-lg shadow-emerald-500/10">
                            <Play className="h-3.5 w-3.5" />
                            {lang === "en" ? "Continue" : "Ci gaba"}
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Recommended / Up-sell */}
            <div className="lg:col-span-4 space-y-6">
              <h2 className="text-lg font-bold text-white">
                {lang === "en" ? "Recommended for you" : "Abin da muke ba ka shawara"}
              </h2>
              
              <div className="grid gap-4">
                {recommended.map((rec, idx) => (
                  <div key={idx} className="rounded-2xl border border-white/5 bg-gradient-to-b from-slate-900 to-slate-950 p-5 space-y-3">
                    <div className="inline-flex rounded bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                      New
                    </div>
                    <h3 className="text-base font-bold text-white leading-tight">{rec.title}</h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{rec.desc}</p>
                    
                    <div className="pt-3 flex items-center justify-between border-t border-white/5">
                      <span className="text-xs font-bold text-slate-500">{rec.price}</span>
                      <button className="text-emerald-400 hover:text-emerald-300 text-xs font-bold flex items-center gap-1">
                        {lang === "en" ? "Notify Me" : "Sanar Da Ni"} <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}