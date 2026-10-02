import { GetLoggedUserCart } from '@/api/cartApi/GetLoggedUserCart'
import Link from 'next/link'
import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'

export default async function CartCountSidebar() {

    const data = await GetLoggedUserCart()
    const count = data?.numOfCartItems || 0;

    return (
        <div className="flex items-center justify-between  font-semibold px-4 py-3 rounded-xl hover:bg-[#7f553955] transition-colors">
            <div className='flex items-center gap-3'>
                <div className="bg-[#7f553955] flex items-center justify-center w-9 h-9 rounded-full">  <FaShoppingCart className="text-xl text-[#7f5539] transition-colors duration-300" /></div>
                Cart
            </div>
            <div>
                {count > 0 && (
                    <div className="w-7 h-7 flex items-center text-white font-medium text-sm justify-center rounded-full bg-[#7f5539]">
                        {count}
                    </div>
                )}
            </div>
        </div>
    )
}
