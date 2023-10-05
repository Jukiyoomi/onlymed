import {useQuery} from "@tanstack/react-query";
import doctorSchema, {Doctor} from "@schemas/doctor";
import {z} from "zod";
import {defaultClient, validateSchema} from "../../api/wretch";

const timestampSchema = z.array(z.number().int().positive());

export function useDoctorQuery(id: string) {
    return useQuery<Doctor|undefined>({
        queryKey: ['doctor', id],
        queryFn: async () => {
            return defaultClient
                .get(`/doctors/${id}`)
                .then(async (res) => validateSchema<Doctor>(doctorSchema, res));
        }
    });
}

export function useTimestampQuery(id: string) {
    return useQuery<number[]|undefined>({
        queryKey: ['doctor', id, 'timestamp'],
        queryFn: async () => {
            return defaultClient
                .get(`/appointments/${id}`)
                .then(async (res) => validateSchema<number[]>(timestampSchema, res));
        },
        enabled: false
    });
}