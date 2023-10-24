import React from 'react';
import useUserStore, {toString} from "@/store/user";
import {Link} from "react-router-dom";
import Button from "@/components/Button";
import ApptsSection from "./ApptsSection";
import Container from "@/components/Container";

export default function DoctorDashboard() {
	const user = useUserStore((state) => state.user);
	console.log("DoctorDashboard")
	return (
		<Container className="dashboard">
			<section className="dashboard_header">
				<h1 className="main-title">Dr {toString()} caca</h1>
				<Link to="/dashboard/params">
					<Button type="secondary">
						Voir les options
					</Button>
				</Link>
			</section>

			<p>{user?.address
					? `Mon adresse : ${user.address}`
					: "Veuillez renseigner votre adresse pour que les patients puissent vous trouver"}
			</p>

			<section className="dashboard_content">
				<ApptsSection />
			</section>
		</Container>
	)
}