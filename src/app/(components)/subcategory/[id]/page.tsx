import { SpecificSubCategory } from '@/api/categoryApi/GetspecificSubCategory.api'
import { GetProductsBySubCategory } from '@/api/GetProductsBySubCategory'
import ProductCard from '@/app/_components/productCard/productCard'
import { ProductType } from '@/types/allProducts.types'
import Link from 'next/link'
import { FaBoxOpen, FaFilter, FaFolderOpen, FaRegFolderOpen } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { GetLoggedUserWishlist } from '@/api/wishlistApi/Getloggedwishlist'
import { notFound } from 'next/navigation'

export default async function SubCategories({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const [subCategoryResponse, products, wishlist] = await Promise.all([SpecificSubCategory(id), GetProductsBySubCategory(id), GetLoggedUserWishlist()])
    if (!subCategoryResponse) notFound()
    const { data } = subCategoryResponse
    const wishlistProductIds: string[] = wishlist?.data?.map((item: ProductType) => item._id || item.id) ?? []

    return (
        <>
            <div className="bg-linear-to-br from-[#5b3d29]  via-[#7f5539a6] to-[#7f5539c1] text-white">
                <div className="container mx-auto px-4 py-10 sm:py-14">
                    <nav className='flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap'>
                        <Link href='/' className='hover:text-white transition-colors'>Home</Link>
                        <span className='text-white/40'>/</span>
                        <Link href='/categories' className='hover:text-white transition-colors'>Categories</Link>
                        <span className='text-white/40'>/</span>
                        <span className='text-white font-medium'>{data.name}</span>
                    </nav>
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 overflow-hidden">
                            <FaFolderOpen className='text-white text-3xl' />
                        </div>
                        <div>
                            <h1 className='text-3xl sm:text-4xl font-bold tracking-tight'>{data.name}</h1>
                            <p className='text-white/80 mt-1'>Browse products in this subcategory</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center gap-3 flex-wrap">
                    <span className="flex items-center gap-2 text-sm text-gray-600">
                        <FaFilter />
                        Active Filters:
                    </span>

                    <Link
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-[#7f5539] text-sm font-medium hover:bg-amber-200 transition-colors"
                        href="/categories"
                    >
                        <FaRegFolderOpen className='text-xs' />
                        {data.name}
                        <FaXmark className='text-xs' />
                    </Link>

                    <Link
                        className="text-sm text-gray-500 hover:text-gray-700 underline"
                        href="/categories"
                    >
                        Clear all
                    </Link>
                </div>

                <div className="mb-6 text-sm font-medium text-gray-500">
                    Showing {products?.length ?? 0} products
                </div>

                {products && products.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                        {products.map((product: ProductType) => (
                            <ProductCard key={product._id} post={product} wishlistProductIds={wishlistProductIds} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                            <FaBoxOpen className='text-3xl text-gray-400' />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No Products Found</h3>
                        <p className="text-gray-500 mb-6">
                            No products match this subcategory.
                        </p>
                        <Link href={'/products'} className="flex items-center justify-center">
                            <button className="cursor-pointer flex relative justify-center shadow-sm items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group">
                                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                </span>
                                <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                </span>
                                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                                <span className="relative w-full flex items-center justify-center gap-2 font-semibold text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-white">View All Products</span>
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}
