import React from "react";
import {Routes, Route} from "react-router-dom";
import Dashboard from "@pages/Dashboard";
import Layout from "@comps/Layout";

export default function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="*" element={<h1>Not Found</h1>} />
			</Routes>
		</Layout>
	);
}