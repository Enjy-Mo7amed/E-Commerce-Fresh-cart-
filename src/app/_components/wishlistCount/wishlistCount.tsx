import { GetLoggedUserWishlist } from '@/api/wishlistApi/Getloggedwishlist';
import Link from 'next/link'
import React from 'react'
import { FaHeart } from 'react-icons/fa'

export default async function WishlistCount() {

    const data = await GetLoggedUserWishlist()
    const count = data?.count || 0;

    return (
        <Link href={'/wishlist'}>
            <div className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group">
                <FaHeart className="text-[23px] text-gray-500 group-hover:text-[#7f5539] transition-colors duration-300" />
                {count > 0 && (
                    <div className="absolute top-0 right-0 w-5 h-5 flex items-center text-white font-medium text-[12px] justify-center rounded-full bg-red-500 border-2 border-white">
                        {count}
                    </div>
                )}
            </div>
        </Link>
    )
}
