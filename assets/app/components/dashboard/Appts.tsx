import React, {useId, useRef} from "react";
import data from "@store/dashboard";
import useToggle from "../../hooks/useToggle";
import Accordion from "@comps/Accordion";
import Button from "@comps/Button";

type ApptType = {
	id: number,
	date: string,
	doctor: {
		firstname: string,
		lastname: string,
		address: string
	}
};

export default function Appts() {
	const dateRef = useRef(new Date());
	const titles = useRef(["À venir", "Passés"]);
	const idRef = useId();

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
				{titles.current.map((title, id) => (
					<ApptList
						key={id}
						data={data
							.filter(appointment => new Date(appointment.date) > dateRef.current)}
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
			<p className="reg-bold">{title}</p>
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
									<p className="reg-bold">{appointment.date}</p>
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