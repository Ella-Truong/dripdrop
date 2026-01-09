'use client'
import { useEffect, useState } from "react"
import Image from 'next/image'

export default function ProfilePage() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile', { credentials: 'include' })
        if (!res.ok) throw new Error('Unauthorized or failed')
        const data = await res.json()
        setProfile(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className='flex justify-center items-start mt-20 w-full h-full'>
        <Image src='/loading1.png' alt='Loading' width={80} height={80}/>
      </div>
    )
  }

  if (error) return <p>{error}</p>
  if (!profile) return <p>No profile found</p>

  return (
    <div className="max-w-130 p-10 m-auto text-left font-serif rounded-4xl shadow-xl mt-8 bg-pink-300 items-center justify-center animate-fadeInDown">
      <h1 className="text-3xl text-left font-bold mb-4">Profile</h1>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
    </div>
  )
}
