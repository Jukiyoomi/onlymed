import Dashboard from "@pages/Dashboard";
import SearchDoctor from "@pages/SearchDoctor";
import Params from "@pages/Params";
import React from "react";

export default [
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
];