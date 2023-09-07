import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "@comps/Button";
import {ErrorMessage} from "@hookform/error-message";
import {z} from "zod";
import wretch from "wretch";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";

type MailInputsType = {
	oldMail: string,
	newMail: string
}

const mailSettingsSchema = z.object({
	oldMail: z.string({
		required_error: "L'ancienne adresse e-mail est requise."
	}).email({
		message: "L'ancienne adresse e-mail doit être valide."
	}),
	newMail: z.string({
		required_error: "La nouvelle adresse e-mail est requise."
	}).email({
		message: "La nouvelle adresse e-mail doit être valide."
	}),
}).refine(data => data.oldMail !== data.newMail, {
	message: "Les deux adresses e-mail doivent être différentes.",
	path: ["newMail"]
})

export default function MailSetting() {
	return {
		Title: "Adresse E-mail",
		Content: (
			<div className="settings_content settings_mail">
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
	} = useForm<MailInputsType>({
		resolver: zodResolver(mailSettingsSchema)
	});

	const navigate = useNavigate();

	const queryClient = useQueryClient()

	const onSubmit: SubmitHandler<MailInputsType> = data => {
		wretch("/api/user/email")
			.put({
				oldMail: data.oldMail,
				newMail: data.newMail
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
					<label htmlFor="oldMail" className="reg-bold">Ancienne Adresse E-mail</label>
					<input
						type="email"
						id="oldMail"
						{...register('oldMail', {required: true})}
					/>
				</div>
				<div className="form_widget form_half_item">
					<label htmlFor="newMail" className="reg-bold">Nouvelle Adresse E-mail</label>
					<input
						type="email"
						id="newMail"
						{...register('newMail', {required: true})}
					/>
				</div>
			</div>

			<Button type="primary">Enregistrer</Button>
			<ErrorMessage
				errors={errors}
				name="newMail"
				render={({ message }) => <div className="form-error">Error: {message}</div>}
			/>
			<ErrorMessage
				errors={errors}
				name="oldMail"
				render={({ message }) => <div className="form-error">Error: {message}</div>}
			/>
		</form>
	)
}