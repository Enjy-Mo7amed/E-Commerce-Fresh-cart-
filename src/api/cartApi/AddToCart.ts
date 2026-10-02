'use server'
import { myToken } from "@/utilities/myToken";

export async function AddToCart(id: string) {
    const token = await myToken()
    if (!token) {
        throw new Error("login first")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
        method: "POST",
        headers:{
            token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId: id })
    })
    const payload = await response.json();
    return payload;
}

