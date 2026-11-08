"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/LanguageContext";
import { createClient } from "@/lib/supabase/client";
import { Play, CheckCircle2, ArrowRight, Smartphone, BookOpen, Clock3, GraduationCap } from "lucide-react";

type Item = { id: string; kind: "book" | "video"; title: string; position: number };
type Access = "loading" | "yes" | "pending" | "no";

export default function DashboardPage() {
  const { lang } = useLanguage();
  const L = (en: string, ha: string) => (lang === "en" ? en : ha);
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const isPWA = useSyncExternalStore(
    (callback) => {
      const query = window.matchMedia("(display-mode: standalone)");
      query.addEventListener("change", callback);
      return () => query.removeEventListener("change", callback);
    },
    () => window.matchMedia("(display-mode: standalone)").matches,
    () => false,
  );
  const [access, setAccess] = useState<Access>("loading");
  const [items, setItems] = useState<Item[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const load = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        setLoadError(sessionError.message);
        setLoading(false);
        return;
      }
      if (!session) { router.push("/login"); return; }
      setUser(session.user);

      const [{ data: purchases, error: purchasesError }, { data: hasAccess, error: accessError }] = await Promise.all([
        supabase.from("purchases").select("status, created_at").order("created_at", { ascending: false }),
        supabase.rpc("has_learning_access"),
      ]);

      if (accessError || (purchasesError && !hasAccess)) {
        setLoadError(purchasesError?.message ?? accessError?.message ?? "Could not check your course access.");
        setLoading(false);
        return;
      }

      if (hasAccess || purchases?.some((p: { status: string }) => p.status === "paid")) {
        const [{ data: rows, error: contentError }, { data: prog, error: progressError }] = await Promise.all([
          supabase.from("content_items").select("id, kind, title, position").order("position"),
          supabase.from("content_progress").select("item_id, percent"),
        ]);
        if (contentError || progressError) {
          setLoadError(contentError?.message ?? progressError?.message ?? "Could not load your learning progress.");
          setLoading(false);
          return;
        }
        setItems((rows as Item[]) ?? []);
        setProgress(Object.fromEntries((prog ?? []).map((p: { item_id: string; percent: number }) => [p.item_id, p.percent])));
        setAccess("yes");
      } else {
        const recent = purchases?.some((p: { status: string; created_at: string }) => p.status === "pending" && Date.now() - new Date(p.created_at).getTime() < 60 * 60 * 1000);
        setAccess(recent || session.user.user_metadata.access_requested === true ? "pending" : "no");
      }
      setLoading(false);
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
  const completedLessons = videos.filter((video) => (progress[video.id] ?? 0) >= 100).length;
  const activeLessons = videos.filter((video) => (progress[video.id] ?? 0) > 0 && (progress[video.id] ?? 0) < 100).length;
  const courseProgress = videos.length ? Math.round(videos.reduce((sum, video) => sum + (progress[video.id] ?? 0), 0) / videos.length) : 0;
  const nextLesson = videos.find((video) => (progress[video.id] ?? 0) > 0 && (progress[video.id] ?? 0) < 100)
    ?? videos.find((video) => (progress[video.id] ?? 0) < 100);

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
              {loadError && (
                <div role="alert" className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 text-sm text-rose-300">
                  {L("We couldn't load your dashboard:", "Ba a iya loda dakin karatunka ba:")} {loadError}
                </div>
              )}

              {access === "pending" && (
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 space-y-3">
                  <h2 className="text-lg font-bold text-white">
                    {user?.user_metadata?.access_requested === true
                      ? L("Your access request is being reviewed", "Ana duba buƙatarka ta samun dama")
                      : L("We are confirming your payment", "Muna tabbatar da biyan ka")}
                  </h2>
                  <p className="text-sm text-slate-400 font-medium">
                    {user?.user_metadata?.access_requested === true
                      ? L("We’ll grant course and book access after approving your request. Please verify your signup email if you haven’t already.", "Za mu buɗe darussa da littattafai bayan mun amince da buƙatarka. Tabbatar da imel ɗinka idan ba ka riga ka yi ba.")
                      : L("This usually takes under a minute. Refresh this page in a moment.", "Yawanci bai wuce minti ɗaya ba. Sake buɗe wannan shafi.")}
                  </p>
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
                  <section className="rounded-3xl border border-emerald-500/15 bg-gradient-to-br from-emerald-500/10 via-slate-900/80 to-slate-900/60 p-6 sm:p-8">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">{L("Your learning journey", "Tafiyar koyonka")}</p>
                        <h2 className="mt-2 text-xl font-black tracking-tight text-white sm:text-2xl">{L("Keep building momentum", "Ci gaba da samun nasara")}</h2>
                        <p className="mt-2 text-sm text-slate-400">{L(`${completedLessons} of ${videos.length} video lessons completed`, `An kammala darussa ${completedLessons} cikin ${videos.length}`)}</p>
                      </div>
                      {nextLesson && (
                        <Link href={`/dashboard/courses/${nextLesson.id}`} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-400">
                          <Play className="h-4 w-4" />{(progress[nextLesson.id] ?? 0) > 0 ? L("Continue lesson", "Ci gaba da darasi") : L("Start learning", "Fara koyo")}
                        </Link>
                      )}
                    </div>
                    <div className="mt-6">
                      <div className="mb-2 flex justify-between text-xs font-semibold text-slate-400">
                        <span>{L("Course progress", "Ci gaban darasi")}</span><span>{courseProgress}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-950/80">
                        <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-300 transition-[width]" style={{ width: `${courseProgress}%` }} />
                      </div>
                    </div>
                  </section>
                  <div>
                    <h2 className="text-lg font-bold text-white mb-4">{L("My Books", "Littattafaina")}</h2>
                    {books.length ? <div className="grid gap-4">{books.map((b) => <Row key={b.id} item={b} />)}</div> : (
                      <p className="rounded-2xl border border-dashed border-white/10 p-5 text-sm text-slate-500">{L("Your books will appear here.", "Littattafanka za su bayyana a nan.")}</p>
                    )}
                  </div>
                  <div>
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h2 className="text-lg font-bold text-white">{L("My Video Courses", "Bidiyoyin Koyarwa")}</h2>
                      <span className="text-xs font-semibold text-slate-500">{videos.length} {L("lessons", "darussa")}</span>
                    </div>
                    {videos.length ? <div className="grid gap-4">{videos.map((v) => <Row key={v.id} item={v} />)}</div> : (
                      <p className="rounded-2xl border border-dashed border-white/10 p-5 text-sm text-slate-500">{L("Your video lessons will appear here.", "Darussan bidiyoyinka za su bayyana a nan.")}</p>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400"><GraduationCap className="h-5 w-5" /></span>
                  <div>
                    <h2 className="font-bold text-white">{L("Learning snapshot", "Takaitaccen koyo")}</h2>
                    <p className="text-xs text-slate-500">{L("A quick look at your progress", "Duba ci gabanka cikin sauri")}</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-950/70 p-4">
                    <BookOpen className="h-4 w-4 text-sky-400" />
                    <p className="mt-3 text-2xl font-black text-white">{videos.length}</p>
                    <p className="text-[11px] font-medium text-slate-500">{L("Total lessons", "Jimillar darussa")}</p>
                  </div>
                  <div className="rounded-xl bg-slate-950/70 p-4">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <p className="mt-3 text-2xl font-black text-white">{completedLessons}</p>
                    <p className="text-[11px] font-medium text-slate-500">{L("Completed", "An kammala")}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/5 p-3 text-xs text-slate-400">
                  <Clock3 className="h-4 w-4 shrink-0 text-amber-400" />
                  {activeLessons} {L("lessons in progress", "darussa ana yi")}
                </div>
                {!nextLesson && videos.length > 0 && (
                  <p className="mt-4 rounded-xl bg-emerald-500/5 p-3 text-xs font-semibold text-emerald-300">{L("You've completed every video lesson. Great work!", "Ka kammala duk darussan bidiyo. Madalla!")}</p>
                )}
              </div>
              <a href="https://wa.me/2349076776905" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-900/40 p-5 text-sm font-semibold text-slate-300 transition hover:border-emerald-500/20 hover:text-white">
                {L("Need help with your course?", "Kana buƙatar taimako da darasinka?")} <ArrowRight className="h-4 w-4 text-emerald-400" />
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}