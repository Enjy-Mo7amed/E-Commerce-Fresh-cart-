import z from "zod";

export const checkoutSchema = z.object({
    details: z.string().min(1, 'Address details must be at least 10 characters'),
    phone: z.string().min(1, 'Please enter a valid Egyptian phone number').regex(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number"),
    city: z.string().min(1, 'City name must be at least 2 characters').min(2, "City name must be at least 2 characters"),
})

export type checkoutSchemaType = z.infer<typeof checkoutSchema>