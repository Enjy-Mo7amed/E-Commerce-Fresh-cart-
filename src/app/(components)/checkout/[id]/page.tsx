'use client'
import { checkoutSchema, checkoutSchemaType } from '@/app/schema/checkout.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FaArrowLeft, FaBox, FaCheck, FaCity, FaCreditCard, FaMoneyBill, FaPhone, FaPlus, FaReceipt, FaTruck, FaWallet } from 'react-icons/fa'
import { FaBagShopping, FaCircleInfo, FaHouse, FaLocationDot, FaShieldHalved } from 'react-icons/fa6'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { CheckoutSession } from '@/api/checkoutApi/Checkoutsession'
import { useParams, useRouter } from 'next/navigation'
import { FiLoader } from "react-icons/fi";
import { CreateCashOrder } from '@/api/checkoutApi/CashOrder'
import { Slide, toast } from 'react-toastify'
import { GetLoggedUserCart } from '@/api/cartApi/GetLoggedUserCart'
import { CartType } from '@/types/GetLoggedUserCart.types'
import { GetLoggedUserAddress } from '@/api/addressApi/Getloggedaddresses.api'
import { AddressType } from '@/types/Getloggedaddresses.types'

export default function CheckOut() {
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash')
  const router = useRouter()
  const { id }: { id: string } = useParams()
  const [cart, setCart] = useState<CartType[]>([])
  const [data, setData] = useState("")
  const [savedAddresses, setSavedAddresses] = useState<AddressType[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      details: '',
      phone: '',
      city: '',
    },
    resolver: zodResolver(checkoutSchema),
    mode: 'all'
  })


  const handelCheckout = async (values: checkoutSchemaType) => {
    setLoading(true)
    try {
      if (paymentMethod === 'cash') {
        const response = await CreateCashOrder(id, values)
        if (response.status == "success") {
          router.push('/orders')
          router.refresh()
        } else {
          toast.error(response.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            style: {
              backgroundColor: "#D40000",
              color: "#000000",
              borderRadius: "12px",
            },
            icon: <span className="text-black text-xl font-bold">✓</span>,
            transition: Slide,
          })
        }
      } else {
        const response = await CheckoutSession(id, window.location.origin, values)
        if (response.status == "success"&& response.session?.url) {
          window.location.replace(response.session.url);
          // router.refresh()
        }
      }
    } catch (error) {
      toast.error("Something Went Wrong", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          backgroundColor: "#D40000",
          color: "#000000",
          borderRadius: "12px",
        },
        icon: <span className="text-black text-xl font-bold">✓</span>,
        transition: Slide,
      })
    } finally {
      setLoading(false)
    }
  }

  const applyAddressToForm = (address: Pick<AddressType, 'city' | 'details' | 'phone'>) => {
    form.reset({
      city: address.city,
      details: address.details,
      phone: address.phone,
    })
  }

  const selectSavedAddress = (address: AddressType) => {
    setSelectedAddressId(address._id)
    applyAddressToForm(address)
  }

  const useDifferentAddress = () => {
    setSelectedAddressId(null)
    form.reset({ city: '', details: '', phone: '' })
  }

  useEffect(() => {
    async function fetchCart() {
      const { data } = await GetLoggedUserCart()
      setCart(data?.products)
      setData(data?.totalCartPrice)
    }
    fetchCart()
  }, [])

  useEffect(() => {
    async function fetchAddresses() {
      try {
        const payload = await GetLoggedUserAddress()
        const list: AddressType[] = payload?.data ?? []
        setSavedAddresses(list)
        if (list.length > 0) {
          setSelectedAddressId(list[0]._id)
          applyAddressToForm(list[0])
        }
      } catch {
        setSavedAddresses([])
      }
    }
    fetchAddresses()
  }, [])

  return (
    <>
      <title>CheckOut</title>
      <div className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
        <div className="container">
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link className="hover:text-[#7f5539] transition" href="/">
                Home
              </Link>
              <span className="text-gray-300">
                /
              </span>
              <Link className="hover:text-[#7f5539] transition" href="/cart">
                Cart
              </Link>
              <span className="text-gray-300">
                /
              </span>
              <span className="text-gray-900 font-medium">
                Checkout
              </span>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="bg-linear-to-br from-[#7f5539] to-[#5b3d29] text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-[#7f5539]/20">
                    <FaReceipt />
                  </span>
                  Complete Your Order
                </h1>
                <p className="text-gray-500 mt-2">
                  Review your items and complete your purchase
                </p>
              </div>

              <Link className="text-[#7f5539] hover:text-[#5b3d29] font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#7f553969] transition-all" href="/cart">
                <FaArrowLeft />
                Back to Cart
              </Link>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(handelCheckout)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* left col */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="bg-linear-to-r from-[#7f5539] to-[#5b3d29] px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FaHouse />
                      Shipping Address
                    </h2>
                    <p className="text-amber-100 text-sm mt-1">
                      {savedAddresses.length > 0
                        ? 'Select a saved address or enter a new one below'
                        : 'Where should we deliver your order?'}
                    </p>
                  </div>

                  <div className="p-6 space-y-5">
                    {savedAddresses.length > 0 && (
                      <div className="space-y-3">
                        {savedAddresses.map((address) => {
                          const isSelected = selectedAddressId === address._id
                          return (
                            <button
                              key={address._id}
                              type="button"
                              onClick={() => selectSavedAddress(address)}
                              className={`cursor-pointer w-full text-left p-4 rounded-xl border-2 transition-all relative ${isSelected
                                ? 'border-[#7f5539] bg-amber-50/50 shadow-sm'
                                : 'border-gray-200 hover:border-amber-200 hover:bg-gray-50'
                                }`}
                            >
                              {isSelected && (
                                <span className="absolute top-3 left-3 w-6 h-6 rounded-full bg-[#7f5539] text-white flex items-center justify-center text-xs">
                                  <FaCheck />
                                </span>
                              )}
                              <div className={isSelected ? 'pl-8' : ''}>
                                <p className="font-bold text-gray-900">{address.name}</p>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{address.details}</p>
                                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                                  <span className="flex items-center gap-1.5">
                                    <FaPhone className="text-xs" />
                                    {address.phone}
                                  </span>
                                  <span className="flex items-center gap-1.5">
                                    <FaCity className="text-xs" />
                                    {address.city}
                                  </span>
                                </div>
                              </div>
                            </button>
                          )
                        })}

                        <button
                          type="button"
                          onClick={useDifferentAddress}
                          className={`cursor-pointer w-full p-4 rounded-xl border-2 border-dashed transition-all flex items-center gap-4 ${selectedAddressId === null
                            ? 'border-[#7f5539] bg-amber-50/50'
                            : 'border-gray-300 hover:border-amber-200 hover:bg-gray-50'
                            }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                            <FaPlus className="text-gray-500" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-gray-900">Use a different address</p>
                            <p className="text-sm text-gray-500 mt-0.5">
                              Enter a new shipping address manually
                            </p>
                          </div>
                        </button>
                      </div>
                    )}

                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <FaCircleInfo />
                      </div>
                      <div>
                        <p className="text-sm text-blue-800 font-medium">
                          Delivery Information
                        </p>
                        <p className="text-xs text-blue-600 mt-0.5">
                          {selectedAddressId
                            ? 'Using your saved address. You can edit the details below if needed.'
                            : 'Please ensure your address is accurate for smooth delivery'}
                        </p>
                      </div>
                    </div>

                    {/* city inpuuuuuut */}
                    <div>
                      <Controller
                        name='city'
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className='block text-sm font-semibold text-gray-700 mb-2' htmlFor={field.name}>City<span className='text-red-700'>*</span></FieldLabel>
                            <div className="relative">
                              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                <FaCity className='text-gray-500 text-sm' />
                              </div>
                              <Input
                                className='h-14 rounded-xl border-2 border-gray-200 px-4 pl-14 text-base placeholder:text-gray-400 transition-all focus-visible:border-[#7f553969] focus-visible:ring-2 focus-visible:ring-amber-100'
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder='e.g. Cairo, Alexandria, Giza'
                                autoComplete='city'
                                type='text'
                              />
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />
                    </div>

                    {/* detailes input */}
                    <div>
                      <Controller
                        name='details'
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className='block text-sm font-semibold text-gray-700 mb-2' htmlFor={field.name}>Street Address<span className='text-red-700'>*</span></FieldLabel>
                            <div className="relative">
                              <div className="absolute left-4 top-4 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                <FaLocationDot className='text-gray-500 text-sm' />
                              </div>
                              <textarea
                                rows={3}
                                className='w-full min-w-0 px-4 py-3.5 pl-14 border-2 rounded-xl bg-transparent text-base transition-all outline-none resize-none placeholder:text-gray-400 border-gray-200 focus:border-[#7f553969] focus:ring-2 focus:ring-amber-100 aria-invalid:border-red-700 aria-invalid:ring-red-700/20 disabled:cursor-not-allowed disabled:opacity-50'
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder='Street name, building number, floor, apartment...'
                                autoComplete='details'
                              />
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />
                    </div>

                    {/* num input */}

                    <div>
                      <Controller
                        name='phone'
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className='block text-sm font-semibold text-gray-700 mb-2' htmlFor={field.name}>Phone Number<span className='text-red-700'>*</span></FieldLabel>
                            <div className="relative">
                              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                <FaPhone className='text-gray-500 text-sm' />
                              </div>
                              <Input
                                className='h-14 w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all border-gray-200 focus:border-[#7f553969] focus:ring-2 focus:ring-amber-100'
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder='01xxxxxxxxx'
                                autoComplete='phone'
                                type='tel'
                              />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                                Egyptian numbers only
                              </span>
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="bg-linear-to-r from-[#7f5539] to-[#5b3d29] px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FaWallet />
                      Payment Method
                    </h2>
                    <p className="text-amber-100 text-sm mt-1">
                      Choose how you'd like to pay
                    </p>
                  </div>

                  <div className="p-6 space-y-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`cursor-pointer w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${paymentMethod === 'cash'
                        ? 'border-[#7f553969] bg-linear-to-r from-amber-50 to-amber-100 shadow-sm'
                        : 'border-gray-200 hover:border-amber-200 hover:bg-gray-50'
                        }`}
                    >
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${paymentMethod === 'cash'
                        ? 'bg-linear-to-br from-[#7f553969] to-[#7f5539] text-white shadow-lg shadow-[#7f553969]/30'
                        : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                        }`}>
                        <FaMoneyBill className='text-xl' />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className={`font-bold ${paymentMethod === 'cash' ? 'text-[#5b3d29]' : 'text-gray-900'}`}>
                          Cash on Delivery
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          Pay when your order arrives at your doorstep
                        </p>
                      </div>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${paymentMethod === 'cash' ? 'bg-[#7f5539] text-white' : 'border-2 border-gray-200'
                        }`}>
                        {paymentMethod === 'cash' && <FaCheck />}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`cursor-pointer w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${paymentMethod === 'card'
                        ? 'border-[#7f553969] bg-linear-to-r from-amber-50 to-amber-100 shadow-sm'
                        : 'border-gray-200 hover:border-amber-200 hover:bg-gray-50'
                        }`}
                    >
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${paymentMethod === 'card'
                        ? 'bg-linear-to-br from-[#7f553969] to-[#7f5539] text-white shadow-lg shadow-[#7f553969]/30'
                        : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                        }`}>
                        <FaCreditCard className='text-xl' />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className={`font-bold ${paymentMethod === 'card' ? 'text-[#5b3d29]' : 'text-gray-900'}`}>
                          Pay Online
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          Secure payment with Credit/Debit Card via Stripe
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <img alt="Visa" className="h-5" src="https://img.icons8.com/color/48/visa.png" />
                          <img alt="Mastercard" className="h-5" src="https://img.icons8.com/color/48/mastercard.png" />
                          <img alt="Amex" className="h-5" src="https://img.icons8.com/color/48/amex.png" />
                        </div>
                      </div>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${paymentMethod === 'card' ? 'bg-[#7f5539] text-white' : 'border-2 border-gray-200'
                        }`}>
                        {paymentMethod === 'card' && <FaCheck />}
                      </div>
                    </button>

                    <div className="flex items-center gap-3 p-4 bg-linear-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-100 mt-4">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                        <FaShieldHalved className='text-[#7f5539]' />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#5b3d29]">
                          Secure &amp; Encrypted
                        </p>
                        <p className="text-xs text-[#7f5539] mt-0.5">
                          Your payment info is protected with 256-bit SSL encryption
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* right col */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
                  <div className="bg-linear-to-r from-[#7f5539] to-[#5b3d29] px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FaBagShopping />
                      Order Summary
                    </h2>
                    <p className="text-amber-100 text-sm mt-1">
                      {cart.length} items
                    </p>
                  </div>

                  <div className="p-5">
                    <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
                      {cart.map((product: CartType) =>
                        <div key={product._id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                            <Image width={200} height={200} alt={product.product.title} className="w-full h-full object-contain" src={product.product.imageCover} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {product.product.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {product.count} × {product.price} EGP
                            </p>
                          </div>
                          <p className="text-sm font-bold text-gray-900 shrink-0">
                            {product.count * product.price}
                          </p>
                        </div>
                      )}
                    </div>

                    <hr className="border-gray-100 my-4" />
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>
                          Subtotal
                        </span>
                        <span className="font-medium">
                          {data} EGP
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span className="flex items-center gap-2">
                          <FaTruck className='text-gray-400' />
                          Shipping
                        </span>
                        <span className="text-[#7f5539] font-semibold">
                          FREE
                        </span>
                      </div>
                      <hr className="border-gray-100" />
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">
                          Total
                        </span>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-[#7f5539]">
                            {data}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            EGP
                          </span>
                        </div>
                      </div>
                    </div>


                    <button disabled={loading} type="submit" className="mt-5 cursor-pointer flex relative w-full justify-center shadow-sm  items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group">
                      <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                      </span>
                      <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                      <span className="relative w-full flex items-center justify-center gap-2  font-semibold text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                        {loading ?
                          <><FiLoader className='animate-spin' /><span>Proccessing</span></>
                          :
                          <>
                            {paymentMethod === 'card' ? <><FaShieldHalved /><span>Proceed to Payment</span></> :
                              <><FaWallet /><span>Place Oreder</span></>
                            }
                          </>} </span>
                    </button>

                    <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <FaShieldHalved className='text-[#7f5539]' />
                        <span>
                          Secure
                        </span>
                      </div>
                      <div className="w-px h-4 bg-gray-200" />
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <FaTruck className='text-blue-500' />
                        <span>
                          Fast Delivery
                        </span>
                      </div>
                      <div className="w-px h-4 bg-gray-200" />
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <FaBox className='text-orange-500' />
                        <span>
                          Easy Returns
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
