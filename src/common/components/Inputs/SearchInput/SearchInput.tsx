import React from 'react';
import {useAppSearchParams, useSearchWithDelay} from "common/hooks/hooks";
import styled from "styled-components";
import {InputPT} from "common/components/Inputs/Input";

type PT = InputPT & {
    searchName: string
}
export const SearchInput =
    ({
         searchName,
         ...rest
     }: PT) => {
        const {searchParams, useMySetSearchParams} = useAppSearchParams();
        const setPackNameSearchParam = useMySetSearchParams(searchName)
        const [value, setValue] = useSearchWithDelay(setPackNameSearchParam, 1500, searchParams.get(searchName) || undefined,)
        return (
            <SSearchInput
                type={"search"}
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                {...rest}
            />
        );
    };
const SSearchInput = styled.input`
    border: 1px solid rgba(0, 0, 0, 0.2)
`