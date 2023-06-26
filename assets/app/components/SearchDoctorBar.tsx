import loupe from "@img/loupe.svg";
import pin from "@img/pin.svg";
import Button from "@comps/Button";
import React, {useRef, useState} from "react";
import useSearchStore from "../store/search";


export default function SearchDoctorBar() {
	// const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const [searchRef, setSearchRef] = useState<string>("");
	const [search, setSearch] = useSearchStore((state) => [state.search, state.setSearch]);

	const handleSearch = async () => {
		if (searchRef.trim() === "") return;

		setSearch(searchRef.trim());

		console.log(search)
	}

	return (
		<section className="bar">
			{searchRef}
			<div className="form_widget">
				<img src={loupe} alt="Loupe SVG" />
				<input type="text" placeholder="Nom, Spécialité"
					   value={searchRef}
					   onChange={(e) => setSearchRef(e.target.value)}
					   // ref={searchRef}
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