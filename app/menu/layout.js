import SideBarMenu from "@/components/SideBarMenu";
import { getCategories } from "@/lib/queries/getCategories";

export default async function MenuLayout({children}) {
    const categories = await getCategories()

    return (
        <div className = 'flex h-[calc(100vh-64px-64px)] w-full gap-4 p-10'>
            <aside className="w-60 flex-shrink-0 bg-gray-100">
                <SideBarMenu categories={categories}/>
            </aside>
            <main className="flex-1 w-full">
                <div className='h-full w-full p-3'>
                    {children}
                </div>
            </main>
        </div>
    )
}