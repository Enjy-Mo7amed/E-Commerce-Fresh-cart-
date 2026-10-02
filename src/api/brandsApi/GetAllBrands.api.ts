'use server'
export const GetAllBrands = async () => {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`);
    if (!response.ok) throw new Error("Unable to load brands");
    const { data } = await response.json();
    return data;
};
