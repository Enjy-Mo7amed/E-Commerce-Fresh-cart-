'use server'
export const GetProductsBySubCategory = async (subCategoryId: string) => {
    const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products?subcategory[in]=${subCategoryId}`,
        { cache: 'no-store' }
    );
    if (!response.ok) throw new Error("Unable to load subcategory products");
    const { data } = await response.json();
    return data;
};
