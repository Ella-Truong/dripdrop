'use client'

import {useState} from 'react'
import Image from 'next/image'

export default function CartItem({item}) {
    const [loading, setLoading] = useState(false)
    const [removed, setRemoved] = useState(false)
    const [favorited, setFavorited] = useState(false)

    // any item in your cart has a feature of being removed
    const handleRemove = async () => {
        if (loading) return
        setLoading(true)

        try {
            const res = await fetch('/api/cart',{
                method:'DELETE',
                headers:{'Content-Type':'application/jon'},
                body: JSON.stringify({id: item.id}),
                credentials: 'include'
            })

            if(!res.ok) throw new Error('Failed to remove item.')

            setRemoved(true)
        }catch (error) {
            console.error(error)
            alert('Failed to remove favorite.')

        } finally {
            setLoading(false)
        }
    }

    if (removed) return null

    let optionArray = []

if (item?.options) {
  try {
    // if it's a string, parse it
    if (typeof item.options === 'string') {
      optionArray = JSON.parse(item.options)
    } else if (typeof item.options === 'object') {
      // already object
      optionArray = item.options
    }

    // ensure it's an array
    if (!Array.isArray(optionArray)) optionArray = []
  } catch (error) {
    console.error('Failed to parse options:', error)
    optionArray = []
  }
}




    // and a feature of adding to Favorites
    const handleAddFavorite = async () => {
        if(loading || favorited) return
        setFavorited(true)

        try{
            const res = await fetch('/api/favorites',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    user_id: item.user_id,
                    name: item.name,
                    product_id: item.product_id,
                    product_type: item.product_type,
                    size: item.size,
                    options: item.options ?? {}
                })
            })


            if(res.ok){
                setFavorited(!favorited)
            }else{
                alert('Item is added to your cart!')
            }
        }catch (err){
            console.error(err)
            alert('Failed to add item to favorite')
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className='flexh-40 gap-4 p-4 border-2 border-pink-500 rounded-2xl shadow-sm animate-fadeInUp'>
        {/* Item Image + Info */}
            <div className='flex items-center gap-4'>
               <Image
                    src={item.product_type === 'drinks' ? '/drink.avif' : '/snack5.webp'}
                    alt={item.name}
                    width={64}
                    height={64}
                    className='object-cover rounded'
                />
                <div>
                    <h3 className='font-semibold'>{item.name}</h3>
                    {item.size && <p className='text-sm text-gray-500'>Size: {item.size}</p>}
                    {optionArray.length > 0 && (
                        <p className='text-sm text-gray-500'>
                            {optionArray.map(opt => typeof opt === 'string' ? opt : opt.name).join(', ')}
                        </p>
                    )}
                    {item.price &&  item.quantity && (
                        <p className='text-base text-pink-500 font-bold'>
                            <span className='text-sm text-gray-500 font-semibold'>{`Qty: ${item.quantity} -`}</span> ${item.price.toFixed(2)}
                        </p>
                    )}
                </div>
            </div>

       {/* Buttons on top-right corner in one line */}
            <div className='absolute top-4 right-4 flex gap-2 items-center justify-center'>
                <button 
                    onClick={handleAddFavorite}
                    disabled={loading}
                    className='p-2 rounded-full'
                >
                    <Image
                        src={favorited ? '/pinkheart.png' : '/whiteheart.png'}
                        alt='Heart Icon'
                        width={24}
                        height={24}
                    />
                </button>
                <button
                    onClick={handleRemove}
                    disabled={loading}
                    className='w-5 h-5 rounded bg-gray-800 text-white flex items-center justify-center'
                >
                    -
                </button>
            </div>
        </div>
    )
}



