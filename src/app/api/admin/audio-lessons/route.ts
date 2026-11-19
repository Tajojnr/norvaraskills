import { NextRequest, NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/supabase/admin-server";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const AUDIO_TYPES: Record<string, string> = {
  "audio/mpeg": "mp3",
  "audio/mp4": "m4a",
  "audio/aac": "aac",
  "audio/ogg": "ogg",
  "audio/wav": "wav",
  "audio/webm": "webm",
};
const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const AUDIO_PATH_PATTERN = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}\.(mp3|m4a|aac|ogg|wav|webm)$/i;
const IMAGE_PATH_PATTERN = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}\.(jpg|png|webp)$/i;

async function uploadedFileExists(
  client: SupabaseClient,
  path: string,
  maxSize: number,
  allowedMimeTypes: string[],
) {
  const { data, error } = await client.storage.from("audio-lessons").list("", { search: path, limit: 100 });
  if (error) return { error: error.message };
  const file = data?.find((entry) => entry.name === path);
  if (!file) return { error: "The uploaded file could not be found." };
  const size = Number(file.metadata?.size ?? file.metadata?.contentLength);
  if (!Number.isFinite(size) || size > maxSize) return { error: "The uploaded file is missing size information or exceeds the size limit." };
  const mimeType = file.metadata?.mimetype;
  if (typeof mimeType === "string" && !allowedMimeTypes.includes(mimeType)) {
    return { error: "The uploaded file type does not match the selected file." };
  }
  return { error: null };
}

export async function GET(req: NextRequest) {
  const result = await requireAdmin(req);
  if (!result.context) return result.response;

  const { data, error } = await result.context.client.from("content_items")
    .select("id, title, position, summary, audio_path, image_path")
    .eq("kind", "audio")
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

  const { client } = result.context;
  if (body.action === "prepare-upload") {
    const type = typeof body.file_type === "string" ? body.file_type : "";
    const mimeType = typeof body.mime_type === "string" ? body.mime_type : "";
    const extension = (type === "audio" ? AUDIO_TYPES : type === "image" ? IMAGE_TYPES : {})[mimeType];
    if (!extension) return NextResponse.json({ error: "Unsupported audio or image format." }, { status: 400 });

    const path = `${crypto.randomUUID()}.${extension}`;
    const { data, error } = await client.storage.from("audio-lessons").createSignedUploadUrl(path);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ path, token: data.token });
  }

  const id = typeof body.id === "string" ? body.id : null;
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const position = Number(body.position);
  const summary = typeof body.summary === "string" ? body.summary.trim() : "";
  const audioPath = typeof body.audio_path === "string" && body.audio_path ? body.audio_path : null;
  const imagePath = typeof body.image_path === "string" && body.image_path ? body.image_path : null;
  if ((id && !UUID_PATTERN.test(id)) || !title || title.length > 200 ||
      !Number.isInteger(position) || position < 1 || summary.length > 20000 ||
      (audioPath && !AUDIO_PATH_PATTERN.test(audioPath)) ||
      (imagePath && !IMAGE_PATH_PATTERN.test(imagePath))) {
    return NextResponse.json({ error: "Check the lesson title, number, audio file, image, and explanation." }, { status: 400 });
  }

  let current: { audio_path: string | null; image_path: string | null } | null = null;
  if (id) {
    const { data, error } = await client.from("content_items").select("audio_path, image_path")
      .eq("id", id).eq("kind", "audio").maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ error: "Audio lesson not found." }, { status: 404 });
    current = data;
  }

  const finalAudioPath = audioPath ?? current?.audio_path;
  const finalImagePath = imagePath ?? current?.image_path ?? null;
  if (!finalAudioPath) return NextResponse.json({ error: "Choose an audio file for this lesson." }, { status: 400 });

  const audioCheck = await uploadedFileExists(client, finalAudioPath, 100 * 1024 * 1024, Object.keys(AUDIO_TYPES));
  if (audioCheck.error) return NextResponse.json({ error: audioCheck.error }, { status: 400 });
  if (imagePath) {
    const imageCheck = await uploadedFileExists(client, imagePath, 10 * 1024 * 1024, Object.keys(IMAGE_TYPES));
    if (imageCheck.error) return NextResponse.json({ error: imageCheck.error }, { status: 400 });
  }

  const lesson = { title, position, summary, audio_path: finalAudioPath, image_path: finalImagePath };
  const { data, error } = id
    ? await client.from("content_items").update(lesson).eq("id", id).eq("kind", "audio").select("id").maybeSingle()
    : await client.from("content_items").insert({ ...lesson, kind: "audio" }).select("id").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Audio lesson not found." }, { status: 404 });

  const replacedPaths = [
    current?.audio_path && current.audio_path !== finalAudioPath ? current.audio_path : null,
    current?.image_path && current.image_path !== finalImagePath ? current.image_path : null,
  ].filter((path): path is string => Boolean(path));
  let warning: string | null = null;
  if (replacedPaths.length) {
    const { error: cleanupError } = await client.storage.from("audio-lessons").remove(replacedPaths);
    if (cleanupError) warning = `Lesson saved, but previous files could not be removed: ${cleanupError.message}`;
  }
  return NextResponse.json({ success: true, id: data.id, warning });
}

export async function DELETE(req: NextRequest) {
  const result = await requireAdmin(req);
  if (!result.context) return result.response;

  let body: { id?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (typeof body.id !== "string" || !UUID_PATTERN.test(body.id)) {
    return NextResponse.json({ error: "Invalid audio lesson ID." }, { status: 400 });
  }

  const { client } = result.context;
  const { data: lesson, error: lookupError } = await client.from("content_items")
    .select("audio_path, image_path").eq("id", body.id).eq("kind", "audio").maybeSingle();
  if (lookupError) return NextResponse.json({ error: lookupError.message }, { status: 500 });
  if (!lesson) return NextResponse.json({ error: "Audio lesson not found." }, { status: 404 });

  const paths = [lesson.audio_path, lesson.image_path].filter((path): path is string => Boolean(path));
  if (paths.length) {
    const { error } = await client.storage.from("audio-lessons").remove(paths);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const { error } = await client.from("content_items").delete().eq("id", body.id).eq("kind", "audio");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
