import React from 'react';
import Container from "@comps/Container";
import Button from "@comps/Button";
import {toString} from "@store/user";
import ApptsSection from "@comps/dashboard/ApptsSection";
import QuestionsSection from "@comps/dashboard/QuestionsSection";
import DocsSection from "@comps/dashboard/DocsSection";
import {Link} from "react-router-dom";

export default function Dashboard() {
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

				<aside>
					<QuestionsSection />

					<DocsSection />
				</aside>
			</section>
		</Container>
	);
}