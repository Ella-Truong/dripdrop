import { supabaseServer } from "@/lib/supabase/serverClient";

export async function POST(req) {
  try {
    const { username, phone, email, password } = await req.json();

    const supabase = await supabaseServer();

    // 1️⃣ Sign up the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) return new Response(signUpError.message, { status: 400 });
    if (!signUpData.user) return new Response("User creation failed", { status: 500 });

    // 2️⃣ Don’t insert profile yet! Wait for email confirmation
    // The user will click the confirmation link in email

    return new Response(
      JSON.stringify({
        message: "Sign up successful! Please check your email to verify before using the app.",
        user_id: signUpData.user.id,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response("Internal server error", { status: 500 });
  }
}
