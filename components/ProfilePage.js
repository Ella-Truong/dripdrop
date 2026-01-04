'use client'
import { useEffect, useState } from "react"

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

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!profile) return <p>No profile found</p>

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white/20 rounded-3xl shadow-xl mt-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
    </div>
  )
}
