'use server'
import { myToken } from "@/utilities/myToken"

interface AddressPayload {
    name: string
    details: string
    phone: string
    city: string
}

export async function AddAddress(values: AddressPayload) {
    const token = await myToken()
    if (!token) {
        throw new Error("Login First")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
        method: "POST",
        headers: {
            token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    })
    const payload = await response.json()
    return payload
}