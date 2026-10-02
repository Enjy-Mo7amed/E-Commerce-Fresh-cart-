'use server'
import { myToken } from "@/utilities/myToken";

export async function ClearCart() {
    const token = await myToken()
    if (!token) {
        throw new Error("login first")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
        method: "DELETE",
        headers: {
            token,
            "Content-Type": "application/json"
        }
    })
    const payload = await response.json();
    return payload;
}

