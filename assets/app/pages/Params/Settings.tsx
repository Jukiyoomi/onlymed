import React from 'react';
import MailSetting from "./MailSetting";
import PasswordSetting from "./PasswordSetting";
import GeneralSetting from "./GeneralSetting";
import AccountSetting from "./AccountSetting";

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
			return AccountSetting();
		case "mail":
			return MailSetting();
		case "password":
			return PasswordSetting();
		case "general":
		default:
			return GeneralSetting();
	}
}
