import React from "react";
import {Route, Routes} from "react-router-dom";
import routes from "./routes";

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