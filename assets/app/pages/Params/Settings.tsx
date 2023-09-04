import React from 'react';
import Button from "@comps/Button";
import wretch from "wretch";

export default function Settings({currentLink}: {currentLink: string}) {
	const Element = balancer(currentLink);

	return (
		<section className="settings">
			<div className="settings_header">
				<h1 className="main-title">{Element.Title}</h1>
				<hr/>
			</div>
			{Element.Content}
		</section>
	)
}

function balancer(type: string) {
	switch (type) {
		case "account":
			return Account();
		case "mail":
			return Mail();
		case "password":
			return Password();
		case "general":
		default:
			return General();
	}
}

function General() {
	return {
		Title: "Informations Générales",
		Content: (
			<></>
		)
	}
}

function Account() {
	return {
		Title: "Mon compte",
		Content: (
			<div className="settings_content settings_account">
				<p>Une fois confirmé, vous ne pourrez pas récupérer votre compte. Cette action est irréversible.</p>
				<a href="/user/delete">
					<Button type="primary">Supprimer Mon Compte</Button>
				</a>
			</div>
		)
	}
}

function Mail() {
	return {
		Title: "Adresse E-mail",
		Content: (
			<></>
		)
	}
}

function Password() {
	return {
		Title: "Modifier mon mot de passe",
		Content: (
			<></>
		)
	}
}
