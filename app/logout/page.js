'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      })

      router.replace('/')
    }

    logout()
  }, [router])

  return (
    <p className="text-center mt-20 text-lg">
      Logging you out…
    </p>
  )
}
