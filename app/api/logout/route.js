import { supabaseServer } from "@/lib/supabase/serverClient";

export async function POST() {
  const supabase = await supabaseServer();

  // Invalidate Supabase session (optional but good practice)
  await supabase.auth.signOut();

  // Clear cookies
  const cookieOptions =
    "Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0";

  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
    headers: {
      "Set-Cookie": [
        `sb-access-token=; ${cookieOptions}`,
        `sb-refresh-token=; ${cookieOptions}`,
      ],
      "Content-Type": "application/json",
    },
  });
}
