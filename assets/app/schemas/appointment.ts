import {z} from "zod";
import doctorSchema from "./doctor";

export const singleApptSchema = z.object({
    id: z.number(),
    plannedAt: z.string(),
    doctor: doctorSchema
})

const apptListSchema = z.array(singleApptSchema);

export default apptListSchema;

export type ApptType = z.infer<typeof singleApptSchema>;
export type ApptListType = z.infer<typeof apptListSchema>;