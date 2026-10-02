import { z } from 'zod'

export const addressSchema = z.object({
    name: z.string().min(2, "Address name is required"),
    details: z.string().min(5, "Full address is required"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
    city: z.string().min(2, "City is required"),
})

export type addressSchemaType = z.infer<typeof addressSchema>