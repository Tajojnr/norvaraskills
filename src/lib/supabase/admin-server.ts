import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

type AdminContext = {
  client: SupabaseClient;
  user: User;
};

type AdminResult =
  | { context: AdminContext; response?: never }
  | { context?: never; response: NextResponse };

export async function requireAdmin(req: NextRequest): Promise<AdminResult> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anonKey || !serviceRoleKey) {
    return { response: NextResponse.json({ error: "Admin services are not configured." }, { status: 500 }) };
  }

  const token = req.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) {
    return { response: NextResponse.json({ error: "Sign in is required." }, { status: 401 }) };
  }

  const authClient = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: { user }, error } = await authClient.auth.getUser(token);
  if (error || !user?.email || !user.email_confirmed_at) {
    return { response: NextResponse.json({ error: "Your session is invalid. Sign in again." }, { status: 401 }) };
  }

  const allowedEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  if (!allowedEmails.includes(user.email.toLowerCase())) {
    return { response: NextResponse.json({ error: "Admin access is required." }, { status: 403 }) };
  }

  return {
    context: {
      user,
      client: createClient(url, serviceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      }),
    },
  };
}
