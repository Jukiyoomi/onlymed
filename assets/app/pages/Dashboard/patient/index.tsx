import React from 'react';
import Container from "@/components/Container";
import Button from "@/components/Button";
import useUserStore, {toString} from "@/store/user";
import ApptsSection from "./ApptsSection";
import QuestionsSection from "./QuestionsSection";
import DocsSection from "./DocsSection";
import {Link} from "react-router-dom";

export default function PatientDashboard() {
	console.log("PatientDashboard")
	return (
		<Container className="dashboard">
			<section className="dashboard_header">
				<h1 className="main-title">Compte de {toString()}</h1>
				<Link to="/dashboard/params">
					<Button type="secondary">
						Voir les options
					</Button>
				</Link>
			</section>

			<section className="dashboard_content">
				<ApptsSection />

				<aside className="right">
					<QuestionsSection />

					<DocsSection />
				</aside>
			</section>
		</Container>
	);
}