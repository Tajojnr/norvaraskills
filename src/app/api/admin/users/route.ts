import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin-server";

const USERS_PER_PAGE = 1000;
const USER_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(req: NextRequest) {
  const result = await requireAdmin(req);
  if (!result.context) return result.response;

  const { client } = result.context;
  const pendingUsers = [];
  for (let page = 1; ; page += 1) {
    const { data, error } = await client.auth.admin.listUsers({ page, perPage: USERS_PER_PAGE });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const requestedUsers = data.users.filter((user) =>
      user.user_metadata?.access_requested === true && user.email,
    );
    if (requestedUsers.length) {
      const { data: grants, error: grantsError } = await client
        .from("admin_access_grants")
        .select("user_id")
        .is("revoked_at", null)
        .in("user_id", requestedUsers.map((user) => user.id));
      if (grantsError) return NextResponse.json({ error: grantsError.message }, { status: 500 });

      const grantedIds = new Set((grants ?? []).map((grant: { user_id: string }) => grant.user_id));
      pendingUsers.push(...requestedUsers
        .filter((user) => !grantedIds.has(user.id))
        .map((user) => ({
          id: user.id,
          email: user.email,
          name: typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name : "",
          createdAt: user.created_at,
          emailConfirmed: Boolean(user.email_confirmed_at),
        })));
    }

    if (data.users.length < USERS_PER_PAGE) break;
  }

  return NextResponse.json({ users: pendingUsers });
}

export async function POST(req: NextRequest) {
  const result = await requireAdmin(req);
  if (!result.context) return result.response;

  let body: { userId?: unknown; action?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body.userId !== "string" || !USER_ID_PATTERN.test(body.userId) || !["approve", "revoke"].includes(String(body.action))) {
    return NextResponse.json({ error: "Invalid access action." }, { status: 400 });
  }

  const { client, user: adminUser } = result.context;
  const { data, error: userError } = await client.auth.admin.getUserById(body.userId);
  if (userError) return NextResponse.json({ error: userError.message }, { status: 500 });
  const target = data.user;
  if (!target || target.user_metadata?.access_requested !== true) {
    return NextResponse.json({ error: "This account has not requested access." }, { status: 404 });
  }

  if (body.action === "approve") {
    if (!target.email_confirmed_at) {
      return NextResponse.json({ error: "The student must verify their email before approval." }, { status: 409 });
    }
    const { error } = await client.from("admin_access_grants").upsert({
      user_id: target.id,
      granted_by: adminUser.id,
      granted_at: new Date().toISOString(),
      revoked_at: null,
    }, { onConflict: "user_id" });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  const { error } = await client.from("admin_access_grants")
    .update({ revoked_at: new Date().toISOString() })
    .eq("user_id", target.id)
    .is("revoked_at", null);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
