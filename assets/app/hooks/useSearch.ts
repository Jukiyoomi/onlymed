import {useInfiniteQuery} from "@tanstack/react-query";
import {useEffect} from "react";
import useSearchStore from "@store/search";

export default function useSearch(callback: () => void) {
	const [search, location] = useSearchStore((state) => [state.search, state.location]);

	const query = useInfiniteQuery(
		['search', search, location],
		({pageParam = 1}) => {
			const searchTerm = search.trim() !== "" ? search.trim().toLowerCase() : "";
			const locationTerm = location.trim() !== "" ? location.trim().toLowerCase() : "";
			callback();
			return fetch(`/api/search?term=${searchTerm}&zone=${locationTerm}&offset=${pageParam}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			})
				.then(res => res.json())
		}, {
			getNextPageParam: (lastPage, pages) => {
				if (lastPage.doctors.length === 0 || lastPage.doctors.length < 10) return pages.length;
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