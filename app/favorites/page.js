'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import FavoriteItem from '@/components/FavoriteItem'
import Image from 'next/image'

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true)
            setError(null)

            // fetch favorites with new access token
            const res = await fetch('/api/favorites', { credentials: 'include' })
            if (res.status === 200) {
                const data = await res.json()
                setFavorites(data)
            } else if (res.status === 401) {
                setError('Please log in to see your favorites.')
            } else {
                setError('Failed to fetch favorites.')
            }
            setLoading(false)
        }
        fetchFavorites()
    }, [])

    return (
        <div className='mx-auto max-w-5xl py-12'>
            <h1 className='text-3xl text-pink-500 text-center font-serif font-bold mb-8'>Your Favorites</h1>

            {loading && (
                <div className='flex justify-center items-center'>
                    <Image src='/loading.png' alt='Loading' width={80} height={80} />
                </div>
            )}

            {error && (
                <p className='text-red-500 text-center'>{error}</p>
            )}

            {!loading && !error && favorites.length === 0 && (
                <p className='text-gray-500'>You haven't added any favorites yet.</p>
            )}

            {!loading && !error && favorites.length > 0 && (
                <div className='grid gap-6'>
                    {favorites.map(fav => (
                        <FavoriteItem key={fav.id} favorite={fav} />
                    ))}
                </div>
            )}
        </div>
    )
}
