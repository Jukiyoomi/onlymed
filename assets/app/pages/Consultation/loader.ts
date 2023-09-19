import {useQuery} from "@tanstack/react-query";
import doctorSchema, {Doctor} from "@schemas/doctor";
import wretch from "wretch";
import {ZodError} from "zod";

export default function useLoader(id: string) {
    return useQuery<Doctor>({
        queryKey: ['doctor', id],
        queryFn: async () => {
            return wretch()
                .get(`/api/doctors/${id}`)
                .json(async (res) => doctorSchema.parse(res))
                .then((res) => {
                    throw new Error("Une erreur est survenue. Veuillez recharger la page hihi.");
                })
                .catch((e: ZodError) => {
                    console.log(e);
                    return e;
                })
                .catch((e) => {
                    const parsedError = JSON.parse(e.message);
                    console.log(parsedError.error);
                    return parsedError;
                })
        }
    });
}