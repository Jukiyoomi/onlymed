import useUserStore from "@store/user";
import {useQuery} from "@tanstack/react-query";
import wretch from "wretch";

type User = {
	id: number,
	firstname: string,
	lastname: string,
	email: string,
	userIdentifier: string,
	username: string,
	roles: string[],
}

export default function useInit() {
	const setUser = useUserStore((state) => state.setUser);
	return useQuery<User>(['user'], async () => {
		return wretch()
			.get('/api/dashboard')
			.res(async (res) => {
				const data = await res.json();
				setUser(data.user);
				console.log(data);
				return data;
			})
			.catch((e) => {
				console.log(JSON.parse(e.message));
				throw e.message;
			})
	});
}