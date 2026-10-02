import { FaRegStar } from 'react-icons/fa'
import { FaEye } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';
import { ProductType } from '@/types/allProducts.types';
import AddCartBtn from '@/app/_components/addCartBtn/addCartBtn';
import AddWishlistBtn from '@/app/_components/addWishlistBtn/addWishlistBtn';

export default function ProductCard({ post, wishlistProductIds = [] }: { post: ProductType, wishlistProductIds?: string[] }) {
    return (
        <>
            <div className="bg-white hover:-translate-y-2 transition-all duration-300 border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl">
                <div className="relative"><Image width={500} height={500} src={post.imageCover} alt={post.title} />
                    <div className="absolute top-3 right-3 flex flex-col space-y-2">
                        <AddWishlistBtn wishlistProductIds={wishlistProductIds} id={post?.id} />
                        <Link href={`/products/${post.id}`} className='bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm text-gray-600 hover:text-[#7f5539] cursor-pointer'><FaEye /></Link>
                    </div>
                </div>
                <div className="p-4">
                    <div className="text-xs text-gray-500 mb-1">{post?.category?.name}</div>
                    <Link href={`/products/${post.id}`}> <h3 className="font-medium mb-1 cursor-pointer line-clamp-2 ">{post.title}</h3></Link>
                    <div className='flex items-center mb-2'>
                        <div className='flex text-amber-400 mr-2'>

                            {[...Array(5)].map((_, index) => (
                                index < post.ratingsAverage ? (
                                    <FaStar key={index} />
                                ) : (
                                    <FaRegStar key={index} className="text-gray-300" />
                                )
                            ))}
                        </div>
                        <div className="text-xs text-gray-500">
                            {post.ratingsAverage} ({post.ratingsQuantity})
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        {post.priceAfterDiscount ?
                            <div><div className="text-lg font-bold text-[#7f5539]">{post.priceAfterDiscount} EGp</div>
                                <div className="tet-gray-700 text-sm line-through">{post.price} EGP</div>
                            </div> :
                            <div className="text-lg font-bold text-gray-800">{post.price} EGp</div>}
                        {/* add cart */}
                        <AddCartBtn id={post?.id} />
                    </div>
                </div>
            </div>
        </>
    )
}
