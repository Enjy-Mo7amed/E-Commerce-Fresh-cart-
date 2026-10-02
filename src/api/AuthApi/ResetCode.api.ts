'use server'

export async function ResetCodeing(resetCode: string) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({resetCode})
    })
    const payload = await response.json();
    return payload;
}

