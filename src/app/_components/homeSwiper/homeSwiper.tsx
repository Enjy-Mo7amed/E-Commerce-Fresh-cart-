'use client';
import Link from 'next/link'
import React from 'react'
import img from '../../../../public/colorful-shopping-cart-against-bright-green-background-conveying-sense-shopping-energy_124717-14444.avif'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function HomeSwiper() {
    const slidesData = [
        {
            id: 1,
            title: "Fresh Products Delivered to your Door",
            subtitle: "Get 20% off your first order",
            image: img.src,
            link: "/products",
            btn1: 'Shop Now',
            btn2: 'View Deals'
        },
        {
            id: 2,
            title: "Premium Quality Guaranteed",
            subtitle: "Fresh from farm to your table",
            image: img.src,
            link: "/products",
            btn1: 'Shop Now',
            btn2: 'Learn More'
        },
        {
            id: 3,
            title: "Fast & Free Delivery",
            subtitle: "Same day delivery available",
            image: img.src,
            link: "/products",
            btn1: 'Order Now',
            btn2: 'Delivery Info'
        }
    ];

    return (
        <div className="w-full h-112  relative overflow-hidden shadow-lg">
            <button
                id="prev-btn"
                className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white hover:bg-[#7f5539] text-[#7f5539] hover:text-white rounded-full  items-center justify-center shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <FaChevronLeft />
            </button>

            <button
                id="next-btn"
                className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white hover:bg-[#7f5539] text-[#7f5539] hover:text-white rounded-full  items-center justify-center shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <FaChevronRight />
            </button>
            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                navigation={{
                    nextEl: '#next-btn',
                    prevEl: '#prev-btn',
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="w-full h-full"
            >
                {slidesData.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="w-full h-full bg-cover bg-center bg-no-repeat relative flex items-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="w-full h-full bg-linear-to-r from-[#7f5539e6] via-[#7f553999] to-transparent p-8 md:p-16 flex flex-col justify-center">
                                <div className="container mx-auto">
                                    <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                                        {slide.title}
                                    </h2>
                                    <p className="text-white/90 font-medium mb-6">
                                        {slide.subtitle}
                                    </p>

                                    <div className="flex gap-4 flex-wrap">
                                        <Link href={slide.link}>
                                            <button className="cursor-pointer flex relative justify-center shadow-md items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group">
                                                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                                                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                                </span>
                                                <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                                                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                                </span>
                                                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                                                <span className="relative w-full flex items-center gap-2 font-semibold text-sm text-white transition-colors duration-200 ease-in-out">
                                                    {slide.btn1}
                                                </span>
                                            </button>
                                        </Link>
                                        <Link href={slide.link}>
                                            <button className="cursor-pointer flex relative justify-center shadow-md items-center px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded-md group">
                                                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                                                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                                </span>
                                                <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                                                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                                </span>
                                                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                                                <span className="relative w-full flex items-center gap-2 font-semibold text-sm text-[#7f5539] group-hover:text-white transition-colors duration-200 ease-in-out">
                                                    {slide.btn2}
                                                </span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
