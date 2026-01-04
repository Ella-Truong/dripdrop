'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function NavigationBar() {
  const navItems = [
    { name: 'Menu', href: '/menu' },
    { name: 'Favorites', href: '/favorites' },
  ]

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
        <div className="ml-auto text-base flex font-serif font-semibold items-center gap-3">
          {/* Sign in / Join now */}
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
            Join now
          </Link>

          {/* Cart */}
          <Link href="/cart">
            <Image src="/coffee-bag2.png" width={28} height={28} alt="Cart" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
