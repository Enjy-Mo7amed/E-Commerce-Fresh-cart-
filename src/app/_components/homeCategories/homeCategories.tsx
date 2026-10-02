'use client'
import { CategoryType } from '@/types/allCategory.types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'

export default function HomeCategories({ data } : {data : CategoryType[]}) {
  return (
    <>
      <section className="py-10">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
            <div className="flex items-center gap-3 my-8">
              <div className="h-8 w-1.5 bg-linear-to-b from-[#7f553969] to-[#5b3d29] rounded-full"></div>
              <h2 className='text-3xl font-bold text-gray-800'>Shop By  <span className='text-[#7f5539]'>Categories</span></h2>
            </div>
            <Link href={'/categories'} className='text-[#7f5539] self-end sm:self-auto hover:text-[#5b3d29] font-medium flex items-center gap-3 cursor-pointer'>
              View All Categories <FaLongArrowAltRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {data.map((category) => <Link key={category._id} href={`/categories/${category._id}`} className='bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition group cursor-pointer'>
              <div className="h-20 w-20 overflow-hidden bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition">
                <Image width={300} height={300} src={category.image} alt={category.name} />
              </div>
              <h3 className="font-medium">{category.name}</h3>
            </Link>)}
          </div>
        </div>
      </section>
    </>
  )
}
