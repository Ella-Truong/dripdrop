

'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    const footerItems = [
        { name: 'About Us', href: 'https://www.linkedin.com/in/ellatruong' },
        { name: 'Contact', href: 'https://www.linkedin.com/in/ellatruong' }
    ]

    return (
        <div className="fixed bottom-0 w-full bg-white shadow-md z-50 pt-5 pb-10 flex flex-col space-y-4 border-t-2 border-pink-300 animate-fadeInUp">
            
            {/* Section 1: Social Icons */}
            <div className="flex justify-center gap-5 mb-4 items-center">
                <Link href='https://www.linkedin.com/in/ellatruong' target='_blank' className='rounded hover:bg-pink-500 animate-pulse'><Image src='/pink-linkedin.png' width={28} height={28} alt='LinkedIn'/></Link>
                <Image src='/spotify.png' width={28} height={28} alt='Spotify' />
                <Image src='/facebook.png' width={28} height={28} alt='Facebook' />
                <Link href='https://github.com/Ella-Truong' target='_black' className='rounded hover:bg-pink-500 animate-pulse'><Image src='/pink-github.png' width={28} height={28} alt='Github'/></Link>
                <Image src='/pinterest.png' width={28} height={28} alt='Pinterest' />
                <Image src='/tiktok.png' width={28} height={28} alt='TikTok' />
                <Link href='https://www.instagram.com/imella.95' target='_blank' className=' rounded hover:bg-pink-500 animate-pulse'><Image src='/pink-insta.png' width={28} height={28} alt='Instagram'/></Link>
            </div>

            {/* Section 2: H3 Content */}
            <div className="text-center">
                <h3 className="text-base font-semibold font-serif mb-3">Follow me for latest updates!</h3>
                <div className='flex flex-col no-gap items-center justify-center'>
                    <Link href='mailto:ellatruong95@gmail.com' className='flex items-center gap-2'>
                        <Image
                            src='/email.png'
                            width={15}
                            height={15}
                            alt='My Email'
                        />
                        <h3 className='text-sm font-serif text-gray-600 hover:text-pink-400'>ellatruong95@gmail.com</h3>
                    </Link>
                    <Link href='tel:+17149024728' className='flex items-center gap-2'>
                        <Image
                            src='/cellphone.png'
                            width={15}
                            height={15}
                            alt='My Phone Number'
                        />
                        <h3 className='text-sm font-serif text-gray-600 hover:text-pink-400'>714-902-4728</h3>
                    </Link>
                </div>
                <footer className="text-center text-sm text-gray-500 mt-5"> © {new Date().getFullYear()} Ella Truong. ALL RIGHTS RESERVED</footer>
            </div>
        </div>
    )
}
