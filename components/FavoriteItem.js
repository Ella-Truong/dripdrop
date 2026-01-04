'use client'
import {useState} from 'react'
import Image from 'next/image'

export default function FavoriteItem({favorite}) {
    const [loading, setLoading] = useState(false)
    const [removed, setRemoved] = useState(false)
    
    // any item in favorites section has a feature of being removed 
    const handleRemove = async () => {
        if (loading) return
        setLoading(true)

        try {
            const res = await fetch('/api/favorites',{
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: favorite.id }),
                credentials: 'include' 
            })

            if (!res.ok) throw new Error('Failed to remove favorite')
            
            // if remove is done -> hide item 
            setRemoved(true)

        } catch (error) {
            console.error(error)
            alert('Failed to remove favorite.')

        } finally {
            setLoading(false)
        }
    }

    if (removed) return null

    /* Start to display a favorite item:
       1. Parse topping options that user picked if it is stored as JSON
       2. Using these options to design the display of an tiem
    */
    let optionArray = []

    if (favorite.options) {
        try {
            optionArray = typeof favorite.options === 'string'
                ? JSON.parse(favorite.options)
                : favorite.options  // already an object/array
        } catch(error) {
            console.error('Failed to parse options:', error)
         }
    }


    return (
        <div className='flex items-center justify-between p-4 border rounded-md shadow-sm'>
            <div className='flex items-center gap-4'>
                <Image
                    src={favorite.table === 'drinks'? '/drink.avif' : '/snack5.webp'}
                    alt={favorite.name}
                    width={64}
                    height={64}
                    className='object-cover rounded'
                />
                <div>
                    <h3 className='font-semibold'>{favorite.name}</h3>
                    {favorite.size && <p className='text-sm text-gray-500'>Size: {favorite.size}</p>}
                    {optionArray.length > 0 && (
                        <p className='text-sm text-gray-500'>{optionArray.join(', ')}</p>
                    )}
                </div>
            </div>

            <button
                onClick={handleRemove}
                disabled ={loading}
                className={`ml-4 w-10 h-10 flex items-center justify-center rounded bg-red-600 text-white font-bold hover:bg-red-700 
                    ${loading? 'bg-gray-400 cursor-not-allowed' : ''}`}
            >
                {loading? '...' : '-'}
            </button>
        </div>
    )
}