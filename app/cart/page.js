'use client'

import { useState, useEffect } from 'react'
import CartItem from '@/components/CartItem'
import Image from 'next/image'

export default function Cart(){
    const [cartItems, setCartItems] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
   
    //fetch cart once on mount
    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true)
            setError(null)

            // fetch cart items with new access token
            const res = await fetch('/api/cart',{credentials: 'include'})
            if (res.status === 200) {
                const data = await res.json()
                setCartItems(data)
            }else if(res.status === 401) {
                setError('Please loggin to view your items in cart!')
            }else {
                setError('Failed to fetch items in cart!')
            }

            setLoading(false)
        }
        fetchCartItems()
    }, [])

    return (
        <div className='mx-auto max-w-2xl py-8 px-4 mb-100'>
            <h1 className='text-3xl text-pink-500 text-center font-serif font-bold mb-8'>Your Items</h1>
            {loading && (
                <div className='flex justify-center items-center'>
                    <Image src='/loading1.png' alt='Loading' width={80} height={80}/>
                </div>
            )}

            {error && (
                <p className='text-red-500 text-center'>{error}</p>
            )}
            
            {!loading && !error && cartItems.length === 0 && (
                <p className='text-gray-500'>You haven't added to your cart yet.</p>
            )}

            {!loading && !error && cartItems.length > 0 && (
                <div className='grid gap-6'>
                    {cartItems.map(item => (
                        <CartItem key={item.id} item={item}/>
                    ))}
                </div>
            )}
        </div>
    )
}