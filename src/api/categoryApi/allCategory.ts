'use server'
export const AllCategories = async () => {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`);
    if (!response.ok) throw new Error("Unable to load categories");
    const { data } = await response.json();
    return data;
};
