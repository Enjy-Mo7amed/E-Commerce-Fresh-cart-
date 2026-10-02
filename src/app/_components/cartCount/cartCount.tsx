import { GetLoggedUserCart } from '@/api/cartApi/GetLoggedUserCart'
import Link from 'next/link'
import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'

export default async function CartCount() {

    const data = await GetLoggedUserCart()
    const count = data?.numOfCartItems || 0;

    return (
        <Link href={'/cart'}>
            <div className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group">
                <FaShoppingCart className="text-[23px] text-gray-500 group-hover:text-[#7f5539] transition-colors duration-300" />
                {count > 0 && (
                    <div className="absolute top-0 right-0 w-5 h-5 flex items-center text-white font-medium text-[12px] justify-center rounded-full bg-[#7f5539]  border-2 border-white">
                        {count}
                    </div>
                )}
            </div>
        </Link>
    )
}
