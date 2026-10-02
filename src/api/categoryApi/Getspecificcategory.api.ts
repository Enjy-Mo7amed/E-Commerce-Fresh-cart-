'use server'
export const  SpecificCategory = async (id:string) => {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Unable to load category details");
    const payload  = await response.json();
    return payload;
};
