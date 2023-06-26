import loupe from "@img/loupe.svg";
import pin from "@img/pin.svg";
import Button from "@comps/Button";
import React, {useRef} from "react";
import useSearchStore from "../store/search";


export default function SearchDoctorBar() {
	const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const [search, setSearch] = useSearchStore((state) => [state.search, state.setSearch]);

	const handleSearch = async () => {
		const value = searchRef.current.value.trim();
		if (value === "") return;

		setSearch(value);

		console.log(search)
	}

	return (
		<section className="bar">
			<div className="form_widget">
				<img src={loupe} alt="Loupe SVG" />
				<input type="text" placeholder="Nom, Spécialité"
					   ref={searchRef}
					   required />
			</div>
			<div className="form_widget">
				<img src={pin} alt="Pin SVG" />
				<input type="text" placeholder="Ville, région"
					   required />
			</div>
			<Button
				type="primary"
				onClick={() => handleSearch()}
				uppercase={true}
			>Rechercher</Button>
			{search}
		</section>
	)
}