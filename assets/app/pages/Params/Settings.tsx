import React from 'react';
import MailSetting from "./MailSetting";
import PasswordSetting from "./PasswordSetting";
import GeneralSetting from "./GeneralSetting";
import AccountSetting from "./AccountSetting";

type SettingType = {
	[key: string]: () => {
		Title: string,
		Content: JSX.Element
	}
}

export default function Settings({currentLink}: {currentLink: string}) {
	const Element = settingFactories[currentLink]();

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

const settingFactories: SettingType = {
	"account": AccountSetting,
	"mail": MailSetting,
	"password": PasswordSetting,
	"general": GeneralSetting,
}
