import React from 'react';
import {toString} from "@/store/user";
import {Link} from "react-router-dom";
import Button from "@/components/Button";
import ApptsSection from "./ApptsSection";
import Container from "@/components/Container";

export default function DoctorDashboard() {
	console.log("DoctorDashboard")
	return (
		<Container className="dashboard">
			<section className="dashboard_header">
				<h1 className="main-title">Dr {toString()}</h1>
				<Link to="/dashboard/params">
					<Button type="secondary">
						Voir les options
					</Button>
				</Link>
			</section>

			<section className="dashboard_content">
				<ApptsSection />
			</section>
		</Container>
	)
}