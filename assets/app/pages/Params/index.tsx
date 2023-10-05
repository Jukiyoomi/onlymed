import React, {useState} from 'react';
import Container from "@/components/Container";
import Sidebar from "./Sidebar";
import Settings from "./Settings";

export default function Params() {
	const [currentLink, setCurrentLink] = useState<string>("general");

	return (
		<Container className="params">
			<Sidebar currentLink={currentLink} setCurrentLink={setCurrentLink} />
			<Settings currentLink={currentLink} />
		</Container>
	)
}