import Button from "@comps/Button";
import React, {useRef} from "react";
import useSearchStore from "../store/search";
import {MapPin, Search} from "lucide-react";


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
				<Search color="#006D77" />
				<input type="text" placeholder="Nom, Spécialité"
					   ref={searchRef}
					   required />
			</div>
			<div className="form_widget">
				<MapPin color="#006D77" />
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