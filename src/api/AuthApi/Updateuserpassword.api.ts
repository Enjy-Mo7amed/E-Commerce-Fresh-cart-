'use server'
import { myToken } from "@/utilities/myToken";
interface UpdatePass {
    currentPassword: string
    password: string
    rePassword: string
}

export async function UpdateUserPasswordApi(values?: UpdatePass) {
    const token = await myToken()
    if (!token) {
        throw new Error("login first")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, {
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

