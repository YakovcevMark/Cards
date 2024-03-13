import React, {useCallback, useLayoutEffect, useState} from 'react';
import {BackArrowBlock} from "common/components/BackArrowBlock/BackArrowBlock";
import {SPagesContainer, STitle} from "common/components/CommonStyledComponents";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import {Answer} from "features/Packs/LearnPack/Answer/Answer";
import {Question} from "features/Packs/LearnPack/Question/Question";
import {PATH} from "common/components/Routes/AppRoutes";
import {Card, useGetCardsQuery, useGradeCardMutation} from "features/Packs/Cards/cardsApi";

const getCard = (cards: Card[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});

    return cards[res.id + 1];
}

export default function LearnPack() {

    const {cardsPack_id} = useParams()
    const [card, setCard] = useState<Card | undefined>(undefined)
    const [showAnswer, setShowAnswer] = useState(false)
    const [grade, setGrade] = useState<1 | 2 | 3 | 4 | 5>(1)

    const setShowAnswerFalse = useCallback(() => setShowAnswer(false),[setShowAnswer])

    const {
        data: packData,
    } = useGetCardsQuery({
        cardsPack_id,
        sortCards: "0grade",
        pageCount: 50,
        page: 1
    })

    const [gradeCard, {
        isLoading: isCardGrading,
    }] = useGradeCardMutation()

    const newCardSetter = useCallback(() => {
        setGrade(1)
        setShowAnswerFalse();
        packData && setCard(getCard(packData.cards))
    }, [packData, setShowAnswerFalse])

    useLayoutEffect(() => {
        newCardSetter()
    }, [newCardSetter]);

    const nextButtonHandler = async () => {
        await gradeCard({
            card_id: card!._id,
            grade
        })
        newCardSetter()
    }
    return (
        <>
            <BackArrowBlock
                text={"Back to pack"}
                path={`${PATH.cards}/${cardsPack_id}`}/>
            <SSPagesContainer>
                <SSTitle>Pack {"packName"}</SSTitle>
                {showAnswer
                    ? <Answer
                        card={card}
                        hideAnswer={setShowAnswerFalse}
                        nextButtonHandler={nextButtonHandler}
                        isControlDisabled={isCardGrading}/>
                    : <Question
                        card={card}
                        hideQuestion={() => setShowAnswer(true)}/>
                }
            </SSPagesContainer>
        </>
    );
};

const SSPagesContainer = styled(SPagesContainer)`
    display: grid;
    grid-gap: 10px;
    padding: 1vh;
    height: 100%;
`
const SSTitle = styled(STitle)`
    justify-self: center;
`


