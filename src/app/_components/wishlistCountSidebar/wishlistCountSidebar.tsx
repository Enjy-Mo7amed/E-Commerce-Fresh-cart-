import { GetLoggedUserWishlist } from '@/api/wishlistApi/Getloggedwishlist';
import React from 'react'
import { FaHeart } from 'react-icons/fa'

export default async function WishlistCountSidebar() {

    const data = await GetLoggedUserWishlist()
    const count = data?.count || 0;


    return (
        <div className="flex items-center justify-between font-semibold px-4 py-3 rounded-xl hover:bg-[#7f553955] transition-colors">
            <div className='flex items-center gap-3'>
                <div className="bg-red-100 flex items-center justify-center w-9 h-9 rounded-full"> <FaHeart className="text-xl text-red-500  transition-colors duration-300" /></div>
                WishList
            </div>

            <div>
                {count > 0 && (
                    <div className="w-7 h-7 flex items-center text-white font-medium text-sm justify-center rounded-full bg-red-600">
                        {count}
                    </div>
                )}
            </div>
        </div>
    )
}
