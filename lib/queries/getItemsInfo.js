import { supabaseServer } from "../supabase/serverClient.js";

export async function getItemsInfo({table, category}){
    const supabase = await supabaseServer()

    const decodedCategory = decodeURIComponent(category)

    const {data, error} = await supabase
        .from(table)
        .select('id, name, image')         // returned data = [{name:'', image: ''}, {name:'', image:''},....]
        .eq('category', decodedCategory)
    

    if (error) throw error

    return data || []
}


