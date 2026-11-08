import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin-server";

const USERS_PER_PAGE = 1000;
const USER_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(req: NextRequest) {
  const result = await requireAdmin(req);
  if (!result.context) return result.response;

  const { client } = result.context;
  const signupUsers = [];
  for (let page = 1; ; page += 1) {
    const { data, error } = await client.auth.admin.listUsers({ page, perPage: USERS_PER_PAGE });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const requestedUsers = data.users.filter((user) =>
      user.user_metadata?.access_requested === true && user.email,
    );
    if (requestedUsers.length) {
      const { data: grants, error: grantsError } = await client
        .from("admin_access_grants")
        .select("user_id, revoked_at")
        .in("user_id", requestedUsers.map((user) => user.id));
      if (grantsError) return NextResponse.json({ error: grantsError.message }, { status: 500 });

      const grantByUserId = new Map((grants ?? []).map((grant: { user_id: string; revoked_at: string | null }) => [grant.user_id, grant]));
      signupUsers.push(...requestedUsers.map((user) => {
        const grant = grantByUserId.get(user.id);
        return {
          id: user.id,
          email: user.email,
          name: typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name : "",
          createdAt: user.created_at,
          status: !grant ? "pending" : grant.revoked_at ? "declined" : "approved",
        };
      }));
    }

    if (data.users.length < USERS_PER_PAGE) break;
  }

  return NextResponse.json({ users: signupUsers });
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

  const { client, user: adminUser } = result.context;
  if (typeof body.userId !== "string" || !USER_ID_PATTERN.test(body.userId) || !["approve", "decline"].includes(String(body.action))) {
    return NextResponse.json({ error: "Invalid access action." }, { status: 400 });
  }

  const { data, error: userError } = await client.auth.admin.getUserById(body.userId);
  if (userError) return NextResponse.json({ error: userError.message }, { status: 500 });
  const target = data.user;
  if (!target || target.user_metadata?.access_requested !== true) {
    return NextResponse.json({ error: "This account has not requested access." }, { status: 404 });
  }

  if (body.action === "approve") {
    const { error } = await client.from("admin_access_grants").upsert({
      user_id: target.id,
      granted_by: adminUser.id,
      granted_at: new Date().toISOString(),
      revoked_at: null,
    }, { onConflict: "user_id" });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  const { error } = await client.from("admin_access_grants").upsert({
    user_id: target.id,
    granted_by: adminUser.id,
    granted_at: new Date().toISOString(),
    revoked_at: new Date().toISOString(),
  }, { onConflict: "user_id" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
