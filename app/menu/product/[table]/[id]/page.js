import ProductHeader from '@/components/ProductHeader'
import ProductConfiguration from '@/components/ProductConfiguration'
import  {getItemsById}  from '@/lib/queries/getItemsById'

export default async function ProductPage({params}){
    const {table, id} = await params
    const item = await getItemsById(table, id)

    if (!item) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-600">
                Item not found
            </div>
        )
    }
    return (
        <div className='max-w-5xl mx-auto p-6 animate-fadeInUp'>
            <ProductHeader item={item}/>
            <ProductConfiguration item={item}/>
        </div>
    )
}