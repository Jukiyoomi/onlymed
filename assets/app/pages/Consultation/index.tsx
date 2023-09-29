import React from 'react';
import {useParams} from "react-router-dom";
import useDoctorLoader from "./loader";
import Container from "@comps/Container";
import RatingStars from "@comps/RatingStars";
import HourSelector from "./HourSelector";

export default function Consultation() {
    const {id} = useParams();

	const {data, isLoading, error} = useDoctorLoader(id!);

	if (isLoading) return <div>Loading...</div>

	if (error) {
		console.log(error);
		return <div>{JSON.stringify(error)}</div>
	}

    return (
		<Container className="doctor_detail">
			<header className="doctor_detail_head">
				<img
					src="https://www.tomsguide.fr/content/uploads/sites/2/2020/12/tony-stark-robert.jpg"
					alt={`Image of ${data?.firstname} ${data?.lastname}`}
					width={200}
				/>
				<aside>
					<h1 className="main-title">Dr. {data?.firstname} {data?.lastname}</h1>
					<p className="reg-bold">{data?.speciality.name}</p>
					<RatingStars rating={Math.round(Math.random() * 5)} isWhite={true} />
				</aside>
			</header>

			<section className="doctor_detail_content">
				<div className="left">
					<section className="doctor_detail_info">
						<article>
							<h2 className="second-title">Carte et information d'accès</h2>
							<h3 className="reg-bold">Adresse</h3>
							<p>{data?.address}</p>
						</article>
						<aside>
							<img
								src="https://www.tomsguide.fr/content/uploads/sites/2/2020/12/tony-stark-robert.jpg"
								alt="Carte"
							/>
						</aside>
					</section>
				</div>

				<div className="right">
					<HourSelector doctorId={Number(id!)} />
				</div>
			</section>
		</Container>
	);
}