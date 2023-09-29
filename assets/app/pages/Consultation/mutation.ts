import {useMutation} from "@tanstack/react-query";
import wretch from "wretch";
import {singleApptSchema} from "@schemas/appointment";

type DataType = {
    date: string,
    doctorId: number,
    timestamp: number
}
export function useApptCreateMutation() {
    return useMutation((data: DataType) => {
        return wretch("/api/appointments")
            .post(data)
            .json(async (res) => res)
            .then((res) => singleApptSchema.parse(res))
            .catch((err: Error) => {
                let parsedError: string;
                const parsedErrorMessage = JSON.parse(err.message);

                if (typeof parsedErrorMessage === "string") {
                    parsedError = parsedErrorMessage; // error from the server
                } else {
                    parsedError = "Une erreur est survenue. Veuillez recharger la page." // zod error
                }

                console.log(parsedError);
                throw parsedError
            })
    })
}