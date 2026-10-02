'use server'
import { myToken } from "@/utilities/myToken";
interface ShippingAddress {
    details: string,
    phone: string,
    city: string,
}
export async function CreateCashOrder(cartId: string, values: ShippingAddress) {
    const token = await myToken()
    if (!token) {
        throw new Error("Something Went Wrong")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
        method: "POST",
        headers: {
            token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ shippingAddress: values })
    })
    const payload = await response.json();
    return payload;
}

