import useUserStore from "@/store/user";
import {useQuery} from "@tanstack/react-query";
import userSchema from "@/schemas/user";
import {defaultClient, validateSchema} from "@/api/wretch";


export default function useInit() {
	const setUser = useUserStore((state) => state.setUser);
	return useQuery({
		queryKey: ['user'],
		queryFn: async () => {
			return defaultClient
				.get('/dashboard')
				.then((res) => validateSchema(userSchema, res))
				.then((res) => {
					if (res) {
						setUser(res);
						console.log(res);
						return res;
					}
				})
		}
	});
}