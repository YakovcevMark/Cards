import React, {useCallback, useEffect, useState} from 'react';
import {BackArrowBlock} from "common/components/BackArrowBlock/BackArrowBlock";
import {SHelperText, SPagesContainer, STitle} from "common/components/CommonStyledComponents";
import styled from "styled-components";
import {Card, useGradeCardMutation, useLazyGetCardsQuery} from "features/Packs/packsApi";
import {Preloader} from "common/components/Preloader/Preloader";
import {useParams} from "react-router-dom";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {Button} from "common/components/Button/Button";
import {Grade} from "features/Packs/LearnPack/Grade/Grade";

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
    const [viewMode, setViewMode] = useState(false)
    const [grade, setGrade] = useState(1)

    const [fetchCards, {
        data: packData,
        isFetching : isCardsFetching,
    }] = useLazyGetCardsQuery({
        refetchOnReconnect: true,
    })

    const [gradeCard, {
        isLoading: isCardGrading,
    }] = useGradeCardMutation()

    const fetchCardsValidator = useApiErrorsHandler(fetchCards)
    const gradeCardValidator = useApiErrorsHandler(gradeCard)


    useEffect(() => {
        fetchCardsValidator({
            cardsPack_id,
            pageCount: 100
        })
    }, [fetchCardsValidator, cardsPack_id]);

    const newCardSetter = useCallback(() => {
        setGrade(1)
        setViewMode(false)
        packData && setCard(getCard(packData.cards))
    },[packData])

    useEffect(() => {
        newCardSetter()
    }, [newCardSetter]);
    const nextButtonHandler = async () => {
        await gradeCardValidator({
            card_id: card!._id,
            grade
        })
    }

    return !card ? <Preloader/> : (
        <>
            <BackArrowBlock/>
            <SSPagesContainer>
                <SSTitle>Learn Pack"{"packName"}"</SSTitle>
                <p>
                    <b>Question: </b>
                    {card.question}
                    <SHelperText>
                        Number of attempts to answer a question: {card.shots}
                    </SHelperText>
                </p>
                {viewMode
                    ? <>
                        <p>
                            <b>Answer: </b>
                            {card.answer}
                        </p>
                        <Grade
                            grade={grade}
                            gradeChangeHandler={setGrade}/>
                        <Button
                            type={"submit"}
                            disabled={isCardGrading || isCardsFetching}
                            onClick={nextButtonHandler}>
                            Next
                        </Button>
                    </>
                    : <Button
                        onClick={() => setViewMode(true)}>
                        Show Answer
                    </Button>
                }
            </SSPagesContainer>
        </>
    );
};
const SSPagesContainer = styled(SPagesContainer)`
    display: grid;
    padding: 1vh;
    height:auto;
`
const SSTitle = styled(STitle)`
    justify-self: center;
`

