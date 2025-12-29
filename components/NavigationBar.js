'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function NavigationBar({ session }){
    const navItems = [
        {name:'Menu', href:'/menu'},
        {name:'Favorites', href:'/favorites'},
    ]

    return (
        <nav className = "bg-white shadow-md pt-4 pb-4 px-20 flex gap-5 items-center text-base text-black font-serif font-semibold border-b-2 border-pink-300 animate-fadeInDown">
            <Link href='/' className='flex items-center cursor-pointer pr-0 animate-pulse'>
                <Image
                    src='/logo1.png'
                    width={65}
                    height={60}
                    alt='Home'
                    priority
                />
            </Link>

            {navItems.map(item => (
                <Link 
                    key={item.name}
                    href={item.href}
                    className = 'px-3 py-1 rounded hover:text-[#436852] transition'
                >
                    {item.name}
                </Link>
            ))}

            <div className = 'ml-auto flex items-center gap-5'>
                <div className='flex no-gap items-center cursor-pointer'>
                    <Image
                        src='/location.png'
                        width={25}
                        height={25}
                        alt='location'
                    />
                    <h2 className='px-3 py-1 rounded hover:text-[#436852] hover:bg-pink-100 transition-all'>
                        Find a store
                    </h2>
                </div>
                {session?.user ? ( 
                    <span className = 'text-gray-700 font-medium'>{username}</span>
                ):(
                    <>
                        <Link 
                            href='/login' 
                            className = 'px-3 py-1 border-2 border-pink-300 rounded-3xl hover:text-[#436852] transition'
                        >
                            Sign in
                        </Link>
                        <Link
                            href='/signup'
                            className='px-3 py-1 border-2 border-pink-300 bg-pink-300 rounded-2xl hover:text-[#436852] transition'
                        >
                            Join now
                        </Link>
                    </>
                )}

                <Link href = {session?.user ? "/cart" : "/login"}>
                    <Image 
                        src='/coffee-bag2.png'
                        width={28}
                        height={28}
                        alt='Cart'
                    />
                </Link>
            </div>
        </nav>
    )
}