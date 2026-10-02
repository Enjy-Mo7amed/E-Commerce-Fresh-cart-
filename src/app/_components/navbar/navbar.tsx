"use client";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { FaAddressBook, FaHeadphones, FaHeart, FaSearch, FaShoppingCart, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { FaBoxOpen, FaCarSide, FaGear, FaPhone, FaUser, FaUserPlus } from 'react-icons/fa6';
import { IoIosGift } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { VscThreeBars } from "react-icons/vsc";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    useSidebar
} from "@/components/ui/sidebar"
import { MdOutlineClose } from "react-icons/md";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoIosArrowDown } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

export default function NavBar({ CartCount, cartCountSidebar, WishlistCount, WishlistCountSidebar }: { CartCount: React.ReactNode, cartCountSidebar: React.ReactNode, WishlistCount: React.ReactNode, WishlistCountSidebar: React.ReactNode }) {
    const { setOpenMobile } = useSidebar();
    const { data: session } = useSession()
    const router = useRouter()
    const [searchValue, setSearchValue] = useState("")

    const submitSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const query = searchValue.trim()
        router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search")
        setSearchValue("")
        setOpenMobile(false)
    }

    const LogOut = async () => {
        await signOut({ redirect: false })
        router.push("/login")
        router.refresh()
    }

    return (
        <>
            <div className="top-nav border-b border-gray-100 hidden lg:block py-2.5 ">
                <div className="container flex text-sm  font-medium justify-between items-center ">
                    <div className="flex gap-6 items-center ">
                        <div className="flex gap-2 items-center">
                            <FaCarSide className="text-[#7f5539]" />
                            <span className=' text-gray-500'>Free Shipping on Orders 500 EGP</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <IoIosGift className="text-[#7f5539]" />
                            <span className=' text-gray-500'>New Arrivals Daily</span>
                        </div>
                    </div>
                    <div className="flex gap-8 items-center">
                        <div className="flex gap-4 items-center text-gray-500 transition duration-300">
                            <a className="hover:text-[#7f5539] flex gap-2 items-center" href="tel:+"><FaPhone />+1 (800) 123-4567</a>
                            <a className="hover:text-[#7f5539] flex gap-2 items-center" href="mailto:"><IoMail />support@freChcart.com</a>
                        </div>
                        {session ? <div className="flex gap-4 items-center text-gray-500 transition duration-300">
                            <Link href={'/profile/addresses'} className="hover:text-[#7f5539] flex gap-2 items-center">
                                <FaUser />{session?.user?.name}
                            </Link>
                            <span onClick={() => LogOut()} className="hover:text-[#7f5539] flex gap-2 cursor-pointer items-center">
                                <FaSignOutAlt /> Sign Out
                            </span>
                        </div> : <div className="flex gap-4 items-center text-gray-500 transition duration-300">
                            <Link href={'/login'} className="hover:text-[#7f5539] flex gap-2 items-center">
                                <FaUser /> Sign In
                            </Link>
                            <Link href={'/register'} className="hover:text-[#7f5539] flex gap-2 items-center">
                                <FaUserPlus />Sign Up
                            </Link>
                        </div>}

                    </div>
                </div>
            </div>

            <div className="bottom-nav bg-[#FFFFFF] sticky top-0 shadow-md  w-full z-20">
                <div className="container flex items-center justify-between h-16 lg:h-18 gap-4 lg:gap-8">
                    <Link href="/" className="flex gap-2 items-center text-lg sm:text-2xl font-bold">
                        <FaShoppingCart className="text-[#7f5539]" />
                        <span>FreshCart</span>
                    </Link>

                    <form onSubmit={submitSearch} className="hidden lg:flex flex-1 max-w-2xl">
                        <div className="relative w-full">
                            <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} type="text" name="search-input" placeholder="Search for products, prands and more...." id="search" className="w-full px-5 py-3 pr-12 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm" />
                            <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#7f5539] hover:bg-[#563a27] cursor-pointer  text-white flex items-center justify-center transition-colors"><FaSearch /></button>
                        </div>
                    </form>

                    <div className="hidden xl:flex gap-7 items-center">
                        <Link href={'/'}>
                            <div className=" font-semibold  text-gray-700 hover:text-[#7f5d46] transition-colors">
                                Home
                            </div>
                        </Link>
                        <Link href={'/products'}>
                            <div className=" font-semibold text-gray-700  hover:text-[#7f5d46] transition-colors">
                                Shop
                            </div>
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="porder-0 p-0 cursor-pointer" render={<Button><div className=" font-semibold text-gray-700  hover:text-[#7f5d46] transition-colors flex items-center gap-1">
                                Categories <IoIosArrowDown />
                            </div></Button>} />
                            <DropdownMenuContent className="w-50 bg-white h-full ring-0 shadow-xl" align="start">
                                <Link href={'/categories'}>
                                    <DropdownMenuItem className="shadow-sm p-2 text-gray-700 hover:bg-[#7f553955] hover:text-[#7f5539] transition cursor-pointer font-semibold mb-2">
                                        All Categories
                                    </DropdownMenuItem>
                                </Link>
                                <Link href={'/categories/6439d2d167d9aa4ca970649f'}>
                                    <DropdownMenuItem className="shadow-sm p-2 text-gray-700 hover:bg-[#7f553955] hover:text-[#7f5539] transition cursor-pointer font-semibold mb-2">
                                        Electronics
                                    </DropdownMenuItem>
                                </Link>
                                <Link href={'/categories/6439d58a0049ad0b52b9003f'}>
                                    <DropdownMenuItem className="shadow-sm p-2 text-gray-700 hover:bg-[#7f553955] hover:text-[#7f5539] transition cursor-pointer font-semibold mb-2">
                                        Woman's Fashion
                                    </DropdownMenuItem>
                                </Link>
                                <Link href={'/categories/6439d5b90049ad0b52b90048'}>
                                    <DropdownMenuItem className="shadow-sm p-2 text-gray-700 hover:bg-[#7f553955] hover:text-[#7f5539] transition cursor-pointer font-semibold mb-2">
                                        Men's Fashion
                                    </DropdownMenuItem>
                                </Link>
                                <Link href={'/categories/6439d30b67d9aa4ca97064b1'}>
                                    <DropdownMenuItem className="shadow-sm p-2 text-gray-700 hover:bg-[#7f553955] hover:text-[#7f5539] transition cursor-pointer font-semibold mb-2">
                                        Beauty & Health
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Link href={'/brands'}>
                            <div className=" font-semibold text-gray-700 hover:text-[#7f5d46] transition-colors">
                                Brands
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-1 lg:gap-2 ">
                        <Link href={'/contactus'}>
                            <div className="group hidden lg:flex items-center gap-2 pr-3 mr-2 border-r border-gray-200 ">
                                <div className="w-10 h-10 rounded-full bg-[#7f553955] group-hover:bg-[#5b3d29]  text-[#956c51] flex items-center justify-center">
                                    <FaHeadphones />
                                </div>
                                <div className="text-xs">
                                    <div className="text-gray-400 group-hover:text-gray-500">Support</div>
                                    <div className="font-semibold text-gray-600 group-hover:text-gray-800">27/7 Help</div>
                                </div>
                            </div>
                        </Link>

                        {WishlistCount}

                        {CartCount}

                        {session ? <>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="p-2.5 rounded-full hover:bg-gray-100 transition-colors porder-0 cursor-pointer" render={<div className=" text-gray-600 hover:text-[#7f5d46] transition-colors ">
                                    <FaUserCircle className="text-xl" />
                                </div>} />
                                <DropdownMenuContent className=" w-70 bg-white h-full ring-0 shadow-xl" align="start">
                                    <DropdownMenuItem className="border-b border-gray-200 flex items-center gap-2 rounded-none px-2 py-3 text-gray-700  font-medium mb-2">
                                        <div className="p-2.5 rounded-full bg-[#7f553969] text-[#7f5539]">
                                            <FaUserCircle className="text-2xl" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span>{session.user.name}</span>
                                            <span className="text-gray-500 text-sm">{session.user.email}</span>
                                        </div>
                                    </DropdownMenuItem>

                                    <div className="border-b border-gray-200">
                                        <Link href={'/profile/addresses'}>
                                            <DropdownMenuItem className="flex items-center gap-3 rounded-none px-4 py-2.5 text-sm text-gray-500 hover:bg-[#7f553955] hover:text-[#7f5539] transition cursor-pointer font-medium mb-2">
                                                <FaUser /> My Profile
                                            </DropdownMenuItem>
                                        </Link>

                                        <Link href={'/allorders'}>
                                            <DropdownMenuItem className="flex items-center gap-3 rounded-none px-4 py-2.5 text-sm text-gray-500 hover:bg-[#7f553955] hover:text-[#7f5539] transition cursor-pointer font-medium mb-2">
                                                <FaBoxOpen /> My Orders
                                            </DropdownMenuItem>
                                        </Link>

                                        <Link href={'/wishlist'}>
                                            <DropdownMenuItem className="flex items-center gap-3 rounded-none px-4 py-2.5 text-sm text-gray-500 hover:bg-[#7f553955] hover:text-[#7f5539] transition cursor-pointer font-medium mb-2">
                                                <FaHeart /> My Wishlist
                                            </DropdownMenuItem>
                                        </Link>

                                        <Link href={'/profile/addresses'}>
                                            <DropdownMenuItem className="flex items-center gap-3 rounded-none px-4 py-2.5 text-sm text-gray-500 hover:bg-[#7f553955] hover:text-[#7f5539] transition cursor-pointer font-medium mb-2">
                                                <FaAddressBook /> Addresses
                                            </DropdownMenuItem>
                                        </Link>

                                        <Link href={'/profile/settings'}>
                                            <DropdownMenuItem className="flex items-center gap-3 rounded-none px-4 py-2.5 text-sm text-gray-500 hover:bg-[#7f553955] hover:text-[#7f5539] transition cursor-pointer font-medium mb-2">
                                                <FaGear /> Settings
                                            </DropdownMenuItem>
                                        </Link>
                                    </div>

                                    <span onClick={() => LogOut()}>
                                        <DropdownMenuItem className="flex items-center gap-3 rounded-none px-4 py-2.5 text-sm text-red-600 hover:bg-red-100 transition cursor-pointer font-medium my-2">
                                            <FaSignOutAlt /> Sign Out
                                        </DropdownMenuItem>
                                    </span>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </> : <Link href={'/login'}>
                            <button className="hidden cursor-pointer lg:flex relative w-full justify-center shadow-sm  items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group">
                                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                </span>
                                <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                </span>
                                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                                <span className="relative w-full flex items-center gap-2  font-semibold text-sm text-white transition-colors duration-200 ease-in-out group-hover:text-white"><FaUser className="text-xs" /> Sign In</span>
                            </button>
                        </Link>}

                        <button onClick={() => setOpenMobile(true)} className="cursor-pointer lg:hidden ml-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#7f5539] hover:bg-[#5b3d29] text-white flex items-center justify-center transition-colors text-xl">
                            <VscThreeBars />
                        </button>
                    </div>
                </div>
            </div>

            <Sidebar side="right" className=" lg:hidden">
                <SidebarHeader className="flex flex-row  items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
                    <Link href="/" className="flex gap-2 items-center text-2xl font-bold">
                        <FaShoppingCart className="text-[#7f5539]" />
                        <span>FreshCart</span>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setOpenMobile(false)}
                        className="p-2 text-gray-500 hover:text-[#7f5539] hover:bg-gray-100 rounded-full transition-colors cursor-pointer border-0 outline-none"
                        aria-label="Close Sidebar"
                    >
                        <MdOutlineClose className="text-2xl" />
                    </button>
                </SidebarHeader>
                <SidebarContent className="bg-white p-3">
                    <form onSubmit={submitSearch} className="p-4 border-b border-gray-100">
                        <div className="relative">
                            <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} type="text" name="search-input" placeholder="Search products...." id="search" className="w-full px-5 py-3 pr-12 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm" />
                            <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#7f5539] hover:bg-[#563a27] cursor-pointer  text-white flex items-center justify-center transition-colors"><FaSearch /></button>
                        </div>
                    </form>
                    <nav className="p-4 border-b border-gray-100">
                        <div className="space-y-1">
                            <Link onClick={() => setOpenMobile(false)} href={'/'}>
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-700 hover:text[#7f5539] hover:bg-[#7f553955] transition-colors">
                                    Home
                                </div>
                            </Link>
                            <Link onClick={() => setOpenMobile(false)} href={'/products'}>
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-700 hover:text[#7f5539] hover:bg-[#7f553955] transition-colors">
                                    Shop
                                </div>
                            </Link>
                            <Link onClick={() => setOpenMobile(false)} href={'/categories'}>
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-700 hover:text[#7f5539] hover:bg-[#7f553955] transition-colors">
                                    Categories
                                </div>
                            </Link>
                            <Link onClick={() => setOpenMobile(false)} href={'/brands'}>
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-700 hover:text[#7f5539] hover:bg-[#7f553955] transition-colors">
                                    Brands
                                </div>
                            </Link>
                        </div>
                    </nav>
                    <div className="p-4 space-y-1 border-b border-gray-100  ">
                        <Link onClick={() => setOpenMobile(false)} href={'/wishlist'}>
                            {WishlistCountSidebar}
                        </Link>

                        <Link onClick={() => setOpenMobile(false)} href={'/cart'}>
                            {cartCountSidebar}
                        </Link>

                    </div>
                    {session ? <div className="p-4 space-y-1 ">
                        <div onClick={() => setOpenMobile(false)}>
                            <Link href={'/profile/addresses'} className="hover:bg-[#7f553969] px-4 py-2 rounded-xl text-sm flex gap-3 items-center  transition cursor-pointer font-medium my-2 text-gray-700">
                                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"><FaUser /></div>
                                {session?.user?.name}
                            </Link>
                        </div>
                        <div onClick={() => setOpenMobile(false)}>
                            <span className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-red-600 hover:bg-red-100 transition cursor-pointer font-medium my-2" onClick={() => LogOut()}>
                                <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center"><FaSignOutAlt /></div>
                                Sign Out
                            </span>
                        </div>
                    </div> : <div className="p-4 space-y-1 border-b border-gray-100 grid grid-cols-2 gap-3 ">
                        <div>
                            <Link onClick={() => setOpenMobile(false)} href={'/login'}>
                                <button className="relative w-full cursor-pointer justify-center shadow-sm flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group">
                                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                                        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                    </span>
                                    <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                                        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                                    <span className="relative w-full  font-semibold text-white transition-colors duration-200 ease-in-out group-hover:text-white "> Sign In</span>
                                </button>
                            </Link>
                        </div>
                        <div>
                            <Link onClick={() => setOpenMobile(false)} href={'/register'}>
                                <button className="relative w-full cursor-pointer justify-center shadow-sm flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#7f5539] rounded-md group">
                                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-mr-4 group-hover:-mt-4">
                                        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                    </span>
                                    <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#5b3d29] rounded group-hover:-ml-4 group-hover:-mb-4">
                                        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#5b3d29] rounded-md group-hover:translate-x-0" />
                                    <span className="relative w-full font-semibold text-white transition-colors duration-200 ease-in-out group-hover:text-white"> Sign Up</span>
                                </button>
                            </Link>
                        </div>
                    </div>}
                    <div onClick={() => setOpenMobile(false)} className="cursor-pointer mx-4 mt-2 p-4 rounded-xl bg-[#7f553955]  border border-gray-100 flex items-center  gap-3 hover:bg-[#7f55397a]  transition-colors">
                        <Link href={'/contactus'}>
                            <div className="flex items-center gap-2  border-gray-200 ">
                                <div className="w-10 h-10 rounded-full bg-[#7f553955]  text-[#956c51] flex items-center justify-center">
                                    <FaHeadphones />
                                </div>
                                <div>
                                    <div className="text-gray-900 font-semibold">Need Help</div>
                                    <div className="font-semibold text-[#7f5539] ">Contact Us</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </SidebarContent>
            </Sidebar>
        </>
    );
}
