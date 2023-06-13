import React, {useState} from 'react';
import logo from "@img/logo.svg";
import {GiHamburgerMenu} from "react-icons/gi";
import cn from "classnames";

export default function Header() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const classNames = cn({
		'nav_links': true,
		'nav_links-open': isOpen
	})

	return (
		<header>
			<img src={logo} alt="logo" />

			<nav>
				<div className={classNames}>
					<button className="btn_primary btn_upper reg-bold">A professional ?</button>
					<button className="btn_secondary btn_upper reg-bold">Register</button>
				</div>

				<div onClick={() => setIsOpen(curr => !curr)}>
					<GiHamburgerMenu className="nav_burger" />
				</div>
			</nav>
		</header>
	);
}