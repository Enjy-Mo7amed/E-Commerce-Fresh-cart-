import React from 'react'
import DetailesPost from '../../../_components/detailes/detailes'
import { GetProductDetail } from '../../../../api/GetProductDetail'
import { AllProducts } from '../../../../api/allProducts'
import { ProductType } from '@/types/allProducts.types'
import ProductCard from '@/app/_components/productCard/productCard'
import SimilarProducts from '@/app/_components/similarProducts/similarProducts'
import { GetLoggedUserWishlist } from '@/api/wishlistApi/Getloggedwishlist'
import { notFound } from 'next/navigation'


export default async function ProductDetailes({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await GetProductDetail(id)
  if (!data) notFound()
  const [postData, dataWishlist] = await Promise.all([AllProducts(), GetLoggedUserWishlist()])

  const wishlistProductIds: string[] =
    dataWishlist?.data?.map((item: ProductType) => item._id || item.id) ?? []

  const cards = postData
    ?.filter((post: ProductType) => post.category.name === data.category.name && post.id !== data.id)
    .map((post: ProductType) => <ProductCard key={post.id} post={post} wishlistProductIds={wishlistProductIds} />) ?? []

  return (
    <>
      <title>Product Detailes</title>
      <DetailesPost data={data} wishlistProductIds={wishlistProductIds} />
      <SimilarProducts cards={cards} />
    </>
  )
}
