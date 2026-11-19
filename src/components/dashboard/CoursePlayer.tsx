"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, CircleHelp, Download, FileText, LockKeyhole, Play, RotateCcw } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/LanguageContext";
import YouTubePlayer, { getYouTubeVideoId } from "./YouTubePlayer";

type Lesson = {
  id: string;
  title: string;
  position: number;
};

type Material = {
  title: string;
  url: string;
  type: string;
};

type Question = {
  question: string;
  options: string[];
  explanation?: string;
};

type QuizReview = {
  correct: boolean;
  correctAnswer: string;
  explanation: string;
};

type QuizAttempt = {
  score: number;
  total: number;
  created_at: string;
};

type CourseItem = Lesson & {
  kind: "video" | "audio";
  video_url: string | null;
  summary: string | null;
  materials: unknown;
  audio_path: string | null;
  image_path: string | null;
};

function parseMaterials(value: unknown): Material[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry): Material[] => {
    if (!entry || typeof entry !== "object") return [];
    const material = entry as Record<string, unknown>;
    if (typeof material.title !== "string" || typeof material.url !== "string") return [];
    try {
      const url = new URL(material.url);
      if (url.protocol !== "https:" && url.protocol !== "http:") return [];
      return [{
        title: material.title,
        url: url.toString(),
        type: typeof material.type === "string" ? material.type : "Resource",
      }];
    } catch {
      return [];
    }
  });
}

