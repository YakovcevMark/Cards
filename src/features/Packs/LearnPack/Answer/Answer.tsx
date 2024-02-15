import {Button} from "common/components/Button/Button";
import {Grade} from "features/Packs/LearnPack/Grade/Grade";
import React, {useState} from "react";
import {Card} from "features/Packs/packsApi";
import {SImg} from "features/Packs/PacksStyledComponents";

type PT = {
    hideAnswer: () => void
    nextButtonHandler: () => void
    card: Card
    isControlDisabled: boolean
}
export const Answer =
    ({
         hideAnswer,
         card,
         isControlDisabled,
         nextButtonHandler
     }: PT) => {
        const [grade, setGrade] = useState(1)
        return <>
            <b>Answer: </b>
            {card.answerImg ? <SImg src={card.answerImg}/> : <p>{card.answer}</p>}
            <Grade
                disabled={isControlDisabled}
                grade={grade}
                gradeChangeHandler={setGrade}/>
            <Button
                onClick={hideAnswer}>
                Hide Answer
            </Button>
            <Button
                type={"submit"}
                disabled={isControlDisabled}
                onClick={nextButtonHandler}>
                Next
            </Button>
        </>
    }