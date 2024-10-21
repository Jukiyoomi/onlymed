import {z} from "zod";

const specialitySchema = z.object({
	id: z.number(),
	name: z.string()
})

export default specialitySchema;
export type Speciality = z.infer<typeof specialitySchema>;