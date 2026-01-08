import { supabaseServer } from "@/lib/supabase/serverClient";

// ---------------------------------------- FETCH USER PROFILE ----------------------------------------------
export async function GET(req) {
  try {
    const supabase = await supabaseServer();

    // Get current logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Get the profile for this user
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error) return new Response(error.message, { status: 500 });
    if (!data) return new Response("Profile not found", { status: 404 });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Internal server error", { status: 500 });
  }
}

// ---------------------------------------- INSERT USER TO PROFILES ---------------------------------------------
export async function POST(req) {
  try {
    const supabase = await supabaseServer();
    const { username, phone } = await req.json();

    // Get current logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = user.id;

    // Check if profile already exists for this user
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    if (existingProfile) {
      return new Response("Profile already exists", { status: 400 });
    }

    // Insert profile
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        id: userId, // MUST include for RLS
        email: user.email,
        username,
        phone,
        is_verified: true,
      });

    if (error) {
      console.error("Insert profile error:", error);
      return new Response(error.message, { status: 500 });
    }

    return new Response("Profile created", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Internal server error", { status: 500 });
  }
}
