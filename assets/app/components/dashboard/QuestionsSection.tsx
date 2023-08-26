import React, {useId} from "react";
import data from "@store/dashboard";
import Accordion from "@comps/Accordion";

export default function QuestionsSection() {
	const idRef = useId();

	return (
		<Accordion className="questions right" as="article" id={idRef}>
			<Accordion.Action
				className="dashboard_content_head"
				id={idRef}
			>
				<h2 className="second-title">Mes questions</h2>
			</Accordion.Action>
			<Accordion.Content>
				{data.questions.length > 0 ?
					<p>Vous n’avez pas encore posé de questions</p> :
					<ul className="accordion_item">
						{data.questions
							.map((question) => (
							<QuestionItem question={question} key={question.id} />
						))}
					</ul>
				}
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