import React from 'react';
import Container from "@comps/Container";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import RatingStars from "@comps/RatingStars";
import {TextLoader} from "@comps/Loader";
import Button from "@comps/Button";

export default function SearchDoctor() {
    const {data, isLoading, fetchNextPage} = useInfiniteQuery(['search'], ({pageParam = 1}) => {
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
        }
    });



    if (isLoading) return (<TextLoader />);

    return (
        <Container className="search">
            <Button type="primary" onClick={() => fetchNextPage()}>Load more</Button>
            <section>
                {
                    data?.pages.map((page) => (
                        <>
                            {page.doctors.map((doctor: any) => (
                                <SearchDoctorItem doctor={doctor} key={doctor.id} />
                            )
                            )}
                        </>
                    ))
                }
            </section>
        </Container>
    );
}