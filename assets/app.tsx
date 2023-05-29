/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';

// start the Stimulus application
import './bootstrap';

// Create a react app using React 18 syntax
import React from 'react';
import {createRoot} from 'react-dom/client';

const root = document.getElementById('root');

if (root) {
	createRoot(root).render(
		<React.StrictMode>
			<h1>Hello World</h1>
		</React.StrictMode>
	);
}

