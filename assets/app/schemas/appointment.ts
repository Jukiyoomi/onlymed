import {z} from "zod";
import doctorSchema from "@schemas/doctor";

export const singleApptSchema = z.object({
    id: z.number(),
    plannedAt: z.string(),
    doctor: doctorSchema.shape.doctor
})

const apptListSchema = z.object({
    appointments: z.array(singleApptSchema)
})

export default apptListSchema;

export type ApptType = z.infer<typeof singleApptSchema>;
export type ApptListType = z.infer<typeof apptListSchema>;