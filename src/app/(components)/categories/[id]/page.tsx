import { GetAllSubCategories } from '@/api/categoryApi/GetAllSubCategories.api'
import { SpecificCategory } from '@/api/categoryApi/Getspecificcategory.api'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { FaArrowLeft, FaArrowRight, FaBoxOpen, FaFolderOpen } from 'react-icons/fa'
import { SubCAtegoryType } from '@/types/SubCategories.types'
import { notFound } from 'next/navigation'

export default async function CategoryDetailes({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const categoryResponse = await SpecificCategory(id)
    if (!categoryResponse) notFound()
    const { data } = categoryResponse
    const response = await GetAllSubCategories()
    const subData: SubCAtegoryType[] = response?.data?.filter((sub: SubCAtegoryType) => sub.category === id) || []

    return (
        <>
            <title>Category Details</title>
            <div className="bg-linear-to-br from-[#5b3d29]  via-[#7f5539a6] to-[#7f5539c1] text-white">
                <div className="container mx-auto px-4 py-10 sm:py-14">
                    <nav className='flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap'>
                        <Link href='/' className='hover:text-white transition-colors'>Home</Link>
                        <span className='text-white/40'>/</span>
                        <Link href='/categories' className='hover:text-white transition-colors'>Categories</Link>
                        <span className='text-white/40'>/</span>
                        <span className='text-white font-medium'>{data.name}</span>
                    </nav>
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 overflow-hidden">
                            <Image width={200} height={200} src={data.image} alt={data.name} className={'w-12 h-12 object-contain'} />
                        </div>
                        <div>
                            <h1 className='text-3xl sm:text-4xl font-bold tracking-tight'>{data.name}</h1>
                            <p className='text-white/80 mt-1'>Choose a subcategory to browse products</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-10">
                <Link
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-[#7f5539] transition-colors mb-6"
                    href="/categories"
                >
                    <FaArrowLeft />
                    <span>Back to Categories</span>
                </Link>

                <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900">
                        {subData.length} Subcategories in {data.name}
                    </h2>
                </div>

                {subData && subData.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {subData.map((sub: SubCAtegoryType) => (
                            <Link
                                key={sub._id}
                                className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all duration-300 hover:-translate-y-1"
                                href={`/subcategory/${sub._id}`}
                            >
                                <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                                    <FaFolderOpen className='text-2xl text-[#7f5539]' />
                                </div>

                                <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#7f5539] transition-colors mb-2">
                                    {sub.name}
                                </h3>

                                <div className="flex items-center gap-2 text-sm text-[#7f5539] opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span>Browse Products</span>
                                    <FaArrowRight className='text-xs' />
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                            <FaBoxOpen className='text-3xl text-gray-400' />
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2">No Subcategories Found</h3>
                        <p className="text-gray-500 mb-6">
                            No subcategories match this category.
                        </p>

                        <Link href={'/categories'} className="flex items-center justify-center">
                            <button className="cursor-pointer flex relative justify-center shadow-sm items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group">
                                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                </span>
                                <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                </span>
                                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                                <span className="relative w-full flex items-center justify-center gap-2 font-semibold text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                                    View All Categories
                                </span>
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}
