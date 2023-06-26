import React, {useState} from 'react';
import Container from "@comps/Container";
import {useInfiniteQuery} from "@tanstack/react-query";
import {TextLoader} from "@comps/Loader";
import Button from "@comps/Button";
import SearchDoctorItem from "@comps/SearchDoctorItem";

export default function SearchDoctor() {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const {data, isLoading, fetchNextPage, hasNextPage, fetchPreviousPage, isPreviousData, } = useInfiniteQuery(['search'], ({pageParam = 1}) => {
        return fetch(`/api/search?term=endoc&offset=${pageParam}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
    }, {
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.doctors.length === 0) return undefined;
            return pages.length + 1;
        },
    });

    if (isLoading) return (<TextLoader />);

    return (
        <Container className="search">
            <section className="result">
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
                    >Next page</Button>
                </div>
            </section>
        </Container>
    );
}