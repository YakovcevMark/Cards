import React, {FormEvent, ReactNode, useCallback, useEffect, useState} from "react";
import {useEscapeKey} from "common/hooks/hooks";
import {Button} from "common/components/Button/Button";
import {SModalBackground, SModalContent, SModalControlSection} from "features/Modals/ModalsStyledComponents";
import {SInputsSection, STitle} from "common/components/CommonStyledComponents";

type PT = {
    isIcon?: boolean
    initViewMode: boolean
    inputsChildrenSection: ReactNode
    controlChildrenSection: ReactNode
    buttonContent: ReactNode | string
    title: string
    setFormSubmit?: (data: FormEvent<HTMLFormElement>) => void
    resetQuery?: () => void
    children?: ReactNode
}
export const BasicModal =
    ({
         initViewMode,
         buttonContent,
         inputsChildrenSection,
         controlChildrenSection,
         title,
         setFormSubmit,
         resetQuery,
         isIcon,
         children
     }: PT) => {
        const [viewMode, setViewMode] = useState(false)

        const updateModalStateHandler = useCallback(() => {
            setViewMode(false)
            resetQuery && resetQuery()
        }, [setViewMode, resetQuery])

        useEffect(() => {
            viewMode && initViewMode && updateModalStateHandler()
        }, [viewMode, initViewMode, updateModalStateHandler]);
        const switchViewModeOn = () => setViewMode(true);
        const switchViewModeOff = () => setViewMode(false);

        useEscapeKey(switchViewModeOff)
        return <>
            <Button
                onClick={switchViewModeOn}
                icon={isIcon}>
                {buttonContent}
                {children}
            </Button>
            {viewMode && <>
                <SModalBackground
                    onClick={switchViewModeOff}/>
                <SModalContent>
                    <form onSubmit={setFormSubmit}>
                        <STitle>
                            {title}
                        </STitle>
                        <SInputsSection>
                            {inputsChildrenSection}
                        </SInputsSection>
                        <SModalControlSection>
                            <Button
                                gray
                                type={"button"}
                                onClick={switchViewModeOff}>
                                Cancel
                            </Button>
                            {controlChildrenSection}
                        </SModalControlSection>
                    </form>
                </SModalContent>
            </>
            }
        </>
    }

