import React, {Children, cloneElement, ReactElement, ReactNode} from "react";

export default function Pagination({children}: {children: ReactNode}) {
	return (
		<div className="paginate">
			{Children.map(children, (child, index) => {
				return cloneElement(child as ReactElement, {key: index});
			})}
		</div>
	)
}

const PreviousAction = ({children}: {children: ReactNode}) => {
	return <>{children}</>;
}

const Text = ({children}: {children: ReactNode}) => {
	return <>{children}</>;
}

const NextAction = ({children}: {children: ReactNode}) => {
	return <>{children}</>;
}

Pagination.PreviousAction = PreviousAction;
Pagination.Text = Text;
Pagination.NextAction = NextAction;