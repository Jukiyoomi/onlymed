import React, {useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import Dashboard from "@pages/Dashboard";
import Layout from "@comps/Layout";
import {useQuery} from "@tanstack/react-query";
import Loader from "@comps/Loader";
import useUserStore from "./store/user";
import SearchDoctor from "@pages/SearchDoctor";
import useSearchStore from "./store/search";

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
			{isLoading ? <Loader /> : (
				<Routes>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/search" element={<SearchDoctor />} />
					<Route path="*" element={<h1>Not Found</h1>} />
				</Routes>
			)}
		</Layout>
	);
}