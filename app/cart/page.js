'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Cart(){
    const [cartItems, setCartItems] = useState([])
    const router = useRouter()

    //fetch cart once on mount
    useEffect(() => {
        fetch('/api/cart')
            .then(res => {
                if (res.status === 401){
                    router.push('/login')
                    return null
                }
                return res.json()
            })
            .then(data => {
                if (data) setCartItems(data)
            })
            .catch(console.error)
    }, [router])

    const removeFromCart = async (productId) => {
        const res = await fetch('./api/cart',{  
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({product_id: productId})
        })
        
        if (res.ok){
            setCartItems(prev => prev.filter(i=>i.product_id !== productId))
        }
    }

    return (
        <div>
            {cartItems.map(item => (
                <div key={item.id}>
                    Product: {item.product_id}, Quanity: {item.quantity}
                    <button onClick={() => removeFromCart(item.product_id)}>Remove</button>
                </div>
            ))}
        </div>
    )
}