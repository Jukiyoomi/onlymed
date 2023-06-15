import React from "react";
import cn from "classnames";

type Props = {
	type: "primary" | "secondary";
	children: React.ReactNode;
}

export default function Button(props: Props) {

	const classNames = cn({
		'btn': true,
		'reg-bold': true,
		[`btn_${props.type}`]: props.type,
	})

	return <button className={classNames}>{props.children}</button>;
}