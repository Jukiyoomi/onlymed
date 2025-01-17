/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

// start the Stimulus application

// Create a react app using React 18 syntax
import React from 'react';
import {createRoot} from 'react-dom/client';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import App from "@/index";
import { createIcons, Menu } from 'lucide';

const root = document.getElementById('root');

if (root) {
	const client = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				staleTime: 10_000,
			}
		}
	});

	createRoot(root).render(
		<React.StrictMode>
			<QueryClientProvider client={client}>
				<App />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</React.StrictMode>
	);
} else {
	createIcons({
		icons: {
			Menu
		}
	});
}