import {SCutString} from "features/Packs/PacksStyledComponents";
import styled from "styled-components";

export const SSCutAnswerQuestionString = styled(SCutString)`
    text-overflow: unset;
    max-width: 450px;
    white-space: unset;
    @media (max-width: 526px) {
        width: 80%;
    }
`
export const SGrade = styled.div`
    display: grid;
    padding-bottom: 2vh;
`
export const SGradeOption = styled.div`
    display: grid;
    grid-template-columns: 3vh 3fr;
    align-items: center;

    input {
        height: 2vh;
    }
`