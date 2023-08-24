import React from "react";
import {Route, Routes} from "react-router-dom";
import Dashboard from "@pages/Dashboard";
import SearchDoctor from "@pages/SearchDoctor";

export default function Router() {
	return (
		<Routes>
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/search" element={<SearchDoctor />} />
			<Route path="*" element={<h1>Not Found</h1>} />
		</Routes>
	)
}