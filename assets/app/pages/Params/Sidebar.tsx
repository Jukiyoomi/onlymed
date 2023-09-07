import React from 'react';
import {Mail, Settings, UserSquare, Lock} from "lucide-react";
import cn from "classnames";

const links = [
	{
		name: "General",
		links: [
			{
				label: "General",
				slug: "general",
				icon: <Settings />
			},
			{
				label: "Mon compte",
				slug: "account",
				icon: <UserSquare />
			},
		]
	},
	{
		name: "Accès",
		links: [
			{
				label: "Adresse E-mail",
				slug: "mail",
				icon: <Mail />
			},
			{
				label: "Mot de passe",
				slug: "password",
				icon: <Lock />
			},
		]
	},

];

export default function Sidebar({currentLink, setCurrentLink}: {currentLink: string, setCurrentLink: (link: string) => void}) {
	return (
		<aside>
			<ul className="sidebar">
				{links.map((link, i) => (
					<li key={i} className="sidebar_list">
						<h4 className="sidebar_subtitle second-title">{link.name}</h4>
						<ul className="sidebar_sublist">
							{link.links.map((subLink, j) => (
								<SidebarItem subLink={subLink} currentLink={currentLink} setCurrentLink={setCurrentLink} key={j} />
							))}
						</ul>
					</li>
				))}
			</ul>
		</aside>
	)
}

function SidebarItem({subLink, currentLink, setCurrentLink}: {subLink: {label: string, slug: string, icon: JSX.Element}, currentLink: string, setCurrentLink: (link: string) => void}) {
	const classes = cn({
		sidebar_item: true,
		active: currentLink === subLink.slug
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