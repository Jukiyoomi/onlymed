import Button from "@comps/Button";
import React from "react";
import useSearchStore from "@store/search";
import {MapPin, Search} from "lucide-react";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const querySchema = z.object({
	search: z.string({
		required_error: "Le champ de recherche ne peut être vide."
	}),
	location: z.string().optional(),
})

type FormType = z.infer<typeof querySchema>;

export default function SearchDoctorBar() {
	const [setSearch, setLocation] = useSearchStore((state) => [state.setSearch, state.setLocation]);

	const {
		register, handleSubmit,
	} = useForm<FormType>({
		resolver: zodResolver(querySchema)
	});
	const onSubmit: SubmitHandler<FormType> = data => {
		console.log(data);

		const searchValue = data.search.trim();
		const locationValue = data.location?.trim();
		if (searchValue === "") return;

		setSearch(searchValue);
		if (locationValue != null) setLocation(locationValue);
	};

	return (
		<form className="bar" onSubmit={handleSubmit(onSubmit)}>
			<div className="form_widget">
				<Search color="#006D77" />
				<input type="text" placeholder="Nom, Spécialité"
					   required
					   {...register("search")}
				/>
			</div>
			<div className="form_widget">
				<MapPin color="#006D77" />
				<input type="text" placeholder="Ville, région"
					   {...register("location")}
				/>
			</div>
			<Button
				type="primary"
				uppercase={true}
			>Rechercher</Button>
		</form>
	)
}