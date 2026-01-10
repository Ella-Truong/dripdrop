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
        persistSession: false,
        detectSessionInUrl: false,
        //this tell Supabase how to get the refresh token
        storageKey: 'server',
        storage: {
          getItem: async () => refreshToken ?? null,
          setItem: async () => {},
          removeItem: async () => {}
        }
      }
    }
  )
}



 export async function getServerUser() {
  const supabase = await supabaseServer();

  // Try to get user from access token
  let { data: { user } } = await supabase.auth.getUser();
  
  //if the access token is still valid -> return this
  if (user) return { user, supabase };

  // Access token expired → try refresh
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("sb-refresh-token")?.value;
  if (!refreshToken) return { user: null };

  const { data: refreshed, error: refreshError } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
  if (refreshError || !refreshed.session) return { user: null };

  // Update cookies with new tokens
  const accessCookieOptions = {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 3600, // 1h
  };
  const refreshCookieOptions = {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 604800, // 7d
  };

  cookieStore.set("sb-access-token", refreshed.session.access_token, accessCookieOptions);
  cookieStore.set("sb-refresh-token", refreshed.session.refresh_token, refreshCookieOptions);

  return { user: refreshed.session.user, supabase };
}

