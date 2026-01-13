// components/LoginForm.js
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../app/context/UserContext'

export default function LoginForm() {
  const { setUser } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      if (!res.ok) {
        const msg = await res.text()
        setError(msg)
        return
      }

      // fetch profile
      const profileRes = await fetch('/api/profile', { credentials: 'include' })
      if (profileRes.ok) {
        const profileData = await profileRes.json()
        setUser(profileData) // <-- works now
      }

      router.push('/')
    } catch (err) {
      console.error(err)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300" autoFocus />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300" />
      <button type="submit" disabled={loading} className={`w-full py-3 font-semibold rounded-xl transition ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-pink-400 hover:bg-pink-500 text-white'}`}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p className="text-red-600 text-center mt-2">{error}</p>}
    </form>
  )
}

/* if login succeeds:
data = {
   session: {...},    //session info including access_token, refresh_token, ....
   user: {...},       // info about the logged-in user
   ...
}
error = null
 */