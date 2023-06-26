import React, {HTMLProps, MouseEventHandler} from "react";
import cn from "classnames";

type Props = {
	type: "primary" | "secondary";
	uppercase?: boolean
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
} & HTMLProps<HTMLButtonElement>

export default function Button(props: Props) {
	const {className, type, ...data} = props

	const classNames = cn({
		'btn': true,
		'reg-bold': true,
		'capitalize': props.uppercase,
		[`btn_${props.type}`]: props.type,
	})


	return <button className={classNames} onClick={props.onClick} {...data}>{props.children}</button>;
}