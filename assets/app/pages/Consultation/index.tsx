import React, {useRef} from 'react';
import {useParams} from "react-router-dom";
import useLoader from "./loader";
import Container from "@comps/Container";
import RatingStars from "@comps/RatingStars";
import HourSelector from "./HourSelector";

export default function Consultation() {
    const {id} = useParams();

	const {data, isLoading, error} = useLoader(id!);

	const dates = useRef([
		1695290400,
		1697284800,
	]).current;

	if (isLoading) return <div>Loading...</div>

	if (error) {
		console.log(error);
		return <div>{JSON.stringify(error)}</div>
	}

    return (
		<Container className="doctor_detail">
			<header>
				<img
					src="https://www.tomsguide.fr/content/uploads/sites/2/2020/12/tony-stark-robert.jpg"
					alt={`Image of ${data?.doctor.firstname} ${data?.doctor.lastname}`}
					width={200}
				/>
				<p>Dr. {data?.doctor.firstname} {data?.doctor.lastname}</p>
				<RatingStars rating={Math.round(Math.random() * 5)} />
			</header>

			<HourSelector disabledDates={dates} doctorId={Number(id!)} />
		</Container>
	);
}