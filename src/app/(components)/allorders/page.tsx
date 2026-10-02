import { GetUserOrders } from '@/api/checkoutApi/getUserOrders'
import { myToken } from '@/utilities/myToken'
import { jwtDecode } from 'jwt-decode'
import Link from 'next/link'
import { FaBox, FaPhone, FaReceipt } from 'react-icons/fa'
import { FaBagShopping, FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import Image from 'next/image'
import { FaMoneyBill } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import { AllOrdersType, CartItem } from '../../../types/allOrders.types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { redirect } from 'next/navigation'

export default async function AllOrders() {
  const token = await myToken()
  if (!token) {
    redirect('/login')
    return
  }
  const decondedToken: { id?: string; _id?: string } = jwtDecode(token)
  const userId = decondedToken.id ?? decondedToken._id
  const response = userId ? await GetUserOrders(userId) : null
  const orders: AllOrdersType[] = Array.isArray(response)
    ? response
    : Array.isArray(response?.data)
      ? response.data
      : []

  return (
    <>
      <title>AllOrders</title>
      <div className="container py-8">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link className="hover:text-[#7f5539] transition" href="/">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">My Orders</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#7f553969] to-[#7f5539] flex items-center justify-center shadow-lg shadow-[#7f553969]/25">
                <FaBox className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Orders</h1>
                <p className="text-gray-500 text-sm mt-0.5">Track and manage your {orders.length} orders</p>
              </div>
            </div>
            <Link className="self-start sm:self-auto text-[#7f5539] hover:text-[#5b3d29] font-medium flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-amber-50 transition-all text-sm" href="/">
              <FaBagShopping className="text-xs" />
              Continue Shopping</Link>
          </div>
        </div>

        <div className="space-y-4">
          {orders.map((product: AllOrdersType) =>
            <Accordion key={product._id} >
              <AccordionItem className='has-data-open:border-[#7f5539] has-data-open:shadow-lg has-data-open:shadow-[#7f553969]  mb-4 rounded-2xl border transition-all duration-300 border-gray-100 shadow-sm has-data-closed:hover:shadow-md has-data-closed:hover:border-gray-200' value={product._id} >
                <div className="bg-white  overflow-hidden ">
                  <div className="p-5 sm:p-6">
                    <div className="flex gap-5">
                      <div className="relative shrink-0">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-100 p-2.5 overflow-hidden">
                          <Image width={200} height={200} alt={product.cartItems[0].product.title} className="w-full h-full object-contain" src={product.cartItems[0].product.imageCover} />
                        </div>
                        {product.cartItems.length - 1 == 0 ? "" : <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">+{product.cartItems.length - 1}</div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            {product.paymentMethodType == "cash" ? <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 rounded-lg mb-2">
                              <FaClock className="text-xs text-amber-600" />
                              <span className="text-xs font-semibold text-amber-600">Processing</span>
                            </div> : <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 rounded-lg mb-2">
                              <FaTruck className="text-xs text-blue-600" />
                              <span className="text-xs font-semibold text-blue-600">Processing</span>
                            </div>}

                            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                              <span className="text-xs text-gray-400">#</span>{product.id}</h3>
                          </div>

                          {product.paymentMethodType == "cash" ? <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100">
                            <FaMoneyBill className="text-gray-600" />
                          </div> :
                            <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-[#F3E8FF]">
                              <FaCreditCard className="text-[#9810FA]" />
                            </div>}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-1.5">
                            <FaCalendarAlt className=" text-xs text-gray-400" />

                            {product.updatedAt}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300">
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FaBox className="text-xs text-gray-400" />10 items</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300">
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MdLocationPin className="text-xs text-gray-400" />{product.shippingAddress.city}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <span className="text-2xl font-bold text-gray-900">{product.totalOrderPrice}</span>
                            <span className="text-sm font-medium text-gray-400 ml-1">EGP</span>
                          </div>
                          <AccordionTrigger className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all bg-gray-100 text-gray-700 hover:bg-gray-200 aria-expanded:bg-[#7f5539] aria-expanded:text-white  hover:no-underline">
                            <span className="group-aria-expanded/accordion-trigger:hidden">
                              Details
                            </span>
                            <span className="hidden group-aria-expanded/accordion-trigger:inline">
                              Hide
                            </span>
                          </AccordionTrigger>
                        </div>
                      </div>
                    </div>
                  </div>
                  <AccordionContent>
                    <div className="border-t border-gray-100 bg-gray-50/50">
                      <div className="p-5 sm:p-6">
                        <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
                          <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center">
                            <FaReceipt className='text-xs text-[#7f5539]' />
                          </div>
                          Order Items
                        </h4>

                        {product.cartItems.map((cart: CartItem) =>
                          <div key={cart._id} className="mb-3">
                            <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
                              <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0">
                                <Image
                                  width={200}
                                  height={200}
                                  alt={cart.product.title}
                                  className="w-full h-full object-contain"
                                  src={cart.product.imageCover}
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">
                                  {cart.product.title}
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
                                  <span className="font-medium text-gray-700">{cart.count}</span> × {cart.price} EGP
                                </p>
                              </div>

                              <div className="text-right shrink-0">
                                <p className="text-lg font-bold text-gray-900">
                                  {cart.count * cart.price}
                                </p>
                                <p className="text-xs text-gray-400">
                                  EGP
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>

                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-xl border border-gray-100">
                          <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center">
                              <FaLocationDot className='text-xs text-[#7f5539]' />
                            </div>
                            Delivery Address
                          </h4>

                          <div className="space-y-2">
                            <p className="font-medium text-gray-900">
                              {product.shippingAddress.city}
                            </p>

                            <p className="text-sm text-gray-600 leading-relaxed">
                              {product.shippingAddress.details}

                            </p>

                            <p className="text-sm text-gray-600 flex items-center gap-2 pt-1">
                              <FaPhone className=' text-xs text-gray-400' />
                              {product.shippingAddress.phone}

                            </p>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-amber-100 border border-amber-200">
                          <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center">
                              <FaClock className='text-xs text-white' />
                            </div>
                            Order Summary
                          </h4>

                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-gray-600">
                              <span>Subtotal</span>
                              <span className="font-medium">{product.totalOrderPrice} EGP</span>
                            </div>

                            <div className="flex justify-between text-gray-600">
                              <span>Shipping</span>
                              <span className="font-medium">{product.shippingPrice == 0 ? "Free" : product.shippingPrice} </span>
                            </div>

                            <hr className="border-gray-200/50 my-2" />

                            <div className="flex justify-between pt-1">
                              <span className="font-semibold text-gray-900">
                                Total
                              </span>

                              <span className="font-bold text-lg text-gray-900">
                                {product.totalOrderPrice + product.shippingPrice} EGP
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </div>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      </div>
    </>
  )
}
