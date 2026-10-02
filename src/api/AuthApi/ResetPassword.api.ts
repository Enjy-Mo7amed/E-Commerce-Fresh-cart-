'use server'
export async function ResetPassword(email: string , newPassword:string) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email,newPassword})
    })
    const payload = await response.json();
    return payload;
}

