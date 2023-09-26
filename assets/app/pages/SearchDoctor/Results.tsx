import SearchDoctorItem, {SearchDoctorLoading} from "./SearchDoctorItem";
import React from "react";
import Pagination from "@comps/Pagination";
import Button from "@comps/Button";
import {Doctor} from "@schemas/doctor";
import usePage from "@hooks/usePage";

export default function Results() {
	const {
		currentPage,
		isFirstDisplay,
		hasFirstResult,
		prevDisabled, goToPreviousPage,
		nextDisabled, goToNextPage,
		query: {
			data,
			isInitialLoading,
			isFetching,
		}
	} = usePage();

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
											{page.map((doctor: Doctor) => (
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
												onClick={goToPreviousPage}
												disabled={prevDisabled}
												uppercase={true}
											>Previous page</Button>
										</Pagination.Action>
										<Pagination.Text as={"p"} className="reg-bold">Page {currentPage + 1}</Pagination.Text>
										<Pagination.Action>
											<Button
												type="primary"
												onClick={goToNextPage}
												disabled={nextDisabled}
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