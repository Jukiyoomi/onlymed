import React from "react";
import useUserStore from "@/store/user";
import DoctorDashboard from "@/pages/Dashboard/doctor";
import PatientDashboard from "@/pages/Dashboard/patient";

type DashboardFactoryType = {
	[key: string]: () => JSX.Element
}

const dashboardFactory: DashboardFactoryType = {
	"ROLE_PATIENT": PatientDashboard,
	"ROLE_DOCTOR": DoctorDashboard
}

export default function Dashboard() {
	const user = useUserStore(state => state.user);

	if (!user) return <h1>Pas de user enculé</h1>;

	const userSpecificRole = user.roles.filter(role => role !== "ROLE_USER")[0]

	const Element = dashboardFactory[userSpecificRole];

	return (
		<Element />
	)
}