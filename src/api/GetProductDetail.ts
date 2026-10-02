'use server'
export const GetProductDetail = async (id : string) => {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Unable to load product details");
    const { data } = await response.json();
    return data;
};
