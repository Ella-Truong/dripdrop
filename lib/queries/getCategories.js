import { supabaseServer } from "@/lib/supabase/serverClient";

const tables = ['Drinks', 'Foods']

export async function getCategories() {
  const supabase = await supabaseServer();

  const result = {}

  for (const table of tables){
    const {data, error} = await supabase
      .from(table.toLocaleLowerCase())
      .select('category')
      .not('category', 'is', null)
    
    if (error) {
      console.error(`Error fetching categories from ${table}:`, error.message)
      result[table] = []
    }else if (data && data.length > 0){
      const categories = [...new Set(data.map(d=>d.category))]
      result[table] = categories
    }else {
      result[table] = []
    }
  }

  return result
}

