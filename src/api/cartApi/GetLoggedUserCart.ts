'use server'
import { myToken } from "@/utilities/myToken";

export async function GetLoggedUserCart() {
    const token = await myToken()
    if (!token) {
        return null
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
        method: "GET",
        headers: {
            token,
            "Content-Type": "application/json"
        }
    })
    const payload = await response.json();
    return payload;
}

