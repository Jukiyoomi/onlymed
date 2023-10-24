import React from 'react';
import {Mail, Settings, UserSquare, Lock, MapPin} from "lucide-react";
import cn from "classnames";

const links = [
	{
		name: "General",
		links: [
			{
				label: "General",
				slug: "general",
				icon: <Settings />,
				type: null
			},
			{
				label: "Mon compte",
				slug: "account",
				icon: <UserSquare />,
				type: null
			},
		]
	},
	{
		name: "Accès",
		links: [
			{
				label: "Adresse E-mail",
				slug: "mail",
				icon: <Mail />,
				type: null
			},
			{
				label: "Mot de passe",
				slug: "password",
				icon: <Lock />,
				type: null
			},
			{
				label: "Adresse",
				slug: "address",
				icon: <MapPin />,
				type: "ROLE_DOCTOR"
			},
		]
	},

];

export default function Sidebar({currentLink, setCurrentLink, type}: {currentLink: string, type: string, setCurrentLink: (link: string) => void}) {
	return (
		<aside className="box">
			<ul className="sidebar">
				{links.map((link, i) => (
					<li key={i} className="sidebar_list">
						<h4 className="sidebar_subtitle second-title">{link.name}</h4>
						<ul className="sidebar_sublist">
							{link.links.map((subLink, j) => (
								(subLink.type === null || subLink.type === type) ?
								<SidebarItem key={j} subLink={subLink} active={currentLink === subLink.slug} setCurrentLink={setCurrentLink}
								/> : null
							))}
						</ul>
					</li>
				))}
			</ul>
		</aside>
	)
}

function SidebarItem({subLink, active, setCurrentLink}: {subLink: {label: string, slug: string, icon: JSX.Element}, active: boolean, setCurrentLink: (link: string) => void}) {
	const classes = cn({
		sidebar_item: true,
		active
	});

	return (
		<li
			className={classes}
			onClick={() => setCurrentLink(subLink.slug)}
		>
			{subLink.icon}
			<span>{subLink.label}</span>
		</li>
	);
}