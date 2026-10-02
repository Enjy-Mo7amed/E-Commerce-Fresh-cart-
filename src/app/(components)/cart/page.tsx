import { GetLoggedUserCart } from '@/api/cartApi/GetLoggedUserCart'
import Link from 'next/link';
import { FaBagShopping, FaCartShopping } from 'react-icons/fa6';
import { CartType } from '@/types/GetLoggedUserCart.types';
import { FaBoxOpen, FaCheck, FaLock, FaLongArrowAltRight, FaShieldAlt, FaTag, FaTruck } from 'react-icons/fa';
import RemoveCartBtn from '@/app/_components/RemoveCartBtn/RemoveCartBtn';
import ClearCartBtn from '../../_components/clearCartBtn/clearCartBtn';
import UpdateCart from '@/app/_components/updateCart/updateCart';

export default async function Cart() {
  const data = await GetLoggedUserCart()
  return (
    <>
      <title>Cart</title>
      <div className="bg-gray-50 min-h-screen py-8">
        {!data?.data?.products || data.data.products.length == 0 ?
          <div>
            <div className="min-h-[60vh] flex items-center justify-center px-4">
              <div className="max-w-md text-center">
                <div className="relative mb-8">
                  <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-200 to-gray-100 flex items-center justify-center mx-auto">
                    <FaBoxOpen className="text-5xl text-gray-300" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-100 rounded-full blur-md" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Your cart is empty
                </h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  Looks like you haven't added anything to your cart yet.
                  <br />
                  Start exploring our products!
                </p>

                <Link href={'/'} className='flex justify-center'>
                  <button className="cursor-pointer flex relative  justify-center shadow-sm  items-center px-8 py-4 overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group">
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                      <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                    </span>
                    <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                      <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                    <span className="relative w-full flex items-center gap-2  font-semibold text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-white"> Start Shoping<FaLongArrowAltRight /></span>
                  </button>
                </Link>

                <div className="mt-12 pt-8 border-t border-gray-100">
                  <p className="text-sm text-gray-400 mb-4">Popular Categories</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Link
                      className="px-4 py-2 bg-gray-100 hover:bg-[#7f553969] hover:text-[#7f5539] text-gray-600 rounded-full text-sm font-medium transition-colors"
                      href="/categories"
                    >
                      Electronics
                    </Link>
                    <Link
                      className="px-4 py-2 bg-gray-100 hover:bg-[#7f553969] hover:text-[#7f5539] text-gray-600 rounded-full text-sm font-medium transition-colors"
                      href="/categories"
                    >
                      Fashion
                    </Link>
                    <Link
                      className="px-4 py-2 bg-gray-100 hover:bg-[#7f553969] hover:text-[#7f5539] text-gray-600 rounded-full text-sm font-medium transition-colors"
                      href="/categories"
                    >
                      Home
                    </Link>
                    <Link
                      className="px-4 py-2 bg-gray-100 hover:bg-[#7f553969] hover:text-[#7f5539] text-gray-600 rounded-full text-sm font-medium transition-colors"
                      href="/categories"
                    >
                      Beauty
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          <div className="container">
            <div className="mb-8">
              <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link className="hover:text-[#7f5539] transition" href="/">
                  Home
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">Shopping Cart</span>
              </nav>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <span className="bg-linear-to-r from-[#7f5539] to-[#5b3d29] text-white w-12 h-12 rounded-xl flex items-center justify-center">
                      <FaCartShopping />
                    </span>
                    Shopping Cart
                  </h1>
                  <p className="text-gray-500 mt-2">
                    You have <span className="font-semibold text-[#7f5539]">{data.numOfCartItems} items</span> in your cart
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {data?.data?.products.map((product: CartType) =>
                  <div key={product._id} className="space-y-4 mb-4">
                    <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300">
                      <div className="p-4 sm:p-5">
                        <div className="flex gap-4 sm:gap-6">
                          <Link className="relative shrink-0 group" href={`/products/${product._id}`}>
                            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 overflow-hidden">
                              <img
                                alt={product.product.title}
                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                                src={product.product.imageCover}
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-[#7f5539] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <FaCheck />In Stock
                            </div>
                          </Link>
                          <div className="flex-1 flex flex-col">
                            <div className="mb-3">
                              <Link className="group/title" href={`/products/${product.product._id}`}>
                                <h3 className="font-semibold text-gray-900 group-hover/title:text-[#7f5539] transition-colors leading-relaxed text-base sm:text-lg">
                                  {product.product.title}
                                </h3>
                              </Link>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="inline-block px-2.5 py-1 bg-linear-to-r from-[#7f553969] to-[#7f5539a8] text-primary-700 text-xs font-medium rounded-full">
                                  {product.product.category.name}
                                </span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500">SKU: 5CA0AD</span>
                              </div>
                            </div>

                            <div className="mb-4">
                              <div className="flex items-baseline gap-2">
                                <span className="text-[#7f5539] font-bold text-lg">{product.price.toLocaleString()} EGP</span>
                                <span className="text-xs text-gray-400">per unit</span>
                              </div>
                            </div>

                            <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                              <div className="flex items-center">
                                <UpdateCart id={product.product.id} count={product.count} />
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <p className="text-xs text-gray-400 mb-0.5">Total</p>
                                  <p className="text-xl font-bold text-gray-900">
                                    {(product.count * product.price).toLocaleString()} <span className="text-sm font-medium text-gray-400">EGP</span>
                                  </p>
                                </div>
                                <RemoveCartBtn productTitle={product.product.title} id={product.product.id} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                  <Link className="text-[#7f5539] hover:text-primary-700 font-medium text-sm flex items-center gap-2" href="/">
                    <span>←</span> Continue Shopping
                  </Link>
                  <ClearCartBtn />
                </div>
              </div>

              {/* =================ا(Order Summary) ================= */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
                  <div className="bg-linear-to-r from-[#7f5539] to-[#7f5539] px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FaBagShopping />
                      Order Summary
                    </h2>
                    <p className="text-primary-100 text-sm mt-1">{data.numOfCartItems} items in your cart</p>
                  </div>
                  <div className="p-6 space-y-5">
                    <div className="bg-linear-to-r from-[#7f55393a] to-[#7f553919] rounded-xl p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full text-[#7f5539] bg-[#7f553969] flex items-center justify-center">
                        <FaTruck />
                      </div>
                      <div>
                        <p className="font-semibold text-[#5b3d29]">Free Shipping!</p>
                        <p className="text-sm text-[#7f5539]">You qualify for free delivery</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium text-gray-900">{data.data.totalCartPrice.toLocaleString()} EGP</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="font-medium text-[#7f5539]">FREE</span>
                      </div>
                      <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
                        <div className="flex justify-between items-baseline">
                          <span className="text-gray-900 font-semibold">Total</span>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-gray-900">{data.data.totalCartPrice.toLocaleString()}</span>
                            <span className="text-sm text-gray-500 ml-1">EGP</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-md text-gray-600 hover:border-[#7f5539a3] hover:text-[#7f5539] hover:bg-[#7f553926] transition-all cursor-pointer">
                      <FaTag />
                      <span className="text-sm font-medium">Apply Promo Code</span>
                    </button>
                    <Link
                      href={`/checkout/${data.cartId}`}
                    >
                      <button className="cursor-pointer flex relative w-full justify-center shadow-sm  items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group">
                        <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                          <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                        </span>
                        <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                          <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                        </span>
                        <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                        <span className="relative w-full flex items-center justify-center gap-2  font-semibold text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-white"><FaLock />
                          <span>Secure Checkout</span></span>
                      </button>
                    </Link>

                    <div className="flex items-center justify-center gap-4 py-3">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <FaShieldAlt className="w-4 h-4 text-[#7f5539]" />
                        <span>Secure Payment</span>
                      </div>
                      <div className="w-px h-4 bg-gray-200" />
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <FaTruck className="w-4 h-4 text-blue-500" />
                        <span>Fast Delivery</span>
                      </div>
                    </div>
                    <Link className="block text-center text-[#7f5539] hover:text-[#5b3d29] text-sm font-medium py-2" href="/">
                      ← Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}
