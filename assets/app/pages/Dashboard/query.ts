import {useQuery} from "@tanstack/react-query";
import apptListSchema, {ApptType} from "@schemas/appointment";
import wretch from "wretch";
import {ZodError} from "zod";

export function useMyApptsQuery() {
	return useQuery<ApptType[]>(["appointments", "all"], () => {
		return wretch()
			.get('/api/appointments')
			.json(async (res) => apptListSchema.parse(res))
			.then((res) => res)
			.catch((e: ZodError) => {
				console.log(e)
				return "Une erreur est survenue. Veuillez recharger la page.";
			})
			.catch((e) => {
				const parsedError = JSON.parse(e.message);
				console.log(parsedError.error);
				return parsedError;
			})
	});
}