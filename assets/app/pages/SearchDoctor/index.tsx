import React from 'react';
import Container from "@comps/Container";
import SearchDoctorBar from "@comps/SearchDoctorBar";
import Results from "./Results";

export default function SearchDoctor() {

    return (
        <Container className="search">
            <SearchDoctorBar />

            <Results />
        </Container>
    );
}