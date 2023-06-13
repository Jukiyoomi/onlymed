import React from "react";
import Header from "@comps/Header";
import {BrowserRouter as Router} from "react-router-dom";

export default function Layout({children}: {children: React.ReactNode}) {
	return (
		<Router>
			<Header />
			{children}
		</Router>
	);
}