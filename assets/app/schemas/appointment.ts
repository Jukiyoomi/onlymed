import {z} from "zod";

const apptSchema = z.object({
    id: z.number(),
    plannedAt: z.string(),
    doctor: z.object({
        firstname: z.string(),
        lastname: z.string(),
        address: z.string(),
        specialities: z.array(z.object({
            id: z.number(),
            name: z.string()
        }))
    })
})

const apptListSchema = z.object({
    appointments: z.array(apptSchema)
})

export default apptListSchema;

export type ApptType = z.infer<typeof apptSchema>;
export type ApptListType = z.infer<typeof apptListSchema>;