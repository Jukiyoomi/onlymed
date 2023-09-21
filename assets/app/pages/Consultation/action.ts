import {useMutation} from "@tanstack/react-query";
import wretch from "wretch";
import {singleApptSchema} from "@schemas/appointment";

type DataType = {
    date: string,
    doctorId: number,
}
export default function useAction() {
    return useMutation((data: DataType) => {
        return wretch("/api/appointments")
            .post(data)
            .json(async (res) => res)
            .then((res) => singleApptSchema.parse(res))
            .catch((err: Error) => {
                const parsedError = JSON.parse(err.message) as string;
                console.log(parsedError);
                throw parsedError
            })
    })
}