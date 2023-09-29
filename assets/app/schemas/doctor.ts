import {z} from "zod";
import specialitySchema from "@schemas/speciality";

const doctorSchema = z.object({
    id: z.number(),
    firstname: z.string(),
    lastname: z.string(),
    address: z.string(),
    speciality: specialitySchema
});

export default doctorSchema;
export type Doctor = z.infer<typeof doctorSchema>;