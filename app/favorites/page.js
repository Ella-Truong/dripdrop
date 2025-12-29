'use client'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import FavoriteItem from '@/components/FavoriteItem'
import Image from 'next/image'

export default function FavoritesPage(){
    const [favorites, setFavorites] = useState([])    // favorites is assigned as empty array initially, like a container or placeholder for fav items 
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const res = await fetch('api/favorites')

                if (res.status === 401) {
                    router.push('/login')
                    return
                }

                const data = await res.json()
                setFavorites(Array.isArray(data) ? data: [])

            } catch (error) {
                console.error(error)

            } finally {
                setLoading(false)
            }
        }
        loadFavorites()
    },[router])

    if(loading) {
        return (
            <div className='flex jusitfy-center py-20'>
                <Image src='/loading.png' alt='Loading' width={40} height={40}/>
            </div>
        )
    }

    return (
        <div className='mx-auto max-w-5xl py-12'>
            <h1 className='text-3xl font-bold mb-8'>Your Favorites</h1>
            {favorites.length === 0 ? (
                <p className='text-gray-500'>You haven't added any favorites yet.</p>
            ) : (
                <div className='grid gap-6'>
                    {favorites.map(fav => (
                        <FavoriteItem key={fav.id} favorite={fav}/>
                    ))}
                </div>
            )}
        </div>
    )
}