import React from "react";
import useUserStore from "@/store/user";
import DoctorDashboard from "@/pages/Dashboard/doctor";
import PatientDashboard from "@/pages/Dashboard/patient";
import {Role} from "@/schemas/role";

type DashboardFactoryType = {
	[key in Role]: () => JSX.Element
}

const dashboardFactory: DashboardFactoryType = {
	"ROLE_PATIENT": PatientDashboard,
	"ROLE_DOCTOR": DoctorDashboard
}

export default function Dashboard() {
	const specificRole = useUserStore(state => state.specificRole);
	const Element = dashboardFactory[specificRole!];

	return (
		<Element />
	)
}