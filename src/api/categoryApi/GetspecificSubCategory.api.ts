'use server'
export const  SpecificSubCategory = async (id:string) => {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Unable to load subcategory details");
    const payload  = await response.json();
    return payload;
};
