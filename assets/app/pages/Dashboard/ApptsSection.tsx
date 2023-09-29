import React, {useId, useRef} from "react";
import useToggle from "@hooks/useToggle";
import Accordion from "@comps/Accordion";
import Button from "@comps/Button";
import {ApptType} from "@schemas/appointment";
import {useMyApptsQuery} from "./query";


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

	const {isLoading, data} = useMyApptsQuery();

	return (
		<Accordion className="appts" as="article" id={idRef}>
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
					labelsRef.current.map(({title, filter}, id) => (
						<ApptList
							key={id}
							data={data !== undefined && data.length > 0 ? data.filter(filter) : []}
							title={title}
						/>
					))}
			</Accordion.Content>
		</Accordion>
	)
}

function ApptList({data, title}: {data: ApptType[], title: string}) {
	const [isActive, toggle] = useToggle(false);

	const maxRef = useRef(3);

	return (
		<div className="accordion_item">
			<p className="reg-bold">{title} ({data.length})</p>
			{data.length === 0 ?
				<p>Aucun rendez-vous {title.toLowerCase()}</p> :
				<>
					<ul>
						{data
							.slice(0, isActive ? data.length : maxRef.current)
							.map((appointment) => (
								<li key={appointment.id}>
									<div>
										<img src="https://source.unsplash.com/user/wsanter" alt={`photo of ${appointment.doctor.firstname}` }/>
										<div>
											<h2 className="second-title">Dr. {appointment.doctor.firstname} {appointment.doctor.lastname}</h2>
											<p className="subtitle">{appointment.doctor.address}</p>
										</div>
									</div>
									<p className="reg-bold">{(new Date(appointment.plannedAt)).toLocaleDateString()}</p>
								</li>
							))}
					</ul>
					<Button type="secondary" onClick={() => toggle()} disabled={data.length <= maxRef.current}>
						Voir {isActive ? "moins" : "plus"}
					</Button>
				</>
			}

		</div>
	)
}