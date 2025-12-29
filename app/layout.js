import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import { supabaseServer } from '../lib/supabase/serverClient'
import './globals.css'

export const metadata = {
    title: 'Drinks Store | Coffee, Tea, & Seasonal Drinks',
    description: 'Discover fresh coffee, tea, smoothies, and seasonal drinks. Browse our full menu and order your favorites online.'
}

export default async function RootLayout({children}) {
    const supabase = await supabaseServer()

    const {data} = await supabase.auth.getSession()
    // session can either be an object or Null
    const session = data?.session ?? null

    return (
        <html lang="en">
            <body className='flex flex-col min-h-screen'>
                <NavigationBar session={session} />
                <div className="flex-1 flex min-h-0">{children}</div>
                <Footer/>
            </body>
        </html>
    )
}

// Navigation and Footer are always visible when user move between pages on the app, so put these components in the root layout.









