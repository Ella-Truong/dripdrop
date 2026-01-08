import { supabaseServer } from "@/lib/supabase/serverClient";

export async function POST(req) {
  const { email, password } = await req.json();
  const supabase = await supabaseServer();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    let message = error.message;

    // Friendly messages
    if (message.includes('Email not confirmed') || message.includes('User has not confirmed')) {
      message = 'Please confirm your email before logging in!';
    } else if (message.includes('Invalid login credentials') || message.includes('User not found')) {
      message = 'No account found with this email. Please sign up first.';
    }

    return new Response(message, { status: 401 }); // ✅ use the new message
  }


  // Set cookies if login is successful
  const accessCookieOptions = "Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=3600";
  const refreshCookieOptions = "Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=604800"

  return new Response(JSON.stringify({ message: "Logged in" }), {
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
