'use server'
import { myToken } from "@/utilities/myToken";
interface UpdatePayload {
    name: string
    email: string
    phone: string
}

export async function UpdateUserDataApi(values?: UpdatePayload) {
    const token = await myToken()
    if (!token) {
        throw new Error("login first")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, {
        method: "PUT",
        headers:{
            token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    })
    const payload = await response.json();
    return payload;
}

