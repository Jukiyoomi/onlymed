import React from 'react';
import Button from "@/components/Button";

export default function AccountSetting() {
	return {
		Title: "Mon compte",
		Content: (
			<>
				<p>Une fois confirmé, vous ne pourrez pas récupérer votre compte. Cette action est irréversible.</p>
				<a href="/user/delete">
					<Button type="primary">Supprimer Mon Compte</Button>
				</a>
			</>
		),
		Class: "settings_account"
	}
}