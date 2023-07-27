import loupe from "@img/loupe.svg";
import pin from "@img/pin.svg";
import Button from "@comps/Button";
import React, {useRef} from "react";
import useSearchStore from "../store/search";


export default function SearchDoctorBar() {
	const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const locationRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const [setSearch, setLocation] = useSearchStore((state) => [state.setSearch, state.setLocation]);

	const handleSearch = () => {
		const searchValue = searchRef.current.value.trim();
		const locationValue = locationRef.current.value.trim();
		if (searchValue === "") return;

		setSearch(searchValue);
		setLocation(locationValue);
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
					   ref={locationRef} />
			</div>
			<Button
				type="primary"
				onClick={handleSearch}
				uppercase={true}
			>Rechercher</Button>
		</section>
	)
}