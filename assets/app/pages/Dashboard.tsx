import React from 'react';
import Container from "@comps/Container";
import Button from "@comps/Button";
import useUserStore, {toString} from "../store/user";

export default function Dashboard() {
	const user = useUserStore((state) => state.user);

	console.log(user);

	return (
		<Container className="dashboard">
			<section className="dashboard_header">
				<h1 className="main-title">Compte de {toString()}</h1>
				<Button type="secondary">
					Voir les options
				</Button>
			</section>
		</Container>
	);
}