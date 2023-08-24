import React from 'react';
import Container from "@comps/Container";
import Button from "@comps/Button";
import {toString} from "@store/user";
import chevron from "@img/chevron-down.svg";
import Appts from "@comps/dashboard/Appts";

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
				<Appts />

				<aside>
					<article>
						<div className="dashboard_content_head">
							<h2 className="second-title">Mes questions</h2>
							<img src={chevron} alt="chevron-down" />
						</div>
						<div></div>
						<div>

						</div>
					</article>

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