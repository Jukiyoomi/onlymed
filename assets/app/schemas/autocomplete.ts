import {z} from "zod";

export const autocompleteSchema = z.array(z.object({
    description: z.string(),
    public_id: z.string()
}))

export type AutocompleteType = z.infer<typeof autocompleteSchema>;