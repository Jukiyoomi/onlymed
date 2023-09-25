import {useQuery} from "@tanstack/react-query";
import doctorSchema, {Doctor} from "@schemas/doctor";
import wretch from "wretch";

export default function useLoader(id: string) {
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