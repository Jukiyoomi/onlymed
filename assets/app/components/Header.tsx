import React, {useState} from 'react';
import logo from "@img/logo.svg";
import {GiHamburgerMenu} from "react-icons/gi";
import cn from "classnames";
import {Link} from "react-router-dom";

export default function Header() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const classNames = cn({
		'nav_links': true,
		'nav_links-open': isOpen
	})

	return (
		<header>
			<Link to="/">
				<img src={logo} alt="logo" />
			</Link>

			<nav>
				<div className={classNames}>
					<Link to={"/f"}>
						<button className="btn_primary btn_upper reg-bold">are you a professional ?</button>
					</Link>
					<a href="/register">
						<button className="btn_secondary btn_upper reg-bold">Register</button>
					</a>
				</div>

				<div onClick={() => setIsOpen(curr => !curr)}>
					<GiHamburgerMenu className="nav_burger" />
				</div>
			</nav>
		</header>
	);
}