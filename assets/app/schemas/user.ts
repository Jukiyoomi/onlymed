import {z} from "zod";

const userSchema = z.object({
    user: z.object({
        id: z.number(),
        firstname: z.string(),
        lastname: z.string(),
        email: z.string(),
        roles: z.array(z.string()),
    })
});

export default userSchema;

export type User = z.infer<typeof userSchema>;