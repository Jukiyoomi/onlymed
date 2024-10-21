import SearchDoctorItem, {SearchDoctorLoading} from "./SearchDoctorItem";
import React, {useEffect, useState} from "react";
import Pagination from "@/components/Pagination";
import Button from "@/components/Button";
import useSearch from "@/hooks/useSearch";

export default function Results() {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [hasFirstResult, setHasFirstResult] = useState<boolean>(false);

	const {
		data,
		error,
		isInitialLoading,
		isFetching,
		isPreviousData,
		refetch
	} = useSearch(currentPage + 1)

	useEffect(() => {
		if (data?.doctors && data.doctors.length > 0) {
			setHasFirstResult(true);
		}
	}, [data]);

	if (error) return (
		<section className="result">
			<p className="reg-bold">Erreur : {error as string}</p>
		</section>
	)

	return (
		<section className="result">
			{isInitialLoading || isFetching ?
				(
					Array.from({length: 5}).map((_, id) => (
						<SearchDoctorLoading key={id} />
					))
				) :
				(data?.doctors?.length === 0 ?
					(
						<div className="no-result">
							<p className="reg-bold">No result found.</p>
						</div>
					) :
					data?.doctors.map((doctor) => (
						<SearchDoctorItem doctor={doctor} key={doctor.id} />
					))
				)
			}
			{
				hasFirstResult && (
					<Pagination>
						<Pagination.Action>
							<Button
								type="primary"
								onClick={() => {
									setCurrentPage(old => Math.max(old - 1, 0));
								}}
								disabled={!data || isFetching || (!hasFirstResult || currentPage === 0)}
								uppercase={true}
							>Previous page</Button>
						</Pagination.Action>
						<Pagination.Text as={"p"} className="reg-bold">Page {currentPage + 1}</Pagination.Text>
						<Pagination.Action>
							<Button
								type="primary"
								onClick={() => {
									if (!isPreviousData && data?.hasMore) {
										console.log("Next page")
										setCurrentPage(old => old + 1);
										refetch();
									}
								}}
								disabled={!data || (isPreviousData || !data?.hasMore)}
								uppercase={true}
							>Next page</Button>
						</Pagination.Action>
					</Pagination>
				)
			}
		</section>
	)
}