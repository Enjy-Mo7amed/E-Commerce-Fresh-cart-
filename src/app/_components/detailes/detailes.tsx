'use client'
import React, { useState } from 'react'
import { FaHouseChimney } from 'react-icons/fa6'
import { IoIosArrowForward } from 'react-icons/io'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaPlus } from "react-icons/fa6";
import { FaCheck, FaMinus, FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Link from 'next/link'
import 'swiper/css/autoplay';
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { TbReload } from "react-icons/tb";
import { FaShieldAlt } from "react-icons/fa";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { BiSolidDetail } from "react-icons/bi";
import { FaTruck } from "react-icons/fa";
import { FaBolt } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { ProductDetailes } from '@/types/productDetailes.types';
import AddCartBtn from '@/app/_components/addCartBtn/addCartBtn';
import AddWishlistBtn from '@/app/_components/addWishlistBtn/addWishlistBtn';

export default function DetailesPost({ data, wishlistProductIds }: { data: ProductDetailes, wishlistProductIds: string[] }) {
    const [image, setImage] = useState(data?.imageCover)
    const [showAll, setShowAll] = useState(false);
    const displayedReviews = showAll ? data?.reviews : data?.reviews?.slice(0, 3);
    const [count, setCount] = useState(1)

    return (
        <>
            <nav className='py-4'>
                <div className="container">
                    <ol className='flex items-center flex-wrap gap-1 text-sm'>
                        <li className='flex items-center gap-3'>
                            <Link className='text-gray-500 hover:text-[#7f5539] transition flex items-center gap-1.5' href='/'><FaHouseChimney className='text-xs' /> Home</Link>
                            <IoIosArrowForward />
                        </li>
                        <li className='flex items-center gap-3 ml-2'>
                            <Link className='text-gray-500 hover:text-[#7f5539] transition' href={`/categories/${data.category._id}`}>{data.category.name}</Link>
                            <IoIosArrowForward />
                        </li>
                        <li className='font-medium truncate max-w-xs ml-2'>
                            {data.title}
                        </li>
                    </ol>
                </div>
            </nav>

            {/* Product detaile */}
            <section className='py-8'>
                <div className="container">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/4">
                            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
                                <Image width={700} height={700} src={image} alt={data.title} />
                                <Swiper
                                    spaceBetween={0}
                                    slidesPerView={3}
                                    modules={[Autoplay]}
                                    autoplay={{
                                        delay: 1000,
                                    }}
                                >
                                    {data.images.map((img, index) => <SwiperSlide className='mt-3 cursor-pointer' key={index} onClick={() => setImage(img)}><Image width={500} height={500} src={img} alt={data.title} /></SwiperSlide>)}
                                </Swiper>
                            </div>
                        </div>

                        <div className="lg:w-3/4">
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Link className='bg-[#7f553969] text-[#7f5539] text-xs font-medium px-3 py-1.5 rounded-full hover:bg-[#5b3d29] hover:text-white transition' href={`/categories/${data.category._id}`}>{data.category.name}</Link>
                                    <span className='bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full'>
                                        {data.brand.name}
                                    </span>
                                </div>

                                <h1 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-3'>
                                    {data.title}
                                </h1>

                                <div className='flex items-center gap-3 mb-4'>
                                    <div className='flex gap-1 text-amber-400 mr-2'>
                                        {[...Array(5)].map((_, index) => (
                                            index < data.ratingsAverage ? (
                                                <FaStar key={index} />
                                            ) : (
                                                <FaRegStar key={index} className="text-gray-300" />
                                            )
                                        ))}
                                    </div>
                                    <div className="">
                                        {data.ratingsAverage} ({data.ratingsQuantity} Reviews)
                                    </div>
                                </div>

                                <div className="flex items-center flex-wrap gap-3 mb-6">
                                    {data.priceAfterDiscount ?
                                        <div><div className="text-3xl font-bold text-[#7f5539]">{data.priceAfterDiscount} EGp</div>
                                            <div className="tet-gray-700 text-sm line-through">{data.price} EGP</div>
                                        </div> :
                                        <div className="text-3xl font-bold text-gray-900">{data.price} EGp</div>}
                                </div>

                                <div className="flex items-center gap-2 mb-6">
                                    <span className='flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-[#7f553969] text-[#7f5539]'>
                                        <span className='w-2 h-2 rounded-full bg-[#7f5539]'
                                        ></span>In Stock
                                    </span>
                                </div>

                                <div className='border-t border-gray-100 pt-5 mb-6'>
                                    <p className='text-gray-600 leading-relaxed'>
                                        {data.description}
                                    </p>
                                </div>

                                <div className='mb-6'>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Quantity</label>
                                    <div className='flex items-center gap-4'>
                                        <div className='flex items-center border-2 border-gray-200 rounded-lg overflow-hidden'>
                                            <button
                                                disabled={count <= 1}
                                                onClick={() => setCount(count - 1)}
                                                className='px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-[#7f5539] transition disabled:opacity-50 cursor-pointer'><FaMinus /></button>
                                            <span className="w-12 flex justify-center font-bold text-gray-900">{count}</span>
                                            <button
                                                onClick={() => setCount(count + 1)}
                                                className='px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-[#7f5539] transition disabled:opacity-50 cursor-pointer'><FaPlus /></button>
                                        </div>
                                        <span className='text-sm text-gray-500'>
                                            {data.quantity} Available
                                        </span>
                                    </div>
                                </div>

                                <div className='bg-gray-50 rounded-lg p-4 mb-6'>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-gray-600'>Total Price:</span>
                                        <span className='text-2xl font-bold text-[#7f5539]'>{data.priceAfterDiscount ? data.priceAfterDiscount * count : data.price * count}.00 Egp</span>
                                    </div>

                                </div>

                                <div className='flex flex-col sm:flex-row gap-3 mb-6'>
                                    <AddCartBtn id={data.id} className="w-1/2 py-3.5 px-6 cursor-pointer flex relative  justify-center shadow-sm  items-center overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group">
                                        <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                                            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                        </span>
                                        <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                                            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                        </span>
                                        <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                                        <span className="relative w-full flex justify-center items-center gap-2  font-medium text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-white"><FaShoppingCart /> Add TO Cart</span>
                                    </AddCartBtn>

                                    <button className="w-1/2 py-3.5 px-6 cursor-pointer flex relative  justify-center shadow-sm  items-center overflow-hidden   font-medium transition-all bg-black rounded-md group">
                                        <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-gray-500 rounded group-hover:-mr-4 group-hover:-mt-4">
                                            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                        </span>
                                        <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-gray-500  rounded group-hover:-ml-4 group-hover:-mb-4">
                                            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                        </span>
                                        <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-white rounded-md group-hover:translate-x-0" />
                                        <span className="relative w-full flex items-center gap-2 justify-center  font-medium text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-black"><FaBolt />  Buy Now</span>
                                    </button>

                                </div>

                                <div className='flex gap-3 mb-6'>
                                    <AddWishlistBtn id={data.id} wishlistProductIds={wishlistProductIds} variant="full" />
                                    <button className='border-2 py-3 px-4 rounded-xl font-medium cursor-pointer transition flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:border-[#7f5539] hover:text-[#7f5539]'>
                                        <FaShareAlt />
                                    </button>
                                </div>
                                <div className='border-t border-gray-100 pt-6'>
                                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                                        <div className='flex items-center gap-3'>
                                            <div className='h-10 w-10 bg-[#7f553969] text-[#7f5539] rounded-full flex items-center justify-center shrink-0'>
                                                <FaTruckFast />
                                            </div>
                                            <div className=''>
                                                <h4 className='font-medium text-gray-900 text-sm'>Free Delivery</h4>
                                                <p className='text-xs text-gray-500'>Orders over $50</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <div className='h-10 w-10 bg-[#7f553969] text-[#7f5539] rounded-full flex items-center justify-center shrink-0'>
                                                <TbReload />
                                            </div>
                                            <div className=''>
                                                <h4 className='font-medium text-gray-900 text-sm'>30 Days Return</h4>
                                                <p className='text-xs text-gray-500'>Money back</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <div className='h-10 w-10 bg-[#7f553969] text-[#7f5539] rounded-full flex items-center justify-center shrink-0'>
                                                <FaShieldAlt />
                                            </div>
                                            <div className=''>
                                                <h4 className='font-medium text-gray-900 text-sm'>Secure Payment</h4>
                                                <p className='text-xs text-gray-500'>100% Protected</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product detaile tabs */}
            <section className='py-8'>
                <div className="container">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <Tabs defaultValue="Detailes" className="">
                            <TabsList className='py-6 px-0 w-full justify-start rounded-none border-b border-gray-200 bg-transparent h-auto'>
                                <TabsTrigger className=' ' value="Detailes"><BiSolidDetail />  Product Detailes</TabsTrigger>
                                <TabsTrigger value="Reviews"><FaStar />  Reviews  ({data.ratingsQuantity})</TabsTrigger>
                                <TabsTrigger value="Shipping"><FaTruck />  Shipping & Returns</TabsTrigger>
                            </TabsList>

                            <TabsContent value="Detailes">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className='text-lg font-medium text-gray-900 mb-3'>About this Product</CardTitle>
                                        <CardDescription className='text-gray-600 leading-relaxed'>
                                            {data.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <h4 className='font-medium text-gray-900 mb-3'> Product Information</h4>
                                            <ul className='space-y-2'>
                                                <li className="flex justify-between text-sm">
                                                    <span className="text-gray-500">Category</span>
                                                    <span className="text-gray-900 font-medium">{data.category.name}</span>
                                                </li>
                                                <li className="flex justify-between text-sm">
                                                    <span className="text-gray-500">Subcategory</span>
                                                    <span className="text-gray-900 font-medium">{data.subcategory?.[0]?.name ?? 'Not specified'}</span>
                                                </li>
                                                <li className="flex justify-between text-sm">
                                                    <span className="text-gray-500">Brand</span>
                                                    <span className="text-gray-900 font-medium">{data.brand.name} </span>
                                                </li>
                                                <li className="flex justify-between text-sm">
                                                    <span className="text-gray-500">Items Sold</span>
                                                    <span className="text-gray-900 font-medium">{data.sold}+ Sold</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <h4 className='font-medium text-gray-900 mb-3'>Key Features</h4>
                                            <ul className='space-y-2'>
                                                <li className="flex justify-between text-sm">
                                                    <span className="text-gray-600 flex items-center gap-2"><FaCheck className='text-[#7f5539]' /> Premium Quality Product</span>
                                                </li>
                                                <li className="flex justify-between text-sm">
                                                    <span className="text-gray-600 flex items-center gap-2"><FaCheck className='text-[#7f5539]' /> 100% Authentic Guarantee</span>
                                                </li>
                                                <li className="flex justify-between text-sm">
                                                    <span className="text-gray-600 flex items-center gap-2"><FaCheck className='text-[#7f5539]' /> Fast & Secure Packaging</span>
                                                </li>
                                                <li className="flex justify-between text-sm">
                                                    <span className="text-gray-600 flex items-center gap-2"><FaCheck className='text-[#7f5539]' /> Quality Tested</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="Reviews">
                                <Card>
                                    <CardContent>
                                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                                            <div className="text-center flex flex-col items-center justify-center">
                                                <div className="text-5xl font-bold text-gray-900 mb-2">{data?.ratingsAverage}</div>
                                                <div className='flex gap-1 text-amber-400 mr-2'>
                                                    <div className="flex items-center gap-1 text-yellow-400">
                                                        {[...Array(5)].map((_, index) => (
                                                            index < data.ratingsAverage ? (
                                                                <FaStar key={index} />
                                                            ) : (
                                                                <FaRegStar key={index} className="text-gray-300" />
                                                            )
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-2">Based on ({data?.ratingsQuantity}) Reviews</p>
                                            </div>

                                            <div className="flex-1 w-full">
                                                {[5, 4, 3, 2, 1].map((star) => {
                                                    const totalReviews = data?.reviews?.length || 0;

                                                    const countForStar = data?.reviews?.filter(
                                                        (item) => Math.round(item.rating) === star
                                                    ).length || 0;

                                                    const percentage = totalReviews > 0
                                                        ? Math.round((countForStar / totalReviews) * 100)
                                                        : 0;

                                                    return (
                                                        <div key={star} className="flex items-center gap-3 mb-2">
                                                            <span className="text-sm text-gray-600 w-12 font-medium">{star} Star</span>

                                                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-yellow-400 rounded-full transition-all duration-500 ease-out"
                                                                    style={{ width: `${percentage}%` }}
                                                                ></div>
                                                            </div>

                                                            <span className="text-sm text-gray-500 w-12 text-right font-medium">
                                                                {percentage}%
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 pt-6 mt-6">
                                            <div className="py-4">
                                                <h3 className="text-xl font-medium text-gray-800 mb-6">
                                                    Customer reviews ({data?.reviews?.length || 0})
                                                </h3>

                                                {displayedReviews?.map((item) => {
                                                    const formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    });

                                                    return (
                                                        <div
                                                            key={item._id}
                                                            className="p-5 mb-3 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition duration-200"
                                                        >
                                                            <div className="flex items-center justify-between mb-3">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 rounded-full bg-[#7f55391a] text-[#7f5539] flex items-center justify-center font-bold text-lg">
                                                                        {item?.user?.name ? item.user.name.charAt(0).toUpperCase() : 'U'}
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-medium text-gray-900 text-sm">
                                                                            {item?.user?.name}
                                                                        </h4>
                                                                        <span className="text-xs text-gray-400">
                                                                            {formattedDate}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center gap-1 text-amber-400 text-sm">
                                                                    {[...Array(5)].map((_, index) => (
                                                                        index < item.rating ? (
                                                                            <FaStar key={index} />
                                                                        ) : (
                                                                            <FaRegStar key={index} className="text-gray-300" />
                                                                        )
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <p className="text-gray-600 text-sm leading-relaxed pl-13">
                                                                {item.review}
                                                            </p>
                                                        </div>
                                                    );
                                                })}

                                                {data?.reviews?.length > 3 && (
                                                    <div className="text-center mt-6">
                                                        <button
                                                            onClick={() => setShowAll(!showAll)}
                                                            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-[#7f5539] bg-[#7f55391a] hover:bg-[#7f5539] hover:text-white rounded-full transition-all duration-200 cursor-pointer"
                                                        >
                                                            {showAll ? (
                                                                <>
                                                                    Show Less <IoIosArrowUp />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    Show More ({data.reviews.length - 3} more) <IoIosArrowDown />
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="Shipping">
                                <Card>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-linear-to-br from-[#7f553969] to-[#5b3d29] rounded-lg p-6">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="h-12 w-12 text-2xl bg-[#7f5539] text-white rounded-full flex items-center justify-center">
                                                        <FaTruck />
                                                    </div>
                                                    <h4 className='font-medium text-gray-900'>Shipping Information</h4>
                                                </div>

                                                <ul>
                                                    <li className="flex items-start gap-2 text-sm text-gray-800"><FaCheck className='text-[#7f5539]' />  Free shipping on orders over $50</li>
                                                    <li className="flex items-start gap-2 text-sm text-gray-800"><FaCheck className='text-[#7f5539]' />  Standard delivery: 3-5 business days</li>
                                                    <li className="flex items-start gap-2 text-sm text-gray-800"><FaCheck className='text-[#7f5539]' />  Express delivery available (1-2 business days)</li>
                                                    <li className="flex items-start gap-2 text-sm text-gray-800"><FaCheck className='text-[#7f5539]' />  Track your order in real-time</li>
                                                </ul>
                                            </div>

                                            <div className="bg-linear-to-br from-[#7f553969] to-[#5b3d29] rounded-lg p-6">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="h-12 w-12 text-2xl bg-[#7f5539] text-white rounded-full flex items-center justify-center">
                                                        <TbReload />
                                                    </div>
                                                    <h4 className='font-medium text-gray-900'>Returns & Refunds</h4>
                                                </div>

                                                <ul>
                                                    <li className="flex items-start gap-2 text-sm text-gray-800"><FaCheck className='text-[#7f5539]' />  30-day hassle-free returns</li>
                                                    <li className="flex items-start gap-2 text-sm text-gray-800"><FaCheck className='text-[#7f5539]' />  Full refund or exchange available</li>
                                                    <li className="flex items-start gap-2 text-sm text-gray-800"><FaCheck className='text-[#7f5539]' />  Free return shipping on defective items</li>
                                                    <li className="flex items-start gap-2 text-sm text-gray-800"><FaCheck className='text-[#7f5539]' /> Easy online return process</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg mt-5 p-6 flex items-center gap-4">
                                            <div className="h-14 w-14 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shrink-0 text-2xl"><FaShieldAlt /></div>
                                            <div className="">
                                                <h4 className='font-medium text-gray-900 mb-1'>Buyer Protection Guarantee</h4>
                                                <p className="text-sm text-gray-600">Get a full refund if your order doesn't arrive or isn't as described. We ensure your shopping experience is safe and secure.</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </section>

        </>
    )
}
