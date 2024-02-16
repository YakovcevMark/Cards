import React, {FormEvent, ReactNode, useCallback, useEffect, useState} from "react";
import {useEscapeKey} from "common/hooks/hooks";
import {Button} from "common/components/Button/Button";
import {
    SModalBackground,
    SModalContent,
    SModalControlSection,
    SModalInputsSection
} from "features/Modals/ModalsStyledComponents";
import {SForm, STitle} from "common/components/CommonStyledComponents";

export type BasicModalPT = {
    isIcon?: boolean
    shouldModalClose: boolean
    inputsChildrenSection: ReactNode
    controlChildrenSection: ReactNode
    buttonContent: ReactNode | string
    title: string
    setFormSubmit?: (data: FormEvent<HTMLFormElement>) => void
    resetQuery?: () => void
    children?: ReactNode
    className?:string
}
export const BasicModal =
    ({
         shouldModalClose,
         buttonContent,
         inputsChildrenSection,
         controlChildrenSection,
         title,
         setFormSubmit,
         resetQuery,
         isIcon,
         children,
         className
     }: BasicModalPT) => {

        const [viewMode, setViewMode] = useState(false)

        const updateModalStateHandler = useCallback(() => {
            setViewMode(false)
            resetQuery && resetQuery()
        }, [setViewMode, resetQuery])

        useEffect(() => {
            viewMode && shouldModalClose && updateModalStateHandler()
        }, [viewMode, shouldModalClose, updateModalStateHandler]);
        const setViewModeFalse = useCallback(() => setViewMode(false),[setViewMode])
        useEscapeKey(setViewModeFalse)
        return <>
            <Button
                onClick={() => setViewMode(true)}
                icon={isIcon}
                className={className}>
                {buttonContent}
                {children}
            </Button>

            {viewMode && <>
                <SModalBackground
                    onClick={setViewModeFalse}/>
                <SModalContent>
                    <SForm onSubmit={setFormSubmit}>
                        <STitle>
                            {title}
                        </STitle>
                        <SModalInputsSection>
                            {inputsChildrenSection}
                        </SModalInputsSection>
                        <SModalControlSection>
                            <Button
                                gray
                                type={"button"}
                                onClick={setViewModeFalse}>
                                Cancel
                            </Button>
                            {controlChildrenSection}
                        </SModalControlSection>
                    </SForm>
                </SModalContent>
            </>
            }
        </>
    }