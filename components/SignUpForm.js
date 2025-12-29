'use client'
import { useState}  from 'react'
import { supabaseBrowser } from '@/lib/supabase/browserClient'
import { useRouter } from 'next/navigation'

export default function SignUpFrom() {
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
            // sign up with Auth table
            const {data, error: signUpError} = await supabaseBrowser.auth.signUp({
                email, 
                password
            })

            if (signUpError) {
                setError(signUpError.message)
            } else {
                // insert profile data
                // remember to create profile table 
                await supabaseBrowser.from('profiles').insert({
                    id: data.user.id,
                    username,
                    phone,
                    email
                })

                router.push('/login')  // redirect to Login page
            }
        } catch (error) {
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
                className = 'w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300'
            />

            <input
                type='text'
                placeholder='Phone Number'
                value={phone}
                onChange={e => {setPhone(e.target.value)}}
                required
                className = 'w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300'
            />

            <input 
                type='email' 
                placeholder='Enter your email' 
                value={email} 
                onChange = {e => setEmail(e.target.value)}
                className='w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300'
                required
                autoComplete='email'
            />

            <input 
                type='password' 
                placeholder='Enter your password' 
                value={password} 
                onChange = {e => setPassword(e.target.value)}
                className='w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300'
                required
                autoComplete='current-password'
            />

            <button
                type='submit'
                className = {`w-full py-3 font-semibold rounded-xl transition ${
                    loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-pink-400 hover:bg-pink-500 text-white'}`}
                disabled={loading}
            >
                {loading? 'Signing up...' : 'Sign Up'}
            </button>
            {error && <p className='text-red-500 text-center mt-2'>{error}</p>}
        </form>
    )
}