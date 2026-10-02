import { CategoryType } from '@/types/allCategory.types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

export default function CategoriesCard({ category }: {category : CategoryType}) {
    return (
        <>
            <Link href={`/categories/${category._id}`} className='group bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1'>
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
                    <Image width={300} height={300} src={category.image} alt={category.name} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
                </div>
                <h3 className="font-bold text-gray-900 text-center group-hover:text-[#7f5539] transition-colors">{category.name}</h3>
                <div className="flex items-center justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-[#7f5539] flex items-center gap-1">View Subcategories  <FaArrowRight /></span>
                </div>
            </Link>
        </>
    )
}