export default function CoursePlayer({ id }: { id: string }) {
  const { lang } = useLanguage();
  const L = (en: string, ha: string) => lang === "en" ? en : ha;
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [userId, setUserId] = useState<string | null>(null);
  const [item, setItem] = useState<CourseItem | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressByLesson, setProgressByLesson] = useState<Record<string, number>>({});
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const progressRef = useRef(0);
  const lastSavedProgress = useRef(0);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizLoadedFor, setQuizLoadedFor] = useState("");
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizSubmitting, setQuizSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizResult, setQuizResult] = useState<{ score: number; total: number; review: QuizReview[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playerError, setPlayerError] = useState(false);
  const [savingError, setSavingError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        if (active) {
          setError(sessionError.message);
          setLoading(false);
        }
        return;
      }
      if (!session) {
        router.push("/login");
        return;
      }

      const [{ data: current, error: itemError }, { data: lessonRows, error: lessonsError }, { data: progressRows, error: progressError }, { data: attempts, error: attemptsError }] = await Promise.all([
        supabase.from("content_items").select("id, kind, title, position, video_url, summary, materials, audio_path, image_path").eq("id", id).in("kind", ["video", "audio"]).maybeSingle(),
        supabase.from("content_items").select("id, kind, title, position").in("kind", ["video", "audio"]).order("position"),
        supabase.from("content_progress").select("item_id, percent"),
        supabase.from("content_quiz_attempts").select("score, total, created_at").eq("item_id", id).order("created_at", { ascending: false }).limit(1),
      ]);

      if (!active) return;
      const loadError = itemError ?? lessonsError ?? progressError ?? attemptsError;
      if (loadError) {
        setError(loadError.message);
        setLoading(false);
        return;
      }
      if (!current) {
        setError(lang === "en"
          ? "This lesson was not found or you do not have access to it."
          : "Ba a sami wannan darasi ba ko ba ka da izinin shiga.");
        setLoading(false);
        return;
      }

      const courseItem = current as CourseItem;
      let nextAudioUrl: string | null = null;
      let nextImageUrl: string | null = null;
      if (courseItem.kind === "audio") {
        if (!courseItem.audio_path) {
          setError(lang === "en" ? "This audio lesson has no recording yet." : "Wannan darasin sauti ba shi da rikodi tukuna.");
          setLoading(false);
          return;
        }
        const [{ data: audioFile, error: audioError }, imageResult] = await Promise.all([
          supabase.storage.from("audio-lessons").createSignedUrl(courseItem.audio_path, 86400),
          courseItem.image_path
            ? supabase.storage.from("audio-lessons").createSignedUrl(courseItem.image_path, 86400)
            : Promise.resolve({ data: null, error: null }),
        ]);
        if (audioError || imageResult.error) {
          setError(audioError?.message ?? imageResult.error?.message ?? (lang === "en" ? "Could not load this audio lesson." : "Ba a iya loda wannan darasin sauti ba."));
          setLoading(false);
          return;
        }
        nextAudioUrl = audioFile.signedUrl;
        nextImageUrl = imageResult.data?.signedUrl ?? null;
      }

      const progressMap = Object.fromEntries((progressRows ?? []).map((row: { item_id: string; percent: number }) => [row.item_id, row.percent]));
      const savedPercent = Math.max(0, Math.min(100, Number(progressMap[id] ?? 0)));
      progressRef.current = savedPercent;
      lastSavedProgress.current = savedPercent;
      setProgress(savedPercent);
      setProgressByLesson(progressMap);
      setUserId(session.user.id);
      setAccessToken(session.access_token);
      setItem(courseItem);
      setAudioUrl(nextAudioUrl);
      setImageUrl(nextImageUrl);
      setLessons((lessonRows ?? [])
        .filter((lesson: { kind: string }) => lesson.kind === courseItem.kind)
        .map((lesson: { id: string; title: string; position: number }) => ({
          id: lesson.id,
          title: lesson.title,
          position: lesson.position,
        })));
      setAttempt((attempts?.[0] as QuizAttempt | undefined) ?? null);
      setQuestions([]);
      setQuizLoadedFor("");
      setQuizResult(null);
      setAnswers({});
      setError(null);
      setPlayerError(false);
      setSavingError(null);
      setLoading(false);
    };

    load();
    return () => { active = false; };
  }, [id, lang, router, supabase]);

  const saveProgress = useCallback(async (percent: number) => {
    if (!userId) return;
    const next = Math.max(progressRef.current, Math.min(100, percent));
    const shouldSave = next === 100 || next - lastSavedProgress.current >= 5;
    if (!shouldSave) {
      if (next < 100) {
        progressRef.current = next;
        setProgress(next);
      }
      return;
    }

    const { error: saveError } = await supabase.from("content_progress").upsert(
      { user_id: userId, item_id: id, percent: next, updated_at: new Date().toISOString() },
      { onConflict: "user_id,item_id" },
    );
    if (saveError) {
      setSavingError(saveError.message);
      return;
    }
    progressRef.current = next;
    lastSavedProgress.current = next;
    setProgress(next);
    setSavingError(null);
  }, [id, supabase, userId]);

  const materials = useMemo(() => parseMaterials(item?.materials), [item?.materials]);
  const videoId = item?.video_url ? getYouTubeVideoId(item.video_url) : null;
  const completed = progress >= 100;
  const lessonIndex = lessons.findIndex((lesson) => lesson.id === id);
  const previous = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
  const next = lessonIndex >= 0 && lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;

  useEffect(() => {
    if (item?.kind !== "video" || !completed || !accessToken || quizLoadedFor === id) return;
    let active = true;
    const loadQuiz = async () => {
      await Promise.resolve();
      if (!active) return;
      setQuizLoading(true);
      try {
        const response = await fetch(`/api/course/quiz?lesson=${encodeURIComponent(id)}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error ?? "Could not load this quiz.");
        if (active) {
          setQuestions(data.questions as Question[]);
          setQuizLoadedFor(id);
        }
      } catch (loadError) {
        if (active) setError(loadError instanceof Error ? loadError.message : "Could not load this quiz.");
      } finally {
        if (active) setQuizLoading(false);
      }
    };
    void loadQuiz();
    return () => { active = false; };
  }, [accessToken, completed, id, item?.kind, quizLoadedFor]);

  const submitQuiz = async () => {
    if (!accessToken || !questions.length || Object.keys(answers).length !== questions.length) return;
    setQuizSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/course/quiz", {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: id, answers: questions.map((_, index) => answers[index]) }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Could not submit your quiz.");
      setQuizResult(result as { score: number; total: number; review: QuizReview[] });
      setAttempt({ score: result.score, total: result.total, created_at: new Date().toISOString() });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not submit your quiz.");
    } finally {
      setQuizSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-sm font-semibold text-emerald-400">{L("Loading your lesson...", "Ana lodin darasinka...")}</div>;
  }

  if (error && !item) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-20 text-slate-100">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-slate-900 p-8 text-center">
          <h1 className="text-xl font-bold text-white">{L("Unable to open this lesson", "Ba a iya buɗe wannan darasi ba")}</h1>
          <p className="mt-3 text-sm text-slate-400">{error}</p>
          <Link href="/dashboard" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950">
            <ArrowLeft className="h-4 w-4" /> {L("Back to dashboard", "Koma dakin karatu")}
          </Link>
        </div>
      </main>
    );
  }
  if (!item) return null;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> {L("My learning", "Dakin karatu")}
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300">
            {completed ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Play className="h-3.5 w-3.5 text-emerald-400" />}
            {completed ? L("Lesson complete", "An kammala darasi") : `${progress}% ${L("complete", "an kammala")}`}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-8">
            <section>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">{item.kind === "audio" ? L("Audio lesson", "Darasin sauti") : L("Video lesson", "Darasin bidiyo")}</p>
              <h1 className="mb-5 text-2xl font-black tracking-tight text-white sm:text-3xl">{item.title}</h1>
              {item.kind === "audio" ? (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                  {imageUrl && <Image src={imageUrl} alt="" width={1200} height={675} unoptimized className="max-h-[28rem] w-full object-cover" />}
                  <div className="p-5 sm:p-7">
                    <audio
                      controls
                      preload="metadata"
                      src={audioUrl ?? undefined}
                      className="w-full"
                      onLoadedMetadata={(event) => {
                        const audio = event.currentTarget;
                        if (audio.duration && progressRef.current > 0 && progressRef.current < 100) {
                          audio.currentTime = audio.duration * progressRef.current / 100;
                        }
                      }}
                      onTimeUpdate={(event) => {
                        const audio = event.currentTarget;
                        if (audio.duration) void saveProgress(Math.floor(audio.currentTime / audio.duration * 100));
                      }}
                      onEnded={() => { void saveProgress(100); }}
                      onError={() => setPlayerError(true)}
                    />
                  </div>
                </div>
              ) : videoId ? (
                <YouTubePlayer
                  videoId={videoId}
                  onProgress={(percent) => { void saveProgress(percent); }}
                  onEnded={() => { void saveProgress(100); }}
                  onError={() => setPlayerError(true)}
                />
              ) : (
                <div className="flex aspect-video flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-slate-900 px-6 text-center">
                  <Play className="mb-3 h-8 w-8 text-emerald-400" />
                  <h2 className="font-bold text-white">{L("Video coming soon", "Bidiyo yana zuwa")}</h2>
                  <p className="mt-2 max-w-md text-sm text-slate-400">
                    {item.video_url
                      ? L("This YouTube link could not be recognized. Add a standard YouTube, youtu.be, or Shorts URL.", "Ba a gane wannan hanyar YouTube ba. Saka hanyar YouTube, youtu.be, ko Shorts.")
                      : L("Add an unlisted YouTube link to this lesson in Supabase to make it available here.", "Saka hanyar bidiyon YouTube mara lissafi a wannan darasi cikin Supabase domin ya bayyana a nan.")}
                  </p>
                </div>
              )}
              {playerError && <p role="alert" className="mt-3 text-sm text-rose-400">{item.kind === "audio" ? L("The audio could not be loaded. Please try again later.", "Ba a iya kunna sautin ba. Sake gwadawa daga baya.") : L("The video could not be loaded. Check the link and try again.", "Ba a iya kunna bidiyon ba. Duba hanyar sannan ka sake gwadawa.")}</p>}
              {savingError && <p role="alert" className="mt-3 text-sm text-rose-400">{L("Progress could not be saved:", "Ba a iya adana ci gaba ba:")} {savingError}</p>}
              {completed && (
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                  <p className="text-emerald-100">{L("Nice work. Your progress is saved and the lesson summary is ready below.", "Madalla. An adana ci gabanka kuma taƙaitaccen darasin yana ƙasa.")}</p>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="rounded-xl bg-sky-500/10 p-2.5 text-sky-300"><BookOpen className="h-5 w-5" /></span>
                <div>
                  <h2 className="font-bold text-white">{L("Lesson materials", "Kayan darasi")}</h2>
                  <p className="text-xs text-slate-400">{item.kind === "audio" ? L("Helpful resources for this audio lesson", "Abubuwan taimako na wannan darasin sauti") : L("Helpful resources for this video", "Abubuwan taimako na wannan bidiyo")}</p>
                </div>
              </div>
              {materials.length ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {materials.map((material) => (
                    <a key={`${material.url}-${material.title}`} href={material.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-xl border border-white/5 bg-slate-950/60 p-4 transition hover:border-emerald-500/30 hover:bg-slate-950">
                      <FileText className="h-5 w-5 shrink-0 text-emerald-400" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-white">{material.title}</span>
                        <span className="text-xs text-slate-500">{material.type}</span>
                      </span>
                      <Download className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-emerald-400" />
                    </a>
                  ))}
                </div>
              ) : <p className="rounded-xl border border-dashed border-white/10 px-4 py-5 text-sm text-slate-500">{L("Lesson resources will appear here.", "Kayan darasin za su bayyana a nan.")}</p>}
            </section>

            {item.kind === "audio" ? (
              <section className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-slate-900/60 p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-300"><BookOpen className="h-5 w-5" /></span>
                  <div>
                    <h2 className="font-bold text-white">{L("Explanation & lesson notes", "Bayani da bayanan darasi")}</h2>
                    <p className="text-xs text-slate-400">{L("Review the key ideas for this audio lesson", "Duba muhimman abubuwan wannan darasin sauti")}</p>
                  </div>
                </div>
                <p className="whitespace-pre-line text-sm leading-7 text-slate-300">{item.summary || L("No extra notes for this lesson.", "Babu ƙarin bayani game da wannan darasi.")}</p>
              </section>
            ) : (
            <section className={`rounded-2xl border p-5 sm:p-6 ${completed ? "border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-slate-900/60" : "border-white/10 bg-slate-900/40"}`}>
              <div className="mb-4 flex items-center gap-3">
                <span className={`rounded-xl p-2.5 ${completed ? "bg-emerald-500/10 text-emerald-300" : "bg-slate-800 text-slate-500"}`}>
                  {completed ? <Check className="h-5 w-5" /> : <LockKeyhole className="h-5 w-5" />}
                </span>
                <div>
                  <h2 className="font-bold text-white">{L("Lesson summary", "Taƙaitaccen darasi")}</h2>
                  <p className="text-xs text-slate-400">{completed ? L("Review the key takeaways", "Duba muhimman abubuwan da aka koya") : L("Unlocks when the video ends", "Zai buɗe idan bidiyon ya ƙare")}</p>
                </div>
              </div>
              {completed ? (
                <p className="whitespace-pre-line text-sm leading-7 text-slate-300">{item.summary || L("A summary for this lesson will be added soon.", "Za a saka taƙaitaccen wannan darasi nan ba da jimawa ba.")}</p>
              ) : <p className="text-sm text-slate-500">{L("Finish watching the video to reveal the summary and optional quiz.", "Kammala kallon bidiyon domin buɗe taƙaitawa da tambayoyi na zaɓi.")}</p>}
            </section>
            )}

            {item.kind === "video" && <section className={`rounded-2xl border p-5 sm:p-6 ${completed ? "border-white/10 bg-slate-900/60" : "border-white/5 bg-slate-900/30 opacity-75"}`}>
              <div className="mb-5 flex items-center gap-3">
                <span className={`rounded-xl p-2.5 ${completed ? "bg-violet-500/10 text-violet-300" : "bg-slate-800 text-slate-500"}`}><CircleHelp className="h-5 w-5" /></span>
                <div>
                  <h2 className="font-bold text-white">{L("Quick knowledge check", "Ƙaramin gwajin fahimta")}</h2>
                  <p className="text-xs text-slate-400">{L("Optional quiz · does not affect lesson completion", "Tambayoyi na zaɓi · ba sa hana kammala darasi")}</p>
                </div>
              </div>
              {!completed ? (
                <p className="text-sm text-slate-500">{L("Complete the video to try the quiz.", "Kammala bidiyon kafin amsa tambayoyin.")}</p>
              ) : quizLoading ? (
                <p className="text-sm text-slate-500">{L("Loading quiz...", "Ana lodin tambayoyi...")}</p>
              ) : quizLoadedFor !== id ? (
                <button type="button" onClick={() => setQuizLoadedFor("retry")} className="text-sm font-semibold text-emerald-400 hover:text-emerald-300">
                  {L("Could not load the quiz. Try again.", "Ba a iya loda tambayoyin ba. Sake gwadawa.")}
                </button>
              ) : questions.length ? (
                <div className="space-y-6">
                  {questions.map((question, questionIndex) => (
                    <fieldset key={`${questionIndex}-${question.question}`} className="space-y-3">
                      <legend className="mb-3 text-sm font-semibold leading-relaxed text-white">{questionIndex + 1}. {question.question}</legend>
                      <div className="grid gap-2">
                        {question.options.map((option, optionIndex) => (
                          <label key={option} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${answers[questionIndex] === optionIndex ? "border-emerald-500/50 bg-emerald-500/10 text-white" : "border-white/5 bg-slate-950/50 text-slate-300 hover:border-white/15"}`}>
                            <input
                              type="radio"
                              name={`question-${questionIndex}`}
                              value={optionIndex}
                              checked={answers[questionIndex] === optionIndex}
                              onChange={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))}
                              className="accent-emerald-500"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ))}
                  {quizResult && (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-100">
                      {L("Your score:", "Sakamakonka:")} <strong>{quizResult.score}/{quizResult.total}</strong>
                      <div className="mt-3 space-y-2 text-slate-300">
                        {quizResult.review.map((review, index) => (
                          <p key={`${index}-explanation`}><strong>{index + 1}.</strong> {review.correct ? L("Correct.", "Daidai.") : `${L("Correct answer:", "Amsa daidai:")} ${review.correctAnswer}.`} {review.explanation}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  {attempt && !quizResult && <p className="text-xs text-slate-500">{L("Previous score:", "Sakamakon baya:")} {attempt.score}/{attempt.total}</p>}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      disabled={quizSubmitting || Object.keys(answers).length !== questions.length}
                      onClick={() => { void submitQuiz(); }}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Check className="h-4 w-4" /> {quizSubmitting ? L("Submitting...", "Ana aikawa...") : L("Submit answers", "Aika amsoshi")}
                    </button>
                    {quizResult && (
                      <button type="button" onClick={() => { setAnswers({}); setQuizResult(null); }} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-white/5">
                        <RotateCcw className="h-4 w-4" /> {L("Try again", "Sake gwadawa")}
                      </button>
                    )}
                  </div>
                </div>
              ) : <p className="rounded-xl border border-dashed border-white/10 px-4 py-5 text-sm text-slate-500">{L("The quiz for this lesson will be added soon.", "Za a saka tambayoyin wannan darasi nan ba da jimawa ba.")}</p>}
            </section>}

            {error && <p role="alert" className="text-sm text-rose-400">{error}</p>}

            <div className="flex flex-col justify-between gap-3 border-t border-white/5 pt-5 sm:flex-row">
              {previous ? (
                <Link href={`/dashboard/courses/${previous.id}`} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-white/5">
                  <ArrowLeft className="h-4 w-4" /><span className="max-w-52 truncate">{previous.title}</span>
                </Link>
              ) : <span />}
              {next && (
                <Link href={`/dashboard/courses/${next.id}`} className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400">
                  <span className="max-w-52 truncate">{next.title}</span><ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400">{L("Your course", "Darasinka")}</p>
                  <h2 className="mt-1 font-bold text-white">{L("Lessons", "Darussa")}</h2>
                </div>
                <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-bold text-slate-300">{lessonIndex + 1}/{lessons.length}</span>
              </div>
              <div className="max-h-[55vh] space-y-1 overflow-y-auto">
                {lessons.map((lesson, index) => {
                  const isCurrent = lesson.id === id;
                  const isComplete = (isCurrent ? progress : progressByLesson[lesson.id] ?? 0) >= 100;
                  return (
                    <Link key={lesson.id} href={`/dashboard/courses/${lesson.id}`} className={`flex items-start gap-3 rounded-xl p-3 transition ${isCurrent ? "bg-emerald-500/10 ring-1 ring-emerald-500/20" : "hover:bg-white/5"}`}>
                      <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${isCurrent ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"}`}>
                        {isComplete ? <Check className="h-3.5 w-3.5" /> : index + 1}
                      </span>
                      <span className={`text-xs font-semibold leading-5 ${isCurrent ? "text-white" : "text-slate-400"}`}>{lesson.title}</span>
                    </Link>
                  );
                })}
              </div>
              <Link href="/dashboard" className="mt-4 block border-t border-white/5 pt-4 text-center text-xs font-bold text-emerald-400 hover:text-emerald-300">
                {L("Back to all learning", "Koma dukkan darussa")}
              </Link>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{L("Lesson progress", "Ci gaban darasi")}</p>
              <div className="mt-3 flex items-end justify-between">
                <span className="text-3xl font-black text-white">{progress}%</span>
                <span className="pb-1 text-xs text-slate-500">{completed ? L("Completed", "An kammala") : L("Keep going", "Ci gaba")}</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-300 transition-[width]" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
