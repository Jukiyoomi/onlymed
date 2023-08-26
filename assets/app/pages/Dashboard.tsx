import React from 'react';
import Container from "@comps/Container";
import Button from "@comps/Button";
import {toString} from "@store/user";
import chevron from "@img/chevron-down.svg";
import ApptsSection from "@comps/dashboard/ApptsSection";
import QuestionsSection from "@comps/dashboard/QuestionsSection";

export default function Dashboard() {
	return (
		<Container className="dashboard">
			<section className="dashboard_header">
				<h1 className="main-title">Compte de {toString()}</h1>
				<Button type="secondary">
					Voir les options
				</Button>
			</section>

			<section className="dashboard_content">
				<ApptsSection />

				<aside>
					<QuestionsSection />

					<article>
						<div className="dashboard_content_head">
							<h2 className="second-title">Mes documents</h2>
							<img src={chevron} alt="chevron-down" />
						</div>
						<div></div>
						<div>

						</div>
					</article>
				</aside>
			</section>
		</Container>
	);
}