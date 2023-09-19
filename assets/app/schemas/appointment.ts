import {z} from "zod";
import doctorSchema from "@schemas/doctor";

const apptSchema = z.object({
    id: z.number(),
    plannedAt: z.string(),
    doctor: doctorSchema.shape.doctor
})

const apptListSchema = z.object({
    appointments: z.array(apptSchema)
})

export default apptListSchema;

export type ApptType = z.infer<typeof apptSchema>;
export type ApptListType = z.infer<typeof apptListSchema>;