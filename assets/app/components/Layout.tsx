import Header from "@comps/Header";
import React from "react";

export default function Layout({children}: {children: React.ReactNode}) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}