//store the cart in databse and keep a local copy in React to avoid repeated parsing or slow access. 
/*
Full CRUD for cart. 
GET -> fetch cart items
POST -> add or update product quantity to cart
DELETE -> remove an item
*/
import { supabaseServer } from "@/lib/supabase/serverClient";
import { getServerUser } from "@/lib/supabase/serverClient";


// -------------------- GET Cart - fetch user cart ---------------------

export async function GET() {
    const { user, supabase } = await getServerUser()
    if (!user) return new Response('Unauthorized', {status: 401})
    
    const {data, error} = await supabase 
       .from('cart_items')
       .select('*')
       .eq('user_id', user.id);

    if(error) return new Response(error.message, {status: 500})
    return new Response(JSON.stringify(data), {status: 200})
}
    


// -------------------- POST cart - add/update item -----------------------

export async function POST(req) {
    const {user, supabase} = await getServerUser()
    if (!user) return new Response('unauthorized', {status: 401})

    try {
        const {name, product_id, product_type, size, options,quantity,price} = await req.json()
        
        const optionString = JSON.stringify(options ?? {})

        //check if item is already in cart
        const {data : existingItem, error: selectError} = await supabase
           .from('cart_items') 
           .select('*')
           .eq('user_id', user.id)
           .eq('product_id', product_id)
           .eq('product_type', product_type)
           .eq('size', size)
           .eq('options', optionString)
           .maybeSingle()

        if(selectError){
            console.error('Supabase select error', selectError)
            return new Response(selectError.message, {status: 500})
        }

        let data, error

        if (existingItem){
            //item exists -> increment quantity
            const newQuantity = existingItem.quantity + 1
            const newPrice = existingItem.price*newQuantity

            const updateResult = await supabase
                .from('cart_items')
                .update({
                    quantity: newQuantity,
                    price: newPrice
                })
                .eq('id', existingItem.id)
            
            data = updateResult.data
            error = updateResult.error

        }else{
            const insertResult = await supabase
                .from('cart_items')
                .insert([
                    {
                        user_id: user.id,
                        name,
                        product_type,
                        product_id,
                        size,
                        options,
                        quantity: 1,
                        price
                    }
                ])

            data = insertResult.data
            error = insertResult.error
        }

        if (error) {
            console.error("Supabase insert error:", error)
            return new Response(error.message, {status: 500})
        }
        return new Response(JSON.stringify(data), {status: 200})
    }catch (err) {
        console.error('Unexpected server error:', err)
        return new Response('Internal server error', {status: 500})
    }
}


// ---------------------------- DELETE an item -----------------------------

export async function DELETE(req){
    const {user, supabase} = await getServerUser()
    if(!user) return new Response('Unauthorized', {status: 401})

    try {
        const {id} = await req.json()
        if(!id) return new Response('Item ID required', {status: 400})
        
        const {data, error} = await supabase
           .from('cart_items')
           .delete()
           .eq('id', id)
           .eq('user_id', user.id)

        if(error) return new Response(error.message, {status: 500})
        return new Response(JSON.stringify(data), {status: 200})
    }catch (err) {
    console.error("Unexpected server error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}



