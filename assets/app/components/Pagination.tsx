import React, {Children, cloneElement, HTMLProps, ReactElement, ReactNode} from "react";

export default function Pagination({children}: {children: ReactNode}) {
	return (
		<div className="paginate">
			{Children.map(children, (child, index) => {
				return cloneElement(child as ReactElement, {key: index});
			})}
		</div>
	)
}

const Action = ({children}: {children: ReactNode}) => {
	return <>{children}</>;
}

type TextProps = {
	children: ReactNode;
	as: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
} & HTMLProps<HTMLHeadingElement|HTMLParagraphElement>

const Text = ({as, children, ...data}: TextProps) => {
	const Component = as;
	return <Component {...data}>{children}</Component>;
}

Pagination.Action = Action;
Pagination.Text = Text;
