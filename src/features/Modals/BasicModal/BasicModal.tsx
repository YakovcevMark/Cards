import React, {ReactNode} from "react";
import {useEscapeKey} from "common/hooks/hooks";
import {Button} from "common/components/Button/Button";
import {SModal, SModalBackground, SModalContent} from "features/Modals/ModalsStyledComponents";

type PT = {
    children?: ReactNode
    isIcon?: boolean
    viewMode: boolean
    setViewMode: (v:boolean) => void
    setFormSubmit: (data:any) => void
    buttonContent: ReactNode | string
}
export const BasicModal =
    ({
         children,
         buttonContent,
         viewMode,
         setViewMode,
         setFormSubmit,
         isIcon
     }: PT) => {
        const switchViewModeOn = () => setViewMode(true);
        const switchViewModeOff = () => setViewMode(false);
        useEscapeKey(switchViewModeOff)
        return <SModal>
            <Button
                onClick={switchViewModeOn}
                icon={isIcon}>
                {buttonContent}
            </Button>
            {viewMode && <>
                <SModalBackground
                    onClick={() => setViewMode(false)}/>
                <SModalContent>
                    <form onSubmit={setFormSubmit}>
                        {children}
                    </form>
                </SModalContent>
            </>
            }
        </SModal>
    }

