import z from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, 'email is required').pipe(z.email('invalid Email')),
    password: z.string().min(1, 'password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "password must be start with ...."),
})

export type loginSchemaType = z.infer<typeof loginSchema>