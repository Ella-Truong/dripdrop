'use client'

import { useState, useEffect } from 'react'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import './globals.css'

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null)

  // Fetch user profile on first load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          setUser(data)
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err)
      }
    }
    fetchProfile()
  }, [])

  return (
    <html lang="en">
      <body className='flex flex-col min-h-screen'>
        <div className='top-0 z-50'>
          <NavigationBar user={user} setUser={setUser} />
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
        <div className='flex-shrink-0'>
          <Footer/>
        </div>
      </body>
    </html>
  )
}



// Navigation and Footer are always visible when user move between pages on the app, so put these components in the root layout.









