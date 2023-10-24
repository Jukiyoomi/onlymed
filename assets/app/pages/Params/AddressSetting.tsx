import React from 'react';
import Button from "@/components/Button";
import {ErrorMessage} from "@hookform/error-message";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useUserStore from "@/store/user";
import {formClient} from "@/api/wretch";
import useAutocomplete from "@/hooks/useAutocomplete";

const settingsSchema = z.object({
    address: z.string()
})

type InputsType = z.infer<typeof settingsSchema>

type InputsKeys = keyof InputsType

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
        setError, clearErrors
    } = useForm<InputsType>({
        resolver: zodResolver(settingsSchema)
    });
    const user = useUserStore(state => state.user);
    const {
        state,
        query: {
            data, isFetching, isLoading, remove,
        },
        onClick,
        handleChange
    } = useAutocomplete(user?.address!, () => {
        clearErrors("address");
    }, (e) => {
        setError(e.path, {
            message: e.error
        });
    })

    const onSubmit: SubmitHandler<InputsType> = () => {
        formClient.url("/doctor/address")
            .put({
                address: state.search
            })
            .then(() => {
                remove();
                callback();
            })
            .catch((e) => {
                console.log(e)
                setError(e.path, {
                    message: e.error
                });
            })
    };

    const {onChange, ...rest} = register('address')

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form_half">
                <div className="form_widget">
                    <label htmlFor="address" className="reg-bold">Nouvelle Adresse</label>
                    <input
                        type="text"
                        id="address"
                        value={state.search}
                        onChange={handleChange}
                        {...rest}
                    />
                </div>
            </div>
            <p className="subtitle">Si vous souhaitez garder une information comme telle, veuillez laisser le champ vide.</p>

            <Button type="primary" disabled={state.mustFetch || (isFetching && isLoading)}>
                Enregistrer {JSON.stringify(state.mustFetch)}
            </Button>
            {
                Object.keys(errors).map((key: string) => (
                    <ErrorMessage
                        key={key}
                        errors={errors}
                        name={key as InputsKeys}
                        render={({ message }) => <div className="form-error">Error: {message}</div>}
                    />
                ))
            }
            {isFetching && isLoading ? <p>Chargement...</p> : null}
            <ul>
                {data?.map((prediction, id) => (
                    <li key={id} onClick={() => onClick(prediction.description)}>
                        <p>{prediction.description}</p>
                    </li>
                ))}
            </ul>
        </form>
    )
}