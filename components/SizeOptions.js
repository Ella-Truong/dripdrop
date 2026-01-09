import Image from 'next/image'

export default function SizeOptions({ item, value, onChange }) {
    const { size_options, table } = item

    if (table === 'foods' || !size_options) return null

    const sizeMap = {
        Tall: 50,
        Grande: 70,
        Venti: 90,
    }
    const DEFAULT_ZISE = 70

    return (
        <div className='flex gap-15 pt-10 items-center'>
            <h2 className='text-lg font-semibold'>Size Options</h2>

            {Object.entries(size_options).map(([sizeName, volume]) => {
                const imgSize = sizeMap[sizeName] ?? DEFAULT_ZISE
                const isSelected = value === sizeName

                return (
                    <button 
                        key={sizeName} 
                        type='button' 
                        onClick={()=>onChange(isSelected? null : sizeName)} 
                        className={`rounded p-3 flex items-center gap-4 transition 
                            ${isSelected? 'underline decoration-4 decoration-pink-300' : ''}`}
                    >
                        <Image
                            src="/coffee-size.png"
                            alt={sizeName}
                            width={imgSize}
                            height={imgSize}
                        />
                        <div className='text-left'>
                            <h3 className='font-medium'>{sizeName}</h3>
                            <span className='text-sm text-gray-600'>{volume}</span>
                        </div>
                    </button>
                )
            })}
        </div>
  )
}
