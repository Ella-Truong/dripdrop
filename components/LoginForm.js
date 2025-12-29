'use client'
import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/browserClient.js'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()

    const handleLogin = async () => {
        if (!email || !password) return  // safety check
        setError(null)
        setLoading(true)

        try {
            const { data, error: loginError } = await supabaseBrowser.auth.signInWithPassword({
                email,
                password
            })

            if (loginError) setError(loginError.message)
            else router.push('/') // redirect to home page
        } catch {
            setError('Network error. Please try again')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleLogin()
    }

    return (
        <div className="w-80 mx-auto p-6 bg-white/20 rounded-3xl shadow-xl border border-blue-100 mt-5 animate-fadeInDown">
            <h2 className="text-2xl font-bold text-center text-pink-300 mb-5">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 mx-auto">
                <input 
                    type='email' 
                    placeholder='Enter your email' 
                    value={email} 
                    onChange={e => {setEmail(e.target.value); setError(null)}}
                    className='w-64 mx-auto p-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300'
                    required
                    autoComplete='email'
                    autoFocus
                />
                <input 
                    type='password' 
                    placeholder='Enter your password' 
                    value={password} 
                    onChange={e => {setPassword(e.target.value); setError(null)}}
                    className='w-64 mx-auto p-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300'
                    required
                    autoComplete='current-password'
                />
                <button 
                    type='submit' 
                    className={`w-64 mx-auto py-2 mb-2 font-semibold rounded-xl transition ${
                        loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-pink-400 hover:bg-pink-500 text-white'
                    }`}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {error && <p className='text-red-600 mt-2 text-center'>{error}</p>}
            </form>

        </div>
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