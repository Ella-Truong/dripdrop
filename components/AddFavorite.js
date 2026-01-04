'use client'
import { useState } from "react"

export default function AddFavorite({item, size, options}){
    const [loading, setLoading] = useState(false)
    const [saved, setSaved] = useState(false)

    const handleAddFavorite = async () => {
        if (!item) return  // function exits immediately if user click button without picking their item to add, the below code never runs

        setLoading(true)

        try {
            const payload = {
                name: item.name,
                product_id: item.id,
                product_type: item.table,
                size, 
                options
            }

            const res = await fetch('/api/favorites', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            })

            if(res.status === 401) {
                window.location.href = '/login'
                return
            }

            if (!res.ok) throw new Error('Failed to save favorites')
            setSaved(true)

        } catch(error) {
            console.log(error)
            setSaved(false)
            
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            type="button"
            onClick={handleAddFavorite}
            disabled={loading || saved}         // make the button unclickable if the item is loading or is saved in Favorites
            className = {`mt-4 w-full py-3 rounded tracking-wider font-semibold text-black transition 
                ${saved ? 'bg-gray-600 text-pink-400 cursor-not-allowed' : 'border-2 rounded-3xl border-pink-400 hover:bg-pink-300 hover:text-white'}`}
        >
            {saved ? 'Added to Favorites' : loading ? 'Adding...' : 'Add to Favorites'}
        </button>
    )
}