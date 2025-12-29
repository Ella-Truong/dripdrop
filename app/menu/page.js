import CenterMenu from '../../components/CenterMenu.js'
import { getCategories } from '@/lib/queries/getCategories.js'

export default async function MenuPage() {
    const categories = await getCategories()

    return (
        <div className="animate-fadeInDown px-6 py-8">
            <CenterMenu categories={categories} />
        </div>
    )
}


// This will display when users are at /menu