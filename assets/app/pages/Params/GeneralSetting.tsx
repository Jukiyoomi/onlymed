import React from 'react';
import Button from "@/components/Button";
import {ErrorMessage} from "@hookform/error-message";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useUserStore from "@/store/user";
import {formClient} from "@/api/wretch";

const settingsSchema = z.object({
	firstname: z.string().regex(/^[a-zA-Z'\s]*$/, {
		message: "Le prénom ne peut contenir que des lettres."
	}).optional(),
	lastname: z.string().regex(/^[a-zA-Z'\s]*$/, {
		message: "Le nom ne peut contenir que des lettres."
	}).optional(),
})

type InputsType = z.infer<typeof settingsSchema>

type InputsKeys = keyof InputsType

export default function GeneralSetting(cb: () => void) {
	return {
		Title: "Informations Générales",
		Content: (
				<Form callback={cb} />
		),
		Class: "settings_general"
	}
}

function Form({callback}: {callback: () => void}) {
	const {
		register, handleSubmit,
		formState: {
			errors
		},
		setError
	} = useForm<InputsType>({
		resolver: zodResolver(settingsSchema)
	});
	const user = useUserStore(state => state.user);

	const onSubmit: SubmitHandler<InputsType> = data => {
		console.log(data);
		if (data.firstname === user?.firstname) {
			setError("firstname", {
				message: "Les informations n'ont pas changé."
			});
			return;
		}
		if (data.lastname === user?.lastname) {
			setError("lastname", {
				message: "Les informations n'ont pas changé."
			});
			return;
		}

		formClient.url("/user/general")
			.put({
				firstname: Boolean(data.firstname) ? data.firstname : null,
				lastname: Boolean(data.lastname) ? data.lastname : null
			})
			.then(callback)
			.catch((e) => {
				console.log(e)
				setError(e.path, {
					message: e.error
				});
			})
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="form_half">
				<div className="form_widget form_half_item">
					<label htmlFor="firstname" className="reg-bold">Nom</label>
					<input
						type="text"
						id="firstname"
						defaultValue={user?.firstname}
						{...register('firstname')}
					/>
				</div>
				<div className="form_widget form_half_item">
					<label htmlFor="lastname" className="reg-bold">Prénom</label>
					<input
						type="text"
						id="lastname"
						defaultValue={user?.lastname}
						{...register('lastname')}
					/>
				</div>
			</div>
			<p className="subtitle">Si vous souhaitez garder une information comme telle, veuillez laisser le champ vide.</p>

			<Button type="primary">Enregistrer</Button>
			{
				Object.keys(errors).map((key: string) => (
					<ErrorMessage
						key={key}
						errors={errors}
						name={key as InputsKeys}
						render={({ message }) => <div className="form-error">Error: {message}</div>}
					/>
				))
			}
		</form>
	)
}