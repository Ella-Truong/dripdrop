import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { supabaseServer } from "@/lib/supabase/serverClient";

// ------------------------------------------------------------------ GET Favorite Items -----------------------------------------------------------
export async function GET() {
    const supabase = await supabaseServer()

    const {data: {session}} = await supabase.auth.getSession()
    if(!session) return new Response('Unauthorized', {status: 401})

    const { data, error } = await supabase
       .from('favorites')
       .select('*')
       .eq('user_id', session.user.id)

    if (error) return new Response('error.message', {status: 500})
    
    return new Response(JSON.stringify(data), {status: 200})
}

// ------------------------------------------------------------------ POST Favorite Items -----------------------------------------------------------
export async function POST(req) {
    const supabase = supabaseServer()

    const {data: {session}} = await supabase.auth.getSession()

    if(!session) return new Response('Unauthorized', {status: 401})
    
    const { name, product_id, product_type, size, options } = await req.json()

    const {data, error} = await supabase
       .from('favorites')
       .insert([
            {
                user_id: session.user.id,
                name,
                product_type,
                product_id,
                size,
                options
            }
       ])
    
    if (error) return new Response(error.message, {status: 500})
    
    return new Response(JSON.stringify(data), {status: 200})

}

// ---------------------------------------------------------------- DELETE Favorite Items ---------------------------------------------------------
export async function DELETE(req) {
    const supabase = supabaseServer()

    const {data: {session}} = await supabase.auth.getSession()

    if(!session) return new Response('Unauthorized', {status: 401})

    const {id} = await req.json()
    if (!id) return new Response('Favorite ID required', {status: 400})
    
    const {data, error} = await supabase
        .from('favorites')
        .delete()
        .eq('id', id)
        .eq('user_id', session.user.id)            // ensure only user can delete their own data
    
    if (error) return new Response(error.message, {status: 500})
    return new Response(JSON.stringify(data), {status: 200})

}