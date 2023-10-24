import {useQuery} from "@tanstack/react-query";
import apptListSchema, {ApptType} from "@/schemas/appointment";
import {defaultClient, validateSchema} from "@/api/wretch";

export function useMyApptsQuery(as: "patient" | "doctor") {
	return useQuery<ApptType[]|undefined>({
		queryKey: ["appointments", "my", "all"],
		queryFn: async () => {
			return defaultClient
				.query({as})
				.get("/appointments")
				.then((res) => validateSchema<ApptType[]>(apptListSchema, res))
		},
		retry: 1,
	});
}