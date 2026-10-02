'use server'

export async function ForgotPasswording(email: string) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email})
    })
    const payload = await response.json();
    return payload;
}

