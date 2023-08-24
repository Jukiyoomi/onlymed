import React, {useEffect} from "react";
import Layout from "@comps/Layout";
import {useQuery} from "@tanstack/react-query";
import Loader from "@comps/Loader";
import useUserStore from "@store/user";
import useSearchStore from "@store/search";
import Router from "@comps/Router";

export default function App() {
	const setUser = useUserStore((state) => state.setUser);
	const reset = useSearchStore((state) => state.reset);
	const { isLoading} = useQuery(['user'], async () => {
		return fetch('/api/dashboard')
			.then(res => res.json())
			.then(data => {
				setUser(data.user);
				return data;
			})
	});

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