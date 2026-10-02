'use server'
import { myToken } from "@/utilities/myToken";

export async function UpdateCartApi(id: string, count: number) {
    const token = await myToken()
    if (!token) {
        throw new Error("login first")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`, {
        method: "PUT",
        headers: {
            token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ count: count })
    })
    const payload = await response.json();
    return payload;
}

