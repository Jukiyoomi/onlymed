import { create } from 'zustand';
import {devtools, persist} from "zustand/middleware";

export type User = {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	roles: string[];
}

interface State {
	user: User|null;
}

interface Actions {
	setUser: (user: User|null) => void;
	toString: (user: User|null) => string;
}

const initialState: State = {
	user: null,
}

const useUserStore = create<State & Actions>()(
	devtools(
		persist((set, get) => ({
			...initialState,
			setUser: (user: unknown) => set({ user: user as User }),
		}), { name: 'user-storage' })
	)
)

export const toString = (): string => {
	const user = useUserStore((state) => state.user);

	return `${user?.firstname} ${user?.lastname}`;
}

export default useUserStore;
