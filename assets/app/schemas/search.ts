import {z} from "zod";
import doctorSchema from "@schemas/doctor";

const searchSchema = z.array(
	doctorSchema
);

export default searchSchema;
export type Schema = z.infer<typeof searchSchema>;