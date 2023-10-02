import wretch from "wretch";
import QueryStringAddon from "wretch/addons/queryString";
import {z, ZodError} from "zod";

const baseClient =
	wretch("/api", { mode: "cors" })
		.errorType("s")
		.addon(QueryStringAddon)
		.resolve(r => r.json())
		.catcher(500, () => {
			console.log("erreur depuis le serveur")
			throw "Une erreur est survenue. Veuillez recharger la page.";
		})

export const defaultClient = baseClient.catcherFallback(handleGetError); // for normal requests
export const formClient = baseClient.catcherFallback((e:unknown) => { // for form requests
	let data = {
		error: "",
		path: ""
	};
		console.log("erreur depuis le client")
		if (e instanceof Error) {
			const parsed = JSON.parse(e.message);
			data.error = parsed.error;
			data.path = parsed.path;
		}
		throw data;
});
export function validateSchema<T>(schema: z.Schema<T>, data: unknown) {
	try {
		return schema.parse(data);
	} catch (e: unknown) {
		console.log("erreur depuis le client")
		if (e instanceof ZodError) {
			throw "Une erreur est survenue. Veuillez recharger la page."
		}
	}
}

function handleGetError(e:unknown) {
	let message = "";
	console.log("erreur depuis le client")
	if (e instanceof Error) {
		message = JSON.parse(e.message);
	}
	throw message;
}
