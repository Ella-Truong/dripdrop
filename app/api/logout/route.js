import { supabaseServer } from "@/lib/supabase/serverClient";
import {cookies} from 'next/headers'

export async function POST() {
  const supabase = await supabaseServer();

  // Invalidate session in supabase
  await supabase.auth.signOut();

  const cookieStore = await cookies()

  //remove auth cookies
  cookieStore.set("sb-access-token", "", {
    path:"/",
    maxAge: 0,
  })

  cookieStore.set("sb-refresh-token", "", {
    path: "/",
    maxAge: 0,
  })

  return new Response('Logged out', {status: 200})
}
