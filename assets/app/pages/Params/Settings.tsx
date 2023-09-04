import React from 'react';
import Button from "@comps/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ErrorMessage} from "@hookform/error-message";

export default function Settings({currentLink}: {currentLink: string}) {
	const Element = balancer(currentLink);

	return (
		<section className="settings">
			<div className="settings_header">
				<h1 className="main-title">{Element.Title}</h1>
				<hr/>
			</div>
			{Element.Content}
		</section>
	)
}

function balancer(type: string) {
	switch (type) {
		case "account":
			return Account();
		case "mail":
			return Mail();
		case "password":
			return Password();
		case "general":
		default:
			return General();
	}
}

function General() {
	return {
		Title: "Informations Générales",
		Content: (
			<></>
		)
	}
}

function Account() {
	return {
		Title: "Mon compte",
		Content: (
			<div className="settings_content settings_account">
				<p>Une fois confirmé, vous ne pourrez pas récupérer votre compte. Cette action est irréversible.</p>
				<a href="/user/delete">
					<Button type="primary">Supprimer Mon Compte</Button>
				</a>
			</div>
		)
	}
}

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

function Mail() {
	const { register, handleSubmit, formState: { errors } } = useForm<MailInputsType>({
		resolver: zodResolver(mailSettingsSchema)
	});
	const onSubmit: SubmitHandler<MailInputsType> = data => console.log(data);

	return {
		Title: "Adresse E-mail",
		Content: (
			<div className="settings_content settings_mail">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form_half">
						<div className="form_widget">
							<label htmlFor="oldMail">Ancienne Adresse E-mail</label>
							<input
								type="email"
								{...register('oldMail', {required: true})}
							/>
						</div>
						<div className="form_widget">
							<label htmlFor="newMail">Nouvelle Adresse E-mail</label>
							<input
								type="email"
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
			</div>
		)
	}
}

function Password() {
	return {
		Title: "Modifier mon mot de passe",
		Content: (
			<></>
		)
	}
}
