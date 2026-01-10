'use client'
import { useState } from "react"

export default function AddToCart({item, size, options}){
    const [loading, setLoading] = useState(false)
    const [added, setAdded] = useState(false)

    const handleAddToCart = async () => {
        if (!item) return 
        setLoading(true)
        
        //calculate total price
        let optionsPrice = options?.reduce((sum, opt) => sum + (opt.price || 0), 0) || 0
        let total = item.price + optionsPrice

        try {
            const payload = {
                name: item.name,
                product_id: item.id,
                product_type: item.table,
                size,
                options: JSON.stringify(options ?? {}),
                quantity: 1,
                price: total
            }

            const res = await fetch('/api/cart', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            })

            if (res.status === 401) {
               window.location.href='/login'
               return
            }

            if (!res.ok) throw new Error('Faied to add items to cart!')
            setAdded(true)

        } catch(error) {
            console.log(error)
            setAdded(false)

        } finally {
            setLoading(false)
        }
    }


    return (
        <button
            type='button'
            onClick={handleAddToCart}
            disabled={loading || added}
            className={`mt-4 w-full py-3 rounded tracking-wider font-semibold text-black transition 
                ${added ? 'bg-gray-600 text-pink-400 cursor-not-allowed' : 'border-2 rounded-3xl border-pink-400 hover:bg-pink-300 hover:text-white'}`}
        >
            {added ? 'Added To Cart' : loading ? 'Adding...' : 'Add To Cart'}
        </button>
    )
}