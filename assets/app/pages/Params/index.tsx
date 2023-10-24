import React, {useState} from 'react';
import Container from "@/components/Container";
import Sidebar from "./Sidebar";
import Settings from "./Settings";
import useUserStore from "@/store/user";

export default function Params() {
	const specificRole = useUserStore(state => state.specificRole);
	const [currentLink, setCurrentLink] = useState<string>("general");

	return (
		<Container className="params">
			<Sidebar currentLink={currentLink} setCurrentLink={setCurrentLink} type={specificRole!} />
			<Settings currentLink={currentLink} />
		</Container>
	)
}