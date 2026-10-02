'use server'
export const GetProductsByBrand = async (brandId: string) => {
    const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
        { cache: 'no-store' }
    );
    if (!response.ok) throw new Error("Unable to load brand products");
    const { data } = await response.json();
    return data;
};
