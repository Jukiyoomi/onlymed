import React from 'react';
import {useParams} from "react-router-dom";
import useLoader from "./loader";
import Container from "@comps/Container";

export default function Consultation() {
    const {id} = useParams();

	const {data: doctor, isLoading} = useLoader(id!);
	if (isLoading) return <div>Loading...</div>

    return (
		<Container>
			<h1>Consultation of {id}</h1>
			<div>
				<pre>{JSON.stringify(doctor, null, 2)}</pre>
			</div>
		</Container>
	);
}