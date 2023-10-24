import React from 'react';
import {z} from "zod";
import Button from "@/components/Button";
import {ErrorMessage} from "@hookform/error-message";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {formClient} from "@/api/wretch";

const settingsSchema = z.object({
	oldPassword: z.string({
		required_error: "L'ancien mot de passe est requis."
	}).min(8, {
		message: "L'ancien mot de passe doit contenir au moins 8 caractères."
	}),
	newPassword: z.string({
		required_error: "Le nouveau mot de passe est requis."
	}).min(8, {
		message: "Le nouveau mot de passe doit contenir au moins 8 caractères."
	}),
	confirmPassword: z.string({
		required_error: "La nouvelle confirmation de mot de passe est requise."
	}),
}).refine(data => data.newPassword === data.confirmPassword, {
	message: "Le mot de passe et la confirmation doivent être identiques.",
	path: ["confirmPassword"]
}).refine(data => data.oldPassword !== data.newPassword, {
	message: "L'ancien mot de passe et le nouveau doivent être différents.",
	path: ["newPassword"]
})

type InputsType = z.infer<typeof settingsSchema>

export default function PasswordSetting(cb: () => void) {
	return {
		Title: "Modifier mon mot de passe",
		Content: <Form callback={cb} />,
		Class: "settings_password"
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

	const onSubmit: SubmitHandler<InputsType> = data => {
		formClient.url("/user/password")
			.put({
				oldPassword: data.oldPassword,
				newPassword: data.newPassword,
				confirmPassword: data.confirmPassword
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
			<div className="form_widget">
				<label htmlFor="oldPassword" className="reg-bold">Ancien Mot de Passe</label>
				<input
					type="password"
					id="oldPassword"
					{...register('oldPassword', {required: true})}
				/>
			</div>
			<div className="form_widget">
				<label htmlFor="newPassword" className="reg-bold">Nouveau Mot de Passe</label>
				<input
					type="password"
					id="newPassword"
					{...register('newPassword', {required: true})}
				/>
			</div>
			<div className="form_widget">
				<label htmlFor="confirmPassword" className="reg-bold">Confirmez le Mot de Passe</label>
				<input
					type="password"
					id="confirmPassword"
					{...register('confirmPassword', {required: true})}
				/>
			</div>

			<Button type="primary">Enregistrer</Button>
			<ErrorMessage
				errors={errors}
				name="oldPassword"
				render={({ message }) => <div className="form-error">Error: {message}</div>}
			/>
			<ErrorMessage
				errors={errors}
				name="newPassword"
				render={({ message }) => <div className="form-error">Error: {message}</div>}
			/>
			<ErrorMessage
				errors={errors}
				name="confirmPassword"
				render={({ message }) => <div className="form-error">Error: {message}</div>}
			/>
		</form>
	)
}