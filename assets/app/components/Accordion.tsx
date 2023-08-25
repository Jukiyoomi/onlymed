import React, {Children, cloneElement, HTMLProps, ReactElement, ReactNode} from 'react';
import classNames from "classnames";
import chevron from "@img/chevron-down.svg";

type Props = {
	children: ReactNode,
	as: "div" | "article"| "section",
	id: string
} & HTMLProps<HTMLDivElement>;
export default function Accordion({children, as, id, className, ...data}: Props) {
	const As = as;

	const classes = classNames({
		"accordion": true,
		[className as string]: className !== undefined
	})

	return (
		<As {...data} className={classes}>
			<input type="checkbox" name={id} id={id} />
			{Children.map(children, (child, index) => {
				return cloneElement(child as ReactElement, {key: index});
			})}
		</As>
	)
}

const Action = ({children, id, className, isInstant = false}: {children: ReactNode, id: string, className: string, isInstant?: boolean} & HTMLProps<HTMLLabelElement>) => {
	const classes = classNames({
		"accordion_action": true,
		"accordion_action-instant": isInstant,
		[className as string]: true
	})

	return (
		<label htmlFor={id} className={classes}>
			{children}
			<img src={chevron} alt="chevron-down" />
		</label>
	)
};

const Content = ({children}: {children: ReactNode}) => (
	<div className="accordion_content">{children}</div>
);

Accordion.Action = Action;
Accordion.Content = Content;