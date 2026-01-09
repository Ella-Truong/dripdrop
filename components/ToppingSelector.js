'use client'

import { useState } from 'react'

export default function ToppingSelector({item, value=[], onChange}){
    let options = []

    if (item.table === 'drinks'){
        options = item.toppings ?? []
    }
    if(item.table === 'foods'){
        options = item.options || []
    }

    if (!options.length) return null 

    const handleToggle = (option) => {
        const exists = value.some(o => o.name === option.name)

        const updated = exists ? value.filter(o => o.name !== option.name) : [...value, option]
        
        onChange(updated)
    }

    return (
        <div className = 'space-y-2 pt-8'>
            <h2 className='text-lg font-semibold mb-2'>Customize your item</h2>

            {options.map(opt => {
                const isSelected = value.some(o => o.name === opt.name)

                return (
                    <div key = {opt.name} className='flex justify-between items-center border rounded px-3 py-2'>
                        <div>
                            {opt.name} {opt.price ? `$${opt.price}` : ''}
                        </div>
                        <button 
                            type='button'
                            onClick = {() => handleToggle(opt)}
                            className = {`w-8 h-8 flex items-center justify-center rounded font-bold text-black transition 
                                ${isSelected ? 'bg-pink-300' : ''}`}
                        >
                            {isSelected ? '-' : '+'}
                        </button>
                    </div>
                )
            })}     
        </div>
    )
}