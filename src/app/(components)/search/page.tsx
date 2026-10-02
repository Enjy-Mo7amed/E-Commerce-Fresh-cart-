import { AllProducts } from "@/api/allProducts"
import { AllCategories } from "@/api/categoryApi/allCategory"
import { GetAllBrands } from "@/api/brandsApi/GetAllBrands.api"
import AllProductsDesign from "@/app/_components/allProducts/allProducts"
import SearchControls, { ResultToolbar, SearchHeader } from "@/app/_components/searchControls/searchControls"
import type { ProductType } from "@/types/allProducts.types"
import { FaSearch } from "react-icons/fa"
import { GetLoggedUserWishlist } from "@/api/wishlistApi/Getloggedwishlist"

export const dynamic = "force-dynamic"

type SearchParams = { q?: string; category?: string | string[]; brand?: string | string[]; min?: string; max?: string; sort?: string; view?: string }
const values = (value?: string | string[]) => value ? (Array.isArray(value) ? value : [value]) : []

export default async function SearchPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  const [products, categories, brands, wishlist] = await Promise.all([AllProducts(), AllCategories(), GetAllBrands(), GetLoggedUserWishlist()])
  const wishlistProductIds: string[] = wishlist?.data?.map((item: ProductType) => item._id || item.id) ?? []
  const term = params.q?.trim().toLowerCase() ?? ""
  const categoryIds = values(params.category); const brandIds = values(params.brand)
  const min = Number(params.min) || 0; const max = Number(params.max) || Infinity
  const filtered = (products as ProductType[]).filter((product) => {
    const matchesText = !term || [product.title, product.category?.name, product.brand?.name].some((value) => value?.toLowerCase().includes(term))
    return matchesText && (!categoryIds.length || categoryIds.includes(product.category?._id)) && (!brandIds.length || brandIds.includes(product.brand?._id)) && product.price >= min && product.price <= max
  }).sort((a, b) => params.sort === "price" ? a.price - b.price : params.sort === "-price" ? b.price - a.price : params.sort === "rating" ? b.ratingsAverage - a.ratingsAverage : params.sort === "title" ? a.title.localeCompare(b.title) : params.sort === "-title" ? b.title.localeCompare(a.title) : 0)
  const list = params.view === "list"
  return <div className="min-h-screen bg-[#fbfcfd]"><SearchHeader /><div className="container flex gap-8 py-8"><SearchControls categories={categories} brands={brands} /><main className="min-w-0 flex-1"><ResultToolbar categories={categories} brands={brands} /><p className="mb-5 text-sm text-gray-500">Showing <span className="font-semibold text-[#7f5539]">{filtered.length}</span> product{filtered.length === 1 ? "" : "s"}{term && <> for “{params.q}”</>}</p>{filtered.length ? <div className={list ? "search-list grid grid-cols-1 gap-5" : "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"}><AllProductsDesign data={filtered} wishlistProductIds={wishlistProductIds} /></div> : <div className="rounded-2xl border border-gray-100 bg-white py-24 text-center"><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#7f553912] text-2xl text-[#7f5539]"><FaSearch /></div><h1 className="text-xl font-bold text-gray-800">No products found</h1><p className="mt-2 text-gray-500">Try changing the search or filters to find what you need.</p></div>}</main></div></div>
}
