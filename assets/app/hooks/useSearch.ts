import {useQuery} from "@tanstack/react-query";
import {useEffect, useRef} from "react";
import useSearchStore from "@store/search";
import searchSchema, {SearchType} from "@schemas/search";
import {defaultClient, validateSchema} from "../api/wretch";

export default function useSearch(page: number) {
	const [search, location] = useSearchStore((state) => [state.search, state.location]);
	const prevPageRef = useRef<number>(0);

	const query = useQuery<SearchType|undefined>({
		queryKey: ["search", search, location, page],
		queryFn: async () => {
			return defaultClient
				.query({term: search, zone: location, offset: page})
				.get("/search")
				.then((res) => validateSchema<SearchType>(searchSchema, res))
		},
		enabled: false,
		keepPreviousData: true
	});

	useEffect(() => {
		if (search.trim() === "") return;
		if (prevPageRef.current >= page) return;
		prevPageRef.current = page;
		query.refetch();
	}, [search, location, page]);

	return query;
}