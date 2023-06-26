import { create } from 'zustand';
import {devtools, persist} from "zustand/middleware";

interface SearchStore {
	search: string;
	location: string;
	setSearch: (data: string) => void;
	setLocation: (data: string) => void;
}

const useSearchStore = create<SearchStore>()(
	devtools(
		persist((set) => ({
			search: "",
			location: "dupont",
			setSearch: (data: string) => set({ search: data }),
			setLocation: (data: string) => set({ location: data }),
		}), { name: 'search-storage' })
	)
)

export default useSearchStore;
