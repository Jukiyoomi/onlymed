import React, {useId} from "react";
import Accordion from "@comps/Accordion";

export default function DocsSection() {
	const idRef = useId();

	return (
		<Accordion className="docs box" as="article" id={idRef}>
			<Accordion.Action
				className="dashboard_content_head"
				id={idRef}
			>
				<h2 className="second-title">Mes documents</h2>
			</Accordion.Action>
			<Accordion.Content>
				<div className="accordion_item">
					Cette section n'est pas encore disponible. Patientez.
				</div>
			</Accordion.Content>
		</Accordion>
	)
}

type Props = {
	question: {
		id: number,
		question: string,
		link: string
	}
};

function DocItem({question}: Props) {
	return (
		<li>
			<p className="reg-bold">{question.question}</p>
			<a download={question.link}>Télécharger</a>
		</li>
	)
}