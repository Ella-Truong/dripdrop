import { getItemsInfo } from '@/lib/queries/getItemsInfo'
import Image from 'next/image'
import Link from 'next/link'

export default async function CenterMenu({
  categories,
  table=null,
  selectedCategory=null
}) {

  //CASE 1: OVERVIEW PAGE (/menu)
  if (!selectedCategory){
    return (
      <div className='space-y-10 flex flex-col w-full h-full pt-8 mb-80'>
        {Object.entries(categories).map(([tableName, categoryList])=>(
          <div key={tableName}>
            <h1 className = 'text-2xl font-bold mb-4 capitalize border-b-1 border-gray-300 pb-2'>{tableName}</h1>
            <div className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {categoryList.map(category => (
                <Link key={category} href={`/menu/${tableName.toLocaleLowerCase()}/${encodeURIComponent(category)}`} className = 'flex flex-col items-center rounded-lg hover:shadow-lg cursor-pointer w-full'>
                  <div className='w-28 h-28 relative'>
                    <Image 
                      src = {tableName === 'Drinks'? '/drink.avif' : '/snack5.webp'}
                      alt={category}
                      fill
                      className='object-cover rounded-full'
                  />
                  </div>
                  <h3 className='text-left mt-2 pl-3 font-semibold capitalize line-clamp-2'>{category}</h3>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // CASE 2: CATEGORY PAGE (/menu/[table]/[category])
  const items = await getItemsInfo({
    table,
    category: selectedCategory
  })

  return (
    <div className='w-full h-full flex flex-col mb-80'>
      <h1 className='text-2xl font-bold mb-5'>{decodeURIComponent(selectedCategory)}</h1>
      <div className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {items.map(item => (
        <Link key = {item.id} href={`/menu/product/${table}/${item.id}`} className = 'flex flex-col items-center justify-start rounded-lg hover:shadow-lg transition shadow-sm h-50 w-full p-4'>
          <div className='relative w-28 h-28'>
            <Image
              src={table === 'drinks' ? '/drink.avif' : '/snack5.webp'}
              alt={item.name}
              fill
              className = 'object-cover rounded-full'
            />
          </div>
          <h3 className='text-center pb-3 mt-2 font-semibold line-clamp-2 h-13'>{item.name}</h3>
        </Link>
      ))}
    </div>
  </div>
  )
}
 