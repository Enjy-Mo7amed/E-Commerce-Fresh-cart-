import CartCount from '@/app/_components/cartCount/cartCount'
import CartCountSidebar from '@/app/_components/cartCountSidebar/cartCountSidebar'
import NavBar from '@/app/_components/navbar/navbar'
import WishlistCount from '@/app/_components/wishlistCount/wishlistCount'
import WishlistCountSidebar from '@/app/_components/wishlistCountSidebar/wishlistCountSidebar'
import React from 'react'

export default function NavBarTwo() {
    return (
        <NavBar WishlistCountSidebar={<WishlistCountSidebar />} WishlistCount={<WishlistCount />} cartCountSidebar={<CartCountSidebar />} CartCount={<CartCount />} />
    )
}
