import Link from 'next/link'
import {
    FaLocationDot,
    FaChevronRight,
    FaGear,
} from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import UpdateUserData from '@/app/_components/updateUserData/updateUserData';
import { UpdateUserDataApi } from "@/api/AuthApi/UpdateLoggeduserdata.api"
import UpdatePassword from '@/app/_components/updatePassword/updatePassword';
import { redirect } from 'next/navigation'
import { myToken } from '@/utilities/myToken'

export default async function Settings() {
    const token = await myToken()
    if (!token) {
        redirect('/login')
        return
    }
    const { user } = await UpdateUserDataApi()
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
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-gray-600 hover:bg-gray-50 hover:text-gray-900 "
                                        href="/profile/addresses"
                                    >
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-gray-100 text-gray-500 group-hover:bg-gray-200 ">
                                            <FaLocationDot className="text-sm" />
                                        </div>

                                        <span className="font-medium flex-1">
                                            My Addresses
                                        </span>

                                        <FaChevronRight className="text-xs transition-transform text-gray-400 " />
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group bg-[#7f553969] text-[#7f5539]"
                                        href="/profile/settings"
                                    >
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-[#7f5539] text-white">
                                            <FaGear className="text-sm" />
                                        </div>

                                        <span className="font-medium flex-1">
                                            Settings
                                        </span>

                                        <FaChevronRight className="text-xs transition-transform text-[#7f553969]" />
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </aside>

                    <main className="flex-1 min-w-0">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Account Settings
                                    </h2>

                                    <p className="text-gray-500 text-sm mt-1">
                                        Update your profile information and change your password
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white mb-5 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className="p-6 sm:p-8 border-b border-gray-100 ">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
                                            <FaUser className="text-2xl text-[#7f5539]" />
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-gray-900">
                                                Profile Information
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Update your personal details
                                            </p>
                                        </div>
                                    </div>

                                    <UpdateUserData userData={user} />

                                </div>

                                <div className="p-6 sm:p-8 bg-gray-50">
                                    <h3 className="font-bold text-gray-900 mb-4">
                                        Account Information
                                    </h3>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-500">
                                                User ID
                                            </span>

                                            <span className="font-mono text-gray-700">
                                                —
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-500">
                                                Role
                                            </span>

                                            <span className="px-3 py-1 rounded-lg bg-amber-100 text-[#5b3d29] font-medium capitalize">
                                                user
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className="p-6 sm:p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-[#b68e0c66] flex items-center justify-center">
                                            <FaLock className="text-2xl text-[#B68E0C] " />
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-gray-900">Change Password</h3>
                                            <p className="text-sm text-gray-500">Update your account password</p>
                                        </div>
                                    </div>

                                    <UpdatePassword />

                                </div>
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
