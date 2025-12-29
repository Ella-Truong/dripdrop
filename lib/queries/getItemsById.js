import { supabaseServer } from "../supabase/serverClient";
import { notFound } from "next/navigation";

export async function getItemsById(table, id){
    const supabase = await supabaseServer()
    
    const valid_tables = ['drinks', 'foods']

    if (!valid_tables.includes(table)){
        notFound()
    }
  
    const {data, error} = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) {
        notFound()
    }

    return {...data, table}
}

