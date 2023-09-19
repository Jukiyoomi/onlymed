import {z} from "zod";

const doctorSchema = z.object({
    doctor: z.object({
        id: z.number(),
        firstname: z.string(),
        lastname: z.string(),
        address: z.string(),
        specialities: z.array(z.object({
            id: z.number(),
            name: z.string()
        }))
    })
});

export default doctorSchema;
export type DoctorType = z.infer<typeof doctorSchema>;