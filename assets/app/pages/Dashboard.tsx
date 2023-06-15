import React from 'react';
import Container from "@comps/Container";
import Button from "@comps/Button";

export default function Dashboard() {
	return (
		<Container className="dashboard">
			<section className="dashboard_header">
				<h1 className="main-title">Compte de John Doe</h1>
				<Button type="secondary">
					Voir les options
				</Button>
			</section>
		</Container>
	);
}