"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowDown, ArrowUp, BookOpen, Check, CircleHelp, FilePlus2, FileText, Link2, LoaderCircle, Plus, Save, Trash2, Upload, Users, X } from "lucide-react";

type PendingUser = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  status: "pending" | "approved" | "declined";
};

type Book = { id: string; title: string; position: number };
type Material = { title: string; url: string; type: string };
type Question = { question: string; options: string[]; answer: number; explanation: string };
type Lesson = {
  id: string;
  title: string;
  position: number;
  video_url: string | null;
  summary: string | null;
  materials: Material[];
  quiz: Question[];
};
type LessonDraft = Omit<Lesson, "id" | "video_url" | "summary"> & {
  video_url: string;
  summary: string;
};

const emptyDraft = (): LessonDraft => ({
  title: "",
  position: 1,
  video_url: "",
  summary: "",
  materials: [],
  quiz: [],
});

async function responseJson(response: Response) {
  const result = await response.json();
  if (!response.ok) throw new Error(result.error ?? "The request could not be completed.");
  return result;
}

export default function AdminPanel() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [users, setUsers] = useState<PendingUser[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [bookTitle, setBookTitle] = useState("");
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [uploadingBook, setUploadingBook] = useState(false);
  const [deletingBookId, setDeletingBookId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const [draft, setDraft] = useState<LessonDraft>(emptyDraft);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyUserId, setBusyUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tab, setTab] = useState<"users" | "books" | "lessons">("users");

  const loadAdminData = useCallback(async () => {
    setError(null);
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw new Error(sessionError.message);
    if (!session) {
      router.push("/login");
      return;
    }

    const headers = { Authorization: ["Bearer", session.access_token].join(" "), "Content-Type": "application/json" };
    const [userResponse, lessonResponse, bookResponse] = await Promise.all([
      fetch("/api/admin/users", { headers }),
      fetch("/api/admin/lessons", { headers }),
      fetch("/api/admin/books", { headers }),
    ]);

    if (userResponse.status === 403 || lessonResponse.status === 403 || bookResponse.status === 403) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    const [userData, lessonData, bookData] = await Promise.all([
      responseJson(userResponse),
      responseJson(lessonResponse),
      responseJson(bookResponse),
    ]);
    setUsers(userData.users);
    setLessons(lessonData.lessons);
    setBooks(bookData.books);
    setIsAdmin(true);
    setLoading(false);
  }, [router, supabase]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadAdminData().catch((loadError: unknown) => {
        setError(loadError instanceof Error ? loadError.message : "Could not load admin data.");
        setLoading(false);
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [loadAdminData]);

  const chooseLesson = (lesson: Lesson) => {
    setSelectedId(lesson.id);
    setDraft({
      title: lesson.title,
      position: lesson.position,
      video_url: lesson.video_url ?? "",
      summary: lesson.summary ?? "",
      materials: Array.isArray(lesson.materials) ? lesson.materials : [],
      quiz: Array.isArray(lesson.quiz) ? lesson.quiz : [],
    });
    setError(null);
    setNotice(null);
  };

  const startNewLesson = () => {
    setSelectedId("");
    setDraft({ ...emptyDraft(), position: lessons.length + 1 });
    setError(null);
    setNotice(null);
  };

  const updateAccess = async (userId: string, action: "approve" | "decline") => {
    setBusyUserId(userId);
    setError(null);
    setNotice(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Sign in again to continue.");
      await responseJson(await fetch("/api/admin/users", {
        method: "POST",
        headers: { Authorization: ["Bearer", session.access_token].join(" "), "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      }));
      setNotice(action === "approve" ? "Access approved. The student can now open the dashboard." : "Signup declined. The account remains locked.");
      await loadAdminData();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not update access.");
    } finally {
      setBusyUserId(null);
    }
  };

  const uploadBook = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!bookFile) {
      setError("Choose a PDF file to upload.");
      return;
    }
    if (bookFile.type !== "application/pdf" || bookFile.size > 100 * 1024 * 1024) {
      setError("Choose a PDF file smaller than 100 MB.");
      return;
    }

    setUploadingBook(true);
    setError(null);
    setNotice(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Sign in again to continue.");
    const headers = { Authorization: ["Bearer", session.access_token].join(" "), "Content-Type": "application/json" };
      const upload = await responseJson(await fetch("/api/admin/books", {
        method: "POST",
        headers,
        body: JSON.stringify({ action: "prepare-upload" }),
      }));
      const { error: uploadError } = await supabase.storage.from("books")
        .uploadToSignedUrl(upload.path, upload.token, bookFile, { contentType: "application/pdf", upsert: false });
      if (uploadError) throw new Error(uploadError.message);

      await responseJson(await fetch("/api/admin/books", {
        method: "POST",
        headers,
        body: JSON.stringify({
          title: bookTitle,
          position: books.length + 1,
          file_path: upload.path,
        }),
      }));
      setNotice("Book uploaded to the private library.");
      setBookTitle("");
      setBookFile(null);
      await loadAdminData();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Could not upload this book.");
    } finally {
      setUploadingBook(false);
    }
  };

  const deleteBook = async (book: Book) => {
    setDeletingBookId(book.id);
    setError(null);
    setNotice(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Sign in again to continue.");
      await responseJson(await fetch("/api/admin/books", {
        method: "DELETE",
        headers: { Authorization: ["Bearer", session.access_token].join(" "), "Content-Type": "application/json" },
        body: JSON.stringify({ id: book.id }),
      }));
      setNotice(book.title + " was removed from the library.");
      await loadAdminData();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Could not delete this book.");
    } finally {
      setDeletingBookId(null);
    }
  };

  const saveLesson = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Sign in again to continue.");
      const payload = {
        ...draft,
        id: selectedId || undefined,
        video_url: draft.video_url.trim(),
        summary: draft.summary.trim(),
        materials: draft.materials.filter((material) => material.title.trim() && material.url.trim()),
        quiz: draft.quiz.filter((question) => question.question.trim()),
      };
      const result = await responseJson(await fetch("/api/admin/lessons", {
        method: "POST",
        headers: { Authorization: ["Bearer", session.access_token].join(" "), "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }));
      setNotice(selectedId ? "Lesson updated." : "Lesson created.");
      await loadAdminData();
      const updatedLesson = lessons.find((lesson) => lesson.id === result.id);
      if (updatedLesson) chooseLesson(updatedLesson);
      else setSelectedId(result.id);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save this lesson.");
    } finally {
      setSaving(false);
    }
  };

  const moveQuestion = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= draft.quiz.length) return;
    setDraft((current) => {
      const quiz = [...current.quiz];
      [quiz[index], quiz[nextIndex]] = [quiz[nextIndex], quiz[index]];
      return { ...current, quiz };
    });
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm font-semibold text-emerald-400"><LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> Loading admin workspace...</div>;
  }

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-slate-100">
        <div className="max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 text-center">
          <Users className="mx-auto h-8 w-8 text-rose-400" />
          <h1 className="mt-4 text-xl font-black text-white">Admin access only</h1>
          <p className="mt-2 text-sm text-slate-400">This account is not on the administrator allowlist.</p>
          <a href="/dashboard" className="mt-6 inline-flex rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-bold text-white">Return to dashboard</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <a href="/dashboard" className="text-xs font-bold text-emerald-400 hover:text-emerald-300">← Student dashboard</a>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-white">Admin workspace</h1>
            <p className="mt-1 text-sm text-slate-400">Approve access requests and manage course lessons.</p>
          </div>
          <div className="flex rounded-xl border border-white/10 bg-slate-900 p-1">
            <button type="button" onClick={() => setTab("users")} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold ${tab === "users" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"}`}>
              <Users className="h-4 w-4" /> Signups <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs">{users.filter((user) => user.status === "pending").length}</span>
            </button>
            <button type="button" onClick={() => setTab("books")} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold ${tab === "books" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"}`}>
              <BookOpen className="h-4 w-4" /> Books
            </button>
            <button type="button" onClick={() => setTab("lessons")} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold ${tab === "lessons" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"}`}>
              <BookOpen className="h-4 w-4" /> Course lessons
            </button>
          </div>
        </header>

        {error && <p role="alert" className="mb-5 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-sm text-rose-300">{error}</p>}
        {notice && <p role="status" className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-300">{notice}</p>}

        {tab === "users" ? (
          <section className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-white">Signup approvals</h2>
                <p className="mt-1 text-sm text-slate-400">Review every signup. Approving grants access; declining keeps the account locked.</p>
              </div>
              <button type="button" onClick={() => loadAdminData().catch((refreshError: unknown) => setError(refreshError instanceof Error ? refreshError.message : "Could not refresh."))} className="rounded-xl border border-white/10 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-white/5">Refresh queue</button>
            </div>
            {users.length ? (
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
                <div className="hidden grid-cols-[1fr_1fr_120px_120px_230px] gap-4 border-b border-white/5 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:grid">
                  <span>Name</span><span>Email</span><span>Signup date</span><span>Status</span><span>Action</span>
                </div>
                {users.map((user) => (
                  <div key={user.id} className="grid gap-3 border-b border-white/5 p-5 last:border-0 sm:grid-cols-[1fr_1fr_120px_120px_230px] sm:items-center sm:gap-4">
                    <p className="font-bold text-white">{user.name || "New student"}</p>
                    <p className="break-all text-sm text-slate-300">{user.email}</p>
                    <p className="text-xs text-slate-500">{new Date(user.createdAt).toLocaleDateString()}</p>
                    <span className={`text-xs font-bold ${user.status === "approved" ? "text-emerald-400" : user.status === "declined" ? "text-rose-300" : "text-amber-300"}`}>
                      {user.status === "approved" ? "Approved" : user.status === "declined" ? "Declined" : "Pending"}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {user.status !== "approved" && (
                        <button type="button" disabled={busyUserId === user.id} onClick={() => { void updateAccess(user.id, "approve"); }} className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-2.5 text-xs font-black text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50">
                          {busyUserId === user.id ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                          {user.status === "declined" ? "Restore access" : "Approve"}
                        </button>
                      )}
                      {user.status !== "declined" && (
                        <button type="button" disabled={busyUserId === user.id} onClick={() => { void updateAccess(user.id, "decline"); }} className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-500/20 px-3 py-2.5 text-xs font-bold text-rose-300 transition hover:bg-rose-500/10 disabled:opacity-50">
                          <X className="h-4 w-4" />{user.status === "approved" ? "Revoke" : "Decline"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/30 p-10 text-center"><Check className="mx-auto h-8 w-8 text-emerald-400" /><p className="mt-3 font-bold text-white">No signups yet</p><p className="mt-1 text-sm text-slate-500">New account requests will appear here.</p></div>}
          </section>
        ) : tab === "books" ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)]">
            <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-7">
              <h2 className="text-xl font-black text-white">Private book library</h2>
              <p className="mt-1 text-sm text-slate-400">Upload PDFs to the private storage bucket. Students with access can read them from their dashboard.</p>
              <div className="mt-5 space-y-3">
                {books.map((book) => (
                  <div key={book.id} className="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-950/60 p-4">
                    <FileText className="h-5 w-5 shrink-0 text-emerald-400" />
                    <span className="min-w-0 flex-1 truncate text-sm font-bold text-white">{book.title}</span>
                    <button type="button" disabled={deletingBookId === book.id} onClick={() => { void deleteBook(book); }} className="rounded-lg p-2 text-rose-300 hover:bg-rose-500/10 disabled:opacity-50" aria-label={`Delete ${book.title}`}>
                      {deletingBookId === book.id ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    </button>
                  </div>
                ))}
                {!books.length && <p className="rounded-xl border border-dashed border-white/10 p-6 text-center text-sm text-slate-500">No books uploaded yet.</p>}
              </div>
            </section>
            <form onSubmit={uploadBook} className="space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Add a book</p>
                <h2 className="mt-1 text-xl font-black text-white">Upload PDF</h2>
              </div>
              <label className="block space-y-2 text-xs font-bold text-slate-300">Book title
                <input required maxLength={200} value={bookTitle} onChange={(event) => setBookTitle(event.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm font-medium text-white outline-none focus:border-emerald-500" placeholder="e.g. Stop Waiting. Start Building." />
              </label>
              <label className="block space-y-2 text-xs font-bold text-slate-300">PDF file (up to 100 MB)
                <input required type="file" accept="application/pdf,.pdf" onChange={(event) => setBookFile(event.target.files?.[0] ?? null)} className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-3 file:py-2 file:text-xs file:font-bold file:text-slate-950" />
              </label>
              <button type="submit" disabled={uploadingBook} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-slate-950 hover:bg-emerald-400 disabled:opacity-50">
                {uploadingBook ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {uploadingBook ? "Uploading..." : "Upload book"}
              </button>
            </form>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="font-bold text-white">Video lessons</h2>
                <button type="button" onClick={startNewLesson} className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-2.5 py-2 text-[11px] font-black text-slate-950"><Plus className="h-3.5 w-3.5" /> Add</button>
              </div>
              <div className="space-y-1">
                {lessons.map((lesson) => (
                  <button key={lesson.id} type="button" onClick={() => chooseLesson(lesson)} className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${selectedId === lesson.id ? "bg-emerald-500/10 ring-1 ring-emerald-500/20" : "hover:bg-white/5"}`}>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-400">{lesson.position}</span>
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-200">{lesson.title}</span>
                    {lesson.video_url && <Link2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />}
                  </button>
                ))}
                {!lessons.length && <p className="p-3 text-xs leading-5 text-slate-500">No lessons yet. Add the first lesson to start building the course.</p>}
              </div>
            </aside>

            <form onSubmit={saveLesson} className="space-y-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">{selectedId ? "Edit course lesson" : "New course lesson"}</p>
                  <h2 className="mt-1 text-xl font-black text-white">{draft.title || "Lesson details"}</h2>
                </div>
                <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-slate-950 hover:bg-emerald-400 disabled:opacity-50">
                  {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {selectedId ? "Save changes" : "Create lesson"}
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
                <label className="space-y-2 text-xs font-bold text-slate-300">Lesson title
                  <input required maxLength={200} value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm font-medium text-white outline-none focus:border-emerald-500" placeholder="e.g. Finding your first digital product idea" />
                </label>
                <label className="space-y-2 text-xs font-bold text-slate-300">Order
                  <input required type="number" min={0} step={1} value={draft.position} onChange={(event) => setDraft({ ...draft, position: Number(event.target.value) })} className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm font-medium text-white outline-none focus:border-emerald-500" />
                </label>
              </div>

              <label className="block space-y-2 text-xs font-bold text-slate-300">Unlisted YouTube URL
                <input type="url" value={draft.video_url ?? ""} onChange={(event) => setDraft({ ...draft, video_url: event.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm font-medium text-white outline-none focus:border-emerald-500" placeholder="https://youtu.be/..." />
                <span className="block font-normal text-slate-500">Use an unlisted link. Students with approved access can view it in the course player.</span>
              </label>

              <label className="block space-y-2 text-xs font-bold text-slate-300">Lesson summary
                <textarea rows={5} maxLength={20000} value={draft.summary ?? ""} onChange={(event) => setDraft({ ...draft, summary: event.target.value })} className="w-full resize-y rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm font-medium leading-6 text-white outline-none focus:border-emerald-500" placeholder="Key ideas and takeaways shown after the video ends..." />
              </label>

              <section className="space-y-3 rounded-xl border border-white/5 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-sky-400" /><h3 className="text-sm font-bold text-white">Materials</h3></div>
                  <button type="button" onClick={() => setDraft({ ...draft, materials: [...draft.materials, { title: "", url: "", type: "Resource" }] })} className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-slate-300 hover:bg-white/5"><FilePlus2 className="h-3.5 w-3.5" /> Add material</button>
                </div>
                {draft.materials.map((material, index) => (
                  <div key={index} className="grid gap-2 rounded-xl border border-white/5 p-3 sm:grid-cols-[1fr_1.5fr_120px_36px]">
                    <input aria-label="Material title" value={material.title} onChange={(event) => setDraft({ ...draft, materials: draft.materials.map((entry, i) => i === index ? { ...entry, title: event.target.value } : entry) })} className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2.5 text-xs text-white outline-none focus:border-emerald-500" placeholder="Title" />
                    <input aria-label="Material URL" type="url" value={material.url} onChange={(event) => setDraft({ ...draft, materials: draft.materials.map((entry, i) => i === index ? { ...entry, url: event.target.value } : entry) })} className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2.5 text-xs text-white outline-none focus:border-emerald-500" placeholder="https://..." />
                    <input aria-label="Material type" value={material.type} onChange={(event) => setDraft({ ...draft, materials: draft.materials.map((entry, i) => i === index ? { ...entry, type: event.target.value } : entry) })} className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2.5 text-xs text-white outline-none focus:border-emerald-500" placeholder="PDF, worksheet..." />
                    <button type="button" aria-label="Remove material" onClick={() => setDraft({ ...draft, materials: draft.materials.filter((_, i) => i !== index) })} className="flex items-center justify-center rounded-lg text-slate-500 hover:bg-rose-500/10 hover:text-rose-400"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
                {!draft.materials.length && <p className="text-xs text-slate-500">No materials added. Attach a worksheet, PDF, or helpful link.</p>}
              </section>

              <section className="space-y-4 rounded-xl border border-white/5 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2"><CircleHelp className="h-4 w-4 text-violet-300" /><h3 className="text-sm font-bold text-white">Optional quiz</h3></div>
                  <button type="button" onClick={() => setDraft({ ...draft, quiz: [...draft.quiz, { question: "", options: ["", ""], answer: 0, explanation: "" }] })} className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-slate-300 hover:bg-white/5"><Plus className="h-3.5 w-3.5" /> Add question</button>
                </div>
                {draft.quiz.map((question, index) => (
                  <div key={index} className="space-y-3 rounded-xl border border-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Question {index + 1}</p>
                      <div className="flex items-center gap-1">
                        <button type="button" aria-label="Move question up" disabled={index === 0} onClick={() => moveQuestion(index, -1)} className="rounded p-1.5 text-slate-500 hover:bg-white/5 disabled:opacity-30"><ArrowUp className="h-3.5 w-3.5" /></button>
                        <button type="button" aria-label="Move question down" disabled={index === draft.quiz.length - 1} onClick={() => moveQuestion(index, 1)} className="rounded p-1.5 text-slate-500 hover:bg-white/5 disabled:opacity-30"><ArrowDown className="h-3.5 w-3.5" /></button>
                        <button type="button" aria-label="Remove question" onClick={() => setDraft({ ...draft, quiz: draft.quiz.filter((_, i) => i !== index) })} className="rounded p-1.5 text-slate-500 hover:bg-rose-500/10 hover:text-rose-400"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                    <input aria-label="Quiz question" value={question.question} onChange={(event) => setDraft({ ...draft, quiz: draft.quiz.map((entry, i) => i === index ? { ...entry, question: event.target.value } : entry) })} className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500" placeholder="Enter your question" />
                    <div className="grid gap-2 sm:grid-cols-2">
                      {question.options.map((option, optionIndex) => (
                        <label key={optionIndex} className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${question.answer === optionIndex ? "border-emerald-500/30 bg-emerald-500/5" : "border-white/5 bg-slate-900"}`}>
                          <input type="radio" name={`correct-${index}`} checked={question.answer === optionIndex} onChange={() => setDraft({ ...draft, quiz: draft.quiz.map((entry, i) => i === index ? { ...entry, answer: optionIndex } : entry) })} className="accent-emerald-500" title="Mark as correct answer" />
                          <input aria-label={`Answer option ${optionIndex + 1}`} value={option} onChange={(event) => setDraft({ ...draft, quiz: draft.quiz.map((entry, i) => i === index ? { ...entry, options: entry.options.map((value, j) => j === optionIndex ? event.target.value : value) } : entry) })} className="w-full bg-transparent py-1 text-xs text-white outline-none" placeholder={`Option ${optionIndex + 1}`} />
                          {question.answer === optionIndex && <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />}
                        </label>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <button type="button" onClick={() => setDraft({ ...draft, quiz: draft.quiz.map((entry, i) => i === index ? { ...entry, options: [...entry.options, ""] } : entry) })} className="text-xs font-bold text-emerald-400 hover:text-emerald-300">+ Add answer option</button>
                      {question.options.length > 2 && <button type="button" onClick={() => setDraft({ ...draft, quiz: draft.quiz.map((entry, i) => i === index ? { ...entry, options: entry.options.slice(0, -1), answer: Math.min(entry.answer, entry.options.length - 2) } : entry) })} className="text-xs font-semibold text-slate-500 hover:text-rose-400">Remove last option</button>}
                    </div>
                    <input aria-label="Answer explanation" value={question.explanation} onChange={(event) => setDraft({ ...draft, quiz: draft.quiz.map((entry, i) => i === index ? { ...entry, explanation: event.target.value } : entry) })} className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2.5 text-xs text-white outline-none focus:border-emerald-500" placeholder="Optional explanation shown after submitting" />
                  </div>
                ))}
                {!draft.quiz.length && <p className="text-xs text-slate-500">No quiz questions. Lessons can be completed without a quiz.</p>}
              </section>

              <div className="flex justify-end border-t border-white/5 pt-4">
                <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-slate-950 hover:bg-emerald-400 disabled:opacity-50">
                  {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {selectedId ? "Save lesson" : "Create lesson"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
