'use client'
import { useState } from "react"
import { useRouter } from 'next/navigation'

export default function SignUpForm({setUser}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async () => {
    setError(null)
    setLoading(true)

    try {
      // Sign up the user
      const signUpRes = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, username, email, password }),
      })

      if (!signUpRes.ok) {
        const msg = await signUpRes.text()
        setError(msg)
        return
      }

      // Log in immediately to get session cookies (RLS-safe)
      const loginRes = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      if (!loginRes.ok) {
        const msg = await loginRes.text()
        setError(`${msg}`)
        return
      }

       // 3️⃣ Fetch profile
      const profileRes = await fetch('/api/profile', { credentials: 'include' })
      if (profileRes.ok) {
        const profileData = await profileRes.json()
        setUser(profileData)  // update NavBar immediately
      }

      // Success → redirect to dashboard
      router.push('/')

    } catch (err) {
      console.error(err)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSignUp()
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full animate-fadeInDown'>
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        className='w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300'
        autoFocus
      />

      <input
        type='tel'
        placeholder='Phone Number'
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
        className='w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300'
      />

      <input 
        type='email' 
        placeholder='Enter your email' 
        value={email} 
        onChange={e => setEmail(e.target.value)}
        required
        autoComplete='email'
        className='w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300'
      />

      <input 
        type='password' 
        placeholder='Enter your password' 
        value={password} 
        onChange={e => setPassword(e.target.value)}
        required
        autoComplete='new-password'
        className='w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300'
      />

      <button
        type='submit'
        disabled={loading}
        className={`w-full py-3 font-semibold rounded-xl transition ${
          loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-pink-400 hover:bg-pink-500 text-white'
        }`}
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>

      {error && <p className='text-red-500 text-center mt-2'>{error}</p>}
    </form>
  )
}
