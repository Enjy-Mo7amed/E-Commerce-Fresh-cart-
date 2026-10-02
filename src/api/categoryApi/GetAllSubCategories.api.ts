'use server'
export const GetAllSubCategories = async () => {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories?limit=100`, { cache: 'no-store' });
    if (!response.ok) throw new Error("Unable to load subcategories");
    const payload  = await response.json();
    return payload;
};
