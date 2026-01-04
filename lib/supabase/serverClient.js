import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function supabaseServer() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('sb-access-token')?.value
  const refreshToken = cookieStore.get('sb-refresh-token')?.value;

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined
      },
      auth: {
        autoRefreshToken: true,
        persistSession: false 
      }
    }
  )
}
