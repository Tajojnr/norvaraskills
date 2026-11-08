"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, LoaderCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function EbookReaderPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [bookId, setBookId] = useState("");
  const [readerUrl, setReaderUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let objectUrl: string | null = null;

    params.then(({ id }) => {
      if (active) setBookId(id);
    });

    const loadBook = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw new Error(sessionError.message);
      if (!session) {
        router.replace("/login");
        return;
      }

      const response = await fetch(`/api/books/${encodeURIComponent(bookId)}`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
        cache: "no-store",
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(result?.error ?? "Could not open this book.");
      }

      objectUrl = URL.createObjectURL(await response.blob());
      if (active) setReaderUrl(objectUrl);
      else URL.revokeObjectURL(objectUrl);
    };

    if (bookId) {
      loadBook()
        .catch((loadError: unknown) => {
          if (active) setError(loadError instanceof Error ? loadError.message : "Could not open this book.");
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [bookId, params, router, supabase]);

  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300">
          <BookOpen className="h-4 w-4" /> Private reader
        </div>
      </header>
      <section className="flex flex-1 flex-col p-3 sm:p-6">
        {loading ? (
          <div className="flex flex-1 items-center justify-center text-sm font-semibold text-emerald-300">
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> Opening your book...
          </div>
        ) : error ? (
          <div role="alert" className="m-auto max-w-lg rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 text-center text-sm text-rose-200">{error}</div>
        ) : readerUrl ? (
          <iframe
            title="Book reader"
            src={`${readerUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            className="min-h-[75vh] flex-1 rounded-xl border border-white/10 bg-white sm:min-h-[85vh]"
            onContextMenu={(event) => event.preventDefault()}
          />
        ) : (
          <div className="m-auto text-sm text-slate-400">This book is not available.</div>
        )}
      </section>
    </main>
  );
}
