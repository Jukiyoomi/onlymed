import {z} from "zod";
import doctorSchema from "@schemas/doctor";

const searchSchema = z.object({
	doctors: z.array(doctorSchema),
	hasMore: z.boolean()
});

export default searchSchema;
export type SearchType = z.infer<typeof searchSchema>;