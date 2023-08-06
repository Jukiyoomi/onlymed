import React, {useEffect, useState} from 'react';
import Container from "@comps/Container";
import {useInfiniteQuery} from "@tanstack/react-query";
import Button from "@comps/Button";
import SearchDoctorItem, {SearchDoctorLoading} from "@comps/SearchDoctorItem";
import SearchDoctorBar from "@comps/SearchDoctorBar";
import useSearchStore from "../store/search";

export default function SearchDoctor() {
    const [search, location] = useSearchStore((state) => [state.search, state.location]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isFirstDisplay, setIsFirstDisplay] = useState<boolean>(true);
    const [hasFirstResult, setHasFirstResult] = useState<boolean>(false);

    const {
        data,
        refetch,
        fetchNextPage,
        hasNextPage,
        fetchPreviousPage,
        isPreviousData,
        isInitialLoading,
        isFetching
    } = useInfiniteQuery(
        ['search', search, location],
        ({pageParam = 1}) => {
            const searchTerm = search.trim() !== "" ? search.trim().toLowerCase() : "";
            const locationTerm = location.trim() !== "" ? location.trim().toLowerCase() : "";
            setIsFirstDisplay(false);
            setHasFirstResult(false);
            return fetch(`/api/search?term=${searchTerm}&zone=${locationTerm}&offset=${pageParam}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
    }, {
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.doctors.length === 0 || lastPage.doctors.length < 10) return undefined;
            return pages.length + 1;
        },
        enabled: false,
    });

    useEffect(() => {
        if (search.trim() === "") return;
        refetch();
    }, [search, location]);

    useEffect(() => {
        if (data?.pages[0]?.doctors.length > 0) {
            setHasFirstResult(true);
        }
    }, [data])


    return (
        <Container className="search">
            <SearchDoctorBar />

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
                                        <div className="paginate">
                                            <Button
                                                type="primary"
                                                onClick={() => {
                                                    fetchPreviousPage().then(r => setCurrentPage(old => old - 1));
                                                }}
                                                disabled={currentPage === 0}
                                                uppercase={true}
                                            >Previous page</Button>
                                            <p className="reg-bold">Page {currentPage + 1}</p>
                                            <Button
                                                type="primary"
                                                onClick={() => {
                                                    fetchNextPage().then(r => setCurrentPage(old => old + 1));
                                                }}
                                                disabled={isPreviousData || !hasNextPage}
                                                uppercase={true}
                                            >Next page {JSON.stringify(isPreviousData)} {JSON.stringify(!hasNextPage)}</Button>
                                        </div>
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
        </Container>
    );
}