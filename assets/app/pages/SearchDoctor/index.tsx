import React from 'react';
import Container from "@/components/Container";
import SearchDoctorBar from "./SearchDoctorBar";
import Results from "./Results";

export default function SearchDoctor() {

    return (
        <Container className="search">
            <SearchDoctorBar />

            <Results />
        </Container>
    );
}