import React, {useEffect} from 'react';
import Container from "@comps/Container";
import {useInfiniteQuery} from "@tanstack/react-query";
import {TextLoader} from "@comps/Loader";
import Button from "@comps/Button";
import SearchDoctorItem from "@comps/SearchDoctorItem";

export default function SearchDoctor() {
    const {data, isLoading, fetchNextPage, hasNextPage} = useInfiniteQuery(['search'], ({pageParam = 1}) => {
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

    useEffect(() => {
        let fetching = false;
        const handleScroll = async () => {
            const {screenTop, scrollY, innerHeight} = window;
            if(!fetching && screenTop - scrollY <= innerHeight * 1.2) {
                fetching = true
                if(hasNextPage) await fetchNextPage()
                fetching = false
            }
        }
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [fetchNextPage, hasNextPage])


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