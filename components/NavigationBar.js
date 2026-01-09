'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {useRouter} from 'next/navigation'

export default function NavigationBar({ user, setUser }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' })
    setUser(null) // immediately update NavBar
    setDropdownOpen(false)
    router.push('/')
    
  }

  const navItems = [
    { name: 'Menu', href: '/menu' },
    { name: 'Favorites', href: '/favorites' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-2 border-pink-300 shadow-sm font-serif font-semibold ">
      <div className="max-w-7xl mx-auto px-15 py-4 text-base flex items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/coffee-logo1.png" width={60} height={55} alt="Home" priority />
        </Link>

        {/* Main nav links */}
        <div className="ml-8 flex items-center gap-6 text-gray-700">
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
        <div className="ml-auto text-base flex items-center gap-3">
          {!user ? (
            <>
              <Link
                href="/login"
                className="px-4 py-1.5 rounded-full border border-pink-300 text-pink-500 hover:bg-pink-50 transition"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="px-4 py-1.5 rounded-full bg-pink-400 text-white hover:bg-pink-500 transition shadow-sm"
              >
                Join now
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                className="px-4 py-1.5 rounded-full border border-pink-300 text-pink-500 hover:bg-pink-50 transition flex items-center gap-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.username}
                <span className={`text-[0.65rem] transform transition-transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}>
                   ▼
                </span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-pink-500"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-pink-500"
                  >
                    Logout
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
