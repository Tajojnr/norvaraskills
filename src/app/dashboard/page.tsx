"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/LanguageContext";
import { createClient } from "@/lib/supabase/client";
import { Play, CheckCircle2, ArrowRight, Smartphone } from "lucide-react";

type Item = { id: string; kind: "book" | "video"; title: string; position: number };
type Access = "loading" | "yes" | "pending" | "no";

export default function DashboardPage() {
  const { lang } = useLanguage();
  const L = (en: string, ha: string) => (lang === "en" ? en : ha);
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPWA, setIsPWA] = useState(false);
  const [access, setAccess] = useState<Access>("loading");
  const [items, setItems] = useState<Item[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) setIsPWA(true);

    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/login"); return; }
      setUser(session.user);
      setLoading(false);

      // RLS returns only this buyer's rows (matched by their confirmed email).
      const { data: purchases } = await supabase
        .from("purchases").select("status, created_at").order("created_at", { ascending: false });

      if (purchases?.some((p: any) => p.status === "paid")) {
        const [{ data: rows }, { data: prog }] = await Promise.all([
          supabase.from("content_items").select("id, kind, title, position").order("position"),
          supabase.from("content_progress").select("item_id, percent"),
        ]);
        setItems((rows as Item[]) ?? []);
        setProgress(Object.fromEntries((prog ?? []).map((p: any) => [p.item_id, p.percent])));
        setAccess("yes");
      } else {
        const recent = purchases?.some((p: any) => p.status === "pending" && Date.now() - new Date(p.created_at).getTime() < 60 * 60 * 1000);
        setAccess(recent ? "pending" : "no");
      }
    };
    load();
  }, [router, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-400 font-bold tracking-widest text-xs uppercase">Loading...</div>;
  }

  const books = items.filter((i) => i.kind === "book");
  const videos = items.filter((i) => i.kind === "video");

  const Row = ({ item }: { item: Item }) => {
    const pct = progress[item.id] ?? 0;
    const done = pct >= 100;
    const href = `/dashboard/${item.kind === "book" ? "ebooks" : "courses"}/${item.id}`;
    const status = done ? L("Completed", "An kammala") : pct > 0 ? L("In Progress", "Ana yi") : L("Not started", "Ba a fara ba");
    return (
      <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:bg-slate-900 transition-colors">
        <div className="flex-1 space-y-3">
          <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
            done ? "bg-emerald-500/10 text-emerald-400" : pct > 0 ? "bg-amber-500/10 text-amber-400" : "bg-white/5 text-slate-400"
          }`}>{status}</span>
          <h3 className="text-base font-bold text-white">{item.title}</h3>
          <div className="w-full max-w-sm">
            <div className="flex justify-between text-[10px] text-slate-400 mb-1.5 font-medium">
              <span>{L("Progress", "Ci gaba")}</span><span>{pct}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${done ? "bg-emerald-500" : "bg-gradient-to-r from-emerald-500 to-teal-400"}`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
        <div className="shrink-0">
          {done ? (
            <Link href={href} className="flex items-center justify-center gap-2 bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-slate-700 transition-colors w-full">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />{L("Review", "Duba Kuma")}
            </Link>
          ) : (
            <Link href={href} className="flex items-center justify-center gap-2 bg-emerald-500 text-slate-950 text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-emerald-400 transition-colors w-full shadow-lg shadow-emerald-500/10">
              <Play className="h-3.5 w-3.5" />{pct > 0 ? L("Continue", "Ci gaba") : L("Start", "Fara")}
            </Link>
          )}
        </div>
      </div>
    );
  };

  const recommended = [{ title: "The Autopilot Audience", desc: "Messaging that turns visitors into buyers.", price: "Coming Soon" }];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 border-b border-white/5 pb-8">
            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tighter">{L("My Dashboard", "Dakin Karatu")}</h1>
              <p className="text-sm text-slate-400 mt-2 font-medium">
                {L("Welcome back,", "Sannu da zuwa,")} <span className="text-emerald-400">{user?.user_metadata?.full_name || user?.email}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              {!isPWA && (
                <button className="hidden sm:flex items-center gap-2 rounded-xl bg-slate-900 border border-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors">
                  <Smartphone className="h-4 w-4 text-emerald-400" /><span>{L("Install App", "Saka Manhaja")}</span>
                </button>
              )}
              <button onClick={handleSignOut} className="text-xs font-bold text-slate-400 hover:text-white bg-slate-900 border border-white/5 px-4 py-2.5 rounded-xl transition-colors">
                {L("Sign Out", "Fita")}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-10">
              {access === "loading" && <p className="text-sm text-slate-500">{L("Loading your content...", "Ana lodin abubuwanka...")}</p>}

              {access === "pending" && (
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 space-y-3">
                  <h2 className="text-lg font-bold text-white">{L("We are confirming your payment", "Muna tabbatar da biyan ka")}</h2>
                  <p className="text-sm text-slate-400 font-medium">{L("This usually takes under a minute. Refresh this page in a moment.", "Yawanci bai wuce minti ɗaya ba. Sake buɗe wannan shafi.")}</p>
                  <button onClick={() => window.location.reload()} className="rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400">{L("Refresh", "Sake buɗewa")}</button>
                </div>
              )}

              {access === "no" && (
                <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 space-y-3">
                  <h2 className="text-lg font-bold text-white">{L("You do not have access yet", "Ba ka da damar shiga tukuna")}</h2>
                  <p className="text-sm text-slate-400 font-medium">
                    {L(`Access is linked to the email you paid with. You are signed in as ${user?.email}. If you paid with another email, sign in with that one.`,
                       `Ana haɗa shiga da imel ɗin da ka biya da shi. Ka shiga da ${user?.email}. Idan ka biya da wani imel, ka shiga da shi.`)}
                  </p>
                  <Link href="/book" className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400">
                    {L("Get the complete system", "Sami cikakken tsarin")} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}

              {access === "yes" && (
                <>
                  <div>
                    <h2 className="text-lg font-bold text-white mb-4">{L("My Books", "Littattafaina")}</h2>
                    <div className="grid gap-4">{books.map((b) => <Row key={b.id} item={b} />)}</div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white mb-4">{L("My Video Courses", "Bidiyoyin Koyarwa")}</h2>
                    <div className="grid gap-4">{videos.map((v) => <Row key={v.id} item={v} />)}</div>
                  </div>
                </>
              )}
            </div>

            <div className="lg:col-span-4 space-y-6">
              <h2 className="text-lg font-bold text-white">{L("Recommended for you", "Abin da muke ba ka shawara")}</h2>
              <div className="grid gap-4">
                {recommended.map((rec, idx) => (
                  <div key={idx} className="rounded-2xl border border-white/5 bg-gradient-to-b from-slate-900 to-slate-950 p-5 space-y-3">
                    <div className="inline-flex rounded bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">New</div>
                    <h3 className="text-base font-bold text-white leading-tight">{rec.title}</h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{rec.desc}</p>
                    <div className="pt-3 flex items-center justify-between border-t border-white/5">
                      <span className="text-xs font-bold text-slate-500">{rec.price}</span>
                      <button className="text-emerald-400 hover:text-emerald-300 text-xs font-bold flex items-center gap-1">
                        {L("Notify Me", "Sanar Da Ni")} <ArrowRight className="h-3 w-3" />
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