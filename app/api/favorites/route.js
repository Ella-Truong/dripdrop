import { supabaseServer } from "@/lib/supabase/serverClient";
import { cookies } from "next/headers";

// ----------------- Helper: get user and auto-refresh -----------------
async function getServerUser() {
  const supabase = await supabaseServer();

  // Try to get user from access token
  let { data: { user } } = await supabase.auth.getUser();
  
  //if the access token is still valid -> return this
  if (user) return { user, supabase };

  // Access token expired → try refresh
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("sb-refresh-token")?.value;
  if (!refreshToken) return { user: null };

  const { data: refreshed, error: refreshError } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
  if (refreshError || !refreshed.session) return { user: null };

  // Update cookies with new tokens
  const accessCookieOptions = {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 3600, // 1h
  };
  const refreshCookieOptions = {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 604800, // 7d
  };

  cookieStore.set("sb-access-token", refreshed.session.access_token, accessCookieOptions);
  cookieStore.set("sb-refresh-token", refreshed.session.refresh_token, refreshCookieOptions);

  return { user: refreshed.session.user, supabase };
}


// ----------------- GET Favorites -----------------
export async function GET() {
  const { user, supabase } = await getServerUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id);

  if (error) return new Response(error.message, { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
}


// ----------------- POST Favorites -----------------
export async function POST(req) {
  const { user, supabase } = await getServerUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  try {
    const { name, product_id, product_type, size, options } = await req.json();

    const { data, error } = await supabase
      .from("favorites")
      .insert([
        {
          user_id: user.id,
          name,
          product_type,
          product_id: product_id.toString(),
          size,
          options: options ?? {},
        },
      ]);

    if (error) return new Response(error.message, { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error("Unexpected server error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}


// ----------------- DELETE Favorites -----------------
export async function DELETE(req) {
  const { user, supabase } = await getServerUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  try {
    const { id } = await req.json();
    if (!id) return new Response("Favorite ID required", { status: 400 });

    const { data, error } = await supabase
      .from("favorites")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) return new Response(error.message, { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error("Unexpected server error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
