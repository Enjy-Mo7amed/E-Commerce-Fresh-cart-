'use server'
import { myToken } from "@/utilities/myToken";

export async function GetLoggedUserAddress() {
    const token = await myToken()
    if (!token) {
        throw new Error("Login First")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
        method: "GET",
        headers: {
            token,
            "Content-Type": "application/json"
        }
    })
    const payload = await response.json();
    return payload;
}

