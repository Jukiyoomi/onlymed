import React from 'react';
import Container from "@comps/Container";
import Button from "@comps/Button";
import {useQuery} from "@tanstack/react-query";

export default function Dashboard() {
	const {data, isLoading} = useQuery(['user'], () =>  {
		return fetch('/api/dashboard').then(res => res.json())
	})

	if (isLoading) return <div>Loading...</div>

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