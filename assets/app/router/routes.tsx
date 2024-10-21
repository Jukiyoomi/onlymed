import Dashboard from "@/pages/Dashboard";
import SearchDoctor from "@/pages/SearchDoctor";
import Params from "@/pages/Params";
import React from "react";
import Consultation from "@/pages/Consultation";

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
		path: "/doctors/:id",
		component: <Consultation />
	},
	{
		path: "*",
		component: <h1>Not Found</h1>
	}
];