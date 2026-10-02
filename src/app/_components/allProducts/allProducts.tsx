import ProductCard from '@/app/_components/productCard/productCard'
import { ProductType } from '@/types/allProducts.types'

export default function AllProductsDesign({ data, wishlistProductIds = [] }: { data: ProductType[], wishlistProductIds?: string[] }) {
    return (
        <>
            {data?.map((post: ProductType) => <ProductCard key={post.id} post={post} wishlistProductIds={wishlistProductIds} />)}
        </>
    )
}
