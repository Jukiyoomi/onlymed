import React, {useId, useRef} from "react";
import useToggle from "@/hooks/useToggle";
import Accordion from "@/components/Accordion";
import Button from "@/components/Button";
import {ApptType} from "@/schemas/appointment";
import {useMyApptsQuery} from "../query";


export default function ApptsSection() {
	const dateRef = useRef(new Date());
	const labelsRef = useRef([{
		title: "À venir",
		filter: (appointment: ApptType) => new Date(appointment.plannedAt) > dateRef.current
	}, {
		title: "Passés",
		filter: (appointment: ApptType) => new Date(appointment.plannedAt) <= dateRef.current
	}]);
	const idRef = useId();

	const {isLoading, data, error} = useMyApptsQuery("doctor");

	return (
		<Accordion className="appts box" as="article" id={idRef}>
			<Accordion.Action
				className="dashboard_content_head"
				id={idRef}
				isInstant
			>
				<h2 className="second-title">Mes rendez-vous</h2>
			</Accordion.Action>

			<Accordion.Content>
				{isLoading ?
					<p>Loading...</p> :
					error ? <p>Erreur : {JSON.stringify(error)}</p> :
						labelsRef.current.map(({title, filter}, id) => (
							<ApptList
								key={id}
								data={data && data?.length > 0 ? data.filter(filter) : []}
								title={title}
							/>
						))
				}
			</Accordion.Content>
		</Accordion>
	)
}

function ApptList({data, title}: {data: ApptType[], title: string}) {
	const [isActive, toggle] = useToggle(false);

	const maxRef = useRef(3);

	const test = [...data, ...data, ...data, ...data, ...data, ...data]

	return (
		<div className="accordion_item">
			<p className="reg-bold">{title} ({data.length})</p>
			{data.length === 0 ?
				<p>Aucun rendez-vous {title.toLowerCase()}</p> :
				<>
					<ul style={{
						display: "grid",
						gridTemplateColumns: "repeat(3, 1fr)",
						gap: "10px",
					}}>
						{test
							.slice(0, isActive ? test.length : maxRef.current)
							.map((appointment, index) => (
								<li key={index} style={{
									flexDirection: "column",
								}}>
									<div>
										<h2 className="second-title">Patient: John Doe</h2>
									</div>
									<p className="reg-bold">{(new Date(appointment.plannedAt)).toLocaleDateString()}</p>
								</li>
							))}
					</ul>
					<Button type="secondary" onClick={() => toggle()} disabled={test.length <= maxRef.current}>
						Voir {isActive ? "moins" : "plus"}
					</Button>
				</>
			}

		</div>
	)
}