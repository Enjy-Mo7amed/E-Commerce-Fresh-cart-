import { AllProducts } from '@/api/allProducts'
import Link from 'next/link';
import { FaBoxOpen } from "react-icons/fa";
import AllProductsDesign from '@/app/_components/allProducts/allProducts';
import { GetLoggedUserWishlist } from '@/api/wishlistApi/Getloggedwishlist';
import { ProductType } from '@/types/allProducts.types';

export default async function Products() {
  const [data, wishlist] = await Promise.all([AllProducts(), GetLoggedUserWishlist()])
  const wishlistProductIds: string[] = wishlist?.data?.map((item: ProductType) => item._id || item.id) ?? []
  return (
    <>
      <title>Products</title>
      <div className="bg-linear-to-br from-[#5b3d29]  via-[#7f5539a6] to-[#7f5539c1] text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <nav className='flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap'>
            <Link href='/' className='hover:text-white transition-colors'>Home</Link>
            <span className='text-white/40'>/</span>
            <span className='text-white font-medium'>All Products </span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 text-3xl h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <FaBoxOpen />
            </div>
            <div>
              <h1 className='text-3xl sm:text-4xl font-bold tracking-tight'>All Products</h1>
              <p className='text-white/80 mt-1'>Explore our complete product collection</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-8">
        <div className="mb-6 text-sm font-medium text-gray-500">Showing {data.length} Products</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          <AllProductsDesign data={data} wishlistProductIds={wishlistProductIds} />
        </div>
      </div>
    </>
  )
}
