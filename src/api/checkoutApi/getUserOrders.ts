'use server'

export async function GetUserOrders(id: string) {
    const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        { cache: 'no-store' }
    )
    const payload = await response.json();
    return payload;
}

