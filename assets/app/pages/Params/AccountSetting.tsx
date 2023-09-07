import React from 'react';
import Button from "@comps/Button";

export default function AccountSetting() {
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