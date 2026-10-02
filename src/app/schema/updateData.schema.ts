import { z } from 'zod'

export const dataSchema = z.object({
    name: z.string().min(2, "Name name is required"),
    email: z.string().min(1, 'email is required').pipe(z.email('invalid Email')),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
})

export type dataSchemaType = z.infer<typeof dataSchema>