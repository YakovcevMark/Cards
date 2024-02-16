import {useMemo, useState} from "react";
import {Switch} from "common/components/Switch/Switch";
import {Input} from "common/components/Inputs/Input";
import {ShowImageInput, ShowImageInputPT} from "features/Modals/common/components/ShowInputImage/ShowImageInput";
import {UseFormRegister} from "react-hook-form";
import {camelize} from "utils/DataUtils/handleStringsUtils";
import styled from "styled-components";

const options = ["text", "image"]

type PT = Omit<ShowImageInputPT, "buttonBody"> & {
    name: string
    textRegister: UseFormRegister<any>
    textError?: string
    shouldInputDisabled: boolean
}
export const CreateAndEditCardInputBlock =
    ({
         name,
         image,
         textRegister,
         textError,
         shouldInputDisabled,
         className,
         ...rest
     }: PT) => {

        const [type, setType] = useState("text")

        const camelizeName = useMemo(() => camelize(name), [name])

        return <>
            <SQuestionAnswerInputBlock
                className={className}>
                <span> <b>{name} type:</b> </span>
                <Switch
                    optionsValues={options}
                    optionsNames={options}
                    changeHandler={setType}
                    condition={type}
                />
            </SQuestionAnswerInputBlock>

            {type === "text"
                ? <Input
                    placeholder={name}
                    register={textRegister}
                    error={textError}
                    disabled={shouldInputDisabled}/>

                : <ShowImageInput
                    buttonBody={`${camelizeName}`}
                    image={image}
                    {...rest}/>
            }
        </>
    }

const SQuestionAnswerInputBlock = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding-bottom: 1vh;
`