import React from 'react';
import Button from "@comps/Button";
import {ErrorMessage} from "@hookform/error-message";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";

type GeneralInputsType = {
	firstname: string,
	lastname: string
}

const generalSettingsSchema = z.object({
	firstname: z.string({
		required_error: "L'ancienne adresse e-mail est requise."
	}).regex(/^[a-zA-Z\s]+$/, {
		message: "Le prénom ne peut contenir que des lettres."
	}).optional(),
	lastname: z.string({
		required_error: "La nouvelle adresse e-mail est requise."
	}).regex(/^[a-zA-Z\s]+$/, {
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

	const navigate = useNavigate();

	const queryClient = useQueryClient()

	const onSubmit: SubmitHandler<GeneralInputsType> = data => {
		console.log(data);
		// wretch("/api/user/email")
		// 	.put({
		// 		oldMail: data.oldMail,
		// 		newMail: data.newMail
		// 	})
		// 	.res(async (res) => {
		// 		const data = await res.json();
		// 		console.log(data);
		// 		await queryClient.invalidateQueries({queryKey: ['user']})
		// 		navigate("/dashboard")
		// 	})
		// 	.catch((e) => {
		// 		const parsedError = JSON.parse(e.message);
		// 		console.log(parsedError.error);
		// 		setError(parsedError.path, {
		// 			message: parsedError.error
		// 		});
		// 	})
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="form_half">
				<div className="form_widget form_half_item">
					<label htmlFor="firstname">Nom</label>
					<input
						type="email"
						{...register('firstname', {required: true})}
					/>
				</div>
				<div className="form_widget form_half_item">
					<label htmlFor="lastname">Prénom</label>
					<input
						type="email"
						{...register('lastname', {required: true})}
					/>
				</div>
			</div>

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