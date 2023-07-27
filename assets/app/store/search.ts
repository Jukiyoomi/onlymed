import { create } from 'zustand';
import {devtools, persist} from "zustand/middleware";

interface State {
	search: string;
	location: string|null;
}

interface Actions {
	setSearch: (data: string) => void;
	setLocation: (data: string) => void;
	reset: () => void;
}

const initialState: State = {
	search: "",
	location: "",
}

const useSearchStore = create<State & Actions>()(
	devtools(
		persist((set) => ({
			...initialState,
			setSearch: (data: string) => set({ search: data }),
			setLocation: (data: string) => set({ location: data }),
			reset: () => set(initialState)
		}), { name: 'search-storage',  })
	)
)

export default useSearchStore;
