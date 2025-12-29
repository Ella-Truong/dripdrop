import CenterMenu from "@/components/CenterMenu";
import { getCategories } from "@/lib/queries/getCategories";

export default async function CategoryPage({ params }) {
    const { table, category } = await params
    const categories = await getCategories()

    return (
        <div className="animate-fadeInUp px-6 py-8">
            <CenterMenu 
                categories={categories} 
                table={table} 
                selectedCategory={category} 
            />
        </div>
    )
}
