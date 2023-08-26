import React from "react";
import {Route, Routes} from "react-router-dom";
import Dashboard from "@pages/Dashboard";
import SearchDoctor from "@pages/SearchDoctor";
import Params from "@pages/Params";

const routes = [
	{
		path: "/dashboard",
		component: <Dashboard />
	},
	{
		path: "/search",
		component: <SearchDoctor />
	},
	{
		path: "/dashboard/params",
		component: <Params />
	},
	{
		path: "*",
		component: <h1>Not Found</h1>
	}
]

export default function Router() {
	return (
		<Routes>
			{
				routes.map(({path, component}, id) => (
					<Route path={path} element={component} key={id} />
				))
			}
		</Routes>
	)
}