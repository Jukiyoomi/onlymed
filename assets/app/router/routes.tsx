import Dashboard from "@pages/Dashboard";
import SearchDoctor from "@pages/SearchDoctor";
import Params from "@pages/Params";
import React from "react";

export default [
	{
		path: "/search",
		component: <SearchDoctor />
	},
	{
		path: "/dashboard",
		component: <Dashboard />
	},
	{
		path: "/dashboard/params",
		component: <Params />
	},
	{
		path: "*",
		component: <h1>Not Found</h1>
	}
];