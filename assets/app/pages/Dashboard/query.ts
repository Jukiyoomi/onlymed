import {useQuery} from "@tanstack/react-query";
import apptListSchema, {ApptType} from "@/schemas/appointment";
import {defaultClient, validateSchema} from "@/api/wretch";

export function useMyApptsQuery() {
	return useQuery<ApptType[]|undefined>({
		queryKey: ["appointments", "my", "all"],
		queryFn: async () => {
			return defaultClient
				.get("/appointments")
				.then((res) => validateSchema<ApptType[]>(apptListSchema, res))
		},
		retry: 1,
	});
}