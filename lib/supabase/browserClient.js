'use client'
import { createBrowserClient } from '@supabase/ssr'

export const supabaseBrowser = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// IMPORTANT: use this in CLIENT COMPONENT only, like components for login page. 
// createBrowserClient is a helper function from the module "auth-helpers-nextjs". 
// This helper function helps create Supabase client optimized for browser-side usage in Next.js
/* "supabaseBrowser" is a factory function that creates an instance of Supabase client configured for browser use in Next.js. 
    It is like interface definition defining the shape of what a Supabase client can do. supabaseBrowser itself doesn't actually do anything until we create an instance
*/

/* 
supabaseBrowser = {
  //authentication methods
  auth: {
    signInWithPassword,
    signUp,
    signOut,
    getSession,
    onAuthStateChange
  },
  from: function,         // to query tables
  rpc: function,          // to call Postgres functions
  storage: function,      // Supabase storage API
  ...
}
*/