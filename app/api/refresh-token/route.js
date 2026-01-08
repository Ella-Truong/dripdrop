import { supabaseServer } from "@/lib/supabase/serverClient";

export async function POST(req) {
  const supabase = await supabaseServer();

  // Read refresh token from cookie
  const cookies = req.headers.get("cookie") || "";
  const refreshTokenMatch = cookies.match(/sb-refresh-token=([^;]+)/);
  if (!refreshTokenMatch) return new Response("No refresh token", { status: 401 });

  const refresh_token = refreshTokenMatch[1];

  // Use refresh token to get new access token
  const { data, error } = await supabase.auth.refreshSession({
    refresh_token
  });

  if (error) return new Response(error.message, { status: 401 });

  // Update cookies with new tokens
  const accessCookieOptions = "Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=3600";
  const refreshCookieOptions = "Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=604800";

  return new Response(JSON.stringify({ message: "Token refreshed" }), {
    status: 200,
    headers: {
      "Set-Cookie": [
        `sb-access-token=${data.session.access_token}; ${accessCookieOptions}`,
        `sb-refresh-token=${data.session.refresh_token}; ${refreshCookieOptions}`,
      ],
      "Content-Type": "application/json",
    },
  });
}
