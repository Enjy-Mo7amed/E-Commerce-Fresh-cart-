import z from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, 'nama nust be at least 3 characters').max(50, 'name must be at most 50 characters').min(1, 'name is required'),
    email: z.string().min(1, 'email is required').pipe(z.email('invalid Email')),
    password: z.string().min(1, 'password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"),
    rePassword: z.string().min(1, 'rePassword is required'),
    phone: z.string().min(1, 'phone is required').regex(/^01[0125][0-9]{8}$/, 'phone must be an egyption number')
}).refine((object) => object.password === object.rePassword, {
    path: ['rePassword'],
    error: 'password and rePassword must be the same'
})

export type registerSchemaType = z.infer<typeof registerSchema>