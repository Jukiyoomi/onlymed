import React from 'react';
import MailSetting from "./MailSetting";
import PasswordSetting from "./PasswordSetting";
import GeneralSetting from "./GeneralSetting";
import AccountSetting from "./AccountSetting";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";

type SettingType = {
	[key: string]: (cb: () => void) => {
		Title: string,
		Content: JSX.Element,
		Class?: string
	}
}

export default function Settings({currentLink}: {currentLink: string}) {
	const navigate = useNavigate();

	const queryClient = useQueryClient()
	const currentSetting = settingFactories[currentLink];

	const onFormSuccess = async () => {
		console.log("Form success")
		await queryClient.invalidateQueries({queryKey: ['user']})
		navigate("/dashboard")
	}

	const Element = currentSetting(onFormSuccess);

	return (
		<section className="settings box">
			<div className="settings_header">
				<h1 className="main-title">{Element.Title}</h1>
				<hr/>
			</div>
			<div className={`settings_content ${Element.Class}`}>
				{Element.Content}
			</div>

		</section>
	)
}

const settingFactories: SettingType = {
	"account": AccountSetting,
	"mail": MailSetting,
	"password": PasswordSetting,
	"general": GeneralSetting,
}
