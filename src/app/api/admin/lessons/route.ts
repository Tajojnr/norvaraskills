import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin-server";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isYouTubeUrl(value: unknown): value is string {
  if (typeof value !== "string" || !value.trim()) return value === null || value === "";
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (!["youtube.com", "m.youtube.com", "youtu.be", "youtube-nocookie.com"].includes(host)) return false;
    const parts = url.pathname.split("/").filter(Boolean);
    const videoId = host === "youtu.be"
      ? parts[0]
      : url.searchParams.get("v") ?? (["embed", "shorts", "live"].includes(parts[0] ?? "") ? parts[1] : null);
    return Boolean(videoId && /^[\w-]{11}$/.test(videoId));
  } catch {
    return false;
  }
}

function isMaterials(value: unknown) {
  return Array.isArray(value) && value.every((material) => {
    if (!material || typeof material !== "object") return false;
    const entry = material as Record<string, unknown>;
    if (typeof entry.title !== "string" || typeof entry.url !== "string" || typeof entry.type !== "string") return false;
    try {
      const url = new URL(entry.url);
      return (url.protocol === "https:" || url.protocol === "http:") && entry.title.trim().length > 0;
    } catch {
      return false;
    }
  });
}

function isQuiz(value: unknown) {
  return Array.isArray(value) && value.every((question) => {
    if (!question || typeof question !== "object") return false;
    const entry = question as Record<string, unknown>;
    return typeof entry.question === "string"
      && entry.question.trim().length > 0
      && Array.isArray(entry.options)
      && entry.options.length >= 2
      && entry.options.every((option) => typeof option === "string" && option.trim().length > 0)
      && Number.isInteger(entry.answer)
      && Number(entry.answer) >= 0
      && Number(entry.answer) < entry.options.length
      && (entry.explanation === undefined || typeof entry.explanation === "string");
  });
}

export async function GET(req: NextRequest) {
  const result = await requireAdmin(req);
  if (!result.context) return result.response;

  const { data, error } = await result.context.client.from("content_items")
    .select("id, title, position, video_url, summary, materials, quiz")
    .eq("kind", "video")
    .order("position");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ lessons: data });
}

export async function POST(req: NextRequest) {
  const result = await requireAdmin(req);
  if (!result.context) return result.response;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : null;
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const position = Number(body.position);
  const videoUrl = body.video_url;
  const summary = body.summary;
  const materials = body.materials;
  const quiz = body.quiz;

  if ((id && !UUID_PATTERN.test(id)) || !title || title.length > 200 ||
      !Number.isInteger(position) || position < 0 ||
      !isYouTubeUrl(videoUrl) ||
      typeof summary !== "string" || summary.length > 20000 ||
      !isMaterials(materials) || !isQuiz(quiz)) {
    return NextResponse.json({ error: "Check the lesson title, position, YouTube link, summary, materials, and quiz." }, { status: 400 });
  }

  const { client } = result.context;
  const lesson = { title, position, video_url: videoUrl || null, summary, materials, quiz };
  const { data, error } = id
    ? await client.from("content_items").update(lesson).eq("id", id).eq("kind", "video").select("id").maybeSingle()
    : await client.from("content_items").insert({ ...lesson, kind: "video" }).select("id").single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Lesson not found." }, { status: 404 });
  return NextResponse.json({ success: true, id: data.id });
}
