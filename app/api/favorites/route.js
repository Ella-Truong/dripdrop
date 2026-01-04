
import { supabaseServer } from "@/lib/supabase/serverClient";


// ------------------------------------------------------------------ GET Favorite Items -----------------------------------------------------------
export async function GET() {
    const supabase = await supabaseServer()

    const {data: {user}} = await supabase.auth.getUser()
    if(!user) return new Response('Unauthorized', {status: 401})

    const { data, error } = await supabase
       .from('favorites')
       .select('*')
       .eq('user_id', user.id)

    if (error) return new Response('error.message', {status: 500})
    
    return new Response(JSON.stringify(data), {status: 200})
}

// ------------------------------------------------------------------ POST Favorite Items -----------------------------------------------------------
export async function POST(req) {
  try {
    const supabase = await supabaseServer()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return new Response('Unauthorized', { status: 401 })

    const { name, product_id, product_type, size, options } = await req.json()

    const { data, error } = await supabase
      .from('favorites')
      .insert([
        {
          user_id: user.id,
          name,
          product_type,
          product_id: product_id.toString(),
          size,
          options: options ?? {}  // <-- default to empty object if undefined
        }
      ])

    if (error) {
      console.error("Supabase insert error:", error)  // <-- log actual DB error
      return new Response(error.message, { status: 500 })
    }

    return new Response(JSON.stringify(data), { status: 200 })
  } catch (err) {
    console.error("Unexpected server error:", err)
    return new Response("Internal server error", { status: 500 })
  }
}

// ---------------------------------------------------------------- DELETE Favorite Items ---------------------------------------------------------
export async function DELETE(req) {
    const supabase = await supabaseServer()

    const {data: {user}} = await supabase.auth.getUser()

    if(!user) return new Response('Unauthorized', {status: 401})

    const {id} = await req.json()
    if (!id) return new Response('Favorite ID required', {status: 400})
    
    const {data, error} = await supabase
        .from('favorites')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)            // ensure only user can delete their own data
    
    if (error) return new Response(error.message, {status: 500})
    return new Response(JSON.stringify(data), {status: 200})

}