import { GetLoggedUserCart } from '@/api/cartApi/GetLoggedUserCart'
import { GetLoggedUserWishlist } from '@/api/wishlistApi/Getloggedwishlist'
import AddCartBtn from '@/app/_components/addCartBtn/addCartBtn'
import RemoveWishlistBtn from '@/app/_components/removeWishlistBtn/removeWishlistBtn'
import { ProductType } from '@/types/allProducts.types'
import { CartType } from '@/types/GetLoggedUserCart.types'
import Link from 'next/link'
import React from 'react'
import { FaCheck, FaHeart, FaLongArrowAltRight, FaShoppingCart } from 'react-icons/fa'

export default async function WishList() {
  const data = await GetLoggedUserWishlist()
  const cartData = await GetLoggedUserCart()
  const cartProductIds: string[] = cartData?.data?.products?.map((item: CartType) => item.product._id || item.product.id) || []
  return (
    <>
      <title>WishList</title>
      <div className="min-h-screen bg-gray-50/50">
        {!data?.data || data.data.length == 0 ?
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-sm mx-auto text-center">
              <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <FaHeart className='text-3xl text-gray-400' />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Browse products and save your favorites here.
              </p>
              <div className="flex flex-col gap-3">
                <Link href={'/'} className='flex justify-center'>
                  <button className="cursor-pointer flex relative  justify-center shadow-sm  items-center px-8 py-4 overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group">
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                      <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                    </span>
                    <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                      <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                    <span className="relative w-full flex items-center gap-2  font-semibold text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-white"> Browse Products<FaLongArrowAltRight /></span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          :
          <>
            <div className="bg-white border-b border-gray-100">
              <div className="container mx-auto px-4 py-8">
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Link className="hover:text-primary-600 transition-colors" href="/">
                    Home
                  </Link>
                  <span>
                    /
                  </span>
                  <span className="text-gray-900 font-medium">
                    Wishlist
                  </span>
                </nav>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                      <FaHeart className='text-xl text-red-500' />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        My Wishlist
                      </h1>
                      <p className="text-gray-500 text-sm">
                        {data.count} item saved
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container py-10">
              {data.data.map((product: ProductType) =>
                <div key={product.id} className="bg-white mb-5 rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
                    <div className="col-span-6">
                      Product
                    </div>
                    <div className="col-span-2 text-center">
                      Price
                    </div>
                    <div className="col-span-2 text-center">
                      Status
                    </div>
                    <div className="col-span-2 text-center">
                      Actions
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors">
                      <div className="md:col-span-6 flex items-center gap-4">
                        <Link className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0" href={`/products/${product.id}`}>
                          <img alt={product.title} className="w-full h-full object-contain p-2" src={product.imageCover} />
                        </Link>
                        <div className="min-w-0">
                          <Link className="font-medium text-gray-900 hover:text-[#7f5539] transition-colors line-clamp-2" href={`/products/${product.id}`}>
                            {product.title}
                          </Link>
                          <p className="text-sm text-gray-400 mt-1">
                            {product.category.name}
                          </p>
                        </div>
                      </div>
                      <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                        <span className="md:hidden text-sm text-gray-500">
                          Price:
                        </span>
                        <div className="text-right md:text-center">
                          <div className="font-semibold text-gray-900">
                            {product.price} EGP
                          </div>
                          {product.priceAfterDiscount &&
                            <div className="text-sm text-gray-400 line-through">
                              {product.priceAfterDiscount} EGP
                            </div>}
                        </div>
                      </div>
                      <div className="md:col-span-2 flex md:justify-center">
                        <span className="md:hidden text-sm text-gray-500 mr-2">
                          Status:
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          In Stock
                        </span>
                      </div>
                      <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
                        {cartProductIds.includes(product.id) ? (
                          <Link href={'/cart'} className="w-full">
                            <button className="cursor-pointer flex relative justify-center shadow-sm items-center w-full py-2 px-1 overflow-hidden font-medium transition-all bg-[#B68E0C] rounded-md group">
                              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                              </span>
                              <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                              </span>
                              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                              <span className="relative w-full flex items-center justify-center gap-2 font-semibold text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                                <FaCheck /> View Cart
                              </span>
                            </button>
                          </Link>
                        ) : (
                          <AddCartBtn id={product.id} className="w-full py-2 px-1 cursor-pointer flex relative justify-center shadow-sm items-center overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group">
                            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                            </span>
                            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                            </span>
                            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                            <span className="relative w-full flex justify-center items-center gap-1 font-medium text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                              <FaShoppingCart /> Add TO Cart
                            </span>
                          </AddCartBtn>
                        )}

                        <RemoveWishlistBtn id={product.id} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between">
                <Link className="text-gray-500 hover:text-[#7f5539] text-sm font-medium transition-colors" href="/products">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </>
        }
      </div>
    </>
  )
}
