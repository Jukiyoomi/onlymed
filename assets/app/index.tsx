import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "@pages/Home";
import Layout from "@comps/Layout";

export default function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<h1>Not Found</h1>} />
			</Routes>
		</Layout>
	);
}