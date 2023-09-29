import {useQuery} from "@tanstack/react-query";
import doctorSchema, {Doctor} from "@schemas/doctor";
import wretch from "wretch";
import {z} from "zod";

const timestampSchema = z.array(z.number().int().positive());

export function useDoctorQuery(id: string) {
    return useQuery<Doctor>({
        queryKey: ['doctor', id],
        queryFn: async () => {
            const data = await wretch()
                .get(`/api/doctors/${id}`)
                .json(async (res) => res);

            if (data.error) {
                throw new Error(JSON.stringify(data));
            }

            return doctorSchema.parse(data);
        }
    });
}

export function useTimestampQuery(id: string) {
    return useQuery<number[]>({
        queryKey: ['doctor', id, 'timestamp'],
        queryFn: async () => {
            const data = await wretch()
                .get(`/api/appointments/${id}`)
                .json(async (res) => res);

            if (data.error) {
                throw new Error(JSON.stringify(data));
            }

            return timestampSchema.parse(data);
        },
        enabled: false
    });
}