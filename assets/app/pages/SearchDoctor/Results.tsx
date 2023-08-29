import SearchDoctorItem, {SearchDoctorLoading} from "@comps/SearchDoctorItem";
import React, {useEffect, useState} from "react";
import Pagination from "@comps/Pagination";
import Button from "@comps/Button";
import useSearch from "@hooks/useSearch";

export default function Results() {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [isFirstDisplay, setIsFirstDisplay] = useState<boolean>(true);
	const [hasFirstResult, setHasFirstResult] = useState<boolean>(false);
	const {
		data,
		fetchNextPage,
		hasNextPage,
		fetchPreviousPage,
		isPreviousData,
		isInitialLoading,
		isFetching
	} = useSearch(() => {
		setIsFirstDisplay(false);
		setHasFirstResult(false);
	});


	useEffect(() => {
		if (data?.pages[0]?.doctors.length > 0) {
			setHasFirstResult(true);
		}
	}, [data]);

	return (
		<section className="result">
			{isInitialLoading || isFetching ?
				(
					Array.from({length: 5}).map((_, id) => (
						<SearchDoctorLoading key={id} />
					))
				) :
				(
					<>
						{
							data?.pages.map((page, id) => {
								if (currentPage === id) {
									return (
										<React.Fragment key={id}>
											{page.doctors.map((doctor: any) => (
													<SearchDoctorItem doctor={doctor} key={doctor.id} />
												)
											)}
										</React.Fragment>
									)
								}
							})
						}
						{
							!isFirstDisplay && (
								hasFirstResult ? (
									<Pagination>
										<Pagination.Action>
											<Button
												type="primary"
												onClick={() => {
													fetchPreviousPage().then(r => setCurrentPage(old => old - 1));
												}}
												disabled={currentPage === 0}
												uppercase={true}
											>Previous page</Button>
										</Pagination.Action>
										<Pagination.Text as={"p"} className="reg-bold">Page {currentPage + 1}</Pagination.Text>
										<Pagination.Action>
											<Button
												type="primary"
												onClick={() => {
													fetchNextPage().then(r => setCurrentPage(old => old + 1));
												}}
												disabled={isPreviousData || !hasNextPage}
												uppercase={true}
											>Next page</Button>
										</Pagination.Action>
									</Pagination>
								) : (
									<div className="no-result">
										<p className="reg-bold">No result found.</p>
									</div>
								)
							)
						}
					</>
				)
			}
		</section>
	)
}