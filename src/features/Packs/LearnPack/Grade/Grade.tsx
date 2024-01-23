import styled from "styled-components";
import React from "react";

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];
type PT = {
    gradeChangeHandler: (grade: number) => void
    grade: number
}
export const Grade =
    ({
         grade,
         gradeChangeHandler
     }: PT) => <SGrade>
        <p>Rate yourself:</p>
        {grades.map((g, i) => <SGradeOption>
            <input
                type="radio"
                id={g}
                value={i + 1}
                checked={i + 1 === grade}
                onClick={(e) => gradeChangeHandler(+e.currentTarget.value)}
            />
            <label
                htmlFor={g}
            >
                {g}
            </label>
        </SGradeOption>)}
    </SGrade>
const SGrade = styled.div`
    display: grid;
    padding-bottom: 2vh;
`
const SGradeOption = styled.div`
    display: grid;
    grid-template-columns: 3vh 3fr;
    align-items: center;

    input {
        height: 2vh;
    }
`