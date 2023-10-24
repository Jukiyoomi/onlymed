import React from 'react';
import Button from "@/components/Button";
import {ErrorMessage} from "@hookform/error-message";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useUserStore from "@/store/user";
import {formClient} from "@/api/wretch";

const settingsSchema = z.object({
    address: z.string()
})

type InputsType = z.infer<typeof settingsSchema>

export default function AddressSetting(cb: () => void) {
    return {
        Title: "Adresse",
        Content: (
            <Form callback={cb} />
        ),
        Class: "settings_address"
    }
}

function Form({callback}: {callback: () => void}) {
    const {
        register, handleSubmit,
        formState: {
            errors
        },
        setError
    } = useForm<InputsType>({
        resolver: zodResolver(settingsSchema)
    });
    const user = useUserStore(state => state.user);

    const onSubmit: SubmitHandler<InputsType> = data => {
        console.log(data);
        formClient.url("/user/address")
            .put(data)
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
                    <label htmlFor="firstname" className="reg-bold">Nouvelle Adresse</label>
                    <input
                        type="text"
                        id="address"
                        defaultValue={user?.address}
                        {...register('address')}
                    />
                </div>
            </div>
            <p className="subtitle">Si vous souhaitez garder une information comme telle, veuillez laisser le champ vide.</p>

            <Button type="primary">Enregistrer</Button>
            <ErrorMessage
                errors={errors}
                name="address"
                render={({ message }) => <div className="form-error">Error: {message}</div>}
            />
        </form>
    )
}