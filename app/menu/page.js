import CenterMenu from '../../components/CenterMenu.js'
import { getCategories } from '@/lib/queries/getCategories.js'

export const metadata = {
    title: 'Menu'
}

export default async function MenuPage() {
    const categories = await getCategories()

    return (
        <div className='min-h-screen flex flex-col'>
            <div className="animate-fadeInDown flex-1 px-6">
                <CenterMenu categories={categories} />
            </div>
        </div>
    )
}


// This will display when users are at /menu