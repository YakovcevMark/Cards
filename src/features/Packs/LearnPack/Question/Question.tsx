import {SImg} from "features/Packs/PacksStyledComponents";
import {SHelperText} from "common/components/CommonStyledComponents";
import React from "react";
import {Card} from "features/Packs/packsApi";
import {Button} from "common/components/Button/Button";

type PT = {
    card: Card
    hideQuestion: () => void
}
export const Question = ({card, hideQuestion}: PT) => <>    
    <b>Question: </b>
    {card.questionImg ? <SImg src={card.questionImg}/> : <p>{card.question}</p>}
    <SHelperText>
        Number of attempts to answer a question: {card.shots}
    </SHelperText>
    <Button
        onClick={hideQuestion}>
        Show Answer
    </Button>
</>