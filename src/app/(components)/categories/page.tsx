import { AllCategories } from '@/api/categoryApi/allCategory'
import Link from 'next/link'
import React from 'react'
import { FaLayerGroup } from 'react-icons/fa'
import CategoriesCard from '../../_components/categotiesCard/categotiesCard';
import { CategoryType } from '@/types/allCategory.types';

export default async function Categories() {
  const data = await AllCategories()

  return (
    <>
      <title>Categories</title>
      <div className="bg-linear-to-br from-[#5b3d29]  via-[#7f5539a6] to-[#7f5539c1] text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <nav className='flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap'>
            <Link href='/' className='hover:text-white transition-colors'>Home</Link>
            <span className='text-white/40'>/</span>
            <span className='text-white font-medium'>Categories</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 text-3xl h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <FaLayerGroup />
            </div>
            <div>
              <h1 className='text-3xl sm:text-4xl font-bold tracking-tight'>All Categories</h1>
              <p className='text-white/80 mt-1'>Browse our wide range of product categories</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {data?.map((category: CategoryType) => <CategoriesCard key={category._id} category={category} />
          )}
        </div>
      </div>
    </>
  )
}
