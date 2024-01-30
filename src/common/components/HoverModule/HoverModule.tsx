import React, {ReactNode, useState} from 'react';
import {SHoverModule} from "common/components/CommonStyledComponents";

type PT = {
    className?: string
    moduleChildrenBody: ReactNode
    children: ReactNode
}

export const HoverModule =
    ({
         className,
         moduleChildrenBody,
         children
     }: PT) => {
        const [seeMode, setSeeMode] = useState(false)
        return (
            <SHoverModule
                className={className}
                onMouseEnter={() => setSeeMode(true)}
                onMouseLeave={() => setSeeMode(false)}>
                {moduleChildrenBody}
                {seeMode && <section>
                    {children}
                </section>}
            </SHoverModule>
        );
    };



