'use client'
import { useState } from "react"
import SizeOptions from "./SizeOptions.js"
import ToppingSelector from "./ToppingSelector.js"
import AddToCart from './AddToCart.js'
import AddFavorite from './AddFavorite.js'

export default function ProductConfiguration({item}){
    const hasSizeOptions = item.table !== 'foods'        // True if table is 'drinks'

    const [size, setSize] = useState(null)
    const [options, setOptions] = useState([])

    return (
        <>
            <div className={`grid gap-6 ${hasSizeOptions? 'grid-cols-1 md:grid-cols-[220px_1fr]' : 'grid-cols-1'}`}>
                {hasSizeOptions && (
                    <SizeOptions
                        item={item}
                        value={size}
                        onChange={setSize}
                    />
                )}
            </div>

            <div className={!hasSizeOptions ? 'mx-auto max-w-md' : ''}>
                <ToppingSelector
                    item={item}
                    value={options}
                    onChange={setOptions}
                />
            </div>
            <div className='flex gap-5 pt-5'>
                <AddToCart
                    item={item}
                    size={size}
                    options={options}
                />

               <AddFavorite
                    item={item}
                    size={size}
                    options={options}
               />
            </div>
        </>
    )
}

/*
FLOW:
1. User select  size/ options -> ProductConfiguration holds state
2. User click Add To Cart -> handleAddToCart() is called
3. payload with all selected info it sent to POST /api/cart
4. Supabase inserts one row with payload
5. The tbale must have the column for this to succeed

ANALOGY:
SizeOptions & ToppingSelector  = input device
ProductConfiguration = controller/ brain
OrderButton & AddFavorite = actions. (they only current values/states to act correctly)
 */