import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
    return (
        <section className="w-full h-full">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/bg10.jpg"
                    alt="Cozy Holiday"
                    fill
                    className="object-cover animate-fadeInUp "
                    priority
                />
            </div>

            {/* Soft overlay for contrast */}
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-2xl mx-auto pt-70 px-6 text-center">
                {/* Glowy pastel pink headline with fade-in-up */}
                <p className="text-3xl font-serif sm:text-3xl font-bold tracking-wider mb-10
                              text-pink-200 drop-shadow-[0_0_20px_rgba(255,182,193,0.8)] 
                              animate-fadeInUp">
                    ✨ It's a great day for coffee ✨
                </p>

                {/* Transparent water-drop button with glow and fade-in-up */}
                <Link 
                    href="/menu"
                    className="px-8 py-2 text-base font-serif font-extrabold tracking-wider rounded-full border-2 border-pink-400 text-[#32130f] 
                               bg-white/40 shadow-[0_6px_12px_rgba(236,72,153,0.25)] backdrop-blur-sm
                               transition-all duration-300 ease-out hover:bg-pink-400 hover:text-white 
                               hover:shadow-[0_10px_25px_rgba(236,72,153,0.45)]
                               "
                >
                    Start Order
                </Link>
            </div>
        </section>
    )
}


