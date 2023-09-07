import React, {useId, useRef} from "react";
import useToggle from "@hooks/useToggle";
import Accordion from "@comps/Accordion";
import Button from "@comps/Button";
import {useQuery} from "@tanstack/react-query";
import wretch from "wretch";

type ApptType = {
	id: number,
	plannedAt: string,
	doctor: {
		firstname: string,
		lastname: string,
		address: string,
		specialities: {
			id: number,
			name: string
		}[]
	}
};


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

	const {isLoading, data} = useQuery<ApptType[]>(["appointments", "all"], () => {
		return wretch()
			.get('/api/appointments')
			.res(async (res) => {
				const data = await res.json();
				console.log(data.appointments);
				return data.appointments;
			})
			.catch((e) => {
				const parsedError = JSON.parse(e.message);
				console.log(parsedError.error);
				return parsedError;
			})
	});

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
						data={data!.filter(filter)}
						title={title}
					/>
				))}
			</Accordion.Content>
		</Accordion>
	)
}

function ApptList({data, title}: {data: ApptType[], title: string}) {
	const [isActive, toggle] = useToggle(false);

	return (
		<div className="accordion_item">
			<p className="reg-bold">{title} ({data.length})</p>
			{data.length === 0 ?
				<p>Aucun rendez-vous {title.toLowerCase()}</p> :
				<>
					<ul>
						{data
							.slice(0, isActive ? data.length : 3)
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
					<Button type="secondary" onClick={() => toggle()}>
						Voir {isActive ? "moins" : "plus"}
					</Button>
				</>
			}

		</div>
	)
}