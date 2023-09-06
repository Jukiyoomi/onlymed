import React from 'react';
import Button from "@comps/Button";
import {ErrorMessage} from "@hookform/error-message";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";
import useUserStore from "@store/user";
import wretch from "wretch";

type GeneralInputsType = {
	firstname: string,
	lastname: string
}

const generalSettingsSchema = z.object({
	firstname: z.string({
		required_error: "L'ancienne adresse e-mail est requise."
	}).regex(/^[a-zA-Z'\s]*$/, {
		message: "Le prénom ne peut contenir que des lettres."
	}).optional(),
	lastname: z.string({
		required_error: "La nouvelle adresse e-mail est requise."
	}).regex(/^[a-zA-Z'\s]*$/, {
		message: "Le nom ne peut contenir que des lettres."
	}).optional(),
})

export default function GeneralSetting() {
	return {
		Title: "Informations Générales",
		Content: (
			<div className="settings_content settings_general">
				<Form />
			</div>
		)
	}
}

function Form() {
	const {
		register, handleSubmit,
		formState: {
			errors
		},
		setError
	} = useForm<GeneralInputsType>({
		resolver: zodResolver(generalSettingsSchema)
	});
	const user = useUserStore(state => state.user);

	const navigate = useNavigate();

	const queryClient = useQueryClient()

	const onSubmit: SubmitHandler<GeneralInputsType> = data => {
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

		wretch("/api/user/general")
			.put({
				firstname: Boolean(data.firstname) ? data.firstname : null,
				lastname: Boolean(data.lastname) ? data.lastname : null
			})
			.res(async (res) => {
				const data = await res.json();
				console.log(data);
				await queryClient.invalidateQueries({queryKey: ['user']})
				navigate("/dashboard")
			})
			.catch((e) => {
				const parsedError = JSON.parse(e.message);
				console.log(parsedError.error);
				setError(parsedError.path, {
					message: parsedError.error
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
			<ErrorMessage
				errors={errors}
				name="firstname"
				render={({ message }) => <div className="form-error">Error: {message}</div>}
			/>
			<ErrorMessage
				errors={errors}
				name="lastname"
				render={({ message }) => <div className="form-error">Error: {message}</div>}
			/>
		</form>
	)
}