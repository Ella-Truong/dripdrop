// This component includes image + name + calories of the product
// image and name are returned from getItemInfo.js
// calories is returned from getItemDetails.js
import Image from 'next/image'

export default function ProductHeader({ item }) {
    const { name, calories, table } = item

    return (
        <div className="relative rounded-3xl overflow-hidden">
            {/* Pastel glass overlay */}
            <div className="absolute inset-0 
                bg-gradient-to-br from-pink-300/50 via-pink-200/20 to-pink-400/40
                backdrop-blur-md rounded-2xl 
                shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_20px_40px_rgba(236,72,153,0.35),0_0_50px_rgba(236,72,153,0.45)] 
                border border-pink-400/30 z-10">
            </div>
            {/* Content */}
            <div className="relative z-20 flex items-center justify-center gap-45 p-10">
                <div className="flex-shrink-0">
                    <Image
                        src={table === 'drinks' ? '/drink.avif' : '/snack5.webp'}
                        alt={name}
                        width={200}
                        height={200}
                        className="object-cover rounded-full border-2 border-pink-300"
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-pink-400">{name}</h2>
                    <span className="text-pink-400 mt-1">{calories} calories</span>
                </div>
            </div>
        </div>
    )
}


