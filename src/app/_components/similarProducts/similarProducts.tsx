"use client"
import { ProductType } from '@/types/allProducts.types'
import React from 'react'
import { Navigation, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function SimilarProducts({ cards }: { cards: React.ReactNode[] }) {
    return (
        <section className='py-8'>
            <div className="container">
                <div className="flex items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-1.5 bg-linear-to-b from-[#7f553969] to-[#5b3d29] rounded-full"></div>
                        <h2 className='text-2xl font-bold text-gray-800'>You May Also <span className='text-[#7f5539]'>Like</span></h2>
                    </div>
                </div>
                <div className="relative group">
                    <button
                        id="prev-btn"
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white hover:bg-[#7f5539] text-[#7f5539] hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <FaChevronLeft />
                    </button>

                    <button
                        id="next-btn"
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white hover:bg-[#7f5539] text-[#7f5539] hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <FaChevronRight />
                    </button>

                    <Swiper
                        modules={[Navigation, A11y, Autoplay]}
                        spaceBetween={20}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 20,
                            },
                        }}
                        navigation={{
                            nextEl: '#next-btn',
                            prevEl: '#prev-btn',
                        }}
                    >
                        {cards.map((card, index) => (
                            <SwiperSlide key={index}>{card}</SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
        </section>
    )
}
