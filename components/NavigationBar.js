'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function NavigationBar() {
  const navItems = [
    { name: 'Menu', href: '/menu' },
    { name: 'Favorites', href: '/favorites' },
  ]

  const [profile, setProfile] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const router = useRouter()

  // Fetch profile to check if user is logged in
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/profile', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          setProfile(data)
        } else {
          setProfile(null)
        }
      } catch (err) {
        console.error(err)
        setProfile(null)
      }
    }
    fetchProfile()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST', credentials: 'include' })
      if (res.ok) {
        setProfile(null)
        router.push('/')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo1.png" width={60} height={55} alt="Home" priority />
        </Link>

        {/* Main nav links */}
        <div className="ml-8 flex items-center gap-6 text-base font-serif font-semibold text-gray-700">
          {navItems.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-pink-500 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3 relative font-serif font-semibold text-base">
          {!profile ? (
            // Before login → show Sign in / Sign up
            <>
              <Link
                href="/login"
                className="px-4 py-1.5 rounded-full border border-pink-300 text-pink-500
                           hover:bg-pink-50 transition"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="px-4 py-1.5 rounded-full bg-pink-400 text-white
                           hover:bg-pink-500 transition shadow-sm"
              >
                Sign up
              </Link>
            </>
          ) : (
            // After login → username with dropdown
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-4 py-1.5 rounded-full border border-pink-300 text-pink-500
                           hover:bg-pink-50 transition"
              >
                {profile.username} ▼
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded border">
                  <button
                    onClick={() => router.push('/profile')}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Cart */}
          <Link href="/cart">
            <Image src="/coffee-bag2.png" width={28} height={28} alt="Cart" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
