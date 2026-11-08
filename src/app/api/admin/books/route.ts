import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin-server";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(req: NextRequest) {
  const result = await requireAdmin(req);
  if (!result.context) return result.response;

  const { data, error } = await result.context.client
    .from("content_items")
    .select("id, title, position")
    .eq("kind", "book")
    .order("position");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ books: data });
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
    const path = `${crypto.randomUUID()}.pdf`;
    const { data, error } = await client.storage.from("books").createSignedUploadUrl(path);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ path, token: data.token });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const filePath = typeof body.file_path === "string" ? body.file_path : "";
  const position = Number(body.position);
  if (!title || title.length > 200 || !Number.isInteger(position) || position < 0 ||
      !UUID_PATTERN.test(filePath.replace(/\.pdf$/i, "")) || !filePath.toLowerCase().endsWith(".pdf")) {
    return NextResponse.json({ error: "Check the book title, order, and uploaded PDF." }, { status: 400 });
  }

  const { data: file, error: fileError } = await client.storage.from("books").download(filePath);
  if (fileError || !file) {
    return NextResponse.json({ error: fileError?.message ?? "The uploaded PDF could not be found." }, { status: 400 });
  }
  const header = new Uint8Array(await file.slice(0, 5).arrayBuffer());
  if (new TextDecoder().decode(header) !== "%PDF-") {
    return NextResponse.json({ error: "The uploaded file is not a valid PDF." }, { status: 400 });
  }

  const { data, error } = await client.from("content_items")
    .insert({ kind: "book", title, position, file_path: filePath })
    .select("id, title, position")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ book: data });
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
    return NextResponse.json({ error: "Invalid book ID." }, { status: 400 });
  }

  const { client } = result.context;
  const { data: book, error: lookupError } = await client.from("content_items")
    .select("file_path")
    .eq("id", body.id)
    .eq("kind", "book")
    .maybeSingle();
  if (lookupError) return NextResponse.json({ error: lookupError.message }, { status: 500 });
  if (!book) return NextResponse.json({ error: "Book not found." }, { status: 404 });

  if (book.file_path) {
    const { error } = await client.storage.from("books").remove([book.file_path]);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { error } = await client.from("content_items").delete().eq("id", body.id).eq("kind", "book");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
