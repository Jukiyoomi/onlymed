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
                    data?.pages.map((page, i) => (
                        <React.Fragment key={i}>
                            {page.doctors.map((doctor: any) => (
                                    <div key={doctor.id} className="search_doctor">
                                        <img className="search_doctor_img" src="https://www.tomsguide.fr/content/uploads/sites/2/2020/12/tony-stark-robert.jpg" alt={`Image of ${doctor.firstname} ${doctor.lastname}`}/>
                                        <article>
                                            <div className="search_doctor_info">
                                                <div>
                                                    <h2 className="second-title">{doctor.firstname} {doctor.lastname}</h2>
                                                    <p className="search_doctor_address subtitle">10880 Malibu Point, 90265, Malibu, California</p>
                                                </div>

                                                <div>
                                                    <p className="reg-bold">Proctologue</p>
                                                </div>
                                            </div>

                                            <RatingStars rating={Math.round(Math.random() * 5)} />
                                        </article>
                                    </div>
                                )
                            )}
                        </React.Fragment>
                    ))
                }
            </section>
        </Container>
    );
}