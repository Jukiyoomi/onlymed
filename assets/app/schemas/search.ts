import {z} from "zod";
import doctor from "@schemas/doctor";

const searchSchema = z.array(
	doctor.shape.doctor
);

export default searchSchema;
export type Schema = z.infer<typeof searchSchema>;