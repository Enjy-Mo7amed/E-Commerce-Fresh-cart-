import { GetLoggedUserAddress } from '@/api/addressApi/Getloggedaddresses.api';
import AddressBtn from '@/app/_components/addressBtn/addressBtn';
import DeleteAddress from '@/app/_components/deleteAddress/deleteAddress';
import { AddressType } from '@/types/Getloggedaddresses.types';
import Link from 'next/link'
import { FaUser } from 'react-icons/fa'
import {
    FaLocationDot,
    FaChevronRight,
    FaGear,
} from "react-icons/fa6";
import {
    FaPhone,
    FaCity,
} from "react-icons/fa6";
import { redirect } from 'next/navigation'
import { myToken } from '@/utilities/myToken'

export default async function Addresses() {
    const token = await myToken()
    if (!token) {
        redirect('/login')
        return
    }
    const { data } = await GetLoggedUserAddress()
    return (
        <>
            <title>My Account</title>
            <div className="bg-linear-to-br from-[#5b3d29]  via-[#7f5539a6] to-[#7f5539c1] text-white">
                <div className="container mx-auto px-4 py-10 sm:py-14">
                    <nav className='flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap'>
                        <Link href='/' className='hover:text-white transition-colors'>Home</Link>
                        <span className='text-white/40'>/</span>
                        <span className='text-white font-medium'>My Account</span>
                    </nav>
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 overflow-hidden">
                            <FaUser className='text-2xl text-white' />
                        </div>
                        <div>
                            <h1 className='text-3xl sm:text-4xl font-bold tracking-tight'>My Acount</h1>
                            <p className='text-white/80 mt-1'>Manage your addresses and account settings</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    <aside className="w-full lg:w-72 shrink-0">
                        <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-gray-100">
                                <h2 className="font-bold text-gray-900">My Account</h2>
                            </div>

                            <ul className="p-2">
                                <li>
                                    <Link
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group bg-[#7f553969] text-[#7f5539]"
                                        href="/profile/addresses"
                                    >
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-[#7f5539] text-white">
                                            <FaLocationDot className="text-sm" />
                                        </div>

                                        <span className="font-medium flex-1">
                                            My Addresses
                                        </span>

                                        <FaChevronRight className="text-xs transition-transform text-[#7f553969]" />
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        href="/profile/settings"
                                    >
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-gray-100 text-gray-500 group-hover:bg-gray-200">
                                            <FaGear className="text-sm" />
                                        </div>

                                        <span className="font-medium flex-1">
                                            Settings
                                        </span>

                                        <FaChevronRight className="text-xs transition-transform text-gray-400" />
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </aside>

                    <main className="flex-1 ">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        My Addresses
                                    </h2>

                                    <p className="text-gray-500 text-sm mt-1">
                                        Manage your saved delivery addresses
                                    </p>
                                </div>
                                <AddressBtn mode="add"  />
                            </div>

                            {data.length == 0 ?
                                <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
                                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                                        <FaLocationDot className="text-3xl text-gray-400" />
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        No Addresses Yet
                                    </h3>

                                    <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                                        Add your first delivery address to make checkout faster and
                                        easier.
                                    </p>
                                    <div className='w-full flex justify-center'>
                                        <AddressBtn mode="add" />
                                    </div>
                                </div>
                                :
                                <div  className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {data.map((product: AddressType) =>
                                        <div key={product._id} className="bg-white rounded-2xl border border-gray-100 p-5 mb-3 shadow-sm hover:shadow-md hover:border-amber-100 transition-all duration-200 group">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-start gap-4 flex-1">
                                                    <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors">
                                                        <FaLocationDot className="text-lg text-[#7f5539]" />
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-bold text-gray-900 mb-1">
                                                            {product.name}
                                                        </h3>

                                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                            {product.details}
                                                        </p>

                                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                                            <span className="flex items-center gap-1.5">
                                                                <FaPhone className="text-xs" />
                                                                {product.phone}
                                                            </span>

                                                            <span className="flex items-center gap-1.5">
                                                                <FaCity className="text-xs" />
                                                                {product.city}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <AddressBtn mode="edit" address={product}  />

                                                    <DeleteAddress id={product._id} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            }
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
