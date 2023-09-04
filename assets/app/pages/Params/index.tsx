import React, {useState} from 'react';
import Container from "@comps/Container";
import Sidebar from "@pages/Params/Sidebar";
import Settings from "@pages/Params/Settings";

export default function Params() {
	const [currentLink, setCurrentLink] = useState<string>("general");

	return (
		<Container className="params">
			<Sidebar currentLink={currentLink} setCurrentLink={setCurrentLink} />
			<Settings currentLink={currentLink} />
		</Container>
	)
}