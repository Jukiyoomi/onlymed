import React from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import wretch from "wretch";
import {ZodError} from "zod";
import doctorSchema from "@schemas/doctor";

export default function Consultation() {
    const {id} = useParams();

    const {data} = useQuery(['doctor', id], async () => {
        return wretch()
			.get(`/api/doctors/${id}`)
			.json(async (res) => doctorSchema.parse(res))
			.then((res) => res.doctor)
			.catch((e: ZodError) => {
				console.log(e)
				return "Une erreur est survenue. Veuillez recharger la page.";
			})
			.catch((e) => {
				const parsedError = JSON.parse(e.message);
				console.log(parsedError.error);
				return parsedError;
			})
    });

    return (
		<>
			<h1>Consultation of {id}</h1>
			<div>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</div>
		</>
	);
}