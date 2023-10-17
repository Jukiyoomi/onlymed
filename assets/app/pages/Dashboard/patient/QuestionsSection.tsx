import React, {useId} from "react";
import Accordion from "@/components/Accordion";

export default function QuestionsSection() {
	const idRef = useId();

	return (
		<Accordion className="questions box" as="article" id={idRef}>
			<Accordion.Action
				className="dashboard_content_head"
				id={idRef}
			>
				<h2 className="second-title">Mes questions</h2>
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

function QuestionItem({question}: Props) {
	return (
		<li>
			<p className="reg-bold">{question.question}</p>
			<a href={question.link}>Voir plus</a>
		</li>
	)
}