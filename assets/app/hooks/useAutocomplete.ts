import {ChangeEvent, useEffect, useState} from "react";
import useDebounce from "@/hooks/useDebounce";
import {useQuery} from "@tanstack/react-query";
import {defaultClient, validateSchema} from "@/api/wretch";
import {autocompleteSchema, AutocompleteType} from "@/schemas/autocomplete";

export default function useAutocomplete(defaultValue: string, onError: (e: any) => void) {
    const [state, setState] = useState({
        search: defaultValue,
        mustFetch: false,
    });
    const searchAddress = useDebounce<string>(state.search, 500)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            mustFetch: true,
            search: event.target.value,
        })
    }

    const onClick = (address: string) => {
        setState({
            ...state,
            mustFetch: false,
            search: address,
        })
    }

    const query = useQuery({
        queryKey: ['address'],
        queryFn: async () => {
            return defaultClient.url("/doctor/autocomplete")
                .query({address: searchAddress})
                .get()
                .then((res) => validateSchema<AutocompleteType>(autocompleteSchema, res))
                .catch((e) => {
                    console.log(e)
                    onError(e)
                })
        },
        enabled: false
    })

    useEffect(() => {
        if (state.mustFetch && (searchAddress && searchAddress !== defaultValue)) {
            query.refetch()
        }
    }, [searchAddress])

    return {
        query,
        state,
        handleChange,
        onClick,
    }
}