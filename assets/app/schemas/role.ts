import {z} from "zod";

const roleSchema = z.enum([
    "ROLE_PATIENT",
    "ROLE_DOCTOR",
])

export type Role = z.infer<typeof roleSchema>;