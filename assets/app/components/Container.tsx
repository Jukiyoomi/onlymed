import React from "react";

export default function Container(props: React.HTMLProps<HTMLElement>) {
	const {className, ...rest} = props;

	return <main className={`container ${className}`} {...rest}>{props.children}</main>;
}