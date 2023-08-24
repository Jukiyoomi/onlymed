import useUserStore from "@store/user";
import {useQuery} from "@tanstack/react-query";

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
		return fetch('/api/dashboard')
			.then(res => res.json())
			.then(data => {
				setUser(data.user);
				return data;
			})
			.catch(err => {

			})
	});
}