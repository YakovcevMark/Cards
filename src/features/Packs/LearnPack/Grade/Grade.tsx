import React from "react";
import {SGrade, SGradeOption} from "features/Packs/LearnPack/LearnPackStyledComponents";

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];
type PT = {
    gradeChangeHandler: (grade: number) => void
    grade: number
    disabled: boolean
}
export const Grade =
    ({
         grade,
         gradeChangeHandler,
         disabled
     }: PT) => <SGrade>
        <p>Rate yourself:</p>
        {grades.map((g, i) => (
            <SGradeOption key={i}>
                <input
                    disabled={disabled}
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
            </SGradeOption>
        ))}
    </SGrade>
