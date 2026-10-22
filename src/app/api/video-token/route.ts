import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// The student's browser sends its Supabase access token; we act AS that student, so
// has_access() and the RLS policies decide, not us. Only then do we sign the Bunny link.
export async function GET(req: Request) {
  const jwt = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const id = new URL(req.url).searchParams.get("lesson");
  if (!jwt || !id) return NextResponse.json({ error: "Bad request" }, { status: 400 });

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    global: { headers: { Authorization: `Bearer ${jwt}` } },
    auth: { persistSession: false },
  });

  const { data: ok } = await db.rpc("has_access", { p_product: "complete-system" });
  if (!ok) return NextResponse.json({ error: "No access" }, { status: 403 });

  const { data: item } = await db.from("content_items").select("bunny_video_id").eq("id", id).eq("kind", "video").single();
  if (!item?.bunny_video_id) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const expires = Math.floor(Date.now() / 1000) + 60 * 60 * 4; // link valid 4 hours
  const token = createHash("sha256").update(process.env.BUNNY_TOKEN_KEY! + item.bunny_video_id + expires).digest("hex");
  return NextResponse.json({
    url: `https://iframe.mediadelivery.net/embed/${process.env.BUNNY_LIBRARY_ID}/${item.bunny_video_id}?token=${token}&expires=${expires}`,
  });
}