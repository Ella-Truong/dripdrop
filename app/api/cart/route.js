//store the cart in databse and keep a local copy in React to avoid repeated parsing or slow access. 
/*
Full CRUD for cart. 
GET -> fetch cart
POST -> add or update product quantity to cart
DELETE -> remove a product
*/
import { supabaseServer } from "@/lib/supabase/serverClient";

// ----------------------------------------------------- GET cart - fetch user cart ---------------------------------------------------------

export async function GET() {
    // create a Supabase client for server
    const supabase = await supabaseServer()

    /* To fetch cart data, must know which user to fetch -> check if user is logged in or not first.
     Data here is not product data, it is authentication data that is included in session key, its values includes user:{ id, ...}, access_token,...
     After getting session.user.id, then can fetch the cart */
    const { data: { user } } = await supabase.auth.getUser()

    // if user is not logged in, then no active session exists
    if (!user) return new Response("Unauthorized", { status: 401 })

    // session exists -> user is logged in
    const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)

    if (error) return new Response(error.message, { status: 500 })
    
        // convert JavaScript object/array (data) into a JSON string
    return new Response(JSON.stringify(data), { status: 200 })

    /*
    Response here is Response object, not actual data. 
    It contains metadata like:
       res.status -> 200, 401, ...
       res.headers -> HTTP headers
       res.body -> the raw response stream (usually text)
    
    new Response(JSON.stringify(data)) return something like:
    [{'id':'1','product_id':'2','quanity':'3'}, {...}]
     */
}

// ----------------------------------------------------- POST cart - add/update item ---------------------------------------------------------

export async function POST(req) {
    const supabase = await supabaseServer()

    //check current session first
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return new Response('Unauthorized', { status: 401 })

    const { name, product_id, product_type, quanity, size, options } = await req.json()

    const { data, error } = await supabase
        .from('cart_items')
        .insert([
            { 
                user_id: session.user.id, 
                name, 
                product_id, 
                product_type, 
                quanity, 
                size, 
                options
            }
        ])
    
    if (error) return new Response(error.message, {status: 500})
    
    return new Response(JSON.stringify(data), {status: 200})   
}


// ------------------------------------------------------------ DELETE an item ------------------------------------------------------------------

export async function DELETE(req){
    const supabase = await supabaseServer()

    const {data: {session}} = await supabase.auth.getUser()
    if (!user) return new Response('Unauthorized', {status: 401})
    
    // get product_id from request body
    const {product_id} = await req.json()
    if (!product_id) return new Response("Product ID required", { status: 400 })

    const {data, error} = await supabase
       .from('cart_items')
       .delete()
       .eq('user_id', user.id)
       .eq('product_id', product_id)

    if (error) return new Response(error.message, {status: 500})
    return new Response(JSON.stringify(data), {status: 200})
}



