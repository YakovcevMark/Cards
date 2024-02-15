import React, {useCallback, useEffect, useState} from 'react';
import {BackArrowBlock} from "common/components/BackArrowBlock/BackArrowBlock";
import {SPagesContainer, STitle} from "common/components/CommonStyledComponents";
import styled from "styled-components";
import {Card, useGradeCardMutation, useLazyGetCardsQuery} from "features/Packs/packsApi";
import {Preloader} from "common/components/Preloader/Preloader";
import {useParams} from "react-router-dom";
import {Answer} from "features/Packs/LearnPack/Answer/Answer";
import {Question} from "features/Packs/LearnPack/Question/Question";

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

export const LearnPack = () => {

    const {cardsPack_id} = useParams()
    const [card, setCard] = useState<Card | null>(null)
    const [showAnswer, setShowAnswer] = useState(false)
    const [grade, setGrade] = useState<1 | 2 | 3 | 4 | 5>(1)

    const setShowAnswerFalse = () => setShowAnswer(false)
    const [fetchCards, {
        data: packData,
        isFetching: isCardsFetching,
    }] = useLazyGetCardsQuery({
        refetchOnReconnect: true,
    })

    const [gradeCard, {
        isLoading: isCardGrading,
    }] = useGradeCardMutation()


    useEffect(() => {
        fetchCards({
            cardsPack_id,
            pageCount: 100
        })
    }, [fetchCards, cardsPack_id]);

    const newCardSetter = useCallback(() => {
        setGrade(1)
        setShowAnswerFalse();
        packData && setCard(getCard(packData.cards))
    }, [packData])

    useEffect(() => {
        newCardSetter()
    }, [newCardSetter]);
    const nextButtonHandler = async () => {
        await gradeCard({
            card_id: card!._id,
            grade
        })
    }

    return !card ? <Preloader/> : (
        <>
            <BackArrowBlock/>
            <SSPagesContainer>
                <SSTitle>Pack {"packName"}</SSTitle>
                {showAnswer
                    ? <Answer
                        card={card}
                        hideAnswer={setShowAnswerFalse}
                        nextButtonHandler={nextButtonHandler}
                        isControlDisabled={isCardGrading || isCardsFetching}/>
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


