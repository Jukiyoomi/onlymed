import { create } from 'zustand';
import {devtools, persist} from "zustand/middleware";

export type User = {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	roles: string[];
}

interface UserStore {
	user: User|null;
	setUser: (user: User|null) => void;
	toString: (user: User|null) => string;
}

const useUserStore = create<UserStore>()(
	devtools(
		persist((set) => ({
			user: null,
			setUser: (user: unknown) => set({ user: user as User }),
		}), { name: 'user-storage' })
	)
)

export const toString = (): string => {
	const user = useUserStore((state) => state.user);

	return `${user?.firstname} ${user?.lastname}`;
}

export default useUserStore;
