import Link from 'next/link'

export default function SideBarMenu({categories}){
    if (!categories) return <div>No categories</div>
    return (
        <div className='w-60 pt-0 pl-10 bg-gray-100 h-screen overflow-y-auto'>
            {Object.keys(categories).map(name=>(
                <div key={name}>
                    <h3 className='font-bold mb-2 pl-10 pt-5 pb-5'>{name}</h3>
                    <ul className="list-none space-y-4">
                        {categories[name].map(cat => (
                            <li className='text-black pl-10' key={cat}>
                                <Link 
                                    href={`/menu/${name.toLocaleLowerCase()}/${encodeURIComponent(cat)}`} 
                                    className='block px-0 py-1 rounded-xl hover:text-black 
                                    hover:underline hover:underline-offset-7 hover:decoration-5 hover:decoration-pink-300
                                    transition-colors'
                                >
                                    {cat}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}