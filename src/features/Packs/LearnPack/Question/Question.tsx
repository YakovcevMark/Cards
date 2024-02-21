import {SImg} from "features/Packs/PacksStyledComponents";
import {SHelperText} from "common/components/CommonStyledComponents";
import React from "react";
import {Button} from "common/components/Button/Button";
import {Card} from "features/Packs/Cards/cardsApi";
import {SSCutAnswerQuestionString} from "features/Packs/LearnPack/LearnPackStyledComponents";

type PT = {
    card?: Card
    hideQuestion: () => void
}
export const Question = ({card, hideQuestion}: PT) => <>    
    <b>Question: </b>
    {card?.questionImg ? <SImg src={card?.questionImg}/> : <SSCutAnswerQuestionString>{card?.question}</SSCutAnswerQuestionString>}
    <SHelperText>
        Number of attempts to answer a question: {card?.shots}
    </SHelperText>
    <Button
        onClick={hideQuestion}>
        Show Answer
    </Button>
</>