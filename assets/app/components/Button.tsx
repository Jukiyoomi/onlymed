import React, {HTMLProps} from "react";
import cn from "classnames";

type Props = {
	type: "primary" | "secondary";
	uppercase?: boolean
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
} & HTMLProps<HTMLButtonElement>

export default function Button(props: Props) {
	const {className, type, uppercase, onClick, disabled, children, ...data} = props

	const classNames = cn({
		'btn': true,
		'reg-bold': true,
		'btn_upper': uppercase,
		'btn_disabled': disabled,
		[`btn_${type}`]: type,
	})


	return <button className={classNames} onClick={onClick} {...data}>{children}</button>;
}