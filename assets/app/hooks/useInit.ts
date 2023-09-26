import useUserStore from "@store/user";
import {useQuery} from "@tanstack/react-query";
import wretch from "wretch";
import {ZodError} from "zod";
import userSchema, {User} from "@schemas/user";


export default function useInit() {
	const setUser = useUserStore((state) => state.setUser);
	return useQuery<User>(['user'], async () => {
		return wretch()
			.get('/api/dashboard')
			.json(async (res) => userSchema.parse(res))
			.then((res) => {
				setUser(res.user);
				console.log(res.user);
				return res;
			})
			.catch((e: ZodError) => {
				console.log(e);
				return "Une erreur est survenue. Veuillez recharger la page.";
			})
			.catch((e) => {
				const parsedError = JSON.parse(e.message);
				console.log(parsedError.error);
				return parsedError;
			})
	});
}