import React from 'react';
import logo from "@img/logo.svg";
import {Link} from "react-router-dom";
import {Menu} from "lucide-react";

export default function Header() {
	return (
		<header className="default">
			<Link to="/">
				<img src={logo} alt="logo" />
			</Link>

			<nav>
				<label htmlFor="burger">
					<Menu className="nav_burger" />
				</label>

				<input type="checkbox" id="burger" />

				<div className="nav_links">
					<Link to={"/f"}>
						<button className="btn_primary btn_upper reg-bold">are you a professional ?</button>
					</Link>
					<a href="/register">
						<button className="btn_secondary btn_upper reg-bold">Register</button>
					</a>
				</div>
			</nav>
		</header>
	);
}