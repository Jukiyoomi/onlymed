import {useInfiniteQuery} from "@tanstack/react-query";
import {useEffect} from "react";
import useSearchStore from "@store/search";
import wretch from "wretch";
import searchSchema from "@schemas/search";

export default function useSearch(callback: () => void) {
	const [search, location] = useSearchStore((state) => [state.search, state.location]);

	const query = useInfiniteQuery({
		queryKey: ["search", search, location],
		queryFn: ({pageParam = 1}) => {
			const searchTerm = search.trim() !== "" ? search.trim().toLowerCase() : "";
			const locationTerm = location.trim() !== "" ? location.trim().toLowerCase() : "";
			callback();

			return wretch()
				.get(`/api/search?term=${searchTerm}&zone=${locationTerm}&offset=${pageParam}`)
				.json((res) => searchSchema.parse(res))
		},
		getNextPageParam: (lastPage, pages) => {
			if (lastPage.length === 0 || lastPage.length < 10) return pages.length;
			return pages.length + 1;
		},
		enabled: false,
	});

	useEffect(() => {
		if (search.trim() === "") return;
		query.refetch();
	}, [search, location]);

	return query;
}