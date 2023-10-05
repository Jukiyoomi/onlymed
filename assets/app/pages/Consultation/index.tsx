import React from 'react';
import {useParams} from "react-router-dom";
import {useDoctorQuery} from "./query";
import Container from "@comps/Container";
import RatingStars, {StarWrapper} from "@comps/RatingStars";
import HourSelector from "./HourSelector";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

export default function Consultation() {
    const {id} = useParams();

	const {data, isLoading, error} = useDoctorQuery(id!);

	if (error) {
		return <Container className="doctor_detail">{JSON.stringify(error)}</Container>
	}

    return (
		<Container className="doctor_detail">
			{
				isLoading ? <HeaderLoading /> : (
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
				)
			}

			<section className="doctor_detail_content">
				{
					isLoading ? <ConsultationLoading /> : (
						<div className="left">
							<section className="doctor_detail_info box">
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
					)
				}

				<div className="right">
					<HourSelector doctorId={Number(id!)} />
				</div>
			</section>
		</Container>
	);
}

function HeaderLoading() {
	return (
		<SkeletonTheme
			highlightColor={"#e1e1e1"}
		>
			<header className="doctor_detail_head">
				<Skeleton
					width={200}
					height={110}
					containerClassName="avatar-skeleton"
				/>
				<aside>
					<h1 className="main-title"><Skeleton width={250} /></h1>
					<p className="reg-bold"><Skeleton width={250} /></p>
					<Skeleton
						count={5}
						wrapper={StarWrapper}
						height="100%"
						duration={0.9}
					/>
				</aside>
			</header>
		</SkeletonTheme>
	)
}

function ConsultationLoading() {
	return (
		<SkeletonTheme
			highlightColor={"#e1e1e1"}
		>
			<div className="left">
				<section className="doctor_detail_info box">
					<article>
						<h2 className="second-title"><Skeleton /></h2>
						<h3 className="reg-bold"><Skeleton /></h3>
						<p><Skeleton /></p>
					</article>
					<aside>
						<img
							src="https://www.tomsguide.fr/content/uploads/sites/2/2020/12/tony-stark-robert.jpg"
							alt="Carte"
						/>
					</aside>
				</section>
			</div>
		</SkeletonTheme>
	)
}