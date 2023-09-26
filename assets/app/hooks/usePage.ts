import {useEffect, useState} from "react";
import useSearch from "@hooks/useSearch";

export default function usePage() {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [isFirstDisplay, setIsFirstDisplay] = useState<boolean>(true);
	const [hasFirstResult, setHasFirstResult] = useState<boolean>(false);
	const {
		fetchNextPage,
		hasNextPage,
		fetchPreviousPage,
		...query} = useSearch(() => {
		setIsFirstDisplay(false);
		setHasFirstResult(false);
	});

	const goToPreviousPage = () => {
		setCurrentPage(old => old - 1);
		fetchPreviousPage();
	}

	const goToNextPage = () => {
		setCurrentPage(old => old + 1);
		fetchNextPage();
	}

	useEffect(() => {
		if (query.data?.pages[0]?.length && query.data.pages[0].length > 0) {
			setHasFirstResult(true);
		}
	}, [query.data]);

	useEffect(() => {
		if (currentPage === 0) return;
		if (
			(query.data?.pages[currentPage]?.length === 0) ||
			(query.data?.pages[currentPage][0].id === query.data?.pages[currentPage - 1][0].id)
		) {
			setCurrentPage(old => old - 1);
			console.log("Retour en arrière")
		}
	}, [query.data])

	return {
		currentPage,
		isFirstDisplay,
		hasFirstResult,
		query,
		prevDisabled: !hasFirstResult || currentPage === 0,
		nextDisabled: Boolean(
			!hasNextPage || // If there is no next page
			(
				query.data?.pages &&
				(
					(query.data?.pages[currentPage]?.length < 10) || // If the current page is not full
					(query.data?.pages[currentPage + 1]?.length === 0) // If the next page is empty
				)
			)
		),
		goToPreviousPage,
		goToNextPage
	}
}