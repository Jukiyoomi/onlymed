import {useMutation} from "@tanstack/react-query";
import {ApptType, singleApptSchema} from "@schemas/appointment";
import {defaultClient, validateSchema} from "../../api/wretch";

type DataType = {
    date: string,
    doctorId: number,
    timestamp: number
}
export function useApptCreateMutation() {
    return useMutation((data: DataType) => {
        return defaultClient.url("/api/appointments")
            .post(data)
            .then((res) => validateSchema<ApptType>(singleApptSchema, res))
    })
}