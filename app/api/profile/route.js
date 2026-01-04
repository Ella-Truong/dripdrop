import { supabaseServer } from "@/lib/supabase/serverClient";

export async function GET() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ user: null }, { status: 200 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();

  return Response.json({
    user: {
      id: user.id,
      email: user.email,
      username: profile?.username ?? user.email,
    },
  });
}
