
import { getServerUser, supabaseServer } from "@/lib/supabase/serverClient";



// ----------------- GET Favorites -----------------
export async function GET() {
  const { user, supabase } = await getServerUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id)
    .order('created_at', {ascending: true});

  if (error) return new Response(error.message, { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
}



// ----------------- POST Favorites -----------------
export async function POST(req) {
  const { user, supabase } = await getServerUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  try {
    const { name, product_id, product_type, size, options } = await req.json();

    // Try to insert but ignore duplicates with upsert
    const { data, error } = await supabase
      .from("favorites")
      .upsert(
        [
          {
            user_id: user.id,
            name,
            product_type,
            product_id: product_id.toString(),
            size: size || null,
            options: options ?? {},
          },
        ],
        {
          onConflict: ["user_id", "product_type", "product_id", "size", "options"],
        }
      );

    if (error) {
      console.error("Supabase upsert error:", error);
      return new Response(error.message, { status: 500 });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Added to favorites (or already exists)",
        data,
      }),
      { status: 200 }
    );
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
