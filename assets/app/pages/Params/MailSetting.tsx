import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "@comps/Button";
import {ErrorMessage} from "@hookform/error-message";
import {z} from "zod";
import {formClient} from "../../api/wretch";

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

type MailInputsType = z.infer<typeof mailSettingsSchema>

export default function MailSetting(cb: () => void) {
	return {
		Title: "Adresse E-mail",
		Content: <Form callback={cb} />,
		Class: "settings_mail"
	}
}

function Form({callback}: {callback: () => void}) {
	const {
		register, handleSubmit,
		formState: {
			errors
		},
		setError
	} = useForm<MailInputsType>({
		resolver: zodResolver(mailSettingsSchema)
	});

	const onSubmit: SubmitHandler<MailInputsType> = data => {
		formClient.url("/user/email")
			.put({
				oldMail: data.oldMail,
				newMail: data.newMail
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