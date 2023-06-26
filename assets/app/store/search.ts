import { create } from 'zustand';
import {devtools, persist} from "zustand/middleware";

interface SearchStore {
	search: string;
	setSearch: (data: string) => void;
}

const useSearchStore = create<SearchStore>()(
	devtools(
		persist((set) => ({
			search: "",
			setSearch: (data: string) => set({ search: data }),
		}), { name: 'search-storage' })
	)
)

export default useSearchStore;
