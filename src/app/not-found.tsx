import { FaArrowLeft, FaLemon, FaSeedling } from 'react-icons/fa'
import { FaAppleWhole, FaCarrot, FaCartShopping, FaHouse } from 'react-icons/fa6'
import Link from 'next/link'

export default function NotFound() {
    return (
        <>
            <div className=" min-h-screen bg-[#fafbfc] flex items-center justify-center px-4 py-16 relative overflow-hidden">
                <div className=" absolute inset-0 overflow-hidden">
                    <div className=" absolute top-[10%] left-[5%] text-amber-200 text-4xl animate-[float_6s_ease-in-out_infinite]">
                        <FaAppleWhole />
                    </div>

                    <div className=" absolute top-[20%] right-[10%] text-amber-200 text-3xl animate-[float_8s_ease-in-out_infinite_1s]">
                        <FaCarrot />
                    </div>

                    <div className=" absolute bottom-[25%] left-[8%] text-amber-200 text-3xl animate-[float_7s_ease-in-out_infinite_0.5s]">
                        <FaLemon />
                    </div>

                    <div className=" absolute bottom-[15%] right-[15%] text-amber-200 text-4xl animate-[float_9s_ease-in-out_infinite_2s]">
                        <FaSeedling />
                    </div>

                    <div className=" absolute top-[50%] left-[15%] text-amber-100 text-2xl animate-[float_5s_ease-in-out_infinite_1.5s]">
                        <FaAppleWhole />
                    </div>

                    <div className=" absolute top-[40%] right-[5%] text-amber-100 text-2xl animate-[float_6s_ease-in-out_infinite_0.8s]">
                        <FaCarrot />
                    </div>

                    <div className=" absolute top-0 right-0 w-125 h-125 bg-linear-to-bl from-amber-100/40 to-transparent rounded-full blur-3xl" />
                    <div className=" absolute bottom-0 left-0 w-100 h-100 bg-linear-to-tr from-amber-100/30 to-transparent rounded-full blur-3xl" />
                </div>

                <div className=" relative z-10 max-w-xl w-full">
                    <div className=" flex justify-center mb-10">
                        <div className=" relative">
                            <div className=" absolute inset-0 w-64 h-52 sm:w-72 sm:h-60 bg-amber-100/50 rounded-4xl blur-2xl" />
                            <div className=" relative w-64 h-52 sm:w-72 sm:h-60">
                                <div className=" absolute inset-x-0 top-4 mx-auto w-52 h-40 sm:w-60 sm:h-44 bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 flex items-center justify-center overflow-hidden">
                                    <div className=" absolute inset-0 bg-linear-to-br from-amber-50/80 via-transparent to-amber-100/40" />
                                    <FaCartShopping className='relative text-6xl sm:text-7xl text-[#7f5539]' />
                                </div>

                                <div className=" absolute -top-2 -right-2 sm:top-0 sm:right-0">
                                    <div className=" relative">
                                        <div className=" absolute -inset-2 rounded-full bg-white shadow-lg" />
                                        <div className=" relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-[#7f553969] to-[#7f5539] flex items-center justify-center shadow-lg shadow-[#7f553969]/40">
                                            <span className=" text-xl sm:text-2xl font-black text-white tracking-tight">
                                                404
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className=" absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4">
                                    <div className=" w-2.5 h-2.5 rounded-full bg-[#7f55393d]" />
                                    <div className=" w-8 h-4 border-b-[3px] border-[#7f55393d] rounded-b-full" />
                                    <div className=" w-2.5 h-2.5 rounded-full bg-[#7f55393d]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" text-center mb-10">
                        <h1 className=" text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                            Oops! Nothing Here
                        </h1>
                        <p className=" text-gray-500 text-lg leading-relaxed max-w-md mx-auto">
                            Looks like this page went out of stock! Don't worry, there's plenty more
                            fresh content to explore.
                        </p>
                    </div>

                    <div className=" flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">

                        <Link href={'/'}>
                            <button className="cursor-pointer flex relative justify-center shadow-sm  items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group">
                                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                </span>
                                <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                </span>
                                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                                <span className="relative w-full flex items-center justify-center gap-2  font-semibold text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-white"><FaHouse className="group-hover:scale-110 transition-transform duration-300" /> Go to Homepage </span>
                            </button>
                        </Link>
                        <button className=" py-3.5 px-6 cursor-pointer flex relative  justify-center shadow-sm  items-center overflow-hidden   font-medium transition-all bg-black rounded-md group">
                            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-gray-500 rounded group-hover:-mr-4 group-hover:-mt-4">
                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                            </span>
                            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-gray-500  rounded group-hover:-ml-4 group-hover:-mb-4">
                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                            </span>
                            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-white rounded-md group-hover:translate-x-0" />
                            <span className="relative w-full flex items-center gap-2 justify-center  font-medium text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-black"><FaArrowLeft className="group-hover:scale-110 transition-transform duration-300" />  Go Back</span>
                        </button>
                    </div>

                    <div className=" bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                        <p className=" text-center text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                            Popular Destinations
                        </p>
                        <div className=" flex flex-wrap items-center justify-center gap-3">
                            <Link
                                className="px-5 py-2.5 rounded-xl bg-amber-50 text-[#5b3d29] font-semibold text-sm hover:bg-amber-100 transition-colors"
                                href="/products"
                            >
                                All Products
                            </Link>
                            <Link
                                className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors"
                                href="/categories"
                            >
                                Categories
                            </Link>
                            <Link
                                className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors"
                                href="/deals"
                            >
                                Today's Deals
                            </Link>
                            <Link
                                className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors"
                                href="/contact"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

