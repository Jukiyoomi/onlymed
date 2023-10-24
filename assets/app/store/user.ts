import { create } from 'zustand';
import {devtools, persist} from "zustand/middleware";
import {Role} from "@/schemas/role";

type User = {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	roles: string[];
}

interface State {
	user: User|null;
	specificRole: Role|null
}

interface Actions {
	setUser: (user: User|null) => void;
	toString: (user: User|null) => string;
}

const initialState: State = {
	user: null,
	specificRole: null
}

const useUserStore = create<State & Actions>()(
	devtools(
		persist((set, get) => ({
			...initialState,
			setUser: (user: unknown) => (
				set({
					user: user as User,
					specificRole: user ?
						(user as User).roles.filter(role => role !== "ROLE_USER")[0] as Role :
						null
				})
			),
		}), { name: 'user-storage' })
	)
)

export const toString = (): string => {
	const user = useUserStore((state) => state.user);

	return `${user?.firstname} ${user?.lastname}`;
}

export default useUserStore;
