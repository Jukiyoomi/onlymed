import React, {useEffect} from "react";
import Layout from "@comps/Layout";
import Loader from "@comps/Loader";
import useSearchStore from "@store/search";
import Router from "@router/Router";
import useInit from "@hooks/useInit";

export default function App() {
	const reset = useSearchStore((state) => state.reset);
	const { isLoading} = useInit();

	useEffect(() => {
		reset();
	}, [])

	return (
		<Layout>
			{isLoading ?
				<Loader /> :
				<Router />
			}
		</Layout>
	);
}