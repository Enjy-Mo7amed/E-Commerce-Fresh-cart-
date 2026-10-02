import { z } from 'zod'

export const updatePassSchema = z.object({
    currentPassword: z.string().min(1, "currentPassword is required"),
    password: z.string().min(1, 'password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"),
    rePassword: z.string().min(1, 'rePassword is required'),

}).refine((object) => object.password === object.rePassword, {
    path: ['rePassword'],
    error: 'password and rePassword must be the same'
})

export type updatePassSchemaType = z.infer<typeof updatePassSchema>