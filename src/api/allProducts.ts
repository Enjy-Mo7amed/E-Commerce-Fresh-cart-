'use server'
export const AllProducts = async () => {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);
    if (!response.ok) throw new Error("Unable to load products");
    const { data } = await response.json();
    return data;
};
