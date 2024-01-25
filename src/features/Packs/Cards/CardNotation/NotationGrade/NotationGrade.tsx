import styled from "styled-components";
import {Grade} from "@styled-icons/material/Grade";
import React from "react";

type PT = { grade: number }
export const NotationGrade =
    ({
         grade
     }: PT) => {
        const ceilGrade = Math.ceil(grade)
        const renderGrade = new Array(5)
        for (let i = 0; i < 5; i++) {
            i < ceilGrade
                ? renderGrade.push(<SGoldGrade/>)
                : renderGrade.push(<SGreyGrade/>)
        }
        return <>
            {renderGrade}
        </>
    }
const SGreyGrade = styled(Grade)`
    width: 30px;
    fill: #9e9e9e99
`
const SGoldGrade = styled(SGreyGrade)`
    fill: rgb(227 213 86 / 83%)
`