'use server'
export const GetspecificbrandApi = async (id: string) => {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Unable to load brand details");
    const payload = await response.json();
    return payload;
};
