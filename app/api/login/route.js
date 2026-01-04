import { supabaseServer } from "@/lib/supabase/serverClient";

export async function POST(req) {
  const { email, password } = await req.json();
  const supabase = await supabaseServer();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return new Response(error.message, { status: 401 });

  if (data.session) {
    // Set both access and refresh token in cookies
    const cookieOptions = "Path=/; HttpOnly; SameSite=Lax; Secure";

    return new Response(JSON.stringify({ message: "Logged in" }), {
      status: 200,
      headers: {
        "Set-Cookie": [
          `sb-access-token=${data.session.access_token}; ${cookieOptions}`,
          `sb-refresh-token=${data.session.refresh_token}; ${cookieOptions}`,
        ],
        "Content-Type": "application/json",
      },
    });
  }

  return new Response("Login failed", { status: 400 });
}
