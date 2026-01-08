import { supabaseServer } from "@/lib/supabase/serverClient";

export async function POST() {
  const supabase = await supabaseServer();

  // Invalidate session in Supabase
  await supabase.auth.signOut();

  // Return response with cleared cookies
  const accessCookie = `sb-access-token=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`;
  const refreshCookie = `sb-refresh-token=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`;

  return new Response('Logged out', {
    status: 200,
    headers: {
      'Set-Cookie': [accessCookie, refreshCookie],
    },
  });
}
