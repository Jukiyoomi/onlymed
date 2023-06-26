import React from "react";
import {Oval} from "react-loader-spinner";

export default function Loader() {
	return <div className="loader_container loader_dark">
		<Oval
			height={80}
			width={80}
			color="#EDF6F9"
			wrapperStyle={{}}
			wrapperClass=""
			visible={true}
			ariaLabel='oval-loading'
			secondaryColor="#B8DEDC"
			strokeWidth={2}
			strokeWidthSecondary={2}

		/>
	</div>;
}

export function TextLoader() {
	return <div className="loader_container">
		<p className="main-title">Chargement...</p>
	</div>;
}